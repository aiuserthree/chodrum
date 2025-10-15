import { useState } from 'react';
import { PaymentMethod } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { CreditCard, Building2, Wallet, Shield } from 'lucide-react';

interface PaymentMethodsProps {
  selectedMethod: PaymentMethod | null;
  onMethodSelect: (method: PaymentMethod) => void;
  onSubmit: () => void;
}

export function PaymentMethods({ selectedMethod, onMethodSelect, onSubmit }: PaymentMethodsProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert('이용약관에 동의해주세요');
      return;
    }
    if (!selectedMethod) {
      alert('결제 수단을 선택해주세요');
      return;
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Method Selection */}
      <div>
        <h3 className="mb-4">결제 수단 선택</h3>
        
        {/* Credit/Debit Card */}
        <div
          className={`border rounded-lg p-4 mb-3 cursor-pointer transition-all ${
            selectedMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border'
          }`}
          onClick={() => onMethodSelect('card')}
        >
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5" />
            <span>신용/체크카드</span>
          </div>
          
          {selectedMethod === 'card' && (
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="cardNumber">카드 번호</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardInfo.number}
                  onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">유효기간</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardInfo.expiry}
                    onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardInfo.cvv}
                    onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="cardName">카드 소유자명</Label>
                <Input
                  id="cardName"
                  placeholder="홍길동"
                  value={cardInfo.name}
                  onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          )}
        </div>

        {/* Bank Transfer */}
        <div
          className={`border rounded-lg p-4 mb-3 cursor-pointer transition-all ${
            selectedMethod === 'bank-transfer' ? 'border-primary bg-primary/5' : 'border-border'
          }`}
          onClick={() => onMethodSelect('bank-transfer')}
        >
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5" />
            <span>무통장입금</span>
          </div>
          
          {selectedMethod === 'bank-transfer' && (
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="bank">은행 선택</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="은행을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kb">국민은행</SelectItem>
                    <SelectItem value="shinhan">신한은행</SelectItem>
                    <SelectItem value="woori">우리은행</SelectItem>
                    <SelectItem value="hana">하나은행</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="depositor">입금자명</Label>
                <Input
                  id="depositor"
                  placeholder="홍길동"
                  className="mt-1"
                />
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-3 rounded text-sm">
                <p className="text-amber-800 dark:text-amber-200">
                  24시간 이내에 입금을 완료해주세요. 입금 확인 후 주문이 확정됩니다.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Virtual Account */}
        <div
          className={`border rounded-lg p-4 mb-3 cursor-pointer transition-all ${
            selectedMethod === 'virtual-account' ? 'border-primary bg-primary/5' : 'border-border'
          }`}
          onClick={() => onMethodSelect('virtual-account')}
        >
          <div className="flex items-center gap-3">
            <Wallet className="w-5 h-5" />
            <span>가상계좌</span>
          </div>
          
          {selectedMethod === 'virtual-account' && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-3 rounded text-sm">
              <p className="text-blue-800 dark:text-blue-200">
                결제 완료 버튼을 누르면 가상계좌 번호가 발급됩니다. 입금 기한 내에 정확한 금액을 입금해주세요.
              </p>
            </div>
          )}
        </div>

        {/* Korean Payment Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          {/* Naver Pay */}
          <div
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedMethod === 'naver-pay' ? 'border-primary bg-primary/5' : 'border-border'
            }`}
            onClick={() => onMethodSelect('naver-pay')}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white">
                N
              </div>
              <span>네이버페이</span>
            </div>
          </div>

          {/* Kakao Pay */}
          <div
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedMethod === 'kakao-pay' ? 'border-primary bg-primary/5' : 'border-border'
            }`}
            onClick={() => onMethodSelect('kakao-pay')}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
                <span>K</span>
              </div>
              <span>카카오페이</span>
            </div>
          </div>

          {/* Toss Pay */}
          <div
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedMethod === 'toss-pay' ? 'border-primary bg-primary/5' : 'border-border'
            }`}
            onClick={() => onMethodSelect('toss-pay')}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">
                T
              </div>
              <span>토스페이</span>
            </div>
          </div>

          {/* PayPal */}
          <div
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-border'
            }`}
            onClick={() => onMethodSelect('paypal')}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center text-white">
                P
              </div>
              <span>페이팔</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Badges */}
      <div className="bg-muted p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-green-600" />
          <span>안전한 결제</span>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="bg-background px-2 py-1 rounded border border-border">SSL 암호화</span>
          <span className="bg-background px-2 py-1 rounded border border-border">토스페이먼츠</span>
          <span className="bg-background px-2 py-1 rounded border border-border">PCI DSS 인증</span>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="terms"
          checked={agreedToTerms}
          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
        />
        <Label htmlFor="terms" className="cursor-pointer leading-relaxed">
          <a href="#" className="text-primary hover:underline">
            이용약관
          </a>
          {' '}및{' '}
          <a href="#" className="text-primary hover:underline">
            환불정책
          </a>
          에 동의합니다
        </Label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full min-h-[48px]"
        disabled={!selectedMethod || !agreedToTerms}
      >
        결제 완료
      </Button>
    </form>
  );
}
