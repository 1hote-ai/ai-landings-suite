/**
 * ==============================================================================
 * KIZUNA (絆) — KAISEKI & OMAKASE RESTAURANT JAVASCRIPT CORE
 * ==============================================================================
 * Production-grade client logic:
 * 1. Global config binding (phone, email, address, coordinates, hours)
 * 2. Dynamic live working hours calculation ("Открыто сейчас", "Открыто с 13:00")
 * 3. Yandex Maps 2.1 API initialization with custom Hanko pin & fallback
 * 4. Interactive Tasting Menu Tabs (Kaiseki, Omakase, Shojin Ryori)
 * 5. Fullscreen Gallery Lightbox with keyboard & swipe navigation
 * 6. Accessible FAQ Accordion
 * 7. Table Reservation Modal & Russian Phone Input Mask (+7 (___) ___-__-__)
 * 8. Mobile Navigation Drawer & Sticky Actions
 * 9. Toast Notification System
 * ==============================================================================
 */

'use strict';

/**
 * ------------------------------------------------------------------------------
 * 1. LANDING CONFIGURATION OBJECT
 * Edit this object to customize restaurant data, contacts, coordinates & schedules.
 * ------------------------------------------------------------------------------
 */
const LANDING_CONFIG = {
  // Brand identity
  brandName: "KIZUNA",
  brandKanji: "絆",
  tagline: "Кайсеки & Омакасе • Традиции Киото в Москве",

  // Contact details
  phone: "+7 (495) 822-19-88",
  phoneRaw: "+74958221988",
  email: "reservations@kizuna-kaiseki.ru",
  address: "Москва, Страстной бульвар, 12, стр. 2",
  addressNotes: "Закрытый исторический двор, вход через сад мхов",

  // Map Coordinates [Latitude, Longitude]
  // 55.766114, 37.601245 = Страстной бульвар, 12, Москва
  coordinates: [55.766114, 37.601245],
  mapZoom: 16,

  // Schedule & Omakase Seating Times
  schedule: {
    // 0 = Sunday, 1 = Monday, 2 = Tuesday, ... 6 = Saturday
    closedDay: 1, // Monday closed (fish auction day in Tokyo)
    openHour: 13,
    openMinute: 0,
    closeHour: 23,
    closeMinute: 30,
    seatings: ["18:00", "21:00"],
    textOpen: "13:00 – 23:30",
    textDays: "Вторник — Воскресенье",
    textClosed: "Понедельник — выходной (день закупки на Тоёсу)"
  },

  // Social Messenger Links
  social: {
    telegram: "https://t.me/kizuna_kaiseki",
    whatsapp: "https://wa.me/74958221988"
  },

  // Tasting Menu Sets
  sets: {
    kaiseki: {
      id: "kaiseki",
      name: "Сет «Кайсеки Кидзуна»",
      kanji: "懐石",
      courses: "9 подач",
      duration: "1 час 50 минут",
      price: "18 500 ₽",
      priceNumber: 18500
    },
    omakase: {
      id: "omakase",
      name: "Сет «Омакасе Гранд Премиум»",
      kanji: "おまかせ",
      courses: "14 подач",
      duration: "2 часа 20 минут",
      price: "26 000 ₽",
      priceNumber: 26000
    },
    shojin: {
      id: "shojin",
      name: "Сет «Сёджин Рёри» (Веган)",
      kanji: "精進料理",
      courses: "8 подач",
      duration: "1 час 40 минут",
      price: "14 500 ₽",
      priceNumber: 14500
    }
  }
};

/**
 * ------------------------------------------------------------------------------
 * 2. DOM BINDING & INITIALIZATION
 * ------------------------------------------------------------------------------
 */
document.addEventListener("DOMContentLoaded", () => {
  applyConfigToDOM();
  initLiveHoursStatus();
  initStickyHeader();
  initMobileDrawer();
  initMenuTabs();
  initFaqAccordion();
  initGalleryLightbox();
  initBookingModal();
  initPhoneMask();
  initYandexMap();
  initCurrentYear();
});

/**
 * Injects configuration values into marked elements (e.g. data-config="phone")
 */
