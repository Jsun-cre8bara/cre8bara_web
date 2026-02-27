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

function sanitizeResult(r) {
  if (!r || typeof r !== "object") return r;
  const out = {};
  if (typeof r.ok !== "undefined") out.ok = r.ok;
  if (typeof r.skipped !== "undefined") out.skipped = r.skipped;
  if (typeof r.reason !== "undefined") out.reason = r.reason;
  if (typeof r.status !== "undefined") out.status = r.status;
  if (typeof r.error !== "undefined") out.error = r.error;
  if (typeof r.id !== "undefined") out.id = r.id;
  return out;
}

async function readJsonBody(req) {
  // Prefer reading the raw stream to avoid platform body-parsers that may throw (e.g. "Invalid JSON").
  const raw = await new Promise((resolve) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      resolve(raw);
    });
    req.on("error", () => resolve(""));
  });

  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  // If the runtime already parsed the body, try it, but guard against throwing getters.
  try {
    const b = req.body;
    if (!b) return null;
    if (typeof b === "string") {
      try {
        return JSON.parse(b);
      } catch {
        return null;
      }
    }
    // Buffer or Uint8Array-like
    if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(b)) {
      try {
        const s = b.toString("utf8");
        return JSON.parse(s);
      } catch {
        return null;
      }
    }
    if (typeof b === "object") return b;
  } catch {
    // ignore
  }

  return null;
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

  const resp = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/contacts`, {
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
  let id = undefined;
  if (Array.isArray(inserted) && inserted.length && inserted[0] && inserted[0].id) id = inserted[0].id;
  else if (inserted && inserted.id) id = inserted.id;
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

  // Default admin inbox (can be overridden by Vercel env ADMIN_EMAIL)
  const adminEmail = process.env.ADMIN_EMAIL || "cre8bara@gamil.com";
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
    .join("\n");

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; line-height: 1.6;">
      <h2 style="margin: 0 0 12px; padding: 0; color: #111;">새로운 문의가 접수되었습니다</h2>
      <div style="background: #f6f6f7; border: 1px solid #e7e7ea; border-radius: 12px; padding: 16px; margin: 12px 0;">
        <div><strong>분류:</strong> ${payload.category}</div>
        <div><strong>이름:</strong> ${payload.name}</div>
        <div><strong>이메일:</strong> ${payload.email}</div>
        <div><strong>연락처:</strong> ${payload.phone}</div>
      </div>
      <div style="background: #fff; border: 1px solid #e7e7ea; border-radius: 12px; padding: 16px; margin: 12px 0;">
        <div style="font-weight: 700; margin-bottom: 8px;">문의 내용</div>
        <div style="white-space: pre-wrap;">${payload.message}</div>
      </div>
      <div style="color: #666; font-size: 12px; margin-top: 16px;">
        ${contactId ? `문의 ID: ${contactId}<br/>` : ""}
        접수 시간: ${new Date().toLocaleString("ko-KR")}
      </div>
    </div>
  `;

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
      html: emailHtml,
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
      return safeJson(res, 400, {
        error: "모든 필드를 입력해주세요.",
      });
    }

    const payload = { category, name, email, phone, message };

    let dbResult;
    let emailResult;
    try {
      dbResult = await saveToSupabase(payload);
    } catch (e) {
      dbResult = { ok: false, skipped: false, error: String(e && e.message ? e.message : e) };
    }
    try {
      emailResult = await sendViaResend(payload, dbResult && dbResult.ok ? dbResult.id : undefined);
    } catch (e) {
      emailResult = { ok: false, skipped: false, error: String(e && e.message ? e.message : e) };
    }

    // If email isn't delivered, surface a clear error (메일 발송이 핵심 요구사항이므로).
    if (!emailResult.ok) {
      if (emailResult.skipped && emailResult.reason === "RESEND_API_KEY missing") {
        return safeJson(res, 500, {
          error: "메일 발송 설정 오류: RESEND_API_KEY가 설정되지 않았습니다.",
          details: {
            resend: sanitizeResult(emailResult),
            requiredEnv: ["RESEND_API_KEY", "FROM_EMAIL(권장)", "ADMIN_EMAIL(권장)"],
          },
        });
      }

      return safeJson(res, 500, {
        error: "메일 발송 실패",
        details: {
          resend: sanitizeResult(emailResult),
        },
      });
    }

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
        details: {
          supabase: dbResult.ok ? undefined : sanitizeResult(dbResult),
          resend: emailResult.ok ? undefined : sanitizeResult(emailResult),
        },
      },
    });
  } catch (err) {
    // Last-resort: never crash the function without a JSON response.
    return safeJson(res, 500, {
      error: "처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      details: {
        message: String(err && err.message ? err.message : err),
      },
    });
  }
}

