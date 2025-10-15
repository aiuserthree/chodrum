import { Product } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Music, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { Button } from './ui/button';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    addToCart(product);
    toast.success('장바구니에 추가되었습니다', {
      description: product.title,
    });
  };

  const handleClick = () => {
    console.log('상품 카드 클릭됨:', product.id, product.title);
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer group"
    >
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        <ImageWithFallback
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-sm">
          ₩{product.price.toLocaleString()}
        </div>
        {/* 데스크톱: 호버시 표시, 모바일: 항상 표시 */}
        <Button
          size="icon"
          variant="secondary"
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 w-10 h-10 rounded-full shadow-lg lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
        >
          <ShoppingCart className="w-5 h-5" />
        </Button>
      </div>
      <div className="p-4">
        <div className="flex items-start gap-2 mb-2">
          <Music className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="truncate">{product.title}</h3>
            <p className="text-muted-foreground text-sm">{product.composer}</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{product.difficulty}</span>
          <span className="text-muted-foreground">{product.pages} 페이지</span>
        </div>
      </div>
    </div>
  );
}
