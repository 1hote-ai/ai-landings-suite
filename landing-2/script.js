/**
 * ==============================================================================
 * VORTEX ATHLETIC CLUB — CORE ENGINE & CONFIGURATION
 * High-End Fitness & Athletic Club Landing Page
 * ==============================================================================
 */

'use strict';

/**
 * ------------------------------------------------------------------------------
 * GLOBAL CONFIGURATION OBJECT
 * All brand details, schedule, coordinates, and contact points are configured here.
 * Editing these values automatically reflects across DOM elements with data-bind.
 * ------------------------------------------------------------------------------
 */
const LANDING_CONFIG = {
  brand: {
    name: "VORTEX Athletic Club",
    shortName: "VORTEX",
    tagline: "Элитный атлетический клуб нового поколения",
    badge: "ATHLETIC CLUB",
    description: "2 500 м² высокотехнологичного тренировочного пространства: соревновательный помост Eleiko, официальная база Hyrox, олимпийские помосты, боксерский ринг и Recovery Lab в центре Москвы."
  },
  contacts: {
    phone: "+7 (495) 829-40-10",
    phoneClean: "+74958294010",
    email: "club@vortex-athletic.ru",
    address: "Москва, ул. Большая Полянка, д. 28, стр. 1",
    metro: "м. Полянка / м. Третьяковская (3 мин пешком)",
    parking: "Собственный подземный отапливаемый паркинг на 60 машиномест",
    yandexNavigatorLink: "https://yandex.ru/maps/?rtext=~55.741556,37.620028"
  },
  coordinates: [55.741556, 37.620028], // [Latitude, Longitude] for Yandex Maps
  schedule: {
    weekdays: {
      openHour: 6,
      openMinute: 30,
      closeHour: 23,
      closeMinute: 30,
      text: "Пн — Пт: 06:30 – 23:30"
    },
    weekends: {
      openHour: 8,
      openMinute: 0,
      closeHour: 22,
      closeMinute: 0,
      text: "Сб — Вс: 08:00 – 22:00"
    },
    timezoneOffsetHours: 3 // Moscow Time (UTC+3)
  },
  socials: {
    telegram: "https://t.me/vortex_athletic",
    whatsapp: "https://wa.me/74958294010",
    vk: "https://vk.com/vortex_athletic",
    youtube: "https://youtube.com/@vortex_athletic"
  }
};

/**
 * ------------------------------------------------------------------------------
 * TIMETABLE DATASET
 * Weekly schedule across 7 weekdays and 5 athletic disciplines.
 * ------------------------------------------------------------------------------
 */
