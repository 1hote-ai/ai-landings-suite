/**
 * ==========================================================================
 * Лапки & Хвостик — Ветеринарный центр & СПА-Груминг
 * Клиентский скрипт: Конфигурация, Яндекс Карты, Триаж, Модальные окна, Маски
 * ==========================================================================
 */

'use strict';

/* ==========================================================================
   1. ГЛОБАЛЬНАЯ КОНФИГУРАЦИЯ ЛЕНДИНГА (LANDING_CONFIG)
   Легко редактируйте контакты, адреса, координаты и соцсети здесь!
   ========================================================================== */
const LANDING_CONFIG = {
  brand: {
    name: "Лапки & Хвостик",
    tagline: "Ветеринарный центр & СПА-Груминг",
    rating: "4.9",
    reviewsCount: 1420
  },
  contacts: {
    phone: "+7 (495) 822-44-12",
    phoneRaw: "+74958224412",
    emergencyPhone: "+7 (495) 822-44-99",
    emergencyPhoneRaw: "+74958224499",
    whatsapp: "https://wa.me/74958224412",
    telegram: "https://t.me/lapki_hvostik_vet",
    vk: "https://vk.com/lapki_hvostik_vet",
    email: "care@lapki-hvostik.ru"
  },
  address: {
    city: "Москва",
    street: "ул. 10-летия Октября, д. 11",
    metro: "м. Спортивная (3 мин пешком)",
    fullAddress: "г. Москва, ул. 10-летия Октября, д. 11",
    coordinates: [55.728912, 37.568341],
    yandexMapsLink: "https://yandex.ru/maps/?rtext=~55.728912,37.568341",
    parkingInfo: "🚗 Бесплатная парковка для клиентов клиники во дворе (въезд под шлагбаум)"
  },
  schedule: {
    clinicHours: "Пн-Вс: 09:00 — 21:00",
    emergencyHours: "Круглосуточно 24/7 (стационар и ОРИТ)",
    openHour: 9,      // 09:00
    closeHour: 21,    // 21:00
    timezoneOffset: 3 // Moscow UTC+3
  }
};

/* ==========================================================================
   2. DOM CONFIG BINDER (Синхронизация конфигурации с HTML)
   ========================================================================== */
function bindLandingConfig() {
  // Bind inner text based on data-config path (e.g. "brand.name")
  document.querySelectorAll('[data-config]').forEach(el => {
    const keyPath = el.getAttribute('data-config');
    const value = getNestedValue(LANDING_CONFIG, keyPath);
    if (value !== undefined) {
      el.textContent = value;
    }
  });

  // Bind href links based on data-config-link path
  document.querySelectorAll('[data-config-link]').forEach(el => {
    const keyPath = el.getAttribute('data-config-link');
    const value = getNestedValue(LANDING_CONFIG, keyPath);
    if (value !== undefined) {
      if (keyPath.includes('phone') && !value.startsWith('tel:') && !value.startsWith('http')) {
        const rawDigits = value.replace(/[^\d+]/g, '');
        el.setAttribute('href', `tel:${rawDigits}`);
      } else {
        el.setAttribute('href', value);
      }
    }
  });
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((prev, curr) => (prev ? prev[curr] : undefined), obj);
}

/* ==========================================================================
   3. РАСЧЕТ РЕЖИМА РАБОТЫ (LIVE STATUS)
   ========================================================================== */
function updateLiveWorkingStatus() {
  const badge = document.getElementById('live-status-badge');
  const badgeText = document.getElementById('live-status-text');
  const heroLive = document.getElementById('hero-live-status');

  if (!badge || !badgeText) return;

  // Determine current Moscow time (UTC+3)
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const moscowTime = new Date(utc + (3600000 * LANDING_CONFIG.schedule.timezoneOffset));
  const currentHour = moscowTime.getHours();
  const currentMinutes = moscowTime.getMinutes();

  const isOpen = currentHour >= LANDING_CONFIG.schedule.openHour && currentHour < LANDING_CONFIG.schedule.closeHour;

  if (isOpen) {
    badge.className = 'status-badge status-badge--open';
    badgeText.textContent = `Открыто сейчас (до ${LANDING_CONFIG.schedule.closeHour}:00)`;
    if (heroLive) heroLive.textContent = "Приём открыт (до 21:00)";
  } else {
    badge.className = 'status-badge status-badge--closed';
    badgeText.textContent = `Сейчас закрыто (откроется в 0${LANDING_CONFIG.schedule.openHour}:00)`;
    if (heroLive) heroLive.textContent = "ОРИТ открыт 24/7";
  }
}

