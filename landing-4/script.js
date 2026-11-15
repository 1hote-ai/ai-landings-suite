/**
 * ============================================================================
 * АУРА ДЕНТ (AURA DENTAL) — JAVASCRIPT SYSTEM & CONFIGURATION
 * ============================================================================
 * Главный скрипт интерактивных компонентов стоматологической клиники:
 * - Глобальная конфигурация клиники (LANDING_CONFIG)
 * - Динамическая привязка данных к элементам DOM
 * - Живой статус работы ("Открыто сейчас" / "Закрыто")
 * - Маска для ввода номера телефона (+7 (XXX) XXX-XX-XX)
 * - Интерактивный квиз подбора плана лечения улыбки
 * - Интерактивная запись к врачу (выбор доктора, даты и времени)
 * - Аккордеон частых вопросов (FAQ)
 * - Интеграция с Яндекс.Картами (ymaps 2.1) с отказоустойчивым fallback
 * - Модальное окно лидогенерации с валидацией и экраном успеха
 * - Мобильное меню и плавная навигация
 * ============================================================================
 */

/* ==========================================================================
   1. ГЛОБАЛЬНАЯ КОНФИГУРАЦИЯ КЛИНИКИ (LANDING_CONFIG)
   ========================================================================== */

const LANDING_CONFIG = {
  // Информация о бренде и позиционировании
  brand: {
    nameRu: "Аура Дент",
    nameEn: "Aura Dental",
    tagline: "Семейная стоматология и цифровая имплантология премиум-класса",
    legalName: "ООО «Аура Дент»",
    license: "Лицензия Л041-01137-77/00345678 от 14.04.2018 Департамента здравоохранения г. Москвы",
    inn: "ИНН 7710984521",
    ogrn: "ОГРН 1187746123456",
    city: "Москва",
    metro: "м. Тверская / Пушкинская (3 минуты пешком)"
  },

  // Контактные телефоны
  phone: {
    display: "+7 (495) 845-21-40",
    raw: "+74958452140",
    label: "Круглосуточная горячая линия"
  },
  phoneSecondary: {
    display: "+7 (800) 555-35-72",
    raw: "+78005553572",
    label: "Бесплатно по РФ"
  },

  // Электронная почта
  email: "care@auradental.ru",

  // Физический адрес
  address: "г. Москва, Малый Гнездниковский переулок, д. 9, стр. 2",
  landmarks: "Исторический центр, 200 метров от Тверской улицы. Собственная охраняемая парковка со шлагбаумом для пациентов.",

  // Географические координаты для Яндекс Карт [Широта, Долгота]
  coordinates: [55.760241, 37.605332],
  zoomLevel: 16,

  // Расписание работы клиники
  schedule: {
    displayWeekday: "Пн-Пт: 09:00 – 21:00",
    displayWeekend: "Сб-Вс: 09:00 – 20:00",
    fullDisplay: "Пн-Пт: 09:00 – 21:00 | Сб-Вс: 09:00 – 20:00",
    // Часы для расчёта живого статуса (по московскому времени UTC+3)
    weekdayOpen: 9,
    weekdayClose: 21,
    weekendOpen: 9,
    weekendClose: 20
  },

  // Ссылки на мессенджеры и социальные сети
  socials: {
    whatsapp: "https://wa.me/74958452140?text=%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%B9%20%D0%B4%D0%B5%D0%BD%D1%8C!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%BD%D0%B0%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8E%20%D0%B2%20%D0%90%D1%83%D1%80%D0%B0%20%D0%94%D0%B5%D0%BD%D1%82",
    telegram: "https://t.me/auradental_moscow",
    vk: "https://vk.com/auradental_clinic",
    yandexMapsUrl: "https://yandex.ru/maps/?pt=37.605332,55.760241&z=17&l=map"
  }
};

/* ==========================================================================
   2. ДИНАМИЧЕСКАЯ ПРИВЯЗКА КОНФИГУРАЦИИ К DOM
   ========================================================================== */

