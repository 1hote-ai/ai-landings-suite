/**
 * ==============================================================================
 * ROBO-START АКАДЕМИЯ — PRODUCTION JAVASCRIPT
 * Modern Kids Educational & Robotics Center Landing Application
 * ==============================================================================
 */

/**
 * ------------------------------------------------------------------------------
 * 1. LANDING_CONFIG — Centralized Academy Configuration
 * Easily edit phone, email, address, schedule, coordinates and social links.
 * ------------------------------------------------------------------------------
 */
const LANDING_CONFIG = {
  brand: {
    name: "ROBO-START Академия",
    shortName: "ROBO-START",
    tagline: "Академия робототехники и IT для детей 5–16 лет",
    city: "Москва"
  },
  contacts: {
    phone: "+7 (495) 789-42-15",
    phoneRaw: "+74957894215",
    whatsapp: "https://wa.me/74957894215",
    telegram: "https://t.me/robostart_academy",
    vk: "https://vk.com/robostart_academy",
    youtube: "https://youtube.com/@robostart_academy",
    email: "hello@robostart-academy.ru",
    address: "г. Москва, ул. Дербеневская, д. 1, стр. 6",
    metro: "м. Павелецкая / Пролетарская (7 мин)",
    coordinates: [55.733512, 37.662194],
    mapZoom: 16,
    yandexMapsUrl: "https://yandex.ru/maps/?pt=37.662194,55.733512&z=16&l=map"
  },
  schedule: {
    weekdays: "Пн-Пт: 10:00 – 20:00",
    weekends: "Сб-Вс: 09:30 – 19:30",
    // Detailed working hours by day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    days: {
      0: { open: "09:30", close: "19:30" }, // Sun
      1: { open: "10:00", close: "20:00" }, // Mon
      2: { open: "10:00", close: "20:00" }, // Tue
      3: { open: "10:00", close: "20:00" }, // Wed
      4: { open: "10:00", close: "20:00" }, // Thu
      5: { open: "10:00", close: "20:00" }, // Fri
      6: { open: "09:30", close: "19:30" }  // Sat
    }
  },
  pricing: {
    monthlyDiscountText: "Ежемесячно",
    seasonDiscountText: "3 месяца (-15%)"
  }
};

/**
 * ------------------------------------------------------------------------------
 * 2. DOM Ready & Module Orchestration
 * ------------------------------------------------------------------------------
 */
document.addEventListener("DOMContentLoaded", () => {
  initDOMConfigBinding();
  initLiveWorkingStatus();
  initYandexMap();
  initCourseRecommender();
  initCourseCatalogFilter();
  initPricingToggle();
  initPhoneMask();
  initLeadModal();
  initFaqAccordion();
  initMobileDrawer();
  initGalleryLightbox();
  initHeaderScroll();
});

/**
 * ------------------------------------------------------------------------------
 * 3. Config Binding to DOM
 * Binds data from LANDING_CONFIG to corresponding DOM elements
 * ------------------------------------------------------------------------------
 */
function initDOMConfigBinding() {
  // Bind plain text elements with data-config="object.path"
  document.querySelectorAll("[data-config]").forEach((el) => {
    const path = el.getAttribute("data-config");
    const val = getNestedValue(LANDING_CONFIG, path);
    if (val !== undefined && val !== null) {
      el.textContent = val;
    }
  });

  // Bind phone links
  document.querySelectorAll("[data-config-phone]").forEach((el) => {
    el.setAttribute("href", `tel:${LANDING_CONFIG.contacts.phoneRaw}`);
  });

  // Bind messengers
  document.querySelectorAll("[data-config-tg]").forEach((el) => {
    el.setAttribute("href", LANDING_CONFIG.contacts.telegram);
  });
  document.querySelectorAll("[data-config-wa]").forEach((el) => {
    el.setAttribute("href", LANDING_CONFIG.contacts.whatsapp);
  });
  document.querySelectorAll("[data-config-vk]").forEach((el) => {
    el.setAttribute("href", LANDING_CONFIG.contacts.vk);
  });
}

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

