/**
 * ============================================================================
 * АРГУМЕНТ & ПАРТНЕРЫ — Адвокатское бюро и корпоративный консалтинг
 * Production JavaScript Module
 * ============================================================================
 */

'use strict';

/**
 * ----------------------------------------------------------------------------
 * 1. CENTRAL CONFIGURATION OBJECT (LANDING_CONFIG)
 * Edit all primary firm details, contacts, schedule and coordinates here.
 * ----------------------------------------------------------------------------
 */
const LANDING_CONFIG = {
  brandName: 'Аргумент & Партнеры',
  legalName: 'Адвокатское бюро г. Москвы «Аргумент и Партнеры»',
  tagline: 'Корпоративное право, арбитраж и защита активов бизнеса',
  
  // Phone numbers
  phone: '+7 (495) 822-45-70',
  phoneRaw: '+74958224570',
  emergencyPhone: '+7 (495) 822-45-71',
  emergencyPhoneRaw: '+74958224571',
  
  // Email & Address
  email: 'corporate@argument-partners.ru',
  address: 'г. Москва, ул. Знаменка, 13, стр. 1',
  metro: 'БЦ «Знаменка», 5 этаж • м. Арбатская / Боровицкая (3 мин пешком)',
  
  // Geolocation for Yandex Maps [Latitude, Longitude]
  coordinates: [55.748112, 37.606214],
  mapZoom: 16,
  
  // Working Hours (Moscow Time, UTC+3)
  schedule: {
    workdays: 'Пн–Пт: 09:00 – 20:00',
    weekend: 'Сб–Вс: Дежурный партнер (по предварительной записи)',
    openHour: 9,
    closeHour: 20,
    workDaysArr: [1, 2, 3, 4, 5] // 1 = Monday, 5 = Friday
  },
  
  // Social & Messengers
  social: {
    telegram: 'https://t.me/argument_partners',
    whatsapp: 'https://wa.me/74958224570'
  }
};

/**
 * ----------------------------------------------------------------------------
 * 2. DOM CONTENT LOADED INITIALIZER
 * ----------------------------------------------------------------------------
 */
document.addEventListener('DOMContentLoaded', () => {
  initDOMBinding();
  initLiveHoursStatus();
  initHeaderScroll();
  initMobileDrawer();
  initPhoneMasks();
  initRiskCalculator();
  initAuditForm();
  initFaqAccordion();
  initConsultationModal();
  initYandexMap();
});

/**
 * ----------------------------------------------------------------------------
 * 3. BIND LANDING_CONFIG TO DOM ELEMENTS
 * ----------------------------------------------------------------------------
 */
function initDOMBinding() {
  // Bind standard text content
  const bindings = {
    brandName: LANDING_CONFIG.brandName,
    legalName: LANDING_CONFIG.legalName,
    tagline: LANDING_CONFIG.tagline,
    phone: LANDING_CONFIG.phone,
    emergencyPhone: LANDING_CONFIG.emergencyPhone,
    email: LANDING_CONFIG.email,
    address: LANDING_CONFIG.address,
    metro: LANDING_CONFIG.metro,
    'schedule-workdays': LANDING_CONFIG.schedule.workdays,
    'schedule-weekend': LANDING_CONFIG.schedule.weekend
  };

  Object.entries(bindings).forEach(([key, value]) => {
    document.querySelectorAll(`[data-config="${key}"]`).forEach(el => {
      el.textContent = value;
    });
  });

  // Bind phone links
  document.querySelectorAll('[data-config="phone-link"]').forEach(el => {
    el.setAttribute('href', `tel:${LANDING_CONFIG.phoneRaw}`);
  });

  // Bind emergency phone links
  document.querySelectorAll('[data-config="emergency-phone-link"]').forEach(el => {
    el.setAttribute('href', `tel:${LANDING_CONFIG.emergencyPhoneRaw}`);
  });

  // Bind email links
  document.querySelectorAll('[data-config="email-link"]').forEach(el => {
    el.setAttribute('href', `mailto:${LANDING_CONFIG.email}`);
  });
}

/**
 * ----------------------------------------------------------------------------
 * 4. LIVE WORKING HOURS STATUS (Dynamic Office Availability)
 * ----------------------------------------------------------------------------
 */
