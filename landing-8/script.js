/**
 * ============================================================================
 * FLEUR Botanical Atelier — Main JavaScript Application
 * ============================================================================
 * Production-ready, fully functional client-side logic:
 * - Dynamic LANDING_CONFIG binding
 * - Yandex Maps 2.1 integration with custom pin & fallback
 * - Live boutique working hours evaluation (Moscow timezone)
 * - Interactive Bouquet Builder with dynamic price calculation
 * - Catalog filtering & Quick View modal
 * - Robust phone mask (+7 (___) ___-__-__)
 * - Lead capture modal with real-time validation and order confirmation
 * - FAQ accordion & mobile drawer navigation
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. CENTRAL LANDING CONFIGURATION
  // ==========================================================================
  // Редактируйте параметры ниже для изменения контактных данных, адреса,
  // графика работы и координат на всем сайте автоматически.
  const LANDING_CONFIG = {
    brand: 'FLEUR Botanical Atelier',
    city: 'Москва',
    address: 'Москва, Чистопрудный бульвар, 12, стр. 4',
    addressShort: 'Чистопрудный б-р, 12, стр. 4',
    addressDetails: 'м. Чистые пруды / Тургеневская (4 мин пешком). Вход со двора через чугунную арку.',
    phone: '+7 (495) 822-49-18',
    phoneRaw: '+74958224918',
    email: 'atelier@fleur-botanical.ru',
    schedule: {
      weekdaysText: 'Пн-Пт: 09:00 — 21:00',
      weekendsText: 'Сб-Вс: 10:00 — 20:00',
      combinedText: 'Пн-Пт: 09:00 — 21:00, Сб-Вс: 10:00 — 20:00',
      weekdayOpen: 9,
      weekdayClose: 21,
      weekendOpen: 10,
      weekendClose: 20,
      timezone: 'Europe/Moscow'
    },
    // Координаты ателье в Москве (Чистые пруды)
    coordinates: [55.762145, 37.632918],
    social: {
      telegram: 'https://t.me/fleur_botanical',
      whatsapp: 'https://wa.me/79858224918',
      instagram: 'https://instagram.com/fleur.botanical'
    }
  };

  // Expose config globally for developer inspection if needed
  window.LANDING_CONFIG = LANDING_CONFIG;

  // ==========================================================================
  // 2. BOUQUET CATALOG DATA (FOR QUICK VIEW & ORDERING)
  // ==========================================================================
  const CATALOG_PRODUCTS = {
    1: {
      id: 1,
      title: 'Рассвет в Провансе',
      price: '7 900 ₽',
      rawPrice: 7900,
      badge: 'Хит сезона',
      size: 'Размер M • D 35 см',
      durability: 'Стойкость 8-10 дней',
      image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=900&q=85',
      composition: 'Садовые розы Дэвид Остин сорта «Keira», дельфиниум небесного оттенка, оксипеталум, ароматная французская маттиола, серебристый эвкалипт цинерея.'
    },
    2: {
      id: 2,
      title: 'Пыльная Роза & Шампань',
      price: '9 200 ₽',
      rawPrice: 9200,
      badge: 'Эксклюзив',
      size: 'Размер L • D 48 см',
      durability: 'Стойкость 10-14 дней',
      image: 'https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=900&q=85',
      composition: 'Пионовидные розы Westminster Abbey, французские ранункулюсы пудрового тона, дикий латирус, кремовая эустома, пампасные колоски и шелковые ленты.'
    },
    3: {
      id: 3,
      title: 'Тайны Оранжерей',
      price: '11 500 ₽',
      rawPrice: 11500,
      badge: 'Ботаника',
      size: 'Размер Grand • D 52 см',
      durability: 'Стойкость 10-12 дней',
      image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=85',
      composition: 'Королевские анемоны с темной сердцевиной, гортензия оттенка капучино, скимия, дикий оксипеталум, веточки оливкового дерева и писташ.'
    },
    4: {
      id: 4,
      title: 'Облако Нежности',
      price: '15 400 ₽',
      rawPrice: 15400,
      badge: 'Охапка',
      size: 'Размер XL • 25 стеблей',
      durability: 'Стойкость 7-9 дней',
      image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=900&q=85',
      composition: 'Охапка отборных голландских пионов сорта «Sarah Bernhardt» нежнейшего молочно-розового оттенка, обрамленная шёлковой лентой и аквабоксом.'
    },
    5: {
      id: 5,
      title: 'Карамельный Закат',
      price: '8 600 ₽',
      rawPrice: 8600,
      badge: 'Редкий сорт',
      size: 'Размер M • D 38 см',
      durability: 'Стойкость 10-12 дней',
      image: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=900&q=85',
      composition: 'Кофейно-карамельные розы Toffee, терракотовые садовые георгины, эрингиум, бронзовые веточки фисташки и сухие луговые колосья.'
    },
    6: {
      id: 6,
      title: 'Мелодия Сада',
      price: '10 400 ₽',
      rawPrice: 10400,
      badge: 'Атмосфера',
      size: 'Размер L • D 45 см',
      durability: 'Стойкость 9-11 дней',
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=85',
      composition: 'Белоснежная садовая гортензия, высокий антирринум, веточки цветущего жасмина, пионовидная роза White O’Hara с выраженным цитрусовым ароматом.'
    }
  };

  // Builder palette definitions with preview images
  const BUILDER_PALETTES = {
    'dusty-rose': {
      name: 'Пыльная роза & Шампань',
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=85'
    },
    'airy-pastel': {
      name: 'Воздушный фарфор & Пастель',
      image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=85'
    },
    'forest-emerald': {
      name: 'Глубокий лесной изумруд',
      image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=85'
    },
    'warm-sunset': {
      name: 'Карамельный бархат & Мед',
      image: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=800&q=85'
    }
  };

  // ==========================================================================
  // 3. INITIALIZATION ON DOM READY
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    bindConfigToDOM();
    initWorkingHours();
    initYandexMaps();
    initMobileDrawer();
    initCatalogFilters();
    initQuickViewModal();
    initBouquetBuilder();
    initFaqAccordion();
    initPhoneMasks();
    initModals();
    initSmoothScroll();
  });

  // ==========================================================================
  // 4. CONFIG BINDING TO DOM
  // ==========================================================================
  function bindConfigToDOM() {
    // Bind text values
    document.querySelectorAll('[data-config]').forEach(el => {
      const prop = el.getAttribute('data-config');
      if (prop === 'address') {
        el.textContent = LANDING_CONFIG.address;
      } else if (prop === 'phone') {
        el.textContent = LANDING_CONFIG.phone;
        if (el.tagName.toLowerCase() === 'a') {
          el.href = 'tel:' + LANDING_CONFIG.phoneRaw;
        }
      } else if (prop === 'email') {
        el.textContent = LANDING_CONFIG.email;
        if (el.tagName.toLowerCase() === 'a') {
          el.href = 'mailto:' + LANDING_CONFIG.email;
        }
      } else if (prop === 'schedule') {
        el.textContent = LANDING_CONFIG.schedule.combinedText;
      }
    });

    // Set minimum date for delivery pickers to today
    const today = new Date().toISOString().split('T')[0];
    const datePickers = [document.getElementById('builderDeliveryDate'), document.getElementById('userDateInput')];
    datePickers.forEach(input => {
      if (input) {
        input.min = today;
        input.value = today;
      }
    });
  }

  // ==========================================================================
  // 5. LIVE WORKING HOURS STATUS (MOSCOW TIME)
  // ==========================================================================
  function initWorkingHours() {
    updateHoursDisplay();
    // Re-check status every 60 seconds
    setInterval(updateHoursDisplay, 60000);
  }

  function updateHoursDisplay() {
    // Calculate current time in Moscow
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: LANDING_CONFIG.schedule.timezone,
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    });

    const parts = formatter.formatToParts(now);
    let weekday = '';
    let hour = 0;
    let minute = 0;

    parts.forEach(p => {
      if (p.type === 'weekday') weekday = p.value;
      if (p.type === 'hour') hour = parseInt(p.value, 10);
      if (p.type === 'minute') minute = parseInt(p.value, 10);
    });

    const isWeekend = (weekday === 'Sat' || weekday === 'Sun');
    const openHour = isWeekend ? LANDING_CONFIG.schedule.weekendOpen : LANDING_CONFIG.schedule.weekdayOpen;
    const closeHour = isWeekend ? LANDING_CONFIG.schedule.weekendClose : LANDING_CONFIG.schedule.weekdayClose;

    const isOpen = (hour >= openHour && hour < closeHour);

    let statusText = '';
    let contactsStatusText = '';

    if (isOpen) {
      statusText = `Открыто сейчас • до ${closeHour}:00`;
      contactsStatusText = `Открыто сейчас • ждем вас до ${closeHour}:00`;
    } else {
      const nextOpen = isWeekend ? LANDING_CONFIG.schedule.weekendOpen : LANDING_CONFIG.schedule.weekdayOpen;
      statusText = `Сейчас закрыто • откроется в 0${nextOpen}:00`;
      contactsStatusText = `Сейчас закрыто • откроется завтра в 0${nextOpen}:00`;
    }

    const liveStatusText = document.getElementById('liveStatusText');
    const liveStatusTextMobile = document.getElementById('liveStatusTextMobile');
    const liveStatusTextContacts = document.getElementById('liveStatusTextContacts');

    if (liveStatusText) liveStatusText.textContent = statusText;
    if (liveStatusTextMobile) liveStatusTextMobile.textContent = statusText;
    if (liveStatusTextContacts) liveStatusTextContacts.textContent = contactsStatusText;
  }

  // ==========================================================================
  // 6. YANDEX MAPS 2.1 INTEGRATION
  // ==========================================================================
  function initYandexMaps() {
    const mapContainer = document.getElementById('map');
    const mapFallback = document.getElementById('mapFallback');

    if (!mapContainer) return;

    // Check if Yandex Maps API script is loaded
    if (typeof ymaps === 'undefined') {
      console.warn('Yandex Maps API script not loaded or blocked. Using graceful fallback.');
      if (mapFallback) mapFallback.style.display = 'flex';
      return;
    }

    ymaps.ready(() => {
      try {
        // Hide fallback once ymaps initializes
        if (mapFallback) mapFallback.style.display = 'none';

        const map = new ymaps.Map('map', {
          center: LANDING_CONFIG.coordinates,
          zoom: 16,
          controls: ['zoomControl', 'geolocationControl', 'fullscreenControl']
        }, {
          searchControlProvider: 'yandex#search'
        });

        // Custom Placemark
        const placemark = new ymaps.Placemark(LANDING_CONFIG.coordinates, {
          hintContent: LANDING_CONFIG.brand,
          balloonContentHeader: `<div style="font-family:'Italiana',serif;font-size:1.2rem;color:#27382B;font-weight:bold;">${LANDING_CONFIG.brand}</div>`,
          balloonContentBody: `
            <div style="font-family:'Jost',sans-serif;font-size:0.9rem;color:#333;margin-top:6px;line-height:1.5;">
              <p>📍 <strong>${LANDING_CONFIG.address}</strong></p>
              <p style="color:#5C6B5E;margin-top:4px;">${LANDING_CONFIG.addressDetails}</p>
              <p style="margin-top:6px;">🕒 ${LANDING_CONFIG.schedule.combinedText}</p>
              <p style="margin-top:6px;">📞 <a href="tel:${LANDING_CONFIG.phoneRaw}" style="color:#B9766A;font-weight:600;">${LANDING_CONFIG.phone}</a></p>
            </div>
          `,
          balloonContentFooter: `
            <div style="margin-top:8px;">
              <a href="https://yandex.ru/maps/?rtext=~${LANDING_CONFIG.coordinates.join(',')}" target="_blank" style="display:inline-block;padding:6px 14px;background:#27382B;color:#fff;border-radius:20px;font-size:0.8rem;text-decoration:none;">Построить маршрут</a>
            </div>
          `
        }, {
          preset: 'islands#darkGreenDotIconWithCaption',
          iconColor: '#27382B'
        });

        map.geoObjects.add(placemark);

        // Disable scroll zooming on desktop until user interacts to avoid page scroll trapping
        map.behaviors.disable('scrollZoom');
      } catch (err) {
        console.error('Failed to initialize Yandex Map:', err);
        if (mapFallback) mapFallback.style.display = 'flex';
      }
    });
  }

  // ==========================================================================
  // 7. MOBILE DRAWER NAVIGATION
  // ==========================================================================
  function initMobileDrawer() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileDrawerClose = document.getElementById('mobileDrawerClose');
    const mobileDrawerBackdrop = document.getElementById('mobileDrawerBackdrop');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');

    if (!hamburgerBtn || !mobileDrawer) return;

    function openDrawer() {
      mobileDrawer.classList.add('is-open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      mobileDrawer.classList.remove('is-open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', openDrawer);
    if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeDrawer);
    if (mobileDrawerBackdrop) mobileDrawerBackdrop.addEventListener('click', closeDrawer);

    // Close drawer on clicking any navigation link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }

  // ==========================================================================
  // 8. CATALOG FILTERING
  // ==========================================================================
  function initCatalogFilters() {
    const filterButtons = document.querySelectorAll('.catalog-filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (!filterButtons.length) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.getAttribute('data-filter');

        productCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
          }
        });
      });
    });
  }

  // ==========================================================================
  // 9. QUICK VIEW MODAL
  // ==========================================================================
  function initQuickViewModal() {
    const qvModal = document.getElementById('quickViewModal');
    const qvModalClose = document.getElementById('qvModalCloseBtn');
    const qvModalBackdrop = document.getElementById('qvModalBackdrop');
    const qvButtons = document.querySelectorAll('[data-quickview]');

    const qvTitle = document.getElementById('qvTitle');
    const qvPrice = document.getElementById('qvPrice');
    const qvImage = document.getElementById('qvImage');
    const qvBadge = document.getElementById('qvBadge');
    const qvComposition = document.getElementById('qvComposition');
    const btnQvOrder = document.getElementById('btnQvOrder');

    if (!qvModal) return;

    let currentSelectedProduct = null;

    function openQuickView(productId) {
      const product = CATALOG_PRODUCTS[productId];
      if (!product) return;

      currentSelectedProduct = product;

      if (qvTitle) qvTitle.textContent = product.title;
      if (qvPrice) qvPrice.textContent = product.price;
      if (qvImage) {
        qvImage.src = product.image;
        qvImage.alt = product.title;
      }
      if (qvBadge) qvBadge.textContent = product.badge;
      if (qvComposition) qvComposition.textContent = product.composition;

      qvModal.classList.add('is-open');
      qvModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeQuickView() {
      qvModal.classList.remove('is-open');
      qvModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    qvButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-quickview');
        openQuickView(id);
      });
    });

    if (qvModalClose) qvModalClose.addEventListener('click', closeQuickView);
    if (qvModalBackdrop) qvModalBackdrop.addEventListener('click', closeQuickView);

    // If order button inside Quick View clicked
    if (btnQvOrder) {
      btnQvOrder.addEventListener('click', () => {
        closeQuickView();
        if (currentSelectedProduct) {
          openOrderModal({
            title: `Заказать букет «${currentSelectedProduct.title}»`,
            bouquet: `${currentSelectedProduct.title} (${currentSelectedProduct.price})`,
            price: currentSelectedProduct.rawPrice,
            source: 'Быстрый просмотр состава'
          });
        }
      });
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && qvModal.classList.contains('is-open')) {
        closeQuickView();
      }
    });
  }

  // ==========================================================================
  // 10. INTERACTIVE BOUQUET BUILDER
  // ==========================================================================
  function initBouquetBuilder() {
    // Controls elements
    const occasionChips = document.querySelectorAll('.builder-chip');
    const paletteInputs = document.querySelectorAll('input[name="builder_palette"]');
    const sizeInputs = document.querySelectorAll('input[name="builder_size"]');
    const extraCheckboxes = document.querySelectorAll('.extra-checkbox input[type="checkbox"]');
    const deliveryDateInput = document.getElementById('builderDeliveryDate');
    const deliveryTimeSelect = document.getElementById('builderDeliveryTime');

    // Summary display elements
    const summaryBouquetName = document.getElementById('summaryBouquetName');
    const builderPreviewImage = document.getElementById('builderPreviewImage');
    const summaryOccasionBadge = document.getElementById('summaryOccasionBadge');
    const summarySizeVal = document.getElementById('summarySizeVal');
    const summaryPaletteVal = document.getElementById('summaryPaletteVal');
    const summaryExtrasVal = document.getElementById('summaryExtrasVal');
    const summaryDeliveryVal = document.getElementById('summaryDeliveryVal');
    const builderTotalPrice = document.getElementById('builderTotalPrice');
    const btnOrderBuilder = document.getElementById('btnOrderBuilder');

    if (!summaryBouquetName || !builderTotalPrice) return;

    // State
    const builderState = {
      occasionName: 'День рождения',
      paletteKey: 'dusty-rose',
      paletteName: 'Пыльная роза & Шампань',
      sizeKey: 'grand',
      sizeLabel: 'Grand (Классика ~45 см)',
      basePrice: 8900,
      extrasTotal: 0,
      extrasList: ['Открытка с сургучом'],
      deliveryDate: '',
      deliveryTimeLabel: 'День (13:00 — 17:00)'
    };

    // Helper: format price with space separator
    function formatMoney(amount) {
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
    }

    // Recalculate summary card
    function recalculateBuilder() {
      const total = builderState.basePrice + builderState.extrasTotal;

      if (summaryBouquetName) {
        summaryBouquetName.textContent = `Букет «${builderState.paletteName}»`;
      }
      if (summaryOccasionBadge) {
        summaryOccasionBadge.textContent = builderState.occasionName;
      }
      if (summarySizeVal) {
        summarySizeVal.textContent = builderState.sizeLabel;
      }
      if (summaryPaletteVal) {
        summaryPaletteVal.textContent = builderState.paletteName;
      }
      if (summaryExtrasVal) {
        summaryExtrasVal.textContent = builderState.extrasList.join(', ');
      }

      // Format date for display
      let formattedDate = 'Ближайшая';
      if (deliveryDateInput && deliveryDateInput.value) {
        const parts = deliveryDateInput.value.split('-');
        if (parts.length === 3) {
          const dateObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
          const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
          formattedDate = `${dateObj.getDate()} ${months[dateObj.getMonth()]}`;
        }
      }

      let timeLabel = 'День (13:00 — 17:00)';
      if (deliveryTimeSelect) {
        timeLabel = deliveryTimeSelect.options[deliveryTimeSelect.selectedIndex].text;
      }

      if (summaryDeliveryVal) {
        summaryDeliveryVal.textContent = `${formattedDate}, ${timeLabel}`;
      }

      if (builderTotalPrice) {
        builderTotalPrice.textContent = formatMoney(total);
      }

      // Update image
      const paletteInfo = BUILDER_PALETTES[builderState.paletteKey];
      if (paletteInfo && builderPreviewImage && builderPreviewImage.src !== paletteInfo.image) {
        builderPreviewImage.style.opacity = '0.4';
        setTimeout(() => {
          builderPreviewImage.src = paletteInfo.image;
          builderPreviewImage.style.opacity = '1';
        }, 150);
      }
    }

    // 1. Occasions chips click
    occasionChips.forEach(chip => {
      chip.addEventListener('click', () => {
        occasionChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        builderState.occasionName = chip.getAttribute('data-name');
        recalculateBuilder();
      });
    });

    // 2. Palette radio change
    paletteInputs.forEach(input => {
      input.addEventListener('change', () => {
        document.querySelectorAll('.palette-card').forEach(card => card.classList.remove('active'));
        const parentCard = input.closest('.palette-card');
        if (parentCard) parentCard.classList.add('active');

        builderState.paletteKey = input.value;
        const pal = BUILDER_PALETTES[input.value];
        if (pal) builderState.paletteName = pal.name;
        recalculateBuilder();
      });
    });

    // 3. Size radio change
    sizeInputs.forEach(input => {
      input.addEventListener('change', () => {
        document.querySelectorAll('.size-card').forEach(card => card.classList.remove('active'));
        const parentCard = input.closest('.size-card');
        if (parentCard) parentCard.classList.add('active');

        builderState.sizeKey = input.value;
        builderState.sizeLabel = input.getAttribute('data-label');
        builderState.basePrice = parseInt(input.getAttribute('data-price'), 10) || 8900;
        recalculateBuilder();
      });
    });

    // 4. Extras checkboxes change
    function updateExtras() {
      let extrasSum = 0;
      const list = ['Открытка с сургучом'];

      extraCheckboxes.forEach(cb => {
        if (cb.checked && !cb.disabled) {
          const price = parseInt(cb.getAttribute('data-price'), 10) || 0;
          extrasSum += price;
          const title = cb.closest('.extra-checkbox').querySelector('.extra-checkbox__title').textContent;
          list.push(title);
        }
      });

      builderState.extrasTotal = extrasSum;
      builderState.extrasList = list;
      recalculateBuilder();
    }

    extraCheckboxes.forEach(cb => {
      cb.addEventListener('change', updateExtras);
    });

    // 5. Date & Time change
    if (deliveryDateInput) {
      deliveryDateInput.addEventListener('change', recalculateBuilder);
    }
    if (deliveryTimeSelect) {
      deliveryTimeSelect.addEventListener('change', recalculateBuilder);
    }

    // Initial calculation
    recalculateBuilder();

    // Order from Builder CTA
    if (btnOrderBuilder) {
      btnOrderBuilder.addEventListener('click', () => {
        const total = builderState.basePrice + builderState.extrasTotal;
        const bouquetDescription = `Букет «${builderState.paletteName}» (${builderState.sizeLabel}) + ${builderState.extrasList.join(', ')} — ${formatMoney(total)}`;

        openOrderModal({
          title: 'Оформление авторского букета из конструктора',
          bouquet: bouquetDescription,
          price: total,
          source: `Конструктор: ${builderState.occasionName} / ${builderState.paletteName}`,
          date: deliveryDateInput ? deliveryDateInput.value : '',
          time: deliveryTimeSelect ? deliveryTimeSelect.value : ''
        });
      });
    }
  }

  // ==========================================================================
  // 11. FAQ ACCORDION
  // ==========================================================================
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-item__trigger');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items for smooth accordion behavior
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherTrigger = other.querySelector('.faq-item__trigger');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });

        if (isActive) {
          item.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // ==========================================================================
  // 12. ROBUST PHONE MASK (+7 (___) ___-__-__)
  // ==========================================================================
  function initPhoneMasks() {
    const phoneInputs = document.querySelectorAll('.phone-mask');

    phoneInputs.forEach(input => {
      input.addEventListener('input', onPhoneInput);
      input.addEventListener('keydown', onPhoneKeyDown);
      input.addEventListener('paste', onPhonePaste);
    });

    function getDigits(val) {
      return val.replace(/\D/g, '');
    }

    function onPhoneInput(e) {
      const input = e.target;
      let digits = getDigits(input.value);
      const selectionStart = input.selectionStart;

      if (!digits) {
        input.value = '';
        return;
      }

      // If user starts typing with 8 or 7, normalize to 7
      if (['7', '8', '9'].indexOf(digits[0]) > -1) {
        if (digits[0] === '9') digits = '79' + digits.slice(1);
        if (digits[0] === '8') digits = '7' + digits.slice(1);
      } else {
        digits = '7' + digits;
      }

      // Restrict max 11 digits
      digits = digits.substring(0, 11);

      let formatted = '+7 (';
      if (digits.length > 1) formatted += digits.substring(1, 4);
      if (digits.length >= 5) formatted += ') ' + digits.substring(4, 7);
      if (digits.length >= 8) formatted += '-' + digits.substring(7, 9);
      if (digits.length >= 10) formatted += '-' + digits.substring(9, 11);

      input.value = formatted;
    }

    function onPhoneKeyDown(e) {
      const input = e.target;
      // Handle backspace properly
      if (e.key === 'Backspace' && getDigits(input.value).length <= 1) {
        input.value = '';
      }
    }

    function onPhonePaste(e) {
      const input = e.target;
      const pasted = (e.clipboardData || window.clipboardData).getData('text');
      const digits = getDigits(pasted);
      if (digits.length > 0) {
        e.preventDefault();
        input.value = digits;
        input.dispatchEvent(new Event('input'));
      }
    }
  }

  // ==========================================================================
  // 13. LEAD CAPTURE MODAL & VALIDATION
  // ==========================================================================
  let activeModal = null;

  function openOrderModal(options = {}) {
    const modal = document.getElementById('orderModal');
    if (!modal) return;

    const modalHeading = document.getElementById('modalHeading');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalItemName = document.getElementById('modalItemName');
    const modalItemBanner = document.getElementById('modalItemBanner');

    const formSourceInput = document.getElementById('formSourceInput');
    const formBouquetInput = document.getElementById('formBouquetInput');
    const formPriceInput = document.getElementById('formPriceInput');

    const userDateInput = document.getElementById('userDateInput');
    const userTimeInput = document.getElementById('userTimeInput');

    // Reset views
    document.getElementById('modalFormView').style.display = 'block';
    document.getElementById('modalSuccessView').style.display = 'none';

    // Populate data
    if (modalHeading) modalHeading.textContent = options.title || 'Оформление заказа';
    if (options.bouquet) {
      if (modalItemBanner) modalItemBanner.style.display = 'flex';
      if (modalItemName) modalItemName.textContent = options.bouquet;
      if (formBouquetInput) formBouquetInput.value = options.bouquet;
    } else {
      if (modalItemBanner) modalItemBanner.style.display = 'none';
      if (formBouquetInput) formBouquetInput.value = 'Индивидуальный запрос';
    }

    if (formSourceInput) formSourceInput.value = options.source || 'Основная кнопка';
    if (formPriceInput) formPriceInput.value = options.price || '';

    if (options.date && userDateInput) userDateInput.value = options.date;
    if (options.time && userTimeInput) userTimeInput.value = options.time;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    activeModal = modal;
    document.body.style.overflow = 'hidden';

    // Focus on first input
    setTimeout(() => {
      const nameInput = document.getElementById('userNameInput');
      if (nameInput) nameInput.focus();
    }, 150);
  }

  function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    if (!modal) return;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    activeModal = null;
    document.body.style.overflow = '';
  }

  function initModals() {
    const orderModal = document.getElementById('orderModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const btnCloseSuccessModal = document.getElementById('btnCloseSuccessModal');
    const leadOrderForm = document.getElementById('leadOrderForm');

    // Trigger buttons around the site
    document.querySelectorAll('[data-modal="orderModal"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.getAttribute('data-modal-title') || 'Заказать букет';
        const bouquet = btn.getAttribute('data-modal-bouquet') || '';
        const source = btn.getAttribute('data-modal-source') || btn.textContent.trim();

        openOrderModal({
          title: title,
          bouquet: bouquet,
          source: source
        });
      });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeOrderModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeOrderModal);
    if (btnCloseSuccessModal) btnCloseSuccessModal.addEventListener('click', closeOrderModal);

    // Form Submission & Validation
    if (leadOrderForm) {
      leadOrderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('userNameInput');
        const phoneInput = document.getElementById('userPhoneInput');
        const consentInput = document.getElementById('userConsentInput');
        const btnSubmit = document.getElementById('btnSubmitOrder');

        let isValid = true;

        // Reset errors
        document.querySelectorAll('.form-group').forEach(fg => fg.classList.remove('has-error'));
        const consentGroup = consentInput.closest('.form-checkbox-group');
        if (consentGroup) consentGroup.classList.remove('has-error');

        // Name check
        if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
          nameInput.closest('.form-group').classList.add('has-error');
          isValid = false;
        }

        // Phone check (+7 (XXX) XXX-XX-XX = 18 chars)
        const digits = phoneInput.value.replace(/\D/g, '');
        if (digits.length !== 11) {
          phoneInput.closest('.form-group').classList.add('has-error');
          isValid = false;
        }

        // Consent check
        if (!consentInput.checked) {
          if (consentGroup) consentGroup.classList.add('has-error');
          isValid = false;
        }

        if (!isValid) return;

        // Loading state
        if (btnSubmit) btnSubmit.classList.add('is-loading');

        // Simulate network API request
        setTimeout(() => {
          if (btnSubmit) btnSubmit.classList.remove('is-loading');

          // Generate randomized order code
          const orderCode = 'FL-' + Math.floor(1000 + Math.random() * 9000);

          // Populate success view
          const successOrderNumber = document.getElementById('successOrderNumber');
          const successBouquetName = document.getElementById('successBouquetName');
          const successCustomerName = document.getElementById('successCustomerName');
          const successCustomerPhone = document.getElementById('successCustomerPhone');

          if (successOrderNumber) successOrderNumber.textContent = '#' + orderCode;
          if (successCustomerName) successCustomerName.textContent = nameInput.value.trim();
          if (successCustomerPhone) successCustomerPhone.textContent = phoneInput.value;

          const formBouquetInput = document.getElementById('formBouquetInput');
          if (successBouquetName) {
            successBouquetName.textContent = formBouquetInput && formBouquetInput.value ? formBouquetInput.value : 'Индивидуальный букет';
          }

          // Show success view
          document.getElementById('modalFormView').style.display = 'none';
          document.getElementById('modalSuccessView').style.display = 'flex';

          // Reset form fields
          leadOrderForm.reset();

          // Show soft toast
          showToast(`Заказ #${orderCode} успешно зарегистрирован!`);
        }, 900);
      });
    }

    // Legal / Privacy modal
    const legalModal = document.getElementById('legalModal');
    const legalModalCloseBtn = document.getElementById('legalModalCloseBtn');
    const legalModalBackdrop = document.getElementById('legalModalBackdrop');
    const btnCloseLegalModal = document.getElementById('btnCloseLegalModal');
    const legalLinks = [
      document.getElementById('btnOpenPrivacyModal'),
      document.getElementById('btnOpenOfertaModal'),
      document.getElementById('consentPolicyLink')
    ];

    legalLinks.forEach(link => {
      if (link) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          if (legalModal) {
            legalModal.classList.add('is-open');
            legalModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
          }
        });
      }
    });

    function closeLegalModal() {
      if (legalModal) {
        legalModal.classList.remove('is-open');
        legalModal.setAttribute('aria-hidden', 'true');
        if (!activeModal) document.body.style.overflow = '';
      }
    }

    if (legalModalCloseBtn) legalModalCloseBtn.addEventListener('click', closeLegalModal);
    if (legalModalBackdrop) legalModalBackdrop.addEventListener('click', closeLegalModal);
    if (btnCloseLegalModal) btnCloseLegalModal.addEventListener('click', closeLegalModal);

    // Global escape listener for modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (orderModal && orderModal.classList.contains('is-open')) closeOrderModal();
        if (legalModal && legalModal.classList.contains('is-open')) closeLegalModal();
      }
    });
  }

  // ==========================================================================
  // 14. TOAST NOTIFICATION UTILITY
  // ==========================================================================
  function showToast(message) {
    const toast = document.getElementById('siteToast');
    const toastMessage = document.getElementById('toastMessage');

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('is-visible');
    toast.setAttribute('aria-hidden', 'false');

    setTimeout(() => {
      toast.classList.remove('is-visible');
      toast.setAttribute('aria-hidden', 'true');
    }, 4500);
  }

  // ==========================================================================
  // 15. SMOOTH SCROLLING FOR ANCHORS
  // ==========================================================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '#!') return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerHeight = document.querySelector('.site-header').offsetHeight || 80;
          const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

})();
