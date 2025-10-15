import { useCart } from '../../context/CartContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';
import { Trash2, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

interface ShoppingCartProps {
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
}

export function ShoppingCart({ onNavigate, isLoggedIn = false }: ShoppingCartProps) {
  const { cart, removeFromCart, getTotalPrice } = useCart();
  const total = getTotalPrice();

  const handleCheckout = () => {
    if (!isLoggedIn) {
      toast.info('주문을 진행하려면 로그인 또는 비회원 주문을 선택해주세요.');
      onNavigate('checkout-options');
      return;
    }
    
    // 로그인한 상태에서는 바로 결제 페이지로 이동
    toast.success('결제를 진행합니다.');
    onNavigate('checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pb-20 lg:pb-8 flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="mb-2">장바구니가 비어있습니다</h2>
          <p className="text-muted-foreground mb-6">
            상품을 추가해주세요
          </p>
          <Button onClick={() => onNavigate('products')}>
            상품 둘러보기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        <h1 className="mb-6 lg:mb-8">장바구니</h1>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(({ product }) => (
              <div
                key={product.id}
                className="bg-card border border-border rounded-lg p-4 flex gap-4"
              >
                <div 
                  className="w-20 h-20 lg:w-24 lg:h-24 rounded overflow-hidden bg-muted flex-shrink-0 cursor-pointer"
                  onClick={() => onNavigate('product', product.id)}
                >
                  <ImageWithFallback
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 
                    className="truncate mb-1 cursor-pointer hover:text-primary"
                    onClick={() => onNavigate('product', product.id)}
                  >
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    {product.composer}
                  </p>
                  <p className="mb-3">₩{product.price.toLocaleString()}</p>

                  {/* Desktop Remove Button */}
                  <div className="hidden lg:flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(product.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      삭제
                    </Button>
                  </div>
                </div>

                {/* Mobile Remove Button */}
                <div className="lg:hidden flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-2 hover:bg-secondary rounded transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    <Trash2 className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h2 className="mb-6">주문 요약</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>상품 {cart.length}개</span>
                  <span>₩{total.toLocaleString()}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span>합계</span>
                  <span>₩{total.toLocaleString()}</span>
                </div>
              </div>

              <Button
                size="lg"
                onClick={handleCheckout}
                className="w-full mb-3"
              >
                주문하기
              </Button>
              
              <Button
                variant="outline"
                onClick={() => onNavigate('products')}
                className="w-full"
              >
                계속 쇼핑하기
              </Button>

              <div className="mt-6 pt-6 border-t border-border text-sm text-muted-foreground">
                <p className="mb-2">✓ 안전한 결제</p>
                <p className="mb-2">✓ 즉시 다운로드</p>
                <p>✓ 다양한 결제 옵션</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
