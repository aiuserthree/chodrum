interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* 회사 정보 */}
          <div>
            <h3 className="mb-4">조드럼닷컴</h3>
            <p className="text-sm text-muted-foreground mb-2">
              드럼 악보 전문 플랫폼
            </p>
            <p className="text-sm text-muted-foreground">
              고품질 디지털 악보를<br />
              합리적인 가격에 제공합니다
            </p>
          </div>

          {/* 고객지원 */}
          <div>
            <h4 className="mb-4">고객지원</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('guide')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  이용안내
                </button>
              </li>
              <li>
                <span className="text-muted-foreground">
                  이메일 문의 : chodrumstudio@gmail.com
                </span>
              </li>
              <li>
                <span className="text-muted-foreground">
                  평일 10:00 - 18:00
                </span>
              </li>
            </ul>
          </div>

          {/* 약관 및 정책 */}
          <div>
            <h4 className="mb-4">약관 및 정책</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  회사소개
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  이용약관
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  개인정보처리방침
                </button>
              </li>
            </ul>
          </div>

          {/* SNS */}
          <div>
            <h4 className="mb-4">소셜 미디어</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.instagram.com/cho.drum/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@chodrum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://pf.kakao.com/_hxdVWxj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  카카오톡
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 사업자 정보 */}
        <div className="pt-8 border-t border-border">
          <div className="text-xs text-muted-foreground space-y-1">
            <p>상호명: 조드럼닷컴 | 대표자명: 조준형</p>
            <p>
              사업자 등록번호: 3663101280 | 통신판매업 신고번호: 2023-경기광명-0200 |{' '}
              <a
                href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=3663101280"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                사업자정보확인
              </a>
            </p>
            <p>사업장 주소: 14238 경기도 광명시 디지털로 63</p>
            <p>이메일: chodrumstudio@gmail.com | 대표 전화: 010-9872-5784</p>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            © 2024 조드럼닷컴. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
