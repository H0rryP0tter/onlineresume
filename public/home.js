/* ── NAV scroll effect ── */
const nav = document.getElementById('site-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

/* ── Hamburger menu ── */
const hamBtn = document.getElementById('ham-btn');
const navDrawer = document.getElementById('nav-drawer');
hamBtn.addEventListener('click', () => {
  const open = navDrawer.classList.toggle('open');
  hamBtn.classList.toggle('open', open);
  hamBtn.setAttribute('aria-expanded', open);
  navDrawer.setAttribute('aria-hidden', !open);
});
function closeDrawer() {
  navDrawer.classList.remove('open');
  hamBtn.classList.remove('open');
  hamBtn.setAttribute('aria-expanded', 'false');
  navDrawer.setAttribute('aria-hidden', 'true');
}
window.closeDrawer = closeDrawer;
window.addEventListener('resize', () => { if (window.innerWidth > 640) closeDrawer(); });

/* ── Rotating hero word ── */
const professions = ['the electrician','the surgeon','the chef','the architect','the analyst','the teacher','the plumber','the designer','the welder','the engineer'];
let rotIdx = 0;
const rotEl = document.getElementById('rotating-word');
setInterval(() => {
  rotIdx = (rotIdx + 1) % professions.length;
  rotEl.textContent = professions[rotIdx];
  rotEl.style.animation = 'none';
  void rotEl.offsetWidth;
  rotEl.style.animation = 'rise .5s ease both';
}, 2200);

/* ── Modes section ── */
const MODES = [
  { key:'wizard',    label:'Wizard',    icon:'🧭', sub:'Guided, step-by-step',   desc:'Progress through clusters at your own pace. Required fields are flagged; everything is editable later.' },
  { key:'dashboard', label:'Dashboard', icon:'⊞',  sub:'See everything at once',  desc:'A grid of every field. Click any card to edit. Fastest if you already know what you want to write.' },
  { key:'chat',      label:'Chat',      icon:'💬', sub:'Conversational entry',    desc:'Answer one question at a time. Helpful prompts, suggested phrasings, and skip-anything controls.' },
  { key:'focus',     label:'Focus',     icon:'◻',  sub:'One question per screen', desc:'Distraction-free. Big type. Keyboard-first. The shortest path to a complete first draft.' },
];

let activeMode = 'wizard';

function renderModeDemo(key) {
  if (key === 'wizard') return `
    <div class="demo-wrap">
      <div style="display:flex;gap:8px;margin-bottom:14px;">
        ${['Personal','Summary','Experience','Education','Skills'].map((n,i) => `
          <div style="flex:1;">
            <div style="height:4px;border-radius:2px;background:${i<2?'var(--teal)':i===2?'var(--accent)':'var(--paper3)'};"></div>
            <div style="font-size:9px;margin-top:4px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:${i<2?'var(--teal)':i===2?'var(--accent)':'var(--ink4)'};">${n}</div>
          </div>`).join('')}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div class="field-demo"><div class="field-demo-lbl">Job title</div><div class="field-demo-val focused">Charge Nurse<span class="cursor"></span></div></div>
        <div class="field-demo"><div class="field-demo-lbl">Employer</div><div class="field-demo-val">Mercy ICU</div></div>
        <div class="field-demo"><div class="field-demo-lbl">Start date</div><div class="field-demo-val">Mar 2021</div></div>
        <div class="field-demo"><div class="field-demo-lbl">End date</div><div class="field-demo-val">Present</div></div>
      </div>
    </div>`;
  if (key === 'dashboard') return `
    <div class="demo-wrap">
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">
        ${[['Name','Sarah Lin',true],['Email','sarah@…',true],['Phone','—',false],['Location','Chicago, IL',true],['Title','Charge Nurse',true],['Summary','—',false],['Experience','3 entries',true],['Education','BSN, U.Mich',true]].map(([l,v,f]) => `
          <div style="padding:10px 12px;border-radius:10px;border:1.5px solid ${f?'var(--teal)':'var(--accent)'};background:${f?'rgba(26,122,110,.08)':'var(--accent-bg)'};">
            <div style="font-size:9px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:${f?'var(--teal)':'var(--accent)'};margin-bottom:3px;">${l}</div>
            <div style="font-size:12px;color:var(--ink);font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${v}</div>
          </div>`).join('')}
      </div>
    </div>`;
  if (key === 'chat') return `
    <div class="demo-wrap">
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div style="display:flex;gap:10px;">
          <div class="av av-ai">r</div>
          <div class="chat-bubble-ai">What was your last role? A short title is fine — we can polish it later.</div>
        </div>
        <div style="display:flex;gap:10px;flex-direction:row-reverse;">
          <div class="av av-user">S</div>
          <div class="chat-bubble-user">Charge Nurse at Mercy ICU</div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;padding-left:42px;">
          <span class="chip-sm done">Got it ✓</span>
          <span class="chip-sm">+ add dates</span>
          <span class="chip-sm">+ add description</span>
        </div>
      </div>
    </div>`;
  // focus
  return `
    <div class="demo-wrap" style="text-align:center;padding:40px 24px;">
      <div style="font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin-bottom:10px;">Question 7 / 25</div>
      <div style="font-family:'DM Serif Display',serif;font-size:30px;color:var(--ink);margin-bottom:8px;line-height:1.15;">What's your <em style="color:var(--accent);">last job title</em>?</div>
      <div style="font-size:12px;color:var(--ink3);margin-bottom:20px;">One thing at a time. Press Enter to continue.</div>
      <div style="margin:0 auto;max-width:340px;padding:12px 16px;border:2px solid var(--accent);border-radius:12px;text-align:left;font-size:15px;color:var(--ink);box-shadow:0 0 0 4px rgba(146,43,33,.12);">
        Charge Nurse<span class="cursor"></span>
      </div>
    </div>`;
}

function renderModes() {
  const list = document.getElementById('modes-list');
  const pane = document.getElementById('mode-pane');
  list.innerHTML = MODES.map(m => `
    <button class="mode-btn${m.key===activeMode?' active':''}" data-mode="${m.key}">
      <div class="mode-icon">${m.icon}</div>
      <div>
        <div class="mode-name">${m.label}</div>
        <div class="mode-sub">${m.sub}</div>
      </div>
      <span class="mode-arrow">→</span>
    </button>`).join('');
  const mode = MODES.find(m => m.key === activeMode);
  document.getElementById('mode-pane-icon').textContent = mode.icon;
  document.getElementById('mode-pane-label').textContent = mode.label + ' mode';
  document.getElementById('mode-pane-title').textContent = mode.sub + '.';
  document.getElementById('mode-pane-desc').textContent = mode.desc;
  document.getElementById('mode-pane-demo').innerHTML = renderModeDemo(activeMode);
  list.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeMode = btn.dataset.mode;
      renderModes();
    });
  });
}
renderModes();