function bindLandingConfig() {
  // Телефон основной
  document.querySelectorAll('[data-config="phone"]').forEach(el => {
    el.textContent = LANDING_CONFIG.phone.display;
    if (el.tagName === 'A') {
      el.href = `tel:${LANDING_CONFIG.phone.raw}`;
    }
  });

  // Телефон для ссылок tel:
  document.querySelectorAll('a[data-config="phone-link"]').forEach(el => {
    el.href = `tel:${LANDING_CONFIG.phone.raw}`;
    const textNode = el.querySelector('.header-phone-number, .phone-text');
    if (textNode) {
      textNode.textContent = LANDING_CONFIG.phone.display;
    }
  });

  // Email
  document.querySelectorAll('[data-config="email"]').forEach(el => {
    el.textContent = LANDING_CONFIG.email;
    if (el.tagName === 'A') {
      el.href = `mailto:${LANDING_CONFIG.email}`;
    }
  });

  // Адрес
  document.querySelectorAll('[data-config="address"]').forEach(el => {
    el.textContent = LANDING_CONFIG.address;
  });

  // Метро
  document.querySelectorAll('[data-config="metro"]').forEach(el => {
    el.textContent = LANDING_CONFIG.brand.metro;
  });

  // Расписание
  document.querySelectorAll('[data-config="schedule-weekdays"]').forEach(el => {
    el.textContent = LANDING_CONFIG.schedule.displayWeekday;
  });
  document.querySelectorAll('[data-config="schedule-weekends"]').forEach(el => {
    el.textContent = LANDING_CONFIG.schedule.displayWeekend;
  });
  document.querySelectorAll('[data-config="schedule-full"]').forEach(el => {
    el.textContent = LANDING_CONFIG.schedule.fullDisplay;
  });

  // Соцсети и мессенджеры
  document.querySelectorAll('a[data-config="whatsapp"]').forEach(el => {
    el.href = LANDING_CONFIG.socials.whatsapp;
  });
  document.querySelectorAll('a[data-config="telegram"]').forEach(el => {
    el.href = LANDING_CONFIG.socials.telegram;
  });
  document.querySelectorAll('a[data-config="yandex-maps-link"]').forEach(el => {
    el.href = LANDING_CONFIG.socials.yandexMapsUrl;
  });
}

/* ==========================================================================
   3. ЖИВОЙ СТАТУС РАБОТЫ КЛИНИКИ ("Открыто сейчас" / "Сейчас закрыто")
   ========================================================================== */

function updateLiveWorkingStatus() {
  const statusBadges = document.querySelectorAll('.live-status');
  if (!statusBadges.length) return;

  const now = new Date();
  // Вычисляем московское время (UTC+3)
  const utcHours = now.getUTCHours();
  const mskHours = (utcHours + 3) % 24;
  const mskMinutes = now.getUTCMinutes();
  const dayOfWeek = now.getUTCDay(); // 0 - Вс, 1 - Пн, ..., 6 - Сб

  const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
  const openHour = isWeekend ? LANDING_CONFIG.schedule.weekendOpen : LANDING_CONFIG.schedule.weekdayOpen;
  const closeHour = isWeekend ? LANDING_CONFIG.schedule.weekendClose : LANDING_CONFIG.schedule.weekdayClose;

  const currentTimeInMinutes = mskHours * 60 + mskMinutes;
  const openTimeInMinutes = openHour * 60;
  const closeTimeInMinutes = closeHour * 60;

  const isOpen = (currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes);

  statusBadges.forEach(badge => {
    const textSpan = badge.querySelector('.live-status-text') || badge;
    if (isOpen) {
      badge.classList.remove('status--closed');
      textSpan.textContent = `Открыто сейчас (до ${closeHour}:00)`;
    } else {
      badge.classList.add('status--closed');
      textSpan.textContent = `Сейчас закрыто • Откроемся в ${openHour}:00`;
    }
  });
}

/* ==========================================================================
   4. ТЕЛЕФОННАЯ МАСКА (+7 (XXX) XXX-XX-XX)
   ========================================================================== */

