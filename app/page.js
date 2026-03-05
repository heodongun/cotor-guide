import Link from "next/link";
import Image from "next/image";
import ThemeToggleButton from "../components/theme-toggle-button";

const quickStartCommands = `git clone https://github.com/heodongun/cotor.git
cd cotor
./shell/install-global.sh
cotor version

cotor init --interactive
cotor template compare my-pipeline.yaml --fill prompt="Write tests"
cotor validate compare-solutions -c my-pipeline.yaml
cotor run compare-solutions -c my-pipeline.yaml --dry-run
cotor run compare-solutions -c my-pipeline.yaml --watch --output-format text
cotor stats
cotor doctor`;

const configExample = `version: "1.0"

agents:
  - name: my-agent
    pluginClass: com.cotor.data.plugin.ClaudePlugin
    timeout: 60000
    parameters:
      model: claude-3-sonnet
    tags: [ai, claude]

pipelines:
  - name: compare-solutions
    description: "여러 에이전트 답변 비교"
    executionMode: PARALLEL
    stages:
      - id: answer
        agent: { name: my-agent }
        input: "Kotlin 코루틴 테스트 코드 작성"

security:
  useWhitelist: true
  allowedExecutables: [claude, gemini, codex]

logging:
  level: INFO
  file: cotor.log`;

