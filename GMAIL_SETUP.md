# 🚀 EmailJS 이메일 전송 설정 완전 가이드

## 📧 EmailJS 무료 이메일 발송 설정

### ✅ 1단계: EmailJS 계정 생성
1. **EmailJS 홈페이지** 접속: https://www.emailjs.com
2. **"Sign Up"** 클릭하여 무료 계정 생성
3. **이메일 인증** 완료 (받은 메일에서 확인 링크 클릭)

### ✅ 2단계: Gmail 서비스 연결
1. **EmailJS 대시보드** → 왼쪽 메뉴 **"Email Services"** 클릭
2. **"Add New Service"** 버튼 클릭
3. **"Gmail"** 선택
4. **"Connect Account"** → Gmail 계정 로그인 및 권한 허용
5. **Service ID 복사** (예: `service_abc1234`) - 나중에 사용할 예정
6. **"Create Service"** 클릭

### ✅ 3단계: 이메일 템플릿 생성
1. 왼쪽 메뉴에서 **"Email Templates"** 클릭
2. **"Create New Template"** 클릭
3. **템플릿 설정:**
   - **Template Name**: `조드럼닷컴 이메일 인증`
   - **Subject**: `조드럼닷컴 이메일 인증`
   - **Content (Body)**: 아래 내용을 복사하여 붙여넣기
   
   ```html
   안녕하세요!
   
   조드럼닷컴 회원가입을 위한 인증코드입니다.
   
   인증코드: {{message}}
   
   위의 6자리 인증코드를 회원가입 페이지에 입력해주세요.
   이 인증코드는 10분 후 자동으로 만료됩니다.
   
   문의사항이 있으시면 chodrumstudio@gmail.com으로 연락해주세요.
   
   감사합니다.
   조드럼닷컴
   ```
   
   **🔴 중요: 템플릿에서 변수는 `{{message}}`만 사용하세요!**

4. **"Save"** 클릭
5. **Template ID 복사** (예: `template_xyz5678`) - 나중에 사용할 예정

### ✅ 4단계: Public Key 획득
1. 왼쪽 메뉴에서 **"Account"** 클릭
2. **"General"** 탭에서 **"Public Key"** 복사 (예: `abc123def456ghi789`)

### 🔧 5단계: 코드에 설정값 적용
1. **`src/lib/emailAPI.ts`** 파일을 열기
2. 아래 부분을 찾아서 실제 값으로 교체:

```typescript
// 이 부분을 찾아서
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'gmail_service';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'verification_template';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key_here';

// 실제 값으로 교체 (현재 설정된 값)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_orueaki';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_ibucxy7';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'rkMwhLgny6ZfX8kGB';
```

**📝 중요:** EmailJS에서 복사한 실제 ID들로 교체하세요!

### ✅ 6단계: 테스트 및 확인
1. **서버 재시작**: 
   ```bash
   npm run dev
   ```
2. **브라우저에서 회원가입 테스트**
3. **콘솔 확인**: 
   - 개발자 도구(F12) → Console 탭
   - EmailJS 설정 상태 및 전송 로그 확인
4. **실제 이메일 수신 확인**

### 🎯 환경변수 사용 (선택사항)
보안을 위해 환경변수를 사용하려면:

1. 프로젝트 루트에 **`.env`** 파일 생성:
```env
VITE_EMAILJS_SERVICE_ID=service_abc1234
VITE_EMAILJS_TEMPLATE_ID=template_xyz5678
VITE_EMAILJS_PUBLIC_KEY=abc123def456ghi789
```

2. **`.gitignore`** 파일에 `.env` 추가 (이미 추가되어 있을 수 있음)

**⚠️ 주의:** Vite에서는 환경변수가 `VITE_` 접두사로 시작해야 합니다!

## 🛠️ 문제 해결

