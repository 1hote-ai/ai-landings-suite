/**
 * HOP & BARREL / ХМЕЛЬ & БОЧКА — CRAFT BREWERY & GASTROPUB
 * Production-Grade JavaScript Controller
 * 
 * Includes:
 * 1. LANDING_CONFIG with dynamic DOM binding
 * 2. Real-time Live Pub Working Hours & Status
 * 3. Interactive Tap List with Search, Style, ABV, IBU filtering & Sorting
 * 4. Interactive Beer Flight Builder (4x150ml) with Presets & Modal Integration
 * 5. Yandex Maps 2.1 Initialization with Custom Amber Pin & Fallback
 * 6. Russian Phone Input Mask (+7 (___) ___-__-__)
 * 7. Table Reservation & Tour Registration Modals with Validation & Success State
 * 8. FAQ Accordion with Accessible Key & Click Handlers
 * 9. Gastropub Menu Filtering
 * 10. Toast Notification System & Mobile Drawer Nav
 */

/* ==========================================================================
   1. LANDING CONFIGURATION OBJECT
   ========================================================================== */
const LANDING_CONFIG = {
  // Brand identity
  brandName: 'HOP & BARREL',
  brandShort: 'HOP & BARREL',
  brandTagline: 'Крафтовая пивоварня & Гастропаб',
  brandFull: 'HOP & BARREL / Хмель & Бочка',

  // Contact details
  phone: '+7 (495) 890-42-13',
  phoneClean: '+74958904213',
  email: 'info@hopbarrel.ru',

  // Physical Location & Navigation
  address: 'Москва, ул. Самотёчная, 13',
  metro: 'м. Достоевская (5 мин) / м. Цветной бульвар',
  coordinates: [55.772314, 37.618992],
  zoom: 16,
  yandexMapsLink: 'https://yandex.ru/maps/?pt=37.618992,55.772314&z=17&l=map',

  // Operating Schedule
  scheduleWeekdays: 'Вс — Чт: 14:00 — 00:00',
  scheduleWeekends: 'Пт — Сб: 14:00 — 02:00',
  kitchenSchedule: 'Кухня работает ежедневно с 14:00 до 23:30 (Пт-Сб до 01:00)',
  toursSchedule: 'Суббота и воскресенье в 16:00',

  // Hours Configuration for dynamic status calculation
  // Days: 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
  hoursConfig: {
    0: { open: 14, close: 24, closeLabel: '00:00' }, // Sun
    1: { open: 14, close: 24, closeLabel: '00:00' }, // Mon
    2: { open: 14, close: 24, closeLabel: '00:00' }, // Tue
    3: { open: 14, close: 24, closeLabel: '00:00' }, // Wed
    4: { open: 14, close: 24, closeLabel: '00:00' }, // Thu
    5: { open: 14, close: 26, closeLabel: '02:00' }, // Fri (runs until 2am Sat)
    6: { open: 14, close: 26, closeLabel: '02:00' }  // Sat (runs until 2am Sun)
  },

  // Social Channels
  socialTg: 'https://t.me/hopbarrel_brewery',
  socialVk: 'https://vk.com/hopbarrel_pub',
  socialUntappd: 'https://untappd.com/v/hop-and-barrel-brewery/9924810',

  // Flight defaults
  flightPrice: 890,
  maxFlightItems: 4
};

/* ==========================================================================
   2. TAP LIST DATA (24 Taps Catalog / 12 Core Featured Taps)
   ========================================================================== */
