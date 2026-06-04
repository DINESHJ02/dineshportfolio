'use strict';

/* ════════════════════════════════════════════════
   DINESH J — Portfolio  |  script.js
   EmailJS credentials
   ════════════════════════════════════════════════ */

const EMAILJS_SERVICE_ID  = 'service_jkevdyv';
const EMAILJS_TEMPLATE_ID = 'template_9bvm908';
const EMAILJS_PUBLIC_KEY  = 'MM5LorIHgqwq8S0S2';


/* ─────────────────────────────────────
   LOADER
───────────────────────────────────── */
document.body.style.overflow = 'hidden';

window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('gone');
    document.body.style.overflow = '';
    initReveal();
  }, 900);
});


/* ─────────────────────────────────────
   SCROLL — progress bar + nav state
───────────────────────────────────── */
window.addEventListener('scroll', onScroll, { passive: true });

function onScroll() {
  const y   = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('progress').style.width = (y / max * 100) + '%';
  document.getElementById('nav').classList.toggle('up', y > 60);
  highlightNav(y);
}


/* ─────────────────────────────────────
   ACTIVE NAV LINK ON SCROLL
───────────────────────────────────── */
const secs = [...document.querySelectorAll('section[id]')];
const lns  = [...document.querySelectorAll('.ln')];

function highlightNav(y) {
  for (let i = secs.length - 1; i >= 0; i--) {
    if (y + 110 >= secs[i].offsetTop) {
      lns.forEach(l => l.classList.remove('act'));
      document.querySelector(`.ln[href="#${secs[i].id}"]`)?.classList.add('act');
      break;
    }
  }
}


/* ─────────────────────────────────────
   MOBILE DRAWER
───────────────────────────────────── */
const hbg     = document.getElementById('hbg');
const drawer  = document.getElementById('drawer');
const overlay = document.getElementById('overlay');
const dClose  = document.getElementById('drawer-close');

const openDrawer = () => {
  hbg.classList.add('open');
  drawer.classList.add('open');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
};
const closeDrawer = () => {
  hbg.classList.remove('open');
  drawer.classList.remove('open');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
};

hbg.addEventListener('click', openDrawer);
dClose.addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);
document.querySelectorAll('.mob-nav a').forEach(a => a.addEventListener('click', closeDrawer));


/* ─────────────────────────────────────
   SMOOTH SCROLL
───────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


/* ─────────────────────────────────────
   BACK TO TOP
───────────────────────────────────── */
document.getElementById('totop').addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);


/* ─────────────────────────────────────
   TYPING EFFECT
───────────────────────────────────── */
const typedEl = document.getElementById('typed');
const phrases = [
  'WooCommerce Specialist',
  'WordPress Developer',
  'Frontend Developer',
  'Performance Optimizer',
];
let pi = 0, ci = 0, deleting = false;

function type() {
  const word = phrases[pi];
  typedEl.textContent = deleting ? word.slice(0, --ci) : word.slice(0, ++ci);
  let delay = deleting ? 45 : 85;
  if (!deleting && ci === word.length)  { delay = 1800; deleting = true; }
  else if (deleting && ci === 0)        { deleting = false; pi = (pi + 1) % phrases.length; delay = 400; }
  setTimeout(type, delay);
}
type();


/* ─────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  let countersRan = false;
  let barsRan     = false;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');

      if (!countersRan && document.getElementById('home').contains(entry.target)) {
        countersRan = true;
        runCounters();
      }
      if (!barsRan && document.getElementById('skills').contains(entry.target)) {
        barsRan = true;
        setTimeout(runBars, 250);
      }
      io.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  els.forEach(el => io.observe(el));
}


/* ─────────────────────────────────────
   COUNTERS
───────────────────────────────────── */
function runCounters() {
  document.querySelectorAll('.cnt').forEach(el => {
    const target = +el.dataset.t;
    let n = 0;
    const step  = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      n = Math.min(n + step, target);
      el.textContent = n + (target >= 10 ? '+' : '');
      if (n >= target) clearInterval(timer);
    }, 30);
  });
}


/* ─────────────────────────────────────
   SKILL BARS
───────────────────────────────────── */
function runBars() {
  document.querySelectorAll('.sb-fill').forEach(bar => {
    bar.style.width = bar.dataset.w + '%';
  });
}


/* ─────────────────────────────────────
   PROJECT SLIDERS
───────────────────────────────────── */
const SL = {};

(function initSliders() {
  document.querySelectorAll('.slider').forEach(sl => {
    const id     = sl.id;
    const slides = [...sl.querySelectorAll('.sl')];
    SL[id] = { cur: 0, n: slides.length };

    const dotWrap = document.getElementById('d-' + id);
    if (dotWrap) {
      slides.forEach((_, i) => {
        const d     = document.createElement('div');
        d.className = 'dot' + (i === 0 ? ' active' : '');
        d.onclick   = () => goTo(id, i);
        dotWrap.appendChild(d);
      });
    }
    setInterval(() => mv(id, 1), 3600 + Math.random() * 1800);
  });
})();

window.mv = function(id, dir) {
  const s = SL[id];
  if (!s) return;
  goTo(id, (s.cur + dir + s.n) % s.n);
};

