interface GuideProps {
  onNavigate: (page: string) => void;
}

export function Guide({ onNavigate }: GuideProps) {
  return (
    <div className="min-h-screen pb-20 lg:pb-8 bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 lg:py-12">
        <h1 className="mb-8">이용안내</h1>

        <div className="space-y-12 text-sm leading-relaxed">
          <section>
            <h2 className="mb-4">조드럼닷컴 시작하기</h2>
            <p className="text-muted-foreground">
              조드럼닷컴에서는 다양한 장르의 드럼 악보를 간편하게 구매하고 다운로드할 수 있습니다. 
              아래 가이드를 참고하여 서비스를 이용해보세요.
            </p>
          </section>

          <section>
            <h2 className="mb-4">1. 악보 찾기</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="mb-2">검색하기</h3>
                <p className="ml-4">• 상단 검색창에서 곡명이나 아티스트명으로 검색할 수 있습니다.</p>
                <p className="ml-4">• 원하는 악보를 빠르게 찾아보세요.</p>
              </div>
              <div>
                <h3 className="mb-2">카테고리별 탐색</h3>
                <p className="ml-4">• K-POP: 최신 한국 인기 가요</p>
                <p className="ml-4">• CCM: 찬양과 워십 곡</p>
                <p className="ml-4">• Pop: 팝송 악보</p>
                <p className="ml-4">• J-Pop: 일본 대중음악</p>
              </div>
              <div>
                <h3 className="mb-2">난이도 필터</h3>
                <p className="ml-4">• 초급: 드럼 입문자에게 적합</p>
                <p className="ml-4">• 중급: 기본기를 갖춘 연주자</p>
                <p className="ml-4">• 고급: 숙련된 드러머</p>
                <p className="ml-4">• 전문가: 전문 연주자 수준</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4">2. 악보 미리보기</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>• 각 상품 페이지에서 악보의 샘플 이미지를 확인할 수 있습니다.</p>
              <p>• 난이도, 페이지 수, 연주 시간 등 상세 정보를 제공합니다.</p>
              <p>• 일부 곡은 YouTube 연주 영상도 함께 제공됩니다.</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">3. 구매하기</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="mb-2">장바구니에 담기</h3>
                <p className="ml-4">1. 원하는 악보의 '장바구니 담기' 버튼을 클릭합니다.</p>
                <p className="ml-4">2. 여러 악보를 한 번에 담을 수 있습니다.</p>
                <p className="ml-4">3. 디지털 상품이므로 수량은 항상 1개입니다.</p>
              </div>
              <div>
                <h3 className="mb-2">결제하기</h3>
                <p className="ml-4">1. 장바구니에서 구매할 상품을 확인합니다.</p>
                <p className="ml-4">2. 이메일 주소와 이름을 입력합니다.</p>
                <p className="ml-4">3. 원하는 결제 방법을 선택합니다.</p>
              </div>
              <div>
                <h3 className="mb-2">결제 수단</h3>
                <p className="ml-4">• 신용카드/체크카드</p>
                <p className="ml-4">• 네이버페이</p>
                <p className="ml-4">• 카카오페이</p>
                <p className="ml-4">• 토스페이</p>
                <p className="ml-4">• 무통장입금</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4">4. 다운로드하기</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="mb-2">즉시 다운로드</h3>
                <p className="ml-4">• 결제가 완료되면 즉시 다운로드 링크가 제공됩니다.</p>
                <p className="ml-4">• 구매 완료 페이지에서 바로 다운로드할 수 있습니다.</p>
              </div>
              <div>
                <h3 className="mb-2">재다운로드</h3>
                <p className="ml-4">• 마이페이지에서 구매 내역을 확인할 수 있습니다.</p>
                <p className="ml-4">• 언제든지 다시 다운로드할 수 있습니다.</p>
                <p className="ml-4">• 구매한 악보는 영구적으로 보관됩니다.</p>
              </div>
              <div>
                <h3 className="mb-2">파일 형식</h3>
                <p className="ml-4">• PDF 형식으로 제공됩니다.</p>
                <p className="ml-4">• PC, 태블릿, 스마트폰 모두 지원합니다.</p>
                <p className="ml-4">• 고해상도로 인쇄 가능합니다.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4">5. 무통장입금 안내</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>• 무통장입금을 선택하시면 가상계좌 정보가 제공됩니다.</p>
              <p>• 입금 확인 후 다운로드가 가능합니다.</p>
              <p>• 입금 후 마이페이지에서 '입금 완료' 버튼을 클릭해주세요.</p>
              <p>• 영업일 기준 1-2일 내 확인 후 다운로드가 활성화됩니다.</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">6. 환불 정책</h2>
            <div className="space-y-2 text-muted-foreground">
              <p className="mb-4">디지털 콘텐츠 특성상 다운로드 후에는 환불이 불가능합니다.</p>
              <p>다음의 경우 환불이 가능합니다:</p>
              <p className="ml-4">• 파일이 손상되어 정상적으로 열람할 수 없는 경우</p>
              <p className="ml-4">• 상품 설명과 실제 내용이 현저히 다른 경우</p>
              <p className="ml-4">• 중복 구매한 경우 (다운로드 전에 한함)</p>
              <p className="mt-4">환불 요청은 구매일로부터 7일 이내 고객센터로 문의해주세요.</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">7. 이용 시 주의사항</h2>
            <div className="space-y-2 text-muted-foreground">
              <p className="mb-4"><strong>저작권 보호</strong></p>
              <p className="ml-4">• 구매한 악보는 구매자 본인만 사용 가능합니다.</p>
              <p className="ml-4">• 타인에게 공유, 재배포, 재판매는 금지됩니다.</p>
              <p className="ml-4">• 개인 연습 및 연주 목적으로만 사용 가능합니다.</p>
              <p className="ml-4">• 상업적 용도로 사용할 수 없습니다.</p>
              <p className="mt-4 mb-4"><strong>인쇄</strong></p>
              <p className="ml-4">• 개인 사용 목적으로 인쇄 가능합니다.</p>
              <p className="ml-4">• 인쇄물도 타인에게 배포할 수 없습니다.</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">8. 자주 묻는 질문</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <p className="mb-1"><strong>Q. 회원가입 없이 구매할 수 있나요?</strong></p>
                <p className="ml-4">A. 네, 이메일 주소만 있으면 구매 가능합니다.</p>
              </div>
              <div>
                <p className="mb-1"><strong>Q. 구매한 악보를 다시 다운로드할 수 있나요?</strong></p>
                <p className="ml-4">A. 네, 마이페이지에서 언제든 재다운로드 가능합니다.</p>
              </div>
              <div>
                <p className="mb-1"><strong>Q. 모바일에서도 이용할 수 있나요?</strong></p>
                <p className="ml-4">A. 네, 모든 기기에서 이용 가능합니다.</p>
              </div>
              <div>
                <p className="mb-1"><strong>Q. 악보를 인쇄할 수 있나요?</strong></p>
                <p className="ml-4">A. 네, 개인 사용 목적으로 인쇄 가능합니다.</p>
              </div>
              <div>
                <p className="mb-1"><strong>Q. 원하는 곡이 없는데 요청할 수 있나요?</strong></p>
                <p className="ml-4">A. 고객센터로 문의주시면 검토 후 제작해드립니다.</p>
              </div>
            </div>
          </section>

          <section className="pt-8 border-t border-border">
            <h2 className="mb-4">고객 지원</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>추가 문의사항이 있으시면 언제든 연락주세요.</p>
              <p className="mt-4">이메일 문의 : chodrumstudio@gmail.com</p>
              <p>대표 전화: 010-9872-5784</p>
              <p>운영시간: 평일 10:00 - 18:00 (주말, 공휴일 휴무)</p>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://www.instagram.com/cho.drum/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Instagram
                </a>
                <a
                  href="https://www.youtube.com/@chodrum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  YouTube
                </a>
                <a
                  href="https://pf.kakao.com/_hxdVWxj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  카카오톡
                </a>
              </div>
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
