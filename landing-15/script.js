/**
 * ==========================================================================
 * AZUR NAUTICA — Mediterranean Luxury Yacht Charter
 * script.js — Landing Page Controller & Interactive Features
 * ==========================================================================
 */

'use strict';

/**
 * --------------------------------------------------------------------------
 * 1. LANDING CONFIGURATION OBJECT
 * --------------------------------------------------------------------------
 * Централизованная конфигурация компании. Все значения автоматически
 * синхронизируются с элементами страницы при загрузке.
 */
const LANDING_CONFIG = {
  // Название бренда и юридическое лицо
  brand: 'AZUR Nautica',
  legalName: 'AZUR Nautica LLC',
  tagline: 'Mediterranean Luxury Yacht Charter',

  // Контактные телефоны
  phone: '+7 (495) 822-45-70',
  phoneRaw: '+74958224570',

  // Электронная почта
  email: 'charter@azur-nautica.com',

  // Физический адрес офиса
  address: 'Москва, Пресненская наб., 12, Башня Федерация Восток, 38 этаж',
  shortAddress: 'Москва, Пресненская наб., 12 (Москва-Сити)',

  // Рабочий график (по Московскому времени UTC+3)
  schedule: 'Ежедневно: 09:00 — 21:00 (МСК)',
  workingHours: {
    startHour: 9,   // 09:00
    startMinute: 0,
    endHour: 21,    // 21:00
    endMinute: 0,
    timezoneOffsetHours: 3 // MSK = UTC+3
  },

  // Географические координаты офиса для Яндекс.Карт [широта, долгота]
  coordinates: [55.748312, 37.538914],
  mapZoom: 16,
  mapPinTitle: 'AZUR Nautica • Флагманский офис',
  mapPinDescription: 'Башня Федерация Восток, 38 этаж. Прием по предварительной записи.',

  // Социальные сети и мессенджеры
  socialLinks: {
    telegram: 'https://t.me/azur_nautica_charter',
    whatsapp: 'https://wa.me/74958224570?text=%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%B9%20%D0%B4%D0%B5%D0%BD%D1%8C!%20%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%B5%D1%81%D1%83%D0%B5%D1%82%20%D0%B0%D1%80%D0%B5%D0%BD%D0%B4%D0%B0%20%D1%8F%D1%85%D1%82%D1%8B%20%D0%B2%20%D0%A1%D1%80%D0%B5%D0%B4%D0%B8%D0%B7%D0%B5%D0%BC%D0%BD%D0%BE%D0%BC%20%D0%BC%D0%BE%D1%80%D0%B5.',
    instagram: 'https://instagram.com/azur_nautica',
    youtube: 'https://youtube.com/@azur_nautica'
  },

  // Курс пересчета EUR -> RUB для калькулятора
  eurToRubRate: 102.0
};


/**
 * --------------------------------------------------------------------------
 * 2. DOM CONTENT LOADED ENTRY POINT
 * --------------------------------------------------------------------------
 */
document.addEventListener('DOMContentLoaded', () => {
  initDOMBinding();
  initWorkingHoursStatus();
  initStickyHeader();
  initMobileDrawer();
  initFleetFilters();
  initCharterCalculator();
  initFAQAccordion();
  initPhoneMasks();
  initLeadForms();
  initModals();
  initYandexMap();
});


/**
 * --------------------------------------------------------------------------
 * 3. BIND LANDING_CONFIG TO DOM ELEMENTS
 * --------------------------------------------------------------------------
 */
