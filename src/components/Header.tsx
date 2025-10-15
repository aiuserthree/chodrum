import { Search, ShoppingCart, Menu, Music2, User, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import logoImage from '../assets/8aaae83d3eb9c8be78df183340318ee1aa32e9ea.png';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onMenuClick: () => void;
  isLoggedIn?: boolean;
  userEmail?: string;
  onLogout?: () => void;
}

export function Header({ 
  onNavigate, 
  currentPage, 
  onMenuClick, 
  isLoggedIn = false,
  userEmail,
  onLogout
}: HeaderProps) {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden lg:block border-b border-border bg-background sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-8">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <img src={logoImage} alt="chodrum" className="h-10 w-auto" />
              <span className="text-xl">chodrum</span>
            </div>
            
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="악보, 작곡가 검색..."
                  className="pl-10 bg-input-background"
                />
              </div>
            </div>

            <nav className="flex items-center gap-6">
              <button
                onClick={() => onNavigate('home')}
                className={`hover:text-primary transition-colors ${currentPage === 'home' ? 'text-primary' : ''}`}
              >
                홈
              </button>
              <button
                onClick={() => onNavigate('products')}
                className={`hover:text-primary transition-colors ${currentPage === 'products' ? 'text-primary' : ''}`}
              >
                전체 상품
              </button>
              {!isLoggedIn && (
                <button
                  onClick={() => onNavigate('account')}
                  className={`hover:text-primary transition-colors ${currentPage === 'account' ? 'text-primary' : ''}`}
                >
                  마이페이지
                </button>
              )}
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    onClick={() => onNavigate('account')}
                    title={userEmail}
                  >
                    <User className="w-5 h-5 mr-2" />
                    마이페이지
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={onLogout}
                  >
                    로그아웃
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => onNavigate('login')}
                  >
                    로그인
                  </Button>
                  <Button
                    onClick={() => onNavigate('signup')}
                  >
                    회원가입
                  </Button>
                </div>
              )}
              <button
                onClick={() => onNavigate('cart')}
                className="relative"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden border-b border-border bg-background sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <button onClick={onMenuClick}>
              <Menu className="w-6 h-6" />
            </button>
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <img src={logoImage} alt="chodrum" className="h-8 w-auto" />
              <span>chodrum</span>
            </div>
            <button
              onClick={() => onNavigate('cart')}
              className="relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="악보 검색..."
              className="pl-9 bg-input-background h-10"
            />
          </div>
        </div>
      </header>
    </>
  );
}
