/**
 * ==============================================================================
 * SYNAPSE HUB — CYBERPUNK TECH & HACKER COWORKING LANDING ENGINE
 * ==============================================================================
 * Central configuration object and interactive modules:
 * 1. LANDING_CONFIG (Contacts, schedule, coordinates, social, tariffs)
 * 2. DOM Data Binder (Binds config to HTML elements with data-bind)
 * 3. Live MSK Clock & System Telemetry Simulator
 * 4. Interactive Desk & Room Calculator / Availability Engine
 * 5. Gallery Filter Tabs
 * 6. FAQ Accordion Component
 * 7. Phone Input Mask (+7 (___) ___-__-__)
 * 8. Lead Capture Modal & Validation with Cyber Terminal Output
 * 9. Yandex Maps 2.1 Initialization & Custom Marker
 * 10. Mobile Drawer Navigation & Smooth Scrolling
 * ==============================================================================
 */

'use strict';

/**
 * ------------------------------------------------------------------------------
 * 1. LANDING CONFIGURATION
 * Edit your organization details, coordinates, contacts and tariffs here.
 * ------------------------------------------------------------------------------
 */
const LANDING_CONFIG = {
  brand: {
    name: 'SYNAPSE Hub',
    shortName: 'SYNAPSE',
    tagline: 'Киберпанк-коворкинг и хакерспейс 24/7 в Москве',
    badge: 'ONLINE 24/7',
    description: 'Круглосуточный автономный технологический хаб на Artplay с 10 Gbps оптикой, серверной стойкой под ноды, паяльной лабораторией и капсулами сна.'
  },
  contacts: {
    phone: '+7 (495) 109-88-24',
    phoneClean: '+74951098824',
    email: 'access@synapse-hub.tech',
    address: 'Москва, ул. Нижняя Сыромятническая, д. 10, стр. 2',
    addressDetails: 'Центр дизайна Artplay, Корпус 2, Вход B, 3 этаж',
    metro: 'Курская / Чкаловская (8 минут пешком)',
    schedule: 'Круглосуточно 24/7/365 (Без выходных)',
    receptionHours: 'Ресепшн: ежедневно с 09:00 до 22:00'
  },
  location: {
    // Координаты центра Artplay (корпус 2)
    coordinates: [55.758836, 37.653421],
    zoom: 16,
    placemarkTitle: 'SYNAPSE Hub [24/7]',
    placemarkSubtitle: 'Artplay, стр. 2, вход B (3 этаж)'
  },
  social: {
    telegram: 'https://t.me/synapse_hub_msk',
    github: 'https://github.com/synapse-hub',
    discord: 'https://discord.gg/synapse-hub'
  },
  pricing: {
    hotdesk: {
      id: 'hotdesk',
      name: 'Hot Desk 24/7',
      basePrice: 18000,
      periodType: 'month',
      availableSlots: 8
    },
    dedicated: {
      id: 'dedicated',
      name: 'Dedicated Cyber',
      basePrice: 28000,
      periodType: 'month',
      availableSlots: 4
    },
    office: {
      id: 'office',
      name: 'Team Cyber Suite',
      basePrice: 95000,
      periodType: 'month',
      availableSlots: 1
    },
    daypass: {
      id: 'daypass',
      name: 'Hacker Day Pass',
      basePrice: 2000,
      periodType: 'day',
      availableSlots: 12
    }
  }
};

/**
 * ------------------------------------------------------------------------------
 * 2. DOM DATA BINDER
 * Automatically updates DOM elements with data-bind attributes matching config
 * ------------------------------------------------------------------------------
 */
