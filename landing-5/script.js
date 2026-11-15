/**
 * ХЛЕБ & МАСЛО — Ремесленная пекарня на закваске
 * Production JavaScript Application
 * 
 * Features:
 * 1. LANDING_CONFIG centralized configuration & DOM binding
 * 2. Live working hours status check ("Открыто сейчас" / "Откроется в 07:30")
 * 3. Fresh bake availability tracker & real-time countdown to next batch
 * 4. Interactive menu filtering & dynamic pre-order basket
 * 5. Lead capture modal with Russian phone mask (+7 (___) ___-__-__) & validation
 * 6. Accessible FAQ accordion
 * 7. Yandex Maps 2.1 API initialization with custom pin & fallback
 * 8. Mobile drawer navigation
 */

/* ==========================================================================
   1. CENTRALIZED CONFIGURATION (LANDING_CONFIG)
   Easily customize contacts, schedule, coordinates and brand settings here
   ========================================================================== */
const LANDING_CONFIG = {
  brandName: "Хлеб & Масло",
  tagline: "Ремесленная пекарня на дикой закваске",
  phone: "+7 (495) 792-44-18",
  phoneRaw: "+74957924418",
  email: "bonjour@hlebmaslo.ru",
  address: "Москва, Пречистенский пер., 12",
  metro: "Кропоткинская / Парк Культуры",
  
  // Geographic coordinates for Yandex Maps [latitude, longitude]
  coordinates: [55.748912, 37.592314],
  mapZoom: 16,
  
  // Working hours (24h format)
  workingHours: {
    weekdays: { open: "07:30", close: "21:00" }, // Mon - Fri
    weekends: { open: "08:30", close: "21:30" }  // Sat - Sun
  },

  // Social links
  socials: {
    telegram: "https://t.me/hleb_maslo_bakery",
    vk: "https://vk.com/hleb_maslo_bakery",
    whatsapp: "https://wa.me/74957924418"
  },

  // Fresh baking batches schedule (daily stone oven releases)
  bakingSchedule: [
    {
      id: "batch-1",
      time: "07:30",
      title: "Утренняя парижская слойка",
      items: "Круассаны сливочные 84%, Пэн-о-шоколя, багеты Традисьон",
      totalLoaves: 36,
      desc: "Первая теплая партия прямо к утреннему кофе. Тесто поднималось всю ночь."
    },
    {
      id: "batch-2",
      time: "10:30",
      title: "Классический подовый Тартин",
      items: "Тартин пшеничный 36ч, Сельский хлеб с 5 семенами",
      totalLoaves: 28,
      desc: "Хрустящая темно-янтарная корочка и крупнопористый шелковистый мякиш."
    },
    {
      id: "batch-3",
      time: "13:30",
      title: "Миндальная слойка & Бриоши",
      items: "Миндальные круассаны с франжипаном, бриошь Нантер, булочки с корицей",
      totalLoaves: 30,
      desc: "Пряный аромат корицы и ванили Бурбон наполняет переулки Пречистенки."
    },
    {
      id: "batch-4",
      time: "16:30",
      title: "Ржаной заварной хлеб",
      items: "Бородинский на красном солоде с кориандром, ржаной подовый",
      totalLoaves: 24,
      desc: "Густой аромат ферментированного солода и кориандра. Плотный влажный мякиш."
    },
    {
      id: "batch-5",
      time: "18:30",
      title: "Вечерний Тартин & Лигурийская Фокачча",
      items: "Вечерний тартин к ужину, Фокачча с вялеными томатами и розмарином",
      totalLoaves: 26,
      desc: "Идеально забрать по пути домой к семейному ужину или бокалу вина."
    }
  ]
};

/* ==========================================================================
   2. DOM BINDING & CONFIGURATION INJECTION
   ========================================================================== */