function goTo(id, idx) {
  const sl = document.getElementById(id);
  if (!sl) return;
  const s      = SL[id];
  const slides = sl.querySelectorAll('.sl');
  const dots   = document.querySelectorAll(`#d-${id} .dot`);
  slides[s.cur].classList.remove('active');
  dots[s.cur]?.classList.remove('active');
  s.cur = idx;
  slides[s.cur].classList.add('active');
  dots[s.cur]?.classList.add('active');
}


/* ─────────────────────────────────────
   PROJECT FILTERS
───────────────────────────────────── */
document.querySelectorAll('.f-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.f;
    document.querySelectorAll('.proj-item').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.cat !== filter);
    });
  });
});


/* ─────────────────────────────────────
   CONTACT FORM — EmailJS
   Uses a script-tag load check so it
   works regardless of SDK timing
───────────────────────────────────── */
function sendEmail(name, email, subject, message) {
  return new Promise((resolve, reject) => {
    /* Make sure SDK is available */
    if (typeof emailjs === 'undefined') {
      reject(new Error('EmailJS SDK not loaded'));
      return;
    }

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name:  name,
        from_email: email,
        subject:    subject,
        message:    message,
        reply_to:   email,
      }
    ).then(resolve).catch(reject);
  });
}

/* Form validation helpers */
const setErr = (fieldId, msg) => {
  const errEl   = document.getElementById('e-' + fieldId);
  const inputEl = document.getElementById('f-' + fieldId);
  if (errEl)   errEl.textContent = msg;
  if (inputEl) inputEl.classList.add('err');
};
const clrAll = () => {
  ['name', 'email', 'sub', 'msg'].forEach(id => {
    const errEl   = document.getElementById('e-' + id);
    const inputEl = document.getElementById('f-' + id);
    if (errEl)   errEl.textContent = '';
    if (inputEl) inputEl.classList.remove('err');
  });
};

const showOk = (okEl) => {
  okEl.innerHTML      = '<i class="fa-solid fa-circle-check"></i> Sent! I\'ll reply within 24 hours.';
  okEl.style.color      = '#16a34a';
  okEl.style.background = '#f0fdf4';
  okEl.style.borderColor= '#bbf7d0';
  okEl.classList.remove('hidden');
  setTimeout(() => {
    okEl.classList.add('hidden');
    okEl.removeAttribute('style');
  }, 7000);
};

const showFail = (okEl, errMsg) => {
  console.error('EmailJS send failed:', errMsg);
  okEl.innerHTML        = '⚠ Could not send. Email me directly: <a href="mailto:dineshjayapriya5@gmail.com" style="color:inherit;text-decoration:underline">dineshjayapriya5@gmail.com</a>';
  okEl.style.color      = '#dc2626';
  okEl.style.background = '#fef2f2';
  okEl.style.borderColor= '#fecaca';
  okEl.classList.remove('hidden');
  setTimeout(() => {
    okEl.classList.add('hidden');
    okEl.removeAttribute('style');
  }, 10000);
};

document.getElementById('cform').addEventListener('submit', function(e) {
  e.preventDefault();
  clrAll();

  const name    = document.getElementById('f-name').value.trim();
  const email   = document.getElementById('f-email').value.trim();
  const subject = document.getElementById('f-sub').value.trim();
  const message = document.getElementById('f-msg').value.trim();

  let valid = true;
  if (!name)                                           { setErr('name',  'Name is required.');              valid = false; }
  if (!email)                                          { setErr('email', 'Email is required.');             valid = false; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('email', 'Enter a valid email address.');   valid = false; }
  if (!subject)                                        { setErr('sub',   'Subject is required.');           valid = false; }
  if (message.length < 10)                             { setErr('msg',   'At least 10 characters.');        valid = false; }
  if (!valid) return;

  const btn  = this.querySelector('.btn-submit');
  const okEl = document.getElementById('form-ok');

  btn.disabled  = true;
  btn.innerHTML = 'Sending… <i class="fa-solid fa-spinner fa-spin"></i>';

  /* Initialise EmailJS right before sending */
  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  } catch(initErr) {
    console.warn('emailjs.init warning:', initErr);
  }

  sendEmail(name, email, subject, message)
    .then(() => {
      this.reset();
      btn.disabled  = false;
      btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
      showOk(okEl);
    })
    .catch((err) => {
      btn.disabled  = false;
      btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
      showFail(okEl, err);
    });
});


/* ─────────────────────────────────────
   CV DOWNLOAD
───────────────────────────────────── */
document.getElementById('dl-cv')?.addEventListener('click', e => {
  e.preventDefault();
  // Uncomment below once you upload your PDF:
  // window.open('Dinesh_J_Resume.pdf', '_blank');
  const btn  = e.currentTarget;
  const orig = btn.innerHTML;
  btn.innerHTML           = '<i class="fa-solid fa-check"></i> Ready to download';
  btn.style.pointerEvents = 'none';
  setTimeout(() => {
    btn.innerHTML           = orig;
    btn.style.pointerEvents = '';
  }, 2500);
});