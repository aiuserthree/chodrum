interface PrivacyProps {
  onNavigate: (page: string) => void;
}

export function Privacy({ onNavigate }: PrivacyProps) {
  return (
    <div className="min-h-screen pb-20 lg:pb-8 bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 lg:py-12">
        <h1 className="mb-8">개인정보처리방침</h1>

        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <p className="text-muted-foreground">
              조드럼닷컴(이하 "회사")은 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 
              개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.
            </p>
          </section>

          <section>
            <h2 className="mb-4">제1조 (개인정보의 처리 목적)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 
              이용 목적이 변경되는 경우에는 개인정보 보호법에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
              <p className="mt-4">1. 회원 가입 및 관리</p>
              <p className="ml-4">회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용 방지</p>
              <p className="mt-4">2. 재화 또는 서비스 제공</p>
              <p className="ml-4">디지털 콘텐츠 제공, 구매 및 요금 결제, 본인인증, 요금추심</p>
              <p className="mt-4">3. 마케팅 및 광고에의 활용</p>
              <p className="ml-4">신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">제2조 (개인정보의 처리 및 보유 기간)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>① 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
              <p>② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
              <p className="mt-4">1. 회원 가입 및 관리 : 회원 탈퇴시까지</p>
              <p className="ml-4">다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료시까지</p>
              <p className="ml-4">- 관계 법령 위반에 따른 수사·조사 등이 진행중인 경우에는 해당 수사·조사 종료시까지</p>
              <p className="ml-4">- 서비스 이용에 따른 채권·채무관계 잔존시에는 해당 채권·채무관계 정산시까지</p>
              <p className="mt-4">2. 재화 또는 서비스 제공 : 재화·서비스 공급완료 및 요금결제·정산 완료시까지</p>
              <p className="ml-4">다만, 다음의 사유에 해당하는 경우에는 해당 기간 종료시까지</p>
              <p className="ml-4">- 전자상거래법에 따른 표시·광고, 계약내용 및 이행 등 거래에 관한 기록</p>
              <p className="ml-8">표시·광고에 관한 기록 : 6개월</p>
              <p className="ml-8">계약 또는 청약철회, 대금결제, 재화 등의 공급기록 : 5년</p>
              <p className="ml-8">소비자 불만 또는 분쟁처리에 관한 기록 : 3년</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">제3조 (처리하는 개인정보의 항목)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>① 회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
              <p className="mt-4">1. 회원 가입 및 관리</p>
              <p className="ml-4">필수항목 : 이메일 주소, 이름</p>
              <p className="ml-4">선택항목 : 휴대전화번호</p>
              <p className="mt-4">2. 재화 또는 서비스 제공</p>
              <p className="ml-4">필수항목 : 이름, 이메일 주소, 결제정보</p>
              <p className="mt-4">3. 인터넷 서비스 이용과정에서 아래 개인정보 항목이 자동으로 생성되어 수집될 수 있습니다.</p>
              <p className="ml-4">IP주소, 쿠키, MAC주소, 서비스 이용기록, 방문기록</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">제4조 (개인정보의 제3자 제공)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>① 회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 
              정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</p>
              <p>② 회사는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.</p>
              <p className="mt-4">결제대행업체</p>
              <p className="ml-4">- 개인정보를 제공받는 자 : 결제대행사</p>
              <p className="ml-4">- 제공받는 자의 개인정보 이용목적 : 결제 처리</p>
              <p className="ml-4">- 제공하는 개인정보 항목 : 이름, 결제정보</p>
              <p className="ml-4">- 제공받는 자의 보유·이용기간 : 거래 종료 후 5년</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">제5조 (개인정보의 파기)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>① 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</p>
              <p>② 개인정보 파기의 절차 및 방법은 다음과 같습니다.</p>
              <p className="mt-4">1. 파기절차</p>
              <p className="ml-4">불필요한 개인정보는 개인정보 보호책임자의 책임하에 내부방침 절차에 따라 즉시 파기합니다.</p>
              <p className="mt-4">2. 파기방법</p>
              <p className="ml-4">전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.</p>
              <p className="ml-4">종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">제6조 (정보주체와 법정대리인의 권리·의무 및 그 행사방법)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>① 정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.</p>
              <p>② 제1항에 따른 권리 행사는 회사에 대해 개인정보 보호법 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 
              회사는 이에 대해 지체 없이 조치하겠습니다.</p>
              <p>③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">제7조 (개인정보의 안전성 확보조치)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
              <p className="mt-4">1. 관리적 조치 : 내부관리계획 수립·시행, 정기적 직원 교육 등</p>
              <p>2. 기술적 조치 : 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치</p>
              <p>3. 물리적 조치 : 전산실, 자료보관실 등의 접근통제</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">제8조 (개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>① 회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.</p>
              <p>② 쿠키는 웹사이트를 운영하는데 이용되는 서버가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.</p>
              <p className="ml-4">가. 쿠키의 사용목적: 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부 등을 파악하여 
              이용자에게 최적화된 정보 제공을 위해 사용됩니다.</p>
              <p className="ml-4">나. 쿠키의 설치·운영 및 거부: 웹브라우저 상단의 도구 메뉴에서 쿠키 설정을 변경할 수 있습니다. 
              단, 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">제9조 (개인정보 보호책임자)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 
              아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
              <p className="mt-4">개인정보 보호책임자</p>
              <p className="ml-4">성명 : 조준형</p>
              <p className="ml-4">직책 : 개인정보보호책임자</p>
              <p className="ml-4">연락처 : 010-9872-5784</p>
              <p className="ml-4">이메일 : chodrumstudio@gmail.com</p>
              <p>② 정보주체께서는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 
              개인정보 보호책임자에게 문의하실 수 있습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">제10조 (개인정보 열람청구)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>정보주체는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다.</p>
              <p className="mt-4">개인정보 열람청구 접수·처리 부서</p>
              <p className="ml-4">부서명 : 고객지원팀</p>
              <p className="ml-4">담당자 : 조준형</p>
              <p className="ml-4">연락처 : 010-9872-5784</p>
              <p className="ml-4">이메일 : chodrumstudio@gmail.com</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">제11조 (권익침해 구제방법)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 
              분쟁해결이나 상담 등을 신청할 수 있습니다.</p>
              <p className="mt-4">개인정보 침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.</p>
              <p className="ml-4">1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)</p>
              <p className="ml-4">2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)</p>
              <p className="ml-4">3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)</p>
              <p className="ml-4">4. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">제12조 (개인정보 처리방침 변경)</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>이 개인정보 처리방침은 2024. 10. 13부터 적용됩니다.</p>
            </div>
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
