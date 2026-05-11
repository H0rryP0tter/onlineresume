/* ────────────────────────────────────────────
   State & UI helpers
──────────────────────────────────────────── */
let authMode = 'signin'; // 'signin' | 'register'

const authForms   = document.getElementById('auth-forms');
const sessionBar  = document.getElementById('session-bar');
const currentUser = document.getElementById('current-user');
const logoutBtn   = document.getElementById('logout-button');
const appShell    = document.getElementById('app-shell');

const tabSignin   = document.getElementById('tab-signin');
const tabRegister = document.getElementById('tab-register');

const form        = document.getElementById('auth-form');
const emailInput  = document.getElementById('auth-email');
const pwInput     = document.getElementById('auth-password');
const confirmInput= document.getElementById('auth-confirm');
const confirmGrp  = document.getElementById('confirm-group');
const emailErr    = document.getElementById('email-err');
const pwErr       = document.getElementById('pw-err');
const confirmErr  = document.getElementById('confirm-err');
const bannerErr   = document.getElementById('banner-error');
const bannerOk    = document.getElementById('banner-success');
const submitBtn   = document.getElementById('submit-btn');
const btnLabel    = document.getElementById('btn-label');
const authMsg     = document.getElementById('auth-message');

const heading     = document.getElementById('auth-heading');
const subhead     = document.getElementById('auth-subhead');

function validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function validatePassword(p) { return p.length >= 8; }

function updateValidity() {
  const emailOk   = validateEmail(emailInput.value);
  const pwOk      = validatePassword(pwInput.value);
  const confirmOk = authMode === 'signin' || pwInput.value === confirmInput.value;
  submitBtn.disabled = !(emailOk && pwOk && confirmOk);

  if (emailInput.value) {
    emailInput.classList.toggle('error', !emailOk);
    emailErr.hidden = emailOk;
  }
  if (pwInput.value) {
    pwInput.classList.toggle('error', !pwOk);
    pwErr.hidden = pwOk;
  }
  if (authMode === 'register' && confirmInput.value) {
    confirmInput.classList.toggle('error', !confirmOk);
    confirmErr.hidden = confirmOk;
  }
}

function switchMode(mode) {
  authMode = mode;
  tabSignin.classList.toggle('active', mode === 'signin');
  tabRegister.classList.toggle('active', mode === 'register');
  tabSignin.setAttribute('aria-selected', mode === 'signin');
  tabRegister.setAttribute('aria-selected', mode === 'register');
  confirmGrp.classList.toggle('field-hidden', mode === 'signin');
  if (mode === 'signin') {
    heading.textContent = 'Welcome back';
    subhead.textContent = 'Sign in to your account and pick up where you left off.';
    btnLabel.textContent = 'Sign in';
    pwInput.setAttribute('autocomplete', 'current-password');
  } else {
    heading.textContent = 'Join ResumeCraft';
    subhead.textContent = 'Create a free account. No credit card required. Start building in 5 minutes.';
    btnLabel.textContent = 'Create account';
    pwInput.setAttribute('autocomplete', 'new-password');
    pwInput.placeholder = 'At least 8 characters';
  }
  clearBanners();
  updateValidity();
}

function clearBanners() {
  bannerErr.textContent = ''; bannerErr.classList.remove('visible');
  bannerOk.textContent = '';  bannerOk.classList.remove('visible');
  authMsg.textContent = '';
}

function setLoading(on) {
  submitBtn.classList.toggle('loading', on);
  submitBtn.disabled = on;
  if (on) btnLabel.textContent = authMode === 'signin' ? 'Signing in…' : 'Creating account…';
  else     btnLabel.textContent = authMode === 'signin' ? 'Sign in' : 'Create account';
}

function readJsonResponse(response) {
  return response.json()
    .catch(() => ({}))
    .then(result => {
      if (!response.ok) throw new Error(result.message || 'Request failed');
      return result;
    });
}

function showLoggedOut(message) {
  authForms.hidden = false;
  sessionBar.hidden = true;
  appShell.hidden = true;
  currentUser.textContent = '';
  clearBanners();
  if (message) { authMsg.textContent = message; }
}