function initDOMBinder() {
  // Bind simple text
  document.querySelectorAll('[data-bind="phone"]').forEach(el => {
    el.textContent = LANDING_CONFIG.contacts.phone;
  });

  document.querySelectorAll('[data-bind="phone-link"]').forEach(el => {
    el.setAttribute('href', `tel:${LANDING_CONFIG.contacts.phoneClean}`);
  });

  document.querySelectorAll('[data-bind="email"]').forEach(el => {
    el.textContent = LANDING_CONFIG.contacts.email;
  });

  document.querySelectorAll('[data-bind="email-link"]').forEach(el => {
    el.setAttribute('href', `mailto:${LANDING_CONFIG.contacts.email}`);
  });

  document.querySelectorAll('[data-bind="address"]').forEach(el => {
    el.textContent = LANDING_CONFIG.contacts.address;
  });

  document.querySelectorAll('[data-bind="metro"]').forEach(el => {
    el.textContent = LANDING_CONFIG.contacts.metro;
  });

  document.querySelectorAll('[data-bind="schedule"]').forEach(el => {
    el.textContent = LANDING_CONFIG.contacts.schedule;
  });

  document.querySelectorAll('[data-bind="status"]').forEach(el => {
    el.textContent = LANDING_CONFIG.brand.badge;
  });

  document.querySelectorAll('[data-bind="tg-link"]').forEach(el => {
    el.setAttribute('href', LANDING_CONFIG.social.telegram);
  });
}

/**
 * ------------------------------------------------------------------------------
 * 3. LIVE MSK CLOCK & TELEMETRY SIMULATOR
 * Realistic Moscow time ticker + telemetry bandwidth jitter
 * ------------------------------------------------------------------------------
 */
function initLiveClockAndTelemetry() {
  const clockEl = document.getElementById('live-clock');
  const trafficEl = document.getElementById('traffic-num');

  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    // Format to Moscow Time (UTC+3)
    const options = {
      timeZone: 'Europe/Moscow',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    clockEl.textContent = new Intl.DateTimeFormat('ru-RU', options).format(now);
  }

  updateClock();
  setInterval(updateClock, 1000);

  // Subtle traffic jitter simulation (between 2.2 and 2.9 Gbps)
  if (trafficEl) {
    setInterval(() => {
      const jitter = (2.1 + Math.random() * 0.7).toFixed(1);
      trafficEl.textContent = jitter;
    }, 4500);
  }
}

/**
 * ------------------------------------------------------------------------------
 * 4. INTERACTIVE DESK & ROOM CALCULATOR
 * Reactive calculation of plan + duration discount + optional hardware modules
 * ------------------------------------------------------------------------------
 */
