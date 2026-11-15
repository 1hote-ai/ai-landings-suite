/**
 * ============================================================================
 * ЭФИОПИЯ & ЗЕРНО — ОСНОВНОЙ СКРИПТ (SCRIPT.JS)
 * Спешелти ростери и слоу-бар в Москве
 * ============================================================================
 */

/**
 * ----------------------------------------------------------------------------
 * 1. КОНФИГУРАЦИЯ САЙТА (LANDING_CONFIG)
 * Изменяйте значения ниже, чтобы обновить контакты, адрес, время работы
 * и координаты на Яндекс Картах по всему сайту.
 * ----------------------------------------------------------------------------
 */
const LANDING_CONFIG = {
  brand: {
    name: "Эфиопия & Зерно",
    tagline: "Specialty Coffee Roastery & Slow Bar",
    city: "Москва",
    address: "ул. Покровка, 17, стр. 1, Москва",
    metro: "м. Чистые пруды / Курская (7 мин)",
    phone: "+7 (495) 822-45-90",
    phoneRaw: "+74958224590",
    email: "hello@ethiopia-grain.ru"
  },
  // Координаты локации ростери [широта, долгота]
  coordinates: [55.755814, 37.617635],
  mapZoom: 16,
  // График работы (в формате 24-часового времени ЧЧ:ММ для расчета онлайн-статуса)
  schedule: {
    weekdays: { 
      open: "08:00", 
      close: "22:00", 
      label: "Пн–Пт: 08:00 – 22:00" 
    },
    weekends: { 
      open: "09:00", 
      close: "23:00", 
      label: "Сб–Вс: 09:00 – 23:00" 
    }
  },
  socialLinks: {
    telegram: "https://t.me/ethiopia_grain",
    vk: "https://vk.com/ethiopia_grain",
    yandexMaps: "https://yandex.ru/maps/-/CDT4E56"
  }
};

/**
 * ----------------------------------------------------------------------------
 * 2. ДАННЫЕ ИНТЕРАКТИВНОГО БРЮ-ГИДА (BREW RECIPES)
 * ----------------------------------------------------------------------------
 */
