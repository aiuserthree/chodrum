import { useState } from 'react';
import { ProductCard } from '../ProductCard';
import { mockProducts } from '../../lib/mockData';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

interface ProductListProps {
  onNavigate: (page: string, productId?: string) => void;
}

export function ProductList({ onNavigate }: ProductListProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    difficulties: [] as string[]
  });

  // 로컬 스토리지에서 상품 데이터 로드 (노출된 상품만)
  const [products] = useState(() => {
    const savedProducts = localStorage.getItem('admin_products');
    if (savedProducts) {
      const allProducts = JSON.parse(savedProducts);
      // 노출된 상품만 필터링 (isVisible이 true이거나 undefined인 경우 - 기존 호환성)
      return allProducts.filter((product: any) => 
        typeof product.isVisible === 'undefined' || product.isVisible === true
      );
    }
    return mockProducts;
  });

  const categories = ['가요', 'CCM', 'Pop', 'J-Pop'];
  const difficulties = ['초급', '중급', '고급', '전문가'];

  const filteredProducts = products.filter(product => {
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }
    if (filters.difficulties.length > 0 && !filters.difficulties.includes(product.difficulty)) {
      return false;
    }
    return true;
  });

  const toggleCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const toggleDifficulty = (difficulty: string) => {
    setFilters(prev => ({
      ...prev,
      difficulties: prev.difficulties.includes(difficulty)
        ? prev.difficulties.filter(d => d !== difficulty)
        : [...prev.difficulties, difficulty]
    }));
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4">카테고리</h3>
        <div className="space-y-3">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label htmlFor={`cat-${category}`} className="cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4">난이도</h3>
        <div className="space-y-3">
          {difficulties.map(difficulty => (
            <div key={difficulty} className="flex items-center space-x-2">
              <Checkbox
                id={`diff-${difficulty}`}
                checked={filters.difficulties.includes(difficulty)}
                onCheckedChange={() => toggleDifficulty(difficulty)}
              />
              <Label htmlFor={`diff-${difficulty}`} className="cursor-pointer">
                {difficulty}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1>전체 악보</h1>
            <p className="text-muted-foreground">
              {filteredProducts.length}개 상품
            </p>
          </div>
          
          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(true)}
            className="lg:hidden"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            필터
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5" />
                <h2>필터</h2>
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Desktop: 3-4 columns */}
            <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => onNavigate('product', product.id)}
                />
              ))}
            </div>

            {/* Mobile: 2 columns */}
            <div className="grid grid-cols-2 gap-4 lg:hidden">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => onNavigate('product', product.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showFilters && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setShowFilters(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-background z-50 lg:hidden rounded-t-2xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
              <h2>필터</h2>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <FilterContent />
            </div>
            <div className="sticky bottom-0 bg-background border-t border-border p-4">
              <Button
                onClick={() => setShowFilters(false)}
                className="w-full"
              >
                {filteredProducts.length}개 상품 보기
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