/**
 * ------------------------------------------------------------------------------
 * 4. Live Working Hours Status ("Открыто сейчас")
 * Accurately determines if the center is currently open or when it will open
 * ------------------------------------------------------------------------------
 */
function initLiveWorkingStatus() {
  const statusEl = document.getElementById("live-working-status");
  if (!statusEl) return;

  function updateStatus() {
    const now = new Date();
    const day = now.getDay();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const todaySchedule = LANDING_CONFIG.schedule.days[day];
    if (!todaySchedule) return;

    const [openH, openM] = todaySchedule.open.split(":").map(Number);
    const [closeH, closeM] = todaySchedule.close.split(":").map(Number);

    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;

    const parentIndicator = statusEl.closest(".status-indicator");

    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      // Center is open
      statusEl.textContent = `Открыто сейчас (до ${todaySchedule.close})`;
      if (parentIndicator) {
        parentIndicator.classList.remove("status-indicator--closed");
      }
    } else {
      // Center is closed. Check tomorrow's schedule
      const nextDay = (day + 1) % 7;
      const nextSchedule = LANDING_CONFIG.schedule.days[nextDay];
      statusEl.textContent = `Сейчас закрыто • Откроемся в ${nextSchedule.open}`;
      if (parentIndicator) {
        parentIndicator.classList.add("status-indicator--closed");
      }
    }
  }

  updateStatus();
  // Refresh status every 60 seconds
  setInterval(updateStatus, 60000);
}

/**
 * ------------------------------------------------------------------------------
 * 5. Yandex Maps 2.1 Initialization with Fallback
 * ------------------------------------------------------------------------------
 */
function initYandexMap() {
  const mapContainer = document.getElementById("yandex-map");
  const fallbackEl = document.getElementById("map-fallback");
  if (!mapContainer) return;

  // Check if ymaps API script was loaded
  if (typeof ymaps === "undefined") {
    if (fallbackEl) fallbackEl.style.display = "flex";
    return;
  }

  ymaps.ready(() => {
    try {
      const coords = LANDING_CONFIG.contacts.coordinates;
      const map = new ymaps.Map("yandex-map", {
        center: coords,
        zoom: LANDING_CONFIG.contacts.mapZoom,
        controls: ["zoomControl", "fullscreenControl"]
      });

      // Custom Placemark
      const placemark = new ymaps.Placemark(
        coords,
        {
          hintContent: "<strong>ROBO-START Академия</strong>",
          balloonContentHeader: `<div style="font-size:15px;font-weight:bold;color:#2563EB;">ROBO-START Академия</div>`,
          balloonContentBody: `
            <div style="font-size:13px;line-height:1.5;margin-top:6px;">
              <p><strong>Адрес:</strong> ${LANDING_CONFIG.contacts.address}</p>
              <p><strong>Метро:</strong> ${LANDING_CONFIG.contacts.metro}</p>
              <p><strong>Режим:</strong> ${LANDING_CONFIG.schedule.weekdays}</p>
              <p><strong>Телефон:</strong> <a href="tel:${LANDING_CONFIG.contacts.phoneRaw}">${LANDING_CONFIG.contacts.phone}</a></p>
            </div>
          `,
          balloonContentFooter: `
            <a href="${LANDING_CONFIG.contacts.yandexMapsUrl}" target="_blank" style="color:#2563EB;font-weight:bold;text-decoration:underline;">
              Открыть маршрут в Яндекс.Картах ↗
            </a>
          `
        },
        {
          preset: "islands#blueDotIconWithCaption",
          iconColor: "#2563EB"
        }
      );

      map.geoObjects.add(placemark);
      map.behaviors.disable("scrollZoom");

      // Hide fallback once map successfully rendered
      if (fallbackEl) fallbackEl.style.display = "none";
    } catch (err) {
      console.warn("Yandex Maps init failed, showing fallback:", err);
      if (fallbackEl) fallbackEl.style.display = "flex";
    }
  });
}