const TAP_LIST_DATA = [
  {
    id: 1,
    tapNumber: '#01',
    name: 'MOSCOW DUST',
    style: 'New England Hazy Double IPA',
    category: 'ipa',
    abv: 8.2,
    ibu: 55,
    og: '18.5%',
    hops: 'Citra Lupomax, Mosaic, Galaxy',
    desc: 'Флагманский мутный эль с сочной сливочной текстурой. Взрыв спелого манго, ананаса и маракуйи с мягкой смолистой горечью.',
    prices: { p33: '380 ₽', p50: '520 ₽', p100: '950 ₽' }
  },
  {
    id: 2,
    tapNumber: '#02',
    name: 'COPPER FOUNDRY',
    style: 'American Amber Ale',
    category: 'ipa',
    abv: 5.6,
    ibu: 34,
    og: '13.5%',
    hops: 'Cascade, Centennial, Chinook',
    desc: 'Медно-янтарный благородный эль на пяти карамельных солодах. Ноты поджаренной хлебной корочки, грейпфрута и сосновой хвои.',
    prices: { p33: '320 ₽', p50: '440 ₽', p100: '800 ₽' }
  },
  {
    id: 3,
    tapNumber: '#03',
    name: 'BARREL AGED TSAR',
    style: 'Imperial Stout (Bourbon Cask 12 mo.)',
    category: 'stout',
    abv: 11.5,
    ibu: 70,
    og: '26.0%',
    hops: 'Northern Brewer, Columbus',
    desc: 'Выдержан 12 месяцев в дубовых бочках Heaven Hill. Густой, как нефть: горький бельгийский шоколад, эспрессо, дуб и согревающий бурбон.',
    prices: { p33: '450 ₽', p50: '620 ₽', p100: '1 200 ₽' }
  },
  {
    id: 4,
    tapNumber: '#04',
    name: 'URBAN NOMAD',
    style: 'West Coast Classic IPA',
    category: 'ipa',
    abv: 6.8,
    ibu: 65,
    og: '15.5%',
    hops: 'Simcoe, Amarillo, Columbus',
    desc: 'Кристально прозрачный классический IPA старой школы. Бескомпромиссная сухая хвойная горечь, цедра помело и смолистое долгое послевкусие.',
    prices: { p33: '350 ₽', p50: '480 ₽', p100: '880 ₽' }
  },
  {
    id: 5,
    tapNumber: '#05',
    name: 'BAVARIAN SMOKE',
    style: 'Rauchbier / Копченый лагер',
    category: 'wheat',
    abv: 5.4,
    ibu: 22,
    og: '13.0%',
    hops: 'Hallertau Mittelfrüh',
    desc: 'Варка на солоде, высушенном на буковых дровах из Франконии. Неповторимый аромат костра, копченого бекона и свежеиспеченного бородинского хлеба.',
    prices: { p33: '330 ₽', p50: '450 ₽', p100: '820 ₽' }
  },
  {
    id: 6,
    tapNumber: '#06',
    name: 'NORDIC BLONDE',
    style: 'Bohemian Crispy Pilsner',
    category: 'lager',
    abv: 4.8,
    ibu: 38,
    og: '11.8%',
    hops: 'Saaz (Жатецкий полуранний)',
    desc: 'Хрустящий лагер низового брожения с выдержкой 45 дней. Золотистый цвет, тонкая цветочная горечь благородного хмеля и чистый освежающий финал.',
    prices: { p33: '290 ₽', p50: '390 ₽', p100: '720 ₽' }
  },
  {
    id: 7,
    tapNumber: '#07',
    name: 'CHERRY CELLAR',
    style: 'Flanders Red Ale / Дикий вишневый эль',
    category: 'sour',
    abv: 6.5,
    ibu: 15,
    og: '16.0%',
    hops: 'Aged Styrian Goldings',
    desc: 'Фламандский кислый эль спонтанного брожения. Созревание 9 месяцев с ягодами дикой вишни сорта Морелло. Изысканная винная кислинка и танины.',
    prices: { p33: '420 ₽', p50: '580 ₽', p100: '1 050 ₽' }
  },
  {
    id: 8,
    tapNumber: '#08',
    name: 'RIVER MIST',
    style: 'Bavarian Hefeweizen / Пшеничное',
    category: 'wheat',
    abv: 5.2,
    ibu: 14,
    og: '12.5%',
    hops: 'Perle, Tettnanger',
    desc: 'Традиционное нефильтрованное пшеничное пиво (60% пшеничного солода). Плотная кремовая пена, характерные тона спелого банана и гвоздики.',
    prices: { p33: '310 ₽', p50: '420 ₽', p100: '780 ₽' }
  },
  {
    id: 9,
    tapNumber: '#09',
    name: 'SMOKED CHILI PORTER',
    style: 'Baltic Porter with Habanero',
    category: 'stout',
    abv: 8.5,
    ibu: 45,
    og: '20.0%',
    hops: 'Northern Brewer',
    desc: 'Крепкий балтийский портер с черносливом, копченой грушей и свежим перцем Хабанеро. Деликатное тепло согревает горло на самом финише глотка.',
    prices: { p33: '390 ₽', p50: '540 ₽', p100: '990 ₽' }
  },
  {
    id: 10,
    tapNumber: '#10',
    name: 'ELECTRIC MANGO',
    style: 'Imperial Pastry Sour Ale',
    category: 'sour',
    abv: 7.0,
    ibu: 10,
    og: '19.0%',
    hops: 'Mosaic Cryo',
    desc: 'Пюре отборного индийского манго Альфонсо, маракуйя и щепотка розовой гималайской соли. Смузи-текстура, яркий кисло-сладкий тропический взрыв.',
    prices: { p33: '410 ₽', p50: '560 ₽', p100: '1 020 ₽' }
  },
  {
    id: 11,
    tapNumber: '#11',
    name: 'OLD OAK ORCHARD',
    style: 'Dry Hopped Apple Cider / Сухой сидр',
    category: 'sour',
    abv: 5.5,
    ibu: 5,
    og: '12.0%',
    hops: 'Dry-Hopped with Citra',
    desc: 'Натуральный яблочный сидр из старых садов Тульской области прямого отжима. Холодное охмеление хмелем Citra дает свежий цитрусовый тон.',
    prices: { p33: '320 ₽', p50: '440 ₽', p100: '800 ₽' }
  },
  {
    id: 12,
    tapNumber: '#12',
    name: 'DARK COCOA VELVET',
    style: 'Milk Oatmeal Stout / Овсяный стаут',
    category: 'stout',
    abv: 5.8,
    ibu: 28,
    og: '16.0%',
    hops: 'East Kent Goldings',
    desc: 'Овсяные хлопья, лактоза и обжаренные венесуэльские какао-бобы. Мягчайший десертный стаут с бархатным вкусом сливочного шоколадного десерта.',
    prices: { p33: '340 ₽', p50: '460 ₽', p100: '850 ₽' }
  }
];

/* ==========================================================================
   3. DOM BINDING OF LANDING_CONFIG
   ========================================================================== */