const TIMETABLE_DATA = [
  // ПОНЕДЕЛЬНИК (MON)
  { id: 101, day: "mon", category: "hyrox", time: "07:30 – 08:30", title: "HYROX Conditioning & Sled", zone: "Hyrox Arena // Газон", coachName: "Елена Волкова", coachRole: "Hyrox Master Coach", coachImg: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=120&q=80", spotsLeft: 3, maxSpots: 12 },
  { id: 102, day: "mon", category: "strength", time: "09:00 – 10:30", title: "Olympic Weightlifting: Snatch Technique", zone: "Eleiko Sanctuary // Помост 1", coachName: "Алексей Беркутов", coachRole: "МСМК по тяжелой атлетике", coachImg: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=120&q=80", spotsLeft: 2, maxSpots: 8 },
  { id: 103, day: "mon", category: "combat", time: "12:00 – 13:00", title: "Boxing Fundamentals & Bag Work", zone: "Combat Arena // Ринг", coachName: "Тимур Саркисов", coachRole: "МС по боксу", coachImg: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&w=120&q=80", spotsLeft: 5, maxSpots: 10 },
  { id: 104, day: "mon", category: "cycling", time: "18:00 – 19:00", title: "Wattbike FTP Interval Power", zone: "Cycling Studio", coachName: "Елена Волкова", coachRole: "Endurance Specialist", coachImg: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=120&q=80", spotsLeft: 4, maxSpots: 14 },
  { id: 105, day: "mon", category: "recovery", time: "19:30 – 20:30", title: "Athletic FRC Mobility & Spine", zone: "Recovery Lab // Зал 2", coachName: "Мария Дронова", coachRole: "Врач-реабилитолог", coachImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80", spotsLeft: 6, maxSpots: 12 },
  { id: 106, day: "mon", category: "hyrox", time: "20:30 – 21:30", title: "Night Hyrox Simulation & SkiErg", zone: "Hyrox Arena", coachName: "Елена Волкова", coachRole: "Hyrox Pro Athlete", coachImg: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=120&q=80", spotsLeft: 1, maxSpots: 12 },

  // ВТОРНИК (TUE)
  { id: 201, day: "tue", category: "strength", time: "07:30 – 09:00", title: "Powerbuilding & Squat Dynamics", zone: "Eleiko Sanctuary // Помост 2", coachName: "Алексей Беркутов", coachRole: "МСМК по тяжелой атлетике", coachImg: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=120&q=80", spotsLeft: 3, maxSpots: 8 },
  { id: 202, day: "tue", category: "combat", time: "10:00 – 11:15", title: "Boxing Sparring & Counter-Attack", zone: "Combat Arena // Ринг", coachName: "Тимур Саркисов", coachRole: "МС по боксу", coachImg: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&w=120&q=80", spotsLeft: 4, maxSpots: 8 },
  { id: 203, day: "tue", category: "hyrox", time: "13:00 – 14:00", title: "Functional Core & Burpee Broad Jump", zone: "Hyrox Arena", coachName: "Елена Волкова", coachRole: "CF L2 Coach", coachImg: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=120&q=80", spotsLeft: 7, maxSpots: 12 },
  { id: 204, day: "tue", category: "cycling", time: "18:30 – 19:30", title: "Wattbike Hills & Sprints Simulation", zone: "Cycling Studio", coachName: "Елена Волкова", coachRole: "Wattbike Coach", coachImg: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=120&q=80", spotsLeft: 2, maxSpots: 14 },
  { id: 205, day: "tue", category: "recovery", time: "20:00 – 21:00", title: "Deep Fascial Release & Contrast Bath", zone: "Recovery Lab // Сауна", coachName: "Мария Дронова", coachRole: "Врач-реабилитолог", coachImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80", spotsLeft: 4, maxSpots: 10 },

  // СРЕДА (WED)
  { id: 301, day: "wed", category: "hyrox", time: "07:30 – 08:30", title: "HYROX Sled Push & Rowing Matrix", zone: "Hyrox Arena // Газон", coachName: "Елена Волкова", coachRole: "Hyrox Master Coach", coachImg: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=120&q=80", spotsLeft: 2, maxSpots: 12 },
  { id: 302, day: "wed", category: "strength", time: "10:00 – 11:30", title: "Clean & Jerk Mastery (Толчок штанги)", zone: "Eleiko Sanctuary", coachName: "Алексей Беркутов", coachRole: "МСМК по тяжелой атлетике", coachImg: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=120&q=80", spotsLeft: 4, maxSpots: 8 },
  { id: 303, day: "wed", category: "combat", time: "18:00 – 19:15", title: "Aqua Bag Power Striking & Footwork", zone: "Combat Arena", coachName: "Тимур Саркисов", coachRole: "МС по боксу", coachImg: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&w=120&q=80", spotsLeft: 3, maxSpots: 10 },
  { id: 304, day: "wed", category: "cycling", time: "19:30 – 20:30", title: "VO2 Max Endurance Ride", zone: "Cycling Studio", coachName: "Елена Волкова", coachRole: "Endurance Specialist", coachImg: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=120&q=80", spotsLeft: 5, maxSpots: 14 },
  { id: 305, day: "wed", category: "recovery", time: "20:30 – 21:30", title: "Thoracic Mobility & Breathwork", zone: "Recovery Lab", coachName: "Мария Дронова", coachRole: "Врач-реабилитолог", coachImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80", spotsLeft: 6, maxSpots: 12 },

  // ЧЕТВЕРГ (THU)
  { id: 401, day: "thu", category: "strength", time: "08:00 – 09:30", title: "Heavy Deadlift & Grip Strength", zone: "Eleiko Sanctuary", coachName: "Алексей Беркутов", coachRole: "МСМК по тяжелой атлетике", coachImg: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=120&q=80", spotsLeft: 2, maxSpots: 8 },
  { id: 402, day: "thu", category: "hyrox", time: "11:00 – 12:00", title: "Sandbag Lunges & Wall Balls Pro", zone: "Hyrox Arena", coachName: "Елена Волкова", coachRole: "Hyrox Pro Athlete", coachImg: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=120&q=80", spotsLeft: 5, maxSpots: 12 },
  { id: 403, day: "thu", category: "combat", time: "18:00 – 19:00", title: "Boxing Mitts Masterclass (Работа на лапах)", zone: "Combat Arena // Ринг", coachName: "Тимур Саркисов", coachRole: "МС по боксу", coachImg: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&w=120&q=80", spotsLeft: 3, maxSpots: 8 },
  { id: 404, day: "thu", category: "cycling", time: "19:15 – 20:15", title: "Wattbike Peak Watts Sprint Lab", zone: "Cycling Studio", coachName: "Елена Волкова", coachRole: "Wattbike Coach", coachImg: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=120&q=80", spotsLeft: 4, maxSpots: 14 },
  { id: 405, day: "thu", category: "recovery", time: "20:30 – 21:30", title: "Post-Strength Joint Decompression", zone: "Recovery Lab", coachName: "Мария Дронова", coachRole: "Врач-реабилитолог", coachImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80", spotsLeft: 7, maxSpots: 12 },

  // ПЯТНИЦА (FRI)
  { id: 501, day: "fri", category: "hyrox", time: "07:30 – 08:30", title: "Full Hyrox Benchmark Test", zone: "Hyrox Arena // Полная трасса", coachName: "Елена Волкова", coachRole: "Hyrox Master Coach", coachImg: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=120&q=80", spotsLeft: 1, maxSpots: 12 },
  { id: 502, day: "fri", category: "strength", time: "10:00 – 11:30", title: "Overhead Press & Shoulder Stability", zone: "Eleiko Sanctuary", coachName: "Алексей Беркутов", coachRole: "МСМК по тяжелой атлетике", coachImg: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=120&q=80", spotsLeft: 3, maxSpots: 8 },
  { id: 503, day: "fri", category: "combat", time: "17:30 – 18:45", title: "Friday Fight Night Sparring", zone: "Combat Arena // Ринг", coachName: "Тимур Саркисов", coachRole: "МС по боксу", coachImg: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&w=120&q=80", spotsLeft: 2, maxSpots: 10 },
  { id: 504, day: "fri", category: "cycling", time: "19:00 – 20:00", title: "End of Week Electro-Cycling Ride", zone: "Cycling Studio", coachName: "Елена Волкова", coachRole: "Wattbike Coach", coachImg: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=120&q=80", spotsLeft: 6, maxSpots: 14 },
  { id: 505, day: "fri", category: "recovery", time: "20:30 – 21:45", title: "Normatec Compression & Sound Bath", zone: "Recovery Lab // Сауна", coachName: "Мария Дронова", coachRole: "Врач-реабилитолог", coachImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80", spotsLeft: 3, maxSpots: 8 },

  // СУББОТА (SAT)
  { id: 601, day: "sat", category: "hyrox", time: "09:00 – 10:30", title: "VORTEX Saturday Team Hyrox Battle", zone: "Hyrox Arena // Газон", coachName: "Елена Волкова", coachRole: "Hyrox Master Coach", coachImg: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=120&q=80", spotsLeft: 2, maxSpots: 16 },
  { id: 602, day: "sat", category: "strength", time: "11:00 – 12:45", title: "Heavy Iron Club: Squat / Bench / Deadlift", zone: "Eleiko Sanctuary", coachName: "Алексей Беркутов", coachRole: "МСМК по тяжелой атлетике", coachImg: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=120&q=80", spotsLeft: 1, maxSpots: 8 },
  { id: 603, day: "sat", category: "combat", time: "13:00 – 14:15", title: "Open Ring & Defensive Maneuvers", zone: "Combat Arena", coachName: "Тимур Саркисов", coachRole: "МС по боксу", coachImg: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&w=120&q=80", spotsLeft: 4, maxSpots: 10 },
  { id: 604, day: "sat", category: "cycling", time: "15:00 – 16:00", title: "Wattbike Long Range Tempo", zone: "Cycling Studio", coachName: "Елена Волкова", coachRole: "Endurance Specialist", coachImg: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=120&q=80", spotsLeft: 5, maxSpots: 14 },
  { id: 605, day: "sat", category: "recovery", time: "16:30 – 18:00", title: "Full Weekend Cryo & Recovery Protocol", zone: "Recovery Lab // Криосауна", coachName: "Мария Дронова", coachRole: "Врач-реабилитолог", coachImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80", spotsLeft: 3, maxSpots: 10 },

  // ВОСКРЕСЕНЬЕ (SUN)
  { id: 701, day: "sun", category: "recovery", time: "09:30 – 10:45", title: "Morning Athletic Mobility & Breath", zone: "Recovery Lab // Зал 2", coachName: "Мария Дронова", coachRole: "Врач-реабилитолог", coachImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80", spotsLeft: 5, maxSpots: 12 },
  { id: 702, day: "sun", category: "strength", time: "11:00 – 12:30", title: "Barbell Accessory & Hypertrophy", zone: "Eleiko Sanctuary", coachName: "Алексей Беркутов", coachRole: "МСМК по тяжелой атлетике", coachImg: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=120&q=80", spotsLeft: 4, maxSpots: 8 },
  { id: 703, day: "sun", category: "hyrox", time: "13:00 – 14:15", title: "Sunday Hyrox Recovery Aerobics", zone: "Hyrox Arena", coachName: "Елена Волкова", coachRole: "CF L2 Coach", coachImg: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=120&q=80", spotsLeft: 6, maxSpots: 12 },
  { id: 704, day: "sun", category: "combat", time: "15:00 – 16:15", title: "Boxing Tactical Drills & Footwork", zone: "Combat Arena", coachName: "Тимур Саркисов", coachRole: "МС по боксу", coachImg: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&w=120&q=80", spotsLeft: 5, maxSpots: 10 },
  { id: 705, day: "sun", category: "recovery", time: "17:00 – 18:30", title: "Pre-Week Regeneration & Ice Bath", zone: "Recovery Lab // Купели", coachName: "Мария Дронова", coachRole: "Врач-реабилитолог", coachImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80", spotsLeft: 2, maxSpots: 10 }
];

/**
 * ------------------------------------------------------------------------------
 * APPLICATION MODULE & CONTROLLER
 * ------------------------------------------------------------------------------
 */
const VortexApp = {
  activeDay: "mon",
  activeCategory: "all",
  activePeriod: 1, // 1, 6, 12 months

  init() {
    this.bindDomConfig();
    this.initLiveHours();
    this.initNavigation();
    this.initTimetable();
    this.initPricingSwitcher();
    this.initAccordion();
    this.initPhoneMask();
    this.initBookingModal();
    this.initYandexMap();
    this.initHeaderScroll();
    this.updateCopyrightYear();

    // Re-check working hours every 60 seconds
    setInterval(() => this.updateLiveHours(), 60000);
  },

  /**
   * Bind values from LANDING_CONFIG to DOM elements with data-bind attributes
   */
  bindDomConfig() {
    const bindElements = document.querySelectorAll("[data-bind]");
    bindElements.forEach(el => {
      const key = el.getAttribute("data-bind");
      if (key === "phone") {
        el.textContent = LANDING_CONFIG.contacts.phone;
        if (el.tagName === "A") {
          el.href = `tel:${LANDING_CONFIG.contacts.phoneClean}`;
        }
      } else if (key === "email") {
        el.textContent = LANDING_CONFIG.contacts.email;
        if (el.tagName === "A") {
          el.href = `mailto:${LANDING_CONFIG.contacts.email}`;
        }
      } else if (key === "address") {
        el.textContent = LANDING_CONFIG.contacts.address;
      } else if (key === "metro") {
        el.textContent = LANDING_CONFIG.contacts.metro;
      } else if (key === "parking") {
        el.textContent = LANDING_CONFIG.contacts.parking;
      } else if (key === "socials.telegram" && el.tagName === "A") {
        el.href = LANDING_CONFIG.socials.telegram;
      } else if (key === "socials.whatsapp" && el.tagName === "A") {
        el.href = LANDING_CONFIG.socials.whatsapp;
      }
    });

    const extLink = document.getElementById("map-external-link");
    if (extLink) {
      extLink.href = LANDING_CONFIG.contacts.yandexNavigatorLink;
    }
  },

  /**
   * Calculate live working hours and update status indicators across header, contacts, drawer, footer
   */
  initLiveHours() {
    this.updateLiveHours();
  },

  updateLiveHours() {
    const now = new Date();
    // Normalize to Moscow Time (UTC+3)
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const mskTime = new Date(utc + (3600000 * LANDING_CONFIG.schedule.timezoneOffsetHours));
    
    const dayOfWeek = mskTime.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
    const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
    const currentHour = mskTime.getHours();
    const currentMinute = mskTime.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    const rule = isWeekend ? LANDING_CONFIG.schedule.weekends : LANDING_CONFIG.schedule.weekdays;
    const openTimeInMinutes = rule.openHour * 60 + rule.openMinute;
    const closeTimeInMinutes = rule.closeHour * 60 + rule.closeMinute;

    const formatTime = (h, m) => `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    const openStr = formatTime(rule.openHour, rule.openMinute);
    const closeStr = formatTime(rule.closeHour, rule.closeMinute);

    let statusType = "open"; // "open", "closing", "closed"
    let statusText = "";
    let shortStatus = "";

    if (currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes) {
      const minutesUntilClose = closeTimeInMinutes - currentTimeInMinutes;
      if (minutesUntilClose <= 45) {
        statusType = "closing";
        statusText = `Скоро закрывается • до ${closeStr}`;
        shortStatus = `Закроется в ${closeStr}`;
      } else {
        statusType = "open";
        statusText = `Открыто сейчас • до ${closeStr}`;
        shortStatus = `Открыто до ${closeStr}`;
      }
    } else {
      statusType = "closed";
      // Determine next opening
      let nextRule = rule;
      if (currentTimeInMinutes >= closeTimeInMinutes) {
        // Will open tomorrow
        const tomorrowDay = (dayOfWeek + 1) % 7;
        const tomorrowWeekend = (tomorrowDay === 0 || tomorrowDay === 6);
        nextRule = tomorrowWeekend ? LANDING_CONFIG.schedule.weekends : LANDING_CONFIG.schedule.weekdays;
      }
      const nextOpenStr = formatTime(nextRule.openHour, nextRule.openMinute);
      statusText = `Сейчас закрыто • Откроемся в ${nextOpenStr}`;
      shortStatus = `Закрыто до ${nextOpenStr}`;
    }

    // Update targets
    const updateDot = (elId, type) => {
      const el = document.getElementById(elId);
      if (!el) return;
      el.className = `status-dot status-dot--${type} ${type === 'open' ? 'status-dot--pulse' : ''}`;
    };

    updateDot("top-status-dot", statusType);
    updateDot("drawer-status-dot", statusType);
    updateDot("contact-status-dot", statusType);
    updateDot("footer-status-dot", statusType);

    const updateText = (elId, text) => {
      const el = document.getElementById(elId);
      if (el) el.textContent = text;
    };

    updateText("top-status-text", statusText);
    updateText("drawer-status-text", statusText);
    updateText("contact-status-text", statusText);
    updateText("footer-status-text", statusText);
  },

  /**
   * Header sticky background effect on scroll
   */
  initHeaderScroll() {
    const header = document.getElementById("header");
    if (!header) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        header.classList.add("header--scrolled");
      } else {
        header.classList.remove("header--scrolled");
      }
    }, { passive: true });
  },

  /**
   * Mobile drawer navigation toggle
   */
  initNavigation() {
    const burgerBtn = document.getElementById("burger-toggle");
    const drawer = document.getElementById("mobile-drawer");
    const drawerClose = document.getElementById("drawer-close");
    const drawerOverlay = document.getElementById("drawer-overlay");
    const drawerLinks = document.querySelectorAll(".drawer-nav-link");

    const openDrawer = () => {
      if (!drawer) return;
      drawer.classList.add("open");
      drawer.setAttribute("aria-hidden", "false");
      if (burgerBtn) burgerBtn.setAttribute("aria-expanded", "true");
      document.body.classList.add("drawer-open");
    };

    const closeDrawer = () => {
      if (!drawer) return;
      drawer.classList.remove("open");
      drawer.setAttribute("aria-hidden", "true");
      if (burgerBtn) burgerBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("drawer-open");
    };

    if (burgerBtn) burgerBtn.addEventListener("click", openDrawer);
    if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);

    drawerLinks.forEach(link => {
      link.addEventListener("click", () => {
        closeDrawer();
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer && drawer.classList.contains("open")) {
        closeDrawer();
      }
    });
  },

  /**
   * Timetable rendering, weekday switcher, and category filters
   */
  initTimetable() {
    // Determine today's day of week to set default active tab
    const dayMap = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const todayIndex = new Date().getDay();
    const todayCode = dayMap[todayIndex];

    const weekdayTabs = document.querySelectorAll(".weekday-tab");
    const categoryChips = document.querySelectorAll(".cat-chip");

    // Preselect today's tab if found
    let initialDaySet = false;
    weekdayTabs.forEach(tab => {
      if (tab.dataset.day === todayCode) {
        weekdayTabs.forEach(t => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        this.activeDay = todayCode;
        initialDaySet = true;
      }
    });

    if (!initialDaySet && weekdayTabs.length > 0) {
      this.activeDay = weekdayTabs[0].dataset.day;
    }

    weekdayTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        weekdayTabs.forEach(t => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        this.activeDay = tab.dataset.day;
        this.renderSchedule();
      });
    });

    categoryChips.forEach(chip => {
      chip.addEventListener("click", () => {
        categoryChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        this.activeCategory = chip.dataset.category;
        this.renderSchedule();
      });
    });

    this.renderSchedule();
  },

  renderSchedule() {
    const grid = document.getElementById("schedule-grid");
    if (!grid) return;

    const filtered = TIMETABLE_DATA.filter(item => {
      const matchDay = item.day === this.activeDay;
      const matchCat = this.activeCategory === "all" || item.category === this.activeCategory;
      return matchDay && matchCat;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="schedule-empty">
          <p>В выбранный день и категорию групповых классов не запланировано.</p>
          <p style="margin-top: 8px; font-size: 0.8125rem;">Вы можете забронировать индивидуальную сессию с тренером в удобное для вас время.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => {
      const isFew = item.spotsLeft <= 3;
      const spotsClass = isFew ? "schedule-row__spots--amber" : "schedule-row__spots--lime";
      const spotsText = isFew ? `Осталось ${item.spotsLeft} мест!` : `${item.spotsLeft} из ${item.maxSpots} мест`;

      return `
        <div class="schedule-row" data-id="${item.id}">
          <div class="schedule-row__time">
            <span class="schedule-row__time-main">${item.time}</span>
            <span class="schedule-row__duration">60–75 мин • Высокая отдача</span>
          </div>
          <div class="schedule-row__title-group">
            <span class="schedule-row__name">${item.title}</span>
            <span class="schedule-row__zone">${item.zone}</span>
          </div>
          <div class="schedule-row__coach">
            <img src="${item.coachImg}" alt="${item.coachName}" class="schedule-row__coach-avatar" loading="lazy">
            <div>
              <div class="schedule-row__coach-name">${item.coachName}</div>
              <div class="schedule-row__coach-role">${item.coachRole}</div>
            </div>
          </div>
          <div class="schedule-row__spots ${spotsClass}">
            <span class="legend-dot ${isFew ? 'legend-dot--amber' : 'legend-dot--lime'}"></span>
            <span>${spotsText}</span>
          </div>
          <div class="schedule-row__action">
            <button 
              type="button" 
              class="btn btn--outline-volt btn--sm open-modal-btn" 
              data-modal-target="trial" 
              data-preset-direction="${item.title}" 
              data-preset-coach="${item.coachName}"
            >
              Записаться
            </button>
          </div>
        </div>
      `;
    }).join("");

    // Re-attach modal trigger listeners to newly created buttons
    this.attachModalTriggers(grid);
  },

  /**
   * Membership pricing period switcher (1, 6, 12 months)
   */
  initPricingSwitcher() {
    const switcher = document.getElementById("pricing-switcher");
    if (!switcher) return;

    const periodBtns = switcher.querySelectorAll(".period-btn");
    const cards = document.querySelectorAll(".pricing-card");

    const updatePricing = (period) => {
      this.activePeriod = parseInt(period, 10);

      periodBtns.forEach(btn => {
        if (parseInt(btn.dataset.period, 10) === this.activePeriod) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      cards.forEach(card => {
        const amountEl = card.querySelector(".pricing-card__amount");
        const cycleEl = card.querySelector(".pricing-card__cycle");
        const equivEl = card.querySelector(".pricing-card__monthly-equiv");

        if (!amountEl) return;

        const p1 = parseInt(amountEl.getAttribute("data-price-1") || amountEl.dataset["price-1"] || "0", 10);
        const p6 = parseInt(amountEl.getAttribute("data-price-6") || amountEl.dataset["price-6"] || "0", 10);
        const p12 = parseInt(amountEl.getAttribute("data-price-12") || amountEl.dataset["price-12"] || "0", 10);

        const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

        if (this.activePeriod === 1) {
          amountEl.textContent = formatNumber(p1);
          if (cycleEl) cycleEl.textContent = "/ месяц";
          if (equivEl) equivEl.textContent = "Оплата помесячно";
        } else if (this.activePeriod === 6) {
          const monthlyAvg = Math.round(p6 / 6);
          amountEl.textContent = formatNumber(monthlyAvg);
          if (cycleEl) cycleEl.textContent = "/ мес при оплате 6 мес";
          if (equivEl) equivEl.textContent = `Итого за 6 месяцев: ${formatNumber(p6)} ₽ (выгода 15%)`;
        } else if (this.activePeriod === 12) {
          const monthlyAvg = Math.round(p12 / 12);
          amountEl.textContent = formatNumber(monthlyAvg);
          if (cycleEl) cycleEl.textContent = "/ мес при оплате года";
          if (equivEl) equivEl.textContent = `Итого за 12 месяцев: ${formatNumber(p12)} ₽ (выгода 25%)`;
        }
      });
    };

    periodBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        updatePricing(btn.dataset.period);
      });
    });

    updatePricing(1);
  },

  /**
   * FAQ Accordion
   */
  initAccordion() {
    const accordion = document.getElementById("faq-accordion");
    if (!accordion) return;

    const items = accordion.querySelectorAll(".accordion__item");

    items.forEach(item => {
      const header = item.querySelector(".accordion__header");
      const collapse = item.querySelector(".accordion__collapse");

      header.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        // Close other items
        items.forEach(other => {
          if (other !== item && other.classList.contains("active")) {
            other.classList.remove("active");
            other.querySelector(".accordion__header").setAttribute("aria-expanded", "false");
            other.querySelector(".accordion__collapse").hidden = true;
          }
        });

        if (isOpen) {
          item.classList.remove("active");
          header.setAttribute("aria-expanded", "false");
          collapse.hidden = true;
        } else {
          item.classList.add("active");
          header.setAttribute("aria-expanded", "true");
          collapse.hidden = false;
        }
      });
    });
  },

  /**
   * Strict phone input mask (+7 (___) ___-__-__)
   */
  initPhoneMask() {
    const phoneInput = document.getElementById("form-phone");
    if (!phoneInput) return;

    const onPhoneInput = (e) => {
      const input = e.target;
      let inputNumbersValue = input.value.replace(/\D/g, "");
      let formattedInputValue = "";
      const selectionStart = input.selectionStart;

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
        if (inputNumbersValue[0] === "9") {
          inputNumbersValue = "7" + inputNumbersValue;
        }
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
        formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
      }

      input.value = formattedInputValue;
    };

    const onPhoneKeyDown = (e) => {
      const input = e.target;
      if (e.keyCode === 8 && input.value.replace(/\D/g, "").length === 1) {
        input.value = "";
      }
    };

    phoneInput.addEventListener("input", onPhoneInput);
    phoneInput.addEventListener("keydown", onPhoneKeyDown);
    phoneInput.addEventListener("paste", (e) => {
      const input = e.target;
      const pasted = e.clipboardData || window.clipboardData;
      if (pasted) {
        const pastedText = pasted.getData("Text");
        if (/\D/g.test(pastedText)) {
          input.value = input.value.replace(/\D/g, "");
        }
      }
    });
  },

  /**
   * Lead capture and workout booking modal
   */
  initBookingModal() {
    const modal = document.getElementById("booking-modal");
    const modalClose = document.getElementById("modal-close");
    const modalOverlay = document.getElementById("modal-overlay");
    const leadForm = document.getElementById("lead-form");
    const formView = document.getElementById("modal-form-view");
    const successView = document.getElementById("modal-success-view");
    const successCloseBtn = document.getElementById("success-close-btn");

    const openModal = (directionPreset = null, coachPreset = null, membershipPreset = null) => {
      if (!modal) return;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");

      // Reset form view
      if (formView) formView.hidden = false;
      if (successView) successView.hidden = true;

      // Handle presets
      const dirSelect = document.getElementById("form-direction");
      const coachSelect = document.getElementById("form-coach");

      if (directionPreset && dirSelect) {
        let found = false;
        for (let i = 0; i < dirSelect.options.length; i++) {
          if (dirSelect.options[i].value.toLowerCase().includes(directionPreset.toLowerCase())) {
            dirSelect.selectedIndex = i;
            found = true;
            break;
          }
        }
        if (!found) {
          // Add custom option dynamically if needed
          const opt = new Option(directionPreset, directionPreset, true, true);
          dirSelect.add(opt);
        }
      } else if (membershipPreset && dirSelect) {
        for (let i = 0; i < dirSelect.options.length; i++) {
          if (dirSelect.options[i].value.toLowerCase().includes(membershipPreset.toLowerCase())) {
            dirSelect.selectedIndex = i;
            break;
          }
        }
      }

      if (coachPreset && coachSelect) {
        for (let i = 0; i < coachSelect.options.length; i++) {
          if (coachSelect.options[i].value.toLowerCase().includes(coachPreset.toLowerCase())) {
            coachSelect.selectedIndex = i;
            break;
          }
        }
      }

      // Focus first input
      setTimeout(() => {
        const nameInput = document.getElementById("form-name");
        if (nameInput) nameInput.focus();
      }, 150);
    };

    const closeModal = () => {
      if (!modal) return;
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
    };

    this.openModal = openModal;
    this.closeModal = closeModal;

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalOverlay) modalOverlay.addEventListener("click", closeModal);
    if (successCloseBtn) successCloseBtn.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && modal.classList.contains("open")) {
        closeModal();
      }
    });

    this.attachModalTriggers(document);

    // Form submission validation & handling
    if (leadForm) {
      leadForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleFormSubmit(leadForm);
      });
    }
  },

  attachModalTriggers(root) {
    const triggerButtons = root.querySelectorAll(".open-modal-btn");
    triggerButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const direction = btn.dataset.presetDirection || null;
        const coach = btn.dataset.presetCoach || null;
        const membership = btn.dataset.presetMembership || null;
        this.openModal(direction, coach, membership);
      });
    });
  },

  handleFormSubmit(form) {
    const nameInput = document.getElementById("form-name");
    const phoneInput = document.getElementById("form-phone");
    const consentInput = document.getElementById("form-consent");
    const submitBtn = document.getElementById("submit-btn");
    const spinner = document.getElementById("submit-spinner");
    const btnText = submitBtn ? submitBtn.querySelector(".btn__text") : null;

    let isValid = true;

    // Validate Name
    if (!nameInput || nameInput.value.trim().length < 2) {
      if (nameInput) nameInput.classList.add("has-error");
      isValid = false;
    } else {
      if (nameInput) nameInput.classList.remove("has-error");
    }

    // Validate Phone (at least 10 digits clean)
    const digitsOnly = phoneInput ? phoneInput.value.replace(/\D/g, "") : "";
    if (!phoneInput || digitsOnly.length < 11) {
      if (phoneInput) phoneInput.classList.add("has-error");
      isValid = false;
    } else {
      if (phoneInput) phoneInput.classList.remove("has-error");
    }

    // Validate Consent
    const consentGroup = form.querySelector(".form-checkbox-group");
    if (!consentInput || !consentInput.checked) {
      if (consentGroup) consentGroup.classList.add("has-error");
      isValid = false;
    } else {
      if (consentGroup) consentGroup.classList.remove("has-error");
    }

    if (!isValid) {
      this.showToast("Пожалуйста, заполните обязательные поля корректно");
      return;
    }

    // Simulated async submission
    if (submitBtn) submitBtn.disabled = true;
    if (spinner) spinner.hidden = false;
    if (btnText) btnText.textContent = "Отправка...";

    setTimeout(() => {
      const formView = document.getElementById("modal-form-view");
      const successView = document.getElementById("modal-success-view");
      const successName = document.getElementById("success-user-name");
      const successPhone = document.getElementById("success-user-phone");
      const successDir = document.getElementById("success-direction");

      const dirSelect = document.getElementById("form-direction");
      const selectedDir = dirSelect ? dirSelect.value : "Пробная тренировка";

      if (successName) successName.textContent = nameInput.value.trim();
      if (successPhone) successPhone.textContent = phoneInput.value;
      if (successDir) successDir.textContent = selectedDir;

      if (formView) formView.hidden = true;
      if (successView) successView.hidden = false;

      if (submitBtn) submitBtn.disabled = false;
      if (spinner) spinner.hidden = true;
      if (btnText) btnText.textContent = "Подтвердить запись";

      form.reset();
      this.showToast("Заявка успешно принята! Ждем вас в VORTEX");
    }, 1100);
  },

  /**
   * Toast notification helper
   */
  showToast(message) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <span class="toast__icon">⚡</span>
      <span class="toast__msg">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  },

  /**
   * Initialize Yandex Maps via ymaps 2.1 API with dark custom styling & pin
   */
  initYandexMap() {
    const mapElement = document.getElementById("yandex-map");
    const loader = document.getElementById("map-loader");
    if (!mapElement) return;

    // Check if ymaps already loaded or inject script
    const loadScript = () => {
      if (window.ymaps) {
        window.ymaps.ready(() => this.renderYandexMap(mapElement, loader));
        return;
      }

      const script = document.createElement("script");
      script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
      script.async = true;

      script.onload = () => {
        if (window.ymaps) {
          window.ymaps.ready(() => this.renderYandexMap(mapElement, loader));
        }
      };

      script.onerror = () => {
        if (loader) {
          loader.innerHTML = `
            <div style="text-align: center; padding: 20px;">
              <p style="color: #D4FF00; font-weight: 700; margin-bottom: 8px;">VORTEX ATHLETIC CLUB</p>
              <p style="margin-bottom: 12px;">Москва, ул. Большая Полянка, 28, стр. 1</p>
              <a href="${LANDING_CONFIG.contacts.yandexNavigatorLink}" target="_blank" rel="noopener" style="color: #D4FF00; text-decoration: underline;">
                Открыть в Яндекс Навигаторе &rarr;
              </a>
            </div>
          `;
        }
      };

      document.head.appendChild(script);
    };

    // Use IntersectionObserver to load map when section is approaching view
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadScript();
            observer.disconnect();
          }
        });
      }, { rootMargin: "300px" });

      observer.observe(mapElement);
    } else {
      loadScript();
    }
  },

  renderYandexMap(mapElement, loader) {
    try {
      const coords = LANDING_CONFIG.coordinates;

      const myMap = new window.ymaps.Map(mapElement, {
        center: coords,
        zoom: 16,
        controls: ["zoomControl", "fullscreenControl"]
      }, {
        suppressMapOpenBlock: true
      });

      // Custom Placemark with Volt Styling
      const myPlacemark = new window.ymaps.Placemark(coords, {
        hintContent: "VORTEX Athletic Club",
        balloonContentHeader: "<strong style='color:#0E0F12; font-family: sans-serif;'>VORTEX ATHLETIC CLUB</strong>",
        balloonContentBody: `
          <div style='color:#333; font-size:13px; font-family: sans-serif; line-height: 1.5;'>
            <p><strong>Адрес:</strong> ${LANDING_CONFIG.contacts.address}</p>
            <p><strong>Метро:</strong> ${LANDING_CONFIG.contacts.metro}</p>
            <p><strong>Паркинг:</strong> ${LANDING_CONFIG.contacts.parking}</p>
            <p><strong>Режим:</strong> ${LANDING_CONFIG.schedule.weekdays.text}</p>
            <p><a href='tel:${LANDING_CONFIG.contacts.phoneClean}' style='color:#008800; font-weight:bold;'>${LANDING_CONFIG.contacts.phone}</a></p>
          </div>
        `,
        balloonContentFooter: `
          <div style='padding-top:6px;'>
            <a href='${LANDING_CONFIG.contacts.yandexNavigatorLink}' target='_blank' style='color:#0E0F12; font-weight:bold; font-size:12px;'>Построить маршрут &rarr;</a>
          </div>
        `
      }, {
        preset: "islands#blackDotIconWithCaption",
        iconColor: "#D4FF00"
      });

      myMap.geoObjects.add(myPlacemark);

      // Disable default scroll zoom behavior on mouse wheel until clicked
      myMap.behaviors.disable("scrollZoom");

      // Hide loading spinner smoothly
      if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => loader.remove(), 300);
      }
    } catch (err) {
      console.warn("Yandex Maps could not be initialized:", err);
      if (loader) {
        loader.innerHTML = `
          <div style="text-align:center; padding: 20px;">
            <p style="color: #D4FF00; font-weight: 700;">VORTEX ATHLETIC CLUB</p>
            <p style="margin-top: 6px;">Москва, ул. Большая Полянка, д. 28, стр. 1</p>
            <a href="${LANDING_CONFIG.contacts.yandexNavigatorLink}" target="_blank" rel="noopener" style="display:inline-block; margin-top:10px; color:#D4FF00;">
              Открыть интерактивную карту &rarr;
            </a>
          </div>
        `;
      }
    }
  },

  updateCopyrightYear() {
    const yearEl = document.getElementById("current-year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }
};

/**
 * Run application on DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", () => {
  VortexApp.init();
});
