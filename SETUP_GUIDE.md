# 문의 폼 설정 가이드

## 환경변수 설정

Vercel 배포 전에 다음 환경변수를 설정해야 합니다:

### 1. Supabase 설정

1. [Supabase](https://supabase.com)에서 프로젝트 생성
2. Settings → API에서 다음 정보 확인:
   - Project URL → `SUPABASE_URL`
   - Service Role Key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ 비공개 키입니다)
3. SQL Editor에서 다음 SQL 실행:

```sql
-- contacts 테이블 생성
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) 설정
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- 서비스 역할 키로 접근 가능하도록 정책 설정
CREATE POLICY "Enable insert for service role"
ON contacts FOR INSERT
TO service_role
WITH CHECK (true);
```

### 2. Resend 설정

1. [Resend](https://resend.com)에서 계정 생성
2. API Keys 메뉴에서 새 API 키 생성 → `RESEND_API_KEY`
3. (선택) 도메인 인증 후 발신 주소 변경:
   - `api/contact.ts` 파일에서 `from` 주소 변경
   - `onboarding@resend.dev` → `noreply@yourdomain.com`

### 3. Vercel 환경변수 설정

Vercel 대시보드에서 다음 환경변수를 추가하세요:

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. 프로젝트 선택 → Settings → Environment Variables
3. 다음 변수들을 추가:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `ADMIN_EMAIL` (선택사항, 기본값: Cre8bara@gmail.com)
4. 모든 환경(Production, Preview, Development)에 적용

### 4. 로컬 개발 환경 설정

프로젝트 루트에 `.env.local` 파일 생성:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=Cre8bara@gmail.com
```

⚠️ `.env.local`은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다.

## 테스트

환경변수 설정 후:

1. 로컬 테스트: `npm run dev` 실행 후 문의 폼 제출
2. 배포: Git에 푸시하면 Vercel이 자동 배포

## 문제 해결

### 이메일이 발송되지 않음
- Resend API 키 확인
- Resend 대시보드에서 발송 로그 확인
- 도메인 인증 여부 확인 (테스트는 `onboarding@resend.dev` 사용 가능)

### 데이터베이스 저장 오류
- Supabase URL과 Service Role Key 확인
- 테이블 생성 여부 확인
- RLS 정책 확인

### API Route 오류
- Vercel Functions 로그 확인
- 환경변수 설정 확인
- CORS 오류인 경우 `api/contact.ts`의 CORS 헤더 확인
