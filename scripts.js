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

    // Start reveals
    setTimeout(initReveal, 300);
  }

  if (gateBtn) {
    gateBtn.addEventListener('click', enterPortfolio);
    gateBtn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); enterPortfolio(); }
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
    var items = document.querySelectorAll('.ts-reveal');
    if (!items.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('ts-in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach(function (el) { observer.observe(el); });
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
  if (ctaBtn && contactModal) {
    ctaBtn.addEventListener('click', function () {
      contactModal.classList.add('active');
      contactModal.querySelector('.ts-modal-close').focus();
    });
  }

  // Close modal on overlay click
  if (contactModal) {
    contactModal.addEventListener('click', function (e) {
      if (e.target === contactModal) contactModal.classList.remove('active');
    });
  }

  // Close modal on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && contactModal && contactModal.classList.contains('active')) {
      contactModal.classList.remove('active');
    }
  });

  // Capture-phase intercept on work-with-me (React override guard — not needed in fresh build)
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('#ts-cta-btn');
    if (!btn) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if (contactModal) contactModal.classList.add('active');
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
