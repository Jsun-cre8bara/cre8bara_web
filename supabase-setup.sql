-- CRE8BARA 문의 폼용 Supabase 테이블 생성 스크립트
-- Supabase Dashboard → SQL Editor에서 이 스크립트를 실행하세요

-- 1. contacts 테이블 생성
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 인덱스 추가 (검색 성능 향상)
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- 3. Row Level Security (RLS) 활성화
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- 4. 기존 정책 삭제 (중복 방지)
DROP POLICY IF EXISTS "Enable insert for service role" ON contacts;
DROP POLICY IF EXISTS "Enable select for service role" ON contacts;

-- 5. Service Role을 위한 정책 생성 (API에서 데이터 삽입/조회 가능)
CREATE POLICY "Enable insert for service role"
ON contacts FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Enable select for service role"
ON contacts FOR SELECT
TO service_role
USING (true);

-- 6. (선택사항) 관리자가 직접 조회할 수 있는 정책 (Supabase Dashboard에서 조회 가능하도록)
-- 이 정책은 authenticated 사용자에게만 적용됩니다
-- 필요하지 않다면 주석 처리해도 됩니다

-- 7. 테이블이 제대로 생성되었는지 확인
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'contacts'
ORDER BY ordinal_position;