/* ==========================================================================
   4. ЯНДЕКС КАРТЫ (YANDEX MAPS 2.1 API + FALLBACK)
   ========================================================================== */
function initYandexMap() {
  const mapContainer = document.getElementById('yandex-map-container');
  const fallback = document.getElementById('map-fallback');
  if (!mapContainer) return;

  if (typeof ymaps === 'undefined') {
    // API not loaded or blocked, keep fallback visible
    return;
  }

  ymaps.ready(() => {
    try {
      if (fallback) fallback.style.display = 'none';

      const map = new ymaps.Map('yandex-map-container', {
        center: LANDING_CONFIG.address.coordinates,
        zoom: 16,
        controls: ['zoomControl', 'fullscreenControl', 'geolocationControl']
      }, {
        searchControlProvider: 'yandex#search'
      });

      // Disable accidental scroll zoom on wheel
      map.behaviors.disable('scrollZoom');

      // Create stylish custom Placemark
      const placemark = new ymaps.Placemark(LANDING_CONFIG.address.coordinates, {
        hintContent: `<strong>${LANDING_CONFIG.brand.name}</strong><br>Ветклиника & СПА`,
        balloonContentHeader: `<div style="font-family:'Fredoka',sans-serif;font-size:16px;color:#0284C7;font-weight:700;">🐾 ${LANDING_CONFIG.brand.name}</div>`,
        balloonContentBody: `
          <div style="font-family:'Inter',sans-serif;font-size:13px;line-height:1.5;padding:4px 0;">
            <p><strong>Адрес:</strong> ${LANDING_CONFIG.address.fullAddress}</p>
            <p style="color:#64748b;font-size:12px;">${LANDING_CONFIG.address.metro}</p>
            <p style="margin-top:6px;"><strong>Режим:</strong> ${LANDING_CONFIG.schedule.clinicHours}</p>
            <p style="color:#ef4444;font-size:12px;font-weight:600;">🚨 Скорая помощь: 24/7</p>
            <p style="margin-top:8px;"><a href="${LANDING_CONFIG.address.yandexMapsLink}" target="_blank" style="color:#0284C7;text-decoration:underline;font-weight:600;">Открыть маршрут в Яндекс Навигаторе &rarr;</a></p>
          </div>
        `,
        balloonContentFooter: `<div style="font-size:11px;color:#94a3b8;">${LANDING_CONFIG.address.parkingInfo}</div>`
      }, {
        preset: 'islands#nightCircleDotIconWithCaption',
        iconColor: '#0284C7'
      });

      map.geoObjects.add(placemark);
    } catch (e) {
      console.warn('Yandex Maps initialization fallback triggered:', e);
      if (fallback) fallback.style.display = 'flex';
    }
  });
}

/* ==========================================================================
   5. ИНТЕРАКТИВНЫЙ ВЕТЕРИНАРНЫЙ ТРИАЖ (PET TRIAGE WIDGET)
   ========================================================================== */