function initPhoneMasks() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  phoneInputs.forEach(input => {
    input.addEventListener('input', onPhoneInput);
    input.addEventListener('keydown', onPhoneKeyDown);
    input.addEventListener('paste', onPhonePaste);
  });

  function getCleanDigits(value) {
    return value.replace(/\D/g, '');
  }

  function onPhoneInput(e) {
    const input = e.target;
    let inputNumbersValue = getCleanDigits(input.value);
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
      // Для международных форматов
      formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
  }

  function onPhoneKeyDown(e) {
    const input = e.target;
    if (e.keyCode === 8 && getCleanDigits(input.value).length === 1) {
      input.value = "";
    }
  }

  function onPhonePaste(e) {
    const input = e.target;
    const inputNumbersValue = getCleanDigits(input.value);
    const pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      const pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
      }
    }
  }
}

/* ==========================================================================
   5. ИНТЕРАКТИВНЫЙ КВИЗ ПОДБОРА ПЛАНА ЛЕЧЕНИЯ
   ========================================================================== */

function initSmileQuiz() {
  const quizContainer = document.getElementById('smile-quiz');
  if (!quizContainer) return;

  const steps = quizContainer.querySelectorAll('.quiz-step');
  const progressBar = quizContainer.querySelector('.quiz-progress-bar');
  const stepNumberEl = quizContainer.querySelector('.current-step-num');
  const totalStepsEl = quizContainer.querySelector('.total-steps-num');
  const btnPrev = quizContainer.querySelector('.btn-quiz-prev');
  const btnNext = quizContainer.querySelector('.btn-quiz-next');
  const quizForm = quizContainer.querySelector('#quiz-lead-form');
  const quizSuccessEl = quizContainer.querySelector('.quiz-success-view');

  let currentStep = 0;
  const totalSteps = steps.length - 1; // последний шаг — это форма ввода контактов

  if (totalStepsEl) totalStepsEl.textContent = totalSteps;

  // Хранилище ответов квиза
  const quizAnswers = {
    goal: "Имплантация и восстановление зубов",
    count: "Несколько зубов (3-5)",
    priority: "Без боли и страха (во сне / седация)",
    timeline: "В ближайшие 1-2 недели"
  };

  // Выбор вариантов ответов
  quizContainer.querySelectorAll('.quiz-option-card').forEach(card => {
    card.addEventListener('click', function() {
      const stepEl = this.closest('.quiz-step');
      const questionKey = stepEl.getAttribute('data-question-key');
      const value = this.getAttribute('data-value');

      stepEl.querySelectorAll('.quiz-option-card').forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');

      if (questionKey && value) {
        quizAnswers[questionKey] = value;
      }
    });
  });

  function updateQuizView() {
    steps.forEach((step, idx) => {
      if (idx === currentStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    if (stepNumberEl) {
      stepNumberEl.textContent = Math.min(currentStep + 1, totalSteps);
    }

    if (progressBar) {
      const progressPercent = ((currentStep + 1) / (totalSteps + 1)) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }

    // Управление кнопками
    if (btnPrev) {
      btnPrev.style.visibility = (currentStep === 0) ? 'hidden' : 'visible';
    }

    if (btnNext) {
      if (currentStep >= totalSteps) {
        btnNext.style.display = 'none';
      } else {
        btnNext.style.display = 'inline-flex';
      }
    }
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        updateQuizView();
      }
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        updateQuizView();
      }
    });
  }

  // Обработка отправки формы квиза
  if (quizForm) {
    quizForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const phoneInput = this.querySelector('input[type="tel"]');
      const nameInput = this.querySelector('input[name="quiz-name"]');

      if (!phoneInput || phoneInput.value.trim().length < 16) {
        phoneInput.classList.add('error');
        phoneInput.focus();
        return;
      }
      phoneInput.classList.remove('error');

      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Формируем персональный расчет...";
      }

      // Имитация успешной отправки в CRM
      setTimeout(() => {
        if (quizForm) quizForm.style.display = 'none';
        if (quizSuccessEl) quizSuccessEl.style.display = 'block';
        showToast("Ваш расчет сформирован! Доктор свяжется с вами в течение 10 минут.");
      }, 900);
    });
  }

  updateQuizView();
}

/* ==========================================================================
   6. ИНТЕРАКТИВНАЯ ЗАПИСЬ К ВРАЧУ (DOCTOR & TIME PICKER)
   ========================================================================== */

