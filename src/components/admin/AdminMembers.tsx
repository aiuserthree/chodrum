import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Search, 
  Users, 
  UserCheck, 
  UserX, 
  Mail, 
  Calendar,
  ShoppingBag,
  DollarSign,
  MoreVertical,
  Eye,
  Lock,
  Trash2,
  CheckCircle,
  XCircle,
  Package,
  RefreshCw
} from 'lucide-react';
import { getMembers, mockOrders } from '../../lib/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { toast } from 'sonner';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ScrollArea } from '../ui/scroll-area';

type MemberStatus = 'active' | 'inactive';

interface Member {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  lastLogin: string;
  status: MemberStatus;
  orderCount: number;
  totalSpent: number;
}

export function AdminMembers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | MemberStatus>('all');
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [memberOrders, setMemberOrders] = useState<any[]>([]);
  
  // PC 여부 감지 (768px 이상)
  const isPC = window.innerWidth >= 768;

  // localStorage의 회원 데이터를 AdminMembers 형식으로 변환
  const transformMemberData = (rawMember: any): Member => {
    return {
      id: rawMember.id || `member_${Date.now()}`,
      name: rawMember.name || '이름 없음',
      email: rawMember.email || '',
      joinDate: rawMember.createdAt ? 
        new Date(rawMember.createdAt).toLocaleDateString('ko-KR') : 
        new Date().toLocaleDateString('ko-KR'),
      lastLogin: rawMember.lastLogin || '로그인 기록 없음',
      status: rawMember.status || 'active',
      orderCount: rawMember.orderCount || 0,
      totalSpent: rawMember.totalSpent || 0,
    };
  };

  // 회원 데이터 로드
  const loadMembers = () => {
    const rawMembers = getMembers();
    const transformedMembers = rawMembers.map(transformMemberData);
    setMembers(transformedMembers);
  };

  // 컴포넌트 마운트 시 회원 데이터 로드
  useEffect(() => {
    loadMembers();
    
    // localStorage 변경 감지를 위한 이벤트 리스너 (다른 탭에서 회원가입 시 자동 업데이트)
    const handleStorageChange = () => {
      loadMembers();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // 페이지 포커스시에도 데이터 새로고침 (같은 탭에서의 변경사항 반영)
    const handleFocus = () => {
      loadMembers();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (memberId: string, newStatus: MemberStatus) => {
    // localStorage에서 회원 데이터 업데이트
    const rawMembers = getMembers();
    const updatedRawMembers = rawMembers.map((member: any) => 
      member.id === memberId ? { ...member, status: newStatus } : member
    );
    localStorage.setItem('members', JSON.stringify(updatedRawMembers));
    
    // 화면 업데이트
    setMembers(prev => 
      prev.map(member => 
        member.id === memberId ? { ...member, status: newStatus } : member
      )
    );
    toast.success(`회원 상태가 ${newStatus === 'active' ? '활성' : '비활성'}으로 변경되었습니다.`);
  };

  const handleViewDetail = (member: Member) => {
    setSelectedMember(member);
    setIsDetailOpen(true);
  };

  const handleViewOrderHistory = (member: Member) => {
    setSelectedMember(member);
    // 해당 회원의 주문 내역 필터링
    const orders = mockOrders.filter(order => order.email === member.email);
    setMemberOrders(orders);
    setIsOrderHistoryOpen(true);
  };

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case '배송완료':
      case 'completed':
        return 'bg-green-500';
      case '대기중':
      case 'pending':
        return 'bg-orange-500';
      case '취소됨':
      case 'cancelled':
        return 'bg-red-500';
      case '처리중':
      case 'processing':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getOrderStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '배송완료';
      case 'pending':
        return '대기중';
      case 'cancelled':
        return '취소됨';
      case 'processing':
        return '처리중';
      default:
        return status;
    }
  };

  const activeCount = members.filter(m => m.status === 'active').length;
  const inactiveCount = members.filter(m => m.status === 'inactive').length;

  const getStatusBadge = (status: MemberStatus) => {
    return status === 'active' ? (
      <Badge variant="default" className="bg-green-500">활성</Badge>
    ) : (
      <Badge variant="secondary">비활성</Badge>
    );
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1>회원 관리</h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadMembers}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            새로고침
          </Button>
        </div>
        <p className="text-muted-foreground">
          가입한 회원들을 관리하고 회원 정보를 확인하세요
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">전체 회원</p>
            <Users className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-2xl">{members.length}명</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">활성 회원</p>
            <UserCheck className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl">{activeCount}명</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">비활성 회원</p>
            <UserX className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-2xl">{inactiveCount}명</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="이름, 이메일로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('all')}
            >
              전체
            </Button>
            <Button
              variant={statusFilter === 'active' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('active')}
            >
              활성
            </Button>
            <Button
              variant={statusFilter === 'inactive' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('inactive')}
            >
              비활성
            </Button>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow>
                <TableHead>회원 정보</TableHead>
                <TableHead>가입일</TableHead>
                <TableHead>최근 로그인</TableHead>
                <TableHead>주문</TableHead>
                <TableHead>총 구매액</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">
                      {searchQuery || statusFilter !== 'all' 
                        ? '검색 결과가 없습니다' 
                        : '등록된 회원이 없습니다'}
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{member.joinDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{member.lastLogin}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{member.orderCount}건</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">₩{member.totalSpent.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(member.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuLabel>회원 관리</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          
                          <DropdownMenuItem onClick={() => handleViewDetail(member)}>
                            <Eye className="w-4 h-4 mr-2" />
                            상세 정보 보기
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem onClick={() => handleViewOrderHistory(member)}>
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            주문 내역 조회
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem 
                            onClick={(e) => {
                              e.preventDefault();
                              
                              // Fallback 메커니즘 (Clipboard API 사용 안 함)
                              const textArea = document.createElement('textarea');
                              textArea.value = member.email;
                              textArea.style.position = 'fixed';
                              textArea.style.left = '-999999px';
                              textArea.style.top = '-999999px';
                              textArea.style.opacity = '0';
                              textArea.setAttribute('readonly', '');
                              document.body.appendChild(textArea);
                              
                              try {
                                textArea.focus();
                                textArea.select();
                                textArea.setSelectionRange(0, member.email.length);
                                
                                const successful = document.execCommand('copy');
                                
                                if (successful) {
                                  // PC: alert, 모바일: toast
                                  if (isPC) {
                                    alert('이메일이 복사되었습니다.');
                                  } else {
                                    toast.success('이메일이 복사되었습니다.');
                                  }
                                } else {
                                  // 복사 실패 시 이메일 주소를 표시
                                  if (isPC) {
                                    alert(`이메일 주소: ${member.email}`);
                                  } else {
                                    toast.info('이메일 주소', {
                                      description: member.email,
                                      duration: 5000,
                                    });
                                  }
                                }
                              } catch (err) {
                                // 오류 발생 시에도 이메일 주소 표시
                                if (isPC) {
                                  alert(`이메일 주소: ${member.email}`);
                                } else {
                                  toast.info('이메일 주소', {
                                    description: member.email,
                                    duration: 5000,
                                  });
                                }
                              } finally {
                                document.body.removeChild(textArea);
                              }
                            }}
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            이메일 복사
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          <DropdownMenuItem 
                            onClick={(e) => {
                              e.preventDefault();
                              // 실제로는 API 호출하여 비밀번호 재설정 이메일 전송
                              // PC: alert, 모바일: toast
                              if (isPC) {
                                alert('비밀번호 재설정 이메일이 발송되었습니다.');
                              } else {
                                toast.success('비밀번호 재설정 이메일이 발송되었습니다.');
                              }
                            }}
                          >
                            <Lock className="w-4 h-4 mr-2" />
                            비밀번호 재설정 이메일 전송
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          {member.status === 'active' ? (
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(member.id, 'inactive')}
                              className="text-orange-600"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              계정 비활성화
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(member.id, 'active')}
                              className="text-green-600"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              계정 활성화
                            </DropdownMenuItem>
                          )}
                          
                          <DropdownMenuSeparator />
                          
                          <DropdownMenuItem 
                            onClick={() => {
                              if (window.confirm(`정말로 ${member.name}님의 계정을 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`)) {
                                // localStorage에서 회원 데이터 삭제
                                const rawMembers = getMembers();
                                const updatedRawMembers = rawMembers.filter((m: any) => m.id !== member.id);
                                localStorage.setItem('members', JSON.stringify(updatedRawMembers));
                                
                                // 화면 업데이트
                                setMembers(prev => prev.filter(m => m.id !== member.id));
                                toast.success('회원이 삭제되었습니다.');
                              }
                            }}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            회원 삭제
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Member Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>회원 상세 정보</DialogTitle>
            <DialogDescription>
              회원의 상세 정보를 확인할 수 있습니다
            </DialogDescription>
          </DialogHeader>

          {selectedMember && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">이름</p>
                  <p className="font-medium">{selectedMember.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">회원 ID</p>
                  <p className="font-medium text-xs break-all leading-relaxed">
                    {selectedMember.id}
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">이메일</p>
                    <p className="font-medium">{selectedMember.email}</p>
                  </div>
                </div>
              </div>

              {/* Activity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">가입일</p>
                  <p className="font-medium">{selectedMember.joinDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">최근 로그인</p>
                  <p className="font-medium">{selectedMember.lastLogin}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">주문 건수</p>
                  </div>
                  <p className="text-2xl">{selectedMember.orderCount}건</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">총 구매액</p>
                  </div>
                  <p className="text-2xl">₩{selectedMember.totalSpent.toLocaleString()}</p>
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">계정 상태</p>
                {getStatusBadge(selectedMember.status)}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Order History Dialog */}
      <Dialog open={isOrderHistoryOpen} onOpenChange={setIsOrderHistoryOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh]">
          <DialogHeader>
            <DialogTitle>주문 내역</DialogTitle>
            <DialogDescription>
              {selectedMember?.name}님의 주문 내역입니다
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[60vh] pr-4">
            {memberOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Package className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground">주문 내역이 없습니다</p>
              </div>
            ) : (
              <div className="space-y-4">
                {memberOrders.map((order) => (
                  <div key={order.id} className="border border-border rounded-lg p-4">
                    {/* Order Header */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                      <div>
                        <p className="font-medium mb-1">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <Badge className={getOrderStatusBadge(order.status)}>
                        {getOrderStatusText(order.status)}
                      </Badge>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3 mb-4">
                      {order.items.map((item: any, index: number) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-12 h-12 rounded overflow-hidden bg-muted flex-shrink-0">
                            <ImageWithFallback
                              src={item.product.image}
                              alt={item.product.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm truncate">{item.product.title}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {item.product.composer}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              ₩{(item.product.price * (item.quantity || 1)).toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              수량: {item.quantity || 1}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{order.paymentMethod}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">총 결제금액</p>
                        <p className="font-medium">₩{order.total.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <DialogFooter>
            <div className="flex items-center justify-between w-full">
              <div className="text-sm text-muted-foreground">
                총 {memberOrders.length}건의 주문
              </div>
              <Button variant="outline" onClick={() => setIsOrderHistoryOpen(false)}>
                닫기
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
