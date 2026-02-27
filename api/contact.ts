import type { VercelRequest, VercelResponse } from '@vercel/node';

type ContactPayload = {
  category: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

const fetchFn: typeof fetch = (globalThis as any).fetch;

function safeJson(res: VercelResponse, status: number, body: unknown) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.status(status).send(JSON.stringify(body));
}

function parseBody(req: VercelRequest): Partial<ContactPayload> {
  const body = req.body as any;
  if (!body) return {};
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
}

async function saveToSupabase(payload: ContactPayload) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  const apikey = serviceRoleKey || anonKey;

  if (!supabaseUrl || !apikey) {
    return { ok: false as const, skipped: true as const, reason: 'Supabase env missing' };
  }

  if (!fetchFn) {
    return { ok: false as const, skipped: true as const, reason: 'fetch not available in runtime' };
  }

  const resp = await fetchFn(`${supabaseUrl.replace(/\\/$/, '')}/rest/v1/contacts`, {
    method: 'POST',
    headers: {
      apikey,
      Authorization: `Bearer ${apikey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      category: payload.category,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      message: payload.message,
      created_at: new Date().toISOString(),
    }),
  });

  const text = await resp.text();
  if (!resp.ok) {
    return { ok: false as const, skipped: false as const, status: resp.status, body: text };
  }

  // Supabase may return an array of inserted rows when Prefer:return=representation
  let inserted: any = null;
  try {
    inserted = text ? JSON.parse(text) : null;
  } catch {
    inserted = null;
  }
  const id = Array.isArray(inserted) && inserted[0]?.id ? inserted[0].id : inserted?.id;

  return { ok: true as const, id };
}

async function sendViaResend(payload: ContactPayload, contactId?: string) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return { ok: false as const, skipped: true as const, reason: 'RESEND_API_KEY missing' };
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'cre8bara@gmail.com';
  const fromEmail = process.env.FROM_EMAIL || 'Cre8BARA <onboarding@resend.dev>';

  const emailBody = [
    '새로운 문의가 접수되었습니다.',
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '[문의 정보]',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    `분류: ${payload.category}`,
    `이름: ${payload.name}`,
    `이메일: ${payload.email}`,
    `연락처: ${payload.phone}`,
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '[문의 내용]',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    payload.message,
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    contactId ? `문의 ID: ${contactId}` : undefined,
    `접수 시간: ${new Date().toLocaleString('ko-KR')}`,
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  ]
    .filter(Boolean)
    .join('\n');

  if (!fetchFn) {
    return { ok: false as const, skipped: true as const, reason: 'fetch not available in runtime' };
  }

  const resp = await fetchFn('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [adminEmail],
      subject: `[${payload.category}] ${payload.name}님의 문의`,
      text: emailBody,
    }),
  });

  const text = await resp.text();
  if (!resp.ok) {
    return { ok: false as const, skipped: false as const, status: resp.status, body: text };
  }

  return { ok: true as const };
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category, name, email, phone, message } = parseBody(req);

    // 입력 유효성 검사
    if (!name || !email || !phone || !message || !category) {
      return safeJson(res, 400, { error: '모든 필드를 입력해주세요.' });
    }

    const payload: ContactPayload = { category, name, email, phone, message };

    // Save & send are independent: one may succeed even if the other fails.
    const dbResult = await saveToSupabase(payload);
    const emailResult = await sendViaResend(payload, dbResult.ok ? dbResult.id : undefined);

    // If BOTH failed (not skipped), return 500.
    if (!dbResult.ok && !dbResult.skipped && !emailResult.ok && !emailResult.skipped) {
      return safeJson(res, 500, {
        error: '문의 처리 중 오류가 발생했습니다.',
        details: {
          supabase: dbResult,
          resend: emailResult,
        },
      });
    }

    // If BOTH skipped (missing env), return clear 500 so it’s actionable.
    if (!dbResult.ok && dbResult.skipped && !emailResult.ok && emailResult.skipped) {
      return safeJson(res, 500, {
        error: '서버 설정 오류: 메일/DB 설정이 없어 문의를 처리할 수 없습니다.',
        details: {
          supabase: dbResult,
          resend: emailResult,
          requiredEnv: ['RESEND_API_KEY or SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY)'],
        },
      });
    }

    return safeJson(res, 200, {
      success: true,
      message: '문의가 성공적으로 접수되었습니다.',
      id: dbResult.ok ? dbResult.id : undefined,
      delivery: {
        savedToDb: dbResult.ok,
        emailedAdmin: emailResult.ok,
      },
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return safeJson(res, 500, {
      error: '처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
}