function initDoctorPicker() {
  const pickerCard = document.querySelector('.booking-card');
  if (!pickerCard) return;

  const doctorItems = pickerCard.querySelectorAll('.doctor-picker-item');
  const serviceSelect = pickerCard.querySelector('#booking-service-select');
  const dateChipsWrap = pickerCard.querySelector('.date-chips-wrap');
  const timeSlotBtns = pickerCard.querySelectorAll('.time-slot-btn');

  // Элементы сводки записи
  const summaryDoctor = pickerCard.querySelector('.summary-doctor-val');
  const summaryService = pickerCard.querySelector('.summary-service-val');
  const summaryDateTime = pickerCard.querySelector('.summary-datetime-val');
  const bookingForm = pickerCard.querySelector('#inline-booking-form');

  let selectedDoctor = "Волков Александр Сергеевич (Хирург-имплантолог)";
  let selectedService = "Первичная консультация и 3D-томография";
  let selectedDate = "Сегодня";
  let selectedTime = "11:00";

  // Генерация динамических чипов дат (на 7 дней вперед)
  if (dateChipsWrap) {
    dateChipsWrap.innerHTML = "";
    const daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const months = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayName = i === 0 ? "Сегодня" : (i === 1 ? "Завтра" : daysOfWeek[date.getDay()]);
      const dateNum = `${date.getDate()} ${months[date.getMonth()]}`;

      const chip = document.createElement('div');
      chip.className = `date-chip ${i === 0 ? 'selected' : ''}`;
      chip.setAttribute('data-date-str', `${dayName}, ${dateNum}`);
      chip.innerHTML = `
        <span class="date-chip-day">${dayName}</span>
        <span class="date-chip-date">${date.getDate()} ${months[date.getMonth()]}</span>
      `;

      chip.addEventListener('click', function() {
        dateChipsWrap.querySelectorAll('.date-chip').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        selectedDate = this.getAttribute('data-date-str');
        updateSummary();
      });

      dateChipsWrap.appendChild(chip);
    }
  }

  // Выбор доктора
  doctorItems.forEach(item => {
    item.addEventListener('click', function() {
      doctorItems.forEach(d => d.classList.remove('selected'));
      this.classList.add('selected');
      const name = this.querySelector('.doctor-picker-name').textContent;
      const role = this.querySelector('.doctor-picker-role').textContent;
      selectedDoctor = `${name} (${role})`;
      updateSummary();
    });
  });

  // Выбор услуги
  if (serviceSelect) {
    serviceSelect.addEventListener('change', function() {
      selectedService = this.value;
      updateSummary();
    });
  }

  // Выбор времени
  timeSlotBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      timeSlotBtns.forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
      selectedTime = this.textContent.trim();
      updateSummary();
    });
  });

  function updateSummary() {
    if (summaryDoctor) summaryDoctor.textContent = selectedDoctor;
    if (summaryService) summaryService.textContent = selectedService;
    if (summaryDateTime) summaryDateTime.textContent = `${selectedDate} в ${selectedTime}`;
  }

  // Обработка отправки формы записи
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const phoneInput = this.querySelector('input[type="tel"]');
      const nameInput = this.querySelector('input[type="text"]');

      if (!phoneInput || phoneInput.value.trim().length < 16) {
        phoneInput.classList.add('error');
        phoneInput.focus();
        return;
      }
      phoneInput.classList.remove('error');

      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Бронируем время приема...";
      }

      setTimeout(() => {
        openModalWithPreload({
          title: "Запись успешно подтверждена!",
          desc: `Вы записаны к: ${selectedDoctor} на ${selectedDate} в ${selectedTime}. Мы выслали подтверждение по SMS.`,
          isSuccessState: true
        });
        bookingForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Подтвердить запись";
        }
      }, 800);
    });
  }

  updateSummary();
}

/* ==========================================================================
   7. АККОРДЕОН ВОПРОСОВ И ОТВЕТОВ (FAQ)
   ========================================================================== */

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Закрываем остальные вкладки (режим аккордеона)
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherContent) otherContent.style.maxHeight = null;
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   8. ИНТЕГРАЦИЯ С ЯНДЕКС.КАРТАМИ (YANDEX MAPS 2.1)
   ========================================================================== */

