# Supabase 설정 완전 가이드

## 📋 목차
1. [Supabase 프로젝트 생성](#1-supabase-프로젝트-생성)
2. [API 키 확인](#2-api-키-확인)
3. [테이블 생성](#3-테이블-생성)
4. [Vercel 환경변수 설정](#4-vercel-환경변수-설정)
5. [테스트 및 확인](#5-테스트-및-확인)

---

## 1. Supabase 프로젝트 생성

### Step 1-1: Supabase 가입
1. [Supabase](https://supabase.com) 접속
2. 우측 상단 **"Start your project"** 또는 **"Sign in"** 클릭
3. GitHub 계정으로 가입 (추천) 또는 이메일로 가입

### Step 1-2: 새 프로젝트 생성
1. 대시보드에서 **"New Project"** 클릭
2. 프로젝트 정보 입력:
   - **Organization**: 기존 조직 선택 또는 새로 생성
   - **Name**: `cre8bara-web` (원하는 이름)
   - **Database Password**: 강력한 비밀번호 생성 (⚠️ 반드시 저장해두세요!)
   - **Region**: `Northeast Asia (Seoul)` 선택 (한국 사용자 기준)
   - **Pricing Plan**: Free Plan 선택 (무료로 시작 가능)
3. **"Create new project"** 클릭
4. 프로젝트 생성 대기 (약 1-2분 소요)

---

## 2. API 키 확인

### Step 2-1: Settings 메뉴 접근
1. 생성된 프로젝트 대시보드에서 왼쪽 하단 **Settings** (⚙️ 아이콘) 클릭
2. **API** 메뉴 클릭

### Step 2-2: 필요한 값 확인 및 복사
다음 두 값을 복사해두세요:

#### ✅ Project URL
- 위치: Settings → API → Project URL
- 예시: `https://abcdefghijklmnop.supabase.co`
- 이것이 `SUPABASE_URL` 값입니다

#### ✅ Service Role Key (Secret)
- 위치: Settings → API → Service Role Key (secret)
- **"Reveal"** 버튼 클릭 → 키 복사
- ⚠️ **절대 공개하지 마세요!** 이 키는 서버에서만 사용해야 합니다
- 이것이 `SUPABASE_SERVICE_ROLE_KEY` 값입니다

---

## 3. 테이블 생성

### Step 3-1: SQL Editor 열기
1. 왼쪽 메뉴에서 **"SQL Editor"** 클릭
2. **"New Query"** 버튼 클릭

### Step 3-2: SQL 스크립트 실행
1. `supabase-setup.sql` 파일의 내용을 복사하거나
2. 아래 SQL 코드를 붙여넣기:

```sql
-- contacts 테이블 생성
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- Row Level Security 활성화
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제 (중복 방지)
DROP POLICY IF EXISTS "Enable insert for service role" ON contacts;
DROP POLICY IF EXISTS "Enable select for service role" ON contacts;

-- Service Role 정책 생성
CREATE POLICY "Enable insert for service role"
ON contacts FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Enable select for service role"
ON contacts FOR SELECT
TO service_role
USING (true);
```

3. **"Run"** 버튼 클릭 (또는 `Ctrl + Enter`)
4. ✅ 성공 메시지 확인: "Success. No rows returned"

### Step 3-3: 테이블 확인
1. 왼쪽 메뉴에서 **"Table Editor"** 클릭
2. `contacts` 테이블이 보이는지 확인
3. 열 구조 확인:
   - `id` (bigint, Primary Key)
   - `category` (text)
   - `name` (text)
   - `email` (text)
   - `phone` (text)
   - `message` (text)
   - `created_at` (timestamp)

---

## 4. Vercel 환경변수 설정

### Step 4-1: Vercel Dashboard 접속
1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. 로그인 (GitHub 계정 연결 권장)

### Step 4-2: 프로젝트 선택
1. `cre8bara_web` 프로젝트 찾기
2. 프로젝트 클릭

### Step 4-3: Environment Variables 추가
1. 상단 메뉴에서 **"Settings"** 클릭
2. 왼쪽 메뉴에서 **"Environment Variables"** 클릭
3. 다음 변수들을 추가:

#### 변수 1: SUPABASE_URL
- **Name**: `SUPABASE_URL`
- **Value**: 2단계에서 복사한 Project URL
- **Environment**: Production, Preview, Development 모두 체크
- **"Save"** 클릭

#### 변수 2: SUPABASE_SERVICE_ROLE_KEY
- **Name**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: 2단계에서 복사한 Service Role Key (secret)
- **Environment**: Production, Preview, Development 모두 체크
- **"Save"** 클릭

### Step 4-4: 재배포
⚠️ **중요**: 환경변수를 추가한 후 반드시 재배포해야 합니다!

1. 상단 메뉴에서 **"Deployments"** 클릭
2. 최신 배포의 **"..."** (더보기) 클릭
3. **"Redeploy"** 선택
4. 확인 대화상자에서 **"Redeploy"** 클릭
5. 배포 완료 대기 (약 1-2분)

---

## 5. 테스트 및 확인

### Step 5-1: 문의 폼 테스트
1. 배포된 웹사이트 접속
2. 문의 폼 섹션으로 이동
3. 테스트 데이터 입력:
   - 분류: 일반 문의
   - 성함: 테스트
   - 이메일: test@example.com
   - 연락처: 010-1234-5678
   - 문의 내용: 테스트 문의입니다
4. **"문의하기"** 버튼 클릭
5. ✅ 성공 메시지 확인: "문의가 접수되었습니다..."

### Step 5-2: Supabase에서 데이터 확인
1. Supabase Dashboard → Table Editor
2. `contacts` 테이블 클릭
3. 방금 제출한 문의가 저장되었는지 확인

### Step 5-3: Vercel Functions 로그 확인 (문제 발생 시)
1. Vercel Dashboard → 프로젝트 → **"Functions"** 탭
2. `/api/contact` 클릭
3. **"Logs"** 탭에서 에러 로그 확인

---

## 🔧 문제 해결

### ❌ "Supabase 환경변수가 설정되지 않았습니다" 오류
- **원인**: Vercel에 환경변수가 설정되지 않았거나 재배포가 안 됨
- **해결**: 
  1. Vercel Dashboard → Settings → Environment Variables 확인
  2. 환경변수가 있는지 확인
  3. **재배포** 실행 (중요!)

### ❌ "데이터 저장 중 오류가 발생했습니다" 오류
- **원인**: 테이블이 생성되지 않았거나 RLS 정책 오류
- **해결**: 
  1. Supabase → SQL Editor에서 테이블 생성 스크립트 다시 실행
  2. Table Editor에서 `contacts` 테이블 존재 확인
  3. Settings → API → Service Role Key 재확인

### ❌ 테이블이 보이지 않음
- **원인**: SQL 스크립트 실행 실패
- **해결**: 
  1. SQL Editor에서 에러 메시지 확인
  2. SQL 스크립트를 한 줄씩 실행해보기
  3. 기존 테이블이 있는지 확인 (DROP TABLE contacts; 실행 후 다시 생성)

---

## 📝 체크리스트

설정이 완료되었는지 확인하세요:

- [ ] Supabase 프로젝트 생성 완료
- [ ] Project URL 복사 완료
- [ ] Service Role Key 복사 완료
- [ ] `contacts` 테이블 생성 완료
- [ ] Vercel에 `SUPABASE_URL` 환경변수 추가 완료
- [ ] Vercel에 `SUPABASE_SERVICE_ROLE_KEY` 환경변수 추가 완료
- [ ] Vercel 재배포 완료
- [ ] 문의 폼 테스트 성공
- [ ] Supabase에서 데이터 확인 완료

---

## 💡 추가 팁

### Supabase 무료 플랜 제한사항
- 데이터베이스: 500MB
- 대역폭: 2GB/월
- API 요청: 무제한
- **문의 폼 용도로는 충분합니다!**

### 데이터 백업
- Supabase는 자동 백업을 제공합니다
- 필요시 Settings → Database → Backups에서 확인 가능

### 테이블 구조 변경
- 나중에 필드를 추가하고 싶다면:
  1. Table Editor에서 직접 추가하거나
  2. SQL Editor에서 `ALTER TABLE` 명령어 사용

---

## 🆘 도움이 필요하신가요?

문제가 발생하면:
1. Vercel Functions 로그 확인
2. Supabase SQL Editor에서 에러 확인
3. 위의 문제 해결 섹션 참고

설정 완료 후 문의 폼이 정상 작동합니다! 🎉
