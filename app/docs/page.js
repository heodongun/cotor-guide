import Link from "next/link";
import ThemeToggleButton from "../../components/theme-toggle-button";

const installBlock = `# Option 1: global install (recommended)
git clone https://github.com/heodongun/cotor.git
cd cotor
./shell/install-global.sh
cotor version

# Option 2: local usage
./gradlew shadowJar
chmod +x shell/cotor
./shell/cotor version

# Option 3: docker
docker run -it cotor/cli version`;

const firstPipelineBlock = `cotor init --interactive
cotor template --list
cotor template compare my-pipeline.yaml --fill prompt="Summarize Kotlin coroutines"
cotor validate compare-solutions -c my-pipeline.yaml
cotor run compare-solutions -c my-pipeline.yaml --dry-run
cotor run compare-solutions -c my-pipeline.yaml --watch --output-format text`;

const operationBlock = `# observability
cotor status
cotor stats
cotor stats compare-solutions
cotor dash -c my-pipeline.yaml
cotor web

# resiliency
cotor checkpoint gc --dry-run
cotor resume <checkpoint-id> -c my-pipeline.yaml

# diagnostics
cotor doctor
cotor run compare-solutions -c my-pipeline.yaml --debug`;

const commandRows = [
  {
    command: "init",
    desc: "설정 파일 생성 (interactive 추천)",
    example: "cotor init --interactive"
  },
  {
    command: "template",
    desc: "내장 템플릿 생성/치환(compare, chain, review ...)",
    example: "cotor template compare out.yaml --fill prompt=\"Write tests\""
  },
  {
    command: "validate",
    desc: "파이프라인/의존성/에이전트 정적 검증",
    example: "cotor validate compare-solutions -c out.yaml"
  },
  {
    command: "run",
    desc: "실행 (dry-run/watch/output-format 지원)",
    example: "cotor run compare-solutions -c out.yaml --output-format text"
  },
  {
    command: "stats",
    desc: "실행 통계 및 추세 확인",
    example: "cotor stats compare-solutions"
  },
  {
    command: "doctor",
    desc: "환경/플러그인/실행 경로 진단",
    example: "cotor doctor"
  },
  {
    command: "agent / plugin",
    desc: "에이전트 프리셋 및 플러그인 관리",
    example: "cotor agent add claude --yes / cotor plugin validate"
  }
];

export const metadata = {
  title: "Cotor Documentation Dashboard"
};

