import { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

interface PaymentFailProps {
  onNavigate: (page: string) => void;
}

export function PaymentFail({ onNavigate }: PaymentFailProps) {
  const [errorData, setErrorData] = useState<any>(null);

  useEffect(() => {
    // URL 파라미터에서 에러 정보 추출
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const message = urlParams.get('message');
    const orderId = urlParams.get('orderId');

    setErrorData({
      code,
      message: message || '결제 처리 중 오류가 발생했습니다.',
      orderId
    });
  }, []);

  const getErrorMessage = (code: string) => {
    const errorMessages: { [key: string]: string } = {
      'PAY_PROCESS_CANCELED': '사용자가 결제를 취소했습니다.',
      'PAY_PROCESS_ABORTED': '결제가 중단되었습니다.',
      'REQUIRE_PAYMENT_METHOD': '결제 수단을 선택해주세요.',
      'INVALID_CARD_COMPANY': '지원하지 않는 카드입니다.',
      'INSUFFICIENT_BALANCE': '잔액이 부족합니다.',
      'CARD_NOT_SUPPORTED': '해당 카드로는 결제할 수 없습니다.',
      'PAYMENT_METHOD_NOT_SUPPORTED': '지원하지 않는 결제 수단입니다.',
    };

    return errorMessages[code] || '결제 처리 중 오류가 발생했습니다.';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* 실패 메시지 */}
        <Card className="mb-6">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-red-600 mb-2">
              결제가 실패했습니다
            </h1>
            <p className="text-muted-foreground mb-4">
              {errorData ? getErrorMessage(errorData.code) : '결제 처리 중 오류가 발생했습니다.'}
            </p>
            {errorData?.orderId && (
              <p className="text-sm text-muted-foreground">
                주문번호: {errorData.orderId}
              </p>
            )}
          </CardContent>
        </Card>

        {/* 오류 정보 */}
        {errorData && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="font-medium mb-3">오류 정보</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">오류 코드</span>
                  <span className="font-mono">{errorData.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">오류 메시지</span>
                  <span>{errorData.message}</span>
                </div>
                {errorData.orderId && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">주문번호</span>
                    <span className="font-mono">{errorData.orderId}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 해결 방법 안내 */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-medium mb-3">해결 방법</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 다른 결제 수단을 시도해보세요.</li>
              <li>• 카드 정보를 다시 확인해주세요.</li>
              <li>• 잔액이 충분한지 확인해주세요.</li>
              <li>• 문제가 지속되면 고객센터로 문의해주세요.</li>
            </ul>
          </CardContent>
        </Card>

        {/* 액션 버튼 */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onNavigate('home')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로 돌아가기
          </Button>
          <Button 
            className="flex-1"
            onClick={() => onNavigate('checkout')}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            다시 결제하기
          </Button>
        </div>

        {/* 고객센터 안내 */}
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">고객센터</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p>• 전화: 1588-0000 (평일 09:00-18:00)</p>
            <p>• 이메일: support@chodrum.com</p>
            <p>• 카카오톡: @chodrum</p>
          </div>
        </div>
      </div>
    </div>
  );
}