const BREW_RECIPES = {
  v60: {
    badge: "Классическая воронка",
    title: "Hario V60: Хрустальная чистота и цветочные ноты",
    ratio: "1 : 16",
    coffeeWeight: "15.0 г",
    waterVolume: "240 мл (93–94°C)",
    grindSize: "Средний (как морская соль)",
    totalTime: "2 мин 45 сек",
    steps: [
      {
        num: "01",
        title: "Блуминг (предсмачивание) — 0:00 - 0:45",
        text: "Влейте 50 мл горячей воды круговыми движениями от центра к краям. Аккуратно взболтайте воронку для равномерного смачивания."
      },
      {
        num: "02",
        title: "Первый рабочий пролив — 0:45 - 1:20",
        text: "Равномерной медленной струей доведите общий вес воды до 140 мл. Держите носик чайника на высоте 3–4 см над поверхностью."
      },
      {
        num: "03",
        title: "Второй финишный пролив — 1:20 - 2:00",
        text: "Долейте оставшуюся воду до финальных 240 мл по спирали, избегая попадания прямой струи на стенки бумажного фильтра."
      },
      {
        num: "04",
        title: "Дренаж и подача — 2:00 - 2:45",
        text: "Сделайте одно легкое вращение сервером. Дождитесь полного стекания капель, дайте чашке остыть 1 минуту до 65°C и наслаждайтесь."
      }
    ],
    recBean: "Ethiopia Yirgacheffe Chelchele",
    recNotes: "— дескрипторы жасмина, бергамота и спелого белого персика"
  },
  aeropress: {
    badge: "Иммерсионный метод",
    title: "Аэропресс (Inverted): Плотное тело и сочная ягодность",
    ratio: "1 : 14",
    coffeeWeight: "16.5 г",
    waterVolume: "230 мл (88–90°C)",
    grindSize: "Средне-мелкий (мельче фильтра)",
    totalTime: "2 мин 15 сек",
    steps: [
      {
        num: "01",
        title: "Сборка перевернутого метода — 0:00",
        text: "Установите поршень в колбу на отметку 4. Промойте бумажный фильтр кипятком и засыпьте 16.5 г свежесмолотого кофе."
      },
      {
        num: "02",
        title: "Заливка и активное перемешивание — 0:00 - 0:30",
        text: "Быстро залейте 230 мл воды (89°C). Интенсивно перемешайте лопаткой в течение 15 секунд для экстракции ягодных сахаров."
      },
      {
        num: "03",
        title: "Настаивание (иммерсия) — 0:30 - 1:30",
        text: "Закрутите крышку с фильтром. Оставьте кофе завариваться в покое ровно на 1 минуту."
      },
      {
        num: "04",
        title: "Переворот и продавливание — 1:30 - 2:15",
        text: "Быстро и уверенно переверните аэропресс на чашку. Плавно продавите поршень вниз за 35–45 секунд, остановившись на первом шипении воздуха."
      }
    ],
    recBean: "Ethiopia Sidama Bombe Natural",
    recNotes: "— ноты клубничного джема, карамели и папайи"
  },
  chemex: {
    badge: "Праздничный пуровер",
    title: "Кемекс: Идеальная фильтрация для большой компании",
    ratio: "1 : 16.5",
    coffeeWeight: "30.0 г",
    waterVolume: "500 мл (94–95°C)",
    grindSize: "Крупный (как кошерная соль)",
    totalTime: "4 мин 00 сек",
    steps: [
      {
        num: "01",
        title: "Подготовка плотного фильтра — 0:00",
        text: "Уложите плотный трехслойный фильтр утолщенной стороной к носику кемекса. Обильно промойте 150 мл горячей воды и слейте ее."
      },
      {
        num: "02",
        title: "Глубокий блуминг — 0:00 - 0:45",
        text: "Засыпьте 30 г кофе и влейте 90 мл воды. Аккуратно перемешайте стеклянной палочкой для выхода углекислого газа."
      },
      {
        num: "03",
        title: "Каскадные проливы — 0:45 - 3:00",
        text: "В три приема (по 140 мл) доливайте воду круговыми плавными движениями, не допуская полного пересыхания кофейной таблетки."
      },
      {
        num: "04",
        title: "Аэрация — 3:00 - 4:00",
        text: "Уберите фильтр. Сделайте несколько круговых движений кемексом для насыщения напитка кислородом перед розливом в бокалы."
      }
    ],
    recBean: "Ethiopia Jimma Agaro Kolla",
    recNotes: "— сладкое красное яблоко, лесной орех и черный чай"
  },
  french: {
    badge: "Полное погружение",
    title: "Френч-пресс: Маслянистость и бархатное тело",
    ratio: "1 : 15",
    coffeeWeight: "20.0 г",
    waterVolume: "300 мл (95°C)",
    grindSize: "Крупный равномерный",
    totalTime: "4 мин 30 сек",
    steps: [
      {
        num: "01",
        title: "Прогрев колбы и засыпка — 0:00",
        text: "Ополосните стеклянную колбу кипятком, засыпьте 20 г кофе крупного помола."
      },
      {
        num: "02",
        title: "Заливка полным объемом — 0:00 - 0:30",
        text: "Одним непрерывным движением влейте 300 мл горячей воды (95°C). Закройте крышкой, не опуская плунжер."
      },
      {
        num: "03",
        title: "Разрушение кофейной корочки — 4:00",
        text: "Через 4 минуты снимите крышку и двумя ложками сломайте всплывшую пенку. Снимите белую пену с поверхности для чистоты чашки."
      },
      {
        num: "04",
        title: "Фильтрация без сжатия — 4:00 - 4:30",
        text: "Опустите сетку плунжера только до уровня жидкости, не прижимая осадок ко дну. Медленно перелейте в чашки."
      }
    ],
    recBean: "Ethiopia Sidama Bombe Natural",
    recNotes: "— шоколадный трюфель и спелые сушеные ягоды"
  },
  espresso: {
    badge: "Концентрированный шот",
    title: "Эспрессо / Гейзер (Moka): Яркая кислотность и плотная крема",
    ratio: "1 : 2.2",
    coffeeWeight: "18.5 г",
    waterVolume: "40 мл выход (93°C)",
    grindSize: "Тонкий эспрессо-помол",
    totalTime: "26–28 сек",
    steps: [
      {
        num: "01",
        title: "Подготовка корзины — 0:00",
        text: "Убедитесь, что холдер сухой и чистый. Смолите 18.5 г зерна тонкого помола с минимальным разбросом частиц."
      },
      {
        num: "02",
        title: "WDT и темперовка — 0:00",
        text: "Распределите кофейные комочки иголочным инструментом (WDT) и темперуйте с ровным давлением около 15 кг."
      },
      {
        num: "03",
        title: "Экстракция — 0:00 - 0:28",
        text: "Включите пролив группы. Первые капли должны появиться на 5–6 секунде ровной маслянистой струей цвета карамели."
      },
      {
        num: "04",
        title: "Оценка баланса чашки — 0:28",
        text: "Выход 40 г за 27 секунд. Перемешайте ложечкой слои крема и насладитесь балансом яркой фруктовой кислотности и сладости."
      }
    ],
    recBean: "Ethiopia Guji Uraga Anaerobic",
    recNotes: "— взрыв тропических фруктов, маракуйи и ликёрная плотность"
  }
};