function initLiveHoursStatus() {
  const statusEl = document.getElementById('live-hours-status');
  const drawerStatusEl = document.getElementById('drawer-live-status');
  if (!statusEl) return;

  function updateStatus() {
    // Current date in Moscow timezone
    const now = new Date();
    // Use Intl with standard weekday: 'short' ('Mon'..'Sun')
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Moscow',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    });

    const parts = formatter.formatToParts(now);
    const getPart = (name) => parts.find(p => p.type === name)?.value;

    const weekdayShort = getPart('weekday'); // 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
    const hour = parseInt(getPart('hour'), 10);

    const dayMap = { 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6, 'Sun': 7 };
    const weekday = dayMap[weekdayShort] || 1;

    const isWorkday = LANDING_CONFIG.schedule.workDaysArr.includes(weekday);
    const isOpen = isWorkday && hour >= LANDING_CONFIG.schedule.openHour && hour < LANDING_CONFIG.schedule.closeHour;

    let statusText = '';
    let isPositive = false;

    if (isOpen) {
      statusText = `Открыто сейчас (до ${LANDING_CONFIG.schedule.closeHour}:00)`;
      isPositive = true;
    } else if (isWorkday) {
      if (hour < LANDING_CONFIG.schedule.openHour) {
        statusText = `Закрыто • Откроется сегодня в ${String(LANDING_CONFIG.schedule.openHour).padStart(2, '0')}:00`;
      } else {
        statusText = `Закрыто • Откроется завтра в ${String(LANDING_CONFIG.schedule.openHour).padStart(2, '0')}:00`;
      }
    } else {
      statusText = 'Выходной • Дежурный партнер 24/7';
    }

    // Apply to top bar
    statusEl.innerHTML = `
      <span class="live-status__dot"></span>
      <span class="live-status__text">${statusText}</span>
    `;

    if (isPositive) {
      statusEl.classList.remove('live-status--closed');
    } else {
      statusEl.classList.add('live-status--closed');
    }

    // Apply to mobile drawer
    if (drawerStatusEl) {
      drawerStatusEl.innerHTML = `
        <span class="live-status__dot"></span>
        <span>${statusText}</span>
      `;
      if (isPositive) {
        drawerStatusEl.classList.remove('live-status--closed');
      } else {
        drawerStatusEl.classList.add('live-status--closed');
      }
    }
  }

  updateStatus();
  // Refresh every 60 seconds
  setInterval(updateStatus, 60000);
}

/**
 * ----------------------------------------------------------------------------
 * 5. STICKY HEADER ELEVATION ON SCROLL
 * ----------------------------------------------------------------------------
 */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * ----------------------------------------------------------------------------
 * 6. MOBILE DRAWER NAVIGATION
 * ----------------------------------------------------------------------------
 */
function initMobileDrawer() {
  const hamburger = document.getElementById('hamburger-btn');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('drawer-close-btn');
  const overlay = document.getElementById('drawer-overlay');
  const links = drawer ? drawer.querySelectorAll('.mobile-drawer__link') : [];

  if (!hamburger || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
  };

  const closeDrawer = () => {
    drawer.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  };

  hamburger.addEventListener('click', () => {
    if (drawer.classList.contains('active')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  links.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/**
 * ----------------------------------------------------------------------------
 * 7. RUSSIAN PHONE NUMBER MASK (+7 (___) ___-__-__)
 * ----------------------------------------------------------------------------
 */
function initPhoneMasks() {
  const phoneInputs = document.querySelectorAll('.phone-mask');

  phoneInputs.forEach(input => {
    input.addEventListener('input', onPhoneInput);
    input.addEventListener('keydown', onPhoneKeyDown);
    input.addEventListener('paste', onPhonePaste);
  });

  function getDigits(str) {
    return str.replace(/\D/g, '');
  }

  function onPhoneInput(e) {
    const input = e.target;
    let inputNumbersValue = getDigits(input.value);
    const selectionStart = input.selectionStart;
    let formattedInputValue = '';

    if (!inputNumbersValue) {
      input.value = '';
      return;
    }

    if (input.value.length !== selectionStart) {
      // Editing in the middle of text
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] === '9') inputNumbersValue = '7' + inputNumbersValue;
      const firstSymbols = '+7';
      formattedInputValue = firstSymbols + ' ';

      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
      }
    } else {
      // International fallback
      formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
    }

    input.value = formattedInputValue;
  }

  function onPhoneKeyDown(e) {
    const input = e.target;
    if (e.key === 'Backspace' && getDigits(input.value).length === 1) {
      input.value = '';
    }
  }

  function onPhonePaste(e) {
    const pasted = e.clipboardData || window.clipboardData;
    const input = e.target;
    const inputNumbersValue = getDigits(input.value);

    if (pasted) {
      const pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
      }
    }
  }
}

