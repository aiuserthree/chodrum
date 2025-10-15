export interface Product {
  id: string;
  title: string;
  composer: string;
  difficulty: string;
  price: number;
  image: string;
  category: string;
  description: string;
  youtubeUrl?: string;
  pages: number;
  duration: string;
  isVisible: boolean; // 상품 노출 여부 (true: 노출, false: 미노출)
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'completed' | 'pending' | 'failed' | 'processing' | 'refunded';
  items: CartItem[];
  paymentMethod: string;
  email: string;
}

export type PaymentMethod = 
  | 'card' 
  | 'bank-transfer' 
  | 'virtual-account' 
  | 'naver-pay' 
  | 'kakao-pay' 
  | 'toss-pay' 
  | 'paypal';