function applyConfigToDOM() {
  document.querySelectorAll("[data-config='phone']").forEach(el => {
    if (el.tagName === "A") {
      el.href = `tel:${LANDING_CONFIG.phoneRaw}`;
    }
    el.textContent = LANDING_CONFIG.phone;
  });

  document.querySelectorAll("[data-config='email']").forEach(el => {
    if (el.tagName === "A") {
      el.href = `mailto:${LANDING_CONFIG.email}`;
    }
    el.textContent = LANDING_CONFIG.email;
  });

  document.querySelectorAll("[data-config='address']").forEach(el => {
    el.textContent = LANDING_CONFIG.address;
  });

  document.querySelectorAll("[data-config='brandName']").forEach(el => {
    el.textContent = LANDING_CONFIG.brandName;
  });
}

function initCurrentYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * ------------------------------------------------------------------------------
 * 3. LIVE WORKING HOURS STATUS
 * Calculates real-time status: "Сейчас открыто", "Открыто с 13:00", or "Выходной"
 * ------------------------------------------------------------------------------
 */
function initLiveHoursStatus() {
  const headerStatusEl = document.getElementById("header-status-badge");
  const headerTextEl = document.getElementById("status-badge-text");
  const drawerTextEl = document.getElementById("drawer-status-text");
  const contactBadgeEl = document.getElementById("contact-status-badge");
  const contactTextEl = document.getElementById("contact-status-text");

  function updateStatus() {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
    const currentMins = now.getHours() * 60 + now.getMinutes();

    const openMins = LANDING_CONFIG.schedule.openHour * 60 + LANDING_CONFIG.schedule.openMinute;
    const closeMins = LANDING_CONFIG.schedule.closeHour * 60 + LANDING_CONFIG.schedule.closeMinute;

    let statusText = "";
    let statusClass = "open"; // 'open', 'prep', 'closed'

    if (currentDay === LANDING_CONFIG.schedule.closedDay) {
      statusText = "Понедельник — день закупки на Тоёсу";
      statusClass = "prep";
    } else if (currentMins >= openMins && currentMins < closeMins) {
      statusText = "Открыто сейчас (до 23:30)";
      statusClass = "open";
    } else if (currentMins < openMins) {
      statusText = "Открыто с 13:00 (сеансы 18:00 & 21:00)";
      statusClass = "prep";
    } else {
      statusText = "Закрыто до 13:00 (завтра)";
      statusClass = "closed";
    }

    // Update Header Pill
    if (headerTextEl) {
      headerTextEl.textContent = statusText;
    }
    if (headerStatusEl) {
      const dot = headerStatusEl.querySelector(".status-dot");
      if (dot) {
        dot.className = "status-dot " + statusClass;
      }
    }

    // Update Drawer Status
    if (drawerTextEl) {
      drawerTextEl.textContent = statusText;
      const dot = drawerTextEl.parentElement?.querySelector(".status-dot");
      if (dot) {
        dot.className = "status-dot " + statusClass;
      }
    }

    // Update Contact Panel Status
    if (contactTextEl) {
      contactTextEl.textContent = statusText;
    }
    if (contactBadgeEl) {
      const dot = contactBadgeEl.querySelector(".status-dot");
      if (dot) {
        dot.className = "status-dot " + statusClass;
      }
    }
  }

  updateStatus();
  // Refresh every 60 seconds
  setInterval(updateStatus, 60000);
}

/**
 * ------------------------------------------------------------------------------
 * 4. STICKY HEADER & SCROLL BEHAVIOR
 * ------------------------------------------------------------------------------
 */
function initStickyHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });
}

/**
 * ------------------------------------------------------------------------------
 * 5. MOBILE DRAWER NAVIGATION
 * ------------------------------------------------------------------------------
 */
function initMobileDrawer() {
  const burgerBtn = document.getElementById("burger-toggle");
  const drawer = document.getElementById("mobile-drawer");
  const drawerOverlay = document.getElementById("drawer-overlay");
  const drawerCloseBtn = document.getElementById("drawer-close");
  const drawerLinks = document.querySelectorAll(".drawer-link");

  if (!drawer || !burgerBtn) return;

  function openDrawer() {
    drawer.classList.add("active");
    drawer.setAttribute("aria-hidden", "false");
    burgerBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.remove("active");
    drawer.setAttribute("aria-hidden", "true");
    burgerBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  burgerBtn.addEventListener("click", openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener("click", closeDrawer);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("active")) {
      closeDrawer();
    }
  });
}

/**
 * ------------------------------------------------------------------------------
 * 6. INTERACTIVE TASTING MENU TABS
 * ------------------------------------------------------------------------------
 */
function initMenuTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  if (!tabButtons.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");

      // Update button active state
      tabButtons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      // Update panels active state
      tabPanels.forEach(panel => {
        panel.classList.remove("active");
      });
      const activePanel = document.getElementById(`panel-${targetId}`);
      if (activePanel) {
        activePanel.classList.add("active");
      }
    });
  });
}

/**
 * ------------------------------------------------------------------------------
 * 7. ACCESSIBLE FAQ ACCORDION
 * ------------------------------------------------------------------------------
 */
function initFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  items.forEach(item => {
    const trigger = item.querySelector(".faq-trigger");
    const content = item.querySelector(".faq-content");

    if (!trigger || !content) return;

    trigger.addEventListener("click", () => {
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";

      // Close all other items for neat accordion feel
      items.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          const otherTrigger = otherItem.querySelector(".faq-trigger");
          const otherContent = otherItem.querySelector(".faq-content");
          if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Toggle clicked item
      if (isExpanded) {
        item.classList.remove("active");
        trigger.setAttribute("aria-expanded", "false");
        content.style.maxHeight = null;
      } else {
        item.classList.add("active");
        trigger.setAttribute("aria-expanded", "true");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

/**
 * ------------------------------------------------------------------------------
 * 8. FULLSCREEN GALLERY LIGHTBOX
 * ------------------------------------------------------------------------------
 */
function initGalleryLightbox() {
  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxImg = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const backdrop = document.getElementById("lightbox-backdrop");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");
  const galleryCards = document.querySelectorAll(".gallery-card");

  if (!lightbox || !galleryCards.length) return;

  let currentIndex = 0;
  const itemsData = [];

  galleryCards.forEach((card, idx) => {
    const img = card.querySelector(".gallery-thumb");
    const caption = card.getAttribute("data-caption") || "";
    if (img) {
      itemsData.push({
        src: img.src,
        caption: caption
      });
    }

    card.addEventListener("click", () => {
      openLightbox(idx);
    });
  });

  function openLightbox(index) {
    if (!itemsData[index]) return;
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function updateLightboxContent() {
    const item = itemsData[currentIndex];
    if (!item) return;
    lightboxImg.src = item.src;
    lightboxCaption.textContent = item.caption;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % itemsData.length;
    updateLightboxContent();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + itemsData.length) % itemsData.length;
    updateLightboxContent();
  }

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (backdrop) backdrop.addEventListener("click", closeLightbox);
  if (nextBtn) nextBtn.addEventListener("click", showNext);
  if (prevBtn) prevBtn.addEventListener("click", showPrev);

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });
}

/**
 * ------------------------------------------------------------------------------
 * 9. TABLE RESERVATION MODAL & LEAD CAPTURE
 * ------------------------------------------------------------------------------
 */
function initBookingModal() {
  const modal = document.getElementById("booking-modal");
  const backdrop = document.getElementById("modal-backdrop");
  const closeBtn = document.getElementById("modal-close");
  const openButtons = document.querySelectorAll(".open-booking-btn");
  const form = document.getElementById("booking-form");
  const formView = document.getElementById("modal-form-view");
  const successView = document.getElementById("modal-success-view");
  const successCloseBtn = document.getElementById("success-close-btn");
  const dateInput = document.getElementById("form-date");
  const setSelect = document.getElementById("form-set");

  if (!modal) return;

  // Set default minimum date to today
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  function openModal(presetSet) {
    if (presetSet && setSelect) {
      setSelect.value = presetSet;
    }
    // Reset views
    if (formView) formView.style.display = "block";
    if (successView) successView.style.display = "none";

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  openButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const preset = btn.getAttribute("data-preset-set");
      openModal(preset);
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);
  if (successCloseBtn) successCloseBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Handle Form Submission
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateBookingForm()) return;

      const submitBtn = document.getElementById("submit-booking-btn");
      const originalText = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Регистрация...</span>`;
      }

      // Collect data
      const formData = {
        setId: setSelect ? setSelect.value : "kaiseki",
        date: dateInput ? dateInput.value : "",
        time: document.getElementById("form-time")?.value || "18:00",
        guests: document.getElementById("form-guests")?.value || "2",
        pairing: document.getElementById("form-pairing")?.value || "none",
        name: document.getElementById("form-name")?.value.trim() || "",
        phone: document.getElementById("form-phone")?.value.trim() || "",
        notes: document.getElementById("form-notes")?.value.trim() || ""
      };

      // Simulate instantaneous safe server response
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }

        const bookingId = "KZ-" + Math.floor(1000 + Math.random() * 9000);

        // Update Success View
        const bookingIdEl = document.getElementById("success-booking-id");
        const sumSetEl = document.getElementById("sum-set");
        const sumDateTimeEl = document.getElementById("sum-datetime");
        const sumGuestsEl = document.getElementById("sum-guests");
        const sumNameEl = document.getElementById("sum-name");
        const whatsappBtn = document.getElementById("success-whatsapp-btn");

        if (bookingIdEl) bookingIdEl.textContent = bookingId;

        const setInfo = LANDING_CONFIG.sets[formData.setId] || LANDING_CONFIG.sets.kaiseki;
        if (sumSetEl) sumSetEl.textContent = setInfo.name;

        if (sumDateTimeEl) {
          sumDateTimeEl.textContent = `${formData.date}, сеанс ${formData.time}`;
        }

        if (sumGuestsEl) {
          sumGuestsEl.textContent = formData.guests === "private" ? "Вся стойка (12 мест)" : `${formData.guests} персоны`;
        }

        if (sumNameEl) {
          sumNameEl.textContent = `${formData.name} (${formData.phone})`;
        }

        // WhatsApp direct concierge confirmation link
        if (whatsappBtn) {
          const waMessage = encodeURIComponent(
            `Здравствуйте, консьерж KIZUNA! Мой номер брони ${bookingId} на имя ${formData.name}. ` +
            `Сет: ${setInfo.name}, дата: ${formData.date}, время: ${formData.time}. Подтвердите, пожалуйста, резерв.`
          );
          whatsappBtn.href = `https://wa.me/74958221988?text=${waMessage}`;
        }

        // Switch to success view
        if (formView) formView.style.display = "none";
        if (successView) successView.style.display = "block";

        showToast("Бронирование успешно зарегистрировано!");
        form.reset();
      }, 400);
    });
  }
}