function initDOMBinding() {
  // Название бренда
  const brandDisplay = document.getElementById('brand-name-display');
  if (brandDisplay) brandDisplay.textContent = LANDING_CONFIG.brand;

  const footerBrand = document.getElementById('footer-brand-copy');
  if (footerBrand) footerBrand.textContent = LANDING_CONFIG.legalName;

  // Телефон в шапке и подвале
  const headerPhoneText = document.getElementById('header-phone-text');
  const headerPhoneLink = document.getElementById('header-phone-link');
  if (headerPhoneText) headerPhoneText.textContent = LANDING_CONFIG.phone;
  if (headerPhoneLink) headerPhoneLink.href = `tel:${LANDING_CONFIG.phoneRaw}`;

  const footerPhone = document.getElementById('footer-phone');
  if (footerPhone) {
    footerPhone.textContent = LANDING_CONFIG.phone;
    footerPhone.href = `tel:${LANDING_CONFIG.phoneRaw}`;
  }

  const cardPhone = document.getElementById('card-phone');
  if (cardPhone) {
    cardPhone.textContent = LANDING_CONFIG.phone;
    cardPhone.href = `tel:${LANDING_CONFIG.phoneRaw}`;
  }

  const drawerPhone = document.getElementById('drawer-phone');
  if (drawerPhone) {
    drawerPhone.textContent = LANDING_CONFIG.phone;
    drawerPhone.href = `tel:${LANDING_CONFIG.phoneRaw}`;
  }

  // Email
  const topEmail = document.getElementById('top-bar-email');
  const topEmailText = document.getElementById('top-bar-email-text');
  if (topEmail) topEmail.href = `mailto:${LANDING_CONFIG.email}`;
  if (topEmailText) topEmailText.textContent = LANDING_CONFIG.email;

  const cardEmail = document.getElementById('card-email');
  if (cardEmail) {
    cardEmail.textContent = LANDING_CONFIG.email;
    cardEmail.href = `mailto:${LANDING_CONFIG.email}`;
  }

  const drawerEmail = document.getElementById('drawer-email');
  if (drawerEmail) {
    drawerEmail.textContent = LANDING_CONFIG.email;
    drawerEmail.href = `mailto:${LANDING_CONFIG.email}`;
  }

  const footerEmail = document.getElementById('footer-email');
  if (footerEmail) {
    footerEmail.textContent = LANDING_CONFIG.email;
    footerEmail.href = `mailto:${LANDING_CONFIG.email}`;
  }

  // Адрес
  const topAddress = document.getElementById('top-bar-address');
  if (topAddress) topAddress.textContent = LANDING_CONFIG.shortAddress;

  const cardAddress = document.getElementById('card-address');
  if (cardAddress) cardAddress.textContent = LANDING_CONFIG.address;

  const footerAddress = document.getElementById('footer-address');
  if (footerAddress) footerAddress.textContent = LANDING_CONFIG.address;

  // График
  const cardSchedule = document.getElementById('card-schedule');
  if (cardSchedule) cardSchedule.textContent = LANDING_CONFIG.schedule;

  const footerSchedule = document.getElementById('footer-schedule');
  if (footerSchedule) footerSchedule.textContent = LANDING_CONFIG.schedule;

  const drawerSchedule = document.getElementById('drawer-schedule');
  if (drawerSchedule) drawerSchedule.textContent = LANDING_CONFIG.schedule;

  // Социальные сети
  const topTg = document.getElementById('top-telegram-link');
  if (topTg) topTg.href = LANDING_CONFIG.socialLinks.telegram;
  const topWa = document.getElementById('top-whatsapp-link');
  if (topWa) topWa.href = LANDING_CONFIG.socialLinks.whatsapp;

  const footerTg = document.getElementById('footer-tg-link');
  if (footerTg) footerTg.href = LANDING_CONFIG.socialLinks.telegram;
  const footerWa = document.getElementById('footer-wa-link');
  if (footerWa) footerWa.href = LANDING_CONFIG.socialLinks.whatsapp;
  const footerYt = document.getElementById('footer-yt-link');
  if (footerYt) footerYt.href = LANDING_CONFIG.socialLinks.youtube;
  const footerInst = document.getElementById('footer-inst-link');
  if (footerInst) footerInst.href = LANDING_CONFIG.socialLinks.instagram;

  // Текущий год в копирайте
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

  // Ссылка на карту
  const mapFallbackLink = document.getElementById('map-fallback-link');
  if (mapFallbackLink) {
    const [lat, lon] = LANDING_CONFIG.coordinates;
    mapFallbackLink.href = `https://yandex.ru/maps/?pt=${lon},${lat}&z=${LANDING_CONFIG.mapZoom}&l=map`;
  }
}


