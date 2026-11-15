/**
 * ==========================================================================
 * MONOLITH ARCHITECTURE — PRODUCTION CLIENT APPLICATION SCRIPT
 * Version: 2.4.0
 * Aesthetic: Swiss Architectural Modernism & Strict Grid Systems
 * ==========================================================================
 */

'use strict';

/**
 * ==========================================================================
 * 1. LANDING CONFIGURATION OBJECT (LANDING_CONFIG)
 * --------------------------------------------------------------------------
 * Centralized business data, branding, contact info, working hours,
 * coordinates, and external links. Dynamically bound to the DOM on load.
 * ==========================================================================
 */
const LANDING_CONFIG = {
  // Brand & Identity
  brand: {
    name: 'MONOLITH',
    legalName: 'ООО «МОНОЛИТ АРХИТЕКТУРА»',
    tagline: 'ARCHITECTURAL STUDIO',
    descriptor: 'Архитектурное бюро частной архитектуры и интерьеров',
    establishedYear: 2012,
    licenseSRo: 'СРО-П-142-26032015'
  },

  // Contact Information
  contacts: {
    phoneFormatted: '+7 (495) 892-34-12',
    phoneRaw: '+74958923412',
    email: 'project@monolith-arch.ru',
    city: 'Москва',
    addressShort: 'Москва, ул. Варварка, 14 / БЦ «Тектоника»',
    addressFull: '109012, г. Москва, ул. Варварка, дом 14, Деловой центр «Тектоника», 4 этаж',
    coordinates: [55.753994, 37.622093], // Latitude, Longitude (Varvarka / Moscow Center)
    yandexMapsUrl: 'https://yandex.ru/maps/?pt=37.622093,55.753994&z=16&l=map'
  },

  // Operating Schedule (Moscow Time Zone, UTC+3)
  schedule: {
    weekdays: { open: 10, close: 19, text: 'Пн–Пт: 10:00–19:00' },
    saturday: { open: 11, close: 17, text: 'Сб: 11:00–17:00 (по предварительной записи)' },
    sunday: { closed: true, text: 'Вс: выходной' },
    fullSummary: 'Пн–Пт: 10:00–19:00 | Сб: 11:00–17:00 | Вс: выходной'
  },

  // Social & Messenger Links
  socials: {
    telegram: 'https://t.me/monolith_arch',
    whatsapp: 'https://wa.me/74958923412?text=Здравствуйте!%20Хочу%20обсудить%20проект%20в%20MONOLITH',
    behance: 'https://behance.net/monolith-arch',
    pinterest: 'https://pinterest.com/monolith_arch',
    vk: 'https://vk.com/monolith_arch'
  },

  // Calculator Rates & Constants
  calculator: {
    defaultArea: 350,
    minArea: 50,
    maxArea: 2500,
    defaultServiceIndex: 0,
    services: [
      { id: 'villa', name: 'Архитектурное проектирование виллы', rate: 4500, timeWeeksPer100m: 3 },
      { id: 'interior', name: 'Премиальный дизайн интерьера', rate: 5500, timeWeeksPer100m: 2.5 },
      { id: 'turnkey', name: 'Комплексный проект (Архитектура + Интерьер + Ландшафт)', rate: 8000, timeWeeksPer100m: 4 },
      { id: 'redevelopment', name: 'Редевелопмент и реконструкция', rate: 6000, timeWeeksPer100m: 3 }
    ]
  }
};

/**
 * ==========================================================================
 * 2. CORE DOM BINDING SYSTEM
 * --------------------------------------------------------------------------
 * Binds LANDING_CONFIG properties to DOM nodes with [data-bind] attributes.
 * ==========================================================================
 */