/**
 * ----------------------------------------------------------------------------
 * 3. ПРИВЯЗКА КОНФИГУРАЦИИ К DOM (DOM BINDING)
 * ----------------------------------------------------------------------------
 */
function bindLandingConfig() {
  // Текстовые параметры бренда
  document.querySelectorAll('[data-config="brandName"]').forEach(el => {
    el.textContent = LANDING_CONFIG.brand.name;
  });
  document.querySelectorAll('[data-config="brandTagline"]').forEach(el => {
    el.textContent = LANDING_CONFIG.brand.tagline;
  });
  document.querySelectorAll('[data-config="brandAddress"]').forEach(el => {
    el.textContent = LANDING_CONFIG.brand.address;
  });
  document.querySelectorAll('[data-config="brandMetro"]').forEach(el => {
    el.textContent = LANDING_CONFIG.brand.metro;
  });
  document.querySelectorAll('[data-config="brandPhone"]').forEach(el => {
    el.textContent = LANDING_CONFIG.brand.phone;
  });
  document.querySelectorAll('[data-config="brandPhoneLink"]').forEach(el => {
    el.setAttribute('href', `tel:${LANDING_CONFIG.brand.phoneRaw}`);
  });
  document.querySelectorAll('[data-config="brandEmail"]').forEach(el => {
    el.textContent = LANDING_CONFIG.brand.email;
    el.setAttribute('href', `mailto:${LANDING_CONFIG.brand.email}`);
  });

  // График работы в тексте
  const schedWd = document.getElementById('scheduleWeekdaysText');
  if (schedWd) schedWd.textContent = LANDING_CONFIG.schedule.weekdays.label;
  
  const schedWe = document.getElementById('scheduleWeekendsText');
  if (schedWe) schedWe.textContent = LANDING_CONFIG.schedule.weekends.label;

  const footerSched = document.getElementById('footerScheduleLabel');
  if (footerSched) {
    footerSched.textContent = `${LANDING_CONFIG.schedule.weekdays.label} / ${LANDING_CONFIG.schedule.weekends.label}`;
  }

  // Социальные ссылки
  document.querySelectorAll('[data-config="socialTelegram"]').forEach(el => {
    el.setAttribute('href', LANDING_CONFIG.socialLinks.telegram);
  });
  document.querySelectorAll('[data-config="socialVk"]').forEach(el => {
    el.setAttribute('href', LANDING_CONFIG.socialLinks.vk);
  });
  document.querySelectorAll('[data-config="socialYandexMaps"]').forEach(el => {
    el.setAttribute('href', LANDING_CONFIG.socialLinks.yandexMaps);
  });

  // Текущий год в копирайте
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * ----------------------------------------------------------------------------
 * 4. ДИНАМИЧЕСКИЙ РАСЧЕТ СТАТУСА РАБОТЫ ("ОТКРЫТО СЕЙЧАС" / "ЗАКРЫТО")
 * ----------------------------------------------------------------------------
 */
function updateWorkingHoursStatus() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 - воскресенье, 1..5 - будни, 6 - суббота
  const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
  
  const rule = isWeekend ? LANDING_CONFIG.schedule.weekends : LANDING_CONFIG.schedule.weekdays;
  
  const [openHour, openMin] = rule.open.split(':').map(Number);
  const [closeHour, closeMin] = rule.close.split(':').map(Number);

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openHour * 60 + openMin;
  const closeMinutes = closeHour * 60 + closeMin;

  const isOpen = (currentMinutes >= openMinutes && currentMinutes < closeMinutes);

  const pills = [
    { container: document.getElementById('workingStatusPill'), label: document.getElementById('workingStatusLabel') },
    { container: document.getElementById('mobileStatusPill'), label: document.getElementById('mobileStatusLabel') }
  ];

  const contactsLabel = document.getElementById('contactsStatusLabel');

  pills.forEach(({ container, label }) => {
    if (!container || !label) return;
    if (isOpen) {
      container.classList.remove('is-closed');
      label.textContent = `Открыто сейчас (до ${rule.close})`;
    } else {
      container.classList.add('is-closed');
      label.textContent = `Закрыто (откроемся в ${rule.open})`;
    }
  });

  if (contactsLabel) {
    if (isOpen) {
      contactsLabel.textContent = `● Открыто сейчас (ждем вас до ${rule.close})`;
      contactsLabel.style.color = "var(--color-success)";
    } else {
      contactsLabel.textContent = `○ Сейчас закрыто (откроемся в ${rule.open})`;
      contactsLabel.style.color = "var(--color-roasted-amber)";
    }
  }
}