/**
 * Validates reservation form fields
 */
function validateBookingForm() {
  let isValid = true;
  const nameInput = document.getElementById("form-name");
  const phoneInput = document.getElementById("form-phone");
  const agreeCheck = document.getElementById("form-agree");

  const nameParent = nameInput?.parentElement;
  const phoneParent = phoneInput?.parentElement;
  const agreeError = document.getElementById("agree-error");

  // Validate Name (at least 2 letters)
  if (!nameInput || nameInput.value.trim().length < 2) {
    if (nameParent) nameParent.classList.add("has-error");
    isValid = false;
  } else {
    if (nameParent) nameParent.classList.remove("has-error");
  }

  // Validate Phone (strict format check: length must be 18 chars)
  // "+7 (999) 999-99-99" has length 18
  if (!phoneInput || phoneInput.value.trim().length < 18) {
    if (phoneParent) phoneParent.classList.add("has-error");
    isValid = false;
  } else {
    if (phoneParent) phoneParent.classList.remove("has-error");
  }

  // Validate Agreement
  if (agreeCheck && !agreeCheck.checked) {
    if (agreeError) agreeError.style.display = "block";
    isValid = false;
  } else {
    if (agreeError) agreeError.style.display = "none";
  }

  return isValid;
}

/**
 * ------------------------------------------------------------------------------
 * 10. RUSSIAN PHONE INPUT MASK (+7 (___) ___-__-__)
 * ------------------------------------------------------------------------------
 */
function initPhoneMask() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  phoneInputs.forEach(input => {
    input.addEventListener("input", onPhoneInput);
    input.addEventListener("keydown", onPhoneKeyDown);
    input.addEventListener("paste", onPhonePaste);
  });

  function getCleanDigits(val) {
    return val.replace(/\D/g, "");
  }

  function onPhoneInput(e) {
    const input = e.target;
    let inputNumbers = getCleanDigits(input.value);
    const selectionStart = input.selectionStart;
    let formatted = "";

    if (!inputNumbers) {
      input.value = "";
      return;
    }

    if (input.value.length !== selectionStart) {
      // Editing in middle of input
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbers;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbers[0]) > -1) {
      if (inputNumbers[0] === "9") inputNumbers = "7" + inputNumbers;
      const firstChar = "+7";
      formatted = firstChar + " ";

      if (inputNumbers.length > 1) {
        formatted += "(" + inputNumbers.substring(1, 4);
      }
      if (inputNumbers.length >= 5) {
        formatted += ") " + inputNumbers.substring(4, 7);
      }
      if (inputNumbers.length >= 8) {
        formatted += "-" + inputNumbers.substring(7, 9);
      }
      if (inputNumbers.length >= 10) {
        formatted += "-" + inputNumbers.substring(9, 11);
      }
    } else {
      // Non-standard international prefix
      formatted = "+" + inputNumbers.substring(0, 16);
    }

    input.value = formatted;
  }

  function onPhoneKeyDown(e) {
    const input = e.target;
    if (e.keyCode === 8 && getCleanDigits(input.value).length === 1) {
      input.value = "";
    }
  }

  function onPhonePaste(e) {
    const pasted = e.clipboardData || window.clipboardData;
    const input = e.target;
    const inputNumbers = getCleanDigits(input.value);

    if (pasted) {
      const pastedText = pasted.getData("Text");
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbers;
      }
    }
  }
}