function initDOMBindings() {
  const bindings = {
    phoneFormatted: (el) => { el.textContent = LANDING_CONFIG.contacts.phoneFormatted; },
    phoneLink: (el) => { el.href = `tel:${LANDING_CONFIG.contacts.phoneRaw}`; },
    email: (el) => { el.textContent = LANDING_CONFIG.contacts.email; },
    emailLink: (el) => { el.href = `mailto:${LANDING_CONFIG.contacts.email}`; },
    cityAddress: (el) => { el.textContent = LANDING_CONFIG.contacts.addressShort; },
    fullAddress: (el) => { el.textContent = LANDING_CONFIG.contacts.addressFull; },
    scheduleFull: (el) => { el.textContent = LANDING_CONFIG.schedule.fullSummary; },
    telegramLink: (el) => { el.href = LANDING_CONFIG.socials.telegram; },
    whatsappLink: (el) => { el.href = LANDING_CONFIG.socials.whatsapp; },
    behanceLink: (el) => { el.href = LANDING_CONFIG.socials.behance; },
    pinterestLink: (el) => { el.href = LANDING_CONFIG.socials.pinterest; },
    yandexMapsExternalLink: (el) => { el.href = LANDING_CONFIG.contacts.yandexMapsUrl; }
  };

  Object.keys(bindings).forEach((key) => {
    const elements = document.querySelectorAll(`[data-bind="${key}"]`);
    elements.forEach((el) => {
      try {
        bindings[key](el);
      } catch (err) {
        console.warn(`Error binding key ${key}:`, err);
      }
    });
  });
}

/**
 * ==========================================================================
 * 3. REAL-TIME WORKING HOURS STATUS
 * --------------------------------------------------------------------------
 * Computes whether the architectural studio is open right now,
 * and updates the status indicators in the header and contacts section.
 * ==========================================================================
 */
function updateLiveStudioStatus() {
  const now = new Date();
  // Moscow time zone offset is UTC+3
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const moscowTime = new Date(utc + (3600000 * 3));

  const dayOfWeek = moscowTime.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  const currentHour = moscowTime.getHours();
  const currentMinute = moscowTime.getMinutes();
  const currentTimeDec = currentHour + (currentMinute / 60);

  let isOpen = false;
  let statusText = '';
  let statusShort = '';

  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    // Mon-Fri: 10:00 - 19:00
    if (currentTimeDec >= LANDING_CONFIG.schedule.weekdays.open && currentTimeDec < LANDING_CONFIG.schedule.weekdays.close) {
      isOpen = true;
      statusText = `Студия открыта • до ${LANDING_CONFIG.schedule.weekdays.close}:00`;
      statusShort = 'Открыто сейчас';
    } else if (currentTimeDec < LANDING_CONFIG.schedule.weekdays.open) {
      isOpen = false;
      statusText = `Сейчас закрыто • откроемся сегодня в ${LANDING_CONFIG.schedule.weekdays.open}:00`;
      statusShort = 'Закрыто до 10:00';
    } else {
      isOpen = false;
      const nextDayText = dayOfWeek === 5 ? 'в субботу в 11:00' : 'завтра в 10:00';
      statusText = `Сейчас закрыто • откроемся ${nextDayText}`;
      statusShort = 'Закрыто';
    }
  } else if (dayOfWeek === 6) {
    // Saturday: 11:00 - 17:00
    if (currentTimeDec >= LANDING_CONFIG.schedule.saturday.open && currentTimeDec < LANDING_CONFIG.schedule.saturday.close) {
      isOpen = true;
      statusText = `Студия открыта • до ${LANDING_CONFIG.schedule.saturday.close}:00`;
      statusShort = 'Открыто (по записи)';
    } else {
      isOpen = false;
      statusText = 'Сейчас закрыто • откроемся в понедельник в 10:00';
      statusShort = 'Закрыто';
    }
  } else {
    // Sunday: Closed
    isOpen = false;
    statusText = 'Воскресенье — выходной • откроемся в понедельник в 10:00';
    statusShort = 'Закрыто до понедельника';
  }

  // Update DOM elements
  const statusEl = document.querySelector('[data-bind="statusText"]');
  if (statusEl) statusEl.textContent = statusText;

  const statusShortEl = document.querySelector('[data-bind="statusShort"]');
  if (statusShortEl) statusShortEl.textContent = statusShort;

  // Pulse dot indicators
  const indicators = document.querySelectorAll('.status-pulse');
  indicators.forEach((pulse) => {
    if (isOpen) {
      pulse.classList.remove('closed');
    } else {
      pulse.classList.add('closed');
    }
  });

  const contactsPill = document.getElementById('contactsLivePill');
  if (contactsPill) {
    if (isOpen) {
      contactsPill.classList.remove('closed');
    } else {
      contactsPill.classList.add('closed');
    }
  }
}

