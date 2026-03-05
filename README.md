# Cotor Guide (Next.js)

`cotor` 사용법을 설명하는 문서 사이트입니다.  
정적 `Next.js` 빌드(`out/`)로 Cloudflare Pages에 배포하도록 구성했습니다.

- `/` 경로: Stitch `Cotor Landing Page Hero` 디자인을 JSX로 재구성하고 실제 가이드 콘텐츠 반영
- `/docs` 경로: Stitch `Cotor Documentation Dashboard` 디자인을 JSX로 재구성하고 운영 문서 반영

## Local

```bash
npm install
npm run dev
```

- Home: `http://localhost:3000/`
- Docs: `http://localhost:3000/docs/`

## Build (Cloudflare Pages Output)

```bash
npm run build
```

빌드 결과물은 `out/` 디렉터리에 생성됩니다.

## Cloudflare Pages Deploy

사전 인증:

```bash
npm run cf:whoami
```

배포:

```bash
npm run cf:deploy
```

미리보기:

```bash
npm run cf:preview
```

## Stitch Assets

다운로드된 Stitch 산출물은 `stitch/2083752519962648554/` 아래에 저장되어 있습니다.
