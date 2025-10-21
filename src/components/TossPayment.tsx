import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CreditCard, Building2, Wallet, Smartphone } from 'lucide-react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { TOSS_CONFIG } from '../config/toss';

interface TossPaymentProps {
  amount: number;
  orderName: string;
  customerName: string;
  customerEmail: string;
  onPaymentSuccess: (paymentData: any) => void;
  onPaymentError: (error: any) => void;
}

export function TossPayment({
  amount,
  orderName,
  customerName,
  customerEmail,
  onPaymentSuccess,
  onPaymentError
}: TossPaymentProps) {
  const [tossPayments, setTossPayments] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>('카드');

  // 토스페이먼츠 SDK 초기화
  useEffect(() => {
    const initializeTossPayments = async () => {
      try {
        const tossPaymentsInstance = await loadTossPayments(TOSS_CONFIG.CLIENT_KEY);
        setTossPayments(tossPaymentsInstance);
      } catch (error) {
        console.error('토스페이먼츠 초기화 실패:', error);
        onPaymentError(error);
      }
    };

    initializeTossPayments();
  }, [onPaymentError]);

  // 주문 ID 생성 (실제로는 서버에서 생성해야 함)
  const generateOrderId = () => {
    return `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // 결제 요청
  const handlePayment = async () => {
    if (!tossPayments) {
      onPaymentError(new Error('토스페이먼츠가 초기화되지 않았습니다.'));
      return;
    }

    setIsLoading(true);

    try {
      const orderId = generateOrderId();
      
      // 결제 요청 데이터
      const safeOrderName = orderName && orderName.trim() !== '' ? orderName : '드럼 악보 주문';
      
      const paymentData = {
        orderId,
        orderName: safeOrderName,
        amount,
        customerName,
        customerEmail,
        successUrl: TOSS_CONFIG.SUCCESS_URL,
        failUrl: TOSS_CONFIG.FAIL_URL,
      };

      // 결제 수단별 처리
      switch (selectedMethod) {
        case '카드':
          await tossPayments.requestPayment('카드', paymentData);
          break;
        case '계좌이체':
          await tossPayments.requestPayment('계좌이체', paymentData);
          break;
        case '네이버페이':
          await tossPayments.requestPayment('네이버페이', paymentData);
          break;
        case '카카오페이':
          await tossPayments.requestPayment('카카오페이', paymentData);
          break;
        case '가상계좌':
          await tossPayments.requestPayment('가상계좌', paymentData);
          break;
        default:
          throw new Error('지원하지 않는 결제 수단입니다.');
      }

    } catch (error) {
      console.error('결제 요청 실패:', error);
      onPaymentError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const paymentMethods = [
    { id: '카드', label: '신용카드', icon: CreditCard, description: 'Visa, Master, 국내카드' },
    { id: '계좌이체', label: '계좌이체', icon: Building2, description: '실시간 계좌이체' },
    { id: '가상계좌', label: '가상계좌', icon: Wallet, description: '무통장입금' },
  ];

  return (
    <div className="space-y-8">
      {/* 결제 정보 */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            결제 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">상품명</span>
            <span className="font-medium">{orderName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">구매자</span>
            <span className="font-medium">{customerName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">이메일</span>
            <span className="font-medium">{customerEmail}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold">
            <span>총 결제금액</span>
            <span className="text-primary">{amount.toLocaleString()}원</span>
          </div>
        </CardContent>
      </Card>

      {/* 결제 수단 선택 */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>결제 수단 선택</CardTitle>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    selectedMethod === method.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{method.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {method.description}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 결제 버튼 */}
      <div className="space-y-4">
        <Button
          onClick={handlePayment}
          disabled={!tossPayments || isLoading}
          size="lg"
          className="w-full"
        >
          {isLoading ? (
            '결제 처리 중...'
          ) : (
            `${amount.toLocaleString()}원 결제하기`
          )}
        </Button>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>토스페이먼츠를 통해 안전하게 결제됩니다.</p>
          {TOSS_CONFIG.IS_LIVE_MODE ? (
            <div className="bg-green-50 border border-green-200 rounded p-2 mt-2">
              <p className="text-green-700 font-medium">✅ 실제 결제 모드</p>
              <p className="text-green-600">실제 결제가 이루어집니다.</p>
            </div>
          ) : (
            <div className="bg-orange-50 border border-orange-200 rounded p-2 mt-2">
              <p className="text-orange-700 font-medium">🧪 테스트 모드</p>
              <p className="text-orange-600">실제 결제가 이루어지지 않습니다.</p>
              <p className="text-orange-600 text-xs">실제 결제를 위해서는 운영 키가 필요합니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
