import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { mockOrders } from '../../lib/mockData';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ChevronLeft, Package, Calendar, CreditCard, Mail, Phone } from 'lucide-react';

interface GuestOrderLookupProps {
  onNavigate: (page: string) => void;
}

export function GuestOrderLookup({ onNavigate }: GuestOrderLookupProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [foundOrder, setFoundOrder] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !phone) {
      toast.error('이메일과 전화번호를 모두 입력해주세요.');
      return;
    }

    setIsSearching(true);

    // 실제로는 API 호출
    setTimeout(() => {
      // 데모용으로 이메일과 전화번호로 조회 (실제로는 mockOrders에 phone 필드 추가 필요)
      const order = mockOrders.find(
        o => o.email.toLowerCase() === email.toLowerCase()
      );

      setIsSearching(false);

      if (order) {
        setFoundOrder(order);
        toast.success('주문을 찾았습니다.');
      } else {
        toast.error('주문을 찾을 수 없습니다. 이메일과 전화번호를 확인해주세요.');
        setFoundOrder(null);
      }
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'refunded':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '완료';
      case 'pending': return '대기중';
      case 'processing': return '처리중';
      case 'failed': return '실패';
      case 'refunded': return '환불됨';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-muted/30">
      <div className="w-full max-w-4xl">
        <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
          <button
            onClick={() => onNavigate('login')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            로그인으로 돌아가기
          </button>

          <div className="mb-8">
            <h1 className="mb-2">비회원 주문조회</h1>
            <p className="text-muted-foreground">
              주문 시 입력하신 이메일과 전화번호를 입력하여 주문 내역을 확인하세요
            </p>
          </div>

          {!foundOrder ? (
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">
                  이메일 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-input-background"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  주문 시 입력하신 이메일 주소를 입력해주세요
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  전화번호 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="010-1234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-input-background"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  주문 시 입력하신 전화번호를 입력해주세요
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isSearching}>
                {isSearching ? '조회 중...' : '주문 조회'}
              </Button>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">💡 데모용 테스트 정보:</p>
                <p className="text-sm">이메일: <span className="font-medium text-foreground">john@example.com</span></p>
                <p className="text-sm">전화번호: <span className="font-medium text-foreground">010-1234-5678</span></p>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Order Info */}
              <div className="p-6 bg-muted rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">주문번호</p>
                      <p className="font-medium">{foundOrder.id}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">주문일시</p>
                      <p className="font-medium">{foundOrder.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">이메일</p>
                      <p className="font-medium">{foundOrder.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">전화번호</p>
                      <p className="font-medium">{phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">결제 수단</p>
                      <p className="font-medium">{foundOrder.paymentMethod}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">주문 상태</span>
                    <Badge className={getStatusColor(foundOrder.status)}>
                      {getStatusText(foundOrder.status)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="mb-4">주문 상품</h3>
                <div className="space-y-3">
                  {foundOrder.items.map((item: any, index: number) => (
                    <div key={index} className="flex gap-4 p-4 bg-muted rounded-lg">
                      <div className="w-20 h-20 rounded overflow-hidden bg-background flex-shrink-0">
                        <ImageWithFallback
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="mb-1">{item.product.title}</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.product.composer}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{item.product.category}</Badge>
                          <Badge variant="outline">{item.product.difficulty}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="mb-1">₩{item.product.price.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">수량: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="p-6 bg-muted rounded-lg">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>상품 금액</span>
                    <span>₩{foundOrder.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>배송비</span>
                    <span>₩0</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <span>총 결제 금액</span>
                  <span className="text-2xl">₩{foundOrder.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setFoundOrder(null);
                    setEmail('');
                    setPhone('');
                  }}
                >
                  다른 주문 조회
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => window.print()}
                >
                  영수증 인쇄
                </Button>
              </div>

              {foundOrder.status === 'completed' && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    ✓ 결제가 완료되었습니다. 구매하신 악보를 다운로드하실 수 있습니다.
                  </p>
                </div>
              )}

              {foundOrder.status === 'pending' && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    ⏳ 결제 승인 대기 중입니다. 잠시만 기다려주세요.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}
