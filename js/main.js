/* =================================================================
   Fenix Web Design — Site JavaScript
   Shared across all pages: nav, FAQ accordion, phone formatting,
   multi-step modal, footer year, scroll fade-in.
   ================================================================= */

/* ── Lead-capture webhook (Pabbly Connect) ──
   No webhook URL was provided in the brief. Replace the value below
   with your Pabbly Connect webhook URL before going live. */
var MODAL_WEBHOOK_URL = ''; /* <!-- REPLACE with your Pabbly Connect webhook URL --> */
var BUSINESS_NAME = 'Fenix Web Design';
var BUSINESS_PHONE_DISPLAY = '(602) 829-0009';

/* ── Footer year ── */
(function setFooterYear() {
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* ── Navigation: hamburger + dropdown toggles ── */
(function navInteractions() {
  var hamburger = document.querySelector('.nav-hamburger');
  var menu = document.querySelector('.nav-menu');

  if (hamburger && menu) {
    hamburger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
    });
  }

  // Dropdown toggles (work for both desktop tap + mobile)
  document.querySelectorAll('.nav-menu .nav-toggle-link').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var li = btn.closest('li');
      var willOpen = !li.classList.contains('open');
      // close siblings
      document.querySelectorAll('.nav-menu > li.open').forEach(function (openLi) {
        if (openLi !== li) openLi.classList.remove('open');
      });
      li.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', String(willOpen));
    });
  });

  // Close dropdowns when clicking outside the nav
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-menu') && !e.target.closest('.nav-hamburger')) {
      document.querySelectorAll('.nav-menu > li.open').forEach(function (li) {
        li.classList.remove('open');
      });
    }
  });
})();

/* ── FAQs Accordion ── */
document.querySelectorAll('.faq-question').forEach(function (button) {
  button.addEventListener('click', function () {
    var isOpen = button.getAttribute('aria-expanded') === 'true';
    var answer = button.nextElementSibling;

    // Close all other open items first
    document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(function (openBtn) {
      if (openBtn !== button) {
        openBtn.setAttribute('aria-expanded', 'false');
        openBtn.nextElementSibling.hidden = true;
      }
    });

    button.setAttribute('aria-expanded', String(!isOpen));
    answer.hidden = isOpen;
  });
});

/* ── Phone input formatting — (XXX) XXX-XXXX ── */
(function bindPhoneInputs() {
  function formatUSPhone(digits) {
    digits = digits.slice(0, 10);
    if (digits.length === 0) return '';
    if (digits.length < 4) return '(' + digits;
    if (digits.length < 7) return '(' + digits.slice(0, 3) + ') ' + digits.slice(3);
    return '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
  }
  function onInput(e) {
    var digits = (e.target.value || '').replace(/\D/g, '');
    e.target.value = formatUSPhone(digits);
  }
  document.querySelectorAll('.js-phone-input').forEach(function (el) {
    el.addEventListener('input', onInput);
  });
})();

/* ── Scroll fade-in via IntersectionObserver ── */
(function fadeInOnScroll() {
  var els = document.querySelectorAll('.fade-in');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(function (el) { obs.observe(el); });
})();

