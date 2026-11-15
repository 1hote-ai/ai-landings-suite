/**
 * SILK & SOUL — SANCTUARY OF SLOW LIVING
 * Interactive JavaScript Engine & Configuration
 * 
 * Includes:
 * 1. LANDING_CONFIG - Centralized brand data, coordinates, schedule, rituals & masters
 * 2. DOM Data-Binding Engine
 * 3. Live Working Hours Calculator (Moscow Timezone UTC+3)
 * 4. Yandex Maps 2.1 API Integration with Custom Luxury Pin & Fallback
 * 5. Interactive Ritual & Duration & Master Calculator (Dynamic pricing)
 * 6. Online Booking Calendar (14-day interactive carousel + time slots + Russian phone mask)
 * 7. Lead Capture Form Validation & Success Confirmation Modal
 * 8. FAQ Accordion with smooth height transitions
 * 9. Gallery Lightbox Preview
 * 10. Mobile Drawer Menu & Scroll Effects
 */

// =============================================================================
// 1. LANDING_CONFIG: ГЛАВНЫЙ КОНФИГУРАЦИОННЫЙ ОБЪЕКТ
// =============================================================================
const LANDING_CONFIG = {
  // Информация о бренде
  brandName: "SILK & SOUL",
  brandSubtitle: "Санктуарий эстетики, холистического SPA и тишины",
  
  // Контакты
  phone: "+7 (495) 822-45-70",
  phoneRaw: "+74958224570",
  email: "welcome@silk-soul.ru",
  address: "Москва, Романов переулок, 4, стр. 2",
  metro: "м. Библиотека им. Ленина / Арбатская (3 мин)",
  
  // Социальные сети и мессенджеры
  social: {
    telegram: "https://t.me/silksoul_spa",
    whatsapp: "https://wa.me/74958224570?text=Здравствуйте!%20Хочу%20записаться%20в%20SILK%20%26%20SOUL",
    vk: "https://vk.com/silksoul_sanctuary"
  },

  // Гео-координаты для Яндекс.Карт (Романов переулок, Москва)
  coordinates: [55.742389, 37.589112],
  mapZoom: 16,

  // График работы (МСК)
  schedule: {
    weekdays: "10:00 – 22:00",
    weekends: "10:00 – 23:00",
    openHour: 10,
    closeHourWeekdays: 22,
    closeHourWeekends: 23
  },

  // База ритуалов для калькулятора и бронирования
  rituals: {
    "silk-cocoon": {
      id: "silk-cocoon",
      name: "Шёлковый кокон (Silk Cocoon Body)",
      category: "body",
      basePrice: 7500,
      baseDuration: 60,
      description: "Масляный массаж тела шелковыми коконами и теплыми камнями."
    },
    "kobido-jade": {
      id: "kobido-jade",
      name: "Императорский лифтинг Кобидо & Нефрит",
      category: "face",
      basePrice: 8200,
      baseDuration: 60,
      description: "Японский скульптурно-буккальный массаж лица с белым нефритом."
    },
    "eucalyptus-hammam": {
      id: "eucalyptus-hammam",
      name: "Эвкалиптовый хаммам & Чёрное мыло",
      category: "body",
      basePrice: 9500,
      baseDuration: 90,
      description: "Восточное парение, пилинг Кесса и контрастная купель из оникса."
    },
    "rhassoul-clay": {
      id: "rhassoul-clay",
      name: "Терракотовое укутывание глиной Рассул",
      category: "body",
      basePrice: 8900,
      baseDuration: 90,
      description: "Минеральное обертывание атласской вулканической глиной Рассул."
    },
    "couples-symphony": {
      id: "couples-symphony",
      name: "Симфония чувств для двоих (VIP Suite)",
      category: "couples",
      basePrice: 18500,
      baseDuration: 120,
      description: "Романтический ритуал в двухместном сьюте с ванной из оникса."
    },
    "tibetan-peace": {
      id: "tibetan-peace",
      name: "Тибетский покой & Поющие чаши",
      category: "sound",
      basePrice: 9000,
      baseDuration: 90,
      description: "Вибрационная акустико-терапия чашами и остеопатический массаж."
    }
  },

  // Мастера санктуария
  masters: {
    "anna-levina": {
      id: "anna-levina",
      name: "Анна Левина",
      role: "Гранд-мастер японских техник Кобидо",
      exp: "9 лет практики",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    "mikhail-sokolov": {
      id: "mikhail-sokolov",
      name: "Михаил Соколов",
      role: "Остео-массажист & Звукотерапевт",
      exp: "12 лет практики",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
    },
    "elena-vetrova": {
      id: "elena-vetrova",
      name: "Елена Ветрова",
      role: "Эксперт скульптурного лифтинга и аромалогии",
      exp: "8 лет практики",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    "sofia-kim": {
      id: "sofia-kim",
      name: "София Ким",
      role: "Мастер восточных практик & Хаммам-эстетист",
      exp: "10 лет практики",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
    }
  },

  // Дополнительные опции комфорта (Add-ons)
  addons: {
    "hot-stones": {
      id: "hot-stones",
      name: "Теплые базальтовые камни",
      price: 2000,
      duration: 15
    },
    "rose-bath": {
      id: "rose-bath",
      name: "Купель с лепестками роз и молоком",
      price: 3000,
      duration: 30
    },
    "head-massage": {
      id: "head-massage",
      name: "Массаж головы & Шелковая маска",
      price: 1800,
      duration: 15
    },
    "tea-gongfu": {
      id: "tea-gongfu",
      name: "Чайная церемония Гунфу Ча с улуном",
      price: 1200,
      duration: 20
    }
  }
};

// =============================================================================
// 2. DOM DATA-BINDING ENGINE
// =============================================================================
function initDataBinding() {
  // Bind standard text nodes
  document.querySelectorAll("[data-bind]").forEach(elem => {
    const key = elem.getAttribute("data-bind");
    if (LANDING_CONFIG[key]) {
      elem.textContent = LANDING_CONFIG[key];
    }
  });

  // Bind phone display and tel links
  document.querySelectorAll("[data-bind-phone]").forEach(elem => {
    elem.textContent = LANDING_CONFIG.phone;
    if (elem.tagName.toLowerCase() === "a") {
      elem.setAttribute("href", `tel:${LANDING_CONFIG.phoneRaw}`);
    }
  });

  // Bind social links
  document.querySelectorAll("[data-bind-href]").forEach(elem => {
    const path = elem.getAttribute("data-bind-href").split(".");
    if (path[0] === "social" && LANDING_CONFIG.social[path[1]]) {
      elem.setAttribute("href", LANDING_CONFIG.social[path[1]]);
    }
  });

  // Copyright year
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// =============================================================================
// 3. LIVE WORKING HOURS CALCULATOR (MOSCOW TIME)
// =============================================================================
function checkWorkingHours() {
  // Compute current Moscow Time (UTC+3)
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const moscowTime = new Date(utc + (3600000 * 3));
  
  const dayOfWeek = moscowTime.getDay(); // 0 = Sunday, 6 = Saturday
  const currentHour = moscowTime.getHours();
  const currentMin = moscowTime.getMinutes();
  const timeInMinutes = currentHour * 60 + currentMin;

  const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
  const openTimeMin = LANDING_CONFIG.schedule.openHour * 60; // 10:00 -> 600 min
  const closeHour = isWeekend ? LANDING_CONFIG.schedule.closeHourWeekends : LANDING_CONFIG.schedule.closeHourWeekdays;
  const closeTimeMin = closeHour * 60;

  const isOpen = (timeInMinutes >= openTimeMin && timeInMinutes < closeTimeMin);

  let statusText = "";
  if (isOpen) {
    statusText = `Открыто сейчас · до ${closeHour}:00`;
  } else {
    statusText = `Закрыто сейчас · откроется в ${LANDING_CONFIG.schedule.openHour}:00`;
  }

  // Update indicators in DOM
  const topbarStatusText = document.getElementById("live-status-text");
  const drawerStatusText = document.getElementById("drawer-live-status-text");
  const contactsStatusText = document.getElementById("contacts-live-status-text");

  if (topbarStatusText) topbarStatusText.textContent = statusText;
  if (drawerStatusText) drawerStatusText.textContent = statusText;
  if (contactsStatusText) contactsStatusText.textContent = statusText;

  document.querySelectorAll(".live-status-dot").forEach(dot => {
    if (isOpen) {
      dot.classList.remove("is-closed");
    } else {
      dot.classList.add("is-closed");
    }
  });
}

// =============================================================================
// 4. YANDEX MAPS 2.1 INITIALIZATION
// =============================================================================
function initYandexMap() {
  const mapElement = document.getElementById("yandex-map");
  const mapFallback = document.getElementById("map-fallback");
  if (!mapElement) return;

  if (typeof ymaps === "undefined") {
    console.warn("Yandex Maps API is unavailable. Using fallback container.");
    return;
  }

  ymaps.ready(() => {
    try {
      const map = new ymaps.Map("yandex-map", {
        center: LANDING_CONFIG.coordinates,
        zoom: LANDING_CONFIG.mapZoom,
        controls: ["zoomControl", "fullscreenControl"]
      }, {
        suppressMapOpenBlock: true
      });

      // Custom Luxury Pin styling
      const placemark = new ymaps.Placemark(
        LANDING_CONFIG.coordinates,
        {
          hintContent: "SILK & SOUL — Санктуарий эстетики и тишины",
          balloonContentHeader: "<strong style='font-family:serif;font-size:16px;color:#2A2421;'>SILK & SOUL Sanctuary</strong>",
          balloonContentBody: `
            <div style='font-family:sans-serif;font-size:13px;color:#5E524B;line-height:1.5;'>
              <p>Москва, Романов переулок, 4, стр. 2</p>
              <p style='color:#BD7A63;margin-top:4px;'><strong>Режим:</strong> 10:00 — 22:00 (ежедневно)</p>
              <p style='margin-top:6px;'>Подземный паркинг во дворе с услугой Valet-parking.</p>
            </div>
          `,
          balloonContentFooter: `<a href='tel:${LANDING_CONFIG.phoneRaw}' style='color:#BD7A63;font-size:12px;font-weight:bold;'>${LANDING_CONFIG.phone}</a>`
        },
        {
          preset: "islands#terracottaCircleDotIconWithCaption",
          iconColor: "#BD7A63"
        }
      );

      map.geoObjects.add(placemark);
      map.behaviors.disable("scrollZoom");

      // Hide fallback once loaded
      if (mapFallback) {
        mapFallback.style.display = "none";
      }
    } catch (err) {
      console.error("Error creating Yandex Map instance:", err);
    }
  });
}

// =============================================================================
// 5. INTERACTIVE RITUAL & DURATION & MASTER CALCULATOR
// =============================================================================
const CalculatorState = {
  ritualId: "silk-cocoon",
  duration: 60,
  durationMultiplier: 1.0,
  masterId: "anna-levina",
  addons: new Set()
};

function formatRubles(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
}

function updateCalculatorUI() {
  const ritual = LANDING_CONFIG.rituals[CalculatorState.ritualId] || LANDING_CONFIG.rituals["silk-cocoon"];
  const master = LANDING_CONFIG.masters[CalculatorState.masterId] || LANDING_CONFIG.masters["anna-levina"];

  // Base price multiplied by duration multiplier
  const baseCost = Math.round(ritual.basePrice * CalculatorState.durationMultiplier);

  // Sum addons
  let addonsCost = 0;
  let addonsExtraTime = 0;
  const addonNames = [];

  CalculatorState.addons.forEach(addonId => {
    const addon = LANDING_CONFIG.addons[addonId];
    if (addon) {
      addonsCost += addon.price;
      addonsExtraTime += addon.duration;
      addonNames.push(addon.name);
    }
  });

  const totalPrice = baseCost + addonsCost;
  const totalDuration = CalculatorState.duration + addonsExtraTime;

  // DOM Elements
  const summaryTitle = document.getElementById("summary-ritual-title");
  const summaryTime = document.getElementById("summary-total-time");
  const summaryMaster = document.getElementById("summary-master-name");
  const summaryAddons = document.getElementById("summary-addons-list");
  const summaryPrice = document.getElementById("summary-total-price");

  if (summaryTitle) summaryTitle.textContent = ritual.name.split("(")[0].trim();
  if (summaryTime) summaryTime.textContent = `${totalDuration} минут`;
  if (summaryMaster) summaryMaster.textContent = master.name;
  if (summaryAddons) {
    summaryAddons.textContent = addonNames.length > 0 ? addonNames.join(", ") : "Не выбраны";
  }
  if (summaryPrice) summaryPrice.textContent = formatRubles(totalPrice);

  // Also synchronize to the modal strip preview
  const modalRitual = document.getElementById("modal-selected-ritual");
  const modalDuration = document.getElementById("modal-selected-duration");
  const modalMaster = document.getElementById("modal-selected-master");
  const modalPrice = document.getElementById("modal-selected-price");

  if (modalRitual) modalRitual.textContent = ritual.name.split("(")[0].trim();
  if (modalDuration) modalDuration.textContent = `${totalDuration} мин`;
  if (modalMaster) modalMaster.textContent = master.name;
  if (modalPrice) modalPrice.textContent = formatRubles(totalPrice);
}

function initCalculator() {
  const ritualSelect = document.getElementById("calc-ritual-select");
  const durationPills = document.getElementById("duration-pills");
  const mastersSelector = document.getElementById("masters-selector");
  const addonsGrid = document.getElementById("addons-grid");
  const proceedBtn = document.getElementById("calc-proceed-btn");

  if (!ritualSelect) return;

  // 1. Ritual Select Change
  ritualSelect.addEventListener("change", (e) => {
    CalculatorState.ritualId = e.target.value;
    updateCalculatorUI();
  });

  // 2. Duration Pills
  if (durationPills) {
    durationPills.querySelectorAll(".duration-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        durationPills.querySelectorAll(".duration-btn").forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        CalculatorState.duration = parseInt(btn.getAttribute("data-duration"), 10);
        CalculatorState.durationMultiplier = parseFloat(btn.getAttribute("data-mult"));
        updateCalculatorUI();
      });
    });
  }

  // 3. Masters Radio Change
  if (mastersSelector) {
    mastersSelector.querySelectorAll("input[name='calc-master']").forEach(radio => {
      radio.addEventListener("change", (e) => {
        if (e.target.checked) {
          CalculatorState.masterId = e.target.value;
          updateCalculatorUI();
        }
      });
    });
  }

  // 4. Add-ons Checkboxes
  if (addonsGrid) {
    addonsGrid.querySelectorAll("input[name='calc-addon']").forEach(chk => {
      chk.addEventListener("change", (e) => {
        if (e.target.checked) {
          CalculatorState.addons.add(e.target.value);
        } else {
          CalculatorState.addons.delete(e.target.value);
        }
        updateCalculatorUI();
      });
    });
  }

  // 5. Proceed button to Booking Modal
  if (proceedBtn) {
    proceedBtn.addEventListener("click", () => {
      openModal("booking-modal");
    });
  }

  // Initialize display
  updateCalculatorUI();
}

