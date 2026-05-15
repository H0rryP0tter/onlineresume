/* ── Hamburger menu ── */
const hamBtn = document.getElementById('ham-btn');
const navDrawer = document.getElementById('nav-drawer');
const bar1 = document.getElementById('ham-bar-1');
const bar2 = document.getElementById('ham-bar-2');
const bar3 = document.getElementById('ham-bar-3');

function openDrawer() {
  navDrawer.classList.add('is-open');
  bar1.classList.add('is-open-1');
  bar2.classList.add('is-open-2');
  bar3.classList.add('is-open-3');
  hamBtn.setAttribute('aria-expanded', 'true');
  navDrawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  navDrawer.classList.remove('is-open');
  bar1.classList.remove('is-open-1');
  bar2.classList.remove('is-open-2');
  bar3.classList.remove('is-open-3');
  hamBtn.setAttribute('aria-expanded', 'false');
  navDrawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamBtn.addEventListener('click', () => {
  navDrawer.classList.contains('is-open') ? closeDrawer() : openDrawer();
});

['drawer-modes','drawer-gallery','drawer-how','drawer-faq'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', closeDrawer);
});

window.addEventListener('resize', () => { if (window.innerWidth > 600) closeDrawer(); });

/* ── Rotating hero word ── */
const professions = [
  'the electrician','the surgeon','the chef','the architect',
  'the analyst','the teacher','the plumber','the designer',
  'the welder','the engineer'
];
let rotIdx = 0;
const rotEl = document.getElementById('rotating-word');

setInterval(() => {
  rotIdx = (rotIdx + 1) % professions.length;
  rotEl.style.animation = 'none';
  void rotEl.offsetWidth;
  rotEl.textContent = professions[rotIdx];
  rotEl.style.animation = 'sp-rise .5s var(--ease) both';
}, 2200);

/* ── Modes section ── */
const MODES = [
  { key: 'wizard',    num: '01', icon: 'map',              label: 'Wizard',    sub: 'Guided, step-by-step',   title: 'Guided, step-by-step.',   desc: 'Progress through clusters at your own pace. Required fields are flagged; everything is editable later.' },
  { key: 'dashboard', num: '02', icon: 'layout-dashboard', label: 'Dashboard', sub: 'See everything at once',  title: 'See everything at once.',  desc: 'A grid of every field. Click any card to edit. Fastest if you already know what you want to write.' },
  { key: 'chat',      num: '03', icon: 'message-square',   label: 'Chat',      sub: 'Conversational entry',    title: 'Conversational entry.',    desc: 'Answer one question at a time. Helpful prompts, suggested phrasings, and skip-anything controls.' },
  { key: 'focus',     num: '04', icon: 'scan',             label: 'Focus',     sub: 'One question per screen', title: 'One question per screen.', desc: 'Distraction-free. Big type. Keyboard-first. The shortest path to a complete first draft.' },
];

let activeMode = 'wizard';

function renderModeDemo(key) {
  if (key === 'wizard') return `
    <div class="sp-demo-2col">
      <div class="sp-demo-field">
        <span class="t-label">Job title</span>
        <div class="sp-demo-input is-focused">Charge Nurse<span class="sp-cursor"></span></div>
      </div>
      <div class="sp-demo-field">
        <span class="t-label">Employer</span>
        <div class="sp-demo-input">Mercy ICU</div>
      </div>
      <div class="sp-demo-field">
        <span class="t-label">Start date</span>
        <div class="sp-demo-input">Mar 2021</div>
      </div>
      <div class="sp-demo-field">
        <span class="t-label">End date</span>
        <div class="sp-demo-input">Present</div>
      </div>
    </div>`;

  if (key === 'dashboard') return `
    <div class="sp-demo-grid">
      ${[
        ['Name',       'Sarah Lin',    'filled'],
        ['Email',      'sarah@…',      'filled'],
        ['Phone',      '—',            'missing'],
        ['Location',   'Chicago, IL',  'filled'],
        ['Title',      'Charge Nurse', 'filled'],
        ['Summary',    '—',            'missing'],
      ].map(([l, v, s]) => `
        <div class="sp-demo-tile sp-demo-tile--${s}">
          <div class="sp-demo-tile-l">${l}</div>
          <div class="sp-demo-tile-v">${v}</div>
        </div>`).join('')}
    </div>`;

  if (key === 'chat') return `
    <div>
      <div class="sp-demo-bubble sp-demo-bubble--ai">What was your last role? A short title is fine — we can polish it later.</div>
      <div class="sp-demo-bubble sp-demo-bubble--user">Charge Nurse at Mercy ICU</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
        <span class="chip chip--bone">Got it</span>
        <span class="chip">+ add dates</span>
        <span class="chip">+ add description</span>
      </div>
    </div>`;

  return `
    <div class="sp-demo-focus">
      <span class="t-eyebrow">Question 7 / 25</span>
      <h3>What's your last job title?</h3>
      <p>One thing at a time. Press <kbd class="sp-kbd">↵</kbd> to continue.</p>
      <div class="sp-demo-input">Charge Nurse<span class="sp-cursor"></span></div>
    </div>`;
}