function bindLandingConfigToDOM() {
  // Bind text contents
  document.querySelectorAll('[data-config]').forEach(elem => {
    const key = elem.getAttribute('data-config');
    if (LANDING_CONFIG[key] !== undefined) {
      elem.textContent = LANDING_CONFIG[key];
    }
  });

  // Bind href attributes (phone, email, social)
  document.querySelectorAll('[data-config-href]').forEach(elem => {
    const key = elem.getAttribute('data-config-href');
    if (key === 'phoneClean') {
      elem.setAttribute('href', 'tel:' + LANDING_CONFIG.phoneClean);
    } else if (key === 'email') {
      elem.setAttribute('href', 'mailto:' + LANDING_CONFIG.email);
    } else if (LANDING_CONFIG[key] !== undefined) {
      elem.setAttribute('href', LANDING_CONFIG[key]);
    }
  });

  // Update dynamic year in footer
  const yearElem = document.getElementById('current-year');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   4. REAL-TIME WORKING HOURS STATUS
   ========================================================================== */
function updateLiveWorkingStatus() {
  const statusPill = document.getElementById('live-status-pill');
  const statusText = document.getElementById('live-status-text');
  const heroSchedule = document.getElementById('hero-schedule-text');
  const indicatorDot = statusPill ? statusPill.querySelector('.status-indicator-dot') : null;

  if (!statusText) return;

  const now = new Date();
  const day = now.getDay(); // 0 is Sunday, 5 is Friday, 6 is Saturday
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentFractionalHour = hour + (minute / 60);

  // Check today's schedule
  const todaySchedule = LANDING_CONFIG.hoursConfig[day];

  // Note: Fri/Sat close at 2am next calendar day (represented as 26:00)
  // For early morning hours (e.g. 00:00 to 02:00 on Saturday or Sunday), check previous day
  let isOpen = false;
  let statusMessage = '';

  if (hour < 4) {
    // We are in early morning hours (00:00 - 04:00)
    const prevDay = (day === 0) ? 6 : day - 1;
    const prevSchedule = LANDING_CONFIG.hoursConfig[prevDay];
    if (prevSchedule.close > 24) {
      const remainingCloseHour = prevSchedule.close - 24;
      if (currentFractionalHour < remainingCloseHour) {
        isOpen = true;
        statusMessage = `Открыто сегодня до ${prevSchedule.closeLabel}`;
      }
    }
  }

  if (!isOpen) {
    if (currentFractionalHour >= todaySchedule.open) {
      if (todaySchedule.close <= 24) {
        if (currentFractionalHour < todaySchedule.close) {
          isOpen = true;
          statusMessage = `Открыто сегодня до ${todaySchedule.closeLabel}`;
        }
      } else {
        // Closes after midnight (2am)
        isOpen = true;
        statusMessage = `Открыто сегодня до ${todaySchedule.closeLabel}`;
      }
    }
  }

  if (!isOpen) {
    if (currentFractionalHour < todaySchedule.open) {
      statusMessage = `Откроемся сегодня в ${todaySchedule.open}:00`;
    } else {
      const nextDay = (day + 1) % 7;
      const nextSchedule = LANDING_CONFIG.hoursConfig[nextDay];
      statusMessage = `Закрыто • Ждем вас завтра с ${nextSchedule.open}:00`;
    }
  }

  // Update UI elements
  statusText.textContent = statusMessage;

  if (heroSchedule) {
    heroSchedule.textContent = `Сегодня открыты: 14:00 – ${todaySchedule.closeLabel}`;
  }

  if (indicatorDot) {
    if (isOpen) {
      indicatorDot.classList.remove('closed');
      indicatorDot.title = 'Бар открыт прямо сейчас';
    } else {
      indicatorDot.classList.add('closed');
      indicatorDot.title = 'Бар откроется согласно расписанию';
    }
  }
}

/* ==========================================================================
   5. INTERACTIVE TAP LIST (SEARCH, FILTERS, BEER FLIGHT ACTIONS)
   ========================================================================== */
class TapListController {
  constructor(beerList) {
    this.beers = beerList;
    this.filteredBeers = [...beerList];

    // Filter states
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.selectedAbvRange = 'all'; // 'all', 'light', 'medium', 'strong'
    this.selectedIbuRange = 'all'; // 'all', 'mild', 'balanced', 'bitter'
    this.sortBy = 'tap-asc';

    // DOM containers
    this.container = document.getElementById('tap-list-container');
    this.searchInput = document.getElementById('tap-search-input');
    this.searchClearBtn = document.getElementById('search-clear-btn');
    this.sortSelect = document.getElementById('tap-sort-select');
    this.categoryContainer = document.getElementById('style-filter-container');
    this.abvFilterContainer = document.getElementById('abv-filter-tags');
    this.ibuFilterContainer = document.getElementById('ibu-filter-tags');
    this.resetBtn = document.getElementById('reset-all-filters-btn');
    this.emptyState = document.getElementById('tap-empty-state');
    this.emptyResetBtn = document.getElementById('empty-state-reset-btn');
    this.visibleCountElem = document.getElementById('visible-taps-count');

    this.init();
  }

  init() {
    this.updateCategoryCounts();
    this.bindEvents();
    this.render();
  }

  updateCategoryCounts() {
    const counts = { all: this.beers.length, ipa: 0, stout: 0, lager: 0, wheat: 0, sour: 0 };
    this.beers.forEach(b => {
      if (counts[b.category] !== undefined) counts[b.category]++;
    });

    for (const [cat, count] of Object.entries(counts)) {
      const countEl = document.getElementById(`count-${cat}`);
      if (countEl) countEl.textContent = count;
    }
  }

  bindEvents() {
    // Search input
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        if (this.searchClearBtn) {
          this.searchClearBtn.style.display = this.searchQuery ? 'block' : 'none';
        }
        this.applyFilters();
      });
    }

    // Search clear
    if (this.searchClearBtn) {
      this.searchClearBtn.addEventListener('click', () => {
        this.searchInput.value = '';
        this.searchQuery = '';
        this.searchClearBtn.style.display = 'none';
        this.applyFilters();
        this.searchInput.focus();
      });
    }

    // Sort select
    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        this.applyFilters();
      });
    }

    // Style category buttons
    if (this.categoryContainer) {
      this.categoryContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.cat-pill');
        if (!btn) return;
        this.categoryContainer.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedCategory = btn.getAttribute('data-category');
        this.applyFilters();
      });
    }

    // ABV range tags
    if (this.abvFilterContainer) {
      this.abvFilterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.param-tag');
        if (!btn) return;
        this.abvFilterContainer.querySelectorAll('.param-tag').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedAbvRange = btn.getAttribute('data-abv-range');
        this.applyFilters();
      });
    }

    // IBU range tags
    if (this.ibuFilterContainer) {
      this.ibuFilterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.param-tag');
        if (!btn) return;
        this.ibuFilterContainer.querySelectorAll('.param-tag').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedIbuRange = btn.getAttribute('data-ibu-range');
        this.applyFilters();
      });
    }

    // Reset filters
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => this.resetFilters());
    }

    if (this.emptyResetBtn) {
      this.emptyResetBtn.addEventListener('click', () => this.resetFilters());
    }

    // Delegate "Add to Flight" button click inside tap list
    if (this.container) {
      this.container.addEventListener('click', (e) => {
        const flightBtn = e.target.closest('.btn-add-flight');
        if (!flightBtn) return;
        const beerId = parseInt(flightBtn.getAttribute('data-beer-id'), 10);
        window.flightController.toggleBeerInFlight(beerId);
      });
    }
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.selectedAbvRange = 'all';
    this.selectedIbuRange = 'all';
    this.sortBy = 'tap-asc';

    if (this.searchInput) this.searchInput.value = '';
    if (this.searchClearBtn) this.searchClearBtn.style.display = 'none';
    if (this.sortSelect) this.sortSelect.value = 'tap-asc';

    if (this.categoryContainer) {
      this.categoryContainer.querySelectorAll('.cat-pill').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-category') === 'all');
      });
    }

    if (this.abvFilterContainer) {
      this.abvFilterContainer.querySelectorAll('.param-tag').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-abv-range') === 'all');
      });
    }

    if (this.ibuFilterContainer) {
      this.ibuFilterContainer.querySelectorAll('.param-tag').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-ibu-range') === 'all');
      });
    }

    this.applyFilters();
    showToast('Все фильтры кран-листа сброшены', 'info');
  }

  applyFilters() {
    this.filteredBeers = this.beers.filter(b => {
      // 1. Category match
      if (this.selectedCategory !== 'all' && b.category !== this.selectedCategory) {
        return false;
      }

      // 2. Search match
      if (this.searchQuery) {
        const textToSearch = `${b.name} ${b.style} ${b.hops} ${b.desc} ${b.tapNumber}`.toLowerCase();
        if (!textToSearch.includes(this.searchQuery)) {
          return false;
        }
      }

      // 3. ABV range
      if (this.selectedAbvRange === 'light' && b.abv >= 5.5) return false;
      if (this.selectedAbvRange === 'medium' && (b.abv < 5.5 || b.abv > 7.5)) return false;
      if (this.selectedAbvRange === 'strong' && b.abv <= 7.5) return false;

      // 4. IBU range
      if (this.selectedIbuRange === 'mild' && b.ibu >= 25) return false;
      if (this.selectedIbuRange === 'balanced' && (b.ibu < 25 || b.ibu > 50)) return false;
      if (this.selectedIbuRange === 'bitter' && b.ibu <= 50) return false;

      return true;
    });

    // Sort logic
    if (this.sortBy === 'tap-asc') {
      this.filteredBeers.sort((a, b) => a.id - b.id);
    } else if (this.sortBy === 'abv-asc') {
      this.filteredBeers.sort((a, b) => a.abv - b.abv);
    } else if (this.sortBy === 'abv-desc') {
      this.filteredBeers.sort((a, b) => b.abv - a.abv);
    } else if (this.sortBy === 'ibu-desc') {
      this.filteredBeers.sort((a, b) => b.ibu - a.ibu);
    } else if (this.sortBy === 'price-asc') {
      this.filteredBeers.sort((a, b) => parseInt(a.prices.p50) - parseInt(b.prices.p50));
    }

    this.render();
  }

  render() {
    if (!this.container) return;

    if (this.visibleCountElem) {
      this.visibleCountElem.textContent = this.filteredBeers.length;
    }

    if (this.filteredBeers.length === 0) {
      this.container.style.display = 'none';
      if (this.emptyState) this.emptyState.style.display = 'block';
      return;
    }

    this.container.style.display = 'grid';
    if (this.emptyState) this.emptyState.style.display = 'none';

    // Build markup
    const currentFlightBeerIds = window.flightController ? window.flightController.getFlightBeerIds() : [];

    this.container.innerHTML = this.filteredBeers.map(beer => {
      const isAlreadyInFlight = currentFlightBeerIds.includes(beer.id);
      const buttonText = isAlreadyInFlight ? '✓ В вашем сете (150 мл)' : '+ В дегустационный сет';
      const buttonClass = isAlreadyInFlight ? 'btn-add-flight added' : 'btn-add-flight';

      return `
        <article class="tap-card" data-beer-id="${beer.id}">
          <div class="tap-card__header">
            <div class="tap-card__title-wrap">
              <h3 class="tap-card__name">${beer.name}</h3>
              <div class="tap-card__style">${beer.style}</div>
            </div>
            <div class="tap-number-stamp" title="Поворотный кран">${beer.tapNumber}</div>
          </div>

          <div class="tap-card__metrics">
            <div class="metric-pill">
              <span class="metric-label">Крепость</span>
              <span class="metric-value">${beer.abv}%</span>
            </div>
            <div class="metric-pill">
              <span class="metric-label">Горечь</span>
              <span class="metric-value">${beer.ibu} IBU</span>
            </div>
            <div class="metric-pill">
              <span class="metric-label">Плотность</span>
              <span class="metric-value">${beer.og}</span>
            </div>
          </div>

          <p class="tap-card__desc">${beer.desc}</p>
          <div class="tap-card__hops"><strong>Хмель / Особенности:</strong> ${beer.hops}</div>

          <div class="tap-card__pricing">
            <div class="price-col">
              <span class="price-size">0.33 л</span>
              <span class="price-cost">${beer.prices.p33}</span>
            </div>
            <div class="price-col">
              <span class="price-size">0.5 л (бокал)</span>
              <span class="price-cost">${beer.prices.p50}</span>
            </div>
            <div class="price-col">
              <span class="price-size">С собой 1 л</span>
              <span class="price-cost">${beer.prices.p100}</span>
            </div>
          </div>

          <button type="button" class="${buttonClass}" data-beer-id="${beer.id}">
            <span>${buttonText}</span>
          </button>
        </article>
      `;
    }).join('');
  }

  refreshFlightButtonStates() {
    if (!this.container) return;
    const currentFlightBeerIds = window.flightController ? window.flightController.getFlightBeerIds() : [];

    this.container.querySelectorAll('.btn-add-flight').forEach(btn => {
      const bId = parseInt(btn.getAttribute('data-beer-id'), 10);
      const isAlready = currentFlightBeerIds.includes(bId);
      if (isAlready) {
        btn.classList.add('added');
        btn.querySelector('span').textContent = '✓ В вашем сете (150 мл)';
      } else {
        btn.classList.remove('added');
        btn.querySelector('span').textContent = '+ В дегустационный сет';
      }
    });
  }
}