function initTriageWidget() {
  const widget = document.getElementById('triage-widget');
  if (!widget) return;

  const tabs = widget.querySelectorAll('.triage-step-tab');
  const stepPanels = widget.querySelectorAll('.triage-step-content');
  
  const toStep2Btn = document.getElementById('triage-to-step-2');
  const toStep3Btn = document.getElementById('triage-to-step-3');
  const calculateBtn = document.getElementById('triage-calculate');
  const backTo1Btn = document.getElementById('triage-back-to-1');
  const backTo2Btn = document.getElementById('triage-back-to-2');
  const restartBtn = document.getElementById('triage-restart');
  const triageBookBtn = document.getElementById('triage-book-btn');
  const resultContainer = document.getElementById('triage-result-container');

  let currentStep = 1;
  let triageData = {
    petType: 'Собака',
    symptomKey: 'apathy',
    symptomName: 'Вялость и отказ от еды',
    redFlags: [],
    urgencyLevel: 'routine'
  };

  function setStep(step) {
    currentStep = step;
    tabs.forEach(tab => {
      const tabStep = parseInt(tab.getAttribute('data-step'), 10);
      tab.classList.toggle('active', tabStep === step);
      tab.classList.toggle('completed', tabStep < step);
    });

    stepPanels.forEach((panel, idx) => {
      panel.classList.toggle('active', (idx + 1) === step);
    });
  }

  // Next / Back handlers
  if (toStep2Btn) {
    toStep2Btn.addEventListener('click', () => {
      const selectedPet = widget.querySelector('input[name="triage-pet"]:checked');
      if (selectedPet) {
        if (selectedPet.value === 'dog') triageData.petType = 'Собака';
        else if (selectedPet.value === 'cat') triageData.petType = 'Кошка';
        else triageData.petType = 'Грызун / Экзот';
      }
      setStep(2);
    });
  }

  if (backTo1Btn) {
    backTo1Btn.addEventListener('click', () => setStep(1));
  }

  if (toStep3Btn) {
    toStep3Btn.addEventListener('click', () => {
      const selectedSymptom = widget.querySelector('input[name="triage-symptom"]:checked');
      if (selectedSymptom) {
        triageData.symptomKey = selectedSymptom.value;
        const label = selectedSymptom.closest('.symptom-btn');
        triageData.symptomName = label ? label.querySelector('.sym-text').textContent.trim() : 'Жалобы владельца';
      }
      setStep(3);
    });
  }

  if (backTo2Btn) {
    backTo2Btn.addEventListener('click', () => setStep(2));
  }

  if (calculateBtn) {
    calculateBtn.addEventListener('click', () => {
      // Gather red flags
      const checkedFlags = Array.from(widget.querySelectorAll('input[name="red-flag"]:checked')).map(cb => cb.value);
      triageData.redFlags = checkedFlags;

      // Evaluation algorithm
      if (checkedFlags.length > 0) {
        triageData.urgencyLevel = 'emergency';
      } else if (['apathy', 'gi', 'breathing', 'injury'].includes(triageData.symptomKey)) {
        triageData.urgencyLevel = 'urgent';
      } else {
        triageData.urgencyLevel = 'routine';
      }

      renderTriageResult(triageData, resultContainer);
      setStep(4);
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      // Reset checkboxes
      widget.querySelectorAll('input[name="red-flag"]').forEach(cb => cb.checked = false);
      setStep(1);
    });
  }

  // Pre-fill modal from triage
  if (triageBookBtn) {
    triageBookBtn.addEventListener('click', () => {
      openBookingModal({
        petType: triageData.petType,
        service: triageData.urgencyLevel === 'emergency' 
          ? 'Срочная консультация дежурного врача' 
          : 'Первичный приём терапевта',
        notes: `[ТРИАЖ: ${triageData.urgencyLevel.toUpperCase()}] Питомец: ${triageData.petType}. Жалоба: ${triageData.symptomName}. Критических флагов: ${triageData.redFlags.length}`
      });
    });
  }
}