function initInteractiveCalculator() {
  const planRadios = document.querySelectorAll('input[name="calc-plan"]');
  const periodPills = document.querySelectorAll('.period-pill');
  const periodGroup = document.getElementById('period-group');
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox input[type="checkbox"]');
  
  // Summary DOM nodes
  const sumPlanName = document.getElementById('sum-plan-name');
  const sumPeriodName = document.getElementById('sum-period-name');
  const sumDiscountName = document.getElementById('sum-discount-name');
  const sumAddonsCount = document.getElementById('sum-addons-count');
  const calcTotalPrice = document.getElementById('calc-total-price');
  const calcPerMonth = document.getElementById('calc-per-month');
  const availSlotsText = document.getElementById('avail-slots-text');
  const calcSubmitBtn = document.getElementById('calc-submit-btn');

  // Internal state
  let currentPlanKey = 'hotdesk';
  let currentPeriodMonths = 1;
  let currentDiscountPercent = 0;

  // Format currency
  function formatMoney(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
  }

  function recalculate() {
    const plan = LANDING_CONFIG.pricing[currentPlanKey];
    if (!plan) return;

    const isDayPass = plan.periodType === 'day';

    // Show/hide period options if day pass
    if (periodGroup) {
      if (isDayPass) {
        periodGroup.style.opacity = '0.4';
        periodGroup.style.pointerEvents = 'none';
      } else {
        periodGroup.style.opacity = '1';
        periodGroup.style.pointerEvents = 'auto';
      }
    }

    // Calculate addons
    let addonsTotal = 0;
    let selectedAddonNames = [];
    addonCheckboxes.forEach(cb => {
      if (cb.checked) {
        const val = parseInt(cb.value, 10) || 0;
        addonsTotal += val;
        selectedAddonNames.push(cb.getAttribute('data-name'));
      }
    });

    let total = 0;
    let perMonth = 0;
    let discountSum = 0;

    if (isDayPass) {
      total = plan.basePrice + addonsTotal;
      perMonth = total;
      if (sumPeriodName) sumPeriodName.textContent = '1 сутки (24 часа)';
      if (sumDiscountName) sumDiscountName.textContent = '0% (0 ₽)';
      if (calcPerMonth) calcPerMonth.textContent = 'разовый платеж за сутки';
    } else {
      const baseMonthly = plan.basePrice + addonsTotal;
      const rawTotal = baseMonthly * currentPeriodMonths;
      discountSum = Math.round(rawTotal * (currentDiscountPercent / 100));
      total = rawTotal - discountSum;
      perMonth = Math.round(total / currentPeriodMonths);

      if (sumPeriodName) {
        sumPeriodName.textContent = `${currentPeriodMonths} ${getRussianMonthDeclension(currentPeriodMonths)}`;
      }
      if (sumDiscountName) {
        if (currentDiscountPercent > 0) {
          sumDiscountName.textContent = `-${currentDiscountPercent}% (-${formatMoney(discountSum)})`;
          sumDiscountName.classList.add('green-text');
        } else {
          sumDiscountName.textContent = '0% (0 ₽)';
          sumDiscountName.classList.remove('green-text');
        }
      }
      if (calcPerMonth) {
        calcPerMonth.textContent = `${formatMoney(perMonth)} в месяц`;
      }
    }

    // Update DOM
    if (sumPlanName) sumPlanName.textContent = plan.name;
    if (sumAddonsCount) {
      sumAddonsCount.textContent = selectedAddonNames.length > 0 
        ? `${selectedAddonNames.length} шт. (+${formatMoney(addonsTotal)})`
        : 'Не выбрано';
    }
    if (calcTotalPrice) calcTotalPrice.textContent = formatMoney(total);
    if (availSlotsText) {
      availSlotsText.textContent = `Осталось ${plan.availableSlots} свободных слотов на этот формат`;
    }

    // Store state in submit button for modal forwarding
    if (calcSubmitBtn) {
      calcSubmitBtn.setAttribute('data-plan-name', plan.name);
      calcSubmitBtn.setAttribute('data-total-formatted', formatMoney(total));
      calcSubmitBtn.setAttribute('data-addons', selectedAddonNames.join(', '));
      calcSubmitBtn.setAttribute('data-duration', isDayPass ? '1 сутки' : `${currentPeriodMonths} мес`);
    }
  }

  function getRussianMonthDeclension(months) {
    if (months === 1) return 'месяц';
    if (months >= 2 && months <= 4) return 'месяца';
    return 'месяцев';
  }

  // Radio button click listener
  planRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.plan-radio-card').forEach(c => c.classList.remove('active'));
      radio.closest('.plan-radio-card').classList.add('active');
      currentPlanKey = radio.value;
      recalculate();
    });
  });

  // Period pill click listener
  periodPills.forEach(pill => {
    pill.addEventListener('click', () => {
      periodPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentPeriodMonths = parseInt(pill.getAttribute('data-period'), 10) || 1;
      currentDiscountPercent = parseInt(pill.getAttribute('data-discount'), 10) || 0;
      recalculate();
    });
  });

  // Addons listener
  addonCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      recalculate();
    });
  });

  // Submit button opens lead modal pre-populated
  if (calcSubmitBtn) {
    calcSubmitBtn.addEventListener('click', () => {
      const planName = calcSubmitBtn.getAttribute('data-plan-name') || 'Hot Desk 24/7';
      const total = calcSubmitBtn.getAttribute('data-total-formatted') || '18 000 ₽';
      const addons = calcSubmitBtn.getAttribute('data-addons') || '';
      const duration = calcSubmitBtn.getAttribute('data-duration') || '1 месяц';

      let fullPlanTitle = `${planName} (${duration}) — ${total}`;
      if (addons) {
        fullPlanTitle += ` [Модули: ${addons}]`;
      }

      openLeadModal(fullPlanTitle, total);
    });
  }

  // Initial calculation
  recalculate();
}

