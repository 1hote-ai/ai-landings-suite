/**
 * NEXUS WEB // AI-POWERED WEB PRODUCTION
 * Client Portfolio & Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initPortfolioFilters();
  initPortfolioNicheSelect();
  initCalculator();
  initFaqAccordion();
  initPhoneMask();
  initOrderForm();
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
  const drawerLinks = document.querySelectorAll('.mobile-drawer__link, .mobile-drawer .modal-trigger');

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
   4. SELECT NICHE FROM PORTFOLIO CARD
   ========================================================================== */
function initPortfolioNicheSelect() {
  const selectBtns = document.querySelectorAll('.select-niche-btn');
  const nicheSelect = document.getElementById('orderNiche');
  const orderSection = document.getElementById('order');

  if (!selectBtns.length || !nicheSelect) return;

  selectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const nicheName = btn.dataset.niche;
      
      // Match option
      let matched = false;
      Array.from(nicheSelect.options).forEach(opt => {
        if (opt.text.toLowerCase().includes(nicheName.split(' ')[0].toLowerCase())) {
          nicheSelect.value = opt.value;
          matched = true;
        }
      });

      if (!matched) {
        nicheSelect.value = "Не выбрано";
      }

      const commentField = document.getElementById('orderComment');
      if (commentField) {
        commentField.value = `Здравствуйте! Меня заинтересовал прототип: ${nicheName}. Хочу обсудить похожий лендинг для моего бизнеса.`;
      }

      if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('orderName');
        if (nameInput) setTimeout(() => nameInput.focus(), 600);
      }
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE CALCULATOR
   ========================================================================== */
function initCalculator() {
  const typeBtns = document.querySelectorAll('#calcTypeGroup .calc-opt-btn');
  const addonChecks = document.querySelectorAll('.calc-checks input[type="checkbox"]');
  const urgencyBtns = document.querySelectorAll('#calcUrgencyGroup .pill-btn');
  
  const priceDisplay = document.getElementById('calcPriceDisplay');
  const termDisplay = document.getElementById('calcTermDisplay');
  const applyBtn = document.getElementById('calcApplyBtn');

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

  // Apply button
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const commentField = document.getElementById('orderComment');
      const activeType = document.querySelector('#calcTypeGroup .calc-opt-btn.active strong');
      const activeTypeText = activeType ? activeType.innerText : 'Лендинг';
      const finalPrice = priceDisplay.textContent;

      if (commentField) {
        commentField.value = `Расчет из калькулятора: ${activeTypeText}, предварительный итог ${finalPrice}. Жду коммерческое предложение.`;
      }

      const orderSection = document.getElementById('order');
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('orderName');
        if (nameInput) setTimeout(() => nameInput.focus(), 600);
      }
    });
  }

  // Initial run
  calculate();
}

/* ==========================================================================
   6. FAQ ACCORDION
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

/* ==========================================================================
   7. RUSSIAN PHONE MASK (+7 (___) ___-__-__)
   ========================================================================== */
function initPhoneMask() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  phoneInputs.forEach(input => {
    input.addEventListener('input', onPhoneInput);
    input.addEventListener('keydown', onPhoneKeyDown);
    input.addEventListener('paste', onPhonePaste);
  });

  function getInputNumbersValue(input) {
    return input.value.replace(/\D/g, '');
  }

  function onPhoneInput(e) {
    const input = e.target;
    let inputNumbersValue = getInputNumbersValue(input);
    const selectionStart = input.selectionStart;
    let formattedInputValue = "";

    if (!inputNumbersValue) {
      return (input.value = "");
    }

    if (input.value.length !== selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] === "9") inputNumbersValue = "7" + inputNumbersValue;
      const firstSymbols = inputNumbersValue[0] === "8" ? "8" : "+7";
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
  }

  function onPhoneKeyDown(e) {
    const inputValue = e.target.value.replace(/\D/g, "");
    if (e.keyCode === 8 && inputValue.length === 1) {
      e.target.value = "";
    }
  }

  function onPhonePaste(e) {
    const input = e.target;
    const inputNumbersValue = getInputNumbersValue(input);
    const pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      const pastedText = pasted.getData("Text");
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
      }
    }
  }
}

/* ==========================================================================
   8. ORDER FORM & MODAL
   ========================================================================== */
function initOrderForm() {
  const form = document.getElementById('mainOrderForm');
  const modal = document.getElementById('successModal');
  const modalClose = document.getElementById('successClose');
  const modalOverlay = document.getElementById('successOverlay');
  const okBtn = document.getElementById('successOkBtn');
  const ticketNum = document.getElementById('ticketNum');
  const submitBtn = document.getElementById('submitBtn');

  if (!form || !modal) return;

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
  if (okBtn) okBtn.addEventListener('click', closeModal);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('orderName').value.trim();
    const phone = document.getElementById('orderPhone').value.trim();
    const telegram = document.getElementById('orderTelegram').value.trim();
    const niche = document.getElementById('orderNiche').value;
    const comment = document.getElementById('orderComment').value.trim();

    if (!name || phone.length < 16) {
      alert('Пожалуйста, введите корректный номер телефона РФ (+7 (___) ___-__-__)');
      return;
    }

    // Loading State
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = 'Отправка заявки...';
    }

    setTimeout(() => {
      // Generate random order ticket
      const randomTicket = '#AI-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
      if (ticketNum) ticketNum.textContent = randomTicket;

      // Show success modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Reset form & button
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Отправить заявку и получить аудит →';
      }

      console.log('Заявка успешно отправлена:', { name, phone, telegram, niche, comment, ticket: randomTicket });
    }, 700);
  });
}