export default function Home() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark min-h-screen flex flex-col">
      <header className="border-b border-border-light dark:border-border-dark bg-background-light dark:bg-surface-dark z-50 py-3">
        <div className="px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <Link className="flex items-center gap-2" href="/">
              <Image src="/cotor.svg" alt="Cotor logo" width={28} height={28} />
              <span className="font-semibold text-lg tracking-tight">Cotor Guide</span>
            </Link>
            <div className="hidden md:flex items-center border border-border-light dark:border-border-dark rounded-md px-2 py-1 bg-surface-light dark:bg-background-dark text-sm text-text-muted-light dark:text-text-muted-dark w-64 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
              <span className="material-symbols-outlined text-[16px] mr-1">search</span>
              <input
                className="bg-transparent border-none outline-none w-full text-text-light dark:text-text-dark text-sm p-0 focus:ring-0"
                placeholder="Type / to search"
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <ThemeToggleButton
              className="p-1 rounded-md text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors"
              iconClass="material-symbols-outlined"
            />
            <a
              className="hidden sm:block hover:text-primary transition-colors"
              href="https://github.com/heodongun/cotor"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <Link
              className="border border-border-light dark:border-border-dark bg-surface-light dark:bg-border-dark text-text-light dark:text-text-dark px-3 py-1 rounded-md hover:bg-border-light dark:hover:bg-border-dark transition-colors"
              href="/docs"
            >
              Docs Dashboard
            </Link>
          </div>
        </div>
        <div className="border-t border-border-light dark:border-border-dark mt-3 pt-3 px-4 md:hidden">
          <nav className="flex overflow-x-auto gap-4 text-sm font-medium text-text-muted-light dark:text-text-muted-dark pb-1">
            <a
              className="whitespace-nowrap hover:text-text-light dark:hover:text-text-dark border-b-2 border-transparent hover:border-border-dark pb-1"
              href="#core"
            >
              Core
            </a>
            <a
              className="whitespace-nowrap hover:text-text-light dark:hover:text-text-dark border-b-2 border-transparent hover:border-border-dark pb-1"
              href="#quickstart"
            >
              Quick Start
            </a>
            <a
              className="whitespace-nowrap hover:text-text-light dark:hover:text-text-dark border-b-2 border-transparent hover:border-border-dark pb-1"
              href="#config"
            >
              Config
            </a>
            <Link
              className="whitespace-nowrap text-text-light dark:text-text-dark border-b-2 border-primary pb-1 font-semibold"
              href="/docs"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex flex-1 max-w-[1400px] w-full mx-auto">
        <aside className="w-64 border-r border-border-light dark:border-border-dark hidden md:block flex-shrink-0 bg-background-light dark:bg-background-dark py-6 px-4 overflow-y-auto sidebar-scroll">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider mb-2">
              Getting Started
            </h3>
            <ul className="space-y-1">
              <li>
                <a
                  className="block px-2 py-1.5 text-sm rounded-md bg-surface-light dark:bg-surface-dark font-medium text-text-light dark:text-text-dark border-l-2 border-primary"
                  href="#core"
                >
                  Core Workflow
                </a>
              </li>
              <li>
                <a
                  className="block px-2 py-1.5 text-sm rounded-md hover:bg-surface-light dark:hover:bg-surface-dark text-text-light dark:text-text-dark"
                  href="#quickstart"
                >
                  Quick Start Commands
                </a>
              </li>
              <li>
                <a
                  className="block px-2 py-1.5 text-sm rounded-md hover:bg-surface-light dark:hover:bg-surface-dark text-text-light dark:text-text-dark"
                  href="#config"
                >
                  Configuration
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider mb-2">
              Operations
            </h3>
            <ul className="space-y-1">
              <li>
                <a
                  className="block px-2 py-1.5 text-sm rounded-md hover:bg-surface-light dark:hover:bg-surface-dark text-text-light dark:text-text-dark"
                  href="#modes"
                >
                  Execution Modes
                </a>
              </li>
              <li>
                <a
                  className="block px-2 py-1.5 text-sm rounded-md hover:bg-surface-light dark:hover:bg-surface-dark text-text-light dark:text-text-dark"
                  href="#examples"
                >
                  Example Pipelines
                </a>
              </li>
              <li>
                <a
                  className="block px-2 py-1.5 text-sm rounded-md hover:bg-surface-light dark:hover:bg-surface-dark text-text-light dark:text-text-dark"
                  href="#troubleshooting"
                >
                  Troubleshooting
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <main className="flex-1 min-w-0 py-6 px-4 md:px-8 lg:px-12 markdown-body">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-text-muted-light dark:text-text-muted-dark mb-4">
              <a className="hover:underline hover:text-primary" href="https://github.com/heodongun/cotor">
                cotor
              </a>
              <span>/</span>
              <span>docs</span>
              <span>/</span>
              <span className="font-semibold text-text-light dark:text-text-dark">guide-overview.md</span>
            </div>

            <h1 className="flex items-center gap-2" id="core">
              <span className="material-symbols-outlined text-primary">menu_book</span>
              Cotor Docs: Core Workflow
            </h1>
            <p>
              Cotor는 여러 AI CLI(claude, gemini, codex 등)를 하나의 파이프라인으로 오케스트레이션하는
              Kotlin 기반 CLI입니다. 설치 후 실제 팀에서 가장 많이 쓰는 흐름은{" "}
              <code>init → template → validate → run → stats/doctor</code> 순서입니다.
            </p>

            <h2 id="modes">Execution Architecture</h2>
            <p>
              실행 모드는 <strong>SEQUENTIAL</strong>, <strong>PARALLEL</strong>, <strong>DAG</strong>를
              기본으로 하고, 조건 분기/반복(DECISION + LOOP), fan-out(map) 스타일까지 지원합니다.
              복잡한 워크플로우를 단계 단위로 분해하고 의존성을 검증한 뒤 실행합니다.
            </p>
            <div className="my-6 border border-border-light dark:border-border-dark rounded-lg p-6 bg-surface-light dark:bg-surface-dark">
              <p className="mb-2 font-semibold">권장 운영 흐름</p>
              <ol className="list-decimal pl-6 space-y-1 text-sm">
                <li>템플릿 생성: <code>cotor template compare ...</code></li>
                <li>정적 검증: <code>cotor validate ...</code></li>
                <li>시뮬레이션: <code>cotor run ... --dry-run</code></li>
                <li>실행 모니터링: <code>cotor run ... --watch</code></li>
                <li>운영 점검: <code>cotor stats</code>, <code>cotor doctor</code></li>
              </ol>
            </div>

            <h3>오케스트레이터가 처리하는 핵심 작업</h3>
            <ul>
              <li>파이프라인 단계 분해 및 의존성 해석</li>
              <li>에이전트/플러그인 라우팅 및 실행 순서 제어</li>
              <li>실패 복구를 위한 체크포인트 저장 및 재개</li>
              <li>출력 포맷 변환(json/csv/text) 및 결과 분석</li>
              <li>보안 화이트리스트 기반 실행 전 검증</li>
            </ul>

            <h2 id="quickstart">Quick Start Commands</h2>
            <p>
              아래 블록은 <code>README.ko.md</code> + <code>docs/QUICK_START.md</code> 기준으로 바로
              실행 가능한 최소 경로입니다.
            </p>
            <div className="code-block mt-4 mb-8">
              <div className="bg-border-light dark:bg-border-dark px-4 py-2 flex items-center justify-between text-xs text-text-muted-light dark:text-text-muted-dark rounded-t-md">
                <span>terminal</span>
              </div>
              <pre className="!rounded-t-none !mb-0 !bg-transparent">
                <code className="language-bash text-text-light dark:text-text-dark">{quickStartCommands}</code>
              </pre>
            </div>

            <h2 id="config">cotor.yaml Example</h2>
            <p>
              기본 설정은 <code>cotor.yaml</code>에 두고, 환경별 오버라이드는 <code>.cotor/*.yaml</code>을
              이름순으로 병합해 사용합니다(나중 파일 우선).
            </p>
            <div className="code-block mt-4 mb-8">
              <div className="bg-border-light dark:bg-border-dark px-4 py-2 flex items-center justify-between text-xs text-text-muted-light dark:text-text-muted-dark rounded-t-md">
                <span>cotor.yaml</span>
              </div>
              <pre className="!rounded-t-none !mb-0 !bg-transparent">
                <code className="language-yaml text-text-light dark:text-text-dark">{configExample}</code>
              </pre>
            </div>

            <h2 id="examples">실전 예제 파이프라인</h2>
            <ul>
              <li>
                단일 실행: <code>./shell/cotor run single-agent -c examples/single-agent.yaml</code>
              </li>
              <li>
                병렬 비교: <code>./shell/cotor run parallel-compare -c examples/parallel-compare.yaml</code>
              </li>
              <li>
                개선 루프: <code>./shell/cotor run decision-loop -c examples/decision-loop.yaml</code>
              </li>
              <li>
                DAG 실행: <code>./shell/cotor run complex-dag-pipeline -c examples/complex_dag_pipeline.yaml</code>
              </li>
            </ul>

            <h2 id="troubleshooting">Troubleshooting</h2>
            <ul>
              <li>실행 전 항상 <code>cotor validate</code>와 <code>--dry-run</code>으로 구조를 확인</li>
              <li>
                환경 이슈는 <code>cotor doctor</code>, 상세 스택은 <code>--debug</code>로 점검
              </li>
              <li>
                빠른 도움말: <code>cotor --short</code>, 전체 명령: <code>cotor --help</code>
              </li>
            </ul>
          </div>
        </main>

        <aside className="w-64 hidden lg:block flex-shrink-0 py-6 px-4">
          <h4 className="text-xs font-semibold text-text-light dark:text-text-dark uppercase tracking-wider mb-3">
            On this page
          </h4>
          <ul className="text-sm space-y-2 text-text-muted-light dark:text-text-muted-dark border-l border-border-light dark:border-border-dark pl-3">
            <li>
              <a className="hover:text-primary transition-colors block" href="#core">
                Core Workflow
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors block" href="#modes">
                Execution Architecture
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors block" href="#quickstart">
                Quick Start Commands
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors block" href="#config">
                cotor.yaml Example
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors block" href="#troubleshooting">
                Troubleshooting
              </a>
            </li>
          </ul>
        </aside>
      </div>

      <footer className="border-t border-border-light dark:border-border-dark py-8 mt-auto">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-xs text-text-muted-light dark:text-text-muted-dark gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/cotor.svg"
              alt="Cotor logo"
              width={20}
              height={20}
              className="opacity-80"
            />
            <span>© 2026 Cotor Guide</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              className="hover:text-primary transition-colors"
              href="https://github.com/heodongun/cotor"
              target="_blank"
              rel="noreferrer"
            >
              Repository
            </a>
            <Link className="hover:text-primary transition-colors" href="/docs">
              Documentation Dashboard
            </Link>
            <a className="hover:text-primary transition-colors" href="https://github.com/heodongun/cotor/issues">
              Issues
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
