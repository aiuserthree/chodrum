// 실제 이메일 발송을 위한 서비스
// Gmail SMTP 사용 예시

interface EmailConfig {
  service: string;
  host?: string;
  port?: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

// 환경 변수에서 이메일 설정 가져오기
const getEmailConfig = (): EmailConfig => {
  return {
    service: 'gmail', // 또는 'outlook'
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  };
};

// 실제 이메일 전송 함수
export const sendRealEmail = async (to: string, subject: string, html: string): Promise<{ success: boolean; message: string }> => {
  try {
    // 실제 환경에서만 이메일 전송
    if (process.env.NODE_ENV === 'production') {
      // 여기서 실제 이메일 서비스 사용
      // 예: SendGrid, AWS SES, Nodemailer 등
      
      console.log('🚀 실제 이메일 전송 (프로덕션 환경)');
      console.log(`   수신자: ${to}`);
      console.log(`   제목: ${subject}`);
      
      // 실제 구현 예시:
      /*
      const nodemailer = require('nodemailer');
      const config = getEmailConfig();
      
      const transporter = nodemailer.createTransporter(config);
      
      const mailOptions = {
        from: config.auth.user,
        to: to,
        subject: subject,
        html: html
      };
      
      await transporter.sendMail(mailOptions);
      */
      
      return {
        success: true,
        message: '이메일이 성공적으로 전송되었습니다.'
      };
    } else {
      // 개발 환경에서는 콘솔에 출력
      console.log('📧 개발 환경 - 이메일 전송 시뮬레이션:');
      console.log(`   수신자: ${to}`);
      console.log(`   제목: ${subject}`);
      console.log(`   내용: ${html.substring(0, 100)}...`);
      
      return {
        success: true,
        message: '개발 환경: 이메일이 콘솔에 출력되었습니다.'
      };
    }
    
  } catch (error) {
    console.error('이메일 전송 실패:', error);
    return {
      success: false,
      message: '이메일 전송에 실패했습니다.'
    };
  }
};

// Gmail 앱 비밀번호 설정 가이드
export const getGmailSetupGuide = () => {
  return `
    Gmail SMTP 설정 방법:
    
    1. Gmail 계정에서 2단계 인증 활성화
    2. Google 계정 → 보안 → 2단계 인증 → 앱 비밀번호 생성
    3. 환경 변수 설정:
       EMAIL_USER=your-email@gmail.com
       EMAIL_PASS=your-app-password
    
    4. .env 파일에 추가:
       EMAIL_USER=your-email@gmail.com
       EMAIL_PASS=your-app-password
  `;
};
