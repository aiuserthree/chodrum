import { Order } from '../../types';
import { mockProducts } from '../../lib/mockData';
import { Button } from '../ui/button';
import { X, Download, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface OrderReceiptProps {
  order: Order;
  onClose: () => void;
}

export function OrderReceipt({ order, onClose }: OrderReceiptProps) {
  const handlePrint = () => {
    window.print();
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return '결제 완료';
      case 'pending':
        return '입금 대기';
      case 'processing':
        return '처리중';
      case 'failed':
        return '결제 실패';
      case 'refunded':
        return '환불 완료';
      default:
        return status;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2>주문 영수증</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Receipt Content */}
          <div className="space-y-6">
            {/* Status Badge */}
            <div className="text-center py-4">
              <CheckCircle className="w-16 h-16 mx-auto mb-3 text-primary" />
              <h3 className="mb-2">주문이 {getStatusText(order.status)}되었습니다</h3>
              <p className="text-muted-foreground">주문번호: {order.id}</p>
            </div>

            {/* Order Info */}
            <div className="border-t border-b border-border py-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">주문일시</span>
                <span>{order.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">결제방법</span>
                <span>{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">이메일</span>
                <span>{order.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">상태</span>
                <span className={order.status === 'completed' ? 'text-green-600' : 'text-orange-600'}>
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="mb-4">주문 상품</h3>
              <div className="space-y-3">
                {order.items.map(({ product }) => (
                  <div key={product.id} className="flex gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-16 h-16 rounded overflow-hidden bg-background flex-shrink-0">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="truncate text-sm">{product.title}</h4>
                      <p className="text-sm text-muted-foreground">{product.composer}</p>
                    </div>
                    <div className="text-right">
                      <p>₩{product.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-border pt-4">
              <div className="flex justify-between mb-2 text-muted-foreground">
                <span>상품 {order.items.length}개</span>
                <span>₩{order.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>총 결제금액</span>
                <span className="text-xl">₩{order.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Info for Pending */}
            {order.status === 'pending' && (
              <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <h4 className="mb-2 text-orange-900 dark:text-orange-100">입금 정보</h4>
                <p className="text-sm text-orange-800 dark:text-orange-200 mb-2">
                  아래 계좌로 입금해주세요. 입금 확인 후 상품을 다운로드하실 수 있습니다.
                </p>
                <div className="space-y-1 text-sm">
                  <p><strong>은행:</strong> 국민은행</p>
                  <p><strong>계좌번호:</strong> 123-456-789012</p>
                  <p><strong>예금주:</strong> chodrum</p>
                  <p><strong>입금금액:</strong> ₩{order.total.toLocaleString()}</p>
                </div>
              </div>
            )}

            {/* Download Links for Completed */}
            {order.status === 'completed' && (
              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="mb-3 text-green-900 dark:text-green-100">다운로드 가능한 상품</h4>
                <div className="space-y-2">
                  {order.items.map(({ product }) => (
                    <Button
                      key={product.id}
                      variant="outline"
                      size="sm"
                      className="w-full justify-between"
                      onClick={() => {
                        // 실제로는 다운로드 링크 제공
                        alert(`${product.title} 다운로드 시작`);
                      }}
                    >
                      <span className="truncate">{product.title}</span>
                      <Download className="w-4 h-4 ml-2 flex-shrink-0" />
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={handlePrint} className="flex-1">
                인쇄하기
              </Button>
              <Button onClick={onClose} className="flex-1">
                확인
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