/**
 * ----------------------------------------------------------------------------
 * 5. ИНИЦИАЛИЗАЦИЯ ИНТЕРАКТИВНОЙ КАРТЫ (ЯНДЕКС.КАРТЫ 2.1)
 * ----------------------------------------------------------------------------
 */
function initYandexMaps() {
  const mapElement = document.getElementById('yandex-map');
  const loadingElement = document.getElementById('mapLoadingState');
  if (!mapElement) return;

  // Динамически загружаем API Яндекс Карт, если еще не подключен
  if (typeof ymaps === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.async = true;

    script.onload = () => {
      ymaps.ready(createMapInstance);
    };

    script.onerror = () => {
      if (loadingElement) {
        loadingElement.innerHTML = `
          <p style="text-align:center; padding: 20px;">
            Интерактивная карта временно недоступна.<br>
            <a href="${LANDING_CONFIG.socialLinks.yandexMaps}" target="_blank" rel="noopener noreferrer" style="color:var(--color-terracotta); text-decoration:underline; font-weight:600; display:inline-block; margin-top:8px;">
              Открыть маршрут в приложении Яндекс.Карты &rarr;
            </a>
          </p>
        `;
      }
    };

    document.head.appendChild(script);
  } else {
    ymaps.ready(createMapInstance);
  }

  function createMapInstance() {
    try {
      const myMap = new ymaps.Map('yandex-map', {
        center: LANDING_CONFIG.coordinates,
        zoom: LANDING_CONFIG.mapZoom,
        controls: ['zoomControl', 'fullscreenControl']
      }, {
        searchControlProvider: 'yandex#search'
      });

      // Отключаем зум колесиком мыши по умолчанию, чтобы не мешать скроллу
      myMap.behaviors.disable('scrollZoom');

      // Создаем кастомный маркер
      const placemark = new ymaps.Placemark(LANDING_CONFIG.coordinates, {
        hintContent: `${LANDING_CONFIG.brand.name} — Слоу-бар и ростери`,
        balloonContentHeader: `<strong>${LANDING_CONFIG.brand.name}</strong>`,
        balloonContentBody: `
          <div style="font-family: inherit; font-size: 13px; line-height: 1.5;">
            <p><strong>Адрес:</strong> ${LANDING_CONFIG.brand.address}</p>
            <p><strong>Метро:</strong> ${LANDING_CONFIG.brand.metro}</p>
            <p><strong>Режим:</strong> ${LANDING_CONFIG.schedule.weekdays.label}</p>
            <p style="margin-top:6px;"><a href="tel:${LANDING_CONFIG.brand.phoneRaw}" style="color:#C86D51; font-weight:600;">${LANDING_CONFIG.brand.phone}</a></p>
          </div>
        `,
        balloonContentFooter: `<em>Свежий обжар и альтернативный бар</em>`
      }, {
        preset: 'islands#brownDotIconWithCaption',
        iconCaption: 'Эфиопия & Зерно'
      });

      myMap.geoObjects.add(placemark);

      // Скрываем состояние загрузки
      if (loadingElement) {
        loadingElement.style.opacity = '0';
        setTimeout(() => {
          loadingElement.style.display = 'none';
        }, 300);
      }
    } catch (err) {
      console.warn("Ошибка инициализации карты:", err);
      if (loadingElement) {
        loadingElement.style.display = 'none';
      }
    }
  }
}

