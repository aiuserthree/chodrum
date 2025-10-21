import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { mockProducts } from '../lib/mockData';
import { toast } from 'sonner';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // 로컬 스토리지에서 상품 데이터 가져오기
  const getProducts = () => {
    const savedProducts = localStorage.getItem('admin_products');
    if (savedProducts) {
      const parsed = JSON.parse(savedProducts);
      // ID 중복 체크 및 해결
      const updatedProducts = parsed.map((product: any, index: number) => {
        if (product.id && product.id.length < 10) {
          const newId = `product_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`;
          return { ...product, id: newId };
        }
        return product;
      });
      return updatedProducts;
    }
    return mockProducts;
  };

  const [cart, setCart] = useState<CartItem[]>(() => {
    // localStorage에서 장바구니 데이터 복원
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (error) {
        console.error('장바구니 데이터 복원 실패:', error);
        return [];
      }
    }
    
    // localStorage에 데이터가 없으면 데모 데이터 추가 (최초 방문 시에만)
    const products = getProducts();
    if (products.length > 0) {
      const initialCart: CartItem[] = [];
      if (products[0]) initialCart.push({ product: products[0], quantity: 1 });
      if (products[2]) initialCart.push({ product: products[2], quantity: 1 });
      if (products[4]) initialCart.push({ product: products[4], quantity: 1 });
      return initialCart;
    }
    return [];
  });

  // 장바구니 상태가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        // 이미 장바구니에 있으면 추가하지 않음 (디지털 상품이므로)
        toast.info('이미 장바구니에 있는 상품입니다', {
          description: product.title,
        });
        return prev;
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const updatedCart = prev.filter(item => item.product.id !== productId);
      // 삭제된 상품 정보를 토스트로 표시
      const removedItem = prev.find(item => item.product.id === productId);
      if (removedItem) {
        toast.success('상품이 장바구니에서 제거되었습니다', {
          description: removedItem.product.title,
        });
      }
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const getTotalItems = () => cart.length; // 수량이 항상 1이므로 개수만 세기

  const getTotalPrice = () => cart.reduce((sum, item) => sum + item.product.price, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
