import { useState } from 'react';
import { mockOrders } from '../../lib/mockData';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Download, Package } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { OrderReceipt } from './OrderReceipt';
import { Order } from '../../types';
import { toast } from 'sonner';

interface UserAccountProps {
  onNavigate: (page: string) => void;
  customerEmail?: string | null;
}

export function UserAccount({ onNavigate, customerEmail }: UserAccountProps) {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '결제 완료';
      case 'pending':
        return '입금 대기';
      case 'failed':
        return '결제 실패';
      case 'processing':
        return '처리중';
      case 'refunded':
        return '환불 완료';
      default:
        return status;
    }
  };

  const handleCompletePayment = (orderId: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: 'completed' as const }
          : order
      )
    );
    toast.success('입금이 확인되었습니다', {
      description: '이제 상품을 다운로드하실 수 있습니다.',
    });
  };

  const handleViewReceipt = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleDownload = (productTitle: string) => {
    toast.success('다운로드 시작', {
      description: productTitle,
    });
  };




  return (
    <>
      {selectedOrder && (
        <OrderReceipt
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
      
      <div className="min-h-screen pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
          <h1 className="mb-6 lg:mb-8">내 계정</h1>

          <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="mb-6">구매 내역</h2>
                
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">구매 내역이 없습니다</p>
                    <Button onClick={() => onNavigate('products')}>
                      상품 둘러보기
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-border rounded-lg p-4 lg:p-6">
                        {/* Order Header */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 pb-4 border-b border-border gap-3">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3>{order.id}</h3>
                              <Badge className={getStatusColor(order.status)}>
                                {getStatusText(order.status)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {order.date} • {order.paymentMethod}
                            </p>
                          </div>
                          <div className="text-left lg:text-right">
                            <p className="text-muted-foreground text-sm">총 금액</p>
                            <p>₩{order.total.toLocaleString()}</p>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-3">
                          {order.items.map(({ product }) => (
                            <div key={product.id} className="flex gap-4">
                              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded overflow-hidden bg-muted flex-shrink-0">
                                <ImageWithFallback
                                  src={product.image}
                                  alt={product.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0 flex items-center justify-between">
                                <div className="min-w-0 flex-1 mr-4">
                                  <h4 className="truncate">{product.title}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {product.composer}
                                  </p>
                                </div>
                                {order.status === 'completed' && (
                                  <Button 
                                    size="sm" 
                                    className="flex-shrink-0"
                                    onClick={() => handleDownload(product.title)}
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    <span className="hidden lg:inline">다운로드</span>
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Pending Payment Notice */}
                        {order.status === 'pending' && (
                          <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-950/20 rounded border border-orange-200 dark:border-orange-800">
                            <p className="text-sm text-orange-800 dark:text-orange-200">
                              입금 확인 후 다운로드가 가능합니다. 입금하신 경우 "입금 완료" 버튼을 눌러주세요.
                            </p>
                          </div>
                        )}

                        {/* Order Actions */}
                        <div className="mt-4 pt-4 border-t border-border flex flex-col lg:flex-row gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full lg:w-auto"
                            onClick={() => handleViewReceipt(order)}
                          >
                            영수증 보기
                          </Button>
                          {order.status === 'pending' && (
                            <Button 
                              size="sm" 
                              className="w-full lg:w-auto"
                              onClick={() => handleCompletePayment(order.id)}
                            >
                              입금 완료
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
