/* =====================================================================
   Fenix Web Design — main.js
   Shared site behavior: navigation, FAQ accordion, footer year,
   phone formatting, scroll animations, and the multi-step lead modal.
   ===================================================================== */

/* ── Config ── */
// Pabbly Connect webhook for the lead-capture modal — the ONLY place to wire it.
// Paste the Pabbly Connect (or other) webhook URL between the quotes below and the
// modal will POST the full lead payload (see submit handler) to it automatically.
// While empty, the modal still validates and shows the success message so no visitor
// is ever left hanging, but the lead is NOT transmitted. Set this before going live.
// No webhook URL was provided in the client brief, so it ships empty by design.
var MODAL_WEBHOOK_URL = '';
var BUSINESS_PHONE = '6028290009';

/* ── Mobile Navigation: hamburger + dropdown toggles ── */
(function navInit() {
  var hamburger = document.querySelector('.nav-hamburger');
  var menu = document.querySelector('.nav-menu');
  if (hamburger && menu) {
    hamburger.addEventListener('click', function () {
      menu.classList.toggle('open');
      var expanded = menu.classList.contains('open');
      hamburger.setAttribute('aria-expanded', String(expanded));
    });
  }

  // Dropdown toggles (work on hover for desktop via CSS; tap/click for mobile + a11y)
  document.querySelectorAll('.nav-toggle-label').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var li = btn.closest('li');
      if (!li) return;
      var isOpen = li.classList.contains('open');
      // close siblings
      document.querySelectorAll('.nav-menu > li.open').forEach(function (openLi) {
        if (openLi !== li) openLi.classList.remove('open');
      });
      li.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // Close menus when clicking outside the header
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.site-header')) {
      document.querySelectorAll('.nav-menu > li.open').forEach(function (li) {
        li.classList.remove('open');
      });
      if (menu) menu.classList.remove('open');
    }
  });
})();

/* ── Footer year ── */
(function footerYear() {
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* ── FAQs Accordion ── */
document.querySelectorAll('.faq-question').forEach(function (button) {
  button.addEventListener('click', function () {
    var isOpen = button.getAttribute('aria-expanded') === 'true';
    var answer = button.nextElementSibling;

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

/* ── Phone input formatting (US (XXX) XXX-XXXX) ── */
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

/* ── Scroll fade-in animations ── */
(function scrollAnimations() {
  var els = document.querySelectorAll('.fade-in');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(function (el) { observer.observe(el); });
})();

/* ── Hero Modal (multi-step lead capture) ── */
(function heroModal() {
  var overlay = document.getElementById('hero-modal');
  if (!overlay) return;

  var box = overlay.querySelector('.modal-box');
  var steps = Array.prototype.slice.call(overlay.querySelectorAll('.modal-step'));
  var progressLabel = overlay.querySelector('.modal-progress');
  var progressBar = overlay.querySelector('.modal-progress-bar span');
  var form = overlay.querySelector('.modal-form');
  var successEl = overlay.querySelector('.modal-success');
  var current = 0;

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
    if (successEl) successEl.classList.remove('show');
    if (form) form.style.display = '';
    if (progressLabel) progressLabel.textContent = 'Step ' + (i + 1) + ' of ' + steps.length;
    if (progressBar) progressBar.style.width = (((i + 1) / steps.length) * 100) + '%';
  }

  // Triggers
  document.querySelectorAll('[data-modal="hero-modal"]').forEach(function (btn) {
    btn.addEventListener('click', openModal);
  });
  // Close interactions
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });
  var closeBtn = overlay.querySelector('.modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('modal-visible')) closeModal();
  });

  // Option selection styling
  overlay.querySelectorAll('.modal-option').forEach(function (opt) {
    opt.addEventListener('click', function () {
      var input = opt.querySelector('input');
      if (!input) return;
      var name = input.name;
      overlay.querySelectorAll('input[name="' + name + '"]').forEach(function (i) {
        var label = i.closest('.modal-option');
        if (label) label.classList.remove('selected');
      });
      input.checked = true;
      opt.classList.add('selected');
    });
  });

  function stepValid(i) {
    var step = steps[i];
    // Radio groups
    var radios = step.querySelectorAll('input[type="radio"]');
    if (radios.length) {
      var name = radios[0].name;
      return !!step.querySelector('input[name="' + name + '"]:checked');
    }
    // Contact step
    var name2 = step.querySelector('input[name="full_name"]');
    if (name2) {
      var phone = step.querySelector('input[name="phone"]');
      var email = step.querySelector('input[name="email"]');
      var errEl = step.querySelector('.modal-error');
      var ok = true, msg = '';
      if (!name2.value.trim()) { ok = false; msg = 'Please enter your name.'; }
      else {
        var digits = (phone.value || '').replace(/\D/g, '');
        if (digits.length !== 10) { ok = false; msg = 'Please enter a valid 10-digit phone number.'; }
        else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) { ok = false; msg = 'Please enter a valid email address.'; }
      }
      if (errEl) { errEl.textContent = msg; errEl.classList.toggle('show', !ok); }
      return ok;
    }
    return true;
  }

  // Next / Back buttons
  overlay.querySelectorAll('[data-modal-next]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!stepValid(current)) return;
      if (current < steps.length - 1) { current++; showStep(current); }
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

      function getRadio(name) {
        var el = overlay.querySelector('input[name="' + name + '"]:checked');
        return el ? el.value : '';
      }
      function getQuestion(name) {
        var el = overlay.querySelector('input[name="' + name + '"]');
        return el && el.getAttribute('data-question') ? el.getAttribute('data-question') : '';
      }

      var fullName = overlay.querySelector('input[name="full_name"]').value.trim();
      var phoneFormatted = overlay.querySelector('input[name="phone"]').value.trim();
      var payload = {
        source: 'hero_modal',
        business: 'Fenix Web Design',
        step1_question: getQuestion('step1'),
        step1_answer: getRadio('step1'),
        step2_question: getQuestion('step2'),
        step2_answer: getRadio('step2'),
        full_name: fullName,
        phone: phoneFormatted,                       // e.g. "(602) 555-1234" — what the business sees
        phone_digits: phoneFormatted.replace(/\D/g, ''), // e.g. "6025551234" — for click-to-call/CRM
        email: overlay.querySelector('input[name="email"]').value.trim(),
        submitted_at: new Date().toISOString()
      };

      function showSuccess() {
        var first = (fullName.split(' ')[0]) || 'there';
        form.style.display = 'none';
        if (successEl) {
          successEl.innerHTML =
            '<i class="fa-solid fa-circle-check"></i>' +
            '<h3>Thanks ' + first + '!</h3>' +
            '<p>Your request is in. Expect a call within one business day. ' +
            'Need us sooner? Call <a href="tel:' + BUSINESS_PHONE + '">(602) 829-0009</a>.</p>';
          successEl.classList.add('show');
        }
      }
      function showError() {
        var errEl = steps[steps.length - 1].querySelector('.modal-error');
        if (errEl) {
          errEl.innerHTML = 'Something went wrong. Please call us at <a href="tel:' + BUSINESS_PHONE + '">(602) 829-0009</a> or try again.';
          errEl.classList.add('show');
        }
      }

      if (!MODAL_WEBHOOK_URL) {
        // No webhook configured yet — still confirm to the visitor.
        showSuccess();
        return;
      }
      fetch(MODAL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (res) {
        if (res.ok) showSuccess(); else showError();
      }).catch(showError);
    });
  }
})();