function bindLandingConfig() {
  // Bind simple text elements
  document.querySelectorAll('[data-config]').forEach(el => {
    const key = el.getAttribute('data-config');
    if (LANDING_CONFIG[key]) {
      el.textContent = LANDING_CONFIG[key];
      if (el.tagName === 'A' && key === 'phone') {
        el.setAttribute('href', `tel:${LANDING_CONFIG.phoneRaw}`);
      } else if (el.tagName === 'A' && key === 'email') {
        el.setAttribute('href', `mailto:${LANDING_CONFIG.email}`);
      }
    }
  });

  // Current year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   3. LIVE WORKING HOURS STATUS CHECK ("Открыто сейчас")
   ========================================================================== */
function checkBakeryOpenStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 is Sunday, 6 is Saturday
  const isWeekend = (day === 0 || day === 6);
  
  const schedule = isWeekend ? LANDING_CONFIG.workingHours.weekends : LANDING_CONFIG.workingHours.weekdays;
  
  const [openH, openM] = schedule.open.split(':').map(Number);
  const [closeH, closeM] = schedule.close.split(':').map(Number);
  
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;
  
  const isOpen = (currentMinutes >= openMinutes && currentMinutes < closeMinutes);
  
  const statusTexts = {
    topbar: isOpen 
      ? `Открыто сейчас · ждем за теплым хлебом (до ${schedule.close})` 
      : `Сейчас закрыто · откроемся в ${schedule.open}`,
    contacts: isOpen 
      ? `Открыто сейчас (до ${schedule.close})` 
      : `Закрыто · откроемся в ${schedule.open}`,
    mobile: isOpen 
      ? `Пекарня открыта сейчас (до ${schedule.close})` 
      : `Закрыто · откроемся в ${schedule.open}`
  };

  // Update DOM elements
  const topbarText = document.getElementById('topbar-status-text');
  const topbarDot = document.getElementById('topbar-status-dot');
  if (topbarText) topbarText.textContent = statusTexts.topbar;
  if (topbarDot) {
    topbarDot.classList.toggle('status-indicator--closed', !isOpen);
  }

  const contactsText = document.getElementById('contacts-status-text');
  const contactsDot = document.getElementById('contacts-status-dot');
  if (contactsText) contactsText.textContent = statusTexts.contacts;
  if (contactsDot) {
    contactsDot.classList.toggle('status-indicator--closed', !isOpen);
  }

  const mobileText = document.getElementById('mobile-status-text');
  const mobileDot = document.getElementById('mobile-status-dot');
  if (mobileText) mobileText.textContent = statusTexts.mobile;
  if (mobileDot) {
    mobileDot.classList.toggle('status-indicator--closed', !isOpen);
  }
}

/* ==========================================================================
   4. FRESH BAKE TRACKER & REAL-TIME COUNTDOWN
   ========================================================================== */
let activeBatchIndex = 0;

function initFreshBakeTracker() {
  const scheduleContainer = document.getElementById('batches-schedule-container');
  if (!scheduleContainer) return;

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Find next upcoming batch
  let nextBatchIdx = -1;
  for (let i = 0; i < LANDING_CONFIG.bakingSchedule.length; i++) {
    const [bH, bM] = LANDING_CONFIG.bakingSchedule[i].time.split(':').map(Number);
    const bMinutes = bH * 60 + bM;
    if (bMinutes > currentMinutes) {
      nextBatchIdx = i;
      break;
    }
  }

  // If all batches today are done, the next batch is the first one tomorrow
  if (nextBatchIdx === -1) {
    nextBatchIdx = 0;
  }
  activeBatchIndex = nextBatchIdx;

  // Render Daily Batches Timeline Cards
  scheduleContainer.innerHTML = LANDING_CONFIG.bakingSchedule.map((batch, index) => {
    const [bH, bM] = batch.time.split(':').map(Number);
    const bMinutes = bH * 60 + bM;
    
    let tagClass = 'batch-tag--next';
    let tagText = 'Ожидает печи';
    
    if (index === nextBatchIdx) {
      tagClass = 'batch-tag--baking';
      tagText = 'Выпекается сейчас';
    } else if (bMinutes <= currentMinutes && index < nextBatchIdx) {
      tagClass = 'batch-tag--ready';
      tagText = 'Свежее на витрине';
    }

    const isActive = (index === nextBatchIdx) ? 'is-active' : '';

    return `
      <div class="batch-card ${isActive}" data-batch-id="${batch.id}">
        <div class="batch-card__time">${batch.time}</div>
        <span class="batch-card__tag ${tagClass}">${tagText}</span>
        <h4 class="batch-card__title">${batch.title}</h4>
        <p class="batch-card__items">${batch.items}</p>
        <button class="batch-card__btn" onclick="scrollToMenuAndSelect('${batch.title}')">
          Выбрать из этой партии
        </button>
      </div>
    `;
  }).join('');

  updateTrackerMasterCard();
  startCountdownTimer();
}