// =============================================================================
// 6. ONLINE BOOKING CALENDAR (14 DAYS + TIME SLOTS)
// =============================================================================
const BookingState = {
  date: "",
  time: "11:30"
};

function generateCalendarDays() {
  const container = document.getElementById("calendar-days");
  const dateBadge = document.getElementById("selected-date-badge");
  const hiddenDateInput = document.getElementById("booking-date-input");
  if (!container) return;

  container.innerHTML = "";

  const weekdaysRu = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const monthsRu = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const dayName = (i === 0) ? "Сегодня" : weekdaysRu[d.getDay()];
    const dayNum = d.getDate();
    const monthName = monthsRu[d.getMonth()];
    const isoDate = d.toISOString().split("T")[0];

    const dayBtn = document.createElement("button");
    dayBtn.type = "button";
    dayBtn.className = `cal-day-btn ${i === 0 ? "is-active" : ""}`;
    dayBtn.setAttribute("data-date", isoDate);
    dayBtn.setAttribute("data-label", `${dayName}, ${dayNum} ${monthName}`);

    dayBtn.innerHTML = `
      <span class="cal-day-btn__weekday">${dayName}</span>
      <span class="cal-day-btn__num">${dayNum}</span>
      <span class="cal-day-btn__month">${monthName}</span>
    `;

    dayBtn.addEventListener("click", () => {
      container.querySelectorAll(".cal-day-btn").forEach(b => b.classList.remove("is-active"));
      dayBtn.classList.add("is-active");
      BookingState.date = isoDate;
      if (dateBadge) dateBadge.textContent = `${dayName}, ${dayNum} ${monthName}`;
      if (hiddenDateInput) hiddenDateInput.value = isoDate;
    });

    container.appendChild(dayBtn);

    // Initial default
    if (i === 0) {
      BookingState.date = isoDate;
      if (dateBadge) dateBadge.textContent = `${dayName}, ${dayNum} ${monthName}`;
      if (hiddenDateInput) hiddenDateInput.value = isoDate;
    }
  }
}

