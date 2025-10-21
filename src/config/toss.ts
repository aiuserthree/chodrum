// 환경변수에서 토스페이먼츠 키 가져오기
const getClientKey = () => {
  // 운영 환경에서는 실제 라이브 키 사용
  if (import.meta.env.MODE === 'production' && import.meta.env.VITE_TOSS_LIVE_CLIENT_KEY) {
    return import.meta.env.VITE_TOSS_LIVE_CLIENT_KEY;
  }
  
  // 개발/테스트 환경에서는 테스트 키 사용
  return import.meta.env.VITE_TOSS_TEST_CLIENT_KEY || 'test_ck_kZLKGPx4M3M7B9XJ9RErBaWypv1o';
};

const getSecretKey = () => {
  // 운영 환경에서는 실제 라이브 키 사용
  if (import.meta.env.MODE === 'production' && import.meta.env.VITE_TOSS_LIVE_SECRET_KEY) {
    return import.meta.env.VITE_TOSS_LIVE_SECRET_KEY;
  }
  
  // 개발/테스트 환경에서는 테스트 키 사용
  return import.meta.env.VITE_TOSS_TEST_SECRET_KEY || 'test_sk_ODnyRpQWGrNXPwpZwlg3Kwv1M9EN';
};

// 토스페이먼츠 설정
export const TOSS_CONFIG = {
  CLIENT_KEY: getClientKey(),
  SECRET_KEY: getSecretKey(),
  
  // 결제 성공/실패 URL
  SUCCESS_URL: `${window.location.origin}/payment-success`,
  FAIL_URL: `${window.location.origin}/payment-fail`,
  
  // API 엔드포인트
  API_BASE_URL: 'https://api.tosspayments.com/v1',
  
  // 지원하는 결제 수단
  SUPPORTED_METHODS: ['카드', '계좌이체', '네이버페이', '카카오페이', '가상계좌'],
  
  // 현재 환경 정보
  IS_PRODUCTION: import.meta.env.MODE === 'production',
  IS_LIVE_MODE: import.meta.env.MODE === 'production' && 
                import.meta.env.VITE_TOSS_LIVE_CLIENT_KEY && 
                import.meta.env.VITE_TOSS_LIVE_SECRET_KEY,
};

// 환경에 따른 설정
export const isProduction = import.meta.env.MODE === 'production';

export const getTossConfig = () => {
  return {
    clientKey: isProduction ? TOSS_CONFIG.CLIENT_KEY : TOSS_CONFIG.CLIENT_KEY,
    secretKey: isProduction ? TOSS_CONFIG.SECRET_KEY : TOSS_CONFIG.SECRET_KEY,
    successUrl: TOSS_CONFIG.SUCCESS_URL,
    failUrl: TOSS_CONFIG.FAIL_URL,
  };
};
