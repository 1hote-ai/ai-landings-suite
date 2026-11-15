/**
 * NEXUS WEB // AI-POWERED WEB PRODUCTION
 * Client Portfolio & Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initPortfolioFilters();
  initCalculator();
  initFaqAccordion();
});

/* ==========================================================================
   1. STICKY HEADER
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   2. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const burgerBtn = document.getElementById('burgerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.mobile-drawer__link, .mobile-drawer .btn');

  if (!burgerBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  burgerBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

/* ==========================================================================
   3. PORTFOLIO CATEGORY FILTERING
   ========================================================================== */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('#portfolioFilters .filter-btn');
  const cards = document.querySelectorAll('#portfolioGrid .p-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
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

/* ==========================================================================
   4. INTERACTIVE CALCULATOR (9 000 ₽ base + 500 ₽ addons)
   ========================================================================== */
function initCalculator() {
  const typeBtns = document.querySelectorAll('#calcTypeGroup .calc-opt-btn');
  const addonChecks = document.querySelectorAll('.calc-checks input[type="checkbox"]');
  const urgencyBtns = document.querySelectorAll('#calcUrgencyGroup .pill-btn');
  
  const priceDisplay = document.getElementById('calcPriceDisplay');
  const termDisplay = document.getElementById('calcTermDisplay');

  if (!priceDisplay || !termDisplay) return;

  let basePrice = 9000;
  let baseHours = 48;
  let urgencyMultiplier = 1.0;

  function calculate() {
    // 1. Base price & hours from active type
    const activeType = document.querySelector('#calcTypeGroup .calc-opt-btn.active');
    if (activeType) {
      basePrice = parseInt(activeType.dataset.price, 10);
      baseHours = parseInt(activeType.dataset.hours, 10);
    }

    // 2. Addons
    let addonsTotal = 0;
    addonChecks.forEach(chk => {
      if (chk.checked) {
        addonsTotal += parseInt(chk.dataset.addonPrice, 10);
      }
    });

    // 3. Urgency
    const activeUrgency = document.querySelector('#calcUrgencyGroup .pill-btn.active');
    if (activeUrgency) {
      urgencyMultiplier = parseFloat(activeUrgency.dataset.urgencyMult);
    }

    // Calculation
    let totalPrice = Math.round((basePrice + addonsTotal) * urgencyMultiplier);
    
    // Format Price
    priceDisplay.textContent = `${totalPrice.toLocaleString('ru-RU')} ₽`;

    // Term display
    let termText = '';
    if (urgencyMultiplier > 1.0) {
      termText = 'Срочный запуск: <strong>24 часа (Экспресс)</strong>';
    } else {
      termText = `Срок готовности: <strong>${baseHours} часов</strong>`;
    }
    termDisplay.innerHTML = termText;
  }

  // Type buttons click
  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calculate();
    });
  });

  // Checkboxes change
  addonChecks.forEach(chk => {
    chk.addEventListener('change', calculate);
  });

  // Urgency pills click
  urgencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      urgencyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calculate();
    });
  });

  // Initial run
  calculate();
}

/* ==========================================================================
   5. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('#faqAccordion .faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all
      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherTrigger = other.querySelector('.faq-trigger');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
