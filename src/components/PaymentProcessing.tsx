import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { PaymentMethod } from '../types';

interface PaymentProcessingProps {
  isOpen: boolean;
  paymentMethod: PaymentMethod | null;
  onComplete: () => void;
}

export function PaymentProcessing({ isOpen, paymentMethod, onComplete }: PaymentProcessingProps) {
  useEffect(() => {
    if (isOpen) {
      // Simulate payment processing
      const timer = setTimeout(() => {
        onComplete();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  const getMethodName = () => {
    switch (paymentMethod) {
      case 'naver-pay': return '네이버페이';
      case 'kakao-pay': return '카카오페이';
      case 'toss-pay': return '토스페이';
      case 'paypal': return '페이팔';
      case 'card': return '신용카드';
      case 'bank-transfer': return '무통장입금';
      case 'virtual-account': return '가상계좌';
      default: return '결제';
    }
  };

  const isExternalMethod = ['naver-pay', 'kakao-pay', 'toss-pay', 'paypal'].includes(paymentMethod || '');

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg p-6 lg:p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <Loader2 className="w-16 h-16 mx-auto animate-spin text-primary" />
        </div>
        
        <h2 className="mb-3">결제 처리중</h2>
        
        <p className="text-muted-foreground mb-6">
          {isExternalMethod
            ? `${getMethodName()} 결제 페이지로 이동합니다...`
            : '잠시만 기다려주세요...'}
        </p>

        <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
          <p>창을 닫거나 뒤로가기 버튼을 누르지 마세요.</p>
        </div>
      </div>
    </div>
  );
}