/* ==========================================================================
   6. INTERACTIVE BEER FLIGHT BUILDER
   ========================================================================== */
class FlightController {
  constructor(allBeers) {
    this.allBeers = allBeers;
    this.flightSlots = [null, null, null, null]; // 4 slots
    this.maxSlots = 4;

    // Presets mapping by beer IDs
    this.presets = {
      hop: [1, 2, 4, 10],     // Moscow Dust, Copper Foundry, Urban Nomad, Electric Mango
      dark: [3, 5, 9, 12],    // Barrel Aged Tsar, Bavarian Smoke, Smoked Chili Porter, Cocoa Velvet
      europe: [6, 8, 5, 11],  // Nordic Blonde, River Mist, Bavarian Smoke, Apple Cider
      sour: [7, 10, 11, 1]    // Cherry Cellar, Electric Mango, Apple Cider, Moscow Dust
    };

    // DOM References
    this.slotsContainer = document.getElementById('flight-slots');
    this.statusText = document.getElementById('flight-status-text');
    this.orderBtn = document.getElementById('order-flight-btn');
    this.clearBtn = document.getElementById('clear-flight-btn');
    this.dock = document.getElementById('floating-flight-dock');
    this.dockCount = document.getElementById('dock-flight-count');
    this.dockNames = document.getElementById('dock-beer-names');
    this.dockOrderBtn = document.getElementById('dock-quick-order-btn');

    this.init();
  }