/**
 * --------------------------------------------------------------------------
 * 4. LIVE WORKING HOURS STATUS
 * --------------------------------------------------------------------------
 * Проверяет текущее московское время и выводит статус работы офиса.
 */
function initWorkingHoursStatus() {
  const statusEl = document.getElementById('live-working-status');
  const pulseEl = document.getElementById('status-pulse-indicator');
  if (!statusEl) return;

  function updateStatus() {
    // Получаем текущее время UTC
    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();

    // Московское время: UTC + 3
    const mskHours = (utcHours + LANDING_CONFIG.workingHours.timezoneOffsetHours) % 24;
    const mskTotalMinutes = mskHours * 60 + utcMinutes;

    const openMinutes = LANDING_CONFIG.workingHours.startHour * 60 + LANDING_CONFIG.workingHours.startMinute;
    const closeMinutes = LANDING_CONFIG.workingHours.endHour * 60 + LANDING_CONFIG.workingHours.endMinute;

    const isOpen = mskTotalMinutes >= openMinutes && mskTotalMinutes < closeMinutes;

    if (isOpen) {
      statusEl.textContent = 'Открыто сейчас (09:00 — 21:00 МСК)';
      statusEl.style.color = '#FFFFFF';
      if (pulseEl) {
        pulseEl.classList.remove('status-closed');
      }
    } else {
      statusEl.textContent = 'Офис откроется в 09:00 МСК (прием заявок 24/7)';
      statusEl.style.color = '#FDE047';
      if (pulseEl) {
        pulseEl.classList.add('status-closed');
      }
    }
  }

  updateStatus();
  // Обновляем статус каждые 60 секунд
  setInterval(updateStatus, 60000);
}


/**
 * --------------------------------------------------------------------------
 * 5. STICKY HEADER SCROLL EFFECT
 * --------------------------------------------------------------------------
 */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}


/**
 * --------------------------------------------------------------------------
 * 6. MOBILE DRAWER NAVIGATION
 * --------------------------------------------------------------------------
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('drawer-toggle-btn');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const closeBtn = document.getElementById('drawer-close-btn');
  const actionBtn = document.getElementById('drawer-action-btn');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  if (actionBtn) {
    actionBtn.addEventListener('click', () => {
      closeDrawer();
      openBookingModal('Индивидуальный подбор яхты');
    });
  }

  // Закрытие по клавише Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}


/**
 * --------------------------------------------------------------------------
 * 7. FLEET CATEGORY FILTERS
 * --------------------------------------------------------------------------
 */
function initFleetFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const yachtCards = document.querySelectorAll('.yacht-card');

  if (!filterButtons.length || !yachtCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.dataset.filter;

      yachtCards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease';
            card.style.opacity = '1';
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}


/**
 * --------------------------------------------------------------------------
 * 8. INTERACTIVE YACHT ROUTE & CHARTER DURATION COST CALCULATOR
 * --------------------------------------------------------------------------
 */