/**
 * ------------------------------------------------------------------------------
 * 6. Interactive Age-Group Course Recommender (Quiz)
 * ------------------------------------------------------------------------------
 */
function initCourseRecommender() {
  const quizContainer = document.getElementById("quiz-container");
  if (!quizContainer) return;

  const quizState = {
    age: "8-11",
    interest: "lego",
    goal: "hobby"
  };

  const recTitle = document.getElementById("quiz-rec-title");
  const recDesc = document.getElementById("quiz-rec-desc");
  const recFeatures = document.getElementById("quiz-rec-features");
  const recBtn = document.getElementById("quiz-rec-btn");

  const RECOMMENDATIONS = {
    // 5-7 age brackets
    "5-7": {
      title: "Юный Архитектор & LEGO WeDo 2.0",
      desc: "Идеально подходит для дошкольников: развитие мелкой моторики, пространственного мышления и знакомство с первыми алгоритмами без сложной теории.",
      features: [
        "✓ Возраст: 5–7 лет",
        "✓ Оборудование: LEGO Education WeDo 2.0",
        "✓ Формат: 1 раз в неделю по 60 мин"
      ],
      courseVal: "wedo",
      ageVal: "5-7"
    },
    // 8-11 gaming
    "8-11-gaming": {
      title: "Создание 2D/3D игр и анимации на Scratch",
      desc: "Направим любовь к компьютерным играм в созидательное русло. Ребёнок придумает персонажей, запрограммирует физику уровней и опубликует свои игры.",
      features: [
        "✓ Возраст: 8–11 лет",
        "✓ Платформа: MIT Scratch 3.0",
        "✓ Формат: 1 раз в неделю по 90 мин"
      ],
      courseVal: "scratch",
      ageVal: "8-11"
    },
    // 8-11 lego / default
    "8-11": {
      title: "Инженерная лига & LEGO Spike Prime",
      desc: "Наш главный хит для школьников: ребёнок собирает шагоходов, роботов-сортировщиков и сумоистов, осваивает оптические датчики, моторы и блочный код.",
      features: [
        "✓ Возраст: 8–11 лет",
        "✓ Оборудование: LEGO Spike Prime",
        "✓ Формат: 1-2 раза в неделю по 90 мин"
      ],
      courseVal: "spike",
      ageVal: "8-11"
    },
    // 12-16 coding / AI
    "12-16-coding": {
      title: "Python: Боты, Алгоритмы и основы ИИ",
      desc: "Серьёзный старт в программировании на языке мирового стандарта: пишем чистый синтаксис Python, создаём Telegram-ботов с базами данных и изучаем основы нейросетей.",
      features: [
        "✓ Возраст: 12–16 лет",
        "✓ Стек: Python 3, Telegram API, SQLite",
        "✓ Формат: 1 раз в неделю по 120 мин"
      ],
      courseVal: "python",
      ageVal: "12-16"
    },
    // 12-16 electronics
    "12-16-circuits": {
      title: "Схемотехника и роботы на Arduino & C++",
      desc: "Настоящая инженерия: макетные платы, резисторы, пайка, микроконтроллеры Arduino и программирование прошивок на C++.",
      features: [
        "✓ Возраст: 12–16 лет",
        "✓ Платформа: Arduino IDE, C++",
        "✓ Формат: 1 раз в неделю по 120 мин"
      ],
      courseVal: "arduino",
      ageVal: "12-16"
    },
    // 12-16 default
    "12-16": {
      title: "3D-моделирование и прототипирование деталей",
      desc: "Проектирование реальных деталей и корпусов роботов в Autodesk Fusion 360 и Blender с последующей печатью на 3D-принтерах.",
      features: [
        "✓ Возраст: 10–16 лет",
        "✓ Софт: Fusion 360, Blender, Anycubic 3D",
        "✓ Формат: 1 раз в неделю по 90 мин"
      ],
      courseVal: "3d",
      ageVal: "12-16"
    }
  };

  function updateRecommendation() {
    let rec;
    if (quizState.age === "5-7") {
      rec = RECOMMENDATIONS["5-7"];
    } else if (quizState.age === "8-11") {
      rec = quizState.interest === "gaming" ? RECOMMENDATIONS["8-11-gaming"] : RECOMMENDATIONS["8-11"];
    } else {
      if (quizState.interest === "circuits") {
        rec = RECOMMENDATIONS["12-16-circuits"];
      } else if (quizState.interest === "coding" || quizState.goal === "career") {
        rec = RECOMMENDATIONS["12-16-coding"];
      } else {
        rec = RECOMMENDATIONS["12-16"];
      }
    }

    if (recTitle) recTitle.textContent = rec.title;
    if (recDesc) recDesc.textContent = rec.desc;
    if (recFeatures) {
      recFeatures.innerHTML = rec.features
        .map((f) => `<span class="rec-feature-item">${f}</span>`)
        .join("");
    }

    if (recBtn) {
      recBtn.setAttribute("data-target-course", rec.courseVal);
      recBtn.setAttribute("data-target-age", rec.ageVal);
      recBtn.setAttribute("data-course-source", `Тест-рекомендация: ${rec.title}`);
    }
  }

  // Handle option button clicks
  quizContainer.querySelectorAll(".quiz-opt-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const field = btn.getAttribute("data-field");
      const val = btn.getAttribute("data-value");

      const parentStep = btn.closest(".quiz-step");
      if (parentStep) {
        parentStep.querySelectorAll(`.quiz-opt-btn[data-field="${field}"]`).forEach((b) => {
          b.classList.remove("active");
        });
      }

      btn.classList.add("active");
      quizState[field] = val;
      updateRecommendation();
    });
  });

  // Initial calculation
  updateRecommendation();
}

