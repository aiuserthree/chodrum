import { ReactNode } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Settings, 
  LogOut,
  Menu,
  X,
  Users
} from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import logoImage from '../../assets/8aaae83d3eb9c8be78df183340318ee1aa32e9ea.png';

interface AdminLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function AdminLayout({ children, currentPage, onNavigate, onLogout }: AdminLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'admin-dashboard', icon: LayoutDashboard, label: '대시보드' },
    { id: 'admin-products', icon: Package, label: '상품 관리' },
    { id: 'admin-orders', icon: ShoppingBag, label: '주문 관리' },
    { id: 'admin-members', icon: Users, label: '회원 관리' },
    { id: 'admin-settings', icon: Settings, label: '설정' },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <img src={logoImage} alt="chodrum" className="h-8 w-auto" />
          <h2>chodrum</h2>
        </div>
        <p className="text-sm text-muted-foreground mt-1">관리 콘솔</p>
      </div>
      
      <nav className="p-4 flex-1 overflow-y-auto scrollbar-hide">
        <div className="space-y-2">
          {menuItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => {
                onNavigate(id);
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === id || (id === 'admin-products' && currentPage === 'admin-product-detail')
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-secondary'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full justify-start"
        >
          <LogOut className="w-5 h-5 mr-3" />
          로그아웃
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-card border-r border-border">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <aside className="fixed top-0 left-0 bottom-0 w-64 bg-card z-50 lg:hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2>메뉴</h2>
              <button onClick={() => setIsMobileSidebarOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <SidebarContent />
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-card border-b border-border px-4 py-3 lg:px-6 lg:py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:block">
              <h1 className="text-xl">관리자 패널</h1>
            </div>
            <div className="lg:hidden">
              <h1 className="text-lg">관리자</h1>
            </div>
            <Button
              variant="outline"
              onClick={onLogout}
              className="hidden lg:flex"
            >
              <LogOut className="w-4 h-4 mr-2" />
              로그아웃
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
}
