// 브라우저 호환 이메일 전송 API
import emailjs from '@emailjs/browser';

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

// EmailJS 설정 - 실제 EmailJS에서 받은 값들
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_orueaki';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_ibucxy7';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'rkMwhLgny6ZfX8kGB';

// EmailJS 초기화
const initializeEmailJS = () => {
  if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'your-public-key' && EMAILJS_PUBLIC_KEY !== 'your_public_key_here') {
    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      return true;
    } catch (error) {
      console.error('EmailJS 초기화 실패:', error);
      return false;
    }
  }
  return false;
};

// 실제 이메일 전송 함수
export const sendEmail = async (emailData: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('📧 이메일 전송 요청:', {
      to: emailData.to,
      subject: emailData.subject,
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID,
      hasPublicKey: EMAILJS_PUBLIC_KEY !== 'your_public_key_here'
    });

    // EmailJS 설정 확인
    if (!initializeEmailJS()) {
      console.log('⚠️ EmailJS 설정이 필요합니다. 아래 단계를 따라주세요:');
      console.log('1. https://www.emailjs.com 에서 무료 계정 생성');
      console.log('2. Gmail 서비스 연결 (Service ID 획득)');
      console.log('3. 이메일 템플릿 생성 (Template ID 획득)');
      console.log('4. Public Key 획득');
      console.log('5. src/lib/emailAPI.ts 파일에서 해당 값들 업데이트');
      console.log('');
      console.log('📧 이메일 전송 시뮬레이션 (개발 모드):');
      console.log(`   수신자: ${emailData.to}`);
      console.log(`   제목: ${emailData.subject}`);
      console.log(`   내용: ${emailData.html.substring(0, 100)}...`);
      
      return {
        success: true,
        message: 'EmailJS 설정 후 실제 이메일이 전송됩니다. 현재는 콘솔에만 출력됩니다.'
      };
    }
    
    // EmailJS를 통한 이메일 전송 - 인증코드만 간단히 전송
    const verificationCode = emailData.html.match(/class="code">(\d{6})</)?.[1] || 
                           emailData.html.match(/(\d{6})/)?.[1] || 
                           'ERROR';
    
    const templateParams = {
      to_email: emailData.to,
      to_name: emailData.to.split('@')[0],
      subject: emailData.subject,
      message: verificationCode, // 6자리 인증코드만 전송
      from_name: '조드럼닷컴',
      reply_to: 'chodrumstudio@gmail.com',
      code: verificationCode // 추가 변수
    };
    
    console.log('📤 EmailJS로 전송 시도...', {
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID
    });

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
    
    console.log('✅ 이메일 전송 성공!', {
      to: emailData.to,
      status: result.status,
      text: result.text
    });
    
    return {
      success: true,
      message: '이메일이 성공적으로 전송되었습니다!'
    };
    
  } catch (error: any) {
    console.error('❌ 이메일 전송 실패:', error);
    
    // 구체적인 오류 메시지 제공
    let errorMessage = '이메일 전송에 실패했습니다.';
    if (error?.text?.includes('Invalid service ID')) {
      errorMessage = 'EmailJS Service ID가 잘못되었습니다. 설정을 확인해주세요.';
    } else if (error?.text?.includes('Invalid template ID')) {
      errorMessage = 'EmailJS Template ID가 잘못되었습니다. 설정을 확인해주세요.';
    } else if (error?.text?.includes('Invalid public key')) {
      errorMessage = 'EmailJS Public Key가 잘못되었습니다. 설정을 확인해주세요.';
    }
    
    // 개발용 콘솔 출력
    console.log('📧 이메일 내용 (참고용):');
    console.log(`   수신자: ${emailData.to}`);
    console.log(`   제목: ${emailData.subject}`);
    console.log(`   내용: ${emailData.html.substring(0, 200)}...`);
    
    return {
      success: false,
      message: `${errorMessage} 현재는 콘솔에만 출력됩니다.`
    };
  }
};