/**
 * ----------------------------------------------------------------------------
 * 6. ФИЛЬТРАЦИЯ КАТАЛОГА МИКРОЛОТОВ
 * ----------------------------------------------------------------------------
 */
function initCatalogFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const coffeeCards = document.querySelectorAll('.coffee-card');

  if (!filterTabs.length || !coffeeCards.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');

      // Обновляем активный класс на кнопках
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Фильтруем карточки
      coffeeCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

/**
 * ----------------------------------------------------------------------------
 * 7. ИНТЕРАКТИВНЫЙ БРЮ-ГИД (МЕТОДЫ И РЕЦЕПТЫ)
 * ----------------------------------------------------------------------------
 */
function initBrewGuide() {
  const methodButtons = document.querySelectorAll('.brew-method-btn');
  const badgeEl = document.getElementById('brewBadge');
  const titleEl = document.getElementById('brewTitle');
  const ratioEl = document.getElementById('brewRatio');
  const coffeeWeightEl = document.getElementById('brewCoffeeWeight');
  const waterVolumeEl = document.getElementById('brewWaterVolume');
  const grindSizeEl = document.getElementById('brewGrindSize');
  const totalTimeEl = document.getElementById('brewTotalTime');
  const stepsListEl = document.getElementById('brewStepsList');
  const recBeanEl = document.getElementById('brewRecBean');
  const recNotesEl = document.getElementById('brewRecNotes');

  if (!methodButtons.length || !stepsListEl) return;

  function renderRecipe(methodKey) {
    const data = BREW_RECIPES[methodKey];
    if (!data) return;

    if (badgeEl) badgeEl.textContent = data.badge;
    if (titleEl) titleEl.textContent = data.title;
    if (ratioEl) ratioEl.textContent = data.ratio;
    if (coffeeWeightEl) coffeeWeightEl.textContent = data.coffeeWeight;
    if (waterVolumeEl) waterVolumeEl.textContent = data.waterVolume;
    if (grindSizeEl) grindSizeEl.textContent = data.grindSize;
    if (totalTimeEl) totalTimeEl.textContent = data.totalTime;
    if (recBeanEl) recBeanEl.textContent = data.recBean;
    if (recNotesEl) recNotesEl.textContent = data.recNotes;

    // Очищаем и строим шаги
    stepsListEl.innerHTML = '';
    data.steps.forEach(step => {
      const stepItem = document.createElement('div');
      stepItem.className = 'step-card';
      stepItem.innerHTML = `
        <span class="step-num">${step.num}</span>
        <div class="step-content">
          <strong>${step.title}</strong>
          <p>${step.text}</p>
        </div>
      `;
      stepsListEl.appendChild(stepItem);
    });
  }

  // Первичный рендер по умолчанию (v60)
  renderRecipe('v60');

  methodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const method = btn.getAttribute('data-method');
      methodButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      renderRecipe(method);
    });
  });
}

/**
 * ----------------------------------------------------------------------------
 * 8. FAQ АККОРДЕОН (ACCORDION)
 * ----------------------------------------------------------------------------
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');

    if (!header || !content) return;

    header.addEventListener('click', () => {
      const isOpen = header.getAttribute('aria-expanded') === 'true';

      // Закрываем другие пункты
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          const otherHeader = otherItem.querySelector('.faq-header');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherHeader && otherContent) {
            otherHeader.setAttribute('aria-expanded', 'false');
            otherContent.style.maxHeight = null;
            otherItem.classList.remove('is-open');
          }
        }
      });

      // Переключаем текущий
      if (isOpen) {
        header.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
        item.classList.remove('is-open');
      } else {
        header.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = `${content.scrollHeight}px`;
        item.classList.add('is-open');
      }
    });
  });
}

/**
 * ----------------------------------------------------------------------------
 * 9. МАСКА НОМЕРА ТЕЛЕФОНА (+7 (XXX) XXX-XX-XX)
 * ----------------------------------------------------------------------------
 */