function initCharterCalculator() {
  const yachtSelect = document.getElementById('calc-yacht-select');
  const routeSelect = document.getElementById('calc-route-select');
  const durationBtns = document.querySelectorAll('.duration-btn');
  const durationInput = document.getElementById('calc-duration-days');
  const vipCheckboxes = document.querySelectorAll('.calc-vip-checkbox');

  // Элементы вывода результатов
  const summaryYachtName = document.getElementById('summary-yacht-name');
  const summaryRouteName = document.getElementById('summary-route-name');
  const summaryDurationText = document.getElementById('summary-duration-text');
  const summaryBasePrice = document.getElementById('summary-base-price');
  const summaryOptionsPrice = document.getElementById('summary-options-price');
  const summaryApaDeposit = document.getElementById('summary-apa-deposit');
  const summaryTotalEur = document.getElementById('summary-total-eur');
  const summaryTotalRub = document.getElementById('summary-total-rub');
  const calcBookingBtn = document.getElementById('calc-booking-btn');

  if (!yachtSelect || !routeSelect || !summaryTotalEur) return;

  // Форматирование валюты с разделителями тысяч
  function formatMoney(amount, currency = '€') {
    const formatted = Math.round(amount).toLocaleString('ru-RU');
    return currency === '€' ? `€${formatted}` : `${formatted} ₽`;
  }

  // Расчет стоимости
  function calculateTotal() {
    const selectedYachtOpt = yachtSelect.options[yachtSelect.selectedIndex];
    const baseDailyRate = parseFloat(selectedYachtOpt.dataset.daily) || 5000;
    const yachtName = selectedYachtOpt.dataset.name || selectedYachtOpt.textContent;

    const selectedRouteOpt = routeSelect.options[routeSelect.selectedIndex];
    const routeMarkup = parseFloat(selectedRouteOpt.dataset.markup) || 1.0;
    const routeName = selectedRouteOpt.dataset.name || selectedRouteOpt.textContent;

    const days = parseInt(durationInput.value, 10) || 7;

    // Базовая стоимость аренды судна с учетом коэффициента региона
    // Если аренда 7 дней и более — действует скидка 5%
    let durationDiscount = 1.0;
    if (days >= 14) {
      durationDiscount = 0.90; // -10% за 2 недели
    } else if (days >= 7) {
      durationDiscount = 0.95; // -5% за неделю
    }

    const calculatedBasePrice = baseDailyRate * days * routeMarkup * durationDiscount;

    // Расчет VIP-опций
    let totalOptionsCost = 0;
    vipCheckboxes.forEach(cb => {
      if (cb.checked) {
        const cost = parseFloat(cb.dataset.cost) || 0;
        // Если стоимость опции свыше 1000 - это фиксированная услуга (трансфер/съемка), иначе посуточная
        if (cost >= 1000) {
          totalOptionsCost += cost;
        } else {
          totalOptionsCost += cost * days;
        }
      }
    });

    // Депозит APA (Advance Provisioning Allowance) — традиционно 30% от базовой стоимости
    const apaDeposit = Math.round(calculatedBasePrice * 0.30);

    // Итого EUR
    const grandTotalEur = Math.round(calculatedBasePrice + totalOptionsCost + apaDeposit);
    // Итого RUB
    const grandTotalRub = Math.round(grandTotalEur * LANDING_CONFIG.eurToRubRate);

    // Обновление UI
    if (summaryYachtName) summaryYachtName.textContent = yachtName;
    if (summaryRouteName) summaryRouteName.textContent = routeName;
    if (summaryDurationText) {
      let daysWord = 'дней';
      if (days === 1) daysWord = 'день';
      else if (days >= 2 && days <= 4) daysWord = 'дня';
      summaryDurationText.textContent = `${days} ${daysWord}`;
    }
    if (summaryBasePrice) summaryBasePrice.textContent = formatMoney(calculatedBasePrice, '€');
    if (summaryOptionsPrice) summaryOptionsPrice.textContent = formatMoney(totalOptionsCost, '€');
    if (summaryApaDeposit) summaryApaDeposit.textContent = formatMoney(apaDeposit, '€');
    if (summaryTotalEur) summaryTotalEur.textContent = formatMoney(grandTotalEur, '€');
    if (summaryTotalRub) summaryTotalRub.textContent = `≈ ${formatMoney(grandTotalRub, '₽')}`;

    return {
      yachtName,
      routeName,
      days,
      calculatedBasePrice,
      totalOptionsCost,
      apaDeposit,
      grandTotalEur,
      grandTotalRub
    };
  }

  // Слушатели событий формы калькулятора
  yachtSelect.addEventListener('change', calculateTotal);
  routeSelect.addEventListener('change', calculateTotal);

  durationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      durationBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      durationInput.value = btn.dataset.days;
      calculateTotal();
    });
  });

  vipCheckboxes.forEach(cb => {
    cb.addEventListener('change', calculateTotal);
  });

  // Кнопка бронирования конфигурации из калькулятора
  if (calcBookingBtn) {
    calcBookingBtn.addEventListener('click', () => {
      const currentConfig = calculateTotal();
      const configSummary = `Судно: ${currentConfig.yachtName} | Маршрут: ${currentConfig.routeName} | Срок: ${currentConfig.days} дн. | Итого: €${currentConfig.grandTotalEur.toLocaleString()}`;
      openBookingModal(currentConfig.yachtName, configSummary);
    });
  }

  // Кнопки "В калькулятор" в карточках флота
  const calcWithYachtBtns = document.querySelectorAll('.calculate-with-yacht');
  calcWithYachtBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const yachtId = btn.dataset.yachtId;
      if (yachtId && yachtSelect.querySelector(`option[value="${yachtId}"]`)) {
        yachtSelect.value = yachtId;
        calculateTotal();

        // Плавный скролл к калькулятору
        const calcSection = document.getElementById('calculator');
        if (calcSection) {
          calcSection.scrollIntoView({ behavior: 'smooth' });
          // Легкая подсветка калькулятора
          const box = calcSection.querySelector('.calculator-box');
          if (box) {
            box.style.boxShadow = '0 0 35px rgba(226, 183, 85, 0.5)';
            setTimeout(() => {
              box.style.boxShadow = '';
            }, 1200);
          }
        }
      }
    });
  });

  // Первичный расчет при инициализации
  calculateTotal();
}