/**
 * ------------------------------------------------------------------------------
 * 7. Courses Catalog Filter (All / 5-7 / 8-11 / 12-16)
 * ------------------------------------------------------------------------------
 */
function initCourseCatalogFilter() {
  const filterTabs = document.querySelectorAll(".filter-tab");
  const courseCards = document.querySelectorAll(".course-card");
  if (!filterTabs.length || !courseCards.length) return;

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const filter = tab.getAttribute("data-filter");

      filterTabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      courseCards.forEach((card) => {
        const cardAge = card.getAttribute("data-age");
        if (filter === "all" || cardAge === filter) {
          card.style.display = "flex";
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/**
 * ------------------------------------------------------------------------------
 * 8. Pricing Switcher (Monthly vs Season -15%)
 * ------------------------------------------------------------------------------
 */
function initPricingToggle() {
  const pricingSwitch = document.getElementById("pricing-switch");
  const monthlyLabel = document.getElementById("billing-monthly-label");
  const seasonLabel = document.getElementById("billing-season-label");
  const priceElements = document.querySelectorAll("[data-price-month]");
  const periodElements = document.querySelectorAll("[data-period-month]");

  if (!pricingSwitch) return;

  let isSeason = false;

  pricingSwitch.addEventListener("click", () => {
    isSeason = !isSeason;
    pricingSwitch.classList.toggle("active", isSeason);
    pricingSwitch.setAttribute("aria-checked", isSeason ? "true" : "false");

    if (monthlyLabel && seasonLabel) {
      monthlyLabel.classList.toggle("active", !isSeason);
      seasonLabel.classList.toggle("active", isSeason);
    }

    priceElements.forEach((el) => {
      el.textContent = isSeason ? el.getAttribute("data-price-season") : el.getAttribute("data-price-month");
    });

    periodElements.forEach((el) => {
      el.textContent = isSeason ? el.getAttribute("data-period-season") : el.getAttribute("data-period-month");
    });
  });
}

/**
 * ------------------------------------------------------------------------------
 * 9. Phone Input Mask (+7 (___) ___-__-__)
 * ------------------------------------------------------------------------------
 */
function initPhoneMask() {
  const phoneInputs = document.querySelectorAll('input[type="tel"], .form-control--phone');

  phoneInputs.forEach((input) => {
    input.addEventListener("input", onPhoneInput);
    input.addEventListener("keydown", onPhoneKeyDown);
    input.addEventListener("paste", onPhonePaste);
  });

  function getInputNumbersValue(input) {
    return input.value.replace(/\D/g, "");
  }

  function onPhoneInput(e) {
    const input = e.target;
    let inputNumbersValue = getInputNumbersValue(input);
    const selectionStart = input.selectionStart;
    let formattedInputValue = "";

    if (!inputNumbersValue) {
      input.value = "";
      return;
    }

    if (input.value.length !== selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] === "9") {
        inputNumbersValue = "7" + inputNumbersValue;
      }
      const firstSymbols = "+7";
      formattedInputValue = firstSymbols + " ";

      if (inputNumbersValue.length > 1) {
        formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
    }

    input.value = formattedInputValue;
  }

  function onPhoneKeyDown(e) {
    const input = e.target;
    if (e.keyCode === 8 && getInputNumbersValue(input).length === 1) {
      input.value = "";
    }
  }

  function onPhonePaste(e) {
    const input = e.target;
    const pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      const pastedText = pasted.getData("Text");
      if (/\D/g.test(pastedText)) {
        input.value = getInputNumbersValue(input);
      }
    }
  }
}

/**
 * ------------------------------------------------------------------------------
 * 10. Working Lead Capture Modal & Form Validation
 * ------------------------------------------------------------------------------
 */
function initLeadModal() {
  const modal = document.getElementById("trial-modal");
  const form = document.getElementById("lead-form");
  const successState = document.getElementById("lead-success");
  const sourceInput = document.getElementById("form-source");
  const courseSelect = document.getElementById("course-select");
  const ageSelect = document.getElementById("child-age-select");

  if (!modal || !form) return;

  // Open modal handlers
  document.querySelectorAll("[data-modal-open='trial-modal']").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const source = trigger.getAttribute("data-course-source") || "Кнопка на странице";
      const targetCourse = trigger.getAttribute("data-target-course");
      const targetAge = trigger.getAttribute("data-target-age");

      if (sourceInput) sourceInput.value = source;
      if (targetCourse && courseSelect) courseSelect.value = targetCourse;
      if (targetAge && ageSelect) ageSelect.value = targetAge;

      openModal(modal);
    });
  });

  // Close modal triggers
  modal.querySelectorAll("[data-modal-close]").forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      closeModal(modal);
    });
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal(modal);
    }
  });

  // Form submission with validation
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Parent Name
    const nameInput = document.getElementById("parent-name");
    const nameError = document.getElementById("parent-name-error");
    if (!nameInput || nameInput.value.trim().length < 2) {
      showError(nameInput, nameError);
      isValid = false;
    } else {
      clearError(nameInput, nameError);
    }

    // Validate Phone
    const phoneInput = document.getElementById("phone-input");
    const phoneError = document.getElementById("phone-error");
    const phoneDigits = phoneInput.value.replace(/\D/g, "");
    if (!phoneInput || phoneDigits.length < 11) {
      showError(phoneInput, phoneError);
      isValid = false;
    } else {
      clearError(phoneInput, phoneError);
    }

    // Validate Age
    const ageError = document.getElementById("age-error");
    if (!ageSelect || !ageSelect.value) {
      showError(ageSelect, ageError);
      isValid = false;
    } else {
      clearError(ageSelect, ageError);
    }

    // Validate Privacy Consent
    const consentInput = document.getElementById("privacy-consent");
    const consentError = document.getElementById("privacy-error");
    if (!consentInput || !consentInput.checked) {
      if (consentError) consentError.classList.add("active");
      isValid = false;
    } else {
      if (consentError) consentError.classList.remove("active");
    }

    if (!isValid) return;

    // Successful Submission Processing
    const submitBtn = document.getElementById("lead-submit-btn");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Отправка заявки...</span>`;
    }

    const payload = {
      parentName: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      childAge: ageSelect.value,
      course: courseSelect ? courseSelect.value : "not_selected",
      source: sourceInput ? sourceInput.value : "direct",
      submittedAt: new Date().toISOString()
    };

    // Store in localStorage for demo review
    try {
      const existing = JSON.parse(localStorage.getItem("robostart_leads") || "[]");
      existing.push(payload);
      localStorage.setItem("robostart_leads", JSON.stringify(existing));
    } catch (err) {
      console.warn("Storage quota exceeded", err);
    }

    console.info("Lead submitted successfully:", payload);

    // Smooth transition to success screen
    setTimeout(() => {
      form.style.display = "none";
      if (successState) successState.style.display = "block";
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span class="btn__text">Записаться на бесплатный урок</span>
          <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        `;
      }
    }, 600);
  });

  function showError(input, errorEl) {
    if (input) input.classList.add("error");
    if (errorEl) errorEl.classList.add("active");
  }

  function clearError(input, errorEl) {
    if (input) input.classList.remove("error");
    if (errorEl) errorEl.classList.remove("active");
  }

  function openModal(modalEl) {
    modalEl.classList.add("active");
    modalEl.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal(modalEl) {
    modalEl.classList.remove("active");
    modalEl.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // Reset view after modal closes
    setTimeout(() => {
      form.style.display = "flex";
      if (successState) successState.style.display = "none";
    }, 300);
  }
}

