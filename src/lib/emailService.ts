// 이메일 인증 서비스
import { sendEmail, createVerificationEmailTemplate } from './emailAPI';

interface EmailVerificationData {
  email: string;
  code: string;
  expiresAt: number;
}

// 메모리 저장소 (실제로는 서버 DB에 저장)
const verificationCodes = new Map<string, EmailVerificationData>();

// 6자리 랜덤 코드 생성
export const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// 이메일 인증 코드 전송
export const sendVerificationEmail = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    // 기존 코드가 있으면 삭제
    verificationCodes.delete(email);
    
    // 새 인증 코드 생성
    const code = generateVerificationCode();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10분 후 만료
    
    // 메모리에 저장
    verificationCodes.set(email, {
      email,
      code,
      expiresAt
    });
    
    // 실제 이메일 전송
    const emailResult = await sendEmail({
      to: email,
      subject: '조드럼닷컴 이메일 인증',
      html: createVerificationEmailTemplate(code)
    });
    
    if (!emailResult.success) {
      return {
        success: false,
        message: emailResult.message
      };
    }
    
    // 개발 환경에서는 콘솔에도 출력
    console.log(`📧 이메일 인증 코드 전송:`);
    console.log(`   수신자: ${email}`);
    console.log(`   인증코드: ${code}`);
    console.log(`   만료시간: ${new Date(expiresAt).toLocaleString()}`);
    
    return {
      success: true,
      message: '인증 코드가 이메일로 전송되었습니다.'
    };
    
  } catch (error) {
    console.error('이메일 전송 실패:', error);
    return {
      success: false,
      message: '이메일 전송에 실패했습니다. 다시 시도해주세요.'
    };
  }
};

// 인증 코드 검증
export const verifyCode = (email: string, inputCode: string): { success: boolean; message: string } => {
  const verificationData = verificationCodes.get(email);
  
  if (!verificationData) {
    return {
      success: false,
      message: '인증 코드를 찾을 수 없습니다. 다시 요청해주세요.'
    };
  }
  
  // 만료 시간 확인
  if (Date.now() > verificationData.expiresAt) {
    verificationCodes.delete(email);
    return {
      success: false,
      message: '인증 코드가 만료되었습니다. 다시 요청해주세요.'
    };
  }
  
  // 코드 일치 확인
  if (verificationData.code !== inputCode) {
    return {
      success: false,
      message: '인증 코드가 올바르지 않습니다.'
    };
  }
  
  // 인증 성공 시 코드 삭제
  verificationCodes.delete(email);
  
  return {
    success: true,
    message: '이메일 인증이 완료되었습니다!'
  };
};

// 인증 코드 재전송
export const resendVerificationCode = async (email: string): Promise<{ success: boolean; message: string }> => {
  return await sendVerificationEmail(email);
};