  init() {
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    // Preset buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const presetKey = btn.getAttribute('data-preset');
        if (this.presets[presetKey]) {
          this.applyPreset(this.presets[presetKey], btn.textContent);
        }
      });
    });

    // Clear flight button
    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', () => {
        this.clearFlight();
        showToast('Дегустационный сет очищен', 'info');
      });
    }

    // Order flight button -> opens reservation modal prefilled
    if (this.orderBtn) {
      this.orderBtn.addEventListener('click', () => {
        this.openReservationWithFlight();
      });
    }

    if (this.dockOrderBtn) {
      this.dockOrderBtn.addEventListener('click', () => {
        this.openReservationWithFlight();
      });
    }

    // Remove slot click
    if (this.slotsContainer) {
      this.slotsContainer.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.slot-remove-btn');
        if (!removeBtn) return;
        const slotIdx = parseInt(removeBtn.getAttribute('data-slot-index'), 10);
        this.removeBeerFromSlot(slotIdx);
      });
    }
  }

  getFlightBeerIds() {
    return this.flightSlots.filter(b => b !== null).map(b => b.id);
  }

  toggleBeerInFlight(beerId) {
    const existingIndex = this.flightSlots.findIndex(b => b && b.id === beerId);
    if (existingIndex !== -1) {
      // Remove
      this.removeBeerFromSlot(existingIndex);
      return;
    }

    // Find first empty slot
    const emptyIndex = this.flightSlots.findIndex(b => b === null);
    if (emptyIndex === -1) {
      showToast('Сет уже заполнен (4 из 4). Удалите сорт или закажите текущий набор.', 'warning');
      return;
    }

    const beerToAdd = this.allBeers.find(b => b.id === beerId);
    if (!beerToAdd) return;

    this.flightSlots[emptyIndex] = beerToAdd;
    this.render();
    if (window.tapListController) window.tapListController.refreshFlightButtonStates();

    const filledCount = this.flightSlots.filter(b => b !== null).length;
    showToast(`«${beerToAdd.name}» добавлен в сет (${filledCount}/4)`, 'success');
  }

  removeBeerFromSlot(slotIdx) {
    const removedBeer = this.flightSlots[slotIdx];
    this.flightSlots[slotIdx] = null;
    this.render();
    if (window.tapListController) window.tapListController.refreshFlightButtonStates();
    if (removedBeer) {
      showToast(`«${removedBeer.name}» удален из сета`, 'info');
    }
  }

  clearFlight() {
    this.flightSlots = [null, null, null, null];
    this.render();
    if (window.tapListController) window.tapListController.refreshFlightButtonStates();
  }

  applyPreset(beerIds, presetLabel) {
    this.flightSlots = beerIds.map(id => this.allBeers.find(b => b.id === id) || null);
    this.render();
    if (window.tapListController) window.tapListController.refreshFlightButtonStates();
    showToast(`Загружен готовый сет: ${presetLabel}`, 'success');
  }

  openReservationWithFlight() {
    const filledBeers = this.flightSlots.filter(b => b !== null);
    if (filledBeers.length === 0) {
      showToast('Сначала выберите хотя бы один сорт для сета', 'warning');
      return;
    }

    const beerSummary = filledBeers.map(b => `${b.tapNumber} ${b.name}`).join(', ');
    const modal = document.getElementById('modal-reservation');
    const commentField = document.getElementById('res-comment');

    if (commentField) {
      commentField.value = `Предзаказ дегустационного сета (890 ₽): [${beerSummary}]`;
    }

    if (modal) {
      openModal(modal);
    }
  }

  render() {
    if (!this.slotsContainer) return;

    const filledBeers = this.flightSlots.filter(b => b !== null);
    const filledCount = filledBeers.length;

    // Render Slots
    this.slotsContainer.innerHTML = this.flightSlots.map((beer, idx) => {
      if (beer) {
        return `
          <div class="flight-slot filled" data-slot-index="${idx}">
            <div class="flight-slot__number">${idx + 1}</div>
            <div class="slot-filled-card">
              <button type="button" class="slot-remove-btn" data-slot-index="${idx}" aria-label="Удалить из сета">&times;</button>
              <div>
                <div class="slot-beer-tag">${beer.tapNumber} • ${beer.abv}% ABV</div>
                <div class="slot-beer-name">${beer.name}</div>
                <div class="slot-beer-style">${beer.style}</div>
              </div>
              <div class="slot-beer-meta">${beer.ibu} IBU • 150 мл</div>
            </div>
          </div>
        `;
      } else {
        return `
          <div class="flight-slot" data-slot-index="${idx}">
            <div class="flight-slot__number">${idx + 1}</div>
            <div class="flight-slot__empty">
              <span class="plus-icon">+</span>
              <span class="empty-text">Выберите сорт из кран-листа выше</span>
            </div>
          </div>
        `;
      }
    }).join('');

    // Summary Text
    if (this.statusText) {
      if (filledCount === 0) {
        this.statusText.textContent = 'Собрано 0 из 4 сортов. Добавьте любые сорта из кран-листа выше.';
      } else if (filledCount < 4) {
        this.statusText.textContent = `Собрано ${filledCount} из 4 сортов. Добавьте еще ${4 - filledCount} сорт(а) для полного сета.`;
      } else {
        this.statusText.textContent = 'Дегустационный сет полностью собран и готов к подаче!';
      }
    }

    // Action buttons
    if (this.orderBtn) {
      this.orderBtn.disabled = filledCount === 0;
    }
    if (this.clearBtn) {
      this.clearBtn.disabled = filledCount === 0;
    }

    // Floating Dock update
    if (this.dock) {
      if (filledCount > 0) {
        this.dock.style.display = 'block';
        if (this.dockCount) this.dockCount.textContent = filledCount;
        if (this.dockNames) {
          this.dockNames.textContent = filledBeers.map(b => b.name).join(' • ');
        }
      } else {
        this.dock.style.display = 'none';
      }
    }
  }
}