/**
 * --------------------------------------------------------------------------
 * 9. FAQ ACCORDION (Expand/Collapse)
 * --------------------------------------------------------------------------
 */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');

    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isOpen = panel.classList.contains('show');

      // Закрываем остальные вкладки (режим аккордеона)
      faqItems.forEach(otherItem => {
        const otherTrigger = otherItem.querySelector('.faq-trigger');
        const otherPanel = otherItem.querySelector('.faq-panel');
        if (otherPanel && otherPanel !== panel) {
          otherPanel.classList.remove('show');
          otherItem.classList.remove('active');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      // Переключаем текущую вкладку
      if (isOpen) {
        panel.classList.remove('show');
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        panel.classList.add('show');
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}


/**
 * --------------------------------------------------------------------------
 * 10. STRICT PHONE MASK (+7 (___) ___-__-__)
 * --------------------------------------------------------------------------
 */
function initPhoneMasks() {
  const phoneInputs = document.querySelectorAll('.phone-mask-input');
  if (!phoneInputs.length) return;

  phoneInputs.forEach(input => {
    input.addEventListener('input', onPhoneInput);
    input.addEventListener('keydown', onPhoneKeyDown);
    input.addEventListener('paste', onPhonePaste);
    input.addEventListener('focus', onPhoneFocus);
  });

  function getDigits(str) {
    return str.replace(/\D/g, '');
  }

  function formatPhone(inputVal) {
    const digits = getDigits(inputVal);
    if (!digits) return '';

    // Если начинается с 7 или 8
    let number = digits;
    if (number.startsWith('7') || number.startsWith('8')) {
      number = number.substring(1);
    }

    let result = '+7 ';
    if (number.length > 0) {
      result += '(' + number.substring(0, 3);
    }
    if (number.length >= 4) {
      result += ') ' + number.substring(3, 6);
    }
    if (number.length >= 7) {
      result += '-' + number.substring(6, 8);
    }
    if (number.length >= 9) {
      result += '-' + number.substring(8, 10);
    }

    return result;
  }

  function onPhoneInput(e) {
    const input = e.target;
    const formatted = formatPhone(input.value);
    input.value = formatted;
  }

  function onPhoneKeyDown(e) {
    const input = e.target;
    // Удаление бэкспейсом
    if (e.key === 'Backspace' && getDigits(input.value).length <= 1) {
      input.value = '';
    }
  }

  function onPhoneFocus(e) {
    const input = e.target;
    if (!input.value) {
      input.value = '+7 (';
    }
  }

  function onPhonePaste(e) {
    const input = e.target;
    const pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      const text = pasted.getData('Text');
      if (/\D/.test(text)) {
        e.preventDefault();
        input.value = formatPhone(text);
      }
    }
  }
}


/**
 * --------------------------------------------------------------------------
 * 11. MODAL WINDOWS CONTROLLER
 * --------------------------------------------------------------------------
 */
let currentModalPrefill = '';

function openBookingModal(yachtName = '', configDetails = '') {
  const backdrop = document.getElementById('booking-modal-backdrop');
  const prefillBox = document.getElementById('modal-prefill-box');
  const prefillYacht = document.getElementById('modal-prefill-yacht');
  const hiddenYacht = document.getElementById('modal-hidden-yacht');
  const hiddenConfig = document.getElementById('modal-hidden-config');
  const formSuccess = document.getElementById('modal-success-box');
  const formElement = document.getElementById('modal-booking-form');

  if (!backdrop) return;

  // Сброс состояния успешной отправки при повторном открытии
  if (formSuccess) formSuccess.style.display = 'none';
  if (formElement) formElement.style.display = 'flex';

  if (yachtName) {
    if (prefillBox) prefillBox.style.display = 'flex';
    if (prefillYacht) prefillYacht.textContent = yachtName;
    if (hiddenYacht) hiddenYacht.value = yachtName;
  } else {
    if (prefillBox) prefillBox.style.display = 'none';
    if (hiddenYacht) hiddenYacht.value = '';
  }

  if (hiddenConfig && configDetails) {
    hiddenConfig.value = configDetails;
  }

  backdrop.classList.add('open');
  backdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
  const backdrop = document.getElementById('booking-modal-backdrop');
  if (!backdrop) return;

  backdrop.classList.remove('open');
  backdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initModals() {
  const backdrop = document.getElementById('booking-modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const successCloseBtn = document.getElementById('modal-close-success-btn');
  const headerCta = document.getElementById('header-cta-btn');

  if (headerCta) {
    headerCta.addEventListener('click', () => {
      openBookingModal('Подбор суперяхты по брифу');
    });
  }

  // Кнопки "Забронировать" в карточках флота
  const bookYachtBtns = document.querySelectorAll('.book-yacht-trigger');
  bookYachtBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const yacht = btn.dataset.yacht || 'Премиальная суперяхта';
      openBookingModal(yacht);
    });
  });

  // Кнопки выбора маршрута
  const routeBtns = document.querySelectorAll('.route-order-btn');
  routeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const route = btn.dataset.route || 'Маршрут Средиземноморья';
      openBookingModal(`Круиз: ${route}`);
    });
  });

  // Общие триггеры модалки
  const openTriggers = document.querySelectorAll('.open-modal-trigger');
  openTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const yacht = btn.dataset.yacht || 'Индивидуальная консультация';
      openBookingModal(yacht);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeBookingModal);
  if (successCloseBtn) successCloseBtn.addEventListener('click', closeBookingModal);

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeBookingModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop && backdrop.classList.contains('open')) {
      closeBookingModal();
    }
  });
}