/**
 * ==========================================================================
 * 4. YANDEX MAPS 2.1 INITIALIZATION
 * --------------------------------------------------------------------------
 * Loads customized map centered at the studio's coordinates with a
 * bespoke dark-minimalist placemark layout and fallback link support.
 * ==========================================================================
 */
function initYandexMap() {
  const mapElement = document.getElementById('yandexMap');
  const fallbackElement = document.getElementById('mapFallback');

  if (!mapElement) return;

  // Verify whether ymaps script loaded successfully
  if (typeof ymaps === 'undefined') {
    console.info('Yandex Maps API is not loaded or blocked. Using fallback card.');
    if (fallbackElement) fallbackElement.style.display = 'flex';
    return;
  }

  ymaps.ready(() => {
    try {
      if (fallbackElement) fallbackElement.style.display = 'none';

      const studioCoords = LANDING_CONFIG.contacts.coordinates;

      const map = new ymaps.Map('yandexMap', {
        center: studioCoords,
        zoom: 16,
        controls: ['zoomControl', 'fullscreenControl', 'geolocationControl']
      }, {
        suppressMapOpenBlock: true,
        autoFitToViewport: 'always'
      });

      // Disable disruptive scroll zoom on standard page scrolling
      map.behaviors.disable('scrollZoom');

      // Create Custom Architectural Placemark
      const placemark = new ymaps.Placemark(studioCoords, {
        balloonContentHeader: '<div style="font-family: Space Grotesk, sans-serif; font-weight: 700; font-size: 16px; color: #18191B; margin-bottom: 4px;">MONOLITH ARCHITECTURE</div>',
        balloonContentBody: `
          <div style="font-family: Inter, sans-serif; font-size: 13px; color: #555; line-height: 1.5;">
            <p style="margin: 0 0 6px 0;"><strong>Адрес:</strong> ${LANDING_CONFIG.contacts.addressShort}</p>
            <p style="margin: 0 0 6px 0;"><strong>График:</strong> ${LANDING_CONFIG.schedule.weekdays.text}</p>
            <p style="margin: 0 0 10px 0;"><strong>Тел:</strong> <a href="tel:${LANDING_CONFIG.contacts.phoneRaw}" style="color: #18191B; font-weight: 600;">${LANDING_CONFIG.contacts.phoneFormatted}</a></p>
            <div style="display: inline-block; padding: 4px 8px; background: #18191B; color: #FFF; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;">
              Вход через центральный атриум
            </div>
          </div>
        `,
        balloonContentFooter: `
          <div style="margin-top: 8px;">
            <a href="${LANDING_CONFIG.contacts.yandexMapsUrl}" target="_blank" rel="noopener noreferrer" style="font-family: Space Grotesk, sans-serif; font-size: 11px; font-weight: 700; color: #18191B; text-decoration: underline;">
              Построить маршрут на Яндекс Картах →
            </a>
          </div>
        `,
        hintContent: 'Архитектурное бюро MONOLITH'
      }, {
        preset: 'islands#blackDotIconWithCaption',
        iconColor: '#18191B'
      });

      map.geoObjects.add(placemark);

      // Handle window resize dynamically
      window.addEventListener('resize', () => {
        map.container.fitToViewport();
      });

    } catch (err) {
      console.warn('Error during Yandex Maps initialization:', err);
      if (fallbackElement) fallbackElement.style.display = 'flex';
    }
  });
}

