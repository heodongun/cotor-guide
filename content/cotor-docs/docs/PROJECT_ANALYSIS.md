# Cotor Project Analysis

이 문서는 `heodongun/cotor` 코드베이스를 기준으로 구성 요소와 런타임 흐름을 빠르게 파악하기 위한 분석 요약입니다.

## 1. 기술 스택

- Language: Kotlin 2.1.0
- Runtime: JVM (JDK 17+ 권장)
- Build: Gradle (`build.gradle.kts`)
- CLI: Clikt 기반 명령 체계
- DI: Koin

## 2. 소스 구조 개요

`src/main/kotlin/com/cotor` 주요 패키지:

- `presentation/cli`: `cotor` CLI 명령 진입 및 서브커맨드
- `domain/orchestrator`: 파이프라인 실행 오케스트레이션
- `domain/executor`: 에이전트 실행 단위 처리
- `validation`: 파이프라인/출력/템플릿 정적 검증
- `checkpoint`, `recovery`: 체크포인트 저장 및 재개
- `stats`, `analysis`, `monitoring`: 실행 통계/분석/모니터링
- `data/plugin`, `data/registry`: 플러그인/에이전트 레지스트리
- `presentation/web`, `presentation/timeline`: 웹 UI 및 타임라인 출력
- `security`: 실행 화이트리스트 및 보안 검증

## 3. CLI 명령 구현 위치

대표 명령 클래스:

- `presentation/cli/Commands.kt`
  - `CotorCli`, `InitCommand`, `RunCommand`, `StatusCommand`, `ListCommand`, `VersionCommand`
- `presentation/cli/EnhancedCommands.kt`
  - `ValidateCommand`, `TestCommand`
- `presentation/cli/DoctorCommand.kt`
- `presentation/cli/StatsCommand.kt`
- `presentation/cli/TemplateCommand.kt`
- `presentation/cli/PluginCommand.kt`
- `presentation/cli/AgentCommand.kt`
- `presentation/cli/ResumeCommand.kt`
- `presentation/cli/WebCommand.kt`

## 4. 실행 플로우

일반적인 실행 경로:

1. CLI 입력 파싱 (`presentation/cli`)
2. 설정 로드 및 병합 (`data/config`)
3. 파이프라인/스테이지 검증 (`validation`)
4. 오케스트레이터 실행 (`domain/orchestrator`)
5. 에이전트별 플러그인 호출 (`data/plugin`, `domain/executor`)
6. 결과 집계/분석 (`domain/aggregator`, `analysis`)
7. 통계/체크포인트 기록 (`stats`, `checkpoint`)

## 5. 운영 관점 체크포인트

- 실행 전: `validate` + `--dry-run`
- 실행 중: `status`, `run --watch`, `dash`
- 실행 후: `stats`, `analysis`, 결과 포맷(`json/csv/text`)
- 장애 복구: `resume`, `checkpoint gc`
- 환경 점검: `doctor`

## 6. 문서화 범위

이 docs 사이트에는 다음이 포함됩니다.

- `cotor/docs` 하위의 모든 `.md`/`.txt`
- 루트 `README.md`, `README.ko.md`
- 본 분석 문서(`PROJECT_ANALYSIS.md`)

