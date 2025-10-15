import { Product, Order } from '../types';

export const mockProducts: Product[] = [];

export const mockMembers: any[] = [];

export const mockOrders: Order[] = [];

// 회원 데이터 관리 함수들
export const saveMember = (memberData: any) => {
  const members = getMembers();
  
  // 더 짧고 읽기 쉬운 ID 생성 (예: M240314001, M240314002...)
  const today = new Date();
  const dateStr = today.getFullYear().toString().slice(-2) + 
                  String(today.getMonth() + 1).padStart(2, '0') + 
                  String(today.getDate()).padStart(2, '0');
  
  // 오늘 가입한 회원 수 확인하여 순번 생성
  const todayMembers = members.filter((member: any) => {
    if (!member.createdAt) return false;
    const memberDate = new Date(member.createdAt);
    return memberDate.toDateString() === today.toDateString();
  });
  
  const memberNumber = String(todayMembers.length + 1).padStart(3, '0');
  const memberId = `M${dateStr}${memberNumber}`;
  
  const newMember = {
    id: memberId,
    ...memberData,
    createdAt: new Date().toISOString(),
    isVerified: true
  };
  
  const updatedMembers = [...members, newMember];
  localStorage.setItem('members', JSON.stringify(updatedMembers));
  return newMember;
};

export const getMembers = () => {
  const savedMembers = localStorage.getItem('members');
  return savedMembers ? JSON.parse(savedMembers) : mockMembers;
};

export const findMemberByEmail = (email: string) => {
  const members = getMembers();
  return members.find((member: any) => member.email === email);
};

// 로그인 처리 함수
export const loginMember = (email: string, password: string): { success: boolean; message: string; member?: any } => {
  const members = getMembers();
  const member = members.find((m: any) => m.email === email);
  
  if (!member) {
    return {
      success: false,
      message: '등록되지 않은 이메일 주소입니다.'
    };
  }
  
  // 비밀번호 검증 (실제로는 해시 비교해야 함)
  if (member.password !== password) {
    return {
      success: false,
      message: '비밀번호가 올바르지 않습니다.'
    };
  }
  
  // 계정 상태 확인
  if (member.status === 'inactive') {
    return {
      success: false,
      message: '비활성화된 계정입니다. 관리자에게 문의하세요.'
    };
  }
  
  // 로그인 성공 시 lastLogin 업데이트
  const updatedMembers = members.map((m: any) => 
    m.id === member.id 
      ? { ...m, lastLogin: new Date().toLocaleString('ko-KR') }
      : m
  );
  
  localStorage.setItem('members', JSON.stringify(updatedMembers));
  
  return {
    success: true,
    message: '로그인에 성공했습니다.',
    member: { ...member, lastLogin: new Date().toLocaleString('ko-KR') }
  };
};

// 결제수단 관리 기능들
export interface PaymentMethodData {
  id: string;
  type: 'card' | 'naver-pay' | 'kakao-pay' | 'toss-pay';
  name: string;
  details: string;
  isConnected: boolean;
  lastUsed?: string;
  cardInfo?: {
    lastFourDigits?: string;
    expiry?: string;
    brand?: string;
  };
}

// 결제수단 불러오기
export const getPaymentMethods = (userEmail: string): PaymentMethodData[] => {
  const key = `payment_methods_${userEmail}`;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
};

// 결제수단 저장
export const savePaymentMethod = (userEmail: string, paymentMethod: PaymentMethodData): void => {
  const key = `payment_methods_${userEmail}`;
  const existing = getPaymentMethods(userEmail);
  const updated = [...existing, { ...paymentMethod, id: `pm_${Date.now()}` }];
  localStorage.setItem(key, JSON.stringify(updated));
};

// 결제수단 업데이트
export const updatePaymentMethod = (userEmail: string, methodId: string, updates: Partial<PaymentMethodData>): void => {
  const key = `payment_methods_${userEmail}`;
  const existing = getPaymentMethods(userEmail);
  const updated = existing.map(method => 
    method.id === methodId ? { ...method, ...updates } : method
  );
  localStorage.setItem(key, JSON.stringify(updated));
};

// 결제수단 삭제
export const deletePaymentMethod = (userEmail: string, methodId: string): void => {
  const key = `payment_methods_${userEmail}`;
  const existing = getPaymentMethods(userEmail);
  const updated = existing.filter(method => method.id !== methodId);
  localStorage.setItem(key, JSON.stringify(updated));
};

// 간편결제 연결/해제
export const connectSimplePayment = (userEmail: string, type: 'naver-pay' | 'kakao-pay' | 'toss-pay'): { success: boolean; message: string } => {
  try {
    const existing = getPaymentMethods(userEmail);
    const alreadyConnected = existing.find(method => method.type === type);
    
    if (alreadyConnected) {
      return {
        success: false,
        message: '이미 연결된 결제 수단입니다.'
      };
    }
    
    const paymentMethodData: PaymentMethodData = {
      id: `pm_${Date.now()}`,
      type,
      name: type === 'naver-pay' ? '네이버페이' : type === 'kakao-pay' ? '카카오페이' : '토스페이',
      details: '연결됨',
      isConnected: true,
      lastUsed: new Date().toLocaleDateString('ko-KR')
    };
    
    savePaymentMethod(userEmail, paymentMethodData);
    
    return {
      success: true,
      message: `${paymentMethodData.name}이 연결되었습니다.`
    };
  } catch (error) {
    return {
      success: false,
      message: '연결 중 오류가 발생했습니다.'
    };
  }
};

// 간편결제 해제
export const disconnectSimplePayment = (userEmail: string, type: 'naver-pay' | 'kakao-pay' | 'toss-pay'): { success: boolean; message: string } => {
  try {
    const existing = getPaymentMethods(userEmail);
    const method = existing.find(m => m.type === type);
    
    if (!method) {
      return {
        success: false,
        message: '연결되지 않은 결제 수단입니다.'
      };
    }
    
    deletePaymentMethod(userEmail, method.id);
    
    const methodName = type === 'naver-pay' ? '네이버페이' : type === 'kakao-pay' ? '카카오페이' : '토스페이';
    
    return {
      success: true,
      message: `${methodName} 연결이 해제되었습니다.`
    };
  } catch (error) {
    return {
      success: false,
      message: '해제 중 오류가 발생했습니다.'
    };
  }
};