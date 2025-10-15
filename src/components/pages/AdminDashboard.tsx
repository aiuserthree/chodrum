import { mockOrders } from '../../lib/mockData';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  DollarSign, 
  Package, 
  TrendingUp, 
  Users,
  ArrowRight
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate?: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
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

  const totalRevenue = mockOrders
    .filter(o => o.status === 'completed')
    .reduce((sum, order) => sum + order.total, 0);

  const totalOrders = mockOrders.length;
  
  const totalProducts = mockOrders
    .flatMap(o => o.items)
    .reduce((sum, item) => sum + item.quantity, 0);

  const uniqueCustomers = new Set(mockOrders.map(o => o.email)).size;

  // 최근 주문 5개만 표시
  const recentOrders = mockOrders.slice(0, 5);

  return (
    <div className="p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2">대시보드</h1>
          <p className="text-muted-foreground">
            비즈니스 현황을 한눈에 확인하세요
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">총 매출</p>
              <DollarSign className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-3xl mb-1">₩{totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-green-600">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              +12.5% from last month
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">주문 수</p>
              <Package className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-3xl mb-1">{totalOrders}</p>
            <p className="text-sm text-muted-foreground">
              {totalProducts} 상품 판매
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">고객 수</p>
              <Users className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-3xl mb-1">{uniqueCustomers}</p>
            <p className="text-sm text-muted-foreground">
              유니크 고객
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">평균 주문가</p>
              <DollarSign className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-3xl mb-1">
              ₩{Math.round(totalRevenue / totalOrders).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              주문당 평균
            </p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="mb-1">최근 주문</h2>
              <p className="text-sm text-muted-foreground">
                최근 주문 5건을 확인하세요
              </p>
            </div>
            <Button 
              variant="outline"
              onClick={() => onNavigate?.('admin-orders')}
            >
              모든 주문 보기
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-left text-sm text-muted-foreground">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-4">{order.id}</td>
                    <td className="p-4 text-muted-foreground">{order.date}</td>
                    <td className="p-4 text-muted-foreground">{order.email}</td>
                    <td className="p-4 text-muted-foreground">{order.paymentMethod}</td>
                    <td className="p-4">₩{order.total.toLocaleString()}</td>
                    <td className="p-4">
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden p-4 space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-4 bg-muted rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="mb-1">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusText(order.status)}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Customer</span>
                    <span className="truncate ml-2">{order.email}</span>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
