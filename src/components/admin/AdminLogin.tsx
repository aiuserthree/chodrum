import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Shield } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);

  // 컴포넌트 마운트 시 저장된 아이디 불러오기
  useEffect(() => {
    const savedId = localStorage.getItem('admin_remembered_id');
    const rememberStatus = localStorage.getItem('admin_remember_id') === 'true';
    
    if (savedId && rememberStatus) {
      setEmail(savedId);
      setRememberId(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Admin authentication
    if (email === 'chodrum' && password === '!whwnsgud7@') {
      // 아이디 기억하기 처리
      if (rememberId) {
        localStorage.setItem('admin_remembered_id', email);
        localStorage.setItem('admin_remember_id', 'true');
      } else {
        localStorage.removeItem('admin_remembered_id');
        localStorage.removeItem('admin_remember_id');
      }
      onLogin();
    } else {
      alert('잘못된 아이디 또는 비밀번호입니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="mb-2">chodrum 관리자</h1>
            <p className="text-muted-foreground">관리자 페이지 로그인</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">아이디</Label>
              <Input
                id="email"
                type="text"
                placeholder="아이디를 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberId}
                onCheckedChange={(checked) => setRememberId(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm">
                아이디 기억하기
              </Label>
            </div>

            <Button type="submit" size="lg" className="w-full">
              로그인
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>관리자 전용 로그인</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.location.reload();
            }}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← 고객 사이트로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
}
