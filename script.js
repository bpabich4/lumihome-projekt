/**
 * LumiHome — script.js
 * Handles: theme toggle, mobile menu, product filtering,
 *          lighting calculator, contact form, nav active state
 *
 * No external libraries. Vanilla JS only.
 */

/* ===========================================================================
   1. UTILITIES
   =========================================================================== */

/**
 * Safe localStorage read — fails gracefully when running from file:// 
 * in some browsers that restrict localStorage access.
 */
function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

/**
 * Safe localStorage write — fails gracefully.
 */
function storageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // Silently ignore storage errors (e.g. private mode, file://)
  }
}

/* ===========================================================================
   2. THEME TOGGLE
   =========================================================================== */

(function initTheme() {
  const toggle      = document.getElementById('theme-toggle');
  const root        = document.documentElement;

  // Determine initial theme:
  // 1) Saved preference in localStorage
  // 2) System preference
  // 3) Default: system
  const saved = storageGet('lumi-theme'); // 'dark' | 'light' | null

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    // Update ARIA label for screen readers
    if (toggle) {
      toggle.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Przełącz na motyw jasny' : 'Przełącz na motyw ciemny'
      );
    }
  }

  // Apply saved theme on load (skip if null; CSS handles system preference)
  if (saved === 'dark' || saved === 'light') {
    applyTheme(saved);
  }

  // Button click: toggle between dark and light
  if (toggle) {
    toggle.addEventListener('click', () => {
      const isDark = root.classList.contains('dark');
      const next   = isDark ? 'light' : 'dark';
      applyTheme(next);
      storageSet('lumi-theme', next);
    });
  }
})();

/* ===========================================================================
   3. MOBILE MENU
   =========================================================================== */

(function initMobileMenu() {
  const menuBtn  = document.getElementById('mobile-menu-btn');
  const menu     = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !menu) return;

  function openMenu() {
    menu.hidden = false;
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Zamknij menu');
  }

  function closeMenu() {
    menu.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Otwórz menu');
  }

  // Toggle on button click
  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  // Close when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuBtn.focus();
    }
  });
})();

/* ===========================================================================
   4. PRODUCT FILTERING
   =========================================================================== */

(function initProductFiltering() {
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  const emptyMsg    = document.getElementById('products-empty');

  if (!filterBtns.length || !productCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter; // e.g. 'wszystkie', 'oprawy'

      // Update button states
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      // Show / hide cards
      let visibleCount = 0;
      productCards.forEach(card => {
        const category = card.dataset.category; // e.g. 'oprawy'
        const show = filter === 'wszystkie' || category === filter;
        card.classList.toggle('hidden', !show);
        if (show) visibleCount++;
      });

      // Show empty state if no products match
      if (emptyMsg) {
        emptyMsg.hidden = visibleCount > 0;
      }
    });
  });
})();

/* ===========================================================================
   5. LIGHTING CALCULATOR
   =========================================================================== */

(function initCalculator() {
  const form         = document.getElementById('calc-form');
  const resultsPanel = document.getElementById('calc-results');
  const resultArea   = document.getElementById('result-area');
  const resultLumens = document.getElementById('result-lumens');
  const resultFix    = document.getElementById('result-fixtures');

  // Lux coefficients per room type (recommended lux level in lm/m²)
  const COEFFICIENTS = {
    salon:    300,
    kuchnia:  500,
    biuro:    500,
    sypialnia: 200
  };

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Read values
    const lengthVal  = parseFloat(document.getElementById('room-length').value);
    const widthVal   = parseFloat(document.getElementById('room-width').value);
    const roomType   = document.getElementById('room-type').value;

    // Basic validation
    if (!lengthVal || !widthVal || !roomType) {
      // HTML required + type validation handles most cases.
      // Fallback: just return if something is missing.
      return;
    }

    if (lengthVal <= 0 || widthVal <= 0) return;

    // Calculate
    const area     = parseFloat((lengthVal * widthVal).toFixed(2));
    const coeff    = COEFFICIENTS[roomType] || 300;
    const lumens   = Math.round(area * coeff);
    const fixtures = Math.ceil(lumens / 1000); // 1 fixture ≈ 1000 lm

    // Display results
    resultArea.textContent   = area;
    resultLumens.textContent = lumens.toLocaleString('pl-PL');
    resultFix.textContent    = fixtures;

    // Show panel (if hidden)
    resultsPanel.hidden = false;

    // Scroll results into view smoothly (respects prefers-reduced-motion via CSS)
    resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
})();

/* ===========================================================================
   6. CONTACT FORM
   =========================================================================== */

(function initContactForm() {
  const form        = document.getElementById('contact-form');
  const successMsg  = document.getElementById('form-success');

  if (!form) return;

  // Validate a single field; return error message or ''
  function validateField(field) {
    const value = field.value.trim();
    if (!value) return 'To pole jest wymagane.';

    if (field.type === 'email') {
      // Basic email pattern check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Podaj prawidłowy adres e-mail.';
      }
    }

    if (field.tagName === 'TEXTAREA' && value.length < 10) {
      return 'Wiadomość musi mieć co najmniej 10 znaków.';
    }

    return '';
  }

  // Show error for a field
  function showError(field, message) {
    const errorEl = document.getElementById(field.id.replace('contact-', '') + '-error');
    field.classList.toggle('invalid', !!message);
    if (errorEl) errorEl.textContent = message;
  }

  // Validate on blur for immediate feedback
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => {
      showError(field, validateField(field));
    });
    // Clear error on input
    field.addEventListener('input', () => {
      if (field.classList.contains('invalid')) {
        showError(field, validateField(field));
      }
    });
  });

  // Full validation on submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields  = form.querySelectorAll('input, textarea');
    let allValid  = true;

    fields.forEach(field => {
      const error = validateField(field);
      showError(field, error);
      if (error) allValid = false;
    });

    if (!allValid) {
      // Focus first invalid field
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Success: hide form, show success message
    form.hidden = true;
    if (successMsg) {
      successMsg.hidden = false;
      successMsg.focus();
    }
  });
})();

/* ===========================================================================
   7. ACTIVE NAVIGATION STATE (via IntersectionObserver)
   =========================================================================== */

(function initActiveNav() {
  const sections  = document.querySelectorAll('main section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  // Map section IDs → nav links
  const linkMap = {};
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      linkMap[href.slice(1)] = link;
    }
  });

  // Observe each section
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const link = linkMap[entry.target.id];
        if (!link) return;

        if (entry.isIntersecting) {
          // Clear all active states
          navLinks.forEach(l => l.removeAttribute('aria-current'));
          // Set this one active
          link.setAttribute('aria-current', 'page');
        }
      });
    },
    {
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is in the upper 30% of viewport
      threshold:  0
    }
  );

  sections.forEach(section => observer.observe(section));
})();

/* ===========================================================================
   8. SMOOTH SCROLL FOR ALL ANCHOR LINKS (fallback)
   =========================================================================== */

(function initSmoothScroll() {
  // CSS handles smooth scrolling, but this helps when scroll-behavior isn't supported
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id     = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);

      if (target) {
        e.preventDefault();
        target.focus({ preventScroll: true });
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