function initTimeSlots() {
  const container = document.getElementById("time-slots-grid");
  const timeBadge = document.getElementById("selected-time-badge");
  const hiddenTimeInput = document.getElementById("booking-time-input");
  if (!container) return;

  container.querySelectorAll(".time-slot").forEach(slot => {
    slot.addEventListener("click", () => {
      container.querySelectorAll(".time-slot").forEach(s => s.classList.remove("is-active"));
      slot.classList.add("is-active");
      const chosenTime = slot.getAttribute("data-time");
      BookingState.time = chosenTime;
      if (timeBadge) timeBadge.textContent = chosenTime;
      if (hiddenTimeInput) hiddenTimeInput.value = chosenTime;
    });
  });
}

// =============================================================================
// 7. PHONE MASK (+7 (___) ___-__-__) & FORM VALIDATION
// =============================================================================
function initPhoneMask(input) {
  if (!input) return;

  input.addEventListener("input", (e) => {
    let value = input.value.replace(/\D/g, "");
    if (value.startsWith("8")) value = "7" + value.slice(1);
    if (!value.startsWith("7")) value = "7" + value;

    let formatted = "+7";
    if (value.length > 1) {
      formatted += " (" + value.substring(1, 4);
    }
    if (value.length >= 5) {
      formatted += ") " + value.substring(4, 7);
    }
    if (value.length >= 8) {
      formatted += "-" + value.substring(7, 9);
    }
    if (value.length >= 10) {
      formatted += "-" + value.substring(9, 11);
    }

    input.value = formatted;
  });

  input.addEventListener("focus", () => {
    if (!input.value) {
      input.value = "+7 (";
    }
  });

  input.addEventListener("blur", () => {
    if (input.value === "+7 (" || input.value === "+7") {
      input.value = "";
    }
  });
}