function updateTrackerMasterCard() {
  const nextBatch = LANDING_CONFIG.bakingSchedule[activeBatchIndex];
  if (!nextBatch) return;

  const nextTitleEl = document.getElementById('tracker-next-name');
  const nextTimeEl = document.getElementById('tracker-next-time');
  const nextSubEl = document.getElementById('tracker-next-sub');
  const heroDescEl = document.getElementById('hero-next-batch-desc');

  if (nextTitleEl) nextTitleEl.textContent = `Ближайший выход: ${nextBatch.title}`;
  if (nextTimeEl) nextTimeEl.textContent = nextBatch.time;
  if (nextSubEl) nextSubEl.textContent = `${nextBatch.desc} В партии: ${nextBatch.items}.`;
  if (heroDescEl) heroDescEl.textContent = `в ${nextBatch.time} (${nextBatch.title})`;
}

function startCountdownTimer() {
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  function tick() {
    const now = new Date();
    const nextBatch = LANDING_CONFIG.bakingSchedule[activeBatchIndex];
    if (!nextBatch) return;

    const [bH, bM] = nextBatch.time.split(':').map(Number);
    let target = new Date();
    target.setHours(bH, bM, 0, 0);

    // If target is in the past for today, point to tomorrow
    if (target.getTime() <= now.getTime()) {
      target.setDate(target.getDate() + 1);
    }

    const diff = Math.max(0, target.getTime() - now.getTime());
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
}

window.scrollToMenuAndSelect = function(batchTitle) {
  const menuSection = document.getElementById('menu');
  if (menuSection) {
    menuSection.scrollIntoView({ behavior: 'smooth' });
  }
};

/* ==========================================================================
   5. PRE-ORDER BASKET & PRODUCTS STATE MANAGEMENT
   ========================================================================== */
const cartState = {
  items: {}, // key: productId -> { id, name, price, qty }
  totalQty: 0,
  totalPrice: 0
};

const GIFT_THRESHOLD = 2000; // 2000 RUB for complimentary whipped butter

function initCartListeners() {
  // Add-to-cart clicks
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-action="add"]');
    if (addBtn) {
      const id = addBtn.dataset.id;
      const name = addBtn.dataset.name;
      const price = parseInt(addBtn.dataset.price, 10);
      addToCart(id, name, price);
      return;
    }

    const plusBtn = e.target.closest('[data-action="plus"]');
    if (plusBtn) {
      const id = plusBtn.dataset.id;
      incrementItem(id);
      return;
    }

    const minusBtn = e.target.closest('[data-action="minus"]');
    if (minusBtn) {
      const id = minusBtn.dataset.id;
      decrementItem(id);
      return;
    }

    const removeBtn = e.target.closest('[data-action="remove-item"]');
    if (removeBtn) {
      const id = removeBtn.dataset.id;
      removeItem(id);
      return;
    }
  });

  // Cart open trigger
  const cartOpenBtn = document.getElementById('cart-open-btn');
  if (cartOpenBtn) {
    cartOpenBtn.addEventListener('click', openCheckoutModal);
  }

  // Sticky bar checkout trigger
  const stickyCheckoutBtn = document.getElementById('sticky-checkout-btn');
  if (stickyCheckoutBtn) {
    stickyCheckoutBtn.addEventListener('click', openCheckoutModal);
  }

  // Header reserve triggers
  const trackerReserveBtn = document.getElementById('tracker-reserve-btn');
  if (trackerReserveBtn) {
    trackerReserveBtn.addEventListener('click', () => {
      openCheckoutModal();
    });
  }

  const contactsPreorderBtn = document.getElementById('contacts-preorder-btn');
  if (contactsPreorderBtn) {
    contactsPreorderBtn.addEventListener('click', openCheckoutModal);
  }

  const mobilePreorderBtn = document.getElementById('mobile-drawer-preorder');
  if (mobilePreorderBtn) {
    mobilePreorderBtn.addEventListener('click', () => {
      closeMobileDrawer();
      openCheckoutModal();
    });
  }

  // Clear cart in modal
  const clearCartBtn = document.getElementById('modal-clear-cart');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      cartState.items = {};
      recalculateCart();
      renderAllProductCardControls();
      renderModalSummary();
    });
  }
}