function initYandexMap() {
  const mapContainer = document.getElementById('yandex-map');
  const fallbackOverlay = document.querySelector('.map-fallback-overlay');
  if (!mapContainer) return;

  function showFallback() {
    if (fallbackOverlay) {
      fallbackOverlay.classList.add('active');
    }
  }

  // Проверяем доступность API Яндекс Карт
  if (typeof ymaps === 'undefined') {
    // Если скрипт карт не загрузился (например, оффлайн или блокировщик)
    showFallback();
    return;
  }

  ymaps.ready(() => {
    try {
      const map = new ymaps.Map('yandex-map', {
        center: LANDING_CONFIG.coordinates,
        zoom: LANDING_CONFIG.zoomLevel,
        controls: ['zoomControl', 'geolocationControl', 'fullscreenControl']
      }, {
        searchControlProvider: 'yandex#search',
        suppressMapOpenBlock: true
      });

      // Кастомная метка с логотипом
      const clinicPlacemark = new ymaps.Placemark(LANDING_CONFIG.coordinates, {
        balloonContentHeader: `<strong>${LANDING_CONFIG.brand.nameRu}</strong>`,
        balloonContentBody: `
          <div style="padding: 6px 0; font-family: sans-serif; font-size: 14px; line-height: 1.4;">
            <p><strong>Адрес:</strong> ${LANDING_CONFIG.address}</p>
            <p><strong>Метро:</strong> ${LANDING_CONFIG.brand.metro}</p>
            <p><strong>Телефон:</strong> <a href="tel:${LANDING_CONFIG.phone.raw}">${LANDING_CONFIG.phone.display}</a></p>
            <p><strong>Время работы:</strong> ${LANDING_CONFIG.schedule.displayWeekday}</p>
            <p style="margin-top: 6px; color: #139A8C; font-weight: 600;">Бесплатная парковка со шлагбаумом</p>
          </div>
        `,
        balloonContentFooter: `<small>Клиника европейского уровня</small>`,
        hintContent: `${LANDING_CONFIG.brand.nameRu} — ${LANDING_CONFIG.brand.tagline}`
      }, {
        preset: 'islands#darkTurquoiseDotIconWithCaption',
        iconColor: '#139A8C'
      });

      map.geoObjects.add(clinicPlacemark);
      map.behaviors.disable('scrollZoom');

      // Успешно инициализировано
      if (fallbackOverlay) fallbackOverlay.classList.remove('active');
    } catch (err) {
      console.warn("Ошибка инициализации Яндекс Карт:", err);
      showFallback();
    }
  }).catch(() => {
    showFallback();
  });
}

/* ==========================================================================
   9. МОДАЛЬНОЕ ОКНО ЛИДОГЕНЕРАЦИИ (LEAD CAPTURE MODAL)
   ========================================================================== */

let activeModal = null;

function initModalHandlers() {
  const modalBackdrop = document.getElementById('appointment-modal');
  if (!modalBackdrop) return;

  const closeBtns = modalBackdrop.querySelectorAll('[data-modal-close]');
  const modalForm = modalBackdrop.querySelector('#lead-modal-form');
  const modalContentBlock = modalBackdrop.querySelector('.modal-form-content');
  const modalSuccessBlock = modalBackdrop.querySelector('.modal-success-screen');

  // Открытие модалки по кнопкам с атрибутом [data-open-modal]
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service') || "";
      openAppointmentModal(serviceName);
    });
  });

  // Закрытие
  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // Обработка отправки модальной формы
  if (modalForm) {
    modalForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const nameInput = this.querySelector('input[name="user_name"]');
      const phoneInput = this.querySelector('input[name="user_phone"]');
      const policyCheckbox = this.querySelector('input[type="checkbox"]');

      let isValid = true;

      if (!phoneInput || phoneInput.value.trim().length < 16) {
        phoneInput.classList.add('error');
        isValid = false;
      } else {
        phoneInput.classList.remove('error');
      }

      if (!policyCheckbox || !policyCheckbox.checked) {
        alert("Пожалуйста, подтвердите согласие на обработку персональных данных");
        isValid = false;
      }

      if (!isValid) return;

      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Отправка заявки...";
      }

      // Имитация интеграции с amoCRM / Bitrix24
      setTimeout(() => {
        if (modalContentBlock) modalContentBlock.style.display = 'none';
        if (modalSuccessBlock) modalSuccessBlock.classList.add('active');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Записаться на прием";
        }
      }, 750);
    });
  }
}