/**
 * --------------------------------------------------------------------------
 * 12. LEAD CAPTURE FORMS VALIDATION & SUBMISSION
 * --------------------------------------------------------------------------
 */
function initLeadForms() {
  // 1. Форма консультации в блоке контактов
  const leadForm = document.getElementById('lead-consultation-form');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFormSubmit(leadForm, {
        nameId: 'lead-name',
        phoneId: 'lead-phone',
        agreementId: 'lead-agreement',
        submitBtnId: 'lead-submit-btn',
        successBannerId: 'form-success-banner'
      });
    });
  }

  // 2. Форма в модальном окне
  const modalForm = document.getElementById('modal-booking-form');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFormSubmit(modalForm, {
        nameId: 'modal-name',
        phoneId: 'modal-phone',
        emailId: 'modal-email',
        agreementId: 'modal-agreement',
        submitBtnId: 'modal-submit-btn',
        successModalId: 'modal-success-box'
      });
    });
  }
}

/**
 * Валидация и отправка формы
 */
function handleFormSubmit(form, ids) {
  let isValid = true;

  // Очистка предыдущих ошибок
  const errorElements = form.querySelectorAll('.field-error');
  errorElements.forEach(el => el.textContent = '');

  // 1. Валидация имени
  const nameInput = document.getElementById(ids.nameId);
  const nameError = document.getElementById(`${ids.nameId}-error`);
  if (nameInput) {
    const val = nameInput.value.trim();
    if (!val || val.length < 2) {
      if (nameError) nameError.textContent = 'Пожалуйста, укажите ваше имя (минимум 2 символа).';
      nameInput.style.borderColor = 'var(--color-error)';
      isValid = false;
    } else {
      nameInput.style.borderColor = '';
    }
  }

  // 2. Валидация телефона (должен содержать 10 цифр номера)
  const phoneInput = document.getElementById(ids.phoneId);
  const phoneError = document.getElementById(`${ids.phoneId}-error`);
  if (phoneInput) {
    const digits = phoneInput.value.replace(/\D/g, '');
    // +7 и 10 цифр = 11 цифр всего
    if (digits.length < 11) {
      if (phoneError) phoneError.textContent = 'Введите полный номер телефона в формате +7 (XXX) XXX-XX-XX.';
      phoneInput.style.borderColor = 'var(--color-error)';
      isValid = false;
    } else {
      phoneInput.style.borderColor = '';
    }
  }

  // 3. Валидация Email (если есть в форме)
  if (ids.emailId) {
    const emailInput = document.getElementById(ids.emailId);
    const emailError = document.getElementById(`${ids.emailId}-error`);
    if (emailInput) {
      const emailVal = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        if (emailError) emailError.textContent = 'Пожалуйста, введите корректный адрес электронной почты.';
        emailInput.style.borderColor = 'var(--color-error)';
        isValid = false;
      } else {
        emailInput.style.borderColor = '';
      }
    }
  }

  // 4. Валидация согласия на обработку данных
  const agreementInput = document.getElementById(ids.agreementId);
  const agreementError = document.getElementById(`${ids.agreementId}-error`);
  if (agreementInput && !agreementInput.checked) {
    if (agreementError) agreementError.textContent = 'Необходимо подтвердить согласие на обработку данных.';
    isValid = false;
  }

  if (!isValid) return;

  // Индикация загрузки
  const submitBtn = document.getElementById(ids.submitBtnId);
  let textSpan, spinnerSpan;
  if (submitBtn) {
    textSpan = submitBtn.querySelector('.btn-text-content');
    spinnerSpan = submitBtn.querySelector('.btn-loading-spinner');
    if (textSpan) textSpan.style.display = 'none';
    if (spinnerSpan) spinnerSpan.style.display = 'inline-block';
    submitBtn.disabled = true;
  }

  // Симуляция безопасной сетевой отправки на сервер
  setTimeout(() => {
    if (submitBtn) {
      if (textSpan) textSpan.style.display = 'inline-block';
      if (spinnerSpan) spinnerSpan.style.display = 'none';
      submitBtn.disabled = false;
    }

    // Успешный результат
    if (ids.successBannerId) {
      form.style.display = 'none';
      const successBanner = document.getElementById(ids.successBannerId);
      if (successBanner) successBanner.style.display = 'block';
    }

    if (ids.successModalId) {
      form.style.display = 'none';
      const successBox = document.getElementById(ids.successModalId);
      if (successBox) successBox.style.display = 'block';
    }

    showToast('Ваша заявка принята! Брокер свяжется с вами в течение 15 минут.');
    form.reset();
  }, 1000);
}

