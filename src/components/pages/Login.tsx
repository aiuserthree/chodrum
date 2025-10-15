import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { Switch } from '../ui/switch';
import { User, Shield } from 'lucide-react';
import { loginMember } from '../../lib/mockData';

interface LoginProps {
  onNavigate: (page: string) => void;
  onLoginSuccess: (email: string) => void;
  onAdminLogin: () => void;
}

export function Login({ onNavigate, onLoginSuccess, onAdminLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);

    // 관리자 모드인 경우
    if (isAdminMode) {
      if (email === 'chodrum' && password === '!whwnsgud7@') {
        setTimeout(() => {
          setIsLoading(false);
          onAdminLogin();
          toast.success('관리자로 로그인되었습니다.');
        }, 1000);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          toast.error('관리자 아이디 또는 비밀번호가 올바르지 않습니다.');
        }, 1000);
      }
    } else {
      // 고객 모드인 경우
      try {
        const result = loginMember(email, password);
        
        setTimeout(() => {
          setIsLoading(false);
          
          if (result.success) {
            onLoginSuccess(email);
            toast.success(result.message);
            onNavigate('home');
          } else {
            toast.error(result.message);
          }
        }, 1000);
      } catch (error) {
        setTimeout(() => {
          setIsLoading(false);
          console.error('로그인 처리 중 오류:', error);
          toast.error('로그인 처리 중 오류가 발생했습니다.');
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-muted/30">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="mb-2">로그인</h1>
            <p className="text-muted-foreground">
              조드럼닷컴에 오신 것을 환영합니다
            </p>
          </div>

          {/* 관리자 모드 전환 */}
          <div className="mb-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isAdminMode ? (
                  <Shield className="w-5 h-5 text-orange-600" />
                ) : (
                  <User className="w-5 h-5 text-blue-600" />
                )}
                <div>
                  <p className="font-medium">
                    {isAdminMode ? '관리자 모드' : '고객 모드'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isAdminMode ? '관리자로 로그인합니다' : '일반 고객으로 로그인합니다'}
                  </p>
                </div>
              </div>
              <Switch
                checked={isAdminMode}
                onCheckedChange={setIsAdminMode}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">{isAdminMode ? '아이디' : '이메일'}</Label>
              <Input
                id="email"
                type="text"
                placeholder={isAdminMode ? '아이디를 입력해주세요' : 'example@email.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input-background"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-muted-foreground">로그인 상태 유지</span>
              </label>
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => toast.info('비밀번호 찾기 기능은 준비중입니다.')}
              >
                비밀번호 찾기
              </button>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              계정이 없으신가요?{' '}
              <button
                onClick={() => onNavigate('signup')}
                className="text-primary hover:underline"
              >
                회원가입
              </button>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <div className="text-center mb-4">
              <span className="text-sm text-muted-foreground">또는</span>
            </div>
            
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => toast.info('카카오 로그인은 준비중입니다.')}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.48 3 2 6.58 2 11c0 2.9 1.88 5.45 4.71 7.03l-.94 3.45c-.06.22.18.4.38.28l4.34-2.85c.63.08 1.28.13 1.94.13 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
                </svg>
                카카오로 시작하기
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => toast.info('네이버 로그인은 준비중입니다.')}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z"/>
                </svg>
                네이버로 시작하기
              </Button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground mb-3">
              비회원으로 주문하셨나요?
            </p>
            <Button
              variant="outline"
              onClick={() => onNavigate('guest-order-lookup')}
              className="w-full"
            >
              비회원 주문조회
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}