export default function DocsPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark min-h-screen flex flex-col">
      <header className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark py-3 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <span className="material-icons text-text-light dark:text-text-dark text-2xl">device_hub</span>
          <Link className="font-semibold text-lg tracking-tight" href="/">
            Cotor
          </Link>
          <div className="hidden md:flex items-center space-x-1 ml-4 border border-border-light dark:border-border-dark rounded bg-background-light dark:bg-background-dark px-2 py-1">
            <span className="material-icons text-text-muted-light dark:text-text-muted-dark text-sm">search</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm text-text-light dark:text-text-dark placeholder-text-muted-light dark:placeholder-text-muted-dark w-64 p-0"
              placeholder="Search documentation..."
              type="text"
            />
            <span className="text-xs text-text-muted-light dark:text-text-muted-dark border border-border-light dark:border-border-dark rounded px-1">
              ⌘K
            </span>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/">
            Overview
          </Link>
          <a
            className="text-sm font-medium hover:text-primary transition-colors"
            href="https://github.com/heodongun/cotor"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <div className="h-5 w-px bg-border-light dark:bg-border-dark" />
          <ThemeToggleButton
            className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark"
            iconClass="material-icons text-base align-middle"
          />
        </nav>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hidden lg:block overflow-y-auto sidebar-scroll py-6 px-4">
          <nav className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider mb-2 px-2">
                Getting Started
              </h3>
              <ul className="space-y-1">
                <li>
                  <a
                    className="block px-2 py-1.5 text-sm rounded bg-primary bg-opacity-10 text-primary font-medium"
                    href="#intro"
                  >
                    Introduction
                  </a>
                </li>
                <li>
                  <a
                    className="block px-2 py-1.5 text-sm rounded hover:bg-border-light dark:hover:bg-border-dark transition-colors"
                    href="#quick-start"
                  >
                    Quick Start
                  </a>
                </li>
                <li>
                  <a
                    className="block px-2 py-1.5 text-sm rounded hover:bg-border-light dark:hover:bg-border-dark transition-colors"
                    href="#installation"
                  >
                    Installation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider mb-2 px-2">
                Core Concepts
              </h3>
              <ul className="space-y-1">
                <li>
                  <a
                    className="block px-2 py-1.5 text-sm rounded hover:bg-border-light dark:hover:bg-border-dark transition-colors"
                    href="#command-surface"
                  >
                    Command Surface
                  </a>
                </li>
                <li>
                  <a
                    className="block px-2 py-1.5 text-sm rounded hover:bg-border-light dark:hover:bg-border-dark transition-colors"
                    href="#run-modes"
                  >
                    Run Modes
                  </a>
                </li>
                <li>
                  <a
                    className="block px-2 py-1.5 text-sm rounded hover:bg-border-light dark:hover:bg-border-dark transition-colors"
                    href="#operations"
                  >
                    Operations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider mb-2 px-2">
                Configuration
              </h3>
              <ul className="space-y-1">
                <li>
                  <a
                    className="block px-2 py-1.5 text-sm rounded hover:bg-border-light dark:hover:bg-border-dark transition-colors"
                    href="#templates"
                  >
                    Templates
                  </a>
                </li>
                <li>
                  <a
                    className="block px-2 py-1.5 text-sm rounded hover:bg-border-light dark:hover:bg-border-dark transition-colors"
                    href="#troubleshooting"
                  >
                    Troubleshooting
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
          <div className="max-w-4xl mx-auto flex">
            <article className="flex-1 prose dark:prose-invert max-w-none">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-light dark:border-border-dark">
                <h1 className="text-3xl font-bold mb-0" id="intro">
                  Cotor Documentation Dashboard
                </h1>
                <div className="flex space-x-2">
                  <a
                    className="inline-flex items-center px-3 py-1 text-sm border border-border-light dark:border-border-dark rounded-md bg-surface-light dark:bg-surface-dark hover:bg-border-light dark:hover:bg-border-dark transition-colors"
                    href="https://github.com/heodongun/cotor"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="material-icons text-sm mr-1">open_in_new</span>
                    Open Repository
                  </a>
                </div>
              </div>

              <p className="text-lg text-text-muted-light dark:text-text-muted-dark">
                Cotor는 AI CLI 기반 멀티 에이전트 파이프라인을 설계, 검증, 실행, 관측까지 하나의 명령
                표면에서 처리하도록 설계되었습니다. 이 페이지는 실제 레포 문서 흐름(README.ko +
                QUICK_START)을 기준으로 운영 관점에서 정리했습니다.
              </p>

              <h2 className="text-2xl font-semibold mt-10 mb-4 flex items-center group" id="quick-start">
                Quick Start
                <a
                  className="ml-2 opacity-0 group-hover:opacity-100 text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-opacity"
                  href="#quick-start"
                >
                  <span className="material-icons text-base">link</span>
                </a>
              </h2>
              <p>가장 빠른 실행 경로는 설치 → init → template → validate → dry-run → 실실행입니다.</p>

              <h3 className="text-xl font-medium mt-6 mb-3" id="installation">
                1. Installation
              </h3>
              <p>전역/로컬/Docker 중 팀 환경에 맞는 경로를 선택할 수 있습니다.</p>
              <div className="relative bg-code-bg-light dark:bg-code-bg-dark rounded-md border border-border-light dark:border-border-dark my-4 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
                  <span className="text-xs font-mono text-text-muted-light dark:text-text-muted-dark">bash</span>
                </div>
                <pre className="p-4 overflow-x-auto text-sm font-mono m-0">
                  <code className="text-text-light dark:text-text-dark">{installBlock}</code>
                </pre>
              </div>

              <h3 className="text-xl font-medium mt-6 mb-3">2. First Pipeline</h3>
              <p>
                템플릿으로 초기 YAML을 만든 뒤 validate와 dry-run으로 안전하게 확인하고 실행하는 방식이
                권장됩니다.
              </p>
              <div className="relative bg-code-bg-light dark:bg-code-bg-dark rounded-md border border-border-light dark:border-border-dark my-4 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
                  <span className="text-xs font-mono text-text-muted-light dark:text-text-muted-dark">bash</span>
                </div>
                <pre className="p-4 overflow-x-auto text-sm font-mono m-0">
                  <code className="text-text-light dark:text-text-dark">{firstPipelineBlock}</code>
                </pre>
              </div>

              <h3 className="text-xl font-medium mt-6 mb-3" id="command-surface">
                3. Command Surface
              </h3>
              <p>현재 운영에서 자주 쓰는 명령을 빠르게 확인할 수 있도록 정리했습니다.</p>
              <div className="overflow-x-auto border border-border-light dark:border-border-dark rounded-md">
                <table className="w-full text-sm">
                  <thead className="bg-surface-light dark:bg-surface-dark">
                    <tr>
                      <th className="text-left px-3 py-2 border-b border-border-light dark:border-border-dark">
                        Command
                      </th>
                      <th className="text-left px-3 py-2 border-b border-border-light dark:border-border-dark">
                        Description
                      </th>
                      <th className="text-left px-3 py-2 border-b border-border-light dark:border-border-dark">
                        Example
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {commandRows.map((row) => (
                      <tr key={row.command}>
                        <td className="align-top px-3 py-2 border-b border-border-light dark:border-border-dark">
                          <code>{row.command}</code>
                        </td>
                        <td className="align-top px-3 py-2 border-b border-border-light dark:border-border-dark">
                          {row.desc}
                        </td>
                        <td className="align-top px-3 py-2 border-b border-border-light dark:border-border-dark">
                          <code>{row.example}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-medium mt-6 mb-3" id="run-modes">
                4. Run Modes
              </h3>
              <ul>
                <li>
                  <strong>SEQUENTIAL</strong>: 단계별 순차 실행
                </li>
                <li>
                  <strong>PARALLEL</strong>: 독립 작업 동시 실행
                </li>
                <li>
                  <strong>DAG</strong>: 의존성 기반 그래프 실행
                </li>
                <li>
                  <strong>DECISION + LOOP</strong>: 조건 분기 + 반복 개선 흐름
                </li>
                <li>
                  <strong>MAP/FAN-OUT</strong>: 대량 입력 분산 처리
                </li>
              </ul>

              <h3 className="text-xl font-medium mt-6 mb-3" id="operations">
                5. Operations & Resiliency
              </h3>
              <p>
                운영 중에는 <code>status/stats</code>로 관측하고, 실패 상황은 checkpoint/resume으로
                복구하는 패턴을 권장합니다.
              </p>
              <div className="relative bg-code-bg-light dark:bg-code-bg-dark rounded-md border border-border-light dark:border-border-dark my-4 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
                  <span className="text-xs font-mono text-text-muted-light dark:text-text-muted-dark">bash</span>
                </div>
                <pre className="p-4 overflow-x-auto text-sm font-mono m-0">
                  <code className="text-text-light dark:text-text-dark">{operationBlock}</code>
                </pre>
              </div>

              <h3 className="text-xl font-medium mt-6 mb-3" id="templates">
                6. Templates
              </h3>
              <p>
                내장 템플릿은 <code>compare</code>, <code>chain</code>, <code>review</code>,{" "}
                <code>consensus</code>, <code>fanout</code>, <code>selfheal</code>,{" "}
                <code>verified</code>, <code>custom</code>을 지원합니다.
              </p>

              <h3 className="text-xl font-medium mt-6 mb-3" id="troubleshooting">
                7. Troubleshooting
              </h3>
              <ul>
                <li>
                  실행 전에 <code>validate</code> + <code>--dry-run</code> 조합을 기본으로 사용
                </li>
                <li>
                  환경 점검은 <code>cotor doctor</code>, 상세 로그는 <code>--debug</code>
                </li>
                <li>
                  빠른 레퍼런스는 <code>cotor --short</code>, 전체 명령은 <code>cotor --help</code>
                </li>
              </ul>

              <div className="mt-12 pt-6 border-t border-border-light dark:border-border-dark flex justify-between items-center text-sm text-text-muted-light dark:text-text-muted-dark">
                <div>Last updated: 2026-03-05</div>
                <div className="flex space-x-4">
                  <a
                    className="hover:text-primary transition-colors flex items-center"
                    href="https://github.com/heodongun/cotor"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="material-icons text-sm mr-1">open_in_new</span>
                    Repository
                  </a>
                  <Link className="hover:text-primary transition-colors flex items-center" href="/">
                    <span className="material-icons text-sm mr-1">home</span>
                    Home
                  </Link>
                </div>
              </div>
            </article>

            <aside className="hidden xl:block w-56 ml-10 flex-shrink-0">
              <div className="sticky top-24">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark mb-4">
                  On this page
                </h4>
                <ul className="space-y-2 text-sm text-text-muted-light dark:text-text-muted-dark border-l-2 border-border-light dark:border-border-dark">
                  <li className="pl-3 border-l-2 border-transparent hover:border-text-muted-light dark:hover:border-text-muted-dark">
                    <a className="hover:text-text-light dark:hover:text-text-dark transition-colors" href="#quick-start">
                      Quick Start
                    </a>
                  </li>
                  <li className="pl-6 border-l-2 border-primary -ml-[2px]">
                    <a className="text-primary font-medium" href="#installation">
                      Installation
                    </a>
                  </li>
                  <li className="pl-6 border-l-2 border-transparent hover:border-text-muted-light dark:hover:border-text-muted-dark">
                    <a
                      className="hover:text-text-light dark:hover:text-text-dark transition-colors"
                      href="#command-surface"
                    >
                      Command Surface
                    </a>
                  </li>
                  <li className="pl-6 border-l-2 border-transparent hover:border-text-muted-light dark:hover:border-text-muted-dark">
                    <a className="hover:text-text-light dark:hover:text-text-dark transition-colors" href="#run-modes">
                      Run Modes
                    </a>
                  </li>
                  <li className="pl-6 border-l-2 border-transparent hover:border-text-muted-light dark:hover:border-text-muted-dark">
                    <a className="hover:text-text-light dark:hover:text-text-dark transition-colors" href="#operations">
                      Operations
                    </a>
                  </li>
                  <li className="pl-6 border-l-2 border-transparent hover:border-text-muted-light dark:hover:border-text-muted-dark">
                    <a className="hover:text-text-light dark:hover:text-text-dark transition-colors" href="#troubleshooting">
                      Troubleshooting
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