// 이메일 템플릿 생성 - HTML과 텍스트 버전 모두 제공
export const createVerificationEmailTemplate = (code: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>조드럼닷컴 이메일 인증</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
        .header p { margin: 10px 0 0; opacity: 0.9; }
        .content { padding: 40px 30px; }
        .content h2 { color: #333; font-size: 24px; margin-bottom: 20px; }
        .code-container { text-align: center; margin: 30px 0; }
        .code { background: #f8f9fa; border: 2px solid #e9ecef; padding: 20px; font-size: 32px; font-weight: bold; letter-spacing: 5px; border-radius: 12px; color: #495057; display: inline-block; min-width: 200px; }
        .instructions { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; }
        .footer { background: #f8f9fa; padding: 25px; text-align: center; color: #6c757d; font-size: 14px; }
        .footer a { color: #667eea; text-decoration: none; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; }
        .btn { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🥁 조드럼닷컴</h1>
          <p>드럼 악보 전문 쇼핑몰</p>
        </div>
        <div class="content">
          <h2>이메일 인증을 완료해주세요</h2>
          <p>안녕하세요! 조드럼닷컴에 가입해주셔서 감사합니다.</p>
          <p>아래 인증코드를 회원가입 페이지에 입력하여 이메일 인증을 완료해주세요.</p>
          
          <div class="code-container">
            <div class="code">${code}</div>
          </div>
          
          <div class="instructions">
            <p><strong>📝 인증 방법:</strong></p>
            <ol>
              <li>회원가입 페이지로 돌아가세요</li>
              <li>위의 6자리 인증코드를 입력하세요</li>
              <li>"인증 완료" 버튼을 클릭하세요</li>
            </ol>
          </div>
          
          <p><strong>⚠️ 중요사항:</strong></p>
          <ul>
            <li>이 인증코드는 <strong>10분 후 자동으로 만료</strong>됩니다</li>
            <li>인증코드는 <strong>한 번만 사용</strong>할 수 있습니다</li>
            <li>본인이 요청하지 않았다면 이 이메일을 무시하세요</li>
          </ul>
          
          <p>문제가 있으시다면 언제든지 고객지원팀으로 연락해주세요.</p>
        </div>
        <div class="footer">
          <p><strong>조드럼닷컴 고객지원팀</strong></p>
          <p>이메일: <a href="mailto:chodrumstudio@gmail.com">chodrumstudio@gmail.com</a></p>
          <p style="margin-top: 20px; color: #868e96; font-size: 12px;">
            이 이메일은 조드럼닷컴 회원가입 과정에서 자동으로 발송된 이메일입니다.<br>
            본 메일에 직접 회신하지 마시고, 문의사항은 위 연락처를 이용해주세요.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// EmailJS 설정 헬퍼 함수들
export const getEmailJSSetupInstructions = () => {
  return {
    step1: "https://www.emailjs.com 에서 무료 계정 생성",
    step2: "Gmail 서비스 연결하여 Service ID 획득",
    step3: "이메일 템플릿 생성하여 Template ID 획득",
    step4: "Account 설정에서 Public Key 획득",
    step5: "src/lib/emailAPI.ts 파일에서 실제 값들로 교체",
    templateVariables: {
      to_email: "수신자 이메일 주소",
      to_name: "수신자 이름",
      subject: "이메일 제목",
      message: "이메일 내용 (HTML)",
      from_name: "발신자 이름",
      reply_to: "답장 받을 이메일"
    }
  };
};

// 설정 상태 확인
export const checkEmailJSConfiguration = () => {
  return {
    serviceId: EMAILJS_SERVICE_ID,
    templateId: EMAILJS_TEMPLATE_ID,
    hasValidPublicKey: EMAILJS_PUBLIC_KEY !== 'your_public_key_here' && EMAILJS_PUBLIC_KEY.length > 10,
    isConfigured: initializeEmailJS()
  };
};
