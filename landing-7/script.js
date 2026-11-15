/**
 * ==========================================================================
 * APEX DETAIL STUDIO - MAIN APPLICATION CONTROLLER
 * 100% Complete & Production-Grade JavaScript
 * ==========================================================================
 */

'use strict';

/* --------------------------------------------------------------------------
   1. GLOBAL CONFIGURATION OBJECT (LANDING_CONFIG)
   --------------------------------------------------------------------------
   Легко редактируемый конфигурационный объект для настройки контактов,
   координат карты, графика работы, социальных сетей и цен.
-------------------------------------------------------------------------- */
const LANDING_CONFIG = {
  brand: {
    name: "APEX Detail Studio",
    tagline: "Премиальный детейлинг & керамическая защита",
    legalName: "ООО «АПЕКС ДЕТЕЙЛИНГ»",
    inn: "7725941820"
  },
  contacts: {
    phoneDisplay: "+7 (495) 120-88-77",
    phoneLink: "+74951208877",
    email: "info@apex-detailing.ru",
    addressFull: "г. Москва, Варшавское шоссе, д. 26, стр. 11",
    addressShort: "Москва, Варшавское ш., 26с11",
    metro: "м. Нагатинская / Тульская (5 минут от ТТК)",
    coordinates: [55.706117, 37.601552]
  },
  schedule: {
    days: "Ежедневно",
    hoursText: "09:00 – 21:00",
    openHour: 9,
    closeHour: 21,
    utcOffset: 3 // Московское время (UTC+3)
  },
  socials: {
    telegram: "https://t.me/apex_detailing_moscow",
    whatsapp: "https://wa.me/74951208877?text=%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%B9%20%D0%B4%D0%B5%D0%BD%D1%8C!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D1%81%D1%82%D0%BE%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C%20%D0%B4%D0%B5%D1%82%D0%B5%D0%B9%D0%BB%D0%B8%D0%BD%D0%B3%D0%B0",
    vk: "https://vk.com/apex_detailing"
  },
  pricing: {
    bodyTypes: {
      sedan: { name: "Седан / Купе", mult: 1.0, label: "× 1.0 (Базовый)" },
      crossover: { name: "Кроссовер", mult: 1.15, label: "× 1.15 (Средний)" },
      suv: { name: "Внедорожник / Минивэн", mult: 1.30, label: "× 1.30 (Крупный)" },
      supercar: { name: "Суперкар / Эксклюзив", mult: 1.45, label: "× 1.45 (Премиум)" }
    },
    packages: {
      standard: {
        id: "standard",
        title: "Комплекс «Восстановление & Глянец»",
        shortTitle: "Восстановление & Глянец",
        basePrice: 25000,
        time: "1–2 рабочих дня",
        warranty: "1 год по договору"
      },
      ceramic: {
        id: "ceramic",
        title: "Комплекс «Керамическая броня 9H»",
        shortTitle: "Керамика 9H Pro",
        basePrice: 45000,
        time: "2–3 рабочих дня",
        warranty: "2 года по договору"
      },
      "ppf-front": {
        id: "ppf-front",
        title: "Бронепленка PPF: «Зона Риска»",
        shortTitle: "PPF Зона Риска",
        basePrice: 75000,
        time: "2–3 рабочих дня",
        warranty: "5 лет официальной гарантии"
      },
      "ppf-full": {
        id: "ppf-full",
        title: "Премиум «Полный кузов в PPF»",
        shortTitle: "PPF Полный кузов",
        basePrice: 195000,
        time: "4–5 рабочих дней",
        warranty: "5 лет официальной гарантии"
      }
    },
    addons: {
      aquapel: { name: "Антидождь на полусферу Aquapel", price: 4500 },
      interior: { name: "Детейлинг салона + Консервация кожи", price: 16000 },
      wheels: { name: "Керамика колесных дисков & Суппортов", price: 9000 },
      windshield: { name: "Бронирование лобового стекла ClearPlex", price: 18000 },
      antichrome: { name: "Полный антихром молдингов и решеток", price: 19000 }
    }
  }
};

