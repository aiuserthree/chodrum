import { X, Shield } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
  onAdminClick: () => void;
}

export function MobileMenu({ 
  isOpen, 
  onClose, 
  onNavigate, 
  currentPage, 
  onAdminClick,
  isLoggedIn = false,
  userEmail,
  onLogout
}: MobileMenuProps) {
  if (!isOpen) return null;

  const handleNavigate = (page: string) => {
    onNavigate(page);
    onClose();
  };

  const handleAdminClick = () => {
    onAdminClick();
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 lg:hidden"
        onClick={onClose}
      />
      <div className="fixed top-0 left-0 bottom-0 w-64 bg-background z-50 lg:hidden shadow-xl flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <span>메뉴</span>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
          <button
            onClick={() => handleNavigate('home')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              currentPage === 'home' ? 'bg-secondary text-primary' : 'hover:bg-secondary'
            }`}
          >
            홈
          </button>
          <button
            onClick={() => handleNavigate('products')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              currentPage === 'products' ? 'bg-secondary text-primary' : 'hover:bg-secondary'
            }`}
          >
            전체 상품
          </button>
          
          {isLoggedIn ? (
            <>
              <button
                onClick={() => handleNavigate('account')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === 'account' ? 'bg-secondary text-primary' : 'hover:bg-secondary'
                }`}
              >
                마이페이지
              </button>
              <button
                onClick={() => {
                  onClose();
                  onLogout?.();
                }}
                className="w-full text-left px-4 py-3 rounded-lg transition-colors hover:bg-secondary"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavigate('login')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === 'login' ? 'bg-secondary text-primary' : 'hover:bg-secondary'
                }`}
              >
                로그인
              </button>
              <button
                onClick={() => handleNavigate('signup')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === 'signup' ? 'bg-secondary text-primary' : 'hover:bg-secondary'
                }`}
              >
                회원가입
              </button>
            </>
          )}
          
          <button
            onClick={handleAdminClick}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-colors bg-muted hover:bg-secondary"
          >
            <Shield className="w-5 h-5" />
            <span>관리자</span>
          </button>
        </nav>
      </div>
    </>
  );
}
