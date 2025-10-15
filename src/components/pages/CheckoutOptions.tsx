import { Button } from '../ui/button';
import { UserPlus, LogIn, ShoppingBag } from 'lucide-react';

interface CheckoutOptionsProps {
  onNavigate: (page: string) => void;
  onGuestCheckout: () => void;
}

export function CheckoutOptions({ onNavigate, onGuestCheckout }: CheckoutOptionsProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-muted/30">
      <div className="w-full max-w-2xl">
        <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="mb-2">주문하기</h1>
            <p className="text-muted-foreground">
              주문을 진행하려면 로그인하거나 비회원으로 주문하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 회원 로그인 */}
            <div className="border border-border rounded-lg p-6 hover:border-primary transition-colors">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <LogIn className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2">회원 로그인</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    기존 회원이시라면 로그인해주세요
                  </p>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => onNavigate('login')}
                >
                  로그인
                </Button>
              </div>
            </div>

            {/* 회원가입 */}
            <div className="border border-border rounded-lg p-6 hover:border-primary transition-colors">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserPlus className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2">회원가입</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    회원 혜택을 받으시려면 가입해주세요
                  </p>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => onNavigate('signup')}
                >
                  회원가입
                </Button>
              </div>
            </div>

            {/* 비회원 주문 */}
            <div className="border border-border rounded-lg p-6 hover:border-primary transition-colors">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2">비회원 주문</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    회원가입 없이 바로 주문하세요
                  </p>
                </div>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={onGuestCheckout}
                >
                  비회원 주문
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h4 className="mb-3">회원 혜택</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 구매 내역 및 다운로드 관리</li>
              <li>• 재구매 시 간편 결제</li>
              <li>• 주문 상태 실시간 확인</li>
              <li>• 회원 전용 할인 혜택</li>
            </ul>
          </div>

          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => onNavigate('cart')}
            >
              장바구니로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
