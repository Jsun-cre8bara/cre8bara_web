function safeJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function parseBody(req) {
  // Vercel may already provide req.body; but we support raw stream too.
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  return null;
}

async function readJsonBody(req) {
  const preParsed = parseBody(req);
  if (preParsed) return preParsed;

  // Fallback: read raw body
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return null;
  const raw = Buffer.concat(chunks).toString("utf8");
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function saveToSupabase(payload) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  const apikey = serviceRoleKey || anonKey;

  if (!supabaseUrl || !apikey) {
    return { ok: false, skipped: true, reason: "Supabase env missing" };
  }
  if (typeof fetch !== "function") {
    return { ok: false, skipped: true, reason: "fetch not available in runtime" };
  }

  const resp = await fetch(`${supabaseUrl.replace(/\\/$/, "")}/rest/v1/contacts`, {
    method: "POST",
    headers: {
      apikey,
      Authorization: `Bearer ${apikey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
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
  if (!resp.ok) return { ok: false, skipped: false, status: resp.status, body: text };

  let inserted = null;
  try {
    inserted = text ? JSON.parse(text) : null;
  } catch {
    inserted = null;
  }
  const id = Array.isArray(inserted) ? inserted?.[0]?.id : inserted?.id;
  return { ok: true, id };
}

async function sendViaResend(payload, contactId) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return { ok: false, skipped: true, reason: "RESEND_API_KEY missing" };
  }
  if (typeof fetch !== "function") {
    return { ok: false, skipped: true, reason: "fetch not available in runtime" };
  }

  const adminEmail = process.env.ADMIN_EMAIL || "cre8bara@gmail.com";
  const fromEmail = process.env.FROM_EMAIL || "Cre8BARA <onboarding@resend.dev>";

  const emailBody = [
    "새로운 문의가 접수되었습니다.",
    "",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "[문의 정보]",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    `분류: ${payload.category}`,
    `이름: ${payload.name}`,
    `이메일: ${payload.email}`,
    `연락처: ${payload.phone}`,
    "",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "[문의 내용]",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    payload.message,
    "",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    contactId ? `문의 ID: ${contactId}` : undefined,
    `접수 시간: ${new Date().toLocaleString("ko-KR")}`,
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  ]
    .filter(Boolean)
    .join("\\n");

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [adminEmail],
      subject: `[${payload.category}] ${payload.name}님의 문의`,
      text: emailBody,
    }),
  });

  const text = await resp.text();
  if (!resp.ok) return { ok: false, skipped: false, status: resp.status, body: text };
  return { ok: true };
}

export default async function handler(req, res) {
  try {
    setCors(res);

    if (req.method === "OPTIONS") {
      res.statusCode = 200;
      return res.end();
    }

    if (req.method !== "POST") {
      return safeJson(res, 405, { error: "Method not allowed" });
    }

    const body = await readJsonBody(req);
    const { category, name, email, phone, message } = body || {};

    if (!category || !name || !email || !phone || !message) {
      return safeJson(res, 400, { error: "모든 필드를 입력해주세요." });
    }

    const payload = { category, name, email, phone, message };

    const dbResult = await saveToSupabase(payload);
    const emailResult = await sendViaResend(payload, dbResult.ok ? dbResult.id : undefined);

    if (!dbResult.ok && !dbResult.skipped && !emailResult.ok && !emailResult.skipped) {
      return safeJson(res, 500, {
        error: "문의 처리 중 오류가 발생했습니다.",
        details: { supabase: dbResult, resend: emailResult },
      });
    }

    if (!dbResult.ok && dbResult.skipped && !emailResult.ok && emailResult.skipped) {
      return safeJson(res, 500, {
        error: "서버 설정 오류: 메일/DB 설정이 없어 문의를 처리할 수 없습니다.",
        details: {
          supabase: dbResult,
          resend: emailResult,
          requiredEnv: [
            "RESEND_API_KEY 또는 SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY(or SUPABASE_ANON_KEY)",
          ],
        },
      });
    }

    return safeJson(res, 200, {
      success: true,
      message: "문의가 성공적으로 접수되었습니다.",
      id: dbResult.ok ? dbResult.id : undefined,
      delivery: {
        savedToDb: !!dbResult.ok,
        emailedAdmin: !!emailResult.ok,
      },
    });
  } catch (err) {
    // Last-resort: never crash the function without a JSON response.
    return safeJson(res, 500, { error: "처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." });
  }
}