/**
 * ------------------------------------------------------------------------------
 * 11. YANDEX MAPS 2.1 INITIALIZATION (with Custom Pin & Fallback)
 * ------------------------------------------------------------------------------
 */
function initYandexMap() {
  const mapContainer = document.getElementById("yandex-map");
  const fallbackEl = document.getElementById("map-fallback");
  if (!mapContainer) return;

  // Function to show graceful fallback if API is blocked or offline
  function showFallback() {
    if (fallbackEl) fallbackEl.style.display = "flex";
  }

  // Check if ymaps script is already loaded
  if (typeof ymaps !== "undefined") {
    ymaps.ready(createMapInstance);
    return;
  }

  // Dynamically load Yandex Maps API script safely
  const script = document.createElement("script");
  script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&coordorder=latlong";
  script.async = true;

  script.onload = () => {
    if (typeof ymaps !== "undefined") {
      ymaps.ready(createMapInstance);
    } else {
      showFallback();
    }
  };

  script.onerror = () => {
    console.warn("KIZUNA: Не удалось загрузить скрипт Яндекс Карт. Активирован локальный фолбэк.");
    showFallback();
  };

  document.head.appendChild(script);

  function createMapInstance() {
    try {
      if (fallbackEl) fallbackEl.style.display = "none";

      const coords = LANDING_CONFIG.coordinates;

      const myMap = new ymaps.Map("yandex-map", {
        center: coords,
        zoom: LANDING_CONFIG.mapZoom,
        controls: ["zoomControl", "fullscreenControl"]
      }, {
        suppressMapOpenBlock: true
      });

      // Custom Placemark
      const placemark = new ymaps.Placemark(coords, {
        hintContent: `<strong>${LANDING_CONFIG.brandName} (絆)</strong>`,
        balloonContentHeader: `<div style="font-family:'Marcellus',serif; font-size:16px; color:#C53030; font-weight:bold;">${LANDING_CONFIG.brandName} (絆)</div>`,
        balloonContentBody: `
          <div style="font-size:13px; color:#2D2E32; line-height:1.5;">
            <strong>Японский ресторан высокой кухни Кайсеки & Омакасе</strong><br>
            ${LANDING_CONFIG.address}<br>
            Сеансы: 18:00 и 21:00<br>
            Тел: <a href="tel:${LANDING_CONFIG.phoneRaw}" style="color:#C53030; font-weight:bold;">${LANDING_CONFIG.phone}</a>
          </div>
        `,
        balloonContentFooter: `
          <div style="margin-top:6px;">
            <a href="https://yandex.ru/maps/?rtext=~${coords[0]},${coords[1]}" target="_blank" rel="noopener" style="color:#C53030; font-size:12px; text-decoration:underline;">
              Построить маршрут в Яндекс Картах &rarr;
            </a>
          </div>
        `
      }, {
        preset: "islands#redDotIconWithCaption",
        iconCaption: "KIZUNA (絆)"
      });

      myMap.geoObjects.add(placemark);
      myMap.behaviors.disable("scrollZoom"); // Don't hijack page scroll
    } catch (err) {
      console.error("Ошибка при инициализации Яндекс Карт:", err);
      showFallback();
    }
  }
}

/**
 * ------------------------------------------------------------------------------
 * 12. TOAST NOTIFICATION SYSTEM
 * ------------------------------------------------------------------------------
 */
let toastTimeout = null;

function showToast(message) {
  const toast = document.getElementById("site-toast");
  const msgEl = document.getElementById("toast-message");

  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add("show");

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 4500);
}