function initBookingForm() {
  const form = document.getElementById("booking-form");
  const phoneInput = document.getElementById("guest-phone");
  const nameInput = document.getElementById("guest-name");
  const nameError = document.getElementById("name-error");
  const phoneError = document.getElementById("phone-error");
  const submitBtn = document.getElementById("submit-booking-btn");

  if (!form) return;

  initPhoneMask(phoneInput);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    const nameVal = nameInput ? nameInput.value.trim() : "";
    if (nameVal.length < 2) {
      if (nameError) nameError.classList.add("is-visible");
      if (nameInput) nameInput.classList.add("has-error");
      isValid = false;
    } else {
      if (nameError) nameError.classList.remove("is-visible");
      if (nameInput) nameInput.classList.remove("has-error");
    }

    // Validate Phone (must have 11 digits total: 7 + 10 digits)
    const phoneDigits = phoneInput ? phoneInput.value.replace(/\D/g, "") : "";
    if (phoneDigits.length < 11) {
      if (phoneError) phoneError.classList.add("is-visible");
      if (phoneInput) phoneInput.classList.add("has-error");
      isValid = false;
    } else {
      if (phoneError) phoneError.classList.remove("is-visible");
      if (phoneInput) phoneInput.classList.remove("has-error");
    }

    if (!isValid) return;

    // Submission with button loader animation
    if (submitBtn) submitBtn.classList.add("is-loading");

    setTimeout(() => {
      if (submitBtn) submitBtn.classList.remove("is-loading");

      // Generate booking reference
      const bookingRef = "SS-" + Math.floor(100000 + Math.random() * 900000);
      const ritual = LANDING_CONFIG.rituals[CalculatorState.ritualId];
      const master = LANDING_CONFIG.masters[CalculatorState.masterId];
      const dateBadge = document.getElementById("selected-date-badge");
      const dateText = dateBadge ? dateBadge.textContent : BookingState.date;

      // Populate success receipt
      const receiptCard = document.getElementById("success-receipt");
      if (receiptCard) {
        receiptCard.innerHTML = `
          <div class="receipt-row">
            <span class="receipt-row__label">Код визита:</span>
            <span class="receipt-row__val">${bookingRef}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-row__label">Гость:</span>
            <span class="receipt-row__val">${escapeHtml(nameVal)}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-row__label">Программа:</span>
            <span class="receipt-row__val">${ritual.name.split("(")[0].trim()}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-row__label">Мастер:</span>
            <span class="receipt-row__val">${master.name}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-row__label">Дата и время:</span>
            <span class="receipt-row__val">${dateText} в ${BookingState.time}</span>
          </div>
          <div class="receipt-row receipt-row--price">
            <span class="receipt-row__label">К оплате в салоне:</span>
            <span class="receipt-row__val">${document.getElementById("modal-selected-price").textContent}</span>
          </div>
        `;
      }

      // Close booking modal and open success modal
      closeModal("booking-modal");
      openModal("success-modal");

      // Reset form
      form.reset();
    }, 700);
  });
}