/* --------------------------------------------------------------------------
   2. DOM READY & INITIALIZATION
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initDataBinding();
  initLiveWorkStatus();
  initHeaderScroll();
  initMobileDrawer();
  initBeforeAfterSlider();
  initPriceConfigurator();
  initPortfolioFilter();
  initFaqAccordion();
  initLeadModal();
  initPhoneMask();
  initYandexMap();
  updateCopyrightYear();
});

/* --------------------------------------------------------------------------
   3. DATA BINDING (Sync LANDING_CONFIG to DOM elements)
   -------------------------------------------------------------------------- */
function initDataBinding() {
  // Bind phone numbers
  document.querySelectorAll('[data-config="phoneDisplay"]').forEach(el => {
    el.textContent = LANDING_CONFIG.contacts.phoneDisplay;
  });
  document.querySelectorAll('[data-config="phoneLink"]').forEach(el => {
    el.setAttribute("href", `tel:${LANDING_CONFIG.contacts.phoneLink}`);
  });

  // Bind email
  document.querySelectorAll('[data-config="email"]').forEach(el => {
    el.textContent = LANDING_CONFIG.contacts.email;
  });
  document.querySelectorAll('[data-config="emailLink"]').forEach(el => {
    el.setAttribute("href", `mailto:${LANDING_CONFIG.contacts.email}`);
  });

  // Bind addresses
  document.querySelectorAll('[data-config="addressFull"]').forEach(el => {
    el.textContent = LANDING_CONFIG.contacts.addressFull;
  });
  document.querySelectorAll('[data-config="addressShort"]').forEach(el => {
    el.textContent = LANDING_CONFIG.contacts.addressShort;
  });
  document.querySelectorAll('[data-config="metro"]').forEach(el => {
    el.textContent = LANDING_CONFIG.contacts.metro;
  });

  // Bind schedule
  document.querySelectorAll('[data-config="scheduleShort"]').forEach(el => {
    el.textContent = `${LANDING_CONFIG.schedule.days}: ${LANDING_CONFIG.schedule.hoursText}`;
  });
  document.querySelectorAll('[data-config="scheduleFull"]').forEach(el => {
    el.textContent = `${LANDING_CONFIG.schedule.days} с ${LANDING_CONFIG.schedule.hoursText}`;
  });

  // Bind social links
  const topTg = document.getElementById("topbar-telegram");
  const topWa = document.getElementById("topbar-whatsapp");
  const contactTg = document.getElementById("btn-contact-telegram");
  const contactWa = document.getElementById("btn-contact-whatsapp");

  if (topTg) topTg.href = LANDING_CONFIG.socials.telegram;
  if (topWa) topWa.href = LANDING_CONFIG.socials.whatsapp;
  if (contactTg) contactTg.href = LANDING_CONFIG.socials.telegram;
  if (contactWa) contactWa.href = LANDING_CONFIG.socials.whatsapp;
}

/* --------------------------------------------------------------------------
   4. LIVE WORKING HOURS STATUS ("Открыто сейчас" / "Закрыто")
   -------------------------------------------------------------------------- */
function initLiveWorkStatus() {
  const pill = document.getElementById("live-status-pill");
  const textEl = document.querySelector('[data-config="statusText"]');
  const detailEl = document.querySelector('[data-config="statusDetail"]');

  function checkStatus() {
    // Current UTC time + studio offset
    const now = new Date();
    const utcHours = now.getUTCHours();
    const moscowHours = (utcHours + LANDING_CONFIG.schedule.utcOffset) % 24;

    const isOpen = moscowHours >= LANDING_CONFIG.schedule.openHour && 
                   moscowHours < LANDING_CONFIG.schedule.closeHour;

    if (isOpen) {
      if (pill) pill.classList.remove("is-closed");
      if (textEl) textEl.textContent = `Открыто сейчас (до ${LANDING_CONFIG.schedule.closeHour}:00)`;
      if (detailEl) detailEl.textContent = "Сейчас открыто • Готовы принять ваш автомобиль";
    } else {
      if (pill) pill.classList.add("is-closed");
      if (textEl) textEl.textContent = `Закрыто (откроемся в ${LANDING_CONFIG.schedule.openHour}:00)`;
      if (detailEl) detailEl.textContent = "Сейчас студия закрыта • Запись онлайн работает 24/7";
    }
  }

  checkStatus();
  // Check every 60 seconds
  setInterval(checkStatus, 60000);
}