/* ── Hero Modal (multi-step lead capture) ── */
(function heroModal() {
  var overlay = document.getElementById('hero-modal');
  if (!overlay) return;

  var box = overlay.querySelector('.modal-box');
  var steps = overlay.querySelectorAll('.modal-step');
  var fill = overlay.querySelector('.modal-progress-fill');
  var progressLabel = overlay.querySelector('.modal-progress');
  var form = overlay.querySelector('#hero-modal-form');
  var current = 0;
  var totalSteps = steps.length; // qualifying + contact steps

  function openModal() {
    overlay.classList.add('modal-visible');
    document.body.classList.add('modal-open');
    current = 0;
    showStep(0);
  }
  function closeModal() {
    overlay.classList.remove('modal-visible');
    document.body.classList.remove('modal-open');
  }
  function showStep(i) {
    steps.forEach(function (s, idx) { s.classList.toggle('active', idx === i); });
    if (fill) fill.style.width = ((i + 1) / totalSteps * 100) + '%';
    if (progressLabel) progressLabel.textContent = 'Step ' + (i + 1) + ' of ' + totalSteps;
  }

  // Open triggers
  document.querySelectorAll('[data-modal="hero-modal"]').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  // Close triggers
  overlay.querySelectorAll('.modal-close').forEach(function (btn) {
    btn.addEventListener('click', closeModal);
  });
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('modal-visible')) closeModal();
  });

  // Option selection highlighting
  overlay.querySelectorAll('.modal-option').forEach(function (opt) {
    opt.addEventListener('click', function () {
      var input = opt.querySelector('input');
      if (!input) return;
      var name = input.name;
      overlay.querySelectorAll('.modal-option input[name="' + name + '"]').forEach(function (i) {
        i.closest('.modal-option').classList.remove('selected');
      });
      input.checked = true;
      opt.classList.add('selected');
    });
  });

  function stepValid(i) {
    var step = steps[i];
    var radios = step.querySelectorAll('input[type="radio"]');
    if (radios.length) {
      var anyChecked = Array.prototype.some.call(radios, function (r) { return r.checked; });
      return anyChecked;
    }
    // contact step
    var requireds = step.querySelectorAll('input[required]');
    var ok = true;
    requireds.forEach(function (inp) {
      var err = inp.parentElement.querySelector('.modal-error');
      if (inp.type === 'email') {
        var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim());
        if (!emailOk) { ok = false; if (err) err.textContent = 'Please enter a valid email address'; }
        else if (err) err.textContent = '';
      } else if (inp.classList.contains('js-phone-input')) {
        var digits = inp.value.replace(/\D/g, '');
        if (digits.length !== 10) { ok = false; if (err) err.textContent = 'Please enter a valid 10-digit phone number'; }
        else if (err) err.textContent = '';
      } else if (!inp.value.trim()) {
        ok = false; if (err) err.textContent = 'This field is required';
      } else if (err) { err.textContent = ''; }
    });
    return ok;
  }

  // Next / Back navigation
  overlay.querySelectorAll('[data-modal-next]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!stepValid(current)) return;
      if (current < totalSteps - 1) { current++; showStep(current); }
    });
  });
  overlay.querySelectorAll('[data-modal-back]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (current > 0) { current--; showStep(current); }
    });
  });

  // Submit
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!stepValid(current)) return;

      var data = new FormData(form);
      var payload = {
        source: 'hero_modal',
        business: BUSINESS_NAME,
        step1_question: form.getAttribute('data-step1-question') || '',
        step1_answer: data.get('service') || '',
        step2_question: form.getAttribute('data-step2-question') || '',
        step2_answer: data.get('qualifier') || '',
        full_name: data.get('full_name') || '',
        phone: data.get('phone') || '',
        email: data.get('email') || '',
        submitted_at: new Date().toISOString()
      };

      var firstName = (payload.full_name || '').trim().split(' ')[0] || 'there';
      var successHtml = '<div class="modal-success"><i class="fa-solid fa-circle-check"></i>' +
        '<h3>Thanks ' + firstName + '!</h3>' +
        '<p>We\'ve received your request and will reach out shortly. You can also call us anytime at ' +
        BUSINESS_PHONE_DISPLAY + '.</p></div>';
      var errorHtml = '<div class="modal-success"><i class="fa-solid fa-triangle-exclamation"></i>' +
        '<h3>Something Went Wrong</h3>' +
        '<p>Please call us directly at ' + BUSINESS_PHONE_DISPLAY + ' or try again.</p></div>';

      function showResult(html) {
        var content = overlay.querySelector('.modal-content');
        if (content) content.innerHTML = html;
      }

      if (!MODAL_WEBHOOK_URL) {
        // No webhook configured yet — show success so the UX is testable.
        showResult(successHtml);
        return;
      }

      fetch(MODAL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (res) {
        showResult(res.ok ? successHtml : errorHtml);
      }).catch(function () {
        showResult(errorHtml);
      });
    });
  }
})();
