// 실제 서비스가 공개되면 각 url만 교체하세요.
const services = {
  meal: {
    url: "",
    label: "오늘의 밥상 바로가기",
  },
  planner: {
    url: "https://htw01097057323-cpu.github.io/daewon-suhaeng/",
    label: "수행평가 알리미 바로가기",
  },
  seat: {
    url: "",
    label: "자리있어? 바로가기",
  },
};

function configureServiceLinks() {
  Object.entries(services).forEach(([id, service]) => {
    const link = document.querySelector(`[data-link="${id}"]`);
    const status = document.querySelector(`[data-status="${id}"]`);

    if (!link || !status) return;

    const label = link.querySelector("[data-link-label]");
    const isLive = /^https?:\/\//.test(service.url);

    if (isLive) {
      link.href = service.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.removeAttribute("aria-disabled");
      label.textContent = service.label;
      status.textContent = "이용 가능";
      status.classList.add("is-live");
      return;
    }

    link.removeAttribute("href");
    link.setAttribute("aria-disabled", "true");
    link.tabIndex = -1;
    label.textContent = "서비스 준비 중";
    status.textContent = "준비 중";
  });
}

function revealCards() {
  const cards = [...document.querySelectorAll(".service-card")];
  cards.forEach((card) => card.classList.add("is-pending"));

  if (!("IntersectionObserver" in window)) {
    cards.forEach((card) => {
      card.classList.remove("is-pending");
      card.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = cards.indexOf(entry.target);
        entry.target.style.transitionDelay = `${Math.max(index, 0) * 90}ms`;
        entry.target.classList.remove("is-pending");
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 },
  );

  cards.forEach((card) => observer.observe(card));
}

configureServiceLinks();
revealCards();
document.querySelector("#year").textContent = String(new Date().getFullYear());