/**
 * ==========================================================================
 * 5. INTERACTIVE BEFORE / AFTER VISUAL RENOVATION SLIDER
 * --------------------------------------------------------------------------
 * Precise pixel-alignment drag slider supporting mouse drag, touch drag,
 * and keyboard range input with responsive inner image width synchronization.
 * ==========================================================================
 */
function initBeforeAfterSlider() {
  const slider = document.getElementById('baSlider');
  const beforeContainer = document.getElementById('baBeforeContainer');
  const beforeImg = document.getElementById('baBeforeImg');
  const handle = document.getElementById('baHandle');
  const rangeInput = document.getElementById('baRangeInput');

  if (!slider || !beforeContainer || !beforeImg || !handle) return;

  let isDragging = false;

  // Synchronize the inner clipped image's width to match slider's total width
  function syncDimensions() {
    const sliderWidth = slider.getBoundingClientRect().width;
    beforeImg.style.width = `${sliderWidth}px`;
  }

  // Set position in percentage (0 - 100)
  function setSliderPosition(percentage) {
    const clamped = Math.max(0, Math.min(100, percentage));
    beforeContainer.style.width = `${clamped}%`;
    handle.style.left = `${clamped}%`;
    if (rangeInput) rangeInput.value = clamped;
  }

  function handleMove(clientX) {
    const rect = slider.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;
    setSliderPosition(percentage);
  }

  // Mouse Events
  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    handleMove(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch Events (Mobile)
  slider.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Native Range Input Fallback for Accessibility
  if (rangeInput) {
    rangeInput.addEventListener('input', (e) => {
      setSliderPosition(parseFloat(e.target.value));
    });
  }

  // Initialize and listen to resize
  window.addEventListener('resize', syncDimensions);
  window.addEventListener('load', syncDimensions);
  syncDimensions();
  setSliderPosition(50);
}

/**
 * ==========================================================================
 * 6. INTERACTIVE PROJECT COST ESTIMATOR (CALCULATOR)
 * --------------------------------------------------------------------------
 * Instant real-time calculation based on service rate, area slider/input,
 * and engineering/supervision options. Direct CTA sync with the Modal.
 * ==========================================================================
 */
function initProjectCalculator() {
  const serviceButtons = document.querySelectorAll('#calcServiceTypes .calc-type-btn');
  const areaRange = document.getElementById('calcAreaRange');
  const areaInput = document.getElementById('calcAreaInput');

  // Option Checkboxes
  const optSupervision = document.getElementById('optSupervision');
  const optEngineering = document.getElementById('optEngineering');
  const optAnimation = document.getElementById('optAnimation');
  const optProcurement = document.getElementById('optProcurement');

  // Result Displays
  const totalPriceEl = document.getElementById('calcTotalPrice');
  const pricePerMeterEl = document.getElementById('calcPricePerMeter');
  const selectedServiceEl = document.getElementById('calcSelectedService');
  const summaryAreaEl = document.getElementById('calcSummaryArea');
  const estimatedTimeEl = document.getElementById('calcEstimatedTime');
  const docVolumeEl = document.getElementById('calcDocVolume');
  const deliverablesListEl = document.getElementById('calcDeliverablesList');
  const calcSubmitBtn = document.getElementById('calcSubmitBtn');

  if (!serviceButtons.length || !areaRange || !areaInput || !totalPriceEl) return;

  // Current State
  let currentRate = 4500;
  let currentServiceName = 'Архитектурное проектирование виллы';
  let currentArea = parseInt(areaRange.value, 10) || 350;

  // Format currency with standard Russian spaces
  function formatMoney(amount) {
    return Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
  }

  // Recalculate total budget & update metrics
  function calculate() {
    // 1. Base cost
    const baseCost = currentArea * currentRate;

    // 2. Percentage modifiers
    let percentModifier = 0;
    if (optSupervision && optSupervision.checked) percentModifier += 0.15;
    if (optEngineering && optEngineering.checked) percentModifier += 0.20;
    if (optProcurement && optProcurement.checked) percentModifier += 0.10;

    const modifierCost = baseCost * percentModifier;

    // 3. Fixed additions
    let fixedCost = 0;
    if (optAnimation && optAnimation.checked) fixedCost += 120000;

    const totalCost = baseCost + modifierCost + fixedCost;
    const costPerMeter = Math.round(totalCost / currentArea);

    // 4. Calculate Timeline (Months)
    let baseMonths = (currentArea / 100) * 0.9;
    if (baseMonths < 2.5) baseMonths = 2.5;
    if (baseMonths > 8.0) baseMonths = 8.0;
    const minMonths = (baseMonths * 0.9).toFixed(1);
    const maxMonths = (baseMonths * 1.2).toFixed(1);

    // 5. Calculate Document Volume (Sheets)
    const baseSheets = Math.round(currentArea * 0.45);
    const minSheets = Math.max(80, baseSheets - 20);
    const maxSheets = baseSheets + 40;

    // 6. Update DOM
    totalPriceEl.textContent = formatMoney(totalCost);
    pricePerMeterEl.textContent = `≈ ${formatMoney(costPerMeter)} / м²`;
    selectedServiceEl.textContent = currentServiceName;
    summaryAreaEl.textContent = `${currentArea} м²`;
    estimatedTimeEl.textContent = `${minMonths} – ${maxMonths} месяца`;
    docVolumeEl.textContent = `≈ ${minSheets}–${maxSheets} листов рабочей документации`;

    // Dynamic deliverables list
    const deliverables = [
      '3D-концепция и посадка на рельеф',
      'Архитектурные и конструктивные решения (АР, КР)',
      'Ведомость отделочных материалов и спецификации'
    ];
    if (optEngineering && optEngineering.checked) {
      deliverables.push('Инженерные разделы BIM: ОВиК, ЭОМ, ВК');
    }
    if (optSupervision && optSupervision.checked) {
      deliverables.push('Авторский надзор на стройплощадке');
    }
    if (optAnimation && optAnimation.checked) {
      deliverables.push('4K 3D-анимация и VR-визуализация');
    }
    if (optProcurement && optProcurement.checked) {
      deliverables.push('Комплектация и скидки от фабрик до 25%');
    }

    deliverablesListEl.innerHTML = deliverables
      .map(item => `<li>✓ ${item}</li>`)
      .join('');
  }

  // Service Type Switch
  serviceButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      serviceButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');

      currentRate = parseInt(btn.dataset.rate, 10);
      currentServiceName = btn.dataset.serviceName;
      calculate();
    });
  });

  // Slider & Number Input Sync
  areaRange.addEventListener('input', (e) => {
    currentArea = parseInt(e.target.value, 10);
    areaInput.value = currentArea;
    calculate();
  });

  areaInput.addEventListener('input', (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) val = 50;
    if (val < 50) val = 50;
    if (val > 2500) val = 2500;
    currentArea = val;
    areaRange.value = val;
    calculate();
  });

  // Checkbox triggers
  [optSupervision, optEngineering, optAnimation, optProcurement].forEach((chk) => {
    if (chk) chk.addEventListener('change', calculate);
  });

  // Sync to Modal on Submit
  if (calcSubmitBtn) {
    calcSubmitBtn.addEventListener('click', () => {
      const modal = document.getElementById('consultationModal');
      const formService = document.getElementById('formCalcService');
      const formArea = document.getElementById('formCalcArea');
      const formPrice = document.getElementById('formCalcPrice');
      const modalSubtitle = document.getElementById('modalSubtitle');

      if (formService) formService.value = currentServiceName;
      if (formArea) formArea.value = `${currentArea} м²`;
      if (formPrice) formPrice.value = totalPriceEl.textContent;

      if (modalSubtitle) {
        modalSubtitle.innerHTML = `
          Расчет по калькулятору: <strong>${currentServiceName} (${currentArea} м²)</strong>.<br>
          Ориентировочный бюджет: <strong>${totalPriceEl.textContent}</strong>. Оставьте контакты для получения развернутого коммерческого предложения.
        `;
      }

      openModal('consultationModal');
    });
  }

  // Run initial calculation
  calculate();
}

