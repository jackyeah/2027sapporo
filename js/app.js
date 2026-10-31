/* ============================================================
   北海道賞雪 2027 — 互動邏輯
   ============================================================ */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  let showPage = () => {};       // 由 initNav 賦值，供跨函式切換頁面
  let selectItineraryDay = () => {}; // 由 renderItinerary 賦值，供首頁「查看完整行程」按鈕使用
  let refreshPersonalization = () => {}; // 由各 render 函式賦值，供切換身份後即時更新畫面

  const IDENTITY_KEY = "myIdentity";

  function getMyIdentity() {
    const id = localStorage.getItem(IDENTITY_KEY);
    return PEOPLE.find(p => p.id === id) || null;
  }

  /* ---------------- 身份選擇 ---------------- */
  function initIdentity() {
    const modal = document.getElementById("identityModal");
    const grid = document.getElementById("identityGrid");
    const skipBtn = document.getElementById("identitySkipBtn");
    const navBtn = document.getElementById("navAvatarBtn");
    const navIcon = document.getElementById("navAvatarIcon");
    const companionWrap = document.getElementById("heroCompanion");
    const companionAvatar = document.getElementById("heroCompanionAvatar");
    const companionText = document.getElementById("heroCompanionText");

    grid.innerHTML = PEOPLE.map(p => `
      <button class="identity-option" data-id="${p.id}">
        <svg style="--accent: var(--${p.color});"><use href="#${p.avatar}"/></svg>
        <span class="identity-option__name">${p.name}</span>
      </button>
    `).join("");

    function applyIdentity(person) {
      if (!person) {
        navIcon.innerHTML = `<use href="#avatar-generic"/>`;
        companionWrap.style.display = "none";
        return;
      }
      navIcon.innerHTML = `<use href="#${person.avatar}"/>`;
      navIcon.style.setProperty("--accent", `var(--${person.color})`);
      companionAvatar.innerHTML = `<use href="#${person.avatar}"/>`;
      companionAvatar.style.setProperty("--accent", `var(--${person.color})`);
      companionText.textContent = `嗨，${person.name}！一起出發吧`;
      companionWrap.style.display = "flex";
    }

    function openModal() {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      const current = getMyIdentity();
      grid.querySelectorAll(".identity-option").forEach(btn => {
        btn.classList.toggle("is-selected", current && btn.dataset.id === current.id);
      });
    }
    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
    }

    grid.querySelectorAll(".identity-option").forEach(btn => {
      btn.addEventListener("click", () => {
        const person = PEOPLE.find(p => p.id === btn.dataset.id);
        localStorage.setItem(IDENTITY_KEY, person.id);
        applyIdentity(person);
        closeModal();
        refreshPersonalization();
      });
    });

    skipBtn.addEventListener("click", closeModal);
    navBtn.addEventListener("click", openModal);

    applyIdentity(getMyIdentity());

    if (!localStorage.getItem(IDENTITY_KEY)) {
      openModal();
    }
  }

  /* ---------------- 減少動態效果 ---------------- */
  function initMotionToggle() {
    const key = "reduceMotion";
    const btn = document.getElementById("motionToggle");
    const label = document.getElementById("motionToggleLabel");

    let reduced = localStorage.getItem(key);
    if (reduced === null) reduced = prefersReduced.matches ? "1" : "0";

    function apply() {
      document.body.classList.toggle("reduce-motion", reduced === "1");
      label.textContent = reduced === "1" ? "恢復動態" : "減少動態";
    }
    apply();

    btn.addEventListener("click", () => {
      reduced = reduced === "1" ? "0" : "1";
      localStorage.setItem(key, reduced);
      apply();
    });
  }

  /* ---------------- 導覽切換 ---------------- */
  function initNav() {
    const links = document.querySelectorAll(".nav__link");
    const pages = document.querySelectorAll(".page");

    function show(pageName) {
      pages.forEach(p => p.classList.toggle("is-active", p.dataset.page === pageName));
      links.forEach(l => l.classList.toggle("is-active", l.dataset.page === pageName));
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
      history.replaceState(null, "", "#" + pageName);
    }
    showPage = show;

    links.forEach(l => l.addEventListener("click", () => show(l.dataset.page)));

    const initial = (location.hash || "#home").replace("#", "");
    const valid = ["home", "itinerary", "food", "gear", "finance"].includes(initial) ? initial : "home";
    show(valid);
  }

  /* ---------------- 倒數計時 ---------------- */
  function initCountdown() {
    const target = new Date(TRIP_DATA.startDate).getTime();
    const el = {
      days: document.getElementById("cd-days"),
      hours: document.getElementById("cd-hours"),
      mins: document.getElementById("cd-mins"),
      secs: document.getElementById("cd-secs"),
      wrap: document.getElementById("countdown")
    };

    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        el.wrap.classList.add("is-arrived");
        el.days.textContent = "0";
        el.hours.textContent = "0";
        el.mins.textContent = "0";
        el.secs.textContent = "0";
        return;
      }
      const s = Math.floor(diff / 1000);
      el.days.textContent = Math.floor(s / 86400);
      el.hours.textContent = String(Math.floor((s % 86400) / 3600)).padStart(2, "0");
      el.mins.textContent = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      el.secs.textContent = String(s % 60).padStart(2, "0");
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------------- 航班卡片 ---------------- */
  function renderFlights() {
    const wrap = document.getElementById("flightCards");
    wrap.innerHTML = TRIP_DATA.flights.map(f => `
      <div class="card flight-card">
        <div style="font-size:0.78rem; font-weight:700; color:#6b6560; margin-bottom:8px;">${f.direction}　${f.date}</div>
        <div class="flight-card__row">
          <div class="flight-card__endpoint">
            <div class="flight-card__code">${f.from.code}</div>
            <div class="flight-card__city">${f.from.name}</div>
            <div class="flight-card__time">${f.depart}</div>
          </div>
          <div class="flight-card__mid">
            <svg><use href="#icon-flight"/></svg>
            <div class="flight-card__plane-no">${f.flightNo || "班機待確認"}</div>
          </div>
          <div class="flight-card__endpoint">
            <div class="flight-card__code">${f.to.code}</div>
            <div class="flight-card__city">${f.to.name}</div>
            <div class="flight-card__time">${f.arrive}</div>
          </div>
        </div>
        ${f.note ? `<div class="flight-card__meta">${f.note}</div>` : ""}
      </div>
    `).join("");
  }

  /* ---------------- 住宿資訊 ---------------- */
  function renderStays() {
    const wrap = document.getElementById("stayList");
    wrap.innerHTML = TRIP_DATA.accommodations.map(a => `
      <div class="stay-item">
        <svg><use href="#icon-hotel"/></svg>
        <div>
          <div class="stay-item__date">${a.dateRange}</div>
          <div class="stay-item__name">${a.name}</div>
          ${a.note ? `<div class="stay-item__note">${a.note}</div>` : ""}
        </div>
      </div>
    `).join("");
  }

  /* ---------------- 待辦清單（localStorage 記憶打勾） ---------------- */
  function renderChecklist() {
    const wrap = document.getElementById("checklist");
    const key = "checklistChecked";
    const saved = JSON.parse(localStorage.getItem(key) || "{}");

    wrap.innerHTML = TRIP_DATA.checklist.map((item, i) => `
      <li class="checklist__item ${saved[i] ? "is-checked" : ""}" data-idx="${i}">
        <span class="checklist__box"><svg><use href="#icon-check"/></svg></span>
        <span class="checklist__text">${item}</span>
      </li>
    `).join("");

    const me = getMyIdentity();
    const titleEl = document.getElementById("checklistTitle");
    if (titleEl) titleEl.textContent = me ? `${me.name} 的行前待辦` : "行前待辦";

    wrap.querySelectorAll(".checklist__item").forEach(li => {
      li.addEventListener("click", () => {
        li.classList.toggle("is-checked");
        const state = JSON.parse(localStorage.getItem(key) || "{}");
        state[li.dataset.idx] = li.classList.contains("is-checked");
        localStorage.setItem(key, JSON.stringify(state));
      });
    });
  }

  /* ---------------- 共用：把單一天的資料轉成時間軸 HTML ---------------- */
  function buildTimelineHtml(day) {
    const meta = TRIP_DATA.transportMeta;

    const itemsHtml = day.items.map(item => {
      if (item.type === "transport") {
        const m = meta[item.transport] || { label: item.transport, color: "coral" };
        return `
          <div class="timeline__transport">
            <span class="transport-tag transport-tag--${item.transport}">
              <svg><use href="#icon-${item.transport}"/></svg>${m.label}
            </span>
            <span>${item.label}</span>
          </div>
        `;
      }
      return `
        <div class="timeline__event ${item.highlight ? "is-highlight" : ""}">
          ${item.time ? `<div class="timeline__time">${item.time}</div>` : ""}
          <div class="timeline__place">${item.place || ""}${item.highlight ? '<span class="tag tag--must">必去</span>' : ""}</div>
          <div class="timeline__activity">${item.activity || ""}</div>
          ${item.stops ? `
            <ol class="timeline__stops">
              ${item.stops.map(s => `<li>${s}</li>`).join("")}
            </ol>
          ` : ""}
          ${item.note ? `<div class="timeline__note">${item.note}</div>` : ""}
        </div>
      `;
    }).join("");

    return `
      <div class="day-panel">
        ${day.scene ? `
          <div class="day-scene">
            <svg class="float-gentle"><use href="#${day.scene}"/></svg>
          </div>
        ` : ""}
        <h3 class="day-title">${day.date} (${day.weekday})　${day.title}</h3>
        <div class="timeline">${itemsHtml}</div>
      </div>
    `;
  }

  /* ---------------- 行程頁：日期 tab + 時間軸 ---------------- */
  function renderItinerary() {
    const tabsWrap = document.getElementById("dayTabs");
    const panelWrap = document.getElementById("dayPanelWrap");
    const key = "selectedDayIndex";

    tabsWrap.innerHTML = TRIP_DATA.days.map((d, i) => `
      <button class="day-tab" data-idx="${i}">
        <div class="day-tab__date">${d.date}</div>
        <div class="day-tab__weekday">(${d.weekday})</div>
      </button>
    `).join("");

    function renderDay(idx) {
      const day = TRIP_DATA.days[idx];
      panelWrap.innerHTML = buildTimelineHtml(day);

      tabsWrap.querySelectorAll(".day-tab").forEach(t => {
        t.classList.toggle("is-active", Number(t.dataset.idx) === idx);
      });
      localStorage.setItem(key, idx);
    }

    tabsWrap.querySelectorAll(".day-tab").forEach(t => {
      t.addEventListener("click", () => {
        renderDay(Number(t.dataset.idx));
        t.scrollIntoView({ behavior: prefersReduced.matches ? "auto" : "smooth", inline: "center", block: "nearest" });
      });
    });

    selectItineraryDay = (idx) => {
      renderDay(idx);
      const tab = tabsWrap.querySelector(`.day-tab[data-idx="${idx}"]`);
      if (tab) tab.scrollIntoView({ behavior: prefersReduced.matches ? "auto" : "smooth", inline: "center", block: "nearest" });
    };

    const todayIdx = findTodayIndex();
    const saved = localStorage.getItem(key);
    renderDay(todayIdx !== -1 ? todayIdx : (saved !== null ? Number(saved) : 0));
  }

  function findTodayIndex() {
    const now = new Date();
    const y = now.getFullYear();
    return TRIP_DATA.days.findIndex(d => {
      const [m, day] = d.date.split("/").map(Number);
      const target = new Date(y, m - 1, day);
      return target.toDateString() === now.toDateString();
    });
  }

  /* ---------------- 首頁狀態：出發前／旅行中／已結束 ---------------- */
  function renderHomeStatus() {
    const upcoming = document.getElementById("homeUpcoming");
    const today = document.getElementById("homeToday");
    const ended = document.getElementById("homeEnded");
    const now = Date.now();
    const start = new Date(TRIP_DATA.startDate).getTime();
    const end = new Date(TRIP_DATA.endDate).getTime();
    const todayIdx = findTodayIndex();

    upcoming.style.display = "none";
    today.style.display = "none";
    ended.style.display = "none";

    if (todayIdx !== -1) {
      // 旅行中：顯示當天行程
      const day = TRIP_DATA.days[todayIdx];
      document.getElementById("todayBanner").innerHTML =
        `<svg><use href="#icon-snow"/></svg> 今天是 ${day.date} (${day.weekday})`;
      document.getElementById("todayPanelWrap").innerHTML = buildTimelineHtml(day);
      today.style.display = "block";
    } else if (now > end) {
      // 旅行已結束
      ended.style.display = "block";
    } else {
      // 出發前
      upcoming.style.display = "block";
    }
  }

  /* ---------------- 美食頁 ---------------- */
  let activeFoodRegion = null;

  function renderFood() {
    const regions = TRIP_DATA.foodOptions.regions;
    const tabsWrap = document.getElementById("foodRegionTabs");
    if (!activeFoodRegion) activeFoodRegion = regions[0].id;

    tabsWrap.innerHTML = regions.map(region => `
      <button class="food-region-tab${region.id === activeFoodRegion ? " is-active" : ""}" data-region="${region.id}">${region.label}</button>
    `).join("");

    tabsWrap.querySelectorAll(".food-region-tab").forEach(btn => {
      btn.addEventListener("click", () => {
        activeFoodRegion = btn.dataset.region;
        renderFood();
      });
    });

    renderFoodContent();
  }

  function renderFoodContent() {
    const wrap = document.getElementById("foodContent");
    const region = TRIP_DATA.foodOptions.regions.find(r => r.id === activeFoodRegion);

    if (!region.groups.length) {
      wrap.innerHTML = `<p class="food-empty-note">還沒有名單，大家一起討論想吃什麼～</p>`;
      return;
    }

    wrap.innerHTML = region.groups.map(group => `
      <div class="food-group">
        <div class="food-group__title">
          <span class="food-group__dot food-group__dot--${group.color}"></span>${group.category}
        </div>
        <div class="food-list">
          ${group.items.map(it => `
            <div class="food-card food-card--${group.color}">
              <div class="food-card__name">${it.name}</div>
              <div class="food-card__desc">${it.desc}</div>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");
  }

  /* ---------------- 裝備頁 ---------------- */
  function renderGear() {
    const wrap = document.getElementById("gearContent");
    const g = TRIP_DATA.gear;

    function groupHtml(group, extraClass) {
      return `
        <div class="gear-group ${extraClass}">
          <div class="section-title" style="font-size:1rem;"><svg><use href="#icon-ski"/></svg><h3 style="margin:0;">${group.title}</h3></div>
          <div class="gear-group__note">${group.note}</div>
          <div class="gear-list">
            ${group.items.map(it => `
              <div class="gear-item">
                <div class="gear-item__main">
                  <div class="gear-item__name">${it.name}</div>
                  ${it.note ? `<div class="gear-item__note">${it.note}</div>` : ""}
                </div>
                ${it.price ? `<div class="gear-item__price">${it.price}</div>` : ""}
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    wrap.innerHTML = groupHtml(g.rental, "gear-group--rental") + groupHtml(g.selfPrepare, "gear-group--self");
  }

  /* ---------------- 帳務頁：標出自己的那一列 ---------------- */
  function highlightMyExpenseRow() {
    const me = getMyIdentity();
    document.querySelectorAll("#expenseTable tbody tr").forEach(tr => {
      tr.classList.toggle("is-me-row", !!me && tr.dataset.name === me.fullName);
    });
  }

  /* ---------------- 帳務頁 ---------------- */
  function renderFinance() {
    const table = document.getElementById("expenseTable");
    const cols = TRIP_DATA.expenseColumns;

    const thead = `
      <thead>
        <tr><th rowspan="2">姓名</th>${
          groupHeader(cols)
        }</tr>
        <tr>${cols.map(c => `<th>${c.label}</th>`).join("")}</tr>
      </thead>
    `;

    function groupHeader(cols) {
      const groups = [];
      cols.forEach(c => {
        if (groups.length && groups[groups.length - 1].name === c.group) {
          groups[groups.length - 1].span++;
        } else {
          groups.push({ name: c.group, span: 1 });
        }
      });
      return groups.map(g => `<th colspan="${g.span}">${g.name}</th>`).join("");
    }

    const tbody = `
      <tbody>
        ${TRIP_DATA.expenses.map(row => `
          <tr data-name="${row.name}">
            <td>${row.name}</td>
            ${cols.map(c => `<td>${row[c.key] || "—"}</td>`).join("")}
          </tr>
        `).join("")}
      </tbody>
    `;

    table.innerHTML = thead + tbody;
    highlightMyExpenseRow();

    document.getElementById("expenseFootnotes").innerHTML =
      TRIP_DATA.expenseFootnotes.map(f => `<li>${f}</li>`).join("");

    document.getElementById("paymentList").innerHTML =
      TRIP_DATA.payments.map(p => `
        <div class="payment-item">
          <div>
            <div class="payment-item__category">${p.category}</div>
            <div class="payment-item__meta">付款人：${p.payer}${p.date ? "　" + p.date : ""}${p.note ? "　" + p.note : ""}</div>
          </div>
          <div class="payment-item__amount ${p.amount ? "" : "is-pending"}">${p.amount || "待補登"}</div>
        </div>
      `).join("");

    const tabs = document.querySelectorAll(".finance-tab");
    tabs.forEach(t => {
      t.addEventListener("click", () => {
        tabs.forEach(x => x.classList.toggle("is-active", x === t));
        document.querySelectorAll(".finance-panel").forEach(p => {
          p.classList.toggle("is-active", p.id === "panel-" + t.dataset.finance);
        });
      });
    });
  }

  /* ---------------- 背景飄雪（減少動態時不產生） ---------------- */
  function initSnowfall() {
    if (prefersReduced.matches) return;
    const wrap = document.getElementById("snowfall");
    const count = window.innerWidth < 500 ? 10 : 18;
    for (let i = 0; i < count; i++) {
      const size = 8 + Math.random() * 10;
      const left = Math.random() * 100;
      const duration = 8 + Math.random() * 10;
      const delay = Math.random() * 10;
      const svg = `
        <svg style="left:${left}%; width:${size}px; height:${size}px; animation-duration:${duration}s; animation-delay:-${delay}s;" viewBox="0 0 24 24">
          <use href="#icon-snow" style="color:#A8D3E6"></use>
        </svg>
      `;
      wrap.insertAdjacentHTML("beforeend", svg);
    }
  }

  /* ---------------- 首頁按鈕 ---------------- */
  function initHomeButtons() {
    document.getElementById("gotoItineraryBtn").addEventListener("click", () => {
      showPage("itinerary");
      const idx = findTodayIndex();
      if (idx !== -1) selectItineraryDay(idx);
    });
    document.getElementById("gotoFinanceBtn").addEventListener("click", () => {
      showPage("finance");
    });
  }

  /* ---------------- 啟動 ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    initMotionToggle();
    initIdentity();
    initNav();
    initCountdown();
    renderFlights();
    renderStays();
    renderChecklist();
    renderItinerary();
    renderFood();
    renderGear();
    renderFinance();
    renderHomeStatus();
    initHomeButtons();
    initSnowfall();

    refreshPersonalization = () => {
      renderChecklist();
      highlightMyExpenseRow();
    };
  });
})();
