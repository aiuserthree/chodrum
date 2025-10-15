import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { MobileMenu } from './components/MobileMenu';
import { Homepage } from './components/pages/Homepage';
import { ProductList } from './components/pages/ProductList';
import { ProductDetail } from './components/pages/ProductDetail';
import { ShoppingCart } from './components/pages/ShoppingCart';
import { Checkout } from './components/pages/Checkout';
import { OrderConfirmation } from './components/pages/OrderConfirmation';
import { PaymentSuccess } from './components/pages/PaymentSuccess';
import { PaymentFail } from './components/pages/PaymentFail';
import { UserAccount } from './components/pages/UserAccount';
import { Login } from './components/pages/Login';
import { Signup } from './components/pages/Signup';
import { CheckoutOptions } from './components/pages/CheckoutOptions';
import { GuestOrderLookup } from './components/pages/GuestOrderLookup';
import { Terms } from './components/pages/Terms';
import { Privacy } from './components/pages/Privacy';
import { Guide } from './components/pages/Guide';
import { About } from './components/pages/About';
import { Footer } from './components/Footer';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { AdminProducts } from './components/admin/AdminProducts';
import { AdminProductDetail } from './components/admin/AdminProductDetail';
import { AdminOrders } from './components/admin/AdminOrders';
import { AdminMembers } from './components/admin/AdminMembers';
import { AdminSettings } from './components/admin/AdminSettings';
import { mockProducts } from './lib/mockData';
import { Toaster } from './components/ui/sonner';
import { Button } from './components/ui/button';
import { ScrollToTop } from './components/ScrollToTop';
import { toast } from 'sonner';