/**
 * ------------------------------------------------------------------------------
 * 11. FAQ Accordion with Smooth Animation
 * ------------------------------------------------------------------------------
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-item__btn");
    const content = item.querySelector(".faq-item__content");

    if (!btn || !content) return;

    btn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("active");
          const otherBtn = other.querySelector(".faq-item__btn");
          const otherContent = other.querySelector(".faq-item__content");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
          if (otherContent) otherContent.style.maxHeight = "0";
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove("active");
        btn.setAttribute("aria-expanded", "false");
        content.style.maxHeight = "0";
      } else {
        item.classList.add("active");
        btn.setAttribute("aria-expanded", "true");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

/**
 * ------------------------------------------------------------------------------
 * 12. Mobile Drawer Navigation
 * ------------------------------------------------------------------------------
 */
function initMobileDrawer() {
  const burgerBtn = document.getElementById("burger-btn");
  const drawer = document.getElementById("mobile-drawer");
  const overlay = document.getElementById("drawer-overlay");
  const closeBtn = document.getElementById("drawer-close-btn");
  const drawerLinks = document.querySelectorAll(".mobile-drawer__link, .mobile-drawer button");

  if (!burgerBtn || !drawer || !overlay) return;

  function openDrawer() {
    burgerBtn.classList.add("active");
    burgerBtn.setAttribute("aria-expanded", "true");
    drawer.classList.add("active");
    drawer.setAttribute("aria-hidden", "false");
    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    burgerBtn.classList.remove("active");
    burgerBtn.setAttribute("aria-expanded", "false");
    drawer.classList.remove("active");
    drawer.setAttribute("aria-hidden", "true");
    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  burgerBtn.addEventListener("click", () => {
    if (drawer.classList.contains("active")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);

  drawerLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeDrawer();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("active")) {
      closeDrawer();
    }
  });
}

/**
 * ------------------------------------------------------------------------------
 * 13. Gallery Lightbox Modal
 * ------------------------------------------------------------------------------
 */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxOverlay = document.getElementById("lightbox-overlay");

  if (!galleryItems.length || !lightbox) return;

  function openLightbox(src, caption) {
    if (lightboxImg) lightboxImg.setAttribute("src", src);
    if (lightboxCaption) lightboxCaption.textContent = caption || "";
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const src = item.getAttribute("data-gallery-src");
      const caption = item.querySelector(".gallery-item__caption")?.textContent;
      if (src) openLightbox(src, caption);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
}

/**
 * ------------------------------------------------------------------------------
 * 14. Header Scroll Shadow Effect
 * ------------------------------------------------------------------------------
 */
function initHeaderScroll() {
  const header = document.getElementById("header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
  }, { passive: true });
}