/**
 * ------------------------------------------------------------------------------
 * 5. GALLERY FILTER TABS
 * Filters workspace zone cards smoothly
 * ------------------------------------------------------------------------------
 */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const zoneCards = document.querySelectorAll('.zone-card');

  if (!filterBtns.length || !zoneCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetFilter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      zoneCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (targetFilter === 'all' || targetFilter === cardCat) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/**
 * ------------------------------------------------------------------------------
 * 6. FAQ ACCORDION COMPONENT
 * Handles smooth open/close transitions and aria attributes
 * ------------------------------------------------------------------------------
 */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerEl = item.querySelector('.faq-answer');

    if (!questionBtn || !answerEl) return;

    questionBtn.addEventListener('click', () => {
      const isAlreadyActive = item.classList.contains('active');

      // Close all other accordion items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question');
          const otherAns = otherItem.querySelector('.faq-answer');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAns) otherAns.style.maxHeight = '0px';
        }
      });

      // Toggle clicked item
      if (isAlreadyActive) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
        answerEl.style.maxHeight = '0px';
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
        answerEl.style.maxHeight = answerEl.scrollHeight + 'px';
      }
    });
  });
}

/**
 * ------------------------------------------------------------------------------
 * 7. PHONE INPUT MASK
 * Strict +7 (___) ___-__-__ format enforcement with backspace and paste handling
 * ------------------------------------------------------------------------------
 */
function initPhoneMask() {
  const phoneInput = document.getElementById('lead-phone');
  if (!phoneInput) return;

  function formatPhoneNumber(value) {
    if (!value) return '';
    // Strip non-digits
    let digits = value.replace(/\D/g, '');

    // Normalize Russian prefixes 8 or 7
    if (digits.startsWith('7') || digits.startsWith('8')) {
      digits = digits.substring(1);
    }

    // Limit to 10 digits after country code
    digits = digits.substring(0, 10);

    let result = '+7';

    if (digits.length > 0) {
      result += ' (' + digits.substring(0, 3);
    }
    if (digits.length >= 3) {
      result += ') ' + digits.substring(3, 6);
    }
    if (digits.length >= 6) {
      result += '-' + digits.substring(6, 8);
    }
    if (digits.length >= 8) {
      result += '-' + digits.substring(8, 10);
    }

    return result;
  }

  phoneInput.addEventListener('input', (e) => {
    const val = e.target.value;
    e.target.value = formatPhoneNumber(val);
  });

  phoneInput.addEventListener('focus', (e) => {
    if (!e.target.value) {
      e.target.value = '+7 (';
    }
  });

  phoneInput.addEventListener('keydown', (e) => {
    // If user deletes +7 (, clear whole field
    if (e.key === 'Backspace' && phoneInput.value.length <= 4) {
      phoneInput.value = '';
    }
  });
}

/**
 * ------------------------------------------------------------------------------
 * 8. LEAD CAPTURE MODAL & FORM VALIDATION
 * Handles lead submission with cyber terminal confirmation and error alerts
 * ------------------------------------------------------------------------------
 */
let currentModalPlan = 'Бесплатный тест-день';

function openLeadModal(planName, totalFormatted = '') {
  const modal = document.getElementById('lead-modal');
  const planDisplay = document.getElementById('modal-plan-display');
  const planInput = document.getElementById('form-plan-input');
  const totalInput = document.getElementById('form-total-input');
  const formView = document.getElementById('modal-form-view');
  const successView = document.getElementById('modal-success-view');

  if (!modal) return;

  currentModalPlan = planName || 'Бесплатный тест-день';

  if (planDisplay) planDisplay.textContent = currentModalPlan;
  if (planInput) planInput.value = currentModalPlan;
  if (totalInput) totalInput.value = totalFormatted || '0 ₽';

  // Reset views
  if (formView) formView.classList.remove('hidden');
  if (successView) successView.classList.add('hidden');

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Auto focus name input
  setTimeout(() => {
    const nameInput = document.getElementById('lead-name');
    if (nameInput) nameInput.focus();
  }, 100);
}