function escapeHtml(string) {
  const div = document.createElement("div");
  div.textContent = string;
  return div.innerHTML;
}

// =============================================================================
// 8. FAQ ACCORDION
// =============================================================================
function initFaqAccordion() {
  const accordion = document.getElementById("faq-accordion");
  if (!accordion) return;

  const items = accordion.querySelectorAll(".faq-item");

  items.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // Close all other items
      items.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("is-open");
          otherItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          otherItem.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove("is-open");
        question.setAttribute("aria-expanded", "false");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("is-open");
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

// =============================================================================
// 9. RITUALS FILTER TABS & DIRECT SELECT BUTTONS
// =============================================================================
function initRitualsFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const ritualCards = document.querySelectorAll(".ritual-card");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      filterButtons.forEach(b => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");

      ritualCards.forEach(card => {
        const cat = card.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });

  // Direct "Выбрать" buttons on cards
  document.querySelectorAll(".ritual-book-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".ritual-card");
      const ritualId = card ? card.getAttribute("data-id") : null;
      if (ritualId && LANDING_CONFIG.rituals[ritualId]) {
        // Set in calculator
        CalculatorState.ritualId = ritualId;
        const select = document.getElementById("calc-ritual-select");
        if (select) select.value = ritualId;
        updateCalculatorUI();
      }
      openModal("booking-modal");
    });
  });

  // Badge card in hero
  const heroBadgeBtn = document.querySelector("[data-preselect='silk-cocoon']");
  if (heroBadgeBtn) {
    heroBadgeBtn.addEventListener("click", () => {
      CalculatorState.ritualId = "silk-cocoon";
      const select = document.getElementById("calc-ritual-select");
      if (select) select.value = "silk-cocoon";
      updateCalculatorUI();
    });
  }

  // Master card select buttons
  document.querySelectorAll(".master-select-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const masterId = btn.getAttribute("data-master-id");
      if (masterId && LANDING_CONFIG.masters[masterId]) {
        CalculatorState.masterId = masterId;
        const radio = document.querySelector(`input[name='calc-master'][value='${masterId}']`);
        if (radio) radio.checked = true;
        updateCalculatorUI();
        openModal("booking-modal");
      }
    });
  });
}