/* --------------------------------------------------------------------------
   5. HEADER SCROLL BEHAVIOR
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById("header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   6. MOBILE DRAWER NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const burgerBtn = document.getElementById("burger-btn");
  const drawer = document.getElementById("mobile-drawer");
  const drawerBackdrop = document.getElementById("drawer-backdrop");
  const drawerCloseBtn = document.getElementById("drawer-close");
  const drawerLinks = document.querySelectorAll(".mobile-nav__link");

  if (!burgerBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    burgerBtn.classList.add("active");
    burgerBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    burgerBtn.classList.remove("active");
    burgerBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  burgerBtn.addEventListener("click", () => {
    if (drawer.classList.contains("open")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener("click", closeDrawer);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   7. INTERACTIVE BEFORE / AFTER SLIDER
   -------------------------------------------------------------------------- */
function initBeforeAfterSlider() {
  const container = document.getElementById("ba-slider-container");
  const beforeWrap = document.getElementById("ba-before-wrap");
  const handle = document.getElementById("ba-handle");
  const rangeInput = document.getElementById("ba-range-input");

  if (!container || !beforeWrap || !handle || !rangeInput) return;

  const updateSlider = (value) => {
    const clamped = Math.max(0, Math.min(100, value));
    beforeWrap.style.width = `${clamped}%`;
    handle.style.left = `${clamped}%`;
    rangeInput.value = clamped;
  };

  // Range input event
  rangeInput.addEventListener("input", (e) => {
    updateSlider(e.target.value);
  });

  // Mouse & Touch interaction directly on container
  let isDragging = false;

  const getPositionX = (e) => {
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    return (x / rect.width) * 100;
  };

  const onStart = (e) => {
    isDragging = true;
    updateSlider(getPositionX(e));
  };

  const onMove = (e) => {
    if (!isDragging) return;
    updateSlider(getPositionX(e));
  };

  const onEnd = () => {
    isDragging = false;
  };

  container.addEventListener("mousedown", onStart);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onEnd);

  container.addEventListener("touchstart", onStart, { passive: true });
  window.addEventListener("touchmove", onMove, { passive: true });
  window.addEventListener("touchend", onEnd);
}

/* --------------------------------------------------------------------------
   8. INTERACTIVE CONFIGURATOR & PRICE CALCULATOR
   -------------------------------------------------------------------------- */
