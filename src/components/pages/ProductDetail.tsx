import { Product } from '../../types';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Download, FileText, Award, ChevronLeft } from 'lucide-react';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';

interface ProductDetailProps {
  product: Product;
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
}

export function ProductDetail({ product, onNavigate, isLoggedIn = false }: ProductDetailProps) {
  const { addToCart } = useCart();
  
  // 디버깅 로그
  console.log('ProductDetail 렌더링됨:', product.id, product.title);

  // 유튜브 URL을 embed 형식으로 변환
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // 이미 embed URL인 경우
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    // youtu.be 형식인 경우
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
    }
    
    // youtube.com/watch 형식인 경우
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
    }
    
    // 일반 유튜브 URL에서 비디오 ID 추출
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (videoIdMatch) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}?rel=0&modestbranding=1`;
    }
    
    return url;
  };

  const handleAddToCart = () => {
    addToCart(product);
    
    if (!isLoggedIn) {
      toast.info('로그인하시면 더 편리하게 이용하실 수 있습니다.');
      onNavigate('checkout-options');
      return;
    }
    
    toast.success('장바구니에 추가되었습니다', {
      description: product.title,
    });
  };

  const handleBuyNow = () => {
    addToCart(product);
    
    if (!isLoggedIn) {
      toast.info('주문을 진행하려면 로그인 또는 비회원 주문을 선택해주세요.');
      onNavigate('checkout-options');
      return;
    }
    
    // 로그인한 상태에서는 바로 결제 페이지로 이동
    toast.success('결제를 진행합니다.');
    onNavigate('checkout');
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('products')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          상품 목록으로
        </button>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12">
          {/* Left: Image */}
          <div className="space-y-6">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted">
              <ImageWithFallback
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover blur-sm"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="text-center text-white">
                  <Download className="w-16 h-16 mx-auto mb-4 opacity-70" />
                  <p>미리보기 - 구매 후 고화질 PDF 다운로드</p>
                </div>
              </div>
            </div>

            {/* YouTube Video */}
            {product.youtubeUrl && (
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={getEmbedUrl(product.youtubeUrl)}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
                  loading="lazy"
                  onError={() => {
                    console.log('YouTube iframe 로드 실패');
                  }}
                />
                <div className="mt-2 text-center">
                  <a 
                    href={product.youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    유튜브에서 영상 보기 →
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="mb-2">{product.title}</h1>
              <p className="text-muted-foreground text-xl mb-4">{product.composer}</p>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant="outline">{product.difficulty}</Badge>
              </div>
              <div className="text-3xl mb-6">₩{product.price.toLocaleString()}</div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <FileText className="w-5 h-5" />
                <span>{product.pages}페이지</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Award className="w-5 h-5" />
                <span>{product.difficulty} 레벨</span>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="mb-3">상품 설명</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div className="space-y-3 pt-6">
              <Button size="lg" onClick={handleBuyNow} className="w-full">
                구매하기
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleAddToCart}
                className="w-full"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                장바구니 담기
              </Button>
            </div>

            <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
              <p>✓ 구매 후 즉시 다운로드</p>
              <p>✓ 고품질 PDF 형식</p>
              <p>✓ 구매 후 평생 이용</p>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {/* Image */}
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted">
            <ImageWithFallback
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover blur-sm"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="text-center text-white px-4">
                <Download className="w-12 h-12 mx-auto mb-3 opacity-70" />
                <p className="text-sm">미리보기 - 구매 후 고화질 PDF</p>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="mb-2">{product.title}</h1>
            <p className="text-muted-foreground mb-4">{product.composer}</p>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="secondary">{product.category}</Badge>
              <Badge variant="outline">{product.difficulty}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
            <div className="text-center">
              <FileText className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{product.pages}페이지</p>
            </div>
            <div className="text-center">
              <Award className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{product.difficulty}</p>
            </div>
          </div>

          <div>
            <h3 className="mb-3">상품 설명</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* YouTube Video */}
          {product.youtubeUrl && (
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={getEmbedUrl(product.youtubeUrl)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
                loading="lazy"
                onError={() => {
                  console.log('YouTube iframe 로드 실패');
                }}
              />
              <div className="mt-2 text-center">
                <a 
                  href={product.youtubeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  유튜브에서 영상 보기 →
                </a>
              </div>
            </div>
          )}

          <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground space-y-1">
            <p>✓ 구매 후 즉시 다운로드</p>
            <p>✓ 고품질 PDF 형식</p>
            <p>✓ 평생 이용 가능</p>
          </div>

          {/* Mobile Action Buttons */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground">가격</span>
              <span className="text-2xl">₩{product.price.toLocaleString()}</span>
            </div>
            <Button size="lg" onClick={handleBuyNow} className="w-full min-h-[48px]">
              구매하기
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleAddToCart}
              className="w-full min-h-[48px]"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              장바구니 담기
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-40">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">가격</p>
            <p>₩{product.price.toLocaleString()}</p>
          </div>
          <Button size="lg" onClick={handleAddToCart} variant="outline" className="min-w-[44px] min-h-[44px]">
            <ShoppingCart className="w-5 h-5" />
          </Button>
          <Button size="lg" onClick={handleBuyNow} className="flex-1 min-h-[44px]">
            구매하기
          </Button>
        </div>
      </div>
    </div>
  );
}