// =============================================================================
// 10. MODALS CONTROLLER & LIGHTBOX
// =============================================================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function initModals() {
  // Triggers
  document.querySelectorAll("[data-open-modal]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute("data-open-modal");
      openModal(modalId);
    });
  });

  // Closers
  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      if (modal) closeModal(modal.id);
    });
  });

  // Close on Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.is-open").forEach(modal => {
        closeModal(modal.id);
      });
      closeLightbox();
      closeDrawer();
    }
  });

  // Policy Modal Link
  const privacyLink = document.getElementById("privacy-link");
  if (privacyLink) {
    privacyLink.addEventListener("click", (e) => {
      e.preventDefault();
      openModal("policy-modal");
    });
  }
}

// Gallery Lightbox
function initLightbox() {
  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxOverlay = document.getElementById("lightbox-overlay");

  if (!lightbox) return;

  document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
      const img = item.querySelector(".gallery-img");
      const caption = item.getAttribute("data-caption");
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = caption || img.alt;
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener("click", closeLightbox);
}

function closeLightbox() {
  const lightbox = document.getElementById("gallery-lightbox");
  if (lightbox && lightbox.classList.contains("is-open")) {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}

// =============================================================================
// 11. MOBILE DRAWER & HEADER SCROLL
// =============================================================================
function initNavigation() {
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menu-toggle");
  const drawer = document.getElementById("mobile-drawer");
  const drawerClose = document.getElementById("drawer-close");
  const drawerOverlay = document.getElementById("drawer-overlay");

  // Scroll Header Shadow
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  });

  // Drawer open / close
  function openDrawer() {
    if (drawer) {
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
  }

  function closeDrawer() {
    if (drawer) {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  }

  if (menuToggle) menuToggle.addEventListener("click", openDrawer);
  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);

  // Close drawer on link click
  document.querySelectorAll(".drawer-link").forEach(link => {
    link.addEventListener("click", () => {
      closeDrawer();
    });
  });
}

function closeDrawer() {
  const drawer = document.getElementById("mobile-drawer");
  const menuToggle = document.getElementById("menu-toggle");
  if (drawer && drawer.classList.contains("is-open")) {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
}

// =============================================================================
// INITIALIZATION ON DOMContentLoaded
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initDataBinding();
  checkWorkingHours();
  initNavigation();
  initRitualsFilter();
  initCalculator();
  generateCalendarDays();
  initTimeSlots();
  initBookingForm();
  initFaqAccordion();
  initModals();
  initLightbox();
  initYandexMap();

  // Periodically refresh working hours status every 60 seconds
  setInterval(checkWorkingHours, 60000);
});
