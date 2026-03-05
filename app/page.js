import Link from "next/link";

const quickStartPath = [
  {
    step: "01",
    title: "설치",
    body: "./shell/install-global.sh 또는 로컬 빌드로 cotor 실행 파일을 준비합니다."
  },
  {
    step: "02",
    title: "초기화",
    body: "cotor init --interactive로 기본 설정 파일(cotor.yaml)을 생성합니다."
  },
  {
    step: "03",
    title: "검증 + 드라이런",
    body: "validate, --dry-run으로 실행 전 에이전트 구성과 파이프라인 흐름을 확인합니다."
  },
  {
    step: "04",
    title: "실행 + 관찰",
    body: "run --watch, stats, doctor, dash/web까지 이어서 운영 상태를 점검합니다."
  }
];

const runModes = [
  {
    label: "SEQUENTIAL",
    description: "단계별 순차 실행. 가장 읽기 쉽고 디버깅이 간단합니다."
  },
  {
    label: "PARALLEL",
    description: "독립 작업 동시 실행. 비교/수집 워크로드에 적합합니다."
  },
  {
    label: "DAG",
    description: "의존성 기반 그래프 실행. 복합 파이프라인 오케스트레이션용입니다."
  },
  {
    label: "DECISION + LOOP",
    description: "조건 기반 분기와 반복 개선 루프를 한 파이프라인에서 처리합니다."
  },
  {
    label: "MAP/FAN-OUT",
    description: "대량 입력을 fan-out 처리한 뒤 단계적으로 집계합니다."
  }
];

const commandSnippet = `# install
./shell/install-global.sh
cotor version

# initialize
cotor init --interactive
cotor template compare my-pipeline.yaml --fill prompt="Write tests"

# validate and run
cotor validate compare-solutions -c my-pipeline.yaml
cotor run compare-solutions -c my-pipeline.yaml --dry-run
cotor run compare-solutions -c my-pipeline.yaml --watch --output-format text

# observe
cotor stats
cotor doctor
cotor dash -c my-pipeline.yaml`;

export default function Home() {
  return (
    <div className="site-shell">
      <header className="top-nav fade-in">
        <Link href="/" className="brand">
          <span className="brand-dot" />
          <span>Cotor Guide</span>
        </Link>
        <nav className="top-links">
          <Link href="/docs">Documentation</Link>
          <a href="https://github.com/heodongun/cotor" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </header>

      <main className="home-main">
        <section className="hero-card slide-up">
          <p className="hero-badge">AI CLI Master-Agent System</p>
          <h1>Cotor 사용법을 빠르게 시작하는 운영형 문서 사이트</h1>
          <p className="hero-description">
            이 사이트는 <code>https://github.com/heodongun/cotor</code> 레포의 실사용 경로를
            기준으로 설치, 템플릿, 검증, 실행, 모니터링까지 한 번에 안내합니다.
          </p>
          <div className="hero-actions">
            <Link href="/docs" className="btn-primary">
              문서 대시보드 열기
            </Link>
            <a
              className="btn-secondary"
              href="https://github.com/heodongun/cotor"
              target="_blank"
              rel="noreferrer"
            >
              레포 바로가기
            </a>
          </div>
        </section>

        <section className="panel slide-up delay-1">
          <div className="section-title-row">
            <h2>5분 스타트 경로</h2>
            <span>docs/QUICK_START.md 기반</span>
          </div>
          <div className="step-grid">
            {quickStartPath.map((item) => (
              <article key={item.step} className="step-card">
                <p className="step-number">{item.step}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel slide-up delay-2">
          <div className="section-title-row">
            <h2>핵심 실행 명령</h2>
            <span>복사 후 바로 실행 가능한 기본 플로우</span>
          </div>
          <pre className="code-block">
            <code>{commandSnippet}</code>
          </pre>
        </section>

        <section className="panel slide-up delay-3">
          <div className="section-title-row">
            <h2>워크플로우 실행 모드</h2>
            <span>상황에 맞는 파이프라인 패턴 선택</span>
          </div>
          <div className="mode-grid">
            {runModes.map((mode) => (
              <article key={mode.label} className="mode-card">
                <p className="mode-label">{mode.label}</p>
                <p>{mode.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