/**
 * Всплывающее уведомление (Toast)
 */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check" style="color: var(--color-gold); font-size: 1.25rem;"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}


/**
 * --------------------------------------------------------------------------
 * 13. YANDEX MAPS 2.1 INITIALIZATION
 * --------------------------------------------------------------------------
 * Инициализирует интерактивную карту с темно-морской стилизацией и кастомным пином.
 */
function initYandexMap() {
  const mapContainer = document.getElementById('yandex-map');
  const fallbackBox = document.getElementById('map-fallback-box');

  if (!mapContainer) return;

  // Проверяем доступность API Яндекс Карт
  if (typeof ymaps === 'undefined') {
    if (fallbackBox) {
      fallbackBox.innerHTML = `
        <i class="fa-solid fa-map-pin" style="font-size: 2rem; color: var(--color-gold);"></i>
        <p style="color: var(--color-sand); font-weight: 600; margin-top: 8px;">Офис AZUR Nautica в Москве</p>
        <p style="color: var(--color-muted); font-size: 0.8125rem;">${LANDING_CONFIG.address}</p>
        <a href="https://yandex.ru/maps/?pt=${LANDING_CONFIG.coordinates[1]},${LANDING_CONFIG.coordinates[0]}&z=16&l=map" target="_blank" rel="noopener noreferrer" class="btn btn--gold-small" style="margin-top: 12px;">
          Открыть в Яндекс.Картах
        </a>
      `;
    }
    return;
  }

  ymaps.ready(() => {
    try {
      const myMap = new ymaps.Map('yandex-map', {
        center: LANDING_CONFIG.coordinates,
        zoom: LANDING_CONFIG.mapZoom,
        controls: ['zoomControl', 'fullscreenControl', 'geolocationControl']
      }, {
        searchControlProvider: 'yandex#search'
      });

      // Отключаем зум колесиком мыши по умолчанию, чтобы не мешать скроллу страницы
      myMap.behaviors.disable('scrollZoom');

      // Создаем кастомную метку
      const myPlacemark = new ymaps.Placemark(LANDING_CONFIG.coordinates, {
        balloonContentHeader: `<strong style="color: #0A192F; font-size: 15px;">${LANDING_CONFIG.brand}</strong>`,
        balloonContentBody: `
          <div style="font-size: 13px; line-height: 1.5; color: #334155;">
            <p><strong>Адрес:</strong> ${LANDING_CONFIG.address}</p>
            <p><strong>График:</strong> ${LANDING_CONFIG.schedule}</p>
            <p><strong>Телефон:</strong> <a href="tel:${LANDING_CONFIG.phoneRaw}">${LANDING_CONFIG.phone}</a></p>
          </div>
        `,
        balloonContentFooter: '<span style="font-size: 11px; color: #64748B;">Прием гостей по согласованию с брокером</span>',
        hintContent: `${LANDING_CONFIG.brand} • Башня Федерация`
      }, {
        preset: 'islands#goldDotIconWithCaption',
        iconColor: '#E2B755'
      });

      myMap.geoObjects.add(myPlacemark);

      // Скрываем заглушку после успешной загрузки
      if (fallbackBox) {
        fallbackBox.style.display = 'none';
      }
    } catch (err) {
      console.warn('Yandex Maps initialization notice:', err);
    }
  });
}
