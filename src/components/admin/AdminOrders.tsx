import { useState } from 'react';
import { mockOrders } from '../../lib/mockData';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search, Eye, Check, X, Undo2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Order } from '../../types';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';

export function AdminOrders() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDialogOpen(true);
  };

  const handleCancelOrder = (orderId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (confirm('이 주문을 취소하시겠습니까?')) {
      toast.success('주문이 취소되었습니다.');
      setIsOrderDialogOpen(false);
      // 실제로는 API 호출하여 주문 취소 처리
    }
  };

  const handleApproveOrder = (orderId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    toast.success('주문이 승인되었습니다.');
    setIsOrderDialogOpen(false);
    // 실제로는 API 호출하여 주문 승인 처리
  };

  const handleRefundOrder = (orderId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (confirm('이 주문을 환불 처리하시겠습니까?')) {
      toast.success('환불이 처리되었습니다.');
      setIsOrderDialogOpen(false);
      // 실제로는 API 호출하여 환불 처리
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'refunded':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '완료';
      case 'pending': return '대기중';
      case 'processing': return '처리중';
      case 'failed': return '실패';
      case 'refunded': return '환불됨';
      default: return status;
    }
  };

  const filteredOrders = mockOrders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="mb-2">주문 관리</h1>
          <p className="text-muted-foreground">
            모든 주문을 확인하고 관리합니다
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="주문번호 또는 이메일로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="상태로 필터링" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 주문</SelectItem>
              <SelectItem value="completed">완료</SelectItem>
              <SelectItem value="pending">대기중</SelectItem>
              <SelectItem value="processing">처리중</SelectItem>
              <SelectItem value="failed">실패</SelectItem>
              <SelectItem value="refunded">환불됨</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
            <thead className="border-b border-border bg-muted/50">
              <tr className="text-left text-sm text-muted-foreground">
                <th className="p-4">Order ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Items</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                  <td className="p-4">{order.id}</td>
                  <td className="p-4 text-muted-foreground">{order.date}</td>
                  <td className="p-4 text-muted-foreground">{order.email}</td>
                  <td className="p-4 text-muted-foreground">{order.items.length} items</td>
                  <td className="p-4 text-muted-foreground">{order.paymentMethod}</td>
                  <td className="p-4">₩{order.total.toLocaleString()}</td>
                  <td className="p-4">
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(order)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                      
                      {order.status === 'pending' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => handleApproveOrder(order.id, e)}
                          >
                            <Check className="w-4 h-4 mr-2" />
                            승인
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={(e) => handleCancelOrder(order.id, e)}
                          >
                            <X className="w-4 h-4 mr-2" />
                            취소
                          </Button>
                        </>
                      )}
                      
                      {order.status === 'processing' && (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={(e) => handleCancelOrder(order.id, e)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          취소
                        </Button>
                      )}
                      
                      {order.status === 'completed' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => handleRefundOrder(order.id, e)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Undo2 className="w-4 h-4 mr-2" />
                          환불
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="mb-1">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {getStatusText(order.status)}
                </Badge>
              </div>
              
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer</span>
                  <span className="truncate ml-2">{order.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Items</span>
                  <span>{order.items.length} items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment</span>
                  <span>{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span>₩{order.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleViewDetails(order)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                
                {order.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={(e) => handleApproveOrder(order.id, e)}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      승인
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="flex-1"
                      onClick={(e) => handleCancelOrder(order.id, e)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      취소
                    </Button>
                  </div>
                )}
                
                {order.status === 'processing' && (
                  <Button 
                    variant="destructive" 
                    size="sm"
                    className="w-full"
                    onClick={(e) => handleCancelOrder(order.id, e)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    주문 취소
                  </Button>
                )}
                
                {order.status === 'completed' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full text-destructive hover:text-destructive"
                    onClick={(e) => handleRefundOrder(order.id, e)}
                  >
                    <Undo2 className="w-4 h-4 mr-2" />
                    환불 처리
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <p className="text-muted-foreground">주문이 없습니다</p>
          </div>
        )}

        {/* Order Details Dialog */}
        <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>주문 상세 정보</DialogTitle>
            </DialogHeader>
            
            {selectedOrder && (
              <div className="space-y-6">
                {/* 주문 기본 정보 */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">주문번호</p>
                    <p>{selectedOrder.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">주문일시</p>
                    <p>{selectedOrder.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">주문 상태</p>
                    <Badge className={getStatusColor(selectedOrder.status)}>
                      {getStatusText(selectedOrder.status)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">결제 수단</p>
                    <p>{selectedOrder.paymentMethod}</p>
                  </div>
                </div>

                {/* 고객 정보 */}
                <div>
                  <h3 className="mb-3">고객 정보</h3>
                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">이메일</span>
                      <span>{selectedOrder.email}</span>
                    </div>
                  </div>
                </div>

                {/* 주문 상품 */}
                <div>
                  <h3 className="mb-3">주문 상품</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-muted rounded-lg">
                        <div className="w-20 h-20 rounded overflow-hidden bg-background flex-shrink-0">
                          <ImageWithFallback
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="mb-1">{item.product.title}</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            {item.product.composer}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{item.product.category}</Badge>
                            <Badge variant="outline">{item.product.difficulty}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="mb-1">₩{item.product.price.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">수량: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 결제 정보 */}
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">상품 금액</span>
                    <span>₩{selectedOrder.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <span>총 결제 금액</span>
                    <span className="text-xl">₩{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>

                {/* 액션 버튼 */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  {selectedOrder.status === 'pending' && (
                    <>
                      <Button 
                        className="flex-1"
                        onClick={(e) => handleApproveOrder(selectedOrder.id, e)}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        주문 승인
                      </Button>
                      <Button 
                        variant="destructive"
                        className="flex-1"
                        onClick={(e) => handleCancelOrder(selectedOrder.id, e)}
                      >
                        <X className="w-4 h-4 mr-2" />
                        주문 취소
                      </Button>
                    </>
                  )}
                  
                  {selectedOrder.status === 'processing' && (
                    <Button 
                      variant="destructive"
                      className="flex-1"
                      onClick={(e) => handleCancelOrder(selectedOrder.id, e)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      주문 취소
                    </Button>
                  )}
                  
                  {selectedOrder.status === 'completed' && (
                    <Button 
                      variant="outline"
                      className="flex-1 text-destructive hover:text-destructive"
                      onClick={(e) => handleRefundOrder(selectedOrder.id, e)}
                    >
                      <Undo2 className="w-4 h-4 mr-2" />
                      환불 처리
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline"
                    onClick={() => setIsOrderDialogOpen(false)}
                  >
                    닫기
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
