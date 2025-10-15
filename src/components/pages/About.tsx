interface AboutProps {
  onNavigate: (page: string) => void;
}

export function About({ onNavigate }: AboutProps) {
  return (
    <div className="min-h-screen pb-20 lg:pb-8 bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 lg:py-12">
        <h1 className="mb-8">회사소개</h1>

        <div className="space-y-12 text-sm leading-relaxed">
          <section>
            <div className="mb-6">
              <h2 className="mb-4">조드럼닷컴</h2>
              <p className="text-muted-foreground">
                조드럼닷컴은 드럼을 사랑하는 모든 이들을 위한 프리미엄 악보 플랫폼입니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">우리의 비전</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                조드럼닷컴은 '모든 드러머가 원하는 곡을 쉽게 연주할 수 있는 세상'을 만들고자 합니다.
                정확하고 연주하기 좋은 고품질 드럼 악보를 통해 음악인들의 연주를 돕고,
                더 나은 음악 문화를 만들어가는 것이 우리의 목표입니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4">조드럼닷컴의 특별함</h2>
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="mb-2">1. 정확한 악보</h3>
                <p>
                  원곡을 철저히 분석하여 제작된 정확한 드럼 악보를 제공합니다.
                  실제 연주와 레코딩을 기반으로 한 세밀한 채보로 원곡의 느낌을 그대로 살렸습니다.
                </p>
              </div>

              <div>
                <h3 className="mb-2">2. 다양한 장르</h3>
                <p>
                  K-POP, CCM, Pop, J-Pop 등 다양한 장르의 악보를 보유하고 있습니다.
                  최신 히트곡부터 스테디셀러까지, 원하는 곡을 찾아 연주할 수 있습니다.
                </p>
              </div>

              <div>
                <h3 className="mb-2">3. 편리한 디지털 악보</h3>
                <p>
                  구매 즉시 다운로드하여 사용 가능한 PDF 형식의 디지털 악보를 제공합니다.
                  언제 어디서나 스마트폰, 태블릿, PC로 악보를 확인하고 연주할 수 있습니다.
                </p>
              </div>

              <div>
                <h3 className="mb-2">4. 합리적인 가격</h3>
                <p>
                  고품질 악보를 합리적인 가격에 제공합니다.
                  한 번 구매하면 영구적으로 보관하고 사용할 수 있습니다.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4">우리의 약속</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                조드럼닷컴은 단순히 악보를 판매하는 것을 넘어, 드러머들의 성장과 발전을 함께합니다.
              </p>
              <ul className="space-y-2 ml-4">
                <li>• 지속적인 신곡 업데이트로 최신 트렌드 반영</li>
                <li>• 사용자 피드백을 통한 서비스 개선</li>
                <li>• 정확하고 연주하기 좋은 고품질 악보 제공</li>
                <li>• 빠른 고객 지원과 문제 해결</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4">함께 만들어가는 음악</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                조드럼닷컴은 드럼 연주자들의 의견을 적극 반영합니다.
                원하시는 곡이나 개선 사항이 있다면 언제든 문의해 주세요.
                여러분의 소중한 의견이 더 나은 조드럼닷컴을 만듭니다.
              </p>
            </div>
          </section>

          <section className="pt-8 border-t border-border">
            <h2 className="mb-4">Contact</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>이메일 문의 : chodrumstudio@gmail.com</p>
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