/* ==========================================================================
   7. GASTROPUB FOOD MENU FILTERING
   ========================================================================== */
function initFoodMenuTabs() {
  const tabsContainer = document.getElementById('food-tabs-container');
  const foodGrid = document.getElementById('food-grid');
  if (!tabsContainer || !foodGrid) return;

  tabsContainer.addEventListener('click', (e) => {
    const tabBtn = e.target.closest('.food-tab');
    if (!tabBtn) return;

    tabsContainer.querySelectorAll('.food-tab').forEach(t => t.classList.remove('active'));
    tabBtn.classList.add('active');

    const cat = tabBtn.getAttribute('data-food-cat');
    const cards = foodGrid.querySelectorAll('.food-card');

    cards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      if (cat === 'all' || cardCat === cat) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* ==========================================================================
   8. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const accordion = document.getElementById('faq-accordion');
  if (!accordion) return;

  accordion.addEventListener('click', (e) => {
    const trigger = e.target.closest('.faq-trigger');
    if (!trigger) return;

    const currentItem = trigger.closest('.faq-item');
    const isOpen = currentItem.classList.contains('active');

    // Close all other items for clean accordion effect
    accordion.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
      const trig = item.querySelector('.faq-trigger');
      if (trig) trig.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      currentItem.classList.add('active');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });

  // Keyboard accessibility
  accordion.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    });
  });
}

