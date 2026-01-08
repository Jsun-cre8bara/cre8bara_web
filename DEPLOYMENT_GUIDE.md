# 🚀 CRE8BARA 배포 가이드

## ✅ 완료된 작업

- [x] `.gitignore` 파일 생성
- [x] `vercel.json` 배포 설정 파일 생성
- [x] Git 초기화 및 첫 커밋 완료
- [x] 브랜치 이름을 `main`으로 설정

## 📋 다음 단계: GitHub 리포지토리 생성 및 연결

### 옵션 1: GitHub 웹사이트에서 수동으로 생성 (추천)

1. **GitHub에 새 리포지토리 생성**
   - [GitHub](https://github.com/new)에 접속
   - Repository name: `CRE8BARA` (또는 원하는 이름)
   - 설정:
     - Public (공개) 또는 Private (비공개) 선택
     - **"Add a README file" 체크 해제** (이미 파일이 있음)
     - **"Add .gitignore" 선택 안 함** (이미 있음)
   - "Create repository" 클릭

2. **로컬과 원격 리포지토리 연결**
   - GitHub에서 생성된 리포지토리의 URL을 복사 (예: `https://github.com/YOUR_USERNAME/CRE8BARA.git`)
   - 아래 명령어 실행:

```bash
git remote add origin https://github.com/YOUR_USERNAME/CRE8BARA.git
git push -u origin main
```

### 옵션 2: GitHub CLI 사용 (자동화)

GitHub CLI가 설치되어 있지 않으므로, 먼저 설치해야 합니다:

1. **GitHub CLI 설치**
   - [GitHub CLI 다운로드](https://cli.github.com/)
   - 설치 후 PowerShell 재시작

2. **인증 및 리포지토리 생성**

```bash
# GitHub 로그인
gh auth login

# 리포지토리 생성 및 자동 push
gh repo create CRE8BARA --public --source=. --remote=origin --push
```

---

## 🌐 Vercel 배포

### 1. Vercel 웹사이트에서 배포 (가장 쉬운 방법)

1. [Vercel](https://vercel.com)에 접속
2. "Add New Project" 클릭
3. GitHub 계정 연결 및 `CRE8BARA` 리포지토리 선택
4. 프로젝트 설정 확인:
   - **Framework Preset**: Vite (자동 감지)
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build` (자동 설정됨)
   - **Output Directory**: `dist` (자동 설정됨)
   - **Install Command**: `npm install` (자동 설정됨)
5. "Deploy" 클릭

### 2. Vercel CLI 사용

```bash
# Vercel CLI 설치 (전역)
npm i -g vercel

# Vercel 로그인
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

---

## 🎯 배포 후 확인사항

- [ ] 사이트가 정상적으로 로드되는지 확인
- [ ] 모든 이미지와 에셋이 제대로 표시되는지 확인
- [ ] 반응형 디자인이 모바일/태블릿에서 작동하는지 확인
- [ ] 연락 폼이 정상 작동하는지 확인
- [ ] 페이지 로딩 속도 확인

---

## 🔧 추가 설정 (선택사항)

### 사용자 정의 도메인 연결

1. Vercel 대시보드에서 프로젝트 선택
2. Settings → Domains로 이동
3. 도메인 추가 및 DNS 설정

### 환경변수 설정 (필요한 경우)

1. Vercel 대시보드 → Settings → Environment Variables
2. 필요한 환경변수 추가 (예: API 키, Supabase 설정 등)

### Supabase 연동 (문의 폼 등)

현재는 정적 사이트이지만, 문의 폼 데이터를 저장하고 싶다면:

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. 데이터베이스 테이블 생성
3. 환경변수를 Vercel에 추가:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

---

## 💡 자동 배포

GitHub에 연결된 후, `main` 브랜치에 push할 때마다 Vercel이 자동으로 배포합니다!

```bash
# 코드 수정 후
git add .
git commit -m "Update landing page"
git push origin main
# → Vercel이 자동으로 배포 시작!
```

---

## 📞 문제 해결

- **빌드 실패**: Vercel 대시보드에서 빌드 로그 확인
- **404 에러**: `vercel.json`의 rewrites 설정 확인
- **이미지 로딩 실패**: 이미지 경로가 올바른지 확인

---

## 🎉 완료!

모든 설정이 완료되었습니다. 이제 GitHub 리포지토리를 생성하고 Vercel로 배포하세요!
