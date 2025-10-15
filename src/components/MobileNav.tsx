import { Home, Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface MobileNavProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function MobileNav({ onNavigate, currentPage }: MobileNavProps) {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const navItems = [
    { id: 'home', icon: Home, label: '홈' },
    { id: 'products', icon: Search, label: '검색' },
    { id: 'cart', icon: ShoppingCart, label: '장바구니' },
    { id: 'account', icon: User, label: '계정' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-3 py-2 rounded-lg transition-colors ${
              currentPage === id
                ? 'text-primary bg-secondary'
                : 'text-muted-foreground'
            }`}
          >
            <div className="relative">
              <Icon className="w-6 h-6" />
              {id === 'cart' && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