function closeLeadModal() {
  const modal = document.getElementById('lead-modal');
  if (!modal) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initLeadModal() {
  const modal = document.getElementById('lead-modal');
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close');
  const successCloseBtn = document.getElementById('success-close-btn');
  const openButtons = document.querySelectorAll('.open-modal-btn');
  const leadForm = document.getElementById('lead-form');

  // Open modal buttons
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const plan = btn.getAttribute('data-plan') || 'Бесплатный тест-день';
      openLeadModal(plan);
    });
  });

  // Close handlers
  if (backdrop) backdrop.addEventListener('click', closeLeadModal);
  if (closeBtn) closeBtn.addEventListener('click', closeLeadModal);
  if (successCloseBtn) successCloseBtn.addEventListener('click', closeLeadModal);

  // Privacy modal handlers
  const privacyModal = document.getElementById('privacy-modal');
  const privacyBackdrop = document.getElementById('privacy-backdrop');
  const privacyClose = document.getElementById('privacy-close');
  const privacyLinks = document.querySelectorAll('a[href="#privacy"]');

  privacyLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (privacyModal) {
        privacyModal.classList.add('active');
        privacyModal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  if (privacyBackdrop) {
    privacyBackdrop.addEventListener('click', () => {
      privacyModal.classList.remove('active');
      privacyModal.setAttribute('aria-hidden', 'true');
    });
  }

  if (privacyClose) {
    privacyClose.addEventListener('click', () => {
      privacyModal.classList.remove('active');
      privacyModal.setAttribute('aria-hidden', 'true');
    });
  }

  // Escape key closes modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLeadModal();
      if (privacyModal) privacyModal.classList.remove('active');
    }
  });

  // Form submit handler with validation
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('lead-name');
      const phoneInput = document.getElementById('lead-phone');
      const agreeInput = document.getElementById('lead-agree');

      const nameError = document.getElementById('name-error');
      const phoneError = document.getElementById('phone-error');
      const agreeError = document.getElementById('agree-error');

      let isValid = true;

      // Validate name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameInput.classList.add('invalid');
        if (nameError) nameError.classList.add('active');
        isValid = false;
      } else {
        nameInput.classList.remove('invalid');
        if (nameError) nameError.classList.remove('active');
      }

      // Validate phone (+7 (XXX) XXX-XX-XX = 18 chars)
      const digitsOnly = phoneInput.value.replace(/\D/g, '');
      if (digitsOnly.length < 11) {
        phoneInput.classList.add('invalid');
        if (phoneError) phoneError.classList.add('active');
        isValid = false;
      } else {
        phoneInput.classList.remove('invalid');
        if (phoneError) phoneError.classList.remove('active');
      }

      // Validate agreement
      if (!agreeInput.checked) {
        if (agreeError) agreeError.classList.add('active');
        isValid = false;
      } else {
        if (agreeError) agreeError.classList.remove('active');
      }

      if (!isValid) return;

      // Simulated submission to server
      const submitBtn = document.getElementById('lead-submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="btn-text">ШИФРОВАНИЕ И ПЕРЕДАЧА...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // Generate cyber hash
        const hashNum = Math.floor(1000 + Math.random() * 9000);
        const succHashEl = document.getElementById('succ-hash');
        const succPlanEl = document.getElementById('succ-plan');

        if (succHashEl) succHashEl.textContent = `#SYN-${hashNum}-BGP`;
        if (succPlanEl) succPlanEl.textContent = currentModalPlan;

        // Switch to success view
        const formView = document.getElementById('modal-form-view');
        const successView = document.getElementById('modal-success-view');

        if (formView) formView.classList.add('hidden');
        if (successView) successView.classList.remove('hidden');

        // Reset form
        leadForm.reset();
      }, 700);
    });
  }
}

