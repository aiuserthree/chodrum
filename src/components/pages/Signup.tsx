import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { Checkbox } from '../ui/checkbox';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { sendVerificationEmail, verifyCode, resendVerificationCode } from '../../lib/emailService';
import { saveMember } from '../../lib/mockData';

interface SignupProps {
  onNavigate: (page: string) => void;
  onSignupSuccess: (email: string) => void;
}

export function Signup({ onNavigate, onSignupSuccess }: SignupProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState<'form' | 'verify' | 'complete'>('form');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.passwordConfirm || !formData.name) {
      toast.error('모든 필드를 입력해주세요.');
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    // 영문 소문자, 숫자, 특수문자 조합 검증
    const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>_\-+=[\]\\;'/`~])[a-z0-9!@#$%^&*(),.?":{}|<>_\-+=[\]\\;'/`~]+$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error('비밀번호는 영문 소문자, 숫자, 특수문자 조합이어야 합니다.');
      return;
    }

    if (!agreedToTerms || !agreedToPrivacy) {
      toast.error('필수 약관에 동의해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      // 실제 이메일 인증 코드 전송
      const result = await sendVerificationEmail(formData.email);
      
      if (result.success) {
        setVerificationStep('verify');
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('이메일 전송 오류:', error);
      toast.error('이메일 전송 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) {
      toast.error('6자리 인증 코드를 입력해주세요.');
      return;
    }

    setIsVerifying(true);

    try {
      // 실제 인증 코드 검증
      const result = verifyCode(formData.email, verificationCode);
      
      if (result.success) {
        // 회원 데이터 저장
        const memberData = {
          name: formData.name,
          email: formData.email,
          password: formData.password, // 실제로는 해시화해야 함
          isEmailVerified: true
        };
        
        saveMember(memberData);
        
        setVerificationStep('complete');
        toast.success(result.message);
        // 회원가입 완료 처리
        onSignupSuccess(formData.email);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('인증 코드 검증 오류:', error);
      toast.error('인증 처리 중 오류가 발생했습니다.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    try {
      const result = await resendVerificationCode(formData.email);
      
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('인증 코드 재전송 오류:', error);
      toast.error('인증 코드 재전송 중 오류가 발생했습니다.');
    }
  };

  const handleAgreeToTerms = () => {
    setAgreedToTerms(true);
    setShowTermsDialog(false);
    toast.success('이용약관에 동의하셨습니다.');
  };

  const handleAgreeToPrivacy = () => {
    setAgreedToPrivacy(true);
    setShowPrivacyDialog(false);
    toast.success('개인정보 처리방침에 동의하셨습니다.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-muted/30">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
          {verificationStep === 'complete' ? (
            <>
              <div className="text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-primary-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                
                <div>
                  <h1 className="mb-2">회원가입 완료!</h1>
                  <p className="text-muted-foreground">
                    조드럼닷컴의 회원이 되신 것을 환영합니다
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">가입하신 이메일</p>
                  <p className="font-medium">{formData.email}</p>
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    onClick={() => onNavigate('login')}
                  >
                    로그인 하기
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => onNavigate('home')}
                  >
                    홈으로 가기
                  </Button>
                </div>
              </div>
            </>
          ) : verificationStep === 'form' ? (
            <>
              <div className="mb-8 text-center">
                <h1 className="mb-2">회원가입</h1>
                <p className="text-muted-foreground">
                  조드럼닷컴의 회원이 되어보세요
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                type="text"
                placeholder="홍길동"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="bg-input-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="bg-input-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="영문 소문자+숫자+특수문자 조합 8자 이상"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="bg-input-background"
              />
              <p className="text-xs text-muted-foreground">
                영문 소문자, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
              <Input
                id="passwordConfirm"
                type="password"
                placeholder="비밀번호를 다시 입력해주세요"
                value={formData.passwordConfirm}
                onChange={(e) => handleChange('passwordConfirm', e.target.value)}
                className="bg-input-background"
              />
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="terms" className="text-sm cursor-pointer">
                    <span className="text-destructive">*</span> 이용약관에 동의합니다{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowTermsDialog(true);
                      }}
                      className="text-primary hover:underline"
                    >
                      (보기)
                    </button>
                  </label>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="privacy"
                  checked={agreedToPrivacy}
                  onCheckedChange={(checked) => setAgreedToPrivacy(checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="privacy" className="text-sm cursor-pointer">
                    <span className="text-destructive">*</span> 개인정보 처리방침에 동의합니다{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPrivacyDialog(true);
                      }}
                      className="text-primary hover:underline"
                    >
                      (보기)
                    </button>
                  </label>
                </div>
              </div>
            </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? '전송 중...' : '인증 코드 받기'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  이미 계정이 있으신가요?{' '}
                  <button
                    onClick={() => onNavigate('login')}
                    className="text-primary hover:underline"
                  >
                    로그인
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
                    onClick={() => toast.info('카카오 회원가입은 준비중입니다.')}
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
                    onClick={() => toast.info('네이버 회원가입은 준비중입니다.')}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z"/>
                    </svg>
                    네이버로 시작하기
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8 text-center">
                <h1 className="mb-2">이메일 인증</h1>
                <p className="text-muted-foreground mb-2">
                  {formData.email}로 전송된
                </p>
                <p className="text-muted-foreground">
                  6자리 인증 코드를 입력해주세요
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={verificationCode}
                    onChange={setVerificationCode}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  <p className="mb-2">인증 코드가 오지 않았나요?</p>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-primary hover:underline"
                  >
                    인증 코드 재전송
                  </button>
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleVerifyCode}
                  disabled={isVerifying || verificationCode.length !== 6}
                >
                  {isVerifying ? '인증 중...' : '인증 완료'}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setVerificationStep('form');
                      setVerificationCode('');
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    이메일 주소 수정
                  </button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  💡 인증 코드는 10분 후 만료됩니다.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
          >
            홈으로 돌아가기
          </Button>
        </div>

        {/* Terms Dialog */}
        <Dialog open={showTermsDialog} onOpenChange={setShowTermsDialog}>
          <DialogContent className="max-w-3xl max-h-[85vh]">
            <DialogHeader>
              <DialogTitle>이용약관</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-6 text-sm">
                <section>
                  <h3 className="mb-3">제1조 (목적)</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    이 약관은 조드럼닷컴(이하 "회사")이 운영하는 웹사이트에서 제공하는 악보 PDF 판매 서비스(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                  </p>
                </section>

                <section>
                  <h3 className="mb-3">제2조 (정의)</h3>
                  <div className="space-y-2 text-muted-foreground leading-relaxed">
                    <p>1. "회사"란 조드럼닷컴을 운영하는 사업자를 말합니다.</p>
                    <p>2. "회원"이란 회사의 서비스에 접속하여 이 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.</p>
                    <p>3. "디지털 콘텐츠"란 회사가 제공하는 악보 PDF 파일을 말합니다.</p>
                    <p>4. "구매"란 회원이 회사가 제공하는 디지털 콘텐츠를 유료로 구입하는 것을 말합니다.</p>
                  </div>
                </section>

                <section>
                  <h3 className="mb-3">제3조 (약관의 게시와 개정)</h3>
                  <div className="space-y-2 text-muted-foreground leading-relaxed">
                    <p>1. 회사는 이 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.</p>
                    <p>2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</p>
                    <p>3. 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 제1항의 방식에 따라 그 개정약관의 적용일자 7일 전부터 적용일자 전일까지 공지합니다.</p>
                  </div>
                </section>

                <section>
                  <h3 className="mb-3">제4조 (서비스의 제공)</h3>
                  <div className="space-y-2 text-muted-foreground leading-relaxed">
                    <p>1. 회사는 다음과 같은 서비스를 제공합니다:</p>
                    <p className="ml-4">- 악보 PDF 파일의 온라인 판매</p>
                    <p className="ml-4">- 구매한 악보의 다운로드 서비스</p>
                    <p className="ml-4">- 기타 회사가 정하는 서비스</p>
                    <p>2. 회사는 서비스의 품질 향상을 위해 서비스의 내용을 변경할 수 있습니다.</p>
                  </div>
                </section>

                <section>
                  <h3 className="mb-3">제5조 (저작권 및 이용제한)</h3>
                  <div className="space-y-2 text-muted-foreground leading-relaxed">
                    <p>1. 회사가 제공하는 모든 디지털 콘텐츠의 저작권은 회사 또는 원저작권자에게 있습니다.</p>
                    <p>2. 회원은 구매한 디지털 콘텐츠를 개인적인 용도로만 사용할 수 있으며, 상업적 목적으로 사용하거나 제3자에게 양도, 대여, 재배포할 수 없습니다.</p>
                    <p>3. 회원이 본 조항을 위반할 경우 관련 법령에 따라 민·형사상 책임을 질 수 있습니다.</p>
                  </div>
                </section>

                <section>
                  <h3 className="mb-3">제6조 (환불정책)</h3>
                  <div className="space-y-2 text-muted-foreground leading-relaxed">
                    <p>1. 디지털 콘텐츠의 특성상 다운로드가 완료된 후에는 환불이 불가능합니다.</p>
                    <p>2. 단, 다음의 경우에는 환불이 가능합니다:</p>
                    <p className="ml-4">- 상품 설명과 실제 상품이 현저히 다른 경우</p>
                    <p className="ml-4">- 파일 손상 등으로 정상적인 사용이 불가능한 경우</p>
                    <p>3. 환불은 구매일로부터 7일 이내에 요청해야 하며, 회사의 확인 후 처리됩니다.</p>
                  </div>
                </section>

                <section>
                  <h3 className="mb-3">제7조 (면책조항)</h3>
                  <div className="space-y-2 text-muted-foreground leading-relaxed">
                    <p>1. 회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력으로 인하여 서비스를 제공할 수 없는 경우 서비스 제공에 대한 책임이 면제됩니다.</p>
                    <p>2. 회사는 회원의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.</p>
                  </div>
                </section>
              </div>
            </ScrollArea>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setShowTermsDialog(false)}>
                닫기
              </Button>
              <Button onClick={handleAgreeToTerms}>
                동의하기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Privacy Dialog */}
        <Dialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog}>
          <DialogContent className="max-w-3xl max-h-[85vh]">
            <DialogHeader>
              <DialogTitle>개인정보 처리방침</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-6 text-sm">
                <section>
                  <h3 className="mb-3">1. 개인정보의 수집 및 이용 목적</h3>
                  <div className="space-y-2 text-muted-foreground leading-relaxed">
                    <p>조드럼닷컴(이하 "회사")은 다음의 목적을 위하여 개인정보를 수집 및 이용합니다:</p>
                    <p className="ml-4">가. 회원가입 및 관리: 회원제 서비스 제공, 본인 확인, 불량회원의 부정 이용 방지</p>
                    <p className="ml-4">나. 서비스 제공: 디지털 콘텐츠 제공, 구매 및 결제, 물품 배송</p>
                    <p className="ml-4">다. 마케팅 및 광고 활용: 신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 정보 및 참여기회 제공</p>
                  </div>
                </section>

                <section>
                  <h3 className="mb-3">2. 수집하는 개인정보의 항목</h3>
                  <div className="space-y-2 text-muted-foreground leading-relaxed">
                    <p>회사는 다음의 개인정보 항목을 수집하고 있습니다:</p>
                    <p className="ml-4">가. 필수항목: 이름, 이메일 주소, 비밀번호</p>
                    <p className="ml-4">나. 결제 시: 결제 정보 (신용카드 정보, 은행계좌 정보 등)</p>
                    <p className="ml-4">다. 자동 수집: IP 주소, 쿠키, 서비스 이용 기록, 접속 로그</p>
                  </div>
                </section>

                <section>
                  <h3 className="mb-3">3. 개인정보의 보유 및 이용기간</h3>
                  <div className="space-y-2 text-muted-foreground leading-relaxed">
                    <p>1. 회사는 회원이 회원자격을 유지하고 있는 동안 수집된 개인정보를 보유 및 이용할 수 있습니다.</p>
                    <p>2. 회원 탈퇴 시 개인정보는 즉시 파기됩니다. 단, 다음의 경우 명시한 기간 동안 보존합니다:</p>
                    <p className="ml-4">가. 전자상거래법에 따른 보존: 계약 또는 청약철회 등에 관한 기록 (5년)</p>
                    <p className="ml-4">나. 소비자 불만 또는 분쟁처리에 관한 기록 (3년)</p>
                  </div>
                </section>

                <section>
                  <h3 className="mb-3">4. 개인정보의 제3자 제공</h3>
                  <div className="space-y-2 text-muted-foreground leading-relaxed">
                    <p>회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우는 예외로 합니다:</p>
                    <p className="ml-4">1. 이용자가 사전에 동의한 경우</p>
                    <p className="ml-4">2. 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</p>
                  </div>
                </section>

                <section>
                  <h3 className="mb-3">5. 개인정보의 파기절차 및 방법</h3>
                  <div className="space-y-2 text-muted-foreground leading-relaxed">
                    <p>1. 파기절차: 이용자가 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져 내부 방침 및 관련 법령에 따라 일정기간 저장된 후 파기됩니다.</p>
                    <p>2. 파기방법:</p>
                    <p className="ml-4">- 전자적 파일 형태의 정보는 복구 불가능한 방법으로 영구 삭제</p>
                    <p className="ml-4">- 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각</p>
                  </div>
                </section>

                <section>
                  <h3 className="mb-3">6. 이용자의 권리</h3>
                  <div className="space-y-2 text-muted-foreground leading-relaxed">
                    <p>이용자는 언제든지 다음의 권리를 행사할 수 있습니다:</p>
                    <p className="ml-4">1. 개인정보 열람 요구</p>
                    <p className="ml-4">2. 개인정보 정정 및 삭제 요구</p>
                    <p className="ml-4">3. 개인정보 처리 정지 요구</p>
                  </div>
                </section>

                <section>
                  <h3 className="mb-3">7. 개인정보 보호책임자</h3>
                  <div className="space-y-2 text-muted-foreground leading-relaxed">
                    <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                    <p className="ml-4">• 개인정보 보호책임자: 조준형</p>
                    <p className="ml-4">• 이메일: chodrumstudio@gmail.com</p>
                  </div>
                </section>
              </div>
            </ScrollArea>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setShowPrivacyDialog(false)}>
                닫기
              </Button>
              <Button onClick={handleAgreeToPrivacy}>
                동의하기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
