import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle, Download, ArrowLeft } from 'lucide-react';
import { Badge } from '../ui/badge';

interface PaymentSuccessProps {
  onNavigate: (page: string) => void;
}

export function PaymentSuccess({ onNavigate }: PaymentSuccessProps) {
  const [paymentData, setPaymentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // URL 파라미터에서 결제 정보 추출
    const urlParams = new URLSearchParams(window.location.search);
    const paymentKey = urlParams.get('paymentKey');
    const orderId = urlParams.get('orderId');
    const amount = urlParams.get('amount');

    if (paymentKey && orderId && amount) {
      // 실제로는 서버에서 결제 승인 API 호출
      // 여기서는 클라이언트에서만 처리
      setPaymentData({
        paymentKey,
        orderId,
        amount: parseInt(amount),
        status: 'DONE',
        approvedAt: new Date().toISOString(),
        method: '카드' // 실제로는 서버 응답에서 받아야 함
      });
    }
    
    setIsLoading(false);
  }, []);

  const handleDownload = () => {
    // 실제로는 구매한 악보 파일을 다운로드
    alert('악보 파일 다운로드가 시작됩니다.');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>결제 정보를 확인하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-2">결제 정보를 찾을 수 없습니다</h2>
            <p className="text-muted-foreground mb-4">
              결제 과정에서 문제가 발생했을 수 있습니다.
            </p>
            <Button onClick={() => onNavigate('home')}>
              홈으로 돌아가기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* 성공 메시지 */}
        <Card className="mb-6">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-green-600 mb-2">
              결제가 완료되었습니다!
            </h1>
            <p className="text-muted-foreground">
              구매해주셔서 감사합니다. 악보를 다운로드하실 수 있습니다.
            </p>
          </CardContent>
        </Card>

        {/* 결제 정보 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>결제 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">주문번호</span>
              <span className="font-mono text-sm">{paymentData.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">결제수단</span>
              <Badge variant="secondary">{paymentData.method}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">결제금액</span>
              <span className="font-bold text-lg">{paymentData.amount.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">결제일시</span>
              <span>{new Date(paymentData.approvedAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">결제상태</span>
              <Badge className="bg-green-100 text-green-800">완료</Badge>
            </div>
          </CardContent>
        </Card>

        {/* 다운로드 섹션 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>구매한 악보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">드럼 악보</h3>
                  <p className="text-sm text-muted-foreground">PDF 파일</p>
                </div>
                <Button onClick={handleDownload} size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  다운로드
                </Button>
              </div>
            </div>
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
          <Button onClick={handleDownload} className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            악보 다운로드
          </Button>
        </div>

        {/* 안내 메시지 */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">구매 안내</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 구매한 악보는 이메일로도 발송됩니다.</li>
            <li>• 다운로드 링크는 7일간 유효합니다.</li>
            <li>• 문의사항이 있으시면 고객센터로 연락주세요.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
