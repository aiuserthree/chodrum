import { useState } from 'react';
import { ProductCard } from '../ProductCard';
import { mockProducts } from '../../lib/mockData';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface HomepageProps {
  onNavigate: (page: string, productId?: string) => void;
}

export function Homepage({ onNavigate }: HomepageProps) {
  // 로컬 스토리지에서 상품 데이터 로드
  const [products] = useState(() => {
    const savedProducts = localStorage.getItem('admin_products');
    if (savedProducts) {
      return JSON.parse(savedProducts);
    }
    return mockProducts;
  });

  const recentlyUpdated = products.slice(0, 5);

  return (
    <div className="min-h-screen pb-20 lg:pb-8">
      {/* Recently Updated */}
      <section className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="flex items-center justify-between mb-6">
          <h2>최근 업데이트</h2>
          <Button
            variant="ghost"
            onClick={() => onNavigate('products')}
            className="hidden lg:flex"
          >
            전체 보기
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Desktop: Horizontal Row */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-6">
          {recentlyUpdated.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onNavigate('product', product.id)}
            />
          ))}
        </div>

        {/* Mobile: Vertical Scrollable */}
        <div className="lg:hidden space-y-4">
          {recentlyUpdated.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onNavigate('product', product.id)}
            />
          ))}
        </div>

        <Button
          variant="outline"
          onClick={() => onNavigate('products')}
          className="w-full mt-6 lg:hidden"
        >
          전체 상품 보기
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3>즉시 다운로드</h3>
            <p className="text-muted-foreground">
              구매 즉시 악보를 다운로드 받으실 수 있습니다. 기다림 없이 바로 시작하세요.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3>고품질 악보</h3>
            <p className="text-muted-foreground">
              전문적인 악보 표기와 선명한 인쇄로 최상의 연습 경험을 제공합니다.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3>안전한 결제</h3>
            <p className="text-muted-foreground">
              네이버페이, 카카오페이 등 다양한 결제 수단을 지원합니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