function addToCart(id, name, price) {
  if (!cartState.items[id]) {
    cartState.items[id] = { id, name, price, qty: 1 };
  } else {
    cartState.items[id].qty += 1;
  }
  recalculateCart();
  renderProductCardControl(id);
}

function incrementItem(id) {
  if (cartState.items[id]) {
    cartState.items[id].qty += 1;
    recalculateCart();
    renderProductCardControl(id);
    renderModalSummary();
  }
}

function decrementItem(id) {
  if (cartState.items[id]) {
    cartState.items[id].qty -= 1;
    if (cartState.items[id].qty <= 0) {
      delete cartState.items[id];
    }
    recalculateCart();
    renderProductCardControl(id);
    renderModalSummary();
  }
}

function removeItem(id) {
  if (cartState.items[id]) {
    delete cartState.items[id];
    recalculateCart();
    renderProductCardControl(id);
    renderModalSummary();
  }
}

function recalculateCart() {
  let qty = 0;
  let price = 0;

  for (const id in cartState.items) {
    qty += cartState.items[id].qty;
    price += cartState.items[id].qty * cartState.items[id].price;
  }

  cartState.totalQty = qty;
  cartState.totalPrice = price;

  // Update header badge
  const badge = document.getElementById('header-cart-count');
  if (badge) {
    badge.textContent = qty;
    badge.style.transform = 'scale(1.3)';
    setTimeout(() => { badge.style.transform = 'scale(1)'; }, 200);
  }

  // Update Sticky bottom bar
  const stickyBar = document.getElementById('sticky-cart-bar');
  const barCount = document.getElementById('bar-items-count');
  const barPrice = document.getElementById('bar-total-price');
  const barGift = document.getElementById('bar-gift-hint');

  if (stickyBar) {
    if (qty > 0) {
      stickyBar.classList.add('is-visible');
      stickyBar.setAttribute('aria-hidden', 'false');
    } else {
      stickyBar.classList.remove('is-visible');
      stickyBar.setAttribute('aria-hidden', 'true');
    }
  }

  if (barCount) barCount.textContent = qty;
  if (barPrice) barPrice.textContent = `${price.toLocaleString('ru-RU')} ₽`;

  if (barGift) {
    if (price >= GIFT_THRESHOLD) {
      barGift.textContent = '🎁 Подарок активирован: баночка взбитого масла!';
      barGift.style.color = '#C98A35';
    } else {
      const remaining = GIFT_THRESHOLD - price;
      barGift.textContent = `Добавьте позиций еще на ${remaining} ₽ до подарка: взбитое масло Fleur de Sel!`;
      barGift.style.color = '#FDECC8';
    }
  }
}

function renderProductCardControl(id) {
  const container = document.querySelector(`[data-product-control="${id}"]`);
  if (!container) return;

  const item = cartState.items[id];
  if (!item || item.qty === 0) {
    // Return to simple Add button
    const card = container.closest('.product-card');
    const name = card.querySelector('.product-card__title').textContent.trim();
    const priceText = card.querySelector('.product-card__price').textContent;
    const price = parseInt(priceText.replace(/\D/g, ''), 10);

    container.innerHTML = `
      <button class="btn btn--outline btn--add" data-action="add" data-id="${id}" data-name="${name}" data-price="${price}">
        + В предзаказ
      </button>
    `;
  } else {
    // Show quantity counter
    container.innerHTML = `
      <div class="product-counter">
        <button class="counter-btn" data-action="minus" data-id="${id}" aria-label="Уменьшить">-</button>
        <span class="counter-qty">${item.qty}</span>
        <button class="counter-btn" data-action="plus" data-id="${id}" aria-label="Увеличить">+</button>
      </div>
    `;
  }
}