/**
 * ==========================================================================
 * 7. PORTFOLIO FILTER SYSTEM
 * --------------------------------------------------------------------------
 * Instant category switching with clean DOM state.
 * ==========================================================================
 */
function initPortfolioFilters() {
  const filterButtons = document.querySelectorAll('.portfolio-filters .filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetFilter = btn.dataset.filter;

      // Update button active state
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filter cards
      projectCards.forEach((card) => {
        const category = card.dataset.category;
        if (targetFilter === 'all' || category === targetFilter) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

/**
 * ==========================================================================
 * 8. FAQ ACCORDION COMPONENT
 * --------------------------------------------------------------------------
 * Accessible accordion with ARIA support and smooth expand/collapse.
 * ==========================================================================
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('#faqAccordion .faq-item');

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-item__trigger');
    const panel = item.querySelector('.faq-item__panel');

    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items for a clean single-open behavior
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          const otherTrigger = other.querySelector('.faq-item__trigger');
          const otherPanel = other.querySelector('.faq-item__panel');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherPanel) otherPanel.setAttribute('hidden', '');
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        panel.setAttribute('hidden', '');
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        panel.removeAttribute('hidden');
      }
    });
  });
}

/**
 * ==========================================================================
 * 9. STRICT PHONE MASK (+7 (___) ___-__-__)
 * --------------------------------------------------------------------------
 * Production-ready input mask enforcing +7 format with correct backspace
 * and caret behavior.
 * ==========================================================================
 */
function initPhoneMask() {
  const phoneInputs = document.querySelectorAll('.phone-mask-input');

  phoneInputs.forEach((input) => {
    function onPhoneInput(e) {
      let inputVal = input.value.replace(/\D/g, '');
      const isBackspace = e.inputType === 'deleteContentBackward';

      // Always prefix with 7
      if (inputVal.startsWith('8') || inputVal.startsWith('7')) {
        inputVal = inputVal.substring(1);
      }

      let formatted = '+7 (';

      if (inputVal.length > 0) {
        formatted += inputVal.substring(0, 3);
      }
      if (inputVal.length >= 3) {
        formatted += ') ' + inputVal.substring(3, 6);
      }
      if (inputVal.length >= 6) {
        formatted += '-' + inputVal.substring(6, 8);
      }
      if (inputVal.length >= 8) {
        formatted += '-' + inputVal.substring(8, 10);
      }

      if (inputVal.length === 0 && isBackspace) {
        input.value = '';
      } else {
        input.value = formatted;
      }
    }

    function onPhoneKeyDown(e) {
      // Clear field if backspacing when only prefix remains
      if (e.key === 'Backspace' && input.value.length <= 4) {
        input.value = '';
      }
    }

    function onPhoneFocus() {
      if (!input.value) {
        input.value = '+7 (';
      }
    }

    function onPhoneBlur() {
      if (input.value === '+7 (' || input.value === '+7') {
        input.value = '';
      }
    }

    input.addEventListener('input', onPhoneInput);
    input.addEventListener('keydown', onPhoneKeyDown);
    input.addEventListener('focus', onPhoneFocus);
    input.addEventListener('blur', onPhoneBlur);
  });
}

/**
 * ==========================================================================
 * 10. MODAL DIALOG & LEAD CAPTURE SYSTEM
 * --------------------------------------------------------------------------
 * Accessible modal management, full field validation, realistic submission
 * simulation, localStorage persistence, and clear architectural success state.
 * ==========================================================================
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  // Focus on first input
  const firstInput = modal.querySelector('input:not([type="hidden"]), select, textarea');
  if (firstInput) setTimeout(() => firstInput.focus(), 100);
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function initModals() {
  // Open buttons
  const openButtons = document.querySelectorAll('.open-modal-btn');
  openButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.modalTarget || 'consultationModal';
      const projectRef = btn.dataset.projectRef;
      const serviceRef = btn.dataset.serviceRef;

      // Handle contextual project/service references
      const formProjectRef = document.getElementById('formProjectRef');
      const formCalcService = document.getElementById('formCalcService');
      const modalSubtitle = document.getElementById('modalSubtitle');

      if (projectRef && formProjectRef) {
        formProjectRef.value = projectRef;
        if (modalSubtitle) {
          modalSubtitle.innerHTML = `Запрос портфолио и проектной документации по объекту: <strong>${projectRef}</strong>.`;
        }
      } else if (serviceRef && formCalcService) {
        formCalcService.value = serviceRef;
        if (modalSubtitle) {
          modalSubtitle.innerHTML = `Обсуждение формата сотрудничества: <strong>${serviceRef}</strong>.`;
        }
      }

      openModal(targetId);
    });
  });

  // Close buttons
  const closeBtn = document.getElementById('modalCloseBtn');
  const backdrop = document.getElementById('modalBackdrop');
  const successCloseBtn = document.getElementById('modalSuccessCloseBtn');

  if (closeBtn) closeBtn.addEventListener('click', () => closeModal('consultationModal'));
  if (backdrop) backdrop.addEventListener('click', () => closeModal('consultationModal'));
  if (successCloseBtn) {
    successCloseBtn.addEventListener('click', () => {
      closeModal('consultationModal');
      // Reset view to form
      const formContainer = document.getElementById('modalFormContainer');
      const successContainer = document.getElementById('modalSuccessContainer');
      if (formContainer) formContainer.removeAttribute('hidden');
      if (successContainer) successContainer.setAttribute('hidden', '');
    });
  }

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal.active');
      if (activeModal) closeModal(activeModal.id);
    }
  });

  // Lead Form Submission & Validation
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('leadName');
      const phoneInput = document.getElementById('leadPhone');
      const emailInput = document.getElementById('leadEmail');
      const objectSelect = document.getElementById('leadObjectType');
      const messageInput = document.getElementById('leadMessage');
      const consentCheckbox = document.getElementById('leadConsent');

      const nameError = document.getElementById('nameError');
      const phoneError = document.getElementById('phoneError');
      const emailError = document.getElementById('emailError');
      const consentError = document.getElementById('consentError');
      const submitBtn = document.getElementById('leadSubmitBtn');

      let isValid = true;

      // Validate Name (at least 2 characters)
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameInput.classList.add('error');
        if (nameError) nameError.classList.add('visible');
        isValid = false;
      } else {
        nameInput.classList.remove('error');
        if (nameError) nameError.classList.remove('visible');
      }

      // Validate Phone (must contain full digits)
      const digitsOnly = phoneInput.value.replace(/\D/g, '');
      if (digitsOnly.length < 11) {
        phoneInput.classList.add('error');
        if (phoneError) phoneError.classList.add('visible');
        isValid = false;
      } else {
        phoneInput.classList.remove('error');
        if (phoneError) phoneError.classList.remove('visible');
      }

      // Validate Email (optional, but must be valid if entered)
      if (emailInput.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
          emailInput.classList.add('error');
          if (emailError) emailError.classList.add('visible');
          isValid = false;
        } else {
          emailInput.classList.remove('error');
          if (emailError) emailError.classList.remove('visible');
        }
      }

      // Validate Consent Checkbox
      if (!consentCheckbox.checked) {
        if (consentError) consentError.classList.add('visible');
        isValid = false;
      } else {
        if (consentError) consentError.classList.remove('visible');
      }

      if (!isValid) return;

      // Disable button and show sending state
      submitBtn.disabled = true;
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="btn__text">Отправка в бюро...</span>';

      // Prepare lead payload
      const ticketNum = '#M-' + Math.floor(100 + Math.random() * 900);
      const leadData = {
        ticket: ticketNum,
        createdAt: new Date().toISOString(),
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        email: emailInput.value.trim() || 'не указан',
        objectType: objectSelect ? objectSelect.value : 'Загородная вилла',
        message: messageInput ? messageInput.value.trim() : '',
        calcService: document.getElementById('formCalcService')?.value || 'Не рассчитывалось',
        calcArea: document.getElementById('formCalcArea')?.value || '—',
        calcPrice: document.getElementById('formCalcPrice')?.value || '—',
        projectRef: document.getElementById('formProjectRef')?.value || 'Общий запрос'
      };

      // Simulate network persistence to localStorage
      setTimeout(() => {
        try {
          const existingLeads = JSON.parse(localStorage.getItem('monolith_leads') || '[]');
          existingLeads.push(leadData);
          localStorage.setItem('monolith_leads', JSON.stringify(existingLeads));
        } catch (storageErr) {
          console.warn('Could not write to localStorage:', storageErr);
        }

        // Show Success Container
        const formContainer = document.getElementById('modalFormContainer');
        const successContainer = document.getElementById('modalSuccessContainer');
        const ticketNumEl = document.getElementById('successTicketNum');
        const detailsBox = document.getElementById('successDetailsBox');

        if (ticketNumEl) ticketNumEl.textContent = ticketNum;

        if (detailsBox) {
          detailsBox.innerHTML = `
            <div><strong>Заявитель:</strong> ${leadData.name} (${leadData.phone})</div>
            <div><strong>Объект:</strong> ${leadData.objectType}</div>
            ${leadData.calcPrice !== '—' ? `<div><strong>Оценка бюджета:</strong> ${leadData.calcPrice} (${leadData.calcArea})</div>` : ''}
          `;
        }

        if (formContainer) formContainer.setAttribute('hidden', '');
        if (successContainer) successContainer.removeAttribute('hidden');

        // Reset form controls
        leadForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

      }, 500);
    });
  }
}

/**
 * ==========================================================================
 * 11. MOBILE DRAWER NAVIGATION
 * --------------------------------------------------------------------------
 * Smooth off-canvas drawer navigation with keyboard & backdrop controls.
 * ==========================================================================
 */
function initMobileDrawer() {
  const burgerBtn = document.getElementById('burgerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.mobile-drawer__link');

  if (!burgerBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    burgerBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('drawer-open');
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('drawer-open');
  }

  burgerBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/**
 * ==========================================================================
 * 12. SMOOTH SCROLL & HEADER ELEVATION
 * --------------------------------------------------------------------------
 * Subtly styles the sticky header when scrolled past threshold.
 * ==========================================================================
 */
function initHeaderScrollEffect() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.06)';
      header.style.backgroundColor = 'rgba(239, 236, 230, 0.98)';
    } else {
      header.style.boxShadow = 'none';
      header.style.backgroundColor = 'rgba(239, 236, 230, 0.94)';
    }
  }, { passive: true });
}

/**
 * ==========================================================================
 * INITIALIZATION RUNNER
 * ==========================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
  initDOMBindings();
  updateLiveStudioStatus();
  initBeforeAfterSlider();
  initProjectCalculator();
  initPortfolioFilters();
  initFaqAccordion();
  initPhoneMask();
  initModals();
  initMobileDrawer();
  initHeaderScrollEffect();
  initYandexMap();

  // Periodically refresh the studio open/closed status every 60 seconds
  setInterval(updateLiveStudioStatus, 60000);
});
