'use strict';

(function () {

  /* ─────────────────────────────────────────
     ELEMENTS
  ───────────────────────────────────────── */
  var gate        = document.getElementById('ts-gate');
  var gateBtn     = document.getElementById('ts-gate-enter');
  var site        = document.getElementById('ts-site');
  var audio       = document.getElementById('ts-audio');
  var musicBtn    = document.getElementById('ts-music');
  var musicStatus = document.getElementById('ts-music-status');
  var nav         = document.getElementById('ts-nav');
  var scrollCue   = document.querySelector('.ts-hero-scroll-cue');
  var yearEl      = document.getElementById('ts-year');
  var ctaBtn      = document.getElementById('ts-cta-btn');
  var contactModal = document.getElementById('ts-contact-modal');
  var contactForm  = document.getElementById('ts-contact-form');
  var formResult   = document.getElementById('ts-form-result');

  var entered     = false;
  var userPaused  = false;
  var hasScrolled = false;

  /* ─────────────────────────────────────────
     SCROLL LOCK
  ───────────────────────────────────────── */
  function lockScroll()   { document.body.style.overflow = 'hidden'; }
  function unlockScroll() { document.body.style.overflow = ''; }

  // Lock while the entry gate is visible
  lockScroll();

  /* ─────────────────────────────────────────
     FOOTER YEAR
  ───────────────────────────────────────── */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ─────────────────────────────────────────
     ENTRY GATE
  ───────────────────────────────────────── */
  function enterPortfolio() {
    if (entered) return;
    entered = true;

    // Start audio
    playAudio();

    // Animate gate out
    if (gate) {
      gate.classList.add('ts-gate-leaving');
      gate.addEventListener('animationend', function () {
        gate.style.display = 'none';
        gate.removeAttribute('aria-modal');
      }, { once: true });
    }

    // Unlock scroll now that gate is gone
    unlockScroll();

    // Show site
    if (site) {
      site.classList.remove('ts-hidden');
      requestAnimationFrame(function () {
        site.classList.add('ts-visible');
        site.removeAttribute('aria-hidden');
      });
    }

    // Show music widget
    if (musicBtn) {
      setTimeout(function () {
        musicBtn.classList.add('ts-visible');
      }, 400);
    }

    // Prepare & start reveals
    splitWords();
    initCascade();
    initProcessSteps();
    setTimeout(initReveal, 300);
    setTimeout(initCounters, 400);
    initParallax();
    initCardGlow();
    initTicker();
  }

  function flipAndEnter() {
    var card = document.getElementById('ts-gate-card');
    if (card) {
      card.classList.add('ts-flipping');
      setTimeout(enterPortfolio, 650);
    } else {
      enterPortfolio();
    }
  }

  if (gateBtn) {
    gateBtn.addEventListener('click', flipAndEnter);
    gateBtn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flipAndEnter(); }
    });
  }

  /* ─────────────────────────────────────────
     AUDIO PLAYER
  ───────────────────────────────────────── */
  function playAudio() {
    if (!audio) return;
    audio.volume = 0.48;
    var p = audio.play();
    if (p && typeof p.then === 'function') {
      p.then(function () { setMusicUI(true); })
       .catch(function () { setMusicUI(false); });
    }
  }

  function setMusicUI(playing) {
    if (!musicBtn || !musicStatus) return;
    if (playing) {
      musicBtn.classList.add('ts-playing');
      musicStatus.textContent = 'NOW PLAYING';
    } else {
      musicBtn.classList.remove('ts-playing');
      musicStatus.textContent = userPaused ? 'PAUSED' : 'PLAY SOUND';
    }
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', function () {
      if (!entered) return;
      if (audio && !audio.paused) {
        audio.pause();
        userPaused = true;
        setMusicUI(false);
      } else if (audio) {
        userPaused = false;
        playAudio();
      }
    });

    if (audio) {
      audio.addEventListener('play',  function () { setMusicUI(true); });
      audio.addEventListener('pause', function () { setMusicUI(audio.ended ? false : audio.paused); });
    }
  }

  /* ─────────────────────────────────────────
     SCROLL HANDLING
  ───────────────────────────────────────── */
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        var y = window.scrollY;

        // Nav background
        if (nav) {
          nav.classList.toggle('ts-scrolled', y > 60);
        }

        // Hide scroll cue
        if (!hasScrolled && y > 80) {
          hasScrolled = true;
          if (scrollCue) scrollCue.classList.add('ts-hidden-cue');
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ─────────────────────────────────────────
     INTERSECTION OBSERVER — REVEALS
  ───────────────────────────────────────── */
  function initReveal() {
    var selectors = [
      '.ts-reveal', '.ts-reveal-left', '.ts-reveal-right', '.ts-reveal-scale',
      '.ts-split-words', '.ts-line-grow', '.ts-cascade',
      '.ts-process-step', '.ts-section-header', '.ts-section-label'
    ];
    var items = document.querySelectorAll(selectors.join(','));
    if (!items.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        observer.unobserve(el);
        // Cascade: stagger ts-in-view onto each direct child
        if (el.classList.contains('ts-cascade')) {
          Array.from(el.children).forEach(function (child, i) {
            setTimeout(function () { child.classList.add('ts-in-view'); }, i * 110);
          });
        }
        el.classList.add('ts-in-view');
      });
    }, { threshold: 0.1 });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ─────────────────────────────────────────
     WORD SPLIT — wrap each word for slide-up
  ───────────────────────────────────────── */
  function splitWords() {
    document.querySelectorAll('.ts-split-words').forEach(function (el) {
      var words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words.map(function (w) {
        return '<span class="ts-word"><span class="ts-word-inner">' + w + '</span></span>';
      }).join(' ');
    });
  }

  /* ─────────────────────────────────────────
     CASCADE CHILDREN — set --i delay index
  ───────────────────────────────────────── */
  function initCascade() {
    document.querySelectorAll('.ts-cascade').forEach(function (parent) {
      Array.from(parent.children).forEach(function (child, i) {
        child.style.setProperty('--i', i);
      });
    });
  }

  /* ─────────────────────────────────────────
     PROCESS STEPS — set --i for stagger
  ───────────────────────────────────────── */
  function initProcessSteps() {
    document.querySelectorAll('.ts-process-step').forEach(function (el, i) {
      el.style.setProperty('--i', i);
    });
  }

  /* ─────────────────────────────────────────
     COUNTER ANIMATION — count up on enter
  ───────────────────────────────────────── */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);

        var el     = entry.target;
        var target = parseFloat(el.dataset.count);
        var suffix = el.dataset.countSuffix || '';
        var prefix = el.dataset.countPrefix || '';
        var duration = 1800;
        var start    = performance.now();

        function tick(now) {
          var elapsed = now - start;
          var progress = Math.min(elapsed / duration, 1);
          // ease out expo
          var eased = 1 - Math.pow(1 - progress, 4);
          var current = Math.round(target * eased);
          el.textContent = prefix + current + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ─────────────────────────────────────────
     PARALLAX — hero background drifts on scroll
  ───────────────────────────────────────── */
  function initParallax() {
    var heroImg = document.querySelector('.ts-parallax-img');
    if (!heroImg) return;

    var ticking = false;
    function updateParallax() {
      var y = window.scrollY;
      heroImg.style.setProperty('--parallax-y', (y * 0.3) + 'px');
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(updateParallax); ticking = true; }
    }, { passive: true });
  }

  /* ─────────────────────────────────────────
     SERVICE CARD GLOW — follow cursor
  ───────────────────────────────────────── */
  function initCardGlow() {
    document.querySelectorAll('.ts-service-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
        var y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
        card.style.setProperty('--mx', x + '%');
        card.style.setProperty('--my', y + '%');
      });
    });
  }

  /* ─────────────────────────────────────────
     TICKER — duplicate content for seamless loop
  ───────────────────────────────────────── */
  function initTicker() {
    var ticker = document.querySelector('.ts-ticker');
    if (!ticker) return;
    var clone = ticker.innerHTML;
    ticker.innerHTML += clone;
  }

  /* ─────────────────────────────────────────
     PROJECT IMAGE HOVER SPOTLIGHT
  ───────────────────────────────────────── */
  document.querySelectorAll('.ts-project-img-link').forEach(function (link) {
    link.addEventListener('mousemove', function (e) {
      var rect = link.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
      var y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
      link.style.setProperty('--mx', x + '%');
      link.style.setProperty('--my', y + '%');
    });
  });

  /* ─────────────────────────────────────────
     CTA BUTTON → CONTACT MODAL
  ───────────────────────────────────────── */
  function openModal() {
    if (!contactModal) return;
    contactModal.classList.add('active');
    lockScroll();
    contactModal.querySelector('.ts-modal-close').focus();
  }

  function closeModal() {
    if (!contactModal) return;
    contactModal.classList.remove('active');
    unlockScroll();
  }

  if (ctaBtn && contactModal) {
    ctaBtn.addEventListener('click', openModal);
  }

  // Close modal on overlay click
  if (contactModal) {
    contactModal.addEventListener('click', function (e) {
      if (e.target === contactModal) closeModal();
    });
    // Close button
    var closeBtn = contactModal.querySelector('.ts-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
  }

  // Close modal on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && contactModal && contactModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Capture-phase intercept on work-with-me (React override guard — not needed in fresh build)
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('#ts-cta-btn');
    if (!btn) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    openModal();
  }, true);

  /* ─────────────────────────────────────────
     CONTACT FORM SUBMIT
  ───────────────────────────────────────── */
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameEl    = document.getElementById('ts-name');
      var emailEl   = document.getElementById('ts-email');
      var serviceEl = document.getElementById('ts-service');
      var msgEl     = document.getElementById('ts-message');
      var submitBtn = contactForm.querySelector('.ts-form-submit');
      var submitText    = contactForm.querySelector('.ts-submit-text');
      var submitSending = contactForm.querySelector('.ts-submit-sending');

      if (!nameEl.value.trim() || !emailEl.value.trim() || !msgEl.value.trim()) {
        showFormResult('Please fill in your name, email, and message.', false);
        return;
      }

      // Loading state
      if (submitBtn) submitBtn.disabled = true;
      if (submitText) submitText.hidden = true;
      if (submitSending) submitSending.hidden = false;

      fetch('https://thobane-sithole-api.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    nameEl.value.trim(),
          email:   emailEl.value.trim(),
          service: serviceEl ? serviceEl.value : '',
          message: msgEl.value.trim()
        })
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.ok) {
          showFormResult('Message sent! I\'ll be in touch within 24 hrs.', true);
          contactForm.reset();
        } else {
          showFormResult(data.error || 'Something went wrong. Please try again.', false);
        }
      })
      .catch(function () {
        showFormResult('Could not send — please email me directly.', false);
      })
      .finally(function () {
        if (submitBtn) submitBtn.disabled = false;
        if (submitText) submitText.hidden = false;
        if (submitSending) submitSending.hidden = true;
      });
    });
  }

  function showFormResult(msg, success) {
    if (!formResult) return;
    formResult.textContent = msg;
    formResult.className = 'ts-form-result ' + (success ? 'ts-success' : 'ts-error');
  }

  /* ─────────────────────────────────────────
     HOLD-TO-SUBMIT
  ───────────────────────────────────────── */
  (function () {
    if (!contactForm) return;
    var btn  = contactForm.querySelector('.ts-form-submit');
    var fill = contactForm.querySelector('.ts-hold-fill');
    var lbl  = contactForm.querySelector('.ts-submit-text');
    if (!btn || !fill) return;

    var HOLD_MS   = 1500;
    var holdStart = null;
    var rafId     = null;

    function tick() {
      var progress = Math.min((performance.now() - holdStart) / HOLD_MS, 1);
      fill.style.transform = 'scaleX(' + progress + ')';
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        reset();
        if (contactForm.checkValidity()) {
          contactForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        } else {
          contactForm.reportValidity();
        }
      }
    }

    function reset() {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      holdStart = null;
      btn.classList.remove('ts-is-holding');
      fill.style.transform = 'scaleX(0)';
      if (lbl && !btn.disabled) lbl.textContent = 'Hold to Send →';
    }

    btn.addEventListener('pointerdown', function (e) {
      if (btn.disabled) return;
      e.preventDefault();
      btn.setPointerCapture(e.pointerId);
      holdStart = performance.now();
      btn.classList.add('ts-is-holding');
      if (lbl) lbl.textContent = 'Keep holding…';
      rafId = requestAnimationFrame(tick);
    });

    btn.addEventListener('pointerup',     reset);
    btn.addEventListener('pointercancel', reset);
    btn.addEventListener('pointerleave',  reset);
  }());

  /* ─────────────────────────────────────────
     NAV SMOOTH SCROLL
  ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

})();