function initPhoneMask(input) {
  if (!input) return;

  function formatPhone(value) {
    // Оставляем только цифры
    let digits = value.replace(/\D/g, '');

    // Если начинается с 8 или 7, заменяем первую цифру на 7
    if (digits.startsWith('8') || digits.startsWith('7')) {
      digits = '7' + digits.substring(1);
    } else if (digits.length > 0) {
      digits = '7' + digits;
    }

    // Обрезаем до 11 цифр (код страны + 10 цифр)
    digits = digits.substring(0, 11);

    let formatted = '';
    if (digits.length > 0) {
      formatted = '+7';
    }
    if (digits.length > 1) {
      formatted += ' (' + digits.substring(1, 4);
    }
    if (digits.length >= 5) {
      formatted += ') ' + digits.substring(4, 7);
    }
    if (digits.length >= 8) {
      formatted += '-' + digits.substring(7, 9);
    }
    if (digits.length >= 10) {
      formatted += '-' + digits.substring(9, 11);
    }

    return formatted;
  }

  input.addEventListener('input', (e) => {
    const prevVal = input.value;
    const formatted = formatPhone(prevVal);
    input.value = formatted;
  });

  input.addEventListener('keydown', (e) => {
    // Разрешаем удаление символов корректно
    if (e.key === 'Backspace' && input.value === '+7') {
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
}

/**
 * ----------------------------------------------------------------------------
 * 10. МОДАЛЬНЫЕ ОКНА И ЗАХВАТ ЛИДОВ (MODALS & LEAD CAPTURE)
 * ----------------------------------------------------------------------------
 */
function initModals() {
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const closeButtons = document.querySelectorAll('.modal-close-btn');
  const backdrops = document.querySelectorAll('.modal-backdrop');
  const coffeeInput = document.getElementById('formCoffee');
  const leadForm = document.getElementById('leadForm');
  const submitBtn = document.getElementById('submitBtn');
  const formContainer = document.getElementById('modalFormContainer');
  const successContainer = document.getElementById('modalSuccessContainer');
  const successSummary = document.getElementById('successSummary');
  const successCloseBtn = document.getElementById('successCloseBtn');
  const phoneInput = document.getElementById('formPhone');

  // Инициализируем маску на поле телефона
  initPhoneMask(phoneInput);

  function openModal(modalId, coffeeChoice = null) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    if (coffeeChoice && coffeeInput) {
      coffeeInput.value = coffeeChoice;
    }

    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Фокусируемся на первом поле ввода
    const firstInput = modal.querySelector('input:not([readonly]), textarea');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function closeAllModals() {
    backdrops.forEach(closeModal);
  }

  // Клик по триггеру открытия
  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-modal') || 'orderModal';
      const coffee = btn.getAttribute('data-coffee');
      openModal(modalId, coffee);
    });
  });

  // Клик по крестику
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      closeModal(modal);
    });
  });

  // Клик по фону (backdrop)
  backdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  // Закрытие по клавише Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Кнопка возврата из экрана успеха
  if (successCloseBtn) {
    successCloseBtn.addEventListener('click', () => {
      closeAllModals();
      // Возвращаем форму в исходное состояние
      setTimeout(() => {
        if (formContainer && successContainer) {
          formContainer.style.display = 'block';
          successContainer.style.display = 'none';
        }
      }, 400);
    });
  }

  // ВАЛИДАЦИЯ И ОТПРАВКА ФОРМЫ ЗАЯВКИ
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('formName');
      const nameError = document.getElementById('nameError');
      const phoneError = document.getElementById('phoneError');
      const consentInput = document.getElementById('formConsent');
      const consentError = document.getElementById('consentError');

      let isValid = true;

      // Валидация имени
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal || nameVal.length < 2) {
        isValid = false;
        if (nameInput) nameInput.classList.add('is-invalid');
        if (nameError) nameError.classList.add('is-visible');
      } else {
        if (nameInput) nameInput.classList.remove('is-invalid');
        if (nameError) nameError.classList.remove('is-visible');
      }

      // Валидация телефона (должно быть не менее 11 цифр)
      const phoneDigits = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';
      if (phoneDigits.length < 11) {
        isValid = false;
        if (phoneInput) phoneInput.classList.add('is-invalid');
        if (phoneError) phoneError.classList.add('is-visible');
      } else {
        if (phoneInput) phoneInput.classList.remove('is-invalid');
        if (phoneError) phoneError.classList.remove('is-visible');
      }

      // Валидация согласия
      if (consentInput && !consentInput.checked) {
        isValid = false;
        if (consentError) consentError.classList.add('is-visible');
      } else {
        if (consentError) consentError.classList.remove('is-visible');
      }

      if (!isValid) return;

      // Симуляция отправки заявки
      if (submitBtn) {
        submitBtn.classList.add('is-loading');
        submitBtn.disabled = true;
      }

      const methodRadio = leadForm.querySelector('input[name="contactMethod"]:checked');
      const methodLabel = methodRadio ? methodRadio.value.toUpperCase() : 'TELEGRAM';
      const commentInput = document.getElementById('formComment');

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.classList.remove('is-loading');
          submitBtn.disabled = false;
        }

        // Заполняем сводку в экране успеха
        if (successSummary) {
          successSummary.innerHTML = `
            <p><strong>Позиция:</strong> ${coffeeInput ? coffeeInput.value : 'Заказ зерна'}</p>
            <p><strong>Имя:</strong> ${nameVal}</p>
            <p><strong>Телефон:</strong> ${phoneInput ? phoneInput.value : ''}</p>
            <p><strong>Способ связи:</strong> ${methodLabel}</p>
            ${commentInput && commentInput.value.trim() ? `<p><strong>Пожелания:</strong> ${commentInput.value.trim()}</p>` : ''}
          `;
        }

        if (formContainer && successContainer) {
          formContainer.style.display = 'none';
          successContainer.style.display = 'block';
        }

        // Сбрасываем форму
        leadForm.reset();
        showToast("Заявка успешно оформлена! Ожидайте ответа бариста.");
      }, 700);
    });
  }
}