export default function App() {
  const [siteMode, setSiteMode] = useState<'customer' | 'admin'>('customer');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(() => {
    // 페이지 로드 시 localStorage에서 로그인 상태 복원
    return localStorage.getItem('customer_logged_in') === 'true';
  });
  const [customerEmail, setCustomerEmail] = useState<string | null>(() => {
    // 페이지 로드 시 localStorage에서 이메일 복원
    return localStorage.getItem('customer_email');
  });
  const [isGuestCheckout, setIsGuestCheckout] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (page: string, productId?: string) => {
    // 마이페이지 접근 시 로그인 체크
    if (page === 'account' && !isCustomerLoggedIn) {
      toast.error('로그인이 필요한 서비스입니다.');
      setCurrentPage('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentPage(page);
    if (productId) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCustomerLogin = (email: string) => {
    setIsCustomerLoggedIn(true);
    setCustomerEmail(email);
    setIsGuestCheckout(false);
    
    // localStorage에 로그인 상태 저장
    localStorage.setItem('customer_logged_in', 'true');
    localStorage.setItem('customer_email', email);
  };

  const handleCustomerLogout = () => {
    setIsCustomerLoggedIn(false);
    setCustomerEmail(null);
    setIsGuestCheckout(false);
    
    // localStorage에서 로그인 상태 제거
    localStorage.removeItem('customer_logged_in');
    localStorage.removeItem('customer_email');
    
    toast.success('로그아웃되었습니다.');
    setCurrentPage('home');
  };

  const handleGuestCheckout = () => {
    setIsGuestCheckout(true);
    setCurrentPage('checkout');
    toast.info('비회원으로 주문을 진행합니다.');
  };

  const handleOrderComplete = (newOrderId: string) => {
    setOrderId(newOrderId);
    setCurrentPage('order-confirmation');
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setSiteMode('admin');
    setCurrentPage('admin-dashboard');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setSiteMode('customer');
    setCurrentPage('home');
  };

  // 로컬 스토리지에서 상품 데이터 로드
  const getProducts = () => {
    const savedProducts = localStorage.getItem('admin_products');
    if (savedProducts) {
      const parsed = JSON.parse(savedProducts);
      
      // ID 중복 체크 및 해결
      const idCounts: { [key: string]: number } = {};
      const updatedProducts = parsed.map((product: any, index: number) => {
        if (product.id && product.id.length < 10) {
          // 짧은 ID는 고유 ID로 변경
          const newId = `product_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`;
          return { ...product, id: newId };
        }
        return product;
      });
      
      return updatedProducts;
    }
    return mockProducts;
  };

  const selectedProduct = selectedProductId
    ? getProducts().find(p => p.id === selectedProductId)
    : null;
    
  // 디버깅 로그
  if (selectedProductId) {
    console.log('선택된 상품 ID:', selectedProductId);
    console.log('찾은 상품:', selectedProduct);
    console.log('전체 상품 목록:', getProducts().map(p => ({ id: p.id, title: p.title })));
  }

  // Admin Site
  if (siteMode === 'admin') {
    if (!isAdminLoggedIn) {
      return <AdminLogin onLogin={handleAdminLogin} />;
    }

    const renderAdminPage = () => {
      switch (currentPage) {
        case 'admin-dashboard':
          return <AdminDashboard onNavigate={handleNavigate} />;
        case 'admin-products':
          return <AdminProducts onNavigate={handleNavigate} />;
        case 'admin-product-detail':
          return selectedProduct ? (
            <AdminProductDetail product={selectedProduct} onNavigate={handleNavigate} />
          ) : (
            <AdminProducts onNavigate={handleNavigate} />
          );
        case 'admin-orders':
          return <AdminOrders />;
        case 'admin-members':
          return <AdminMembers />;
        case 'admin-settings':
          return <AdminSettings />;
        default:
          return <AdminDashboard onNavigate={handleNavigate} />;
      }
    };

    return (
      <>
        <AdminLayout
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={handleAdminLogout}
        >
          {renderAdminPage()}
        </AdminLayout>
        <ScrollToTop />
      </>
    );
  }

  // Customer Site
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage onNavigate={handleNavigate} />;
      case 'products':
        return <ProductList onNavigate={handleNavigate} />;
      case 'product':
        return selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onNavigate={handleNavigate}
            isLoggedIn={isCustomerLoggedIn}
          />
        ) : (
          <Homepage onNavigate={handleNavigate} />
        );
      case 'cart':
        return <ShoppingCart onNavigate={handleNavigate} isLoggedIn={isCustomerLoggedIn} />;
      case 'checkout-options':
        return <CheckoutOptions onNavigate={handleNavigate} onGuestCheckout={handleGuestCheckout} />;
        case 'checkout':
          return <Checkout 
            onNavigate={handleNavigate} 
            onOrderComplete={handleOrderComplete} 
            isGuest={isGuestCheckout}
            customerEmail={customerEmail}
            customerName={customerEmail ? customerEmail.split('@')[0] : null}
          />;
      case 'order-confirmation':
        return orderId ? (
          <OrderConfirmation orderId={orderId} onNavigate={handleNavigate} />
        ) : (
          <Homepage onNavigate={handleNavigate} />
        );
      case 'payment-success':
        return <PaymentSuccess onNavigate={handleNavigate} />;
      case 'payment-fail':
        return <PaymentFail onNavigate={handleNavigate} />;
        case 'account':
          return <UserAccount onNavigate={handleNavigate} customerEmail={customerEmail} />;
      case 'login':
        return <Login onNavigate={handleNavigate} onLoginSuccess={handleCustomerLogin} onAdminLogin={handleAdminLogin} />;
      case 'signup':
        return <Signup onNavigate={handleNavigate} onSignupSuccess={handleCustomerLogin} />;
      case 'guest-order-lookup':
        return <GuestOrderLookup onNavigate={handleNavigate} />;
      case 'terms':
        return <Terms onNavigate={handleNavigate} />;
      case 'privacy':
        return <Privacy onNavigate={handleNavigate} />;
      case 'guide':
        return <Guide onNavigate={handleNavigate} />;
      case 'about':
        return <About onNavigate={handleNavigate} />;
      default:
        return <Homepage onNavigate={handleNavigate} />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Header
          onNavigate={handleNavigate}
          currentPage={currentPage}
          onMenuClick={() => setIsMobileMenuOpen(true)}
          isLoggedIn={isCustomerLoggedIn}
          userEmail={customerEmail || undefined}
          onLogout={handleCustomerLogout}
        />
        
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          onNavigate={handleNavigate}
          currentPage={currentPage}
          isLoggedIn={isCustomerLoggedIn}
          userEmail={customerEmail || undefined}
          onLogout={handleCustomerLogout}
        />

        <main className="relative scrollbar-hide">
          {renderPage()}
        </main>

        <Footer onNavigate={handleNavigate} />

        <MobileNav onNavigate={handleNavigate} currentPage={currentPage} />
        
        <ScrollToTop />
        
        <Toaster />
      </div>
    </CartProvider>
  );
}