import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { PaymentMethod } from '../../types';
import { PaymentMethods } from '../PaymentMethods';
import { PaymentProcessing } from '../PaymentProcessing';
import { TossPayment } from '../TossPayment';
import { Button } from '../ui/button';
import { ChevronLeft, ShoppingCart, CreditCard, CheckCircle2, Trash2 } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Checkbox } from '../ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { toast } from 'sonner';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface CheckoutProps {
  onNavigate: (page: string) => void;
  onOrderComplete: (orderId: string) => void;
  isGuest?: boolean;
  customerEmail?: string | null;
  customerName?: string | null;
}

export function Checkout({ onNavigate, onOrderComplete, isGuest = false, customerEmail, customerName }: CheckoutProps) {
  const { cart, getTotalPrice, removeFromCart } = useCart();
  const [step, setStep] = useState<'cart' | 'payment' | 'processing'>('cart');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const total = getTotalPrice();

  const handleProceedToPayment = () => {
    if (!agreedToTerms) {
      toast.error('이용약관에 동의해주세요.');
      return;
    }

    if (isGuest) {
      if (!guestInfo.name || !guestInfo.email || !guestInfo.phone) {
        toast.error('이름, 이메일, 전화번호를 모두 입력해주세요.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(guestInfo.email)) {
        toast.error('올바른 이메일 주소를 입력해주세요.');
        return;
      }

      const phoneRegex = /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/;
      if (!phoneRegex.test(guestInfo.phone)) {
        toast.error('올바른 전화번호를 입력해주세요. (예: 010-1234-5678)');
        return;
      }
    }

    setStep('payment');
  };

  const handleAgreeToTerms = () => {
    setAgreedToTerms(true);
    setShowTermsDialog(false);
    toast.success('이용약관에 동의하셨습니다.');
  };

  const handlePaymentSubmit = () => {
    setIsProcessing(true);
  };

  const handlePaymentComplete = () => {
    setIsProcessing(false);
    const orderId = 'ORD-' + Date.now();
    onOrderComplete(orderId);
  };

  // 토스페이먼츠 결제 성공 처리
  const handleTossPaymentSuccess = (paymentData: any) => {
    console.log('토스페이먼츠 결제 성공:', paymentData);
    toast.success('결제가 완료되었습니다!');
    const orderId = paymentData.orderId || 'ORD-' + Date.now();
    onOrderComplete(orderId);
  };

  // 토스페이먼츠 결제 실패 처리
  const handleTossPaymentError = (error: any) => {
    console.error('토스페이먼츠 결제 실패:', error);
    toast.error('결제 처리 중 오류가 발생했습니다.');
  };

  if (cart.length === 0) {
    onNavigate('cart');
    return null;
  }

  return (
    <>
      <div className="min-h-screen pb-20 lg:pb-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 lg:gap-4 mb-6">
              <div className="flex items-center">
                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center ${
                  step === 'cart' ? 'bg-primary text-primary-foreground' : 'bg-green-600 text-white'
                }`}>
                  {step === 'cart' ? '1' : <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6" />}
                </div>
                <span className="ml-2 hidden lg:inline">장바구니</span>
              </div>
              
              <div className="w-8 lg:w-16 h-0.5 bg-border" />
              
              <div className="flex items-center">
                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center ${
                  step === 'payment' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  2
                </div>
                <span className="ml-2 hidden lg:inline">결제</span>
              </div>
              
              <div className="w-8 lg:w-16 h-0.5 bg-border" />
              
              <div className="flex items-center">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center bg-muted text-muted-foreground">
                  3
                </div>
                <span className="ml-2 hidden lg:inline">완료</span>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => step === 'payment' ? setStep('cart') : onNavigate('cart')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            이전
          </button>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 'cart' && (
                <div>
                  <h1 className="mb-6">{isGuest ? '비회원 주문' : '주문 확인'}</h1>
                  
                  {/* Guest Info Form */}
                  {isGuest && (
                    <div className="mb-6 p-6 bg-muted rounded-lg border border-border">
                      <h3 className="mb-4">주문자 정보</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="guest-name">
                            이름 <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="guest-name"
                            type="text"
                            placeholder="홍길동"
                            value={guestInfo.name}
                            onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                            className="bg-input-background"
                          />
                        </div>
                        <div>
                          <Label htmlFor="guest-email">
                            이메일 <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="guest-email"
                            type="email"
                            placeholder="example@email.com"
                            value={guestInfo.email}
                            onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                            className="bg-input-background"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            주문 내역과 악보 다운로드 링크가 발송됩니다
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="guest-phone">
                            전화번호 <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="guest-phone"
                            type="tel"
                            placeholder="010-1234-5678"
                            value={guestInfo.phone}
                            onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                            className="bg-input-background"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            주문 조회 시 필요합니다
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 mb-6">
                    {cart.map(({ product, quantity }) => (
                      <div
                        key={product.id}
                        className="bg-card border border-border rounded-lg p-4 flex gap-4"
                      >
                        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded overflow-hidden bg-muted flex-shrink-0">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="truncate mb-1">{product.title}</h3>
                          <p className="text-muted-foreground text-sm mb-2">
                            {product.composer}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground text-sm">
                              수량: {quantity}
                            </span>
                            <span>₩{(product.price * quantity).toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              removeFromCart(product.id);
                              toast.success('상품이 삭제되었습니다.');
                            }}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Terms Agreement */}
                  <div className="p-4 bg-muted rounded-lg border border-border">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="checkout-terms"
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <label htmlFor="checkout-terms" className="text-sm cursor-pointer">
                          <span className="text-destructive">*</span> 이용약관 및 환불정책에 동의합니다{' '}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowTermsDialog(true);
                            }}
                            className="text-primary hover:underline"
                          >
                            (보기)
                          </button>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 'payment' && (
                <div>
                  <h1 className="mb-6">결제 정보</h1>
                  <TossPayment
                    amount={total}
                    orderName={(() => {
                      if (!cart || cart.length === 0) {
                        return '상품명 없음';
                      }
                      
                      const firstProductTitle = cart[0]?.product?.title || '상품';
                      if (!firstProductTitle || firstProductTitle.trim() === '') {
                        return '드럼 악보';
                      }
                      
                      const orderName = cart.length === 1 
                        ? firstProductTitle 
                        : `${firstProductTitle} 외 ${cart.length - 1}개`;
                      
                      return orderName;
                    })()}
                    customerName={isGuest ? guestInfo.name : (customerName || '고객')}
                    customerEmail={isGuest ? guestInfo.email : (customerEmail || 'customer@example.com')}
                    onPaymentSuccess={handleTossPaymentSuccess}
                    onPaymentError={handleTossPaymentError}
                  />
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h2 className="mb-6">주문 요약</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>상품 ({cart.length})</span>
                    <span>₩{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>세금</span>
                    <span>₩0</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span>합계</span>
                    <span>₩{total.toLocaleString()}</span>
                  </div>
                </div>

                {step === 'cart' && (
                  <Button
                    size="lg"
                    onClick={handleProceedToPayment}
                    className="w-full"
                  >
                    결제 진행
                  </Button>
                )}

                <div className="mt-6 pt-6 border-t border-border space-y-2">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
                    <span>SSL 암호화 보안 결제</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
                    <span>결제 후 즉시 다운로드</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
                    <span>7일 환불 보장</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Processing Modal */}
      <PaymentProcessing
        isOpen={isProcessing}
        paymentMethod={selectedPaymentMethod}
        onComplete={handlePaymentComplete}
      />

      {/* Terms Dialog */}
      <Dialog open={showTermsDialog} onOpenChange={setShowTermsDialog}>
        <DialogContent className="max-w-3xl max-h-[85vh]">
          <DialogHeader>
            <DialogTitle>이용약관 및 환불정책</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6 text-sm">
              <section>
                <h3 className="mb-3">제1조 (목적)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  이 약관은 조드럼닷컴(이하 "회사")이 운영하는 웹사이트에서 제공하는 악보 PDF 판매 서비스(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                </p>
              </section>

              <section>
                <h3 className="mb-3">제2조 (정의)</h3>
                <div className="space-y-2 text-muted-foreground leading-relaxed">
                  <p>1. "회사"란 조드럼닷컴을 운영하는 사업자를 말합니다.</p>
                  <p>2. "회원"이란 회사의 서비스에 접속하여 이 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.</p>
                  <p>3. "디지털 콘텐츠"란 회사가 제공하는 악보 PDF 파일을 말합니다.</p>
                  <p>4. "구매"란 회원이 회사가 제공하는 디지털 콘텐츠를 유료로 구입하는 것을 말합니다.</p>
                </div>
              </section>

              <section>
                <h3 className="mb-3">제3조 (서비스의 제공)</h3>
                <div className="space-y-2 text-muted-foreground leading-relaxed">
                  <p>1. 회사는 다음과 같은 서비스를 제공합니다:</p>
                  <p className="ml-4">- 악보 PDF 파일의 온라인 판매</p>
                  <p className="ml-4">- 구매한 악보의 다운로드 서비스</p>
                  <p className="ml-4">- 기타 회사가 정하는 서비스</p>
                  <p>2. 회사는 서비스의 품질 향상을 위해 서비스의 내용을 변경할 수 있습니다.</p>
                </div>
              </section>

              <section>
                <h3 className="mb-3">제4조 (저작권 및 이용제한)</h3>
                <div className="space-y-2 text-muted-foreground leading-relaxed">
                  <p>1. 회사가 제공하는 모든 디지털 콘텐츠의 저작권은 회사 또는 원저작권자에게 있습니다.</p>
                  <p>2. 회원은 구매한 디지털 콘텐츠를 개인적인 용도로만 사용할 수 있으며, 상업적 목적으로 사용하거나 제3자에게 양도, 대여, 재배포할 수 없습니다.</p>
                  <p>3. 회원이 본 조항을 위반할 경우 관련 법령에 따라 민·형사상 책임을 질 수 있습니다.</p>
                </div>
              </section>

              <section className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                <h3 className="mb-3 text-destructive">제5조 (환불정책) - 중요</h3>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">1. 환불 불가 사항</p>
                    <p className="ml-4">• 디지털 콘텐츠의 특성상 다운로드가 완료된 후에는 환불이 불가능합니다.</p>
                    <p className="ml-4">• 악보 파일을 다운로드한 경우 환불이 제한됩니다.</p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium text-foreground">2. 환불 가능 사항</p>
                    <p>다음의 경우에는 환불이 가능합니다:</p>
                    <p className="ml-4">• 상품 설명과 실제 상품이 현저히 다른 경우</p>
                    <p className="ml-4">• 파일 손상 등으로 정상적인 사용이 불가능한 경우</p>
                    <p className="ml-4">• 중복 구매한 경우 (다운로드 전에 한함)</p>
                    <p className="ml-4">• 결제 오류로 인한 중복 결제</p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium text-foreground">3. 환불 신청 방법</p>
                    <p className="ml-4">• 환불은 구매일로부터 7일 이내에 요청해야 합니다.</p>
                    <p className="ml-4">• 고객센터(chodrumstudio@gmail.com)로 환불 신청서를 제출해주세요.</p>
                    <p className="ml-4">• 환불 사유 확인 후 3-5영업일 내 처리됩니다.</p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium text-foreground">4. 환불 처리</p>
                    <p className="ml-4">• 승인된 환불은 결제 수단에 따라 처리됩니다.</p>
                    <p className="ml-4">• 신용카드: 카드사 승인 취소 (영업일 기준 3-5일)</p>
                    <p className="ml-4">• 계좌이체: 고객 계좌로 직접 입금 (영업일 기준 3-5일)</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-3">제6조 (결제)</h3>
                <div className="space-y-2 text-muted-foreground leading-relaxed">
                  <p>1. 회원은 다음 각 호의 방법으로 결제할 수 있습니다:</p>
                  <p className="ml-4">• 신용카드, 체크카드</p>
                  <p className="ml-4">• 네이버페이, 카카오페이, 토스페이</p>
                  <p className="ml-4">• 무통장입금, 가상계좌</p>
                  <p className="ml-4">• PayPal (해외 결제)</p>
                  <p>2. 결제 완료 후 즉시 다운로드가 가능합니다.</p>
                </div>
              </section>

              <section>
                <h3 className="mb-3">제7조 (개인정보 보호)</h3>
                <div className="space-y-2 text-muted-foreground leading-relaxed">
                  <p>회사는 관계 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 이용에 대해서는 관련 법령 및 회사의 개인정보처리방침이 적용됩니다.</p>
                </div>
              </section>

              <section>
                <h3 className="mb-3">제8조 (면책조항)</h3>
                <div className="space-y-2 text-muted-foreground leading-relaxed">
                  <p>1. 회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력으로 인하여 서비스를 제공할 수 없는 경우 서비스 제공에 대한 책임이 면제됩니다.</p>
                  <p>2. 회사는 회원의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.</p>
                </div>
              </section>

              <section>
                <h3 className="mb-3">제9조 (분쟁 해결)</h3>
                <div className="space-y-2 text-muted-foreground leading-relaxed">
                  <p>1. 서비스 이용과 관련하여 회사와 회원 간에 분쟁이 발생한 경우, 쌍방간 합의에 의하여 원만히 해결합니다.</p>
                  <p>2. 합의가 이루어지지 않을 경우 관련 법령에 따라 처리합니다.</p>
                </div>
              </section>

              <section>
                <h3 className="mb-3">제10조 (고객센터)</h3>
                <div className="space-y-2 text-muted-foreground leading-relaxed">
                  <p>• 이메일: chodrumstudio@gmail.com</p>
                  <p>• 사업자: 조드럼닷컴 (대표: 조준형)</p>
                  <p>• 사업자등록번호: 366-31-01280</p>
                </div>
              </section>
            </div>
          </ScrollArea>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowTermsDialog(false)}>
              닫기
            </Button>
            <Button onClick={handleAgreeToTerms}>
              동의하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