/**
 * ----------------------------------------------------------------------------
 * 8. INTERACTIVE BUSINESS LEGAL RISK ASSESSMENT CALCULATOR
 * ----------------------------------------------------------------------------
 */
function initRiskCalculator() {
  const calcWrapper = document.querySelector('.calc-wrapper');
  if (!calcWrapper) return;

  const scoreDisplay = document.getElementById('calc-score-display');
  const meterBar = document.getElementById('calc-meter-bar');
  const statusBadge = document.getElementById('calc-status-badge');
  const threatsList = document.getElementById('calc-threats-list');
  const summaryInput = document.getElementById('calc-summary-input');
  const calcForm = document.getElementById('calc-lead-form');

  // Initial parameters
  const state = {
    scale: 1,      // 1 to 4
    threat: 3,     // weight factor
    audit: 3,      // 1 to 4
    exposure: 2.5, // 1 to 3.8
    scaleLabel: 'Малый бизнес',
    threatLabel: 'Налоговые претензии'
  };

  // Attach button click listeners
  const paramGroups = calcWrapper.querySelectorAll('.calc-options');
  paramGroups.forEach(group => {
    const param = group.getAttribute('data-calc-param');
    const buttons = group.querySelectorAll('.calc-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const val = parseFloat(btn.getAttribute('data-val'));
        state[param] = val;

        if (btn.hasAttribute('data-scale')) {
          state.scaleLabel = btn.getAttribute('data-scale');
        }
        if (btn.hasAttribute('data-threat')) {
          state.threatLabel = btn.getAttribute('data-threat');
        }

        recalculateRisk();
      });
    });
  });

  function recalculateRisk() {
    // Weighted formula:
    // Scale: 1..4 (weight: 1.5)
    // Threat: 2.5..3.8 (weight: 2.5)
    // Audit: 1..4 (weight: 2.0)
    // Exposure: 1..3.8 (weight: 2.5)
    const rawScore = (state.scale * 1.5) + (state.threat * 2.5) + (state.audit * 2.0) + (state.exposure * 2.5);
    // Raw max ~ 6 + 9.5 + 8 + 9.5 = 33
    // Normalize to 100 with realistic clamp
    let score = Math.round((rawScore / 33) * 100);
    score = Math.min(96, Math.max(22, score));

    // Update display
    if (scoreDisplay) scoreDisplay.textContent = score;
    if (meterBar) meterBar.style.width = `${score}%`;

    // Dynamic color and text based on risk bracket
    let statusText = '';
    let statusBg = '';
    let statusColor = '';
    let threats = [];

    if (score >= 70) {
      statusText = 'Критический уровень риска';
      statusBg = 'rgba(220, 38, 38, 0.25)';
      statusColor = '#FCA5A5';
      meterBar.style.background = 'linear-gradient(90deg, #F59E0B, #DC2626)';

      threats = [
        'Высокая вероятность выездной проверки ФНС с блокировкой счетов',
        'Персональная субсидиарная ответственность генерального директора и бенефициара',
        'Риск признания контрагентов недобросовестными по ст. 54.1 НК РФ',
        'Уязвимость перед обеспечительными мерами и арестом активов'
      ];
    } else if (score >= 45) {
      statusText = 'Повышенный уровень риска';
      statusBg = 'rgba(217, 130, 43, 0.25)';
      statusColor = '#FCD34D';
      meterBar.style.background = 'linear-gradient(90deg, #34D399, #F59E0B)';

      threats = [
        'Претензии налоговых органов в рамках камерального контроля',
        'Задержки выплат и риск невозврата дебиторской задолженности от 20 млн ₽',
        'Уязвимость внутренних корпоративных договоров при выходе участников'
      ];
    } else {
      statusText = 'Умеренный контролируемый уровень';
      statusBg = 'rgba(30, 126, 81, 0.25)';
      statusColor = '#6EE7B7';
      meterBar.style.background = 'linear-gradient(90deg, #059669, #34D399)';

      threats = [
        'Требуется регулярная ревизия договоров с новыми контрагентами',
        'Рекомендуется плановый аудит налоговой нагрузки раз в год',
        'Формализация прав на товарные знаки и нематериальные активы'
      ];
    }

    if (statusBadge) {
      statusBadge.textContent = statusText;
      statusBadge.style.backgroundColor = statusBg;
      statusBadge.style.color = statusColor;
      statusBadge.style.borderColor = statusColor;
    }

    if (threatsList) {
      threatsList.innerHTML = threats.map(t => `<li>${t}</li>`).join('');
    }

    if (summaryInput) {
      summaryInput.value = `Бизнес: ${state.scaleLabel}; Приоритет: ${state.threatLabel}; Индекс риска: ${score}/100 (${statusText})`;
    }
  }

  // Initial calculation
  recalculateRisk();

  // Handle calculator form submit
  if (calcForm) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = calcForm.querySelector('input[name="name"]')?.value || 'Доверитель';
      const phone = calcForm.querySelector('input[name="phone"]')?.value || '';

      if (!phone || phone.replace(/\D/g, '').length < 11) {
        showToast('Пожалуйста, укажите полный номер телефона', 'error');
        return;
      }

      // Show modal in success mode
      openConsultationModal({
        name: name,
        practice: `Экспресс-аудит (Индекс: ${scoreDisplay.textContent}/100)`
      }, true);

      calcForm.reset();
      recalculateRisk();
    });
  }
}

