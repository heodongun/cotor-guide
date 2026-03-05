import Link from "next/link";

const sections = [
  { id: "install", title: "설치" },
  { id: "quickstart", title: "빠른 시작" },
  { id: "commands", title: "명령어 맵" },
  { id: "modes", title: "실행 모드" },
  { id: "troubleshooting", title: "트러블슈팅" }
];

const installBlock = `# Option 1: global install (recommended)
git clone https://github.com/heodongun/cotor.git
cd cotor
./shell/install-global.sh
cotor version

# Option 2: local usage
./gradlew shadowJar
chmod +x shell/cotor
./shell/cotor version`;

const quickStartBlock = `cotor init --interactive
cotor template --list
cotor template compare my-pipeline.yaml --fill prompt="Write tests"
cotor validate compare-solutions -c my-pipeline.yaml
cotor run compare-solutions -c my-pipeline.yaml --dry-run
cotor run compare-solutions -c my-pipeline.yaml --watch --output-format text
cotor stats
cotor doctor
cotor dash -c my-pipeline.yaml`;

const commandMap = [
  ["init", "설정 파일 생성", "cotor init --interactive"],
  ["template", "파이프라인 템플릿 생성", "cotor template compare out.yaml --fill prompt=\"...\""],
  ["validate", "실행 전 파이프라인 검증", "cotor validate compare-solutions -c out.yaml"],
  ["run", "파이프라인 실행", "cotor run compare-solutions -c out.yaml --output-format text"],
  ["stats", "실행 통계/성과 확인", "cotor stats compare-solutions"],
  ["doctor", "환경 진단", "cotor doctor"],
  ["resume", "체크포인트에서 재개", "cotor resume <checkpoint-id> -c out.yaml"],
  ["web", "웹 편집기 실행", "cotor web"]
];

const modeList = [
  "SEQUENTIAL: 단계별 실행",
  "PARALLEL: 독립 태스크 동시 실행",
  "DAG: 의존성 기반 그래프 실행",
  "DECISION + LOOP: 조건 분기 + 반복 개선",
  "MAP/FAN-OUT: 입력 분산 처리"
];

const troubleshooting = [
  "명령 실행 전 `cotor validate` + `--dry-run`으로 구조 확인",
  "`cotor doctor`로 PATH, 플러그인, 실행 환경 점검",
  "에러 상세 추적이 필요하면 명령에 `--debug` 추가",
  "전역 설치 후 인식 실패 시 PATH 반영 후 새 터미널 재실행",
  "빠른 치트시트는 `cotor --short`, 전체 도움말은 `cotor --help`"
];

export const metadata = {
  title: "Cotor Documentation Dashboard"
};

export default function DocsPage() {
  return (
    <div className="docs-page">
      <header className="top-nav docs-nav fade-in">
        <Link href="/" className="brand">
          <span className="brand-dot" />
          <span>Cotor Documentation Dashboard</span>
        </Link>
        <div className="top-links">
          <a href="https://github.com/heodongun/cotor" target="_blank" rel="noreferrer">
            heodongun/cotor
          </a>
        </div>
      </header>

      <div className="docs-shell slide-up">
        <aside className="docs-sidebar">
          <h2>Guide Map</h2>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ul>
        </aside>

        <main className="docs-content">
          <section id="install" className="docs-section">
            <h1>Cotor - 실사용 중심 운영 가이드</h1>
            <p>
              Cotor는 다중 AI 에이전트 워크플로우를 CLI 하나로 오케스트레이션하는 도구입니다.
              문서의 기본 흐름은 설치 → 템플릿 생성 → 검증 → 실행 → 관측으로 구성됩니다.
            </p>
            <h3>설치</h3>
            <pre className="code-block">
              <code>{installBlock}</code>
            </pre>
          </section>

          <section id="quickstart" className="docs-section">
            <h2>빠른 시작</h2>
            <p>아래 순서가 공식 문서의 최소 실행 경로입니다.</p>
            <pre className="code-block">
              <code>{quickStartBlock}</code>
            </pre>
          </section>

          <section id="commands" className="docs-section">
            <h2>명령어 맵</h2>
            <div className="docs-table">
              <div className="docs-row docs-head">
                <span>명령</span>
                <span>용도</span>
                <span>예시</span>
              </div>
              {commandMap.map(([command, purpose, example]) => (
                <div key={command} className="docs-row">
                  <span>
                    <code>{command}</code>
                  </span>
                  <span>{purpose}</span>
                  <span>
                    <code>{example}</code>
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section id="modes" className="docs-section">
            <h2>실행 모드</h2>
            <ul className="bullet-list">
              {modeList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="troubleshooting" className="docs-section">
            <h2>트러블슈팅</h2>
            <ul className="bullet-list">
              {troubleshooting.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </main>

        <aside className="docs-toc">
          <h2>On This Page</h2>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