/* ==========================================================================
   9. RUSSIAN PHONE NUMBER INPUT MASK (+7 (___) ___-__-__)
   ========================================================================== */
function attachPhoneMask(inputElement) {
  if (!inputElement) return;

  inputElement.addEventListener('input', (e) => {
    let value = inputElement.value.replace(/\D/g, '');

    // Normalize leading digits
    if (value.startsWith('8') || value.startsWith('7')) {
      value = value.substring(1);
    }

    // Limit to 10 digits after +7
    value = value.substring(0, 10);

    let formatted = '+7 (';

    if (value.length > 0) {
      formatted += value.substring(0, 3);
    }
    if (value.length >= 3) {
      formatted += ') ' + value.substring(3, 6);
    }
    if (value.length >= 6) {
      formatted += '-' + value.substring(6, 8);
    }
    if (value.length >= 8) {
      formatted += '-' + value.substring(8, 10);
    }

    if (value.length === 0) {
      inputElement.value = '';
    } else {
      inputElement.value = formatted;
    }
  });

  inputElement.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && inputElement.value === '+7 (') {
      inputElement.value = '';
    }
  });

  inputElement.addEventListener('focus', () => {
    if (!inputElement.value) {
      inputElement.value = '+7 (';
    }
  });

  inputElement.addEventListener('blur', () => {
    if (inputElement.value === '+7 (' || inputElement.value === '+7') {
      inputElement.value = '';
    }
  });
}

/* ==========================================================================
   10. MODALS LOGIC & LEAD CAPTURE VALIDATION
   ========================================================================== */
function openModal(modal) {
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Set default date to today if date input is empty
  const dateInput = modal.querySelector('input[type="date"]');
  if (dateInput && !dateInput.value) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initModals() {
  // Modal openers
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);

      // If opening tour modal with data-tour-name
      if (modalId === 'modal-tour' && btn.getAttribute('data-tour-name')) {
        const programSelect = targetModal.querySelector('#tour-select-event');
        if (programSelect) {
          const desiredTour = btn.getAttribute('data-tour-name');
          for (let opt of programSelect.options) {
            if (opt.value.includes(desiredTour)) {
              opt.selected = true;
              break;
            }
          }
        }
      }

      openModal(targetModal);
    });
  });

  // Modal closers
  document.querySelectorAll('.modal-dialog-backdrop').forEach(modal => {
    // Backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });

    // Close button
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modal));
    }

    // Done button in success state
    const doneBtn = modal.querySelector('.modal-done-btn');
    if (doneBtn) {
      doneBtn.addEventListener('click', () => {
        closeModal(modal);
        // Reset states after close animation
        setTimeout(() => {
          const form = modal.querySelector('form');
          const successState = modal.querySelector('.modal-success-state');
          if (form) {
            form.reset();
            form.style.display = 'flex';
          }
          if (successState) successState.style.display = 'none';
        }, 300);
      });
    }
  });

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-dialog-backdrop.open').forEach(modal => {
        closeModal(modal);
      });
    }
  });

  // Attach phone masks
  attachPhoneMask(document.getElementById('res-phone'));
  attachPhoneMask(document.getElementById('tour-phone'));

  // Init Form Submissions
  initReservationForm();
  initTourForm();
}

function initReservationForm() {
  const form = document.getElementById('reservation-form');
  const successState = document.getElementById('res-success-state');
  const submitBtn = document.getElementById('res-submit-btn');
  if (!form || !successState) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;

    // Validate fields
    const dateInput = document.getElementById('res-date');
    const timeInput = document.getElementById('res-time');
    const nameInput = document.getElementById('res-name');
    const phoneInput = document.getElementById('res-phone');

    // Date
    if (!dateInput.value) {
      showFieldError('res-date', 'Выберите дату');
      hasError = true;
    } else {
      clearFieldError('res-date');
    }

    // Time
    if (!timeInput.value) {
      showFieldError('res-time', 'Выберите время');
      hasError = true;
    } else {
      clearFieldError('res-time');
    }

    // Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      showFieldError('res-name', 'Введите ваше имя (минимум 2 буквы)');
      hasError = true;
    } else {
      clearFieldError('res-name');
    }

    // Phone
    const digitsOnly = phoneInput.value.replace(/\D/g, '');
    if (digitsOnly.length < 11) {
      showFieldError('res-phone', 'Введите полный номер телефона (+7)');
      hasError = true;
    } else {
      clearFieldError('res-phone');
    }

    if (hasError) return;

    // Simulate submission
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Бронируем столик...</span>';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Подтвердить бронирование</span>';

      // Generate random booking ID
      const orderNum = 'HB-' + Math.floor(1000 + Math.random() * 9000);
      const guests = document.getElementById('res-guests').value;
      const zone = document.getElementById('res-zone');
      const zoneText = zone.options[zone.selectedIndex].text;

      document.getElementById('res-order-id').textContent = `Бронь № ${orderNum}`;
      document.getElementById('res-success-details').innerHTML = `
        <div><strong>Гость:</strong> ${escapeHtml(nameInput.value)} (${escapeHtml(phoneInput.value)})</div>
        <div><strong>Дата и время:</strong> ${dateInput.value} в ${timeInput.value}</div>
        <div><strong>Количество персон:</strong> ${guests}</div>
        <div><strong>Зал:</strong> ${zoneText}</div>
        ${document.getElementById('res-comment').value ? `<div><strong>Комментарий:</strong> ${escapeHtml(document.getElementById('res-comment').value)}</div>` : ''}
      `;

      form.style.display = 'none';
      successState.style.display = 'block';

      showToast(`Стол успешно забронирован! Номер брони: ${orderNum}`, 'success');
    }, 700);
  });
}

