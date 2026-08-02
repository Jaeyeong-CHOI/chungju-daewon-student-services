# 충주대원고 학생 서비스

충주대원고 학생 세 팀이 만든 교내 서비스의 통합 홈페이지입니다. Google Drive로 전달된 원본 디자인의 카피와 시각 언어를 유지하면서, 편집기 런타임 없이 동작하는 반응형 정적 사이트로 재구성했습니다.

## 서비스

- 오늘의 밥상 — 급식과 시간표
- 찾아줘! — 교내 분실물 게시판
- 자리있어? — 자습실·도서관 좌석 확인

현재 전달된 원본에는 각 서비스 URL이 비어 있어 버튼은 `준비 중`으로 표시됩니다. URL이 확정되면 [`script.js`](./script.js)의 `services` 객체에서 `url` 값만 수정하면 됩니다.

```js
meal: {
  url: "https://example.com",
  label: "오늘의 밥상 바로가기",
},
```

## 로컬 실행

별도 빌드 과정은 없습니다.

```bash
python3 -m http.server 5203 --bind 127.0.0.1
```

브라우저에서 `http://127.0.0.1:5203`을 엽니다.

## QA

Playwright가 설치된 환경에서 다음 명령으로 desktop/mobile 렌더, asset 실패,
console error, 가로 overflow를 확인할 수 있습니다.

```bash
NODE_PATH=/path/to/node_modules node scripts/qa.cjs
```

## 배포

- GitHub Pages: `main` 브랜치 루트
- Cloudflare Tunnel origin: `http://127.0.0.1:5203`
- macOS LaunchAgent: `ai.openclaw.chungju-daewon-student-services`

## 출처

- 디자인 원본: 사용자 제공 Google Drive ZIP (`대원고 서비스 홈.dc.html`)
- 학교명 확인: [충주대원고등학교 공식 홈페이지](https://school.cbe.go.kr/daewon-h)