function openAppointmentModal(serviceName = "") {
  const modalBackdrop = document.getElementById('appointment-modal');
  if (!modalBackdrop) return;

  const serviceSelect = modalBackdrop.querySelector('select[name="service"]');
  if (serviceSelect && serviceName) {
    serviceSelect.value = serviceName;
  }

  const modalContentBlock = modalBackdrop.querySelector('.modal-form-content');
  const modalSuccessBlock = modalBackdrop.querySelector('.modal-success-screen');
  const modalForm = modalBackdrop.querySelector('#lead-modal-form');

  if (modalContentBlock) modalContentBlock.style.display = 'block';
  if (modalSuccessBlock) modalSuccessBlock.classList.remove('active');
  if (modalForm) modalForm.reset();

  modalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modalBackdrop = document.getElementById('appointment-modal');
  if (!modalBackdrop) return;
  modalBackdrop.classList.remove('active');
  document.body.style.overflow = '';
}

function openModalWithPreload({ title, desc, isSuccessState }) {
  const modalBackdrop = document.getElementById('appointment-modal');
  if (!modalBackdrop) return;

  const modalContentBlock = modalBackdrop.querySelector('.modal-form-content');
  const modalSuccessBlock = modalBackdrop.querySelector('.modal-success-screen');

  if (isSuccessState) {
    if (modalContentBlock) modalContentBlock.style.display = 'none';
    if (modalSuccessBlock) {
      modalSuccessBlock.classList.add('active');
      const titleEl = modalSuccessBlock.querySelector('.modal-title');
      const descEl = modalSuccessBlock.querySelector('.modal-desc');
      if (titleEl && title) titleEl.textContent = title;
      if (descEl && desc) descEl.textContent = desc;
    }
  }

  modalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   10. МОБИЛЬНОЕ МЕНЮ И НАВИГАЦИЯ
   ========================================================================== */

function initMobileMenu() {
  const burgerBtn = document.querySelector('.burger-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!burgerBtn || !mobileDrawer) return;

  function toggleMenu() {
    const isOpen = mobileDrawer.classList.contains('active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    burgerBtn.classList.add('active');
    mobileDrawer.classList.add('active');
    if (drawerOverlay) drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    burgerBtn.classList.remove('active');
    mobileDrawer.classList.remove('active');
    if (drawerOverlay) drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  burgerBtn.addEventListener('click', toggleMenu);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeMenu);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================================================
   11. ПЛАВНЫЙ СКРОЛЛ К ЯКОРЯМ С УЧЕТОМ ЛИПКОГО ХЕДЕРА
   ========================================================================== */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Эффект тени при скролле хедера
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

/* ==========================================================================
   12. ТАБЫ В СЕКЦИИ ЦЕН
   ========================================================================== */

function initPricingTabs() {
  const tabBtns = document.querySelectorAll('.pricing-tab-btn');
  const priceCards = document.querySelectorAll('.price-card');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      tabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-tab');

      priceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   13. УВЕДОМЛЕНИЯ (TOASTS)
   ========================================================================== */

function showToast(message) {
  let toast = document.querySelector('.app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'app-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #0B2545;
      color: #FFFFFF;
      padding: 14px 24px;
      border-radius: 9999px;
      font-size: 0.9rem;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(11, 37, 69, 0.3);
      z-index: 300;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
      opacity: 0;
      pointer-events: none;
      text-align: center;
      max-width: 90vw;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(100px)';
  }, 4000);
}

/* ==========================================================================
   14. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ DOM
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  bindLandingConfig();
  updateLiveWorkingStatus();
  setInterval(updateLiveWorkingStatus, 60000); // Обновление каждую минуту
  initPhoneMasks();
  initSmileQuiz();
  initDoctorPicker();
  initFaqAccordion();
  initModalHandlers();
  initMobileMenu();
  initSmoothScroll();
  initPricingTabs();

  // Запуск Яндекс Карт после легкой задержки для ускорения рендеринга страницы
  if (window.requestIdleCallback) {
    requestIdleCallback(() => initYandexMap());
  } else {
    setTimeout(initYandexMap, 800);
  }
});