function renderAllProductCardControls() {
  document.querySelectorAll('[data-product-control]').forEach(el => {
    const id = el.getAttribute('data-product-control');
    renderProductCardControl(id);
  });
}

/* ==========================================================================
   6. CHECKOUT MODAL & ORDER FORM VALIDATION
   ========================================================================== */
function openCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (!modal) return;

  // If cart is completely empty, add 1 classical tartine so user has an active pre-order experience
  if (cartState.totalQty === 0) {
    addToCart('tartine-classic', 'Тартин пшеничный «Традисьон»', 390);
  }

  renderModalSummary();

  // Reset to form view if previously submitted
  document.getElementById('modal-form-view').style.display = 'block';
  document.getElementById('modal-success-view').style.display = 'none';

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function renderModalSummary() {
  const listEl = document.getElementById('modal-summary-items');
  const totalEl = document.getElementById('modal-summary-total');
  const progressFill = document.getElementById('gift-progress-fill');
  const progressText = document.getElementById('gift-progress-text');

  if (!listEl || !totalEl) return;

  if (cartState.totalQty === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; color: var(--color-text-muted); padding: 12px 0;">
        Корзина пуста. Выберите горячий хлеб или слойку в меню.
      </div>
    `;
    totalEl.textContent = '0 ₽';
    if (progressFill) progressFill.style.width = '0%';
    return;
  }

  let html = '';
  for (const id in cartState.items) {
    const item = cartState.items[id];
    const cost = item.qty * item.price;
    html += `
      <div class="summary-item-row">
        <span class="summary-item-name">${item.name}</span>
        <span class="summary-item-qty">${item.qty} шт. × ${item.price} ₽</span>
        <span class="summary-item-cost">${cost.toLocaleString('ru-RU')} ₽</span>
        <button type="button" class="summary-item-remove" data-action="remove-item" data-id="${id}" title="Удалить">&times;</button>
      </div>
    `;
  }
  listEl.innerHTML = html;
  totalEl.textContent = `${cartState.totalPrice.toLocaleString('ru-RU')} ₽`;

  // Gift progress
  const progressPercent = Math.min(100, Math.round((cartState.totalPrice / GIFT_THRESHOLD) * 100));
  if (progressFill) progressFill.style.width = `${progressPercent}%`;

  if (progressText) {
    if (cartState.totalPrice >= GIFT_THRESHOLD) {
      progressText.innerHTML = '<strong>✨ Подарок добавлен:</strong> баночка взбитого масла Fleur de Sel (бесплатно)';
      progressText.style.color = 'var(--color-crust)';
    } else {
      const needed = GIFT_THRESHOLD - cartState.totalPrice;
      progressText.textContent = `Заказ от 2000 ₽: взбитое масло в подарок (добавьте еще на ${needed} ₽)`;
      progressText.style.color = 'var(--color-olive)';
    }
  }
}

function initModalAndForm() {
  const modal = document.getElementById('checkout-modal');
  const closeBtn = document.getElementById('checkout-modal-close');
  const overlay = document.getElementById('checkout-modal-overlay');
  const successCloseBtn = document.getElementById('success-modal-close-btn');

  if (closeBtn) closeBtn.addEventListener('click', closeCheckoutModal);
  if (overlay) overlay.addEventListener('click', closeCheckoutModal);
  if (successCloseBtn) successCloseBtn.addEventListener('click', closeCheckoutModal);

  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
      closeCheckoutModal();
    }
  });

  // Delivery type radio toggle
  const deliveryRadios = document.querySelectorAll('input[name="delivery_type"]');
  const addressGroup = document.getElementById('address-field-group');

  deliveryRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'delivery') {
        addressGroup.style.display = 'flex';
      } else {
        addressGroup.style.display = 'none';
      }
    });
  });

  // Phone input mask for +7 (XXX) XXX-XX-XX
  const phoneInput = document.getElementById('order-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', handlePhoneInput);
    phoneInput.addEventListener('focus', () => {
      if (!phoneInput.value) {
        phoneInput.value = '+7 (';
      }
    });
  }

  // Order form submission
  const orderForm = document.getElementById('order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', handleOrderSubmit);
  }
}

/* Russian Phone Mask Logic */
function handlePhoneInput(e) {
  const input = e.target;
  let val = input.value.replace(/\D/g, '');
  
  if (val.startsWith('7') || val.startsWith('8')) {
    val = val.substring(1);
  }

  let formatted = '+7 (';
  if (val.length > 0) {
    formatted += val.substring(0, 3);
  }
  if (val.length >= 3) {
    formatted += ') ' + val.substring(3, 6);
  }
  if (val.length >= 6) {
    formatted += '-' + val.substring(6, 8);
  }
  if (val.length >= 8) {
    formatted += '-' + val.substring(8, 10);
  }

  input.value = formatted;
}

function handleOrderSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById('order-name');
  const phoneInput = document.getElementById('order-phone');
  const privacyCheckbox = document.getElementById('order-privacy');
  const nameError = document.getElementById('order-name-error');
  const phoneError = document.getElementById('order-phone-error');
  const privacyError = document.getElementById('order-privacy-error');

  let isValid = true;

  // Name validation
  if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
    nameInput.classList.add('is-invalid');
    if (nameError) nameError.style.display = 'block';
    isValid = false;
  } else {
    nameInput.classList.remove('is-invalid');
    if (nameError) nameError.style.display = 'none';
  }

  // Phone validation: check for 10 digits
  const rawDigits = phoneInput.value.replace(/\D/g, '');
  if (rawDigits.length !== 11) {
    phoneInput.classList.add('is-invalid');
    if (phoneError) phoneError.style.display = 'block';
    isValid = false;
  } else {
    phoneInput.classList.remove('is-invalid');
    if (phoneError) phoneError.style.display = 'none';
  }

  // Privacy agreement
  if (!privacyCheckbox.checked) {
    if (privacyError) privacyError.style.display = 'block';
    isValid = false;
  } else {
    if (privacyError) privacyError.style.display = 'none';
  }

  if (!isValid) return;

  // Process order
  const orderId = `#HM-${Math.floor(1000 + Math.random() * 9000)}`;
  const timeSelect = document.getElementById('order-time');
  const selectedTimeText = timeSelect.options[timeSelect.selectedIndex].text;
  const deliveryType = document.querySelector('input[name="delivery_type"]:checked').value;
  const deliveryLabel = (deliveryType === 'delivery') ? 'Курьерская доставка' : 'Самовывоз из пекарни';

  // Populate success view recap
  const orderIdEl = document.getElementById('success-order-id');
  if (orderIdEl) orderIdEl.textContent = orderId;

  const recapContent = document.getElementById('success-recap-content');
  if (recapContent) {
    let itemsSummaryList = Object.values(cartState.items)
      .map(item => `<li>${item.name} — ${item.qty} шт. (${(item.qty * item.price)} ₽)</li>`)
      .join('');

    if (cartState.totalPrice >= GIFT_THRESHOLD) {
      itemsSummaryList += '<li style="color: #C98A35;">🎁 Баночка взбитого масла Fleur de Sel — 1 шт. (Подарок)</li>';
    }

    recapContent.innerHTML = `
      <div style="margin-bottom: 8px;"><strong>Получатель:</strong> ${nameInput.value.trim()}, ${phoneInput.value}</div>
      <div style="margin-bottom: 8px;"><strong>Способ:</strong> ${deliveryLabel}</div>
      <div style="margin-bottom: 8px;"><strong>Время готовности:</strong> ${selectedTimeText}</div>
      <div style="margin-bottom: 12px;"><strong>Позиции заказа:</strong></div>
      <ul style="padding-left: 18px; margin-bottom: 12px; font-size: 0.85rem; line-height: 1.6;">
        ${itemsSummaryList}
      </ul>
      <div style="font-size: 1rem; color: var(--color-wood);"><strong>Сумма к оплате:</strong> <span style="color: var(--color-crust); font-weight: 700;">${cartState.totalPrice.toLocaleString('ru-RU')} ₽</span></div>
    `;
  }

  // Switch to success view
  document.getElementById('modal-form-view').style.display = 'none';
  document.getElementById('modal-success-view').style.display = 'block';

  // Reset cart after confirmed order
  cartState.items = {};
  recalculateCart();
  renderAllProductCardControls();
}

/* ==========================================================================
   7. CATEGORY FILTER TABS FOR MENU
   ========================================================================== */
function initMenuFilters() {
  const tabs = document.querySelectorAll('.menu-tab');
  const cards = document.querySelectorAll('.product-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.dataset.category;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Footer category links
  document.querySelectorAll('a[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
      const cat = link.dataset.filter;
      const targetTab = document.querySelector(`.menu-tab[data-category="${cat}"]`);
      if (targetTab) {
        targetTab.click();
      }
    });
  });
}

