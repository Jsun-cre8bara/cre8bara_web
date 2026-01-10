# 문의 폼 오류 해결 가이드

## ❌ "데이터 저장 중 오류가 발생했습니다" 에러

### 가능한 원인 및 해결 방법

---

## 1. Supabase 테이블이 생성되지 않음 (가장 가능성 높음)

### 증상:
- 에러 메시지: "Supabase 테이블이 생성되지 않았습니다"
- 또는: "relation 'contacts' does not exist"

### 해결 방법:

#### Step 1: Supabase Dashboard 접속
1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 프로젝트 선택

#### Step 2: SQL Editor 열기
1. 왼쪽 메뉴에서 **"SQL Editor"** 클릭
2. **"New Query"** 버튼 클릭

#### Step 3: 테이블 생성 SQL 실행
아래 SQL 코드를 복사해서 붙여넣고 **"Run"** 클릭:

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

#### Step 4: 테이블 생성 확인
1. 왼쪽 메뉴에서 **"Table Editor"** 클릭
2. `contacts` 테이블이 보이는지 확인
3. 테이블 구조 확인 (id, category, name, email, phone, message, created_at)

---

## 2. RLS (Row Level Security) 정책 오류

### 증상:
- 에러 메시지: "Supabase RLS 정책 오류입니다"
- 또는: "permission denied", "policy"

### 해결 방법:

#### Step 1: RLS 정책 확인
1. Supabase Dashboard → Table Editor
2. `contacts` 테이블 클릭
3. 왼쪽 상단에서 **"Policies"** 탭 클릭

#### Step 2: 정책 추가 (없는 경우)
SQL Editor에서 다음 실행:

```sql
-- Service Role 정책 재생성
CREATE POLICY "Enable insert for service role"
ON contacts FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Enable select for service role"
ON contacts FOR SELECT
TO service_role
USING (true);
```

---

## 3. 환경변수 오류

### 증상:
- 에러 메시지: "서버 설정 오류: Supabase 환경변수가 설정되지 않았습니다"

### 해결 방법:

#### Step 1: Vercel 환경변수 확인
1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. 프로젝트 선택 → **Settings** → **Environment Variables**
3. 다음 변수들이 있는지 확인:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

#### Step 2: 환경변수 값 확인
- `SUPABASE_URL`: `https://jyfjqdvbwtlvxbdytyoq.supabase.co` 형식
- `SUPABASE_SERVICE_ROLE_KEY`: `sb_secret_...` 형식으로 시작

#### Step 3: 재배포
환경변수를 추가/수정한 경우:
1. **Deployments** 탭 클릭
2. 최신 배포의 **"..."** → **"Redeploy"** 클릭
3. 배포 완료 대기 (1-2분)

---

## 4. Service Role Key 오류

### 증상:
- 인증 오류
- "Invalid API key" 메시지

### 해결 방법:

#### Step 1: 올바른 키 확인
1. Supabase Dashboard → **Settings** → **API Keys**
2. **Secret keys** 섹션에서 **"default"** 키 확인
3. 눈 아이콘 클릭하여 전체 키 표시
4. 전체 키 복사

#### Step 2: Vercel에 올바른 키 추가
1. Vercel → Environment Variables
2. `SUPABASE_SERVICE_ROLE_KEY` 값 확인/수정
3. **전체 키**가 입력되어 있는지 확인 (앞뒤 공백 없이)
4. **Sensitive: Enabled** 확인
5. **재배포**

---

## 5. Vercel Functions 로그 확인

### 방법:

1. Vercel Dashboard → 프로젝트 → **Functions** 탭
2. `/api/contact` 클릭
3. **"Logs"** 탭에서 에러 로그 확인
4. 에러 메시지의 전체 내용 확인

### 로그에서 확인할 내용:
- Database error 상세 내용
- 에러 코드 (예: PGRST116, 42501)
- 에러 메시지

---

## 체크리스트

오류 해결을 위해 다음을 확인하세요:

- [ ] Supabase Dashboard에서 `contacts` 테이블 존재 확인
- [ ] SQL Editor에서 테이블 생성 스크립트 실행 완료
- [ ] RLS 정책이 설정되어 있는지 확인
- [ ] Vercel에 `SUPABASE_URL` 환경변수 설정 완료
- [ ] Vercel에 `SUPABASE_SERVICE_ROLE_KEY` 환경변수 설정 완료 (Sensitive: Enabled)
- [ ] 환경변수 추가/수정 후 재배포 완료
- [ ] Vercel Functions 로그에서 에러 상세 내용 확인

---

## 빠른 테스트

### Supabase 연결 테스트:

Supabase Dashboard → SQL Editor에서:

```sql
-- 테이블 존재 확인
SELECT * FROM contacts LIMIT 1;

-- 테이블 구조 확인
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'contacts';
```

에러 없이 실행되면 테이블이 제대로 생성된 것입니다.

---

## 여전히 문제가 해결되지 않는다면

1. **Vercel Functions 로그**에서 전체 에러 메시지 복사
2. **Supabase Dashboard** → **Table Editor**에서 테이블 스크린샷
3. **Vercel Environment Variables** 스크린샷 (값은 가리고)
4. 에러 메시지와 함께 문의

위 정보를 함께 공유해주시면 더 정확한 해결책을 제공할 수 있습니다.