/**
 * ------------------------------------------------------------------------------
 * 9. YANDEX MAPS INITIALIZATION
 * Modern dark themed pin at Artplay coordinates [55.758836, 37.653421]
 * ------------------------------------------------------------------------------
 */
function initYandexMaps() {
  const mapContainer = document.getElementById('yandex-map');
  const mapFallback = document.getElementById('map-fallback');

  if (!mapContainer) return;

  // Check if ymaps is loaded from CDN
  if (typeof ymaps === 'undefined') {
    console.warn('[SYNAPSE Hub] Yandex Maps SDK is not available. Keeping fallback card.');
    return;
  }

  ymaps.ready(() => {
    try {
      const centerCoords = LANDING_CONFIG.location.coordinates; // [55.758836, 37.653421]

      const myMap = new ymaps.Map('yandex-map', {
        center: centerCoords,
        zoom: LANDING_CONFIG.location.zoom,
        controls: ['zoomControl', 'fullscreenControl']
      }, {
        suppressMapOpenBlock: true
      });

      // Custom placemark with cyber cyan style
      const myPlacemark = new ymaps.Placemark(centerCoords, {
        balloonContentHeader: `<div style="font-family:sans-serif; color:#00F0FF; font-weight:bold; font-size:14px;">${LANDING_CONFIG.location.placemarkTitle}</div>`,
        balloonContentBody: `<div style="font-family:sans-serif; color:#333; font-size:12px; margin-top:4px;">
          <strong>Адрес:</strong> ${LANDING_CONFIG.contacts.address}<br>
          <strong>Ориентир:</strong> ${LANDING_CONFIG.location.placemarkSubtitle}<br>
          <strong>Режим:</strong> ${LANDING_CONFIG.contacts.schedule}<br>
          <strong>Телефон:</strong> ${LANDING_CONFIG.contacts.phone}
        </div>`,
        hintContent: 'SYNAPSE Hub — Киберпанк-коворкинг 24/7'
      }, {
        preset: 'islands#nightDotIconWithCaption',
        iconColor: '#00F0FF'
      });

      myMap.geoObjects.add(myPlacemark);

      // Disable disruptive scroll wheel zoom until clicked
      myMap.behaviors.disable('scrollZoom');

      // Hide fallback spinner smoothly
      if (mapFallback) {
        mapFallback.style.transition = 'opacity 0.4s ease';
        mapFallback.style.opacity = '0';
        setTimeout(() => {
          mapFallback.style.display = 'none';
        }, 400);
      }
    } catch (err) {
      console.error('[SYNAPSE Hub] Error initializing Yandex Map:', err);
    }
  });
}

/**
 * ------------------------------------------------------------------------------
 * 10. MOBILE DRAWER NAVIGATION & SCROLL HANDLERS
 * ------------------------------------------------------------------------------
 */
function initNavigation() {
  const burgerBtn = document.getElementById('burger-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    if (drawer) {
      drawer.classList.add('active');
      drawer.setAttribute('aria-hidden', 'false');
      if (burgerBtn) burgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawer) {
      drawer.classList.remove('active');
      drawer.setAttribute('aria-hidden', 'true');
      if (burgerBtn) burgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (burgerBtn) burgerBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

/**
 * ------------------------------------------------------------------------------
 * ENTRY POINT
 * Initializes all modules when DOM is ready
 * ------------------------------------------------------------------------------
 */
document.addEventListener('DOMContentLoaded', () => {
  initDOMBinder();
  initLiveClockAndTelemetry();
  initInteractiveCalculator();
  initGalleryFilters();
  initFAQAccordion();
  initPhoneMask();
  initLeadModal();
  initYandexMaps();
  initNavigation();
});