### ❌ "Service not found" 또는 "Invalid service ID" 오류
- **원인**: Service ID가 잘못되었거나 존재하지 않음
- **해결**: 
  1. EmailJS 대시보드 → Email Services에서 Service ID 다시 확인
  2. `src/lib/emailAPI.ts`에서 정확한 Service ID로 교체
  3. Gmail 서비스가 활성화되어 있는지 확인

### ❌ "Template not found" 또는 "Invalid template ID" 오류
- **원인**: Template ID가 잘못되었거나 템플릿이 저장되지 않음
- **해결**: 
  1. EmailJS 대시보드 → Email Templates에서 Template ID 다시 확인
  2. 템플릿이 올바르게 저장되었는지 확인
  3. 필요시 새로운 템플릿 생성

### ❌ "Invalid public key" 오류
- **원인**: Public Key가 잘못되었거나 형식이 맞지 않음
- **해결**: 
  1. EmailJS 대시보드 → Account → General에서 Public Key 다시 복사
  2. 공백이나 특수문자가 포함되지 않았는지 확인

### ❌ 이메일이 스팸함에 들어가는 경우
- **해결**: 
  1. Gmail 설정에서 조드럼닷컴 이메일을 신뢰할 수 있는 발신자로 추가
  2. 스팸함에서 "스팸이 아님"으로 표시
  3. 연락처에 chodrumstudio@gmail.com 추가

### 🔍 디버깅 방법
1. **브라우저 콘솔 확인**: F12 → Console 탭에서 오류 메시지 확인
2. **네트워크 탭**: F12 → Network 탭에서 EmailJS API 호출 상태 확인
3. **EmailJS 대시보드**: Usage 탭에서 전송 기록 확인

## 📊 EmailJS 사용 제한
- **무료 플랜**: 월 200통 (개인 프로젝트에 충분)
- **Personal 플랜**: $15/월 (월 1,000통)
- **Professional 플랜**: $70/월 (무제한)
- **Enterprise**: 맞춤 요금

## 🧪 단계별 테스트 방법

### 1️⃣ 설정 확인 테스트
```javascript
// 브라우저 콘솔에서 실행
import { checkEmailJSConfiguration } from './src/lib/emailAPI';
console.log(checkEmailJSConfiguration());
```

### 2️⃣ 실제 회원가입 테스트
1. 웹사이트에서 **회원가입** 클릭
2. 본인의 **실제 이메일 주소** 입력
3. **"인증 코드 받기"** 클릭
4. **이메일함 확인** (스팸함도 확인)
5. **6자리 코드 입력** 후 **"인증 완료"** 클릭

### 3️⃣ 콘솔 로그 확인
- ✅ 성공 시: "✅ 이메일 전송 성공" 메시지
- ❌ 실패 시: "❌ 이메일 전송 실패" 메시지와 상세 오류 정보

## 💡 추가 팁

### 🎯 개발 중 유용한 기능
- **콘솔 출력**: 설정이 안되어 있어도 인증코드를 콘솔에서 확인 가능
- **에러 로깅**: 상세한 오류 메시지로 문제점 파악 쉬움
- **개발/프로덕션 구분**: 환경에 따라 다른 동작

### 🔒 보안 고려사항
- **Public Key**: 브라우저에 노출되어도 안전함 (읽기 전용)
- **환경변수**: `.env` 파일은 `.gitignore`에 추가하여 Git에 업로드되지 않도록 주의
- **Rate Limiting**: EmailJS에서 자동으로 스팸 방지 기능 제공

### 🚀 프로덕션 배포시 주의사항
- **환경변수**: 호스팅 서비스에 환경변수 설정 필수
- **도메인 제한**: EmailJS에서 허용 도메인 설정 권장
- **모니터링**: EmailJS 대시보드에서 전송 현황 정기적으로 확인

---

## ✨ 완료!
설정이 완료되면 회원가입시 실제 이메일로 인증코드가 전송됩니다! 🎉