function renderModes() {
  const list = document.getElementById('modes-list');
  list.innerHTML = MODES.map(m => `
    <button class="sp-mode-btn${m.key === activeMode ? ' is-active' : ''}" data-mode="${m.key}" type="button">
      <span class="sp-mode-btn-num">${m.num}</span>
      <span class="sp-mode-btn-mid">
        <span class="sp-mode-btn-name">${m.label}</span>
        <span class="sp-mode-btn-sub">${m.sub}</span>
      </span>
      <i data-lucide="${m.icon}" class="sp-mode-btn-ic"></i>
    </button>`).join('');

  const mode = MODES.find(m => m.key === activeMode);
  document.getElementById('mode-pane-icon').innerHTML = `<i data-lucide="${mode.icon}"></i>`;
  document.getElementById('mode-pane-label').textContent = mode.label + ' mode';
  document.getElementById('mode-pane-title').textContent = mode.title;
  document.getElementById('mode-pane-desc').textContent = mode.desc;
  document.getElementById('mode-pane-demo').innerHTML = renderModeDemo(activeMode);

  list.querySelectorAll('.sp-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeMode = btn.dataset.mode;
      renderModes();
    });
  });

  if (window.lucide) lucide.createIcons();
}

renderModes();

/* ── Gallery marquee ── */
const PERSONAS = [
  { initials: 'JP', name: 'John P.',   role: 'Electrician',           variant: 'red'   },
  { initials: 'MG', name: 'Maria G.',  role: 'Construction Manager',  variant: ''      },
  { initials: 'AK', name: 'Ahmed K.',  role: 'Software Engineer',     variant: 'olive' },
  { initials: 'SL', name: 'Sarah L.',  role: 'Registered Nurse',      variant: ''      },
  { initials: 'DM', name: 'David M.',  role: 'High School Teacher',   variant: 'red'   },
  { initials: 'EW', name: 'Emma W.',   role: 'Graphic Designer',      variant: 'olive' },
  { initials: 'CR', name: 'Carlos R.', role: 'Executive Chef',        variant: ''      },
  { initials: 'LT', name: 'Lisa T.',   role: 'Financial Analyst',     variant: 'red'   },
  { initials: 'MB', name: 'Mark B.',   role: 'Sales Representative',  variant: 'olive' },
  { initials: 'PS', name: 'Priya S.',  role: 'Marketing Director',    variant: ''      },
  { initials: 'TH', name: 'Tom H.',    role: 'Plumber',               variant: 'red'   },
  { initials: 'AF', name: 'Ana F.',    role: 'Data Scientist',        variant: 'olive' },
  { initials: 'NL', name: 'Nina L.',   role: 'Architect',             variant: ''      },
  { initials: 'RC', name: 'Ravi C.',   role: 'Logistics Lead',        variant: 'red'   },
];

function personaHtml(p, idx) {
  const variantClass = p.variant ? ` sp-persona--${p.variant}` : '';
  const first = idx === 0 ? '' : '';
  return `<div class="sp-persona${variantClass}${first}">
    <div class="sp-persona-av">${p.initials}</div>
    <div class="sp-persona-name">${p.name}</div>
    <div class="sp-persona-role">${p.role}</div>
    <div class="sp-persona-rule"></div>
    <div class="sp-persona-meta">${String(idx + 1).padStart(3, '0')} · shipped</div>
  </div>`;
}

const track = document.getElementById('marquee-track');
const doubled = [...PERSONAS, ...PERSONAS];
track.innerHTML = doubled.map((p, i) => personaHtml(p, i % PERSONAS.length)).join('');

/* ── FAQ ── */
const FAQS = [
  { q: 'Is it really free?',
    a: 'Yes — the entire builder, all four entry modes, cloud storage, and basic export are free. We charge only for premium templates and ATS optimisation features.' },
  { q: 'Will my resume work for non-office jobs?',
    a: 'That\'s exactly who we built it for. Trades, hospitality, healthcare, manual labour, civil service — the templates are tuned to read well in those contexts.' },
  { q: 'Can I switch between modes mid-build?',
    a: 'Absolutely. Your data lives in one place; modes are just different surfaces over the same fields. Switch as often as you like.' },
  { q: 'Where is my data stored?',
    a: 'Encrypted at rest in our cloud. You own it. Export to JSON any time, delete on demand, no questions asked.' },
];

const faqList = document.getElementById('faq-list');
faqList.innerHTML = FAQS.map((f, i) => `
  <div class="sp-faq-item" id="faq-item-${i}">
    <button class="sp-faq-q" type="button" aria-expanded="false" data-faq="${i}">
      <span class="sp-faq-num">${String(i + 1).padStart(2, '0')}</span>
      <span>${f.q}</span>
      <span class="sp-faq-toggle">+</span>
    </button>
    <div class="sp-faq-a" role="region"><p>${f.a}</p></div>
  </div>`).join('');

let openFaq = -1;
faqList.querySelectorAll('.sp-faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const idx = +btn.dataset.faq;
    const item = document.getElementById('faq-item-' + idx);
    const toggle = btn.querySelector('.sp-faq-toggle');
    if (openFaq === idx) {
      item.classList.remove('is-open');
      toggle.textContent = '+';
      btn.setAttribute('aria-expanded', 'false');
      openFaq = -1;
    } else {
      if (openFaq >= 0) {
        const prev = document.getElementById('faq-item-' + openFaq);
        prev.classList.remove('is-open');
        prev.querySelector('.sp-faq-toggle').textContent = '+';
        prev.querySelector('.sp-faq-q').setAttribute('aria-expanded', 'false');
      }
      item.classList.add('is-open');
      toggle.textContent = '−';
      btn.setAttribute('aria-expanded', 'true');
      openFaq = idx;
    }
  });
});

/* ── Init Lucide icons (runs after defer script loads) ── */
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
});
window.addEventListener('load', () => {
  if (window.lucide) lucide.createIcons();
});