/* ── Gallery marquee ── */
const PERSONAS = [
  { initials:'JP', name:'John P.',   profession:'Electrician',           bg:'#c0392b' },
  { initials:'MG', name:'Maria G.',  profession:'Construction Manager',  bg:'#c0641a' },
  { initials:'AK', name:'Ahmed K.',  profession:'Software Engineer',     bg:'#1a7a8c' },
  { initials:'SL', name:'Sarah L.',  profession:'Registered Nurse',      bg:'#1a7a52' },
  { initials:'DM', name:'David M.',  profession:'High School Teacher',   bg:'#6c3483' },
  { initials:'EW', name:'Emma W.',   profession:'Graphic Designer',      bg:'#a93060' },
  { initials:'CR', name:'Carlos R.', profession:'Executive Chef',        bg:'#b8700a' },
  { initials:'LT', name:'Lisa T.',   profession:'Financial Analyst',     bg:'#1a7a6e' },
  { initials:'MB', name:'Mark B.',   profession:'Sales Representative',  bg:'#1e4d8c' },
  { initials:'PS', name:'Priya S.',  profession:'Marketing Director',    bg:'#6e2faa' },
  { initials:'TH', name:'Tom H.',    profession:'Plumber',               bg:'#27ae60' },
  { initials:'AF', name:'Ana F.',    profession:'Data Scientist',        bg:'#922b21' },
  { initials:'NL', name:'Nina L.',   profession:'Architect',             bg:'#3d4a8c' },
  { initials:'RC', name:'Ravi C.',   profession:'Logistics Lead',        bg:'#8c5a1a' },
];

function cardHtml(p) {
  return `<div class="persona-card">
    <div class="persona-av" style="background:${p.bg};">${p.initials}</div>
    <div class="persona-name">${p.name}</div>
    <div class="persona-job">${p.profession}</div>
    <div class="persona-dots"><span></span><span></span><span></span></div>
  </div>`;
}
const half = Math.ceil(PERSONAS.length / 2);
const lane1 = [...PERSONAS.slice(0, half), ...PERSONAS.slice(0, half)];
const lane2 = [...PERSONAS.slice(half), ...PERSONAS.slice(half)];
const mw = document.getElementById('marquee-wrap');

[lane1, lane2].forEach((lane, i) => {
  const track = document.createElement('div');
  track.className = 'marquee-track';
  const inner = document.createElement('div');
  inner.className = 'marquee-inner';
  const speed = 40;
  const dir = i % 2 === 0 ? 'normal' : 'reverse';
  inner.style.animation = `${i===0?'marquee-l':'marquee-r'} ${speed}s linear infinite`;
  inner.innerHTML = lane.map(cardHtml).join('');
  track.appendChild(inner);
  mw.appendChild(track);
});

/* ── FAQ ── */
const FAQS = [
  { q:'Is it really free?',
    a:'Yes — the entire builder, all four entry modes, cloud storage, and basic export are free. We charge only for premium templates and ATS optimisation features.' },
  { q:'Will my resume work for non-office jobs?',
    a:'That\'s exactly who we built it for. Trades, hospitality, healthcare, manual labour, civil service — the templates are tuned to read well in those contexts.' },
  { q:'Can I switch between modes mid-build?',
    a:'Absolutely. Your data lives in one place; modes are just different surfaces over the same fields. Switch as often as you like.' },
  { q:'Where is my data stored?',
    a:'Encrypted at rest in our cloud. You own it. Export to JSON any time, delete on demand, no questions asked.' },
];
const faqList = document.getElementById('faq-list');
faqList.innerHTML = FAQS.map((f, i) => `
  <div class="faq-item" id="faq-item-${i}">
    <button class="faq-q" aria-expanded="false" data-faq="${i}">
      <span>${f.q}</span>
      <span class="faq-icon">+</span>
    </button>
    <div class="faq-a" role="region"><p>${f.a}</p></div>
  </div>`).join('');

let openFaq = -1;
faqList.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const idx = +btn.dataset.faq;
    const item = document.getElementById('faq-item-' + idx);
    if (openFaq === idx) {
      item.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      openFaq = -1;
    } else {
      if (openFaq >= 0) {
        const prev = document.getElementById('faq-item-' + openFaq);
        prev.classList.remove('open');
        prev.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      }
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      openFaq = idx;
    }
  });
});