function showLoggedIn(user) {
  authForms.hidden = true;
  sessionBar.hidden = false;
  appShell.hidden = false;
  currentUser.textContent = 'Signed in as ' + user.email;
  clearBanners();
  loadResumes();
}

/* ── Tab events ── */
tabSignin.addEventListener('click',   () => switchMode('signin'));
tabRegister.addEventListener('click', () => switchMode('register'));

/* ── Live validation ── */
[emailInput, pwInput, confirmInput].forEach(el => {
  el.addEventListener('input', () => { authMsg.textContent = ''; updateValidity(); });
});

/* ── Form submit ── */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearBanners();
  if (!validateEmail(emailInput.value)) return;
  if (!validatePassword(pwInput.value)) return;

  const endpoint = authMode === 'signin' ? '/auth/login' : '/auth/register';
  setLoading(true);

  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email:    emailInput.value.trim(),
      password: pwInput.value
    })
  })
    .then(readJsonResponse)
    .then(data => {
      setLoading(false);
      bannerOk.textContent = authMode === 'signin' ? 'Signing you in…' : 'Account created! Loading your resume…';
      bannerOk.classList.add('visible');
      form.reset();
      setTimeout(() => showLoggedIn(data.user), 800);
    })
    .catch(err => {
      setLoading(false);
      bannerErr.textContent = err.message;
      bannerErr.classList.add('visible');
      updateValidity();
    });
});

/* ── Logout ── */
logoutBtn.addEventListener('click', () => {
  fetch('/auth/logout', { method: 'POST' })
    .then(readJsonResponse)
    .catch(err => console.error('Logout failed:', err))
    .then(() => showLoggedOut('Logged out successfully.'));
});

/* ── Session check ── */
function checkSession() {
  authForms.hidden = true;
  fetch('/auth/me')
    .then(res => res.ok ? res.json() : null)
    .then(data => data?.user ? showLoggedIn(data.user) : showLoggedOut('Log in or create an account to manage your resume.'))
    .catch(() => showLoggedOut('Log in or create an account to manage your resume.'));
}

/* ────────────────────────────────────────────
   Resume panel helpers (from app.js logic)
──────────────────────────────────────────── */
function loadResumes() {
  fetch('/resume/all')
    .then(readJsonResponse)
    .then(data => renderResume(data.results))
    .catch(error => {
      if (error.message === 'Authentication required' || error.message === 'Invalid or expired token') {
        showLoggedOut('Your session expired. Please log in again.');
        return;
      }
      document.getElementById('resume-panel').textContent = 'Failed to load resumes.';
    });
}

function buildInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function buildResumeCard(resume) {
  const p      = resume.personal   || {};
  const exp    = resume.experience  || {};
  const edu    = resume.education   || {};
  const skills = resume.skills      || {};

  const card = document.createElement('div');
  card.className = 'rp-card';

  const header = document.createElement('div');
  header.className = 'rp-header';
  const avatar = document.createElement('div');
  avatar.className = 'rp-avatar';
  avatar.textContent = buildInitials(p.fullName);
  const identity = document.createElement('div');
  const nameEl = document.createElement('h2');
  nameEl.className = 'rp-name';
  nameEl.textContent = p.fullName || '(No name yet)';
  identity.appendChild(nameEl);
  const jobTitle = p.profileTitle || exp.currentDesignation;
  if (jobTitle) {
    const titleEl = document.createElement('p');
    titleEl.className = 'rp-job-title';
    titleEl.textContent = jobTitle;
    identity.appendChild(titleEl);
  }
  header.appendChild(avatar);
  header.appendChild(identity);
  card.appendChild(header);

  const body = document.createElement('div');
  body.className = 'rp-body';
  const dl = document.createElement('dl');
  dl.className = 'rp-meta';
  function addMeta(label, value) {
    if (!value) return;
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    dd.textContent = value;
    dl.appendChild(dt); dl.appendChild(dd);
  }
  const loc = [p.city, p.stateProvince, p.country].filter(Boolean).join(', ');
  addMeta('Location', loc || null);
  if (exp.yearsOfExperience != null) {
    addMeta('Experience', exp.yearsOfExperience === 0 ? 'Fresher' : `${exp.yearsOfExperience} yr${exp.yearsOfExperience !== 1 ? 's' : ''}`);
  }
  const highestEdu = edu.highestEducation || (edu.entries?.length ? [edu.entries[0].degree, edu.entries[0].institution].filter(Boolean).join(' — ') : null);
  addMeta('Education', highestEdu);
  const techSkills = skills.technicalSkills?.length ? skills.technicalSkills : null;
  if (techSkills) {
    const preview = techSkills.slice(0, 5);
    const overflow = techSkills.length > 5 ? ` +${techSkills.length - 5} more` : '';
    addMeta('Skills', preview.join(', ') + overflow);
  }
  body.appendChild(dl);
  if (resume.updatedAt) {
    const updated = document.createElement('p');
    updated.className = 'rp-updated';
    updated.textContent = `Last updated ${new Date(resume.updatedAt).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}`;
    body.appendChild(updated);
  }
  card.appendChild(body);

  const actions = document.createElement('div');
  actions.className = 'rp-actions';

  const editBtn = document.createElement('a');
  editBtn.href = `/resume-builder.html?id=${resume._id}`;
  editBtn.className = 'btn-rp-primary';
  editBtn.textContent = 'Edit Resume';
  actions.appendChild(editBtn);

  const sendBtn = document.createElement('button');
  sendBtn.className = 'btn-rp'; sendBtn.type = 'button'; sendBtn.textContent = 'Send';
  sendBtn.addEventListener('click', () => shareResume(p.fullName));
  actions.appendChild(sendBtn);

  const pdfBtn = document.createElement('button');
  pdfBtn.className = 'btn-rp'; pdfBtn.type = 'button'; pdfBtn.textContent = 'PDF';
  pdfBtn.addEventListener('click', () => window.print());
  actions.appendChild(pdfBtn);

  const webBtn = document.createElement('button');
  webBtn.className = 'btn-rp'; webBtn.type = 'button'; webBtn.textContent = 'Web Page';
  webBtn.addEventListener('click', () => window.open(`/resume/view/${resume._id}`, '_blank'));
  actions.appendChild(webBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn-rp-danger'; deleteBtn.type = 'button'; deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => deleteResume(resume._id));
  actions.appendChild(deleteBtn);

  card.appendChild(actions);
  return card;
}

function renderResume(resumes) {
  const panel = document.getElementById('resume-panel');
  panel.innerHTML = '';

  const toolbar = document.createElement('div');
  toolbar.className = 'rp-toolbar';
  const countEl = document.createElement('span');
  countEl.className = 'rp-count';
  countEl.textContent = resumes.length ? `${resumes.length} resume${resumes.length !== 1 ? 's' : ''}` : '';
  toolbar.appendChild(countEl);
  const newBtn = document.createElement('a');
  newBtn.href = '/resume-builder.html?new=1';
  newBtn.className = 'btn-builder-cta';
  newBtn.textContent = '+ New Resume';
  toolbar.appendChild(newBtn);
  panel.appendChild(toolbar);

  if (!resumes.length) {
    const empty = document.createElement('div');
    empty.className = 'rp-empty';
    const msg = document.createElement('p');
    msg.textContent = "You haven't created a resume yet.";
    empty.appendChild(msg);
    panel.appendChild(empty);
    return;
  }
  resumes.forEach(resume => panel.appendChild(buildResumeCard(resume)));
}

function shareResume(name) {
  const title = name ? `${name} — Resume` : 'My Resume';
  const text  = `Check out ${name ? `${name}'s` : 'my'} professional resume`;
  const url   = window.location.origin;
  if (navigator.share) {
    navigator.share({ title, text, url }).catch(() => {});
  } else {
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;
  }
}

function deleteResume(id) {
  if (!confirm('Are you sure you want to delete this resume? This cannot be undone.')) return;
  fetch(`/resume/${id}`, { method: 'DELETE' })
    .then(readJsonResponse)
    .then(result => { alert(result.message); loadResumes(); })
    .catch(err => { alert(`Error: ${err.message}`); });
}

checkSession();