function initPriceConfigurator() {
  const bodySelector = document.getElementById("body-types-selector");
  const packagesSelector = document.getElementById("packages-selector");
  const addonsSelector = document.getElementById("addons-selector");

  // Summary display elements
  const summaryPackageTitle = document.getElementById("summary-package-title");
  const summaryBodyText = document.getElementById("summary-body-text");
  const summaryBaseVal = document.getElementById("summary-base-val");
  const summaryMultVal = document.getElementById("summary-mult-val");
  const summaryAddonsVal = document.getElementById("summary-addons-val");
  const summaryTimeVal = document.getElementById("summary-time-val");
  const summaryWarrantyVal = document.getElementById("summary-warranty-val");
  const calcTotalDisplay = document.getElementById("calc-total-display");

  // Lead modal transfer fields
  const formPackageInput = document.getElementById("form-package-input");
  const formBodyInput = document.getElementById("form-body-input");
  const formPriceInput = document.getElementById("form-price-input");
  const modalCalcPackage = document.getElementById("modal-calc-package");
  const modalCalcPrice = document.getElementById("modal-calc-price");

  // State
  let currentBodyKey = "sedan";
  let currentPackageKey = "ceramic";
  let currentAddonKeys = ["aquapel"];

  const formatPrice = (val) => {
    return new Intl.NumberFormat("ru-RU").format(val) + " ₽";
  };

  const recalculate = () => {
    const bodyObj = LANDING_CONFIG.pricing.bodyTypes[currentBodyKey] || LANDING_CONFIG.pricing.bodyTypes.sedan;
    const pkgObj = LANDING_CONFIG.pricing.packages[currentPackageKey] || LANDING_CONFIG.pricing.packages.ceramic;

    // Calculate addons
    let addonsTotal = 0;
    currentAddonKeys.forEach(key => {
      if (LANDING_CONFIG.pricing.addons[key]) {
        addonsTotal += LANDING_CONFIG.pricing.addons[key].price;
      }
    });

    const basePrice = pkgObj.basePrice;
    const multiplier = bodyObj.mult;
    const total = Math.round(basePrice * multiplier + addonsTotal);

    // Update summary UI
    if (summaryPackageTitle) summaryPackageTitle.textContent = pkgObj.title;
    if (summaryBodyText) summaryBodyText.textContent = `Кузов: ${bodyObj.name}`;
    if (summaryBaseVal) summaryBaseVal.textContent = formatPrice(basePrice);
    if (summaryMultVal) summaryMultVal.textContent = `${bodyObj.label}`;
    if (summaryAddonsVal) summaryAddonsVal.textContent = formatPrice(addonsTotal);
    if (summaryTimeVal) summaryTimeVal.textContent = pkgObj.time;
    if (summaryWarrantyVal) summaryWarrantyVal.textContent = pkgObj.warranty;
    if (calcTotalDisplay) calcTotalDisplay.textContent = formatPrice(total);

    // Sync to Lead Modal
    if (formPackageInput) formPackageInput.value = pkgObj.title;
    if (formBodyInput) formBodyInput.value = bodyObj.name;
    if (formPriceInput) formPriceInput.value = formatPrice(total);
    if (modalCalcPackage) modalCalcPackage.textContent = `${pkgObj.shortTitle} (${bodyObj.name})`;
    if (modalCalcPrice) modalCalcPrice.textContent = formatPrice(total);
  };

  // 1. Body types selection
  if (bodySelector) {
    const bodyCards = bodySelector.querySelectorAll(".body-type-card");
    bodyCards.forEach(card => {
      card.addEventListener("click", () => {
        bodyCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        currentBodyKey = card.getAttribute("data-body");
        recalculate();
      });
    });
  }

  // 2. Packages selection
  if (packagesSelector) {
    const packageCards = packagesSelector.querySelectorAll(".package-radio-card");
    packageCards.forEach(card => {
      card.addEventListener("click", () => {
        packageCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        const radio = card.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
        currentPackageKey = card.getAttribute("data-package-id");
        recalculate();
      });
    });
  }

  // 3. Add-ons selection
  if (addonsSelector) {
    const addonCards = addonsSelector.querySelectorAll(".addon-checkbox-card");
    addonCards.forEach(card => {
      const checkbox = card.querySelector('input[type="checkbox"]');
      if (!checkbox) return;

      const updateCardState = () => {
        if (checkbox.checked) {
          card.classList.add("active");
        } else {
          card.classList.remove("active");
        }
        // Collect checked addons
        currentAddonKeys = [];
        addonCards.forEach(c => {
          const cb = c.querySelector('input[type="checkbox"]');
          if (cb && cb.checked) {
            currentAddonKeys.push(cb.value);
          }
        });
        recalculate();
      };

      card.addEventListener("click", (e) => {
        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
        updateCardState();
      });

      // Initial state
      if (checkbox.checked) card.classList.add("active");
    });
  }

  // 4. "Рассчитать для авто" buttons from Services section
  document.querySelectorAll(".btn-select-service").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetPkg = btn.getAttribute("data-package");
      // Find matching package card in calculator
      const matchingCard = document.querySelector(`.package-radio-card[data-package-id="${targetPkg}"]`);
      if (matchingCard) {
        matchingCard.click();
      }
      // Scroll smoothly to configurator
      const configSec = document.getElementById("configurator");
      if (configSec) {
        configSec.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Initial calculation
  recalculate();

  // 5. "Зафиксировать цену и записаться" Button
  const btnBookFromCalc = document.getElementById("btn-book-from-calc");
  if (btnBookFromCalc) {
    btnBookFromCalc.addEventListener("click", () => {
      openLeadModal();
    });
  }
}

/* --------------------------------------------------------------------------
   9. PORTFOLIO FILTER TABS
   -------------------------------------------------------------------------- */
function initPortfolioFilter() {
  const tabsContainer = document.getElementById("portfolio-tabs");
  const portfolioGrid = document.getElementById("portfolio-items");

  if (!tabsContainer || !portfolioGrid) return;

  const tabBtns = tabsContainer.querySelectorAll(".portfolio-tab-btn");
  const cards = portfolioGrid.querySelectorAll(".portfolio-card");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      cards.forEach(card => {
        const cat = card.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          card.style.display = "block";
          card.style.opacity = "0";
          card.style.transform = "translateY(15px)";
          setTimeout(() => {
            card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 30);
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   10. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqList = document.getElementById("faq-list");
  if (!faqList) return;

  const items = faqList.querySelectorAll(".faq-item");

  items.forEach(item => {
    const btn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!btn || !answer) return;

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Close all other items
      items.forEach(other => {
        if (other !== item && other.classList.contains("active")) {
          other.classList.remove("active");
          const otherBtn = other.querySelector(".faq-question");
          const otherAns = other.querySelector(".faq-answer");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove("active");
        btn.setAttribute("aria-expanded", "false");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("active");
        btn.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

/* --------------------------------------------------------------------------
   11. LEAD CAPTURE MODAL & FORM VALIDATION
   -------------------------------------------------------------------------- */
let openLeadModal, closeLeadModal;

function initLeadModal() {
  const modal = document.getElementById("lead-modal");
  const backdrop = document.getElementById("modal-backdrop");
  const closeBtn = document.getElementById("modal-close-btn");
  const form = document.getElementById("lead-form");
  const formView = document.getElementById("modal-form-view");
  const successView = document.getElementById("modal-success-view");
  const successCloseBtn = document.getElementById("btn-success-close");
  const successPhoneDisplay = document.getElementById("success-phone-display");

  // Triggers
  const openHeaderBtn = document.getElementById("btn-open-booking-header");
  const heroConsultBtn = document.getElementById("btn-hero-consult");

  if (!modal) return;

  openLeadModal = () => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Reset views
    if (formView) formView.style.display = "block";
    if (successView) successView.classList.add("hidden");
    const nameInput = document.getElementById("lead-name");
    if (nameInput) setTimeout(() => nameInput.focus(), 150);
  };

  closeLeadModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  if (openHeaderBtn) openHeaderBtn.addEventListener("click", openLeadModal);
  if (heroConsultBtn) heroConsultBtn.addEventListener("click", openLeadModal);
  if (closeBtn) closeBtn.addEventListener("click", closeLeadModal);
  if (backdrop) backdrop.addEventListener("click", closeLeadModal);
  if (successCloseBtn) successCloseBtn.addEventListener("click", closeLeadModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeLeadModal();
    }
  });

  // Privacy Policy Link Handlers
  const privacyLinks = [
    document.getElementById("link-privacy"),
    document.getElementById("link-modal-policy")
  ];
  privacyLinks.forEach(link => {
    if (link) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        showToast("Политика конфиденциальности: Все данные обрабатываются строго в соответствии с 152-ФЗ РФ и защищены.");
      });
    }
  });

  // Form Validation & Submission
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("lead-name");
      const phoneInput = document.getElementById("lead-phone");
      const carInput = document.getElementById("lead-car");
      const agreeCheckbox = document.getElementById("lead-agree");
      const submitBtn = document.getElementById("lead-submit-btn");

      let isValid = true;

      // Validate name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameInput.classList.add("has-error");
        isValid = false;
      } else {
        nameInput.classList.remove("has-error");
      }

      // Validate phone (at least 10 digits)
      const digitsOnly = phoneInput.value.replace(/\D/g, "");
      if (digitsOnly.length < 11) {
        phoneInput.classList.add("has-error");
        isValid = false;
      } else {
        phoneInput.classList.remove("has-error");
      }

      // Validate agreement
      const agreeLabel = agreeCheckbox.closest(".form-checkbox-label");
      if (!agreeCheckbox.checked) {
        if (agreeLabel) agreeLabel.classList.add("has-error");
        isValid = false;
      } else {
        if (agreeLabel) agreeLabel.classList.remove("has-error");
      }

      if (!isValid) return;

      // Loading state on button
      if (submitBtn) {
        submitBtn.disabled = true;
        const textSpan = submitBtn.querySelector(".btn__text");
        if (textSpan) textSpan.textContent = "Отправка заявки...";
      }

      // Simulated production submission (e.g. to Telegram Bot or CRM API)
      const leadData = {
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        carModel: carInput.value.trim() || "Не указан",
        package: document.getElementById("form-package-input").value,
        bodyType: document.getElementById("form-body-input").value,
        price: document.getElementById("form-price-input").value,
        timestamp: new Date().toISOString()
      };

      console.log("[APEX CRM Lead Received]:", leadData);

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          const textSpan = submitBtn.querySelector(".btn__text");
          if (textSpan) textSpan.textContent = "Отправить заявку";
        }

        // Show success state
        if (formView) formView.style.display = "none";
        if (successView) {
          successView.classList.remove("hidden");
          if (successPhoneDisplay) successPhoneDisplay.textContent = leadData.phone;
        }

        // Trigger toast
        showToast("Заявка успешно отправлена! Мы перезвоним вам в течение 10 минут.", "success");

        // Reset form inputs
        form.reset();
      }, 750);
    });
  }
}

