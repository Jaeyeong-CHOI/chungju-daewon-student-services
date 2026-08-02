# 충주대원고 학생 서비스

충주대원고 학생 세 팀이 만든 교내 서비스의 통합 홈페이지입니다. Google Drive로 전달된 원본 디자인의 카피와 시각 언어를 유지하면서, 편집기 런타임 없이 동작하는 반응형 정적 사이트로 재구성했습니다.

## 서비스

- 오늘의 밥상 — 급식과 시간표
- [수행평가 알리미](https://htw01097057323-cpu.github.io/daewon-suhaeng/) — 학년·과목별 평가 일정과 마감 알림
- 자리있어? — 자습실·도서관 좌석 확인

TEAM 2의 수행평가 알리미는 공개되어 `이용 가능`으로 표시됩니다. 나머지 서비스는 URL이 확정될 때까지 `준비 중`으로 표시되며, [`script.js`](./script.js)의 `services` 객체에서 `url` 값만 수정하면 공개할 수 있습니다.

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

- 운영 도메인: `https://daewon-ai.com` (`https://www.daewon-ai.com` 포함)
- GitHub Pages: `main` 브랜치 루트
- Cloudflare Tunnel origin: `http://127.0.0.1:5203`
- macOS LaunchAgent: `ai.openclaw.chungju-daewon-student-services`

## 출처

- 디자인 원본: 사용자 제공 Google Drive ZIP (`대원고 서비스 홈.dc.html`)
- TEAM 2 산출물: [htw01097057323-cpu/daewon-suhaeng](https://github.com/htw01097057323-cpu/daewon-suhaeng)
- TEAM 2 카드 이미지: 팀에서 제공한 수행평가 알리미 로고 PNG
- 학교명 확인: [충주대원고등학교 공식 홈페이지](https://school.cbe.go.kr/daewon-h)
