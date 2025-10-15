interface TermsProps {
  onNavigate: (page: string) => void;
}

export function Terms({ onNavigate }: TermsProps) {
  return (
    <div className="min-h-screen pb-20 lg:pb-8 bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 lg:py-12">
        <h1 className="mb-8">이용약관</h1>

        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="mb-4">제1조 (목적)</h2>
            <p className="text-muted-foreground">
              본 약관은 조드럼닷컴(이하 "회사")이 운영하는 웹사이트에서 제공하는 드럼 악보 판매 및 관련 서비스(이하 "서비스")를 이용함에 있어 
              회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="mb-4">제2조 (용어의 정의)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>① 본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
              <p className="ml-4">1. "서비스"란 회사가 제공하는 디지털 드럼 악보 판매 및 관련 서비스를 의미합니다.</p>
              <p className="ml-4">2. "이용자"란 본 약관에 따라 회사가 제공하는 서비스를 받는 자를 의미합니다.</p>
              <p className="ml-4">3. "디지털 콘텐츠"란 회사가 제공하는 PDF 형식의 드럼 악보를 의미합니다.</p>
              <p className="ml-4">4. "구매"란 이용자가 회사가 제공하는 디지털 콘텐츠를 유료로 취득하는 행위를 의미합니다.</p>
              <p>② 이 약관에서 사용하는 용어의 정의는 제1항에서 정하는 것을 제외하고는 관계법령 및 서비스별 안내에서 정하는 바에 의합니다.</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">제3조 (약관의 명시와 개정)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>① 회사는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.</p>
              <p>② 회사는 약관의 규제에 관한 법률, 전자상거래 등에서의 소비자보호에 관한 법률 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</p>
              <p>③ 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 제1항의 방식에 따라 그 개정약관의 적용일자 7일 전부터 적용일자 전일까지 공지합니다.</p>
              <p>④ 이용자가 개정약관의 적용에 동의하지 않는 경우 회사는 개정 약관의 내용을 적용할 수 없으며, 이 경우 이용자는 이용계약을 해지할 수 있습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">제4조 (서비스의 제공 및 변경)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>① 회사는 다음과 같은 업무를 수행합니다.</p>
              <p className="ml-4">1. 디지털 드럼 악보의 판매</p>
              <p className="ml-4">2. 구매한 악보의 다운로드 서비스</p>
              <p className="ml-4">3. 악보 미리보기 서비스</p>
              <p className="ml-4">4. 기타 회사가 정하는 업무</p>
              <p>② 회사는 디지털 콘텐츠의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 상품의 내용을 변경할 수 있습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">제5조 (서비스의 중단)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>① 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.</p>
              <p>② 제1항에 의한 서비스 중단의 경우에는 회사는 이용자에게 통지합니다. 다만, 회사가 통제할 수 없는 사유로 인한 서비스의 중단으로 인하여 사전 통지가 불가능한 경우에는 그러하지 아니합니다.</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">제6조 (구매신청 및 개인정보 제공 동의)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>① 이용자는 회사가 제공하는 절차에 의하여 다음 또는 이와 유사한 방법에 의하여 구매를 신청합니다.</p>
              <p className="ml-4">1. 상품의 선택</p>
              <p className="ml-4">2. 성명, 이메일 주소 등의 입력</p>
              <p className="ml-4">3. 약관내용, 청약철회권 등에 대한 확인</p>
              <p className="ml-4">4. 결제방법의 선택</p>
              <p>② 회사는 이용자의 구매 신청이 다음 각 호에 해당하는 경우에는 승낙하지 않거나 승낙을 유보할 수 있습니다.</p>
              <p className="ml-4">1. 실명이 아니거나 타인의 명의를 이용한 경우</p>
              <p className="ml-4">2. 허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">제7조 (대금지급방법)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>구매한 상품에 대한 대금지급방법은 다음 각 호의 방법 중 가용한 방법으로 할 수 있습니다.</p>
              <p className="ml-4">1. 신용카드 결제</p>
              <p className="ml-4">2. 계좌이체</p>
              <p className="ml-4">3. 전자화폐에 의한 결제</p>
              <p className="ml-4">4. 기타 회사가 정하는 방법</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">제8조 (청약철회 등)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>① 디지털 콘텐츠의 특성상 다운로드가 시작된 경우에는 청약철회가 불가능합니다.</p>
              <p>② 다음 각 호의 경우에는 구매 후 7일 이내에 청약철회가 가능합니다.</p>
              <p className="ml-4">1. 파일이 손상되어 정상적으로 이용할 수 없는 경우</p>
              <p className="ml-4">2. 상품설명과 실제 내용이 현저히 다른 경우</p>
              <p className="ml-4">3. 다운로드 전 중복 구매한 경우</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">제9조 (저작권의 귀속 및 이용제한)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>① 회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.</p>
              <p>② 이용자는 서비스를 이용하면서 얻은 정보 중 회사에게 지적재산권이 귀속된 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.</p>
              <p>③ 구매한 디지털 콘텐츠는 구매자 본인의 개인적 용도로만 사용 가능하며, 상업적 목적으로 이용하거나 타인에게 재배포할 수 없습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">제10조 (분쟁해결)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>① 회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.</p>
              <p>② 회사와 이용자간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는 시·도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">제11조 (재판권 및 준거법)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>① 회사와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 민사소송법상의 관할법원에 제기합니다.</p>
              <p>② 회사와 이용자간에 제기된 전자상거래 소송에는 대한민국법을 적용합니다.</p>
            </div>
          </section>

          <section className="pt-4">
            <p className="text-muted-foreground">
              <strong>부칙</strong><br />
              본 약관은 2024년 10월 13일부터 적용됩니다.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <button
            onClick={() => onNavigate('home')}
            className="text-primary hover:underline"
          >
            ← 홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