/**
 * ----------------------------------------------------------------------------
 * 11. МОБИЛЬНОЕ МЕНЮ (MOBILE DRAWER NAV)
 * ----------------------------------------------------------------------------
 */
function initMobileDrawer() {
  const burgerBtn = document.getElementById('burgerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const navLinks = drawer ? drawer.querySelectorAll('.mobile-nav__link, .modal-trigger') : [];

  if (!burgerBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('is-active');
    drawer.setAttribute('aria-hidden', 'false');
    burgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('is-active');
    drawer.setAttribute('aria-hidden', 'true');
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burgerBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

/**
 * ----------------------------------------------------------------------------
 * 12. СКРОЛЛ ХЕДЕРА И ПЛАВНАЯ НАВИГАЦИЯ
 * ----------------------------------------------------------------------------
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }, { passive: true });
}

/**
 * ----------------------------------------------------------------------------
 * 13. СИСТЕМА УВЕДОМЛЕНИЙ (TOAST NOTIFICATION)
 * ----------------------------------------------------------------------------
 */
function showToast(message, duration = 4000) {
  const toast = document.getElementById('toastNotification');
  const messageEl = document.getElementById('toastMessage');
  if (!toast || !messageEl) return;

  messageEl.textContent = message;
  toast.classList.add('is-active');

  setTimeout(() => {
    toast.classList.remove('is-active');
  }, duration);
}

/**
 * ----------------------------------------------------------------------------
 * 14. ФОРМА ПОДПИСКИ В ФУТЕРЕ (NEWSLETTER)
 * ----------------------------------------------------------------------------
 */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && input.value) {
      showToast("Спасибо за подписку! Будем присылать только свежие микролоты.");
      form.reset();
    }
  });
}

/**
 * ----------------------------------------------------------------------------
 * ИНИЦИАЛИЗАЦИЯ ВСЕХ МОДУЛЕЙ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
 * ----------------------------------------------------------------------------
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Привязка конфигурации
  bindLandingConfig();

  // 2. Расчет времени работы и периодическое обновление
  updateWorkingHoursStatus();
  setInterval(updateWorkingHoursStatus, 60000);

  // 3. Инициализация карты
  initYandexMaps();

  // 4. Фильтры каталога
  initCatalogFilters();

  // 5. Интерактивный брю-гид
  initBrewGuide();

  // 6. Аккордеон FAQ
  initFaqAccordion();

  // 7. Модальные окна
  initModals();

  // 8. Мобильное меню
  initMobileDrawer();

  // 9. Скролл хедера
  initHeaderScroll();

  // 10. Подписка в футере
  initNewsletter();
});