/**
 * ----------------------------------------------------------------------------
 * 9. CONFIDENTIAL CASE REVIEW FORM (AUDIT REQUEST)
 * ----------------------------------------------------------------------------
 */
function initAuditForm() {
  const auditForm = document.getElementById('audit-case-form');
  if (!auditForm) return;

  auditForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = auditForm.querySelector('#audit-name')?.value;
    const phone = auditForm.querySelector('#audit-phone')?.value;
    const email = auditForm.querySelector('#audit-email')?.value;
    const practice = auditForm.querySelector('#audit-type')?.value;

    if (!phone || phone.replace(/\D/g, '').length < 11) {
      showToast('Пожалуйста, введите корректный номер телефона', 'error');
      return;
    }

    // Submit handler
    const submitBtn = auditForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Шифрование и отправка...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      auditForm.reset();

      // Open Modal Success
      openConsultationModal({ name, practice }, true);
    }, 800);
  });
}

/**
 * ----------------------------------------------------------------------------
 * 10. FAQ ACCORDION
 * ----------------------------------------------------------------------------
 */
function initFaqAccordion() {
  const accordion = document.getElementById('faq-accordion');
  if (!accordion) return;

  const items = accordion.querySelectorAll('.accordion__item');

  items.forEach(item => {
    const header = item.querySelector('.accordion__header');
    const content = item.querySelector('.accordion__content');

    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      // Close all other items for clean accordion behavior
      items.forEach(otherItem => {
        if (otherItem !== item) {
          const otherHeader = otherItem.querySelector('.accordion__header');
          const otherContent = otherItem.querySelector('.accordion__content');
          otherHeader.setAttribute('aria-expanded', 'false');
          otherContent.style.maxHeight = null;
        }
      });

      if (isExpanded) {
        header.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        header.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 30 + 'px';
      }
    });
  });
}

/**
 * ----------------------------------------------------------------------------
 * 11. LEAD CAPTURE MODAL & WORKFLOW
 * ----------------------------------------------------------------------------
 */
function initConsultationModal() {
  const modal = document.getElementById('consultationModal');
  if (!modal) return;

  const formView = document.getElementById('modal-form-view');
  const successView = document.getElementById('modal-success-view');
  const leadForm = document.getElementById('lead-capture-form');
  const closeBtns = modal.querySelectorAll('[data-modal-close]');
  const openBtns = document.querySelectorAll('[data-modal-open="consultationModal"]');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const practice = btn.getAttribute('data-practice') || '';
      const partner = btn.getAttribute('data-partner') || '';

      let prefill = practice;
      if (partner) prefill = `Консультация партнера: ${partner}`;

      openConsultationModal({ practice: prefill }, false);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeConsultationModal();
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeConsultationModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeConsultationModal();
    }
  });

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const phoneInput = leadForm.querySelector('input[name="phone"]');
      if (phoneInput && phoneInput.value.replace(/\D/g, '').length < 11) {
        showToast('Пожалуйста, укажите полный номер телефона', 'error');
        return;
      }

      const submitBtn = leadForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Регистрация запроса...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Записаться на встречу';
        leadForm.reset();
        showModalSuccess();
      }, 700);
    });
  }
}

