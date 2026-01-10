import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// 환경변수 확인
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase 환경변수가 설정되지 않았습니다.');
}

if (!resendApiKey) {
  console.error('Resend API 키가 설정되지 않았습니다.');
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

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
    // 환경변수 확인
    if (!supabase) {
      return res.status(500).json({ 
        error: '서버 설정 오류: Supabase 환경변수가 설정되지 않았습니다.' 
      });
    }

    const { category, name, email, phone, message } = req.body;

    // 입력 유효성 검사
    if (!name || !email || !phone || !message || !category) {
      return res.status(400).json({ error: '모든 필드를 입력해주세요.' });
    }

    // 1. Supabase에 데이터 저장
    const { data: contactData, error: dbError } = await supabase
      .from('contacts')
      .insert([
        {
          category,
          name,
          email,
          phone,
          message,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ 
        error: '데이터 저장 중 오류가 발생했습니다.',
        details: dbError.message 
      });
    }

    // 2. 관리자에게 이메일 발송 (Resend가 설정된 경우에만)
    if (resend) {
      try {
        const adminEmail = process.env.ADMIN_EMAIL || 'Cre8bara@gmail.com';
        
        const emailBody = `
새로운 문의가 접수되었습니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[문의 정보]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

분류: ${category}
이름: ${name}
이메일: ${email}
연락처: ${phone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[문의 내용]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
문의 ID: ${contactData.id}
접수 시간: ${new Date().toLocaleString('ko-KR')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        `;

        const { error: emailError } = await resend.emails.send({
          from: 'Cre8BARA <onboarding@resend.dev>', // Resend에서 발신 도메인 설정 후 변경 필요
          to: [adminEmail],
          subject: `[${category}] ${name}님의 문의`,
          text: emailBody,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
                새로운 문의가 접수되었습니다
              </h2>
              
              <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #555;">문의 정보</h3>
                <p><strong>분류:</strong> ${category}</p>
                <p><strong>이름:</strong> ${name}</p>
                <p><strong>이메일:</strong> ${email}</p>
                <p><strong>연락처:</strong> ${phone}</p>
              </div>
              
              <div style="background: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #555;">문의 내용</h3>
                <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #999; font-size: 12px;">
                <p>문의 ID: ${contactData.id}</p>
                <p>접수 시간: ${new Date().toLocaleString('ko-KR')}</p>
              </div>
            </div>
          `,
        });

        if (emailError) {
          console.error('Email error:', emailError);
          // 이메일 발송 실패해도 데이터는 저장되었으므로 성공으로 처리
        }

        // 3. 사용자에게 확인 이메일 발송 (선택사항)
        try {
          await resend.emails.send({
            from: 'Cre8BARA <onboarding@resend.dev>',
            to: [email],
            subject: '문의 접수 완료 - CRE8BARA',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">문의가 성공적으로 접수되었습니다</h2>
                <p>${name}님,</p>
                <p>문의해 주셔서 감사합니다. 빠른 시일 내에 검토 후 연락드리겠습니다.</p>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p><strong>접수 내역</strong></p>
                  <p>분류: ${category}</p>
                  <p>문의 내용: ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}</p>
                </div>
                <p style="color: #666; font-size: 14px;">감사합니다.<br>CRE8BARA 팀</p>
              </div>
            `,
          });
        } catch (userEmailError) {
          console.error('User confirmation email error:', userEmailError);
          // 사용자 확인 이메일 실패는 무시 (선택사항)
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // 이메일 발송 실패해도 데이터는 저장되었으므로 계속 진행
      }
    } else {
      console.warn('Resend API 키가 설정되지 않아 이메일을 발송하지 않습니다.');
    }

    return res.status(200).json({ 
      success: true, 
      message: '문의가 성공적으로 접수되었습니다.',
      id: contactData.id 
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ 
      error: '처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' 
    });
  }
}