/* ==========================================================================
   8. ACCORDION (FAQ)
   ========================================================================== */
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isOpen = item.classList.contains('is-open');

      // Close all other accordion items
      document.querySelectorAll('.accordion-item').forEach(other => {
        if (other !== item) {
          other.classList.remove('is-open');
          other.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('is-open');
        header.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   9. YANDEX MAPS 2.1 INITIALIZATION WITH FALLBACK
   ========================================================================== */
function initYandexMap() {
  const mapContainer = document.getElementById('yandex-map');
  const fallback = document.getElementById('map-fallback');
  if (!mapContainer) return;

  // Check if ymaps is loaded
  if (typeof ymaps === 'undefined') {
    if (fallback) fallback.style.display = 'flex';
    return;
  }

  ymaps.ready(() => {
    try {
      if (fallback) fallback.style.display = 'none';

      const map = new ymaps.Map('yandex-map', {
        center: LANDING_CONFIG.coordinates,
        zoom: LANDING_CONFIG.mapZoom,
        controls: ['zoomControl', 'fullscreenControl']
      }, {
        suppressMapOpenBlock: true
      });

      // Custom Placid Crust Pin
      const placemark = new ymaps.Placemark(LANDING_CONFIG.coordinates, {
        hintContent: `${LANDING_CONFIG.brandName} — Ремесленная пекарня`,
        balloonContentHeader: `<strong style="font-size:16px; color:#4A2E1B;">${LANDING_CONFIG.brandName}</strong>`,
        balloonContentBody: `
          <div style="font-size:14px; line-height:1.5; color:#382415;">
            <div>🥖 ${LANDING_CONFIG.tagline}</div>
            <div style="margin-top:4px;">📍 ${LANDING_CONFIG.address}</div>
            <div style="margin-top:4px;">⏰ Режим: ежедневно с 07:30 до 21:00</div>
          </div>
        `,
        balloonContentFooter: `
          <div style="margin-top:8px;">
            <a href="tel:${LANDING_CONFIG.phoneRaw}" style="color:#C98A35; font-weight:700;">${LANDING_CONFIG.phone}</a>
          </div>
        `
      }, {
        preset: 'islands#darkOrangeDotIcon'
      });

      map.geoObjects.add(placemark);

      // Disable default scroll zoom to prevent accidental page scroll hijacking
      map.behaviors.disable('scrollZoom');

      // Adjust map layout on window resize
      window.addEventListener('resize', () => {
        map.container.fitToViewport();
      });

    } catch (err) {
      console.warn('Yandex Maps initialization fallback triggered:', err);
      if (fallback) fallback.style.display = 'flex';
    }
  });
}

/* ==========================================================================
   10. MOBILE DRAWER NAVIGATION & SCROLL LISTENER
   ========================================================================== */
function openMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  if (drawer) {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-expanded', 'true');
  }
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  if (drawer) {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-expanded', 'false');
  }
}

function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const drawerLinks = document.querySelectorAll('.mobile-nav__link');

  if (toggleBtn) toggleBtn.addEventListener('click', openMobileDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeMobileDrawer);
  if (overlay) overlay.addEventListener('click', closeMobileDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
  });
}

function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   11. APPLICATION INITIALIZATION (DOM CONTENT LOADED)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  bindLandingConfig();
  checkBakeryOpenStatus();
  initFreshBakeTracker();
  initCartListeners();
  initModalAndForm();
  initMenuFilters();
  initAccordion();
  initMobileMenu();
  initHeaderScroll();
  initYandexMap();

  // Periodically refresh bakery open status every 60 seconds
  setInterval(checkBakeryOpenStatus, 60000);
});