function renderTriageResult(data, container) {
  if (!container) return;

  let html = '';
  if (data.urgencyLevel === 'emergency') {
    html = `
      <div class="triage-result triage-result--emergency">
        <span class="result-badge">🔴 Красный уровень: Экстренно (24/7)</span>
        <h3 class="result-title text-danger">Требуется немедленная помощь дежурного врача!</h3>
        <p class="result-description">
          Обнаружены критические симптомы у питомца (<strong>${data.petType}</strong>). Промедление может быть опасно для жизни. 
          Пожалуйста, свяжитесь с круглосуточным отделением реанимации и интенсивной терапии (ОРИТ).
        </p>
        <div class="result-advice-box">
          <h4>Что делать прямо сейчас:</h4>
          <p>1. Не пытайтесь насильно поить или кормить питомца.</p>
          <p>2. Уложите на бок на мягкую поверхность, обеспечьте доступ свежего воздуха.</p>
          <p>3. Позвоните в нашу неотложку: мы подготовим операционную и аппаратуру к вашему приезду.</p>
          <div style="margin-top: 14px;">
            <a href="tel:${LANDING_CONFIG.contacts.emergencyPhoneRaw}" class="btn btn--primary" style="background-color:#ef4444;">
              📞 Позвонить в неотложку: ${LANDING_CONFIG.contacts.emergencyPhone}
            </a>
          </div>
        </div>
      </div>
    `;
  } else if (data.urgencyLevel === 'urgent') {
    html = `
      <div class="triage-result triage-result--urgent">
        <span class="result-badge">🟡 Желтый уровень: Требуется осмотр (2–4 часа)</span>
        <h3 class="result-title" style="color: #b45309;">Рекомендуется приём врача в течение сегодняшнего дня</h3>
        <p class="result-description">
          Симптомы (<strong>${data.symptomName}</strong>) указывают на острое состояние, которое требует профессиональной диагностики (УЗИ, клинический анализ крови).
        </p>
        <div class="result-advice-box">
          <h4>Рекомендация дежурного терапевта:</h4>
          <p>• Не давайте человеческих лекарств (парацетамол, нурофен смертельно токсичны для кошек и собак!).</p>
          <p>• Обеспечьте покой и доступ к свежей питьевой воде.</p>
          <p>• Запишитесь на ближайший приём или приезжайте в порядке живой очереди в клинику.</p>
        </div>
      </div>
    `;
  } else {
    html = `
      <div class="triage-result triage-result--routine">
        <span class="result-badge">🟢 Зеленый уровень: Плановый визит</span>
        <h3 class="result-title" style="color: #047857;">Критических признаков не обнаружено</h3>
        <p class="result-description">
          Состояние питомца (<strong>${data.petType}</strong>) стабильно. Вы можете выбрать комфортный день и время для планового осмотра, вакцинации, чекапа или СПА-груминга.
        </p>
        <div class="result-advice-box">
          <h4>Рекомендация:</h4>
          <p>• Запланируйте визит к врачу в удобное для вас время без очередей.</p>
          <p>• Перед чекапом или сдачей крови рекомендуется 8 часов голодной диеты.</p>
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
}

/* ==========================================================================
   6. АККОРДЕОН FAQ
   ========================================================================== */
function initFaqAccordion() {
  const accordion = document.getElementById('faq-accordion');
  if (!accordion) return;

  const items = accordion.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other items
      items.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherHeader = otherItem.querySelector('.accordion-header');
          const otherBody = otherItem.querySelector('.accordion-body');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
        body.style.maxHeight = null;
      } else {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   7. ФИЛЬТРАЦИЯ УСЛУГ ПО КАТЕГОРИЯМ
   ========================================================================== */
function initServiceFilters() {
  const filterContainer = document.getElementById('service-filters');
  const servicesGrid = document.getElementById('services-grid');
  if (!filterContainer || !servicesGrid) return;

  const buttons = filterContainer.querySelectorAll('.filter-btn');
  const cards = servicesGrid.querySelectorAll('.service-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. ТЕЛЕФОННАЯ МАСКА (+7 (___) ___-__-__)
   ========================================================================== */
function initPhoneMask() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let value = input.value.replace(/\D/g, '');
      let formatted = '';

      if (!value) {
        input.value = '';
        return;
      }

      // If user starts with 8 or 7, normalize to 7
      if (value[0] === '8' || value[0] === '7') {
        value = '7' + value.substring(1);
      } else {
        value = '7' + value;
      }

      // Limit to 11 digits (7 + 10 digits)
      value = value.substring(0, 11);

      // Build mask: +7 (XXX) XXX-XX-XX
      formatted = '+7';
      if (value.length > 1) {
        formatted += ' (' + value.substring(1, 4);
      }
      if (value.length >= 4) {
        formatted += ') ' + value.substring(4, 7);
      }
      if (value.length >= 7) {
        formatted += '-' + value.substring(7, 9);
      }
      if (value.length >= 9) {
        formatted += '-' + value.substring(9, 11);
      }

      input.value = formatted;
    });

    input.addEventListener('keydown', (e) => {
      // Clear on backspace if at prefix
      if (e.key === 'Backspace' && input.value.length <= 4) {
        input.value = '';
      }
    });

    input.addEventListener('focus', () => {
      if (!input.value) {
        input.value = '+7 (';
      }
    });

    input.addEventListener('blur', () => {
      if (input.value === '+7 (' || input.value === '+7') {
        input.value = '';
      }
    });
  });
}

/* ==========================================================================
   9. МОДАЛЬНОЕ ОКНО ЗАПИСИ И ЛИДОГЕНЕРАЦИЯ
   ========================================================================== */
let activeModalPayload = null;

function openBookingModal(payload = {}) {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;

  activeModalPayload = payload;

  const formView = document.getElementById('modal-form-view');
  const successView = document.getElementById('modal-success-view');
  const form = document.getElementById('booking-form');

  if (formView) formView.style.display = 'block';
  if (successView) successView.style.display = 'none';
  if (form) form.reset();

  // Pre-fill from payload
  if (payload.service) {
    const serviceSelect = document.getElementById('form-service');
    if (serviceSelect) {
      // Find matching option
      let found = false;
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].value === payload.service) {
          serviceSelect.selectedIndex = i;
          found = true;
          break;
        }
      }
      if (!found) {
        serviceSelect.value = "Другая услуга";
      }
    }
  }

  if (payload.petType) {
    const radio = document.querySelector(`input[name="modal_pet_type"][value="${payload.petType}"]`);
    if (radio) radio.checked = true;
  }

  if (payload.doctor) {
    const notesInput = document.getElementById('form-notes');
    if (notesInput) {
      notesInput.value = `Запись к специалисту: ${payload.doctor}`;
    }
  } else if (payload.notes) {
    const notesInput = document.getElementById('form-notes');
    if (notesInput) {
      notesInput.value = payload.notes;
    }
  }

  // Pre-set today or tomorrow as date minimum
  const dateInput = document.getElementById('form-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  // Clear previous validation errors
  document.querySelectorAll('.form-control.has-error').forEach(el => el.classList.remove('has-error'));

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initBookingModal() {
  const modal = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const backdrop = document.getElementById('modal-backdrop');
  const successCloseBtn = document.getElementById('modal-success-close-btn');
  const form = document.getElementById('booking-form');

  // Trigger buttons across landing page
  document.querySelectorAll('.open-booking-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service');
      const doctor = btn.getAttribute('data-doctor');
      openBookingModal({ service, doctor });
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeBookingModal);
  if (backdrop) backdrop.addEventListener('click', closeBookingModal);
  if (successCloseBtn) successCloseBtn.addEventListener('click', closeBookingModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeBookingModal();
    }
  });

  // Form Validation & Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const petNameInput = document.getElementById('form-pet-name');
      const serviceInput = document.getElementById('form-service');
      const ownerNameInput = document.getElementById('form-owner-name');
      const phoneInput = document.getElementById('form-phone');
      const consentInput = document.getElementById('form-consent');

      // Validate Pet Name
      if (!petNameInput.value.trim()) {
        petNameInput.classList.add('has-error');
        isValid = false;
      } else {
        petNameInput.classList.remove('has-error');
      }

      // Validate Service
      if (!serviceInput.value) {
        serviceInput.classList.add('has-error');
        isValid = false;
      } else {
        serviceInput.classList.remove('has-error');
      }

      // Validate Owner Name
      if (!ownerNameInput.value.trim()) {
        ownerNameInput.classList.add('has-error');
        isValid = false;
      } else {
        ownerNameInput.classList.remove('has-error');
      }

      // Validate Phone (must contain at least 10 digits)
      const digits = phoneInput.value.replace(/\D/g, '');
      if (digits.length < 11) {
        phoneInput.classList.add('has-error');
        isValid = false;
      } else {
        phoneInput.classList.remove('has-error');
      }

      // Validate Consent
      if (!consentInput.checked) {
        consentInput.classList.add('has-error');
        isValid = false;
      } else {
        consentInput.classList.remove('has-error');
      }

      if (!isValid) return;

      // Submission simulation
      const submitBtn = document.getElementById('submit-booking-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Отправка заявки...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // Generate ticket number
        const randomTicket = '#LH-' + Math.floor(1000 + Math.random() * 9000);
        const ticketEl = document.getElementById('success-ticket-id');
        const petEl = document.getElementById('success-pet-name');
        const servEl = document.getElementById('success-service-name');
        const phoneEl = document.getElementById('success-phone');

        if (ticketEl) ticketEl.textContent = randomTicket;
        if (petEl) petEl.textContent = petNameInput.value.trim();
        if (servEl) servEl.textContent = serviceInput.value;
        if (phoneEl) phoneEl.textContent = phoneInput.value;

        // Switch to success view
        const formView = document.getElementById('modal-form-view');
        const successView = document.getElementById('modal-success-view');
        if (formView) formView.style.display = 'none';
        if (successView) successView.style.display = 'block';

        // Log for integration/debug
        console.log('Успешная запись на приём:', {
          ticket: randomTicket,
          pet: petNameInput.value.trim(),
          service: serviceInput.value,
          owner: ownerNameInput.value.trim(),
          phone: phoneInput.value,
          date: document.getElementById('form-date').value,
          time: document.getElementById('form-time').value,
          notes: document.getElementById('form-notes').value,
          timestamp: new Date().toISOString()
        });
      }, 700);
    });
  }
}

/* ==========================================================================
   10. МОБИЛЬНОЕ МЕНЮ (DRAWER NAVIGATION)
   ========================================================================== */
function initMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const burgerBtn = document.getElementById('burger-btn');
  const closeBtn = document.getElementById('drawer-close-btn');
  const overlay = document.getElementById('drawer-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!drawer || !burgerBtn) return;

  function openDrawer() {
    drawer.classList.add('open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burgerBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   11. СКРОЛЛ ЭФФЕКТЫ ХЕДЕРА
   ========================================================================== */
function initScrollEffects() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   12. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  bindLandingConfig();
  updateLiveWorkingStatus();
  initYandexMap();
  initTriageWidget();
  initFaqAccordion();
  initServiceFilters();
  initPhoneMask();
  initBookingModal();
  initMobileDrawer();
  initScrollEffects();

  // Periodically refresh live hours status every 60 seconds
  setInterval(updateLiveWorkingStatus, 60000);
});
