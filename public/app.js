const authForms    = document.getElementById('auth-forms');
const loginForm    = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const sessionBar   = document.getElementById('session-bar');
const currentUser  = document.getElementById('current-user');
const logoutButton = document.getElementById('logout-button');
const authMessage  = document.getElementById('auth-message');
const appShell     = document.getElementById('app-shell');

function setAuthMessage(message = '') {
    authMessage.textContent = message;
}

function readJsonResponse(response) {
    return response.json()
        .catch(() => ({}))
        .then(result => {
            if (!response.ok) throw new Error(result.message || 'Request failed');
            return result;
        });
}

function showLoggedOut(message = '') {
    authForms.hidden = false;
    sessionBar.hidden = true;
    appShell.hidden = true;
    currentUser.textContent = '';
    setAuthMessage(message);
}

function showLoggedIn(user) {
    authForms.hidden = true;
    sessionBar.hidden = false;
    appShell.hidden = false;
    currentUser.textContent = `Signed in as ${user.email}`;
    setAuthMessage('');
    loadResumes();
}

function checkSession() {
    authForms.hidden = true;
    fetch('/auth/me')
        .then(readJsonResponse)
        .then(data => showLoggedIn(data.user))
        .catch(() => showLoggedOut('Log in or create an account to manage your resume.'));
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    setAuthMessage('');
    fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email:    document.getElementById('login-email').value.trim(),
            password: document.getElementById('login-password').value
        })
    })
        .then(readJsonResponse)
        .then(data => { loginForm.reset(); showLoggedIn(data.user); })
        .catch(err => showLoggedOut(err.message));
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    setAuthMessage('');
    fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email:    document.getElementById('register-email').value.trim(),
            password: document.getElementById('register-password').value
        })
    })
        .then(readJsonResponse)
        .then(data => { registerForm.reset(); showLoggedIn(data.user); })
        .catch(err => showLoggedOut(err.message));
});

logoutButton.addEventListener('click', () => {
    fetch('/auth/logout', { method: 'POST' })
        .then(readJsonResponse)
        .catch(err => console.error('Logout failed:', err))
        .then(() => showLoggedOut('Logged out successfully.'));
});

function loadResumes() {
    fetch('/resume/all')
        .then(readJsonResponse)
        .then(data => renderResume(data.results))
        .catch(error => {
            console.error('Error:', error);
            if (
                error.message === 'Authentication required' ||
                error.message === 'Invalid or expired token'
            ) {
                showLoggedOut('Your session expired. Please log in again.');
                return;
            }
            document.getElementById('resume-panel').textContent = 'Failed to load resume.';
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

    // ── Header band ──
    const header = document.createElement('div');
    header.className = 'rp-header';

    const avatar = document.createElement('div');
    avatar.className = 'rp-avatar';
    avatar.textContent = buildInitials(p.fullName);

    const identity = document.createElement('div');
    identity.className = 'rp-identity';

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

    // ── Metadata body ──
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
        dl.appendChild(dt);
        dl.appendChild(dd);
    }

    const loc = [p.city, p.stateProvince, p.country].filter(Boolean).join(', ');
    addMeta('Location', loc || null);

    if (exp.yearsOfExperience != null) {
        addMeta('Experience', exp.yearsOfExperience === 0
            ? 'Fresher'
            : `${exp.yearsOfExperience} yr${exp.yearsOfExperience !== 1 ? 's' : ''}`);
    }

    const highestEdu = edu.highestEducation || (
        edu.entries?.length
            ? [edu.entries[0].degree, edu.entries[0].institution].filter(Boolean).join(' — ')
            : null
    );
    addMeta('Education', highestEdu);

    const techSkills = skills.technicalSkills?.length ? skills.technicalSkills : null;
    if (techSkills) {
        const preview  = techSkills.slice(0, 5);
        const overflow = techSkills.length > 5 ? ` +${techSkills.length - 5} more` : '';
        addMeta('Skills', preview.join(', ') + overflow);
    }

    body.appendChild(dl);

    if (resume.updatedAt) {
        const updated = document.createElement('p');
        updated.className = 'rp-updated';
        updated.textContent = `Last updated ${new Date(resume.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
        body.appendChild(updated);
    }

    card.appendChild(body);

    // ── Actions bar ──
    const actions = document.createElement('div');
    actions.className = 'rp-actions';

    const editBtn = document.createElement('a');
    editBtn.href = `/resume-builder.html?id=${resume._id}`;
    editBtn.className = 'btn-rp-primary';
    editBtn.textContent = 'Edit Resume';
    actions.appendChild(editBtn);

    const sendBtn = document.createElement('button');
    sendBtn.className = 'btn-rp';
    sendBtn.type = 'button';
    sendBtn.textContent = 'Send';
    sendBtn.addEventListener('click', () => shareResume(p.fullName));
    actions.appendChild(sendBtn);

    const pdfBtn = document.createElement('button');
    pdfBtn.className = 'btn-rp';
    pdfBtn.type = 'button';
    pdfBtn.textContent = 'PDF';
    pdfBtn.addEventListener('click', () => window.print());
    actions.appendChild(pdfBtn);

    const webBtn = document.createElement('button');
    webBtn.className = 'btn-rp';
    webBtn.type = 'button';
    webBtn.textContent = 'Web Page';
    webBtn.addEventListener('click', () => window.open(`/resume/view/${resume._id}`, '_blank'));
    actions.appendChild(webBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-rp-danger';
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteResume(resume._id));
    actions.appendChild(deleteBtn);

    card.appendChild(actions);
    return card;
}

function renderResume(resumes) {
    const panel = document.getElementById('resume-panel');
    panel.innerHTML = '';

    // ── Toolbar: resume count + New Resume button ──
    const toolbar = document.createElement('div');
    toolbar.className = 'rp-toolbar';

    const countEl = document.createElement('span');
    countEl.className = 'rp-count';
    countEl.textContent = resumes.length
        ? `${resumes.length} resume${resumes.length !== 1 ? 's' : ''}`
        : '';
    toolbar.appendChild(countEl);

    const newBtn = document.createElement('a');
    newBtn.href = '/resume-builder.html';
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
        .catch(err => { console.error('Delete failed:', err); alert(`Error: ${err.message}`); });
}

checkSession();