/* --------------------------------------------------------------------------
   12. PHONE MASK (+7 (___) ___-__-__)
   -------------------------------------------------------------------------- */
function initPhoneMask() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  phoneInputs.forEach(input => {
    input.addEventListener("input", onPhoneInput);
    input.addEventListener("keydown", onPhoneKeyDown);
    input.addEventListener("paste", onPhonePaste);
  });

  function getDigits(input) {
    return input.value.replace(/\D/g, "");
  }

  function onPhoneInput(e) {
    const input = e.target;
    let inputNumbersValue = getDigits(input);
    const selectionStart = input.selectionStart;
    let formattedInputValue = "";

    if (!inputNumbersValue) {
      input.value = "";
      return;
    }

    if (input.value.length !== selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = formattedInputValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] === "9") inputNumbersValue = "7" + inputNumbersValue;
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
    if (e.keyCode === 8 && getDigits(input).length === 1) {
      input.value = "";
    }
  }

  function onPhonePaste(e) {
    const input = e.target;
    const pasted = e.clipboardData || window.clipboardData;
    const inputNumbersValue = getDigits(input);

    if (pasted) {
      const pastedText = pasted.getData("Text");
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
      }
    }
  }
}

/* --------------------------------------------------------------------------
   13. YANDEX MAPS 2.1 INITIALIZATION
   -------------------------------------------------------------------------- */