function initTourForm() {
  const form = document.getElementById('tour-form');
  const successState = document.getElementById('tour-success-state');
  const submitBtn = document.getElementById('tour-submit-btn');
  if (!form || !successState) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;

    const dateInput = document.getElementById('tour-date');
    const nameInput = document.getElementById('tour-name');
    const phoneInput = document.getElementById('tour-phone');

    if (!dateInput.value) {
      showFieldError('tour-date', 'Выберите дату');
      hasError = true;
    } else {
      clearFieldError('tour-date');
    }

    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      showFieldError('tour-name', 'Введите ваше имя');
      hasError = true;
    } else {
      clearFieldError('tour-name');
    }

    const digitsOnly = phoneInput.value.replace(/\D/g, '');
    if (digitsOnly.length < 11) {
      showFieldError('tour-phone', 'Введите номер телефона');
      hasError = true;
    } else {
      clearFieldError('tour-phone');
    }

    if (hasError) return;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Записываем...</span>';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Забронировать участие</span>';

      form.style.display = 'none';
      successState.style.display = 'block';
      showToast('Заявка на экскурсию успешно принята!', 'success');
    }, 700);
  });
}

function showFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (input) input.classList.add('has-error');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('visible');
  }
}

function clearFieldError(fieldId) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (input) input.classList.remove('has-error');
  if (errorEl) errorEl.classList.remove('visible');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ==========================================================================
   11. YANDEX MAPS 2.1 INTEGRATION
   ========================================================================== */
function initYandexMaps() {
  const mapContainer = document.getElementById('yandex-map');
  const fallback = document.getElementById('map-fallback');
  if (!mapContainer) return;

  if (typeof ymaps === 'undefined') {
    // If blocked or script failed
    if (fallback) fallback.style.display = 'flex';
    return;
  }

  ymaps.ready(() => {
    try {
      const pubCoords = LANDING_CONFIG.coordinates;
      const map = new ymaps.Map('yandex-map', {
        center: pubCoords,
        zoom: LANDING_CONFIG.zoom,
        controls: ['zoomControl', 'fullscreenControl']
      }, {
        suppressMapOpenBlock: true
      });

      // Custom Amber Pin layout
      const customPlacemark = new ymaps.Placemark(pubCoords, {
        balloonContentHeader: `<strong>${LANDING_CONFIG.brandFull}</strong>`,
        balloonContentBody: `
          <div style="font-family: sans-serif; font-size: 13px; line-height: 1.5; color: #222;">
            <p><strong>Адрес:</strong> ${LANDING_CONFIG.address}</p>
            <p><strong>Метро:</strong> ${LANDING_CONFIG.metro}</p>
            <p><strong>Телефон:</strong> ${LANDING_CONFIG.phone}</p>
            <p><strong>Режим:</strong> ${LANDING_CONFIG.scheduleWeekdays}<br>${LANDING_CONFIG.scheduleWeekends}</p>
          </div>
        `,
        balloonContentFooter: `<em>24 поворотных крана &amp; Техасский смокер</em>`,
        hintContent: `${LANDING_CONFIG.brandShort} — Крафтовая пивоварня &amp; Гастропаб`
      }, {
        preset: 'islands#darkOrangeDotIcon'
      });

      map.geoObjects.add(customPlacemark);
      map.behaviors.disable('scrollZoom'); // Prevent accidental scrolling when browsing page
    } catch (err) {
      console.warn('Yandex Maps could not initialize:', err);
      if (fallback) fallback.style.display = 'flex';
    }
  });
}

/* ==========================================================================
   12. TOAST NOTIFICATIONS
   ========================================================================== */
function showToast(message, type = 'info', duration = 3800) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;

  let icon = '🍺';
  if (type === 'success') icon = '✓';
  if (type === 'warning') icon = '⚠️';

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-msg">${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 260);
  }, duration);
}

/* ==========================================================================
   13. NAVIGATION & MOBILE DRAWER
   ========================================================================== */
function initNavigation() {
  const burgerBtn = document.getElementById('burger-btn');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const closeBtn = document.getElementById('drawer-close-btn');
  const header = document.getElementById('header');

  const toggleDrawer = (open) => {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    if (burgerBtn) burgerBtn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      toggleDrawer(!isOpen);
    });
  }

  if (overlay) overlay.addEventListener('click', () => toggleDrawer(false));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleDrawer(false));

  // Close drawer on link click
  document.querySelectorAll('.drawer-nav-link').forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });

  // Sticky header scroll styling
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   DOM READY INITIALIZER
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // 1. DOM Binding
  bindLandingConfigToDOM();

  // 2. Real-time Pub Status
  updateLiveWorkingStatus();
  setInterval(updateLiveWorkingStatus, 60000); // Check every minute

  // 3. Flight Controller & Tap List Controller
  window.flightController = new FlightController(TAP_LIST_DATA);
  window.tapListController = new TapListController(TAP_LIST_DATA);

  // 4. Food Menu Tabs
  initFoodMenuTabs();

  // 5. FAQ Accordion
  initFaqAccordion();

  // 6. Modals & Lead Capture
  initModals();

  // 7. Navigation & Header
  initNavigation();

  // 8. Yandex Maps
  initYandexMaps();
});
