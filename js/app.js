/* ============================================================
   北海道賞雪 2027 — 互動邏輯
   ============================================================ */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

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

    links.forEach(l => l.addEventListener("click", () => show(l.dataset.page)));

    const initial = (location.hash || "#home").replace("#", "");
    const valid = ["home", "itinerary", "gear", "finance"].includes(initial) ? initial : "home";
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

    wrap.querySelectorAll(".checklist__item").forEach(li => {
      li.addEventListener("click", () => {
        li.classList.toggle("is-checked");
        const state = JSON.parse(localStorage.getItem(key) || "{}");
        state[li.dataset.idx] = li.classList.contains("is-checked");
        localStorage.setItem(key, JSON.stringify(state));
      });
    });
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
            ${item.note ? `<div class="timeline__note">${item.note}</div>` : ""}
          </div>
        `;
      }).join("");

      panelWrap.innerHTML = `
        <div class="day-panel">
          <h3 class="day-title">${day.date} (${day.weekday})　${day.title}</h3>
          <div class="timeline">${itemsHtml}</div>
        </div>
      `;

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
          <tr>
            <td>${row.name}</td>
            ${cols.map(c => `<td>${row[c.key] || "—"}</td>`).join("")}
          </tr>
        `).join("")}
      </tbody>
    `;

    table.innerHTML = thead + tbody;

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

  /* ---------------- 啟動 ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    initMotionToggle();
    initNav();
    initCountdown();
    renderFlights();
    renderStays();
    renderChecklist();
    renderItinerary();
    renderGear();
    renderFinance();
    initSnowfall();
  });
})();