function initYandexMap() {
  const mapContainer = document.getElementById("apex-yandex-map");
  if (!mapContainer) return;

  // Verify Yandex Maps library is loaded
  if (typeof ymaps === "undefined") {
    console.warn("Yandex Maps API is not loaded. Fallback is active.");
    return;
  }

  ymaps.ready(() => {
    try {
      // Clear placeholder spinner
      mapContainer.innerHTML = "";

      const coords = LANDING_CONFIG.contacts.coordinates;

      const map = new ymaps.Map(mapContainer, {
        center: coords,
        zoom: 16,
        controls: ["zoomControl", "fullscreenControl"]
      }, {
        suppressMapOpenBlock: true
      });

      // Remove unwanted map layers / noise
      map.behaviors.disable("scrollZoom");

      // Custom Placemark
      const placemark = new ymaps.Placemark(coords, {
        hintContent: LANDING_CONFIG.brand.name,
        balloonContentHeader: `
          <strong style="color: #E50914; font-family: 'Oswald', sans-serif; font-size: 16px;">
            ${LANDING_CONFIG.brand.name}
          </strong>
        `,
        balloonContentBody: `
          <div style="font-family: 'Inter', sans-serif; font-size: 13px; line-height: 1.5; color: #111;">
            <p><strong>Адрес:</strong> ${LANDING_CONFIG.contacts.addressFull}</p>
            <p><strong>Ориентир:</strong> ${LANDING_CONFIG.contacts.metro}</p>
            <p><strong>Часы работы:</strong> ${LANDING_CONFIG.schedule.hoursText}</p>
            <p><strong>Телефон:</strong> <a href="tel:${LANDING_CONFIG.contacts.phoneLink}" style="color: #E50914; font-weight: bold;">${LANDING_CONFIG.contacts.phoneDisplay}</a></p>
          </div>
        `,
        balloonContentFooter: `
          <div style="font-size: 11px; color: #666; margin-top: 5px;">
            Охраняемый въезд со шлагбаумом • Предупредите о визите
          </div>
        `
      }, {
        preset: "islands#redDotIconWithCaption",
        iconColor: "#E50914"
      });

      map.geoObjects.add(placemark);
    } catch (err) {
      console.error("Error creating Yandex Map instance:", err);
    }
  });
}

/* --------------------------------------------------------------------------
   14. TOAST NOTIFICATION UTILITY
   -------------------------------------------------------------------------- */
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type === "success" ? "toast--success" : ""}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // Auto-remove after 4 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* --------------------------------------------------------------------------
   15. COPYRIGHT YEAR HELPER
   -------------------------------------------------------------------------- */
function updateCopyrightYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