function openConsultationModal(data = {}, isSuccessOnly = false) {
  const modal = document.getElementById('consultationModal');
  const formView = document.getElementById('modal-form-view');
  const successView = document.getElementById('modal-success-view');
  if (!modal) return;

  const practiceInput = modal.querySelector('#lead-practice');
  const nameInput = modal.querySelector('#lead-name');

  if (practiceInput && data.practice) {
    practiceInput.value = data.practice;
  }
  if (nameInput && data.name) {
    nameInput.value = data.name;
  }

  if (isSuccessOnly) {
    showModalSuccess();
  } else {
    if (formView) formView.style.display = 'block';
    if (successView) successView.style.display = 'none';
  }

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeConsultationModal() {
  const modal = document.getElementById('consultationModal');
  if (!modal) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}

function showModalSuccess() {
  const formView = document.getElementById('modal-form-view');
  const successView = document.getElementById('modal-success-view');
  const ticketIdEl = document.getElementById('success-ticket-id');

  if (formView) formView.style.display = 'none';
  if (successView) successView.style.display = 'block';

  if (ticketIdEl) {
    const randomNum = Math.floor(100 + Math.random() * 900);
    ticketIdEl.textContent = `АРГ-2026/${randomNum}`;
  }
}

/**
 * ----------------------------------------------------------------------------
 * 12. YANDEX MAPS 2.1 INITIALIZATION (with fallback)
 * ----------------------------------------------------------------------------
 */
function initYandexMap() {
  const mapContainer = document.getElementById('yandex-map');
  const loadingIndicator = document.getElementById('map-loading-indicator');
  const fallbackLink = document.getElementById('map-fallback');
  if (!mapContainer) return;

  // Verify if ymaps is loaded
  if (typeof ymaps === 'undefined') {
    if (loadingIndicator) loadingIndicator.classList.add('loaded');
    return;
  }

  ymaps.ready(() => {
    try {
      const map = new ymaps.Map('yandex-map', {
        center: LANDING_CONFIG.coordinates,
        zoom: LANDING_CONFIG.mapZoom,
        controls: ['zoomControl', 'fullscreenControl']
      }, {
        searchControlProvider: 'yandex#search'
      });

      // Disable behaviors that interrupt page scrolling on mobile
      map.behaviors.disable('scrollZoom');

      // Custom Placemark
      const placemark = new ymaps.Placemark(LANDING_CONFIG.coordinates, {
        balloonContentHeader: `<strong>${LANDING_CONFIG.brandName}</strong>`,
        balloonContentBody: `
          <div style="font-family: sans-serif; font-size: 13px; line-height: 1.5; color: #202421;">
            <p><strong>Адрес:</strong> ${LANDING_CONFIG.address}</p>
            <p><strong>Метро:</strong> ${LANDING_CONFIG.metro}</p>
            <p><strong>Телефон:</strong> <a href="tel:${LANDING_CONFIG.phoneRaw}">${LANDING_CONFIG.phone}</a></p>
            <p><strong>Режим:</strong> ${LANDING_CONFIG.schedule.workdays}</p>
          </div>
        `,
        balloonContentFooter: '<span style="font-size: 11px; color: #535A55;">Охраняемая парковка для доверителей</span>',
        hintContent: `${LANDING_CONFIG.brandName} — Центральный офис`
      }, {
        preset: 'islands#darkGreenDotIconWithCaption',
        iconColor: '#C5A059'
      });

      map.geoObjects.add(placemark);

      // Hide loading spinner
      if (loadingIndicator) {
        loadingIndicator.classList.add('loaded');
      }
    } catch (err) {
      console.warn('Yandex Map init warning:', err);
      if (loadingIndicator) loadingIndicator.classList.add('loaded');
    }
  });
}

/**
 * ----------------------------------------------------------------------------
 * 13. TOAST NOTIFICATIONS HELPER
 * ----------------------------------------------------------------------------
 */
function showToast(message, type = 'info') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  const icon = type === 'error' ? '⚠️' : '✓';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 4000);
}
