/* ═══════════════════════════════════════
   FIELD DEFINITIONS — personal section
   (from resumeDB_personal_field_definitions.json, section=personal)
═══════════════════════════════════════ */
const FIELDS = [
  // Identity
  { key:'fullName',               label:'Full Name',                type:'text',     required:true,  cluster:'Identity',   q:'What is your full name?',                    hint:'Exactly as on your official documents' },
  { key:'preferredName',          label:'Preferred Name',           type:'text',     required:false, cluster:'Identity',   q:'What do people call you?',                   hint:'Nickname or first name you prefer' },
  { key:'profileTitle',           label:'Profile Title',            type:'text',     required:false, cluster:'Identity',   q:'What is your professional title?',           hint:'e.g. Senior Software Engineer, Registered Nurse' },
  { key:'dateOfBirth',            label:'Date of Birth',            type:'date',     required:false, cluster:'Identity',   q:'What is your date of birth?',                hint:'Used to calculate age on resume' },
  { key:'placeOfBirth',           label:'Place of Birth',           type:'text',     required:false, cluster:'Identity',   q:'Where were you born?',                       hint:'City and state / country' },
  { key:'gender',                 label:'Gender',                   type:'select',   required:false, cluster:'Identity',   q:'How do you identify?',                       hint:'Optional — commonly listed on Indian resumes',
    options:['Male','Female','Transgender','Non-binary','Prefer not to say'] },
  { key:'maritalStatus',          label:'Marital Status',           type:'select',   required:false, cluster:'Identity',   q:'What is your marital status?',               hint:'Standard field on Indian resume formats',
    options:['Single','Married','Divorced','Separated','Widowed'] },
  { key:'nationality',            label:'Nationality',              type:'text',     required:false, cluster:'Identity',   q:'What is your nationality?',                  hint:'e.g. Indian, Filipino, Kenyan' },
  { key:'citizenship',            label:'Citizenship',              type:'text',     required:false, cluster:'Identity',   q:'What country are you a citizen of?',          hint:'May differ from nationality' },
  { key:'languagesKnown',         label:'Languages Known',          type:'tags',     required:false, cluster:'Identity',   q:'Which languages do you know?',               hint:'Press Enter after each — e.g. Hindi, English, Tamil' },
  // Family
  { key:'fatherName',             label:"Father's Name",            type:'text',     required:false, cluster:'Family',     q:"What is your father's full name?",           hint:'Commonly required on Indian job applications' },
  { key:'motherName',             label:"Mother's Name",            type:'text',     required:false, cluster:'Family',     q:"What is your mother's full name?",           hint:'Optional but often asked' },
  { key:'religion',               label:'Religion',                 type:'text',     required:false, cluster:'Family',     q:'What is your religion?',                     hint:'Optional — common on Indian resumes' },
  { key:'community',              label:'Community / Caste',        type:'text',     required:false, cluster:'Family',     q:'What is your community or caste?',           hint:'Optional — some employers ask for this' },
  { key:'nativePlace',            label:'Native Place',             type:'text',     required:false, cluster:'Family',     q:'What is your native place?',                 hint:'Your hometown or ancestral city' },
  // Contact
  { key:'email',                  label:'Email Address',            type:'email',    required:true,  cluster:'Contact',    q:'What is your primary email address?',        hint:'Employers will use this to contact you' },
  { key:'alternateEmail',         label:'Alternate Email',          type:'email',    required:false, cluster:'Contact',    q:'Do you have a backup email address?',        hint:'Optional — useful if you change jobs frequently' },
  { key:'contactNumber',          label:'Contact Number',           type:'phone',    required:true,  cluster:'Contact',    q:'What is your mobile number?',                hint:'Choose the country code, then enter the number' },
  { key:'alternateContactNumber', label:'Alternate Contact Number', type:'phone',    required:false, cluster:'Contact',    q:'Any alternate phone number?',                hint:'Optional - home or office number' },
  { key:'whatsappNumber',         label:'WhatsApp Number',          type:'phone',    required:false, cluster:'Contact',    q:'Is your WhatsApp number the same?',          hint:'Leave blank if same as contact number' },
  { key:'emergencyContactName',   label:'Emergency Contact Name',   type:'text',     required:false, cluster:'Contact',    q:'Who should we contact in an emergency?',     hint:'Name of a family member or friend' },
  { key:'emergencyContactNumber', label:'Emergency Contact Number', type:'phone',    required:false, cluster:'Contact',    q:'What is their phone number?',                hint:'Choose the country code, then enter the number' },
  // Address
  { key:'address',                label:'Address',                  type:'textarea', required:false, cluster:'Address',    q:'What is your current address?',              hint:'House / flat no., street, locality' },
  { key:'city',                   label:'City',                     type:'text',     required:false, cluster:'Address',    q:'Which city do you currently live in?',       hint:'e.g. Bengaluru, Mumbai, Hyderabad, Chennai' },
  { key:'stateProvince',          label:'State / Province',         type:'text',     required:false, cluster:'Address',    q:'Which state or province?',                   hint:'e.g. Maharashtra, Karnataka, Tamil Nadu' },
  { key:'country',                label:'Country',                  type:'text',     required:false, cluster:'Address',    q:'Which country are you based in?',            hint:'e.g. India, UAE, UK' },
  { key:'postalCode',             label:'Postal Code / PIN',        type:'text',     required:false, cluster:'Address',    q:'What is your postal or PIN code?',           hint:'6-digit PIN for India' },
  { key:'currentLocation',        label:'Current Location',         type:'text',     required:false, cluster:'Address',    q:'Where are you currently located?',           hint:'City or area you\'re in right now' },
  { key:'preferredLocation',      label:'Preferred Job Locations',  type:'tags',     required:false, cluster:'Address',    q:'Which cities are you open to working in?',   hint:'Press Enter after each city or region' },
  // Profile & Preferences
  { key:'profilePhoto',           label:'Profile Photo URL',        type:'url',      required:false, cluster:'Profile',    q:'Do you have a profile photo link?',          hint:'A direct URL to your photo (Google Drive, Dropbox, etc.)' },
  { key:'personalIntroVideo',     label:'Personal Intro Video',     type:'url',      required:false, cluster:'Profile',    q:'Do you have an intro video link?',           hint:'YouTube, Google Drive or Loom link' },
  { key:'personalTagline',        label:'Personal Tagline',         type:'text',     required:false, cluster:'Profile',    q:'How would you describe yourself in one line?', hint:'e.g. "10 years turning complex data into clear decisions"' },
  { key:'residenceType',          label:'Residence Type',           type:'select',   required:false, cluster:'Profile',    q:'What is your current living situation?',     hint:'Relevant for some employers',
    options:['Own house','Rented','Staying with family','PG / Hostel','Company accommodation'] },
  { key:'timeZone',               label:'Time Zone',                type:'timezone', required:false, cluster:'Profile',    q:'What time zone are you in?',                 hint:'Select your current IANA time zone' },
];

/* Wizard cluster order */
const CLUSTERS = ['Identity','Family','Contact','Address','Profile'];
// All wizard step labels in order
const WIZARD_STEPS = [...CLUSTERS, 'Summary', 'Experience', 'Work History', 'Education', 'Skills', 'Links'];
// Which step index each extra section starts at
const WIZ_SUMMARY_IDX     = CLUSTERS.length;          // 5
const WIZ_EXPERIENCE_IDX  = CLUSTERS.length + 1;      // 6
const WIZ_WORKHISTORY_IDX = CLUSTERS.length + 2;      // 7
const WIZ_EDUCATION_IDX   = CLUSTERS.length + 3;      // 8
const WIZ_SKILLS_IDX      = CLUSTERS.length + 4;      // 9
const WIZ_LINKS_IDX       = CLUSTERS.length + 5;      // 10
const SELECT_OPTIONS = {
  gender:        ['Male','Female','Transgender','Non-binary','Prefer not to say'],
  maritalStatus: ['Single','Married','Divorced','Separated','Widowed'],
  residenceType: ['Own house','Rented','Staying with family','PG / Hostel','Company accommodation'],
};

const SUMMARY_FIELDS = [
  { key:'professionalHeadline', label:'Professional Headline', type:'text', required:false, cluster:'Core', q:'What headline should introduce you?', hint:'e.g. Full-stack developer focused on reliable business tools' },
  { key:'professionalSummary', label:'Professional Summary', type:'textarea', required:true, cluster:'Core', q:'How would you summarize your professional background?', hint:'2-4 concise sentences covering your role, strengths, and domain experience' },
  { key:'careerObjective', label:'Career Objective', type:'textarea', required:false, cluster:'Direction', q:'What role or opportunity are you targeting?', hint:'Useful for entry-level candidates, career changes, or focused applications' },
  { key:'valueProposition', label:'Value Proposition', type:'textarea', required:false, cluster:'Core', q:'What value do you bring to an employer?', hint:'Lead with outcomes, strengths, and the problems you solve' },
  { key:'careerHighlights', label:'Career Highlights', type:'tags', required:false, cluster:'Proof', q:'What career highlights should stand out?', hint:'Press Enter after each highlight' },
  { key:'keyAchievements', label:'Key Achievements', type:'tags', required:false, cluster:'Proof', q:'Which achievements should be featured?', hint:'Use measurable wins where possible' },
  { key:'elevatorPitch', label:'Elevator Pitch', type:'textarea', required:false, cluster:'Core', q:'What is your short pitch?', hint:'A compact version of your summary for intros and profile previews' },
  { key:'executiveSummary', label:'Executive Summary', type:'textarea', required:false, cluster:'Advanced', q:'Do you need an executive-level summary?', hint:'Best for senior, leadership, or consulting profiles' },
  { key:'personalStatement', label:'Personal Statement', type:'textarea', required:false, cluster:'Direction', q:'What personal statement should the resume include?', hint:'More personal than the professional summary; use only when the template calls for it' },
  { key:'careerMission', label:'Career Mission', type:'textarea', required:false, cluster:'Direction', q:'What mission guides your career?', hint:'Optional; useful for purpose-led roles' },
  { key:'careerVision', label:'Career Vision', type:'textarea', required:false, cluster:'Direction', q:'What long-term career vision should be shown?', hint:'Optional; keep it practical and role-relevant' },
  { key:'careerChangeReason', label:'Career Change Reason', type:'textarea', required:false, cluster:'Context', q:'Are you explaining a career change?', hint:'Frame the change positively around transferable skills' },
  { key:'employmentGapExplanation', label:'Employment Gap Explanation', type:'textarea', required:false, cluster:'Context', q:'Do you need to explain an employment gap?', hint:'Keep it brief, factual, and forward-looking' },
  { key:'portfolioSummary', label:'Portfolio Summary', type:'textarea', required:false, cluster:'Proof', q:'How should your portfolio be summarized?', hint:'Mention the type of work, scope, and strongest examples' }
];
const GUIDED_FIELDS = [...FIELDS, ...SUMMARY_FIELDS];

/* ═══════════════════════════════════════
   EXPERIENCE FIELDS (flat metadata about career)
═══════════════════════════════════════ */
const EXPERIENCE_FIELDS = [
  { key:'currentDesignation',   label:'Current Designation',    type:'text',     cluster:'Current Role',    q:'What is your current job title?',              hint:'e.g. Senior Software Engineer' },
  { key:'currentCompany',       label:'Current Company',        type:'text',     cluster:'Current Role',    q:'Where do you currently work?',                 hint:'Full legal name of the company' },
  { key:'yearsOfExperience',    label:'Years of Experience',    type:'number',   cluster:'Current Role',    q:'How many years of experience do you have?',    hint:'Total professional experience in years' },
  { key:'employmentType',       label:'Employment Type',        type:'select',   cluster:'Current Role',    q:'What is your current employment type?',        hint:'Full-time, part-time, contract, etc.',
    options:['Full-Time','Part-Time','Contract','Freelance','Internship','Self-Employed','Temporary','Volunteer'] },
  { key:'desiredJobTitle',      label:'Desired Job Title',      type:'text',     cluster:'Career Goals',    q:'What job title are you targeting?',            hint:'The role you want next' },
  { key:'expectedSalary',       label:'Expected Salary',        type:'text',     cluster:'Career Goals',    q:'What salary are you expecting?',               hint:'e.g. 12 LPA or $80,000/year' },
  { key:'currentSalary',        label:'Current Salary',         type:'text',     cluster:'Career Goals',    q:'What is your current salary?',                 hint:'Optional — useful for negotiations' },
  { key:'noticePeriod',         label:'Notice Period',          type:'text',     cluster:'Career Goals',    q:'What is your notice period?',                  hint:'e.g. 30 days, Immediate, 3 months' },
  { key:'targetIndustry',       label:'Target Industries',      type:'tags',     cluster:'Career Goals',    q:'Which industries are you targeting?',           hint:'Press Enter after each — e.g. FinTech, Healthcare' },
  { key:'industryExperience',   label:'Industries Worked In',   type:'tags',     cluster:'Current Role',    q:'Which industries have you worked in?',          hint:'Press Enter after each industry' },
  { key:'targetCompanyType',    label:'Target Company Type',    type:'select',   cluster:'Career Goals',    q:'What type of company do you prefer?',          hint:'Start-up, MNC, Government, etc.',
    options:['Start-up','SME','Large Enterprise','MNC','Government / PSU','NGO / Non-profit','Consulting Firm','Any'] },
  { key:'targetSeniority',      label:'Target Seniority Level', type:'select',   cluster:'Career Goals',    q:'What seniority level are you targeting?',       hint:'Entry, Mid, Senior, Lead, etc.',
    options:['Entry-Level','Associate','Mid-Level','Senior','Lead / Principal','Manager','Director','VP / C-Suite'] },
  { key:'availabilityDate',     label:'Available From',         type:'date',     cluster:'Availability',   q:'When are you available to start?',             hint:'Leave blank if immediately available' },
  { key:'openToContract',       label:'Open to Contract',       type:'select',   cluster:'Availability',   q:'Are you open to contract work?',               hint:'Select Yes or No',
    options:['Yes','No'] },
  { key:'openToPartTime',       label:'Open to Part-Time',      type:'select',   cluster:'Availability',   q:'Are you open to part-time roles?',             hint:'Select Yes or No',
    options:['Yes','No'] },
  { key:'openToOverseasWork',   label:'Open to Overseas Work',  type:'select',   cluster:'Availability',   q:'Are you open to working overseas?',            hint:'Select Yes or No',
    options:['Yes','No'] },
];

/* ═══════════════════════════════════════
   WORK HISTORY — per-entry fields
═══════════════════════════════════════ */
const WORK_ENTRY_FIELDS = [
  { key:'company',        label:'Company',          type:'text',   required:true  },
  { key:'title',          label:'Job Title',        type:'text',   required:true  },
  { key:'department',     label:'Department',       type:'text',   required:false },
  { key:'location',       label:'Location',         type:'text',   required:false },
  { key:'startDate',      label:'Start Date',       type:'date',   required:true  },
  { key:'endDate',        label:'End Date',         type:'date',   required:false },
  { key:'isCurrent',      label:'Currently Here',   type:'select', required:false, options:['Yes','No'] },
  { key:'employmentType', label:'Employment Type',  type:'select', required:true,
    options:['Full-Time','Part-Time','Contract','Freelance','Internship','Self-Employed','Temporary','Volunteer'] },
  { key:'description',    label:'Description',      type:'textarea',required:false },
  { key:'achievements',   label:'Achievements',     type:'tags',   required:true  },
  { key:'skillsUsed',     label:'Skills Used',      type:'tags',   required:true  },
];

/* ═══════════════════════════════════════
   EDUCATION FIELDS (flat + entries)
═══════════════════════════════════════ */
const EDUCATION_FLAT_FIELDS = [
  { key:'highestEducation',      label:'Highest Education',      type:'text',   cluster:'Overview',  q:'What is your highest level of education?',       hint:'e.g. Master of Science, B.Tech, MBA' },
  { key:'educationMode',         label:'Education Mode',         type:'select', cluster:'Overview',  q:'How did you study?',                             hint:'Full-time, distance, online, etc.',
    options:['Full-Time','Part-Time','Distance / Correspondence','Online','Self-Study'] },
  { key:'academicAchievements',  label:'Academic Achievements',  type:'tags',   cluster:'Overview',  q:'Any academic awards or honours?',                hint:'Press Enter after each — e.g. Gold Medalist, Dean\'s List' },
  { key:'thesisTitle',           label:'Thesis / Dissertation',  type:'text',   cluster:'Research',  q:'Did you write a thesis or dissertation?',        hint:'Enter the title if applicable' },
  { key:'researchArea',          label:'Research Area',          type:'text',   cluster:'Research',  q:'What was your research focus area?',             hint:'e.g. Machine Learning, Molecular Biology' },
];

const EDU_ENTRY_FIELDS = [
  { key:'level',        label:'Education Level',  type:'text',   required:true  },
  { key:'degree',       label:'Degree / Qualification', type:'text', required:true },
  { key:'institution',  label:'Institution',       type:'text',   required:true  },
  { key:'fieldOfStudy', label:'Field of Study',    type:'text',   required:false },
  { key:'year',         label:'Year of Completion',type:'number', required:true  },
  { key:'gradeOrGpa',   label:'Grade / GPA',       type:'text',   required:false },
  { key:'duration',     label:'Duration',          type:'text',   required:false },
];

/* ═══════════════════════════════════════
   SKILLS FIELDS (all tag arrays)
═══════════════════════════════════════ */
const SKILLS_FIELDS = [
  { key:'technicalSkills',       label:'Technical Skills',        type:'tags', cluster:'Core Skills',    q:'What are your main technical skills?',           hint:'Press Enter after each — e.g. Python, SQL, AWS' },
  { key:'softSkills',            label:'Soft Skills',             type:'tags', cluster:'Core Skills',    q:'What are your soft skills?',                    hint:'Press Enter after each — e.g. Leadership, Communication' },
  { key:'computerSkills',        label:'Computer Skills',         type:'tags', cluster:'Core Skills',    q:'Which computer applications do you know?',       hint:'Press Enter after each — e.g. MS Office, AutoCAD' },
  { key:'softwareTools',         label:'Software & Tools',        type:'tags', cluster:'Tools',          q:'Which software tools do you use?',               hint:'e.g. Jira, Figma, Salesforce, SAP' },
  { key:'analyticalSkills',      label:'Analytical Skills',       type:'tags', cluster:'Thinking',       q:'List your analytical skills',                   hint:'e.g. Data Analysis, Root Cause Analysis' },
  { key:'problemSolvingSkills',  label:'Problem-Solving Skills',  type:'tags', cluster:'Thinking',       q:'What problem-solving skills do you have?',       hint:'e.g. Critical Thinking, Design Thinking' },
  { key:'leadershipSkills',      label:'Leadership Skills',       type:'tags', cluster:'Management',     q:'What leadership skills do you possess?',         hint:'e.g. Team Building, Conflict Resolution' },
  { key:'managementSkills',      label:'Management Skills',       type:'tags', cluster:'Management',     q:'What management skills do you have?',            hint:'e.g. Project Management, Budget Planning' },
  { key:'communicationSkills',   label:'Communication Skills',    type:'tags', cluster:'Interpersonal',  q:'List your communication skills',                hint:'e.g. Presentation, Negotiation, Public Speaking' },
  { key:'languageSkills',        label:'Language Skills',         type:'tags', cluster:'Languages',      q:'Which languages do you speak professionally?',   hint:'e.g. English (Fluent), Hindi (Native)' },
  { key:'digitalSkills',         label:'Digital Skills',          type:'tags', cluster:'Tools',          q:'What digital / online skills do you have?',     hint:'e.g. SEO, Social Media, Google Ads' },
  { key:'creativeSkills',        label:'Creative Skills',         type:'tags', cluster:'Creative',       q:'What creative skills do you have?',              hint:'e.g. Graphic Design, Video Editing, UI/UX' },
  { key:'typingSpeed',           label:'Typing Speed',            type:'text', cluster:'Core Skills',    q:'What is your typing speed?',                    hint:'e.g. 60 WPM' },
];

/* ═══════════════════════════════════════
   LINKS FIELDS
═══════════════════════════════════════ */
const LINKS_FIELDS = [
  { key:'linkedinProfile',      label:'LinkedIn Profile',      type:'url', cluster:'Professional', q:'What is your LinkedIn profile URL?',            hint:'linkedin.com/in/yourname' },
  { key:'githubProfile',        label:'GitHub Profile',        type:'url', cluster:'Professional', q:'What is your GitHub profile URL?',              hint:'github.com/yourname' },
  { key:'portfolioWebsite',     label:'Portfolio Website',     type:'url', cluster:'Professional', q:'Do you have a portfolio website?',              hint:'A site showcasing your work' },
  { key:'personalWebsite',      label:'Personal Website',      type:'url', cluster:'Professional', q:'Do you have a personal website or blog?',       hint:'Any personal site you maintain' },
  { key:'behanceProfile',       label:'Behancé Profile',       type:'url', cluster:'Creative',     q:'Do you have a Behancé profile?',                hint:'For designers and creative professionals' },
  { key:'dribbbleProfile',      label:'Dribbble Profile',      type:'url', cluster:'Creative',     q:'Do you have a Dribbble profile?',               hint:'For UI/UX and graphic designers' },
  { key:'stackoverflowProfile', label:'Stack Overflow',        type:'url', cluster:'Professional', q:'What is your Stack Overflow profile URL?',      hint:'stackoverflow.com/users/...' },
  { key:'youtubeChannel',       label:'YouTube Channel',       type:'url', cluster:'Social',       q:'Do you have a YouTube channel?',                hint:'youtube.com/@yourname' },
  { key:'mediumProfile',        label:'Medium Profile',        type:'url', cluster:'Social',       q:'Do you write on Medium?',                       hint:'medium.com/@yourname' },
  { key:'twitterProfile',       label:'X / Twitter Profile',   type:'url', cluster:'Social',       q:'What is your X / Twitter profile URL?',         hint:'x.com/yourname' },
  { key:'instagramProfile',     label:'Instagram Profile',     type:'url', cluster:'Social',       q:'What is your Instagram URL?',                   hint:'instagram.com/yourname' },
  { key:'researchGateProfile',  label:'ResearchGate Profile',  type:'url', cluster:'Academic',     q:'Do you have a ResearchGate profile?',           hint:'For researchers and academics' },
];

/* ═══════════════════════════════════════
   SHARED STATE
═══════════════════════════════════════ */
// Section data stores
const experienceData = {};   // flat experience fields
let workHistory = [];        // array of work entry objects
const educationData = {};    // flat education fields
let educationEntries = [];   // array of edu entry objects
const skillsData = {};       // all skills tag arrays + typingSpeed
const linksData = {};        // all link URL fields

let countryCallingCodes = [];
let timeZones = [];
const DEFAULT_CALLING_CODE = '+91';

const formData = {};   // { fieldKey: value or [] }
const summaryData = {};
let activeMode = 'wizard';
let activeDashSection = 'personal';

/* ═══════════════════════════════════════
   UTILS
═══════════════════════════════════════ */
function getVal(key){ return formData[key] ?? null; }
function isSummaryField(fieldOrKey){
  const key = typeof fieldOrKey === 'string' ? fieldOrKey : fieldOrKey?.key;
  return SUMMARY_FIELDS.some(f => f.key === key);
}
function getGuidedData(fieldOrKey){
  return isSummaryField(fieldOrKey) ? summaryData : formData;
}
function getGuidedVal(fieldOrKey){
  const key = typeof fieldOrKey === 'string' ? fieldOrKey : fieldOrKey?.key;
  return getGuidedData(key)[key] ?? null;
}
function setGuidedVal(fieldOrKey, val){
  const key = typeof fieldOrKey === 'string' ? fieldOrKey : fieldOrKey?.key;
  const data = getGuidedData(key);
  if(val === '' || val === null || (Array.isArray(val) && val.length===0)){
    delete data[key];
  } else {
    data[key] = val;
  }
  updatePct();
}
function getWizardStepFields(step){
  if(step < CLUSTERS.length)     return FIELDS.filter(f => f.cluster === CLUSTERS[step]);
  if(step === WIZ_SUMMARY_IDX)   return SUMMARY_FIELDS;
  if(step === WIZ_EXPERIENCE_IDX) return EXPERIENCE_FIELDS;
  if(step === WIZ_SKILLS_IDX)    return SKILLS_FIELDS;
  if(step === WIZ_LINKS_IDX)     return LINKS_FIELDS;
  if(step === WIZ_EDUCATION_IDX) return EDUCATION_FLAT_FIELDS;
  return []; // work history and education entries handled specially
}
function getWizardStepData(step){
  if(step < CLUSTERS.length)     return formData;
  if(step === WIZ_SUMMARY_IDX)   return summaryData;
  if(step === WIZ_EXPERIENCE_IDX) return experienceData;
  if(step === WIZ_SKILLS_IDX)    return skillsData;
  if(step === WIZ_LINKS_IDX)     return linksData;
  if(step === WIZ_EDUCATION_IDX) return educationData;
  return {};
}
function getWizardVal(step, key){
  return getWizardStepData(step)[key] ?? null;
}
function setWizardVal(step, key, val){
  const data = getWizardStepData(step);
  if(val === '' || val === null || (Array.isArray(val) && val.length===0)){
    delete data[key];
  } else {
    data[key] = val;
  }
  updatePct();
}
function activeDashFields(){
  switch(activeDashSection){
    case 'summary':    return SUMMARY_FIELDS;
    case 'experience': return EXPERIENCE_FIELDS;
    case 'skills':     return SKILLS_FIELDS;
    case 'links':      return LINKS_FIELDS;
    case 'education':  return EDUCATION_FLAT_FIELDS;
    default:           return FIELDS;
  }
}
function activeDashData(){
  switch(activeDashSection){
    case 'summary':    return summaryData;
    case 'experience': return experienceData;
    case 'skills':     return skillsData;
    case 'links':      return linksData;
    case 'education':  return educationData;
    default:           return formData;
  }
}
function getDashVal(key){ return activeDashData()[key] ?? null; }
function setDashVal(key, val){
  const data = activeDashData();
  if(val === '' || val === null || (Array.isArray(val) && val.length===0)){
    delete data[key];
  } else {
    data[key] = val;
  }
  updatePct();
}
function setVal(key, val){
  if(val === '' || val === null || (Array.isArray(val) && val.length===0)){
    delete formData[key];
  } else {
    formData[key] = val;
  }
  updatePct();
}
function pctFilled(){
  const filled = FIELDS.filter(f => {
    const v = formData[f.key];
    return v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length===0);
  }).length;
  return Math.round((filled/FIELDS.length)*100);
}
function pctFor(fields, data){
  if(!fields.length) return 0;
  const filled = fields.filter(f => {
    const v = data[f.key];
    return v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length===0);
  }).length;
  return Math.round((filled/fields.length)*100);
}
function updatePct(){
  const p = pctFilled();
  const summaryPct    = pctFor(SUMMARY_FIELDS,    summaryData);
  const experiencePct = pctFor(EXPERIENCE_FIELDS, experienceData);
  const educationPct  = pctFor(EDUCATION_FLAT_FIELDS, educationData);
  const skillsPct     = pctFor(SKILLS_FIELDS,     skillsData);
  const linksPct      = pctFor(LINKS_FIELDS,       linksData);
  document.getElementById('pct-label').textContent = p+'%';
  // dash
  const db = document.getElementById('dash-pct');
  if(db) db.textContent = p+'%';
  const dbar = document.getElementById('dash-pct-bar');
  if(dbar) dbar.style.width = p+'%';
  const setPct = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val+'%'; };
  setPct('dnav-pct-personal',   p);
  setPct('dnav-pct-summary',    summaryPct);
  setPct('dnav-pct-experience', experiencePct);
  setPct('dnav-pct-education',  educationPct);
  setPct('dnav-pct-skills',     skillsPct);
  setPct('dnav-pct-links',      linksPct);
  // work history / education entries shown as count
  const whEl = document.getElementById('dnav-pct-workhistory');
  if(whEl) whEl.textContent = workHistory.length ? workHistory.length+' jobs' : '—';
  const eeEl = document.getElementById('dnav-pct-eduentries');
  if(eeEl) eeEl.textContent = educationEntries.length ? educationEntries.length+' entries' : '—';
  // chat
  const cp = document.getElementById('chat-prog-pct');
  if(cp) cp.textContent = p+'%';
  const fill = document.getElementById('chat-prog-fill');
  if(fill) fill.style.width = p+'%';
  // avatar letter
  const av = document.getElementById('dash-avatar');
  const nm = document.getElementById('dash-name');
  if(av && formData.fullName){
    av.textContent = formData.fullName.charAt(0).toUpperCase();
    if(nm) nm.textContent = formData.fullName;
  }
}
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2200);
}

function escapeAttr(value = ''){
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function normalizeInputValue(f, value){
  if(value === undefined || value === null) return '';
  if(f?.type === 'date' && value){
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? String(value).slice(0, 10) : date.toISOString().slice(0, 10);
  }
  return value;
}

function sortedCallingCodes(){
  return [...countryCallingCodes].sort((a, b) => a.name.localeCompare(b.name));
}

function defaultCallingCode(){
  return countryCallingCodes.find(c => c.callingCode === DEFAULT_CALLING_CODE) || countryCallingCodes[0] || null;
}

function optionsForField(f){
  if(f.type === 'timezone'){
    return timeZones.map(tz => ({ value: tz.name, label: tz.label }));
  }
  return (f.options || SELECT_OPTIONS[f.key] || []).map(value => ({ value, label: value }));
}

function longOptionField(f){
  return f.type === 'timezone' || optionsForField(f).length > 12;
}

function optionSelectHtml(f, id, currentVal, className = 'finput'){
  const opts = optionsForField(f);
  if(currentVal && !opts.some(o => o.value === currentVal)){
    opts.unshift({ value: currentVal, label: currentVal });
  }
  const placeholder = f.type === 'timezone' && opts.length === 0 ? 'Loading time zones...' : 'Select...';
  const disabled = f.type === 'timezone' && opts.length === 0 ? 'disabled' : '';
  const options = opts.map(o=>`<option value="${escapeAttr(o.value)}" ${currentVal===o.value?'selected':''}>${escapeAttr(o.label)}</option>`).join('');
  return `<select id="${id}" class="${className}" ${disabled}><option value="">${placeholder}</option>${options}</select>`;
}

function parsePhoneValue(value){
  const raw = String(value || '').trim();
  const countriesByCodeLength = [...countryCallingCodes].sort((a, b) => b.callingCode.length - a.callingCode.length);
  const matched = countriesByCodeLength.find(c => raw === c.callingCode || raw.startsWith(c.callingCode));
  if(matched){
    return {
      iso2: matched.iso2,
      callingCode: matched.callingCode,
      number: raw.slice(matched.callingCode.length).replace(/^[\s-]+/, '').trim()
    };
  }
  const fallback = defaultCallingCode();
  return {
    iso2: fallback?.iso2 || '',
    callingCode: fallback?.callingCode || '',
    number: raw.replace(/^\+\d{1,4}[\s-]*/, '')
  };
}

function normalizePhoneNumber(country, number){
  let cleaned = String(number || '').replace(/[^\d]/g, '');
  if(country?.phoneRule?.removeLeadingTrunkZero !== false){
    cleaned = cleaned.replace(/^0+/, '');
  }
  return cleaned;
}

function countryFlag(country){
  const iso2 = String(country?.iso2 || '').trim().toUpperCase();
  if(!/^[A-Z]{2}$/.test(iso2)) return '';
  return iso2;
}

function countryFlagImg(country){
  const iso2 = countryFlag(country);
  if(!iso2) return '';
  const src = String(country?.flagImageDataUrl || '').trim();
  const fallback = `<span class="phone-flag-text" aria-label="${escapeAttr(iso2)} flag">${escapeAttr(iso2)}</span>`;
  if(!src) return fallback;
  return `<img class="phone-flag-img" src="${escapeAttr(src)}" alt="${escapeAttr(iso2)} flag" loading="lazy">`;
}

function phoneCountryOptionsHtml(currentIso2){
  const countries = sortedCallingCodes();
  if(countries.length === 0){
    return '<div class="phone-country-empty">Loading countries...</div>';
  }
  return countries.map(c => {
    const selected = c.iso2 === currentIso2 ? ' aria-selected="true"' : '';
    return `<button type="button" class="phone-country-option" data-iso2="${escapeAttr(c.iso2)}" role="option"${selected} onclick="selectPhoneCountry(this)">
      ${countryFlagImg(c)}
      <span>${escapeAttr(c.name)}</span>
      <strong>${escapeAttr(c.callingCode)}</strong>
    </button>`;
  }).join('');
}

function selectedPhoneCountry(select){
  if(!select) return null;
  return countryCallingCodes.find(c => c.iso2 === select.value) || defaultCallingCode();
}

function updatePhoneCodePreview(select){
  const wrap = select?.closest('.phone-input');
  if(!wrap) return;
  const country = selectedPhoneCountry(select);
  const flag = wrap.querySelector('.phone-country-button .phone-flag-img, .phone-country-button .phone-flag-text');
  const label = wrap.querySelector('.phone-country-label');
  const preview = wrap.querySelector('.phone-code');
  if(flag && country?.iso2){
    flag.outerHTML = countryFlagImg(country);
  }
  if(label) label.textContent = country?.name || 'Select country';
  if(preview) preview.textContent = country?.callingCode || '';
}

function onPhoneCountryChange(select){
  updatePhoneCodePreview(select);
  select.dispatchEvent(new Event('input', { bubbles: true }));
}

function togglePhoneCountryMenu(button){
  const picker = button.closest('.phone-country');
  const isOpen = picker?.classList.contains('open');
  document.querySelectorAll('.phone-country.open').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.phone-country-button')?.setAttribute('aria-expanded', 'false');
  });
  if(picker && !isOpen){
    picker.classList.add('open');
    button.setAttribute('aria-expanded', 'true');
  }
}

function selectPhoneCountry(button){
  const picker = button.closest('.phone-country');
  const input = picker?.querySelector('[data-phone-key]');
  if(!input) return;
  input.value = button.dataset.iso2 || '';
  picker.querySelectorAll('.phone-country-option').forEach(opt => opt.removeAttribute('aria-selected'));
  button.setAttribute('aria-selected', 'true');
  picker.classList.remove('open');
  picker.querySelector('.phone-country-button')?.setAttribute('aria-expanded', 'false');
  onPhoneCountryChange(input);
}

function hydratePhoneControls(){
  document.querySelectorAll('input[data-phone-key]').forEach(select => {
    const key = select.dataset.phoneKey;
    const parsed = parsePhoneValue(formData[key] || select.dataset.currentValue || '');
    if(parsed.iso2) select.value = parsed.iso2;
    const picker = select.closest('.phone-country');
    const menu = picker?.querySelector('.phone-country-menu');
    if(menu) menu.innerHTML = phoneCountryOptionsHtml(parsed.iso2);
    updatePhoneCodePreview(select);
  });
}

function loadCountryCallingCodes(){
  return fetch('/countries/calling-codes')
    .then(res => res.ok ? res.json() : Promise.reject(new Error('Could not load countries')))
    .then(data => {
      countryCallingCodes = Array.isArray(data.results) ? data.results : [];
      hydratePhoneControls();
    })
    .catch(err => {
      console.error('[loadCountryCallingCodes] Failed:', err);
      showToast('Could not load country calling codes');
    });
}

function loadTimeZones(){
  return fetch('/timezones')
    .then(res => res.ok ? res.json() : Promise.reject(new Error('Could not load time zones')))
    .then(data => {
      timeZones = Array.isArray(data.results) ? data.results : [];
      // Re-render any timezone selects that were built before data arrived
      const tzField = FIELDS.find(f => f.type === 'timezone');
      if(tzField){
        const sel = document.getElementById('wiz_' + tzField.key);
        if(sel && sel.disabled){
          const currentVal = formData[tzField.key] || '';
          sel.outerHTML = optionSelectHtml(tzField, 'wiz_' + tzField.key, currentVal);
        }
      }
    })
    .catch(err => {
      console.error('[loadTimeZones] Failed:', err);
      showToast('Could not load time zones');
    });
}

/* ═══════════════════════════════════════
   BUILD FIELD INPUT HTML
═══════════════════════════════════════ */
function buildInput(f, idPrefix, currentVal){
  const id = idPrefix + f.key;
  const inputVal = normalizeInputValue(f, currentVal);
  if(f.type === 'phone'){
    const parsed = parsePhoneValue(currentVal);
    const phoneNumber = escapeAttr(parsed.number);
    const country = countryCallingCodes.find(c => c.iso2 === parsed.iso2) || defaultCallingCode();
    const code = escapeAttr(parsed.callingCode);
    return `<div class="phone-input">
      <div class="phone-country">
        <input type="hidden" id="${id}_country" data-phone-key="${f.key}" data-current-value="${escapeAttr(inputVal || '')}" value="${escapeAttr(parsed.iso2)}">
        <button type="button" class="phone-country-button" onclick="togglePhoneCountryMenu(this)" aria-haspopup="listbox" aria-expanded="false">
          ${countryFlagImg(country)}
          <span class="phone-country-label">${escapeAttr(country?.name || 'Select country')}</span>
          <span class="phone-code">${code}</span>
          <span class="phone-country-caret">⌄</span>
        </button>
        <div class="phone-country-menu" role="listbox">
          ${phoneCountryOptionsHtml(parsed.iso2)}
        </div>
      </div>
      <input type="tel" id="${id}" class="finput phone-number-input" value="${phoneNumber}" placeholder="Phone number">
    </div>`;
  }
  if(f.type === 'tags'){
    const pills = (Array.isArray(currentVal) ? currentVal : [])
      .map(v=>`<span class="tag-pill">${escapeAttr(v)}<button class="rx" onclick="removeTag(this)">×</button></span>`).join('');
    return `<div class="tag-wrap" id="${id}-wrap" onclick="this.querySelector('input').focus()">
      ${pills}
      <input id="${id}" placeholder="Type and press Enter or comma..." onkeydown="tagKeydown(event,'${id}-wrap')" onblur="tagBlur(this,'${id}-wrap')">
    </div>`;
  }
  if(f.type === 'select' || f.type === 'timezone'){
    return optionSelectHtml(f, id, currentVal);
  }
  if(f.type === 'textarea'){
    return `<textarea id="${id}" class="finput" placeholder="${f.label}…" rows="3">${inputVal||''}</textarea>`;
  }
  return `<input type="${f.type||'text'}" id="${id}" class="finput" value="${inputVal||''}" placeholder="${f.label}…">`;
}
function readInput(f, idPrefix){
  const id = idPrefix + f.key;
  if(f.type === 'phone'){
    const select = document.getElementById(id + '_country');
    const input = document.getElementById(id);
    const country = selectedPhoneCountry(select);
    const number = normalizePhoneNumber(country, input ? input.value.trim() : '');
    if(!number) return '';
    return [country?.callingCode, number].filter(Boolean).join('');
  }
  if(f.type === 'tags'){
    const wrap = document.getElementById(id+'-wrap');
    return wrap ? [...wrap.querySelectorAll('.tag-pill')].map(p=>p.childNodes[0].textContent.trim()) : [];
  }
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}
function syncSelectInput(f, idPrefix){
  const el = document.getElementById(idPrefix + f.key);
  if (el && formData[f.key] !== undefined) {
    el.value = formData[f.key];
  }
}
function syncWizardInputs(fields, data){
  fields.forEach(f => {
    const id = 'wiz_' + f.key;
    if (f.type === 'phone') {
      const parsed = parsePhoneValue(data[f.key]);
      const country = document.getElementById(id + '_country');
      const input = document.getElementById(id);
      if (country && parsed.iso2) {
        country.value = parsed.iso2;
        updatePhoneCodePreview(country);
      }
      if (input) input.value = parsed.number;
    } else if (f.type === 'tags') {
      const wrap = document.getElementById(id + '-wrap');
      if (wrap && Array.isArray(data[f.key])) {
        const inp = wrap.querySelector('input');
        [...wrap.querySelectorAll('.tag-pill')].forEach(p => p.remove());
        data[f.key].forEach(val => {
          const pill = document.createElement('span');
          pill.className = 'tag-pill';
          pill.textContent = val;
          const rx = document.createElement('button');
          rx.className = 'rx';
          rx.textContent = 'x';
          rx.onclick = () => removeTag(rx);
          pill.appendChild(rx);
          wrap.insertBefore(pill, inp);
        });
      }
    } else if (f.type === 'select' || f.type === 'timezone') {
      const el = document.getElementById(id);
      if (el && data[f.key] !== undefined) {
        el.value = data[f.key];
      }
    } else {
      const el = document.getElementById(id);
      if (el && data[f.key] !== undefined) {
        const val = f.type === 'date' && data[f.key]
          ? new Date(data[f.key]).toISOString().slice(0, 10)
          : data[f.key];
        el.value = val;
      }
    }
  });
}
function tagKeydown(e, wrapId){
  if(e.key !== 'Enter' && e.key !== ',') return;
  e.preventDefault();
  const inp = e.target;
  const val = inp.value.trim().replace(/,$/,'');
  if(!val) return;
  const pill = document.createElement('span');
  pill.className = 'tag-pill';
  pill.textContent = val;
  const rx = document.createElement('button');
  rx.className = 'rx';
  rx.textContent = 'x';
  rx.onclick = () => removeTag(rx);
  pill.appendChild(rx);
  inp.parentElement.insertBefore(pill, inp);
  inp.value = '';
}
function tagBlur(inp, wrapId){
  const val = inp.value.trim().replace(/,$/,'');
  if(!val) return;
  const wrap = document.getElementById(wrapId);
  if(!wrap) return;
  const pill = document.createElement('span');
  pill.className = 'tag-pill';
  pill.textContent = val;
  const rx = document.createElement('button');
  rx.className = 'rx';
  rx.textContent = 'x';
  rx.onclick = () => removeTag(rx);
  pill.appendChild(rx);
  wrap.insertBefore(pill, inp);
  inp.value = '';
}
function removeTag(btn){ btn.parentElement.remove(); }

/* ═══════════════════════════════════════
   MODE SWITCH
═══════════════════════════════════════ */
const MODE_ACCENTS = {
  wizard:    '#922b21',
  dashboard: '#1a7a8c',
  chat:      '#2a6fdb',
  focus:     '#b8700a',
};
function switchMode(mode){
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.mtab').forEach(t=>t.classList.remove('active'));
  document.getElementById('panel-'+mode).classList.add('active');
  document.querySelector('[data-mode='+mode+']').classList.add('active');
  activeMode = mode;
  const accent = MODE_ACCENTS[mode] || '#1a7a8c';
  document.documentElement.style.setProperty('--accent', accent);
  if(mode==='wizard'){
    syncWizardSection(FIELDS,               formData,        'wiz_');
    syncWizardSection(SUMMARY_FIELDS,        summaryData,     'wiz_');
    syncWizardSection(EXPERIENCE_FIELDS,     experienceData,  'wiz_');
    syncWizardSection(EDUCATION_FLAT_FIELDS, educationData,   'wiz_');
    syncWizardSection(SKILLS_FIELDS,         skillsData,      'wiz_');
    syncWizardSection(LINKS_FIELDS,          linksData,       'wiz_');
  }
  if(mode==='dashboard') renderDashCards();
  if(mode==='chat' && !chatInited) initChat();
  if(mode==='focus') initFocus();
}
function buildSectionPayload(fields, data){
  const out = {};
  fields.forEach(f => {
    const v = data[f.key];
    if(Array.isArray(v) && f.type !== 'tags') return;
    if(v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0)){
      out[f.key] = v;
    }
  });
  return out;
}
function saveAll(){
  workHistory.forEach((_,i) => syncWhTags(i));
  const personal    = buildSectionPayload(FIELDS,             formData);
  const summary     = buildSectionPayload(SUMMARY_FIELDS,     summaryData);
  const experience  = buildSectionPayload(EXPERIENCE_FIELDS,  experienceData);
  const education   = buildSectionPayload(EDUCATION_FLAT_FIELDS, educationData);
  const skills      = buildSectionPayload(SKILLS_FIELDS,      skillsData);
  const links       = buildSectionPayload(LINKS_FIELDS,       linksData);

  // Convert boolean-like select fields in experience
  ['openToContract','openToPartTime','openToOverseasWork'].forEach(k => {
    if(experience[k] !== undefined) experience[k] = experience[k] === 'Yes';
  });

  // workHistory entries — skip incomplete entries (required fields missing), convert isCurrent
  const workHistoryPayload = workHistory
    .filter(e => e.company && e.title && e.startDate && e.employmentType)
    .map(e => ({
      ...e,
      isCurrent: e.isCurrent === 'Yes' || e.isCurrent === true,
      achievements: Array.isArray(e.achievements) ? e.achievements : [],
      skillsUsed:   Array.isArray(e.skillsUsed)   ? e.skillsUsed   : [],
    }));

  // educationEntries — skip incomplete entries (required fields missing)
  const educationEntriesPayload = educationEntries
    .filter(e => e.level && e.institution && e.degree && e.year);

  const resumeId = new URLSearchParams(window.location.search).get('id');
  const url    = resumeId ? `/resume/${resumeId}` : '/resume/save';
  const method = resumeId ? 'PATCH' : 'POST';
  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ personal, summary, experience, education: { ...education, entries: educationEntriesPayload }, skills, links, workHistory: workHistoryPayload })
  })
    .then(res => res.json().then(data => ({ ok: res.ok, status: res.status, data })))
    .then(({ ok, status, data }) => {
      if (!ok) {
        if (status === 403) return showToast(data.message || 'Resume limit reached');
        return showToast('Save failed — please log in again');
      }
      // After first POST, update URL to ?id=<_id> so subsequent saves PATCH instead of inserting again
      if (!resumeId && data?.data?._id) {
        const params = new URLSearchParams(window.location.search);
        params.delete('new');
        params.set('id', data.data._id);
        history.replaceState(null, '', `${window.location.pathname}?${params}`);
      }
      showToast('Saved ✓');
    })
    .catch(() => showToast('Save failed — please log in again'));
}

/* ═══════════════════════════════════════
   WIZARD — shared field rows builder
═══════════════════════════════════════ */
function buildFieldRows(fields, ci, idPrefix){
  let rows = '';
  let i = 0;
  while(i < fields.length){
    const f = fields[i];
    if(f.type==='textarea' || f.type==='tags' || f.type==='phone'){
      rows += `<div class="fg"><div class="frow">
        <label class="flabel">${escapeAttr(f.label)}${f.required?'<span class="req">*</span>':''}</label>
        ${buildInput(f, idPrefix, getWizardVal(ci, f.key))}
        ${f.hint?`<div class="fhint">${escapeAttr(f.hint)}</div>`:''}
      </div></div>`;
      i++;
    } else {
      const f2 = fields[i+1];
      if(f2 && f2.type!=='textarea' && f2.type!=='tags' && f2.type!=='phone'){
        rows += `<div class="fg c2">
          <div class="frow">
            <label class="flabel">${escapeAttr(f.label)}${f.required?'<span class="req">*</span>':''}</label>
            ${buildInput(f, idPrefix, getWizardVal(ci, f.key))}
            ${f.hint?`<div class="fhint">${escapeAttr(f.hint)}</div>`:''}
          </div>
          <div class="frow">
            <label class="flabel">${escapeAttr(f2.label)}${f2.required?'<span class="req">*</span>':''}</label>
            ${buildInput(f2, idPrefix, getWizardVal(ci, f2.key))}
            ${f2.hint?`<div class="fhint">${escapeAttr(f2.hint)}</div>`:''}
          </div>
        </div>`;
        i+=2;
      } else {
        rows += `<div class="fg"><div class="frow">
          <label class="flabel">${escapeAttr(f.label)}${f.required?'<span class="req">*</span>':''}</label>
          ${buildInput(f, idPrefix, getWizardVal(ci, f.key))}
          ${f.hint?`<div class="fhint">${escapeAttr(f.hint)}</div>`:''}
        </div></div>`;
        i++;
      }
    }
  }
  return rows;
}

/* ── Work History wizard step ── */
function buildWorkEntryHtml(entry, idx){
  return `<div class="entry-card" id="wh-entry-${idx}">
    <div class="entry-card-hd">
      <strong>${escapeAttr(entry.title||'Untitled')} @ ${escapeAttr(entry.company||'Company')}</strong>
      <button type="button" class="btn-entry-del" onclick="removeWorkEntry(${idx})">✕ Remove</button>
    </div>
    <div class="fg c2">
      <div class="frow"><label class="flabel">Job Title *</label>
        <input class="finput" value="${escapeAttr(entry.title||'')}" onchange="workHistory[${idx}].title=this.value;refreshWhSummary()"></div>
      <div class="frow"><label class="flabel">Company *</label>
        <input class="finput" value="${escapeAttr(entry.company||'')}" onchange="workHistory[${idx}].company=this.value;refreshWhSummary()"></div>
    </div>
    <div class="fg c2">
      <div class="frow"><label class="flabel">Start Date *</label>
        <input type="date" class="finput" value="${escapeAttr(entry.startDate && !isNaN(new Date(entry.startDate)) ? new Date(entry.startDate).toISOString().slice(0,10) : '')}" onchange="workHistory[${idx}].startDate=this.value"></div>
      <div class="frow"><label class="flabel">End Date</label>
        <input type="date" class="finput" value="${escapeAttr(entry.endDate && !isNaN(new Date(entry.endDate)) ? new Date(entry.endDate).toISOString().slice(0,10) : '')}" onchange="workHistory[${idx}].endDate=this.value"></div>
    </div>
    <div class="fg c2">
      <div class="frow"><label class="flabel">Employment Type *</label>
        <select class="finput" onchange="workHistory[${idx}].employmentType=this.value">
          <option value="">Select...</option>
          ${['Full-Time','Part-Time','Contract','Freelance','Internship','Self-Employed','Temporary','Volunteer'].map(o=>`<option value="${escapeAttr(o)}" ${entry.employmentType===o?'selected':''}>${escapeAttr(o)}</option>`).join('')}
        </select></div>
      <div class="frow"><label class="flabel">Currently Here?</label>
        <select class="finput" onchange="workHistory[${idx}].isCurrent=this.value">
          <option value="">Select...</option>
          <option value="Yes" ${entry.isCurrent==='Yes'||entry.isCurrent===true?'selected':''}>Yes</option>
          <option value="No"  ${entry.isCurrent==='No' ||entry.isCurrent===false?'selected':''}>No</option>
        </select></div>
    </div>
    <div class="fg c2">
      <div class="frow"><label class="flabel">Department</label>
        <input class="finput" value="${escapeAttr(entry.department||'')}" onchange="workHistory[${idx}].department=this.value"></div>
      <div class="frow"><label class="flabel">Location</label>
        <input class="finput" value="${escapeAttr(entry.location||'')}" onchange="workHistory[${idx}].location=this.value"></div>
    </div>
    <div class="fg"><div class="frow"><label class="flabel">Description</label>
      <textarea class="finput" rows="2" onchange="workHistory[${idx}].description=this.value">${escapeAttr(entry.description||'')}</textarea></div></div>
    <div class="fg"><div class="frow"><label class="flabel">Achievements *</label>
      <div class="tag-wrap" id="wh-ach-${idx}" onclick="this.querySelector('input').focus()">
        ${(Array.isArray(entry.achievements)?entry.achievements:[]).map(v=>`<span class="tag-pill">${escapeAttr(v)}<button class="rx" onclick="removeTag(this)">×</button></span>`).join('')}
        <input placeholder="Type and press Enter or comma..." onkeydown="whTagKeydown(event,${idx},'achievements')" onblur="whTagBlur(this,${idx},'achievements')">
      </div></div></div>
    <div class="fg"><div class="frow"><label class="flabel">Skills Used *</label>
      <div class="tag-wrap" id="wh-skills-${idx}" onclick="this.querySelector('input').focus()">
        ${(Array.isArray(entry.skillsUsed)?entry.skillsUsed:[]).map(v=>`<span class="tag-pill">${escapeAttr(v)}<button class="rx" onclick="removeTag(this)">×</button></span>`).join('')}
        <input placeholder="Type and press Enter or comma..." onkeydown="whTagKeydown(event,${idx},'skillsUsed')" onblur="whTagBlur(this,${idx},'skillsUsed')">
      </div></div></div>
  </div>`;
}

function whTagKeydown(e, entryIdx, field){
  if(e.key!=='Enter' && e.key!==',') return;
  e.preventDefault();
  const inp = e.target;
  const val = inp.value.trim().replace(/,$/,'');
  if(!val) return;
  const wrapId = field === 'achievements' ? `wh-ach-${entryIdx}` : `wh-skills-${entryIdx}`;
  tagKeydown(e, wrapId);
  if(!workHistory[entryIdx][field]) workHistory[entryIdx][field] = [];
  workHistory[entryIdx][field].push(val);
}

function whTagBlur(inp, entryIdx, field){
  const val = inp.value.trim().replace(/,$/,'');
  if(!val) return;
  const wrapId = field === 'achievements' ? `wh-ach-${entryIdx}` : `wh-skills-${entryIdx}`;
  const wrap = document.getElementById(wrapId);
  if(!wrap) return;
  const pill = document.createElement('span');
  pill.className = 'tag-pill';
  pill.textContent = val;
  const rx = document.createElement('button');
  rx.className = 'rx';
  rx.textContent = 'x';
  rx.onclick = () => removeTag(rx);
  pill.appendChild(rx);
  wrap.insertBefore(pill, inp);
  inp.value = '';
  if(!workHistory[entryIdx][field]) workHistory[entryIdx][field] = [];
  workHistory[entryIdx][field].push(val);
}

function syncWhTags(idx){
  const achWrap = document.getElementById(`wh-ach-${idx}`);
  const skWrap  = document.getElementById(`wh-skills-${idx}`);
  if(achWrap) workHistory[idx].achievements = [...achWrap.querySelectorAll('.tag-pill')].map(p=>p.childNodes[0].textContent.trim());
  if(skWrap)  workHistory[idx].skillsUsed   = [...skWrap.querySelectorAll('.tag-pill')].map(p=>p.childNodes[0].textContent.trim());
}

function refreshWhSummary(){
  const sum = document.getElementById('wh-summary');
  if(sum){
    const complete = workHistory.filter(e => e.company && e.title && e.startDate && e.employmentType);
    const incomplete = workHistory.length - complete.length;
    let html = complete.length
      ? `<strong>Jobs added (${complete.length}):</strong> ${complete.map(e=>`${e.title} @ ${e.company}`).join(' · ')}`
      : '<em>No complete jobs added yet</em>';
    if(incomplete > 0)
      html += ` <span style="color:var(--danger,#b91c1c);margin-left:6px;">⚠ ${incomplete} incomplete (won't be saved)</span>`;
    sum.innerHTML = html;
  }
  updatePct();
}

function addWorkEntry(){
  workHistory.push({ company:'', title:'', department:'', location:'', startDate:'', endDate:'', isCurrent:'No', employmentType:'', description:'', achievements:[], skillsUsed:[] });
  const wizList = document.getElementById('wh-list-wiz');
  if(wizList && wizList.closest('.wiz-cluster') && wizList.closest('.wiz-cluster').style.display !== 'none'){
    renderWhList();
  } else if(activeDashSection !== 'workhistory'){
    const navEl = document.querySelector('[onclick="dashSetSection(this,\'workhistory\')"]');
    if(navEl) dashSetSection(navEl, 'workhistory');
  } else {
    renderWhList();
  }
}

function removeWorkEntry(idx){
  // Sync tags before removing so we don't lose edits on other entries
  workHistory.forEach((_,i) => { if(i !== idx) syncWhTags(i); });
  workHistory.splice(idx, 1);
  renderWhList();
}

function renderWhList(){
  const list = document.getElementById('wh-list') || document.getElementById('wh-list-wiz');
  if(!list) return;
  list.innerHTML = workHistory.map((e,i) => buildWorkEntryHtml(e, i)).join('');
  refreshWhSummary();
}

/* ── Education entries wizard step ── */
function buildEduEntryHtml(entry, idx){
  return `<div class="entry-card" id="edu-entry-${idx}">
    <div class="entry-card-hd">
      <strong>${escapeAttr(entry.degree||'Degree')} — ${escapeAttr(entry.institution||'Institution')}</strong>
      <button type="button" class="btn-entry-del" onclick="removeEduEntry(${idx})">✕ Remove</button>
    </div>
    <div class="fg c2">
      <div class="frow"><label class="flabel">Degree / Qualification *</label>
        <input class="finput" value="${escapeAttr(entry.degree||'')}" onchange="educationEntries[${idx}].degree=this.value"></div>
      <div class="frow"><label class="flabel">Institution *</label>
        <input class="finput" value="${escapeAttr(entry.institution||'')}" onchange="educationEntries[${idx}].institution=this.value"></div>
    </div>
    <div class="fg c2">
      <div class="frow"><label class="flabel">Field of Study</label>
        <input class="finput" value="${escapeAttr(entry.fieldOfStudy||'')}" onchange="educationEntries[${idx}].fieldOfStudy=this.value"></div>
      <div class="frow"><label class="flabel">Year of Completion *</label>
        <input type="number" class="finput" min="1950" max="2099" value="${escapeAttr(String(entry.year||''))}" onchange="educationEntries[${idx}].year=+this.value"></div>
    </div>
    <div class="fg c2">
      <div class="frow"><label class="flabel">Education Level *</label>
        <input class="finput" placeholder="e.g. Graduate, Post-Graduate" value="${escapeAttr(entry.level||'')}" onchange="educationEntries[${idx}].level=this.value"></div>
      <div class="frow"><label class="flabel">Grade / GPA</label>
        <input class="finput" value="${escapeAttr(entry.gradeOrGpa||'')}" onchange="educationEntries[${idx}].gradeOrGpa=this.value"></div>
    </div>
    <div class="fg"><div class="frow"><label class="flabel">Duration</label>
      <input class="finput" placeholder="e.g. 3 years" value="${escapeAttr(entry.duration||'')}" onchange="educationEntries[${idx}].duration=this.value"></div></div>
  </div>`;
}

function addEduEntry(){
  educationEntries.push({ level:'', institution:'', degree:'', fieldOfStudy:'', year:'', gradeOrGpa:'', duration:'' });
  renderEduList();
}

function removeEduEntry(idx){
  educationEntries.splice(idx, 1);
  renderEduList();
}

function renderEduList(){
  const list = document.getElementById('edu-list') || document.getElementById('edu-list-wiz');
  if(!list) return;
  list.innerHTML = educationEntries.map((e,i) => buildEduEntryHtml(e, i)).join('');
  updatePct();
}

/* ── Pre-declarations needed by buildWizard IIFE and switchMode ── */
let wizStep = 0;
let dashEditField = null;
let chatInited = false;
let focusIdx = 0;

const WIZ_SECTION_LABELS = {
  [WIZ_SUMMARY_IDX]:    { pill: 'Summary',      title: 'Write your <em>summary</em>',   sub: 'Create the opening narrative employers see first.' },
  [WIZ_EXPERIENCE_IDX]: { pill: 'Experience',   title: 'Your <em>experience</em>',       sub: 'Career overview and job preferences.' },
  [WIZ_WORKHISTORY_IDX]:{ pill: 'Work History', title: 'Work <em>history</em>',          sub: 'Add your past and current positions.' },
  [WIZ_EDUCATION_IDX]:  { pill: 'Education',    title: 'Your <em>education</em>',        sub: 'Academic background and qualifications.' },
  [WIZ_SKILLS_IDX]:     { pill: 'Skills',       title: 'Your <em>skills</em>',           sub: 'Technical, soft, and specialist skills.' },
  [WIZ_LINKS_IDX]:      { pill: 'Links',        title: 'Online <em>presence</em>',       sub: 'Profiles and links that strengthen your resume.' },
};

const DASH_SECTION_META = {
  personal:    { title: 'Personal <em>Information</em>',  sub: 'Click any card to fill or edit. Required fields are highlighted.' },
  summary:     { title: 'Summary <em>Section</em>',       sub: 'Shape the opening narrative employers see first.' },
  experience:  { title: 'Experience <em>Overview</em>',   sub: 'Career metadata, salary, and job preferences.' },
  workhistory: { title: 'Work <em>History</em>',          sub: 'Add and manage your past and current positions.' },
  education:   { title: 'Education <em>Background</em>',  sub: 'Academic overview and individual qualifications.' },
  eduentries:  { title: 'Education <em>Entries</em>',     sub: 'Manage individual degrees and qualifications.' },
  skills:      { title: 'Skills <em>Profile</em>',        sub: 'Technical, soft, and specialist skills.' },
  links:       { title: 'Online <em>Presence</em>',       sub: 'Profiles and links that strengthen your resume.' },
};

/* ── Main Wizard Builder ── */
(function buildWizard(){
  // Build strip
  const strip = document.getElementById('wiz-strip');
  WIZARD_STEPS.forEach((c,i)=>{
    const div = document.createElement('div');
    div.className = 'wstep' + (i===0?' active':'');
    div.id = 'wstep-'+i;
    div.onclick = ()=>wizGoTo(i);
    div.innerHTML = `<div class="wstep-bar"></div><div class="wstep-num">${i+1}</div><div class="wstep-label">${c}</div>`;
    strip.appendChild(div);
  });
  // Build clusters
  const cont = document.getElementById('wiz-clusters');
  WIZARD_STEPS.forEach((c,ci)=>{
    const div = document.createElement('div');
    div.className = 'wiz-cluster';
    div.id = 'wcluster-'+ci;
    div.style.display = ci===0 ? 'block' : 'none';

    let inner = '';
    if(ci === WIZ_WORKHISTORY_IDX){
      // Special: dynamic list of job entries
      inner = `<div class="cluster-title"><span class="cluster-dot"></span>Work History</div>
        <div class="fhint" style="margin-bottom:14px;">Add each job separately. Required fields are marked *.</div>
        <div id="wh-list-wiz"></div>
        <button type="button" class="btn btn-ghost" style="margin-top:8px;" onclick="addWorkEntry()">+ Add Job</button>
        <div class="wh-summary" id="wh-summary" style="margin-top:12px;font-size:12px;color:var(--ink4);"><em>No jobs added yet</em></div>`;
    } else if(ci === WIZ_EDUCATION_IDX){
      // Special: dynamic list of education entries + flat education fields
      const flatRows = buildFieldRows(EDUCATION_FLAT_FIELDS, ci, 'wiz_');
      inner = `<div class="cluster-title"><span class="cluster-dot"></span>Education</div>
        ${flatRows}
        <div class="cluster-title" style="margin-top:24px;"><span class="cluster-dot"></span>Degrees & Qualifications</div>
        <div class="fhint" style="margin-bottom:14px;">Add each qualification separately.</div>
        <div id="edu-list-wiz"></div>
        <button type="button" class="btn btn-ghost" style="margin-top:8px;" onclick="addEduEntry()">+ Add Qualification</button>`;
    } else {
      const fields = getWizardStepFields(ci);
      const data   = getWizardStepData(ci);
      const rows   = buildFieldRows(fields, ci, 'wiz_');
      inner = `<div class="cluster-title"><span class="cluster-dot"></span>${c}</div>${rows}`;
      div.addEventListener('input',()=>{
        fields.forEach(f=>{
          const v = readInput(f,'wiz_');
          if(v!=='' && !(Array.isArray(v)&&v.length===0)) data[f.key]=v;
        });
        updatePct();
      });
    }
    div.innerHTML = inner;
    cont.appendChild(div);
  });
  wizUpdateUI();
})();


function wizGoTo(n){
  // Save current step data
  if(wizStep === WIZ_WORKHISTORY_IDX){
    workHistory.forEach((_,i) => syncWhTags(i));
  } else {
    const curFields = getWizardStepFields(wizStep);
    const curData   = getWizardStepData(wizStep);
    curFields.forEach(f=>{ const v=readInput(f,'wiz_'); if(v!==''&&!(Array.isArray(v)&&v.length===0)) curData[f.key]=v; else delete curData[f.key]; });
  }
  if(n >= WIZARD_STEPS.length){
    saveAll();
    switchMode('dashboard');
    return;
  }
  if(n < 0) return;
  wizStep = n;
  // Render dynamic lists on arrival
  if(wizStep === WIZ_WORKHISTORY_IDX) renderWhList();
  if(wizStep === WIZ_EDUCATION_IDX)   renderEduList();
  wizUpdateUI();
  window.scrollTo({top:0,behavior:'smooth'});
}
function wizGo(dir){ wizGoTo(wizStep+dir); }
function wizUpdateUI(){
  WIZARD_STEPS.forEach((_,i)=>{
    const cl = document.getElementById('wcluster-'+i);
    const st = document.getElementById('wstep-'+i);
    if(cl) cl.style.display = i===wizStep?'block':'none';
    if(st) st.className = 'wstep' + (i<wizStep?' done':i===wizStep?' active':'');
  });
  const info = WIZ_SECTION_LABELS[wizStep];
  const pill  = document.querySelector('.section-pill');
  const title = document.querySelector('.wiz-title');
  const sub   = document.querySelector('.wiz-sub');
  if(pill)  pill.innerHTML  = `<span class="dot"></span>${info ? info.pill : 'Personal Information'}`;
  if(title) title.innerHTML = info ? info.title : 'Tell us about <em>yourself</em>';
  if(sub)   sub.textContent = info ? info.sub : 'Fill in what you know — everything can be edited later.';
  document.getElementById('wiz-back').style.visibility = wizStep===0?'hidden':'visible';
  document.getElementById('wiz-next').textContent = wizStep===WIZARD_STEPS.length-1 ? '✓ Finish' : 'Continue →';
  document.getElementById('wiz-next').className   = wizStep===WIZARD_STEPS.length-1 ? 'btn btn-teal' : 'btn btn-accent';
}

/* ═══════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════ */

function renderDashCards(){
  const grid   = document.getElementById('dash-cards');
  const drawer = document.getElementById('edit-drawer');
  const titleEl = document.getElementById('dash-sec-title');
  const subEl   = document.getElementById('dash-sec-sub');
  const meta    = DASH_SECTION_META[activeDashSection] || DASH_SECTION_META.personal;
  if(titleEl) titleEl.innerHTML  = meta.title;
  if(subEl)   subEl.textContent  = meta.sub;

  // Work History — show list manager in the main area
  if(activeDashSection === 'workhistory'){
    if(drawer) drawer.classList.remove('open');
    grid.innerHTML = `
      <div style="grid-column:1/-1;">
        <div id="wh-list"></div>
        <button type="button" class="btn btn-ghost" style="margin-top:12px;" onclick="addWorkEntry()">+ Add Job</button>
      </div>`;
    renderWhList();
    return;
  }

  // Education entries — show list manager
  if(activeDashSection === 'eduentries'){
    if(drawer) drawer.classList.remove('open');
    grid.innerHTML = `
      <div style="grid-column:1/-1;">
        <div id="edu-list"></div>
        <button type="button" class="btn btn-ghost" style="margin-top:12px;" onclick="addEduEntry()">+ Add Qualification</button>
      </div>`;
    renderEduList();
    return;
  }

  // Standard field-card sections
  const fields = activeDashFields();
  const data   = activeDashData();
  grid.innerHTML = '';
  fields.forEach(f=>{
    const val    = data[f.key];
    const filled = val !== undefined && val !== null && val !== '' && !(Array.isArray(val)&&val.length===0);
    const miss   = f.required && !filled;
    const card   = document.createElement('div');
    card.className = 'fcard' + (filled?' filled':miss?' missing':'');
    card.onclick = ()=>openDrawer(f);
    let valDisplay = filled ? (Array.isArray(val) ? val.join(', ') : String(val)) : null;
    if(valDisplay && valDisplay.length > 30) valDisplay = valDisplay.slice(0,28)+'…';
    card.innerHTML = `
      <div class="fc-lbl">${escapeAttr(f.label)}</div>
      ${filled
        ? `<div class="fc-val">${escapeAttr(valDisplay)}</div><span class="fc-badge chk">✓</span>`
        : `<div class="fc-empty">Click to add</div>${miss?'<span class="fc-badge req">Required</span>':''}`
      }`;
    grid.appendChild(card);
  });
}
function openDrawer(f){
  dashEditField = f;
  document.getElementById('edit-drawer-title').textContent = f.label + (f.required?' *':'');
  const body = document.getElementById('edit-drawer-body');
  body.innerHTML = `
    ${f.hint ? `<div class="fhint" style="margin-bottom:10px;">${f.hint}</div>` : ''}
    ${buildInput(f,'drw_',getDashVal(f.key))}
  `;
  const drawer = document.getElementById('edit-drawer');
  drawer.classList.add('open');
  setTimeout(()=>{
    const inp = drawer.querySelector('input:not([type=hidden]),select,textarea');
    if(inp) inp.focus();
    drawer.scrollIntoView({behavior:'smooth',block:'nearest'});
  },60);
}
function saveDrawer(){
  if(!dashEditField) return;
  const label = dashEditField.label;
  const v = readInput(dashEditField,'drw_');
  setDashVal(dashEditField.key, v);
  closeDrawer();
  renderDashCards();
  showToast(label+' saved ✓');
}
function closeDrawer(){
  document.getElementById('edit-drawer').classList.remove('open');
  dashEditField = null;
}
function clearDrawer(){
  if(!dashEditField) return;
  delete activeDashData()[dashEditField.key];
  updatePct();
  closeDrawer();
  renderDashCards();
  showToast('Field cleared');
}
function dashSetSection(el, sec){
  document.querySelectorAll('.dnav-item').forEach(i=>i.classList.remove('active'));
  el.classList.add('active');
  activeDashSection = sec;
  closeDrawer();
  renderDashCards();
}

/* ═══════════════════════════════════════
   CHAT MODE
═══════════════════════════════════════ */
// All fields available to adaptive Chat/Focus plans. Dashboard remains the full editor.
const ALL_RESUME_FIELDS = [
  ...GUIDED_FIELDS,
  ...EXPERIENCE_FIELDS,
  ...EDUCATION_FLAT_FIELDS,
  ...SKILLS_FIELDS,
  ...LINKS_FIELDS,
];

const QUICK_CORE_KEYS = new Set([
  'fullName','email','contactNumber','city','country','profileTitle',
  'professionalHeadline','professionalSummary','careerObjective',
  'currentDesignation','yearsOfExperience','desiredJobTitle',
  'highestEducation','technicalSkills','softSkills','linkedinProfile'
]);
const STANDARD_RECOMMENDED_KEYS = new Set([
  ...QUICK_CORE_KEYS,
  'languagesKnown','preferredLocation','personalTagline','valueProposition',
  'careerHighlights','keyAchievements','currentCompany','employmentType',
  'targetIndustry','educationMode','computerSkills','softwareTools',
  'communicationSkills','portfolioWebsite'
]);

const OPTIONAL_GROUPS = [
  { id:'proof', label:'Achievements & proof', desc:'Highlights, awards, portfolio context', keys:['careerHighlights','keyAchievements','portfolioSummary','academicAchievements'] },
  { id:'salary', label:'Salary & availability', desc:'Salary, notice period, start date', keys:['expectedSalary','currentSalary','noticePeriod','availabilityDate'] },
  { id:'workPrefs', label:'Work preferences', desc:'Contract, part-time, overseas work', keys:['targetIndustry','targetCompanyType','targetSeniority','openToContract','openToPartTime','openToOverseasWork','preferredLocation'] },
  { id:'skills', label:'More skills', desc:'Tools, leadership, language, creative skills', keys:['computerSkills','softwareTools','analyticalSkills','problemSolvingSkills','leadershipSkills','managementSkills','communicationSkills','languageSkills','digitalSkills','creativeSkills','typingSpeed'] },
  { id:'links', label:'Links & profiles', desc:'Portfolio, GitHub, social and academic links', keys:['githubProfile','portfolioWebsite','personalWebsite','behanceProfile','dribbbleProfile','stackoverflowProfile','youtubeChannel','mediumProfile','twitterProfile','instagramProfile','researchGateProfile'] },
  { id:'personal', label:'Personal details', desc:'Identity, family, address and background details', keys:['preferredName','dateOfBirth','placeOfBirth','gender','maritalStatus','nationality','citizenship','fatherName','motherName','religion','community','nativePlace','alternateEmail','alternateContactNumber','whatsappNumber','address','stateProvince','postalCode','currentLocation','residenceType','timeZone'] },
  { id:'advanced', label:'Advanced narrative', desc:'Career change, gaps, mission and executive copy', keys:['executiveSummary','personalStatement','careerMission','careerVision','careerChangeReason','employmentGapExplanation'] },
];

let intakeProfile = {
  depth: 'standard',
  experience: 'experienced',
  target: '',
  hasWorkHistory: 'yes',
  hasEducation: 'yes'
};
let activeQuestionPlan = [];
let selectedOptionalGroups = new Set();
let pendingAdaptiveMode = null;
let optionalGroupPromptShown = false;

function allFieldByKey(key){
  return ALL_RESUME_FIELDS.find(f => f.key === key);
}

function shouldAskField(field, profile, optionalGroups = selectedOptionalGroups){
  if(!field) return false;
  const key = field.key;
  if(profile.hasEducation === 'no' && EDUCATION_FLAT_FIELDS.some(f => f.key === key)) return false;
  if(profile.hasWorkHistory === 'no' && ['currentDesignation','currentCompany','currentSalary','noticePeriod','industryExperience'].includes(key)) return false;
  if(profile.experience === 'fresher' && ['currentDesignation','currentCompany','currentSalary','noticePeriod','industryExperience','executiveSummary'].includes(key)) return false;
  if(profile.experience !== 'career-change' && key === 'careerChangeReason') return false;

  if(profile.depth === 'quick') return QUICK_CORE_KEYS.has(key);
  if(profile.depth === 'standard') {
    if(STANDARD_RECOMMENDED_KEYS.has(key)) return true;
    return OPTIONAL_GROUPS.some(group => optionalGroups.has(group.id) && group.keys.includes(key));
  }
  return true;
}

function buildQuestionPlan(profile = intakeProfile, optionalGroups = selectedOptionalGroups){
  const seen = new Set();
  return ALL_RESUME_FIELDS.filter(field => {
    if(seen.has(field.key)) return false;
    if(!shouldAskField(field, profile, optionalGroups)) return false;
    seen.add(field.key);
    return true;
  });
}

function planLabel(){
  if(intakeProfile.depth === 'quick') return 'Quick resume';
  if(intakeProfile.depth === 'detailed') return 'Detailed profile';
  return 'Standard resume';
}

function ensureQuestionPlan(){
  if(!activeQuestionPlan.length) activeQuestionPlan = buildQuestionPlan();
  return activeQuestionPlan;
}

function intakeChoiceHtml(name, options){
  const current = intakeProfile[name];
  return `<div class="intake-options">${options.map(o => `
    <button type="button" class="intake-choice ${current === o.value ? 'active' : ''}" onclick="setIntakeChoice('${name}','${o.value}')">${escapeAttr(o.label)}</button>
  `).join('')}</div>`;
}

function renderIntakeHtml(mode){
  const count = buildQuestionPlan(intakeProfile, new Set()).length;
  return `<div class="intake-card">
    <div class="intake-title">Shape the question list first.</div>
    <div class="intake-sub">Chat and Focus now ask only the fields that fit this resume. You can still edit every field later in Dashboard.</div>
    <div class="intake-grid">
      <div class="intake-field">
        <div class="intake-label">Depth</div>
        ${intakeChoiceHtml('depth', [
          { value:'quick', label:'Quick' },
          { value:'standard', label:'Standard' },
          { value:'detailed', label:'Detailed' }
        ])}
      </div>
      <div class="intake-field">
        <div class="intake-label">Experience type</div>
        ${intakeChoiceHtml('experience', [
          { value:'experienced', label:'Experienced' },
          { value:'fresher', label:'Fresher' },
          { value:'career-change', label:'Career change' }
        ])}
      </div>
      <div class="intake-field">
        <div class="intake-label">Work history</div>
        ${intakeChoiceHtml('hasWorkHistory', [
          { value:'yes', label:'I have work experience' },
          { value:'no', label:'No work history yet' }
        ])}
      </div>
      <div class="intake-field">
        <div class="intake-label">Education</div>
        ${intakeChoiceHtml('hasEducation', [
          { value:'yes', label:'Include education' },
          { value:'no', label:'Skip education' }
        ])}
      </div>
    </div>
    <div class="intake-actions">
      <button type="button" class="btn btn-accent" onclick="startAdaptiveFlow('${mode}')">Start ${mode === 'chat' ? 'chat' : 'focus'} flow</button>
      <span class="focus-key-hint">${count} questions in this plan</span>
    </div>
  </div>`;
}

function setIntakeChoice(name, value){
  intakeProfile[name] = value;
  activeQuestionPlan = [];
  selectedOptionalGroups = new Set();
  optionalGroupPromptShown = false;
  if(pendingAdaptiveMode === 'chat') {
    const thread = document.getElementById('chat-thread');
    if(thread) thread.innerHTML = renderIntakeHtml('chat');
  }
  if(pendingAdaptiveMode === 'focus') {
    const card = document.getElementById('focus-card');
    if(card) card.innerHTML = renderIntakeHtml('focus');
  }
}

function optionalGroupHtml(mode){
  return `<div class="intake-card">
    <div class="intake-title">${planLabel()} complete.</div>
    <div class="intake-sub">Add optional detail groups now, or review the resume in Dashboard.</div>
    <div class="optional-groups">
      ${OPTIONAL_GROUPS.map(group => `
        <button type="button" class="optional-group" onclick="addOptionalGroup('${mode}','${group.id}')">
          <strong>${escapeAttr(group.label)}</strong>
          <span>${escapeAttr(group.desc)}</span>
        </button>
      `).join('')}
    </div>
    <div class="intake-actions">
      <button type="button" class="btn btn-teal" onclick="switchMode('dashboard')">Review in Dashboard</button>
      <button type="button" class="btn btn-ghost" onclick="saveAll()">Save draft</button>
    </div>
  </div>`;
}

function addOptionalGroup(mode, groupId){
  selectedOptionalGroups.add(groupId);
  const currentKeys = new Set(activeQuestionPlan.map(f => f.key));
  const group = OPTIONAL_GROUPS.find(g => g.id === groupId);
  const additions = (group?.keys || [])
    .map(allFieldByKey)
    .filter(field => field && !currentKeys.has(field.key) && shouldAskField(field, intakeProfile, selectedOptionalGroups));
  if(!additions.length){
    showToast('Those fields are already covered');
    return;
  }
  activeQuestionPlan = [...activeQuestionPlan, ...additions];
  optionalGroupPromptShown = false;
  if(mode === 'chat') askChatField(chatIdx + 1);
  if(mode === 'focus') {
    focusIdx = Math.min(focusIdx + 1, activeQuestionPlan.length - additions.length);
    renderFocusCard();
  }
}

function getChatFieldData(field){
  if(SUMMARY_FIELDS.some(f=>f.key===field.key))          return summaryData;
  if(EXPERIENCE_FIELDS.some(f=>f.key===field.key))       return experienceData;
  if(EDUCATION_FLAT_FIELDS.some(f=>f.key===field.key))   return educationData;
  if(SKILLS_FIELDS.some(f=>f.key===field.key))           return skillsData;
  if(LINKS_FIELDS.some(f=>f.key===field.key))            return linksData;
  return formData;
}

function getChatVal(field){
  return getChatFieldData(field)[field.key] ?? null;
}

function setChatVal(field, val){
  const data = getChatFieldData(field);
  if(val === '' || val === null || (Array.isArray(val) && val.length===0)){
    delete data[field.key];
  } else {
    data[field.key] = val;
  }
  updatePct();
}

function chatSectionLabel(field){
  if(SUMMARY_FIELDS.some(f=>f.key===field.key))          return 'Summary';
  if(EXPERIENCE_FIELDS.some(f=>f.key===field.key))       return 'Experience';
  if(EDUCATION_FLAT_FIELDS.some(f=>f.key===field.key))   return 'Education';
  if(SKILLS_FIELDS.some(f=>f.key===field.key))           return 'Skills';
  if(LINKS_FIELDS.some(f=>f.key===field.key))            return 'Links';
  return 'Personal';
}

let chatIdx = 0;
let chatActive = false;

const CHAT_MESSAGES = {
  intro: "First, choose the kind of resume you want. I will build a shorter question list from that.",
  done:  "{label} complete. You filled {n} fields.",
};

function initChat(){
  if(chatInited) return;
  chatInited = true;
  pendingAdaptiveMode = 'chat';
  activeQuestionPlan = [];
  selectedOptionalGroups = new Set();
  optionalGroupPromptShown = false;
  const thread = document.getElementById('chat-thread');
  thread.innerHTML = renderIntakeHtml('chat');
  document.getElementById('chat-prog-text').textContent = 'Choose resume depth';
  document.getElementById('chat-prog-pct').textContent = '0%';
  document.getElementById('chat-prog-fill').style.width = '0%';
}

function startAdaptiveFlow(mode){
  activeQuestionPlan = buildQuestionPlan();
  selectedOptionalGroups = new Set();
  optionalGroupPromptShown = false;
  if(mode === 'chat'){
    pendingAdaptiveMode = null;
    chatIdx = 0;
    const thread = document.getElementById('chat-thread');
    thread.innerHTML = '';
    buildChatDots();
    appendAI(`${planLabel()} selected. I will ask ${activeQuestionPlan.length} focused questions. Skip anything that does not apply.`, null, false);
    setTimeout(()=>askChatField(0), 500);
  }
  if(mode === 'focus'){
    pendingAdaptiveMode = null;
    focusIdx = 0;
    renderFocusCard();
  }
}

function buildChatDots(){
  const dots = document.getElementById('chat-dots');
  dots.innerHTML = ensureQuestionPlan().map((_,i)=>`<div class="cdot" id="cdot-${i}"></div>`).join('');
}

function appendAI(html, field, withAnswer=true){
  const thread = document.getElementById('chat-thread');
  const wrap = document.createElement('div');
  wrap.className = 'cmsg';
  let ansHtml = '';
  if(withAnswer && field){
    const currentVal = getChatVal(field);
    const inputVal = normalizeInputValue(field, currentVal);
    if((field.type==='select' || field.type==='timezone') && longOptionField(field)){
      ansHtml = `<div class="ans-area compact-choice">
        ${optionSelectHtml(field, 'chat-inp-'+field.key, currentVal, 'finput compact-select')}
        <div class="bubble-actions">
          <button class="bubble-confirm" onclick="chatConfirm('${field.key}')">Confirm</button>
          <span class="bubble-skip" onclick="chatSkip()">Skip</span>
        </div>
      </div>`;
    } else if(field.type==='select' || field.type==='timezone'){
      const opts = optionsForField(field);
      ansHtml = `<div class="ans-area">
        <div class="ans-options">${opts.map(o=>`<button class="aopt ${currentVal===o.value?'chosen':''}" onclick="chatOption(this,'${escapeAttr(o.value)}','${escapeAttr(field.key)}')">${escapeAttr(o.label)}</button>`).join('')}</div>
        <div class="bubble-actions">
          <span class="bubble-skip" onclick="chatSkip()">Skip this question</span>
        </div>
      </div>`;
    } else if(field.type==='tags'){
      const pills = (Array.isArray(currentVal) ? currentVal : [])
        .map(v=>`<span class="tag-pill">${escapeAttr(v)}<button class="rx" onclick="removeTag(this)">x</button></span>`).join('');
      ansHtml = `<div class="ans-area">
        <div class="tag-wrap" id="chat-tag-${field.key}">
          ${pills}
          <input id="chat-tag-inp-${field.key}" placeholder="Type and press Enter..." onkeydown="chatTagKey(event,'${field.key}')">
        </div>
        <div class="bubble-actions">
          <button class="bubble-confirm" onclick="chatConfirmTag('${field.key}')">Done</button>
          <span class="bubble-skip" onclick="chatSkip()">Skip</span>
        </div>
      </div>`;
    } else if(field.type==='phone'){
      ansHtml = `<div class="ans-area">
        ${buildInput(field,'chat_',currentVal)}
        <div class="bubble-actions">
          <button class="bubble-confirm" onclick="chatConfirm('${field.key}')">Confirm</button>
          <span class="bubble-skip" onclick="chatSkip()">Skip</span>
        </div>
      </div>`;
    } else if(field.type==='textarea'){
      ansHtml = `<div class="ans-area">
        <textarea id="chat-inp-${field.key}" class="finput" placeholder="Your answer..." rows="3">${escapeAttr(inputVal || '')}</textarea>
        <div class="bubble-actions">
          <button class="bubble-confirm" onclick="chatConfirm('${field.key}')">Confirm</button>
          <span class="bubble-skip" onclick="chatSkip()">Skip</span>
        </div>
      </div>`;
    } else {
      const inpType = field.type;
      ansHtml = `<div class="ans-area">
        <input type="${inpType}" id="chat-inp-${field.key}" class="finput" value="${escapeAttr(inputVal || '')}" placeholder="Your answer..." onkeydown="chatFieldEnter(event,'${field.key}')">
        <div class="bubble-actions">
          <button class="bubble-confirm" onclick="chatConfirm('${field.key}')">Confirm</button>
          <span class="bubble-skip" onclick="chatSkip()">Skip</span>
        </div>
      </div>`;
    }
    enableChatInput(false);
  } else if(withAnswer===false){
    enableChatInput(false);
  }

  wrap.innerHTML = `
    <div class="cavatar ai">r</div>
    <div class="cbubble ai">
      ${field?`<div class="field-tag">${field.label}</div>`:''}
      ${html}
      ${field&&field.hint?`<div class="chint">${field.hint}</div>`:''}
      ${ansHtml}
    </div>`;
  thread.appendChild(wrap);
  scrollChat();
}

function appendUser(text){
  const thread = document.getElementById('chat-thread');
  const wrap = document.createElement('div');
  wrap.className = 'cmsg user';
  const avatar = document.createElement('div');
  avatar.className = 'cavatar usr';
  avatar.textContent = 'U';
  const bubble = document.createElement('div');
  bubble.className = 'cbubble usr';
  bubble.textContent = text;
  wrap.append(avatar, bubble);
  thread.appendChild(wrap);
  scrollChat();
}

function appendTyping(){
  const thread = document.getElementById('chat-thread');
  const el = document.createElement('div');
  el.className = 'typing-msg';
  el.id = 'typing-indicator';
  el.innerHTML = `<div class="cavatar ai">r</div><div class="typing-bubble"><span class="tbounce"></span><span class="tbounce"></span><span class="tbounce"></span></div>`;
  thread.appendChild(el);
  scrollChat();
}
function removeTyping(){ const el=document.getElementById('typing-indicator'); if(el)el.remove(); }

function scrollChat(){ const t=document.getElementById('chat-thread'); if(t) t.lastElementChild?.scrollIntoView({behavior:'smooth',block:'end'}); }

function askChatField(idx){
  const plan = ensureQuestionPlan();
  if(idx >= plan.length){ chatDone(); return; }
  chatIdx = idx;
  const f = plan[idx];
  const dot = document.getElementById('cdot-'+idx);
  if(dot){ document.querySelectorAll('.cdot').forEach(d=>d.classList.remove('active')); dot.classList.add('active'); }
  document.getElementById('chat-prog-text').textContent = `${chatSectionLabel(f)} - question ${idx+1} of ${plan.length}`;
  appendTyping();
  setTimeout(()=>{
    removeTyping();
    appendAI(f.q, f, true);
    if(f.type !== 'select' && f.type !== 'timezone' && f.type !== 'tags'){
      setTimeout(()=>{ const inp = document.getElementById('chat-inp-'+f.key); if(inp) inp.focus(); }, 80);
    }
  }, 500);
}

function chatOption(btn, val, key){
  btn.closest('.ans-options').querySelectorAll('.aopt').forEach(b=>b.classList.remove('chosen'));
  btn.classList.add('chosen');
  setTimeout(()=>chatSaveAndNext(key, val), 400);
}

function chatFieldEnter(e, key){
  if(e.key==='Enter') chatConfirm(key);
}

function chatConfirm(key){
  const field = ensureQuestionPlan().find(f => f.key === key);
  const inp = document.getElementById('chat_'+key) || document.getElementById('chat-inp-'+key);
  if(!field || !inp) return;
  const val = field.type === 'phone' ? readInput(field, 'chat_') : inp.value.trim();
  if(!val){ inp.focus(); inp.style.borderColor='var(--accent)'; return; }
  chatSaveAndNext(key, val);
}

function chatTagKey(e, key){
  if(e.key!=='Enter' && e.key!==',') return;
  e.preventDefault();
  const inp = e.target;
  const val = inp.value.trim().replace(/,$/,'');
  if(!val) return;
  const pill = document.createElement('span');
  pill.className = 'tag-pill';
  pill.textContent = val;
  const rx = document.createElement('button');
  rx.className = 'rx'; rx.textContent = 'x';
  rx.onclick = () => removeTag(rx);
  pill.appendChild(rx);
  inp.parentElement.insertBefore(pill, inp);
  inp.value='';
}
function chatConfirmTag(key){
  const wrap = document.getElementById('chat-tag-'+key);
  const tags = [...wrap.querySelectorAll('.tag-pill')].map(p=>p.childNodes[0].textContent.trim());
  if(tags.length===0){ chatSkip(); return; }
  chatSaveAndNext(key, tags);
}

function disableChatAnswer(key){
  const anchor = document.getElementById('chat_'+key)
    || document.getElementById('chat-inp-'+key)
    || document.getElementById('chat-tag-'+key);
  const area = anchor?.closest('.ans-area');
  if(!area) return;
  area.querySelectorAll('input, textarea, select, button').forEach(el => { el.disabled = true; });
  area.querySelectorAll('.bubble-actions').forEach(el => { el.style.display = 'none'; });
}

function chatSaveAndNext(key, val){
  const plan = ensureQuestionPlan();
  const answerIdx = plan.findIndex(f => f.key === key);
  const field = answerIdx >= 0 ? plan[answerIdx] : plan[chatIdx];
  if(field) setChatVal(field, val);
  if(key) disableChatAnswer(key);
  const displayVal = Array.isArray(val) ? val.join(', ') : val;
  appendUser(displayVal);
  const dotIdx = answerIdx >= 0 ? answerIdx : chatIdx;
  const dot = document.getElementById('cdot-'+dotIdx);
  if(dot){ dot.classList.remove('active'); dot.classList.add('done'); }
  if(dotIdx !== chatIdx) return;
  setTimeout(()=>askChatField(dotIdx+1), 700);
}

function chatSkip(){
  appendUser('— skipped —');
  const dot = document.getElementById('cdot-'+chatIdx);
  if(dot) dot.classList.add('skipped');
  setTimeout(()=>askChatField(chatIdx+1), 500);
}

function chatEnterKey(e){ if(e.key==='Enter') chatSend(); }
function chatSend(){
  const inp = document.getElementById('chat-inp');
  if(!inp || !inp.value.trim()) return;
  chatSaveAndNext(ensureQuestionPlan()[chatIdx]?.key, inp.value.trim());
  inp.value='';
}
function enableChatInput(on){
  const inp = document.getElementById('chat-inp');
  const btn = document.getElementById('chat-send');
  if(inp){ inp.disabled = !on; inp.placeholder = on?'Type your answer…':'Use the options above…'; }
  if(btn) btn.disabled = !on;
}

function chatDone(){
  if(!optionalGroupPromptShown){
    optionalGroupPromptShown = true;
    const thread = document.getElementById('chat-thread');
    const wrap = document.createElement('div');
    wrap.className = 'cmsg';
    wrap.innerHTML = `<div class="cavatar ai">r</div><div class="cbubble ai">${optionalGroupHtml('chat')}</div>`;
    thread.appendChild(wrap);
    document.getElementById('chat-prog-text').textContent = `${planLabel()} complete`;
    document.getElementById('chat-prog-fill').style.width = '100%';
    document.getElementById('chat-prog-pct').textContent = '100%';
    scrollChat();
    return;
  }
  const n = [formData, summaryData, experienceData, educationData, skillsData, linksData]
    .reduce((t, d) => t + Object.keys(d).length, 0);
  appendTyping();
  setTimeout(()=>{
    removeTyping();
    appendAI(CHAT_MESSAGES.done.replace('{n}',n).replace('{label}', planLabel()), null, false);
    document.querySelectorAll('.cdot').forEach(d=>{ if(!d.classList.contains('skipped')) { d.classList.remove('active'); d.classList.add('done'); } });
    document.getElementById('chat-prog-text').textContent = `${planLabel()} complete`;
  }, 700);
}

/* ═══════════════════════════════════════
   FOCUS MODE
═══════════════════════════════════════ */
function initFocus(){
  focusIdx = 0;
  pendingAdaptiveMode = 'focus';
  activeQuestionPlan = [];
  selectedOptionalGroups = new Set();
  optionalGroupPromptShown = false;
  document.getElementById('focus-prog-fill').style.width = '0%';
  document.getElementById('focus-counter').textContent = 'Choose depth';
  const hint = document.querySelector('.focus-key-hint');
  if(hint) hint.innerHTML = 'Choose options to begin';
  document.getElementById('focus-card').innerHTML = renderIntakeHtml('focus');
}

function renderFocusCard(){
  const plan = ensureQuestionPlan();
  const total = plan.length;
  const f     = plan[focusIdx];
  const data  = getChatFieldData(f);
  const inputVal = normalizeInputValue(f, data[f.key]);
  document.getElementById('focus-prog-fill').style.width = ((focusIdx/total)*100)+'%';
  document.getElementById('focus-counter').textContent = `${focusIdx+1} / ${total}`;
  const navHint = document.querySelector('.focus-key-hint');
  if(navHint) {
    navHint.innerHTML = f.type === 'textarea'
      ? 'Use OK to continue'
      : f.type === 'tags'
        ? '<kbd>Enter</kbd> adds a tag'
        : '<kbd>Enter</kbd> to continue';
  }
  const card = document.getElementById('focus-card');
  let inputHtml = '';
  if((f.type==='select' || f.type==='timezone') && longOptionField(f)){
    inputHtml = `<div class="focus-input-area compact-choice">
      ${optionSelectHtml(f, 'focus-inp', data[f.key], 'finput compact-select')}
    </div>`;
  } else if(f.type==='select' || f.type==='timezone'){
    const opts = optionsForField(f);
    inputHtml = `<div class="focus-options">${opts.map((o,i)=>`
      <button class="fopt ${data[f.key]===o.value?'chosen':''}" onclick="focusOption(this,'${String(o.value).replace(/'/g,"\\'")}')">
        <span class="fopt-key">${String.fromCharCode(65+i)}</span>${escapeAttr(o.label)}
      </button>`).join('')}</div>`;
  } else if(f.type==='tags'){
    const existing = Array.isArray(data[f.key]) ? data[f.key] : [];
    const pills = existing.map(v=>`<span class="tag-pill">${escapeAttr(v)}<button class="rx" onclick="removeTag(this)">×</button></span>`).join('');
    inputHtml = `<div class="focus-input-area">
      <div class="tag-wrap" id="focus-tag-wrap">
        ${pills}
        <input id="focus-tag-inp" placeholder="Type and press Enter or comma..." onkeydown="tagKeydown(event,'focus-tag-wrap')" onblur="tagBlur(this,'focus-tag-wrap')" autofocus>
      </div>
    </div>`;
  } else if(f.type==='phone'){
    inputHtml = `<div class="focus-input-area">${buildInput(f,'focus_',data[f.key])}</div>`;
  } else {
    inputHtml = f.type === 'textarea'
      ? `<div class="focus-input-area">
          <textarea id="focus-inp" class="finput" rows="4" placeholder="Your answer...">${escapeAttr(inputVal||'')}</textarea>
        </div>`
      : `<div class="focus-input-area">
          <input type="${f.type}" id="focus-inp" class="finput"
            value="${escapeAttr(inputVal||'')}" placeholder="Your answer..."
            onkeydown="if(event.key==='Enter'){focusGo(1);}">
        </div>`;
  }
  card.innerHTML = `
    <div class="focus-qnum">${escapeAttr(chatSectionLabel(f))} — question ${focusIdx+1} of ${total}</div>
    <div class="focus-q">${escapeAttr(f.q)}</div>
    ${f.hint?`<div class="focus-hint">${escapeAttr(f.hint)}</div>`:''}
    ${f.required?`<div class="focus-req"><span style="color:var(--accent)">✦</span> Required field</div>`:''}
    ${inputHtml}
  `;
  setTimeout(()=>{ const inp = card.querySelector('input:not([type=hidden]),textarea,select'); if(inp) inp.focus(); }, 80);
}

function focusOption(btn, val){
  btn.closest('.focus-options').querySelectorAll('.fopt').forEach(b=>b.classList.remove('chosen'));
  btn.classList.add('chosen');
  setChatVal(ensureQuestionPlan()[focusIdx], val);
  setTimeout(()=>focusGo(1), 500);
}

function focusGo(dir){
  if(pendingAdaptiveMode === 'focus') return;
  const plan = ensureQuestionPlan();
  const f = plan[focusIdx];
  if(!f) return;
  if(f.type==='tags'){
    const wrap = document.getElementById('focus-tag-wrap');
    if(wrap){ const tags = [...wrap.querySelectorAll('.tag-pill')].map(p=>p.childNodes[0].textContent.trim()); setChatVal(f, tags); }
  } else if(f.type==='phone'){
    setChatVal(f, readInput(f, 'focus_'));
  } else if(f.type==='select' || f.type==='timezone'){
    const el = document.getElementById('focus-inp');
    if(el) setChatVal(f, el.value);
  } else {
    const inp = document.getElementById('focus-inp');
    if(inp) setChatVal(f, inp.value.trim());
  }
  const next = focusIdx + dir;
  if(next < 0) return;
  if(next >= plan.length){
    if(!optionalGroupPromptShown){
      optionalGroupPromptShown = true;
      document.getElementById('focus-card').innerHTML = optionalGroupHtml('focus');
      document.getElementById('focus-prog-fill').style.width='100%';
      document.getElementById('focus-counter').textContent = `${planLabel()} complete`;
      return;
    }
    const filled = [formData, summaryData, experienceData, educationData, skillsData, linksData]
      .reduce((t,d)=>t+Object.keys(d).length, 0);
    document.getElementById('focus-card').innerHTML = `
      <div class="focus-qnum">Complete</div>
      <div class="focus-q">${planLabel()} <em style="color:var(--accent);font-style:italic;">done.</em></div>
      <div class="focus-hint" style="margin-top:10px;">You filled ${filled} fields. Review everything in Dashboard, add optional details, or save the draft.</div>
      <div style="display:flex;gap:10px;margin-top:28px;">
        <button class="btn btn-teal" onclick="switchMode('dashboard')">Review in Dashboard</button>
        <button class="btn btn-ghost" onclick="saveAll()">Save draft</button>
        <button class="btn btn-ghost" onclick="initFocus()">Start over</button>
      </div>`;
    document.getElementById('focus-prog-fill').style.width='100%';
    document.getElementById('focus-counter').textContent = '✓ All done';
    return;
  }
  focusIdx = next;
  renderFocusCard();
}

// Keyboard shortcuts
document.addEventListener('keydown', e=>{
  if(e.key === 'Escape'){
    document.querySelectorAll('.phone-country.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.phone-country-button')?.setAttribute('aria-expanded', 'false');
    });
  }
  if(activeMode==='focus' && e.key==='Enter'){
    if(pendingAdaptiveMode === 'focus') return;
    const tag = document.activeElement.tagName;
    if(tag!=='INPUT' && tag!=='TEXTAREA' && tag!=='SELECT') focusGo(1);
  }
  if(pendingAdaptiveMode === 'focus') return;
  if(activeMode==='focus' && (ensureQuestionPlan()[focusIdx]?.type==='select' || ensureQuestionPlan()[focusIdx]?.type==='timezone')){
    const idx = e.key.toUpperCase().charCodeAt(0)-65;
    const opts = document.querySelectorAll('.fopt');
    if(idx>=0 && idx<opts.length) opts[idx].click();
  }
});

document.addEventListener('click', e => {
  if(e.target.closest('.phone-country')) return;
  document.querySelectorAll('.phone-country.open').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.phone-country-button')?.setAttribute('aria-expanded', 'false');
  });
});

function populateSectionData(fields, store, source){
  fields.forEach(f => {
    const v = source[f.key];
    if(v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0)){
      store[f.key] = v;
    }
  });
}

// Sync wizard DOM inputs for a given set of fields + data
function syncWizardSection(fields, data, prefix){
  fields.forEach(f => {
    const id = prefix + f.key;
    if(f.type === 'phone'){
      const parsed = parsePhoneValue(data[f.key]);
      const country = document.getElementById(id + '_country');
      const input   = document.getElementById(id);
      if(country && parsed.iso2){ country.value = parsed.iso2; updatePhoneCodePreview(country); }
      if(input) input.value = parsed.number;
    } else if(f.type === 'tags'){
      const wrap = document.getElementById(id + '-wrap');
      if(wrap && Array.isArray(data[f.key])){
        const inp = wrap.querySelector('input');
        [...wrap.querySelectorAll('.tag-pill')].forEach(p => p.remove());
        data[f.key].forEach(val => {
          const pill = document.createElement('span');
          pill.className = 'tag-pill';
          pill.textContent = val;
          const rx = document.createElement('button');
          rx.className = 'rx'; rx.textContent = 'x';
          rx.onclick = () => removeTag(rx);
          pill.appendChild(rx);
          wrap.insertBefore(pill, inp);
        });
      }
    } else if(f.type === 'select' || f.type === 'timezone'){
      const el = document.getElementById(id);
      if(el && data[f.key] !== undefined) el.value = data[f.key];
    } else {
      const el = document.getElementById(id);
      if(el && data[f.key] !== undefined){
        el.value = f.type === 'date' && data[f.key]
          ? new Date(data[f.key]).toISOString().slice(0, 10)
          : data[f.key];
      }
    }
  });
}

// Load existing resume data into the wizard fields.
// If ?id=<resumeId> is in the URL, load that specific resume; otherwise load the first.
function loadExistingData() {
  const resumeId = new URLSearchParams(window.location.search).get('id');
  const fetchUrl = resumeId ? `/resume/${resumeId}` : '/resume/all';

  fetch(fetchUrl)
    .then(r => r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status)))
    .then(raw => {
      const data = resumeId ? { results: [raw] } : raw;
      if (!data?.results?.length) return;
      const doc = data.results[0];

      // Populate all section stores
      populateSectionData(FIELDS,               formData,        doc.personal   || {});
      populateSectionData(SUMMARY_FIELDS,        summaryData,     doc.summary    || {});
      populateSectionData(EXPERIENCE_FIELDS,     experienceData,  doc.experience || {});
      populateSectionData(EDUCATION_FLAT_FIELDS, educationData,   doc.education  || {});
      populateSectionData(SKILLS_FIELDS,         skillsData,      doc.skills     || {});
      populateSectionData(LINKS_FIELDS,          linksData,       doc.links      || {});

      // Convert boolean flags back to Yes/No for select fields
      ['openToContract','openToPartTime','openToOverseasWork'].forEach(k => {
        if(experienceData[k] !== undefined) experienceData[k] = experienceData[k] ? 'Yes' : 'No';
      });

      // Work history entries
      if(Array.isArray(doc.workHistory) && doc.workHistory.length){
        workHistory = doc.workHistory.map(e => ({...e, isCurrent: e.isCurrent ? 'Yes' : 'No'}));
      }
      // Education entries
      if(Array.isArray(doc.education?.entries) && doc.education.entries.length){
        educationEntries = [...doc.education.entries];
      }

      hydratePhoneControls();
      // Sync wizard DOM
      syncWizardSection(FIELDS,               formData,        'wiz_');
      syncWizardSection(SUMMARY_FIELDS,        summaryData,     'wiz_');
      syncWizardSection(EXPERIENCE_FIELDS,     experienceData,  'wiz_');
      syncWizardSection(EDUCATION_FLAT_FIELDS, educationData,   'wiz_');
      syncWizardSection(SKILLS_FIELDS,         skillsData,      'wiz_');
      syncWizardSection(LINKS_FIELDS,          linksData,       'wiz_');

      updatePct();
      if(activeMode === 'dashboard') renderDashCards();
      if(activeMode === 'dashboard' && (activeDashSection === 'workhistory' || activeDashSection === 'eduentries')) renderDashCards();
    })
    .catch(err => {
      console.error('[loadExistingData] Failed:', err);
      showToast('Could not load resume data — check console');
    });
}

// Auth guard — redirect if not signed in, then load existing resume data
// Skip loadExistingData when ?new=1 (creating a brand-new resume)
const _isNewResume = new URLSearchParams(window.location.search).get('new') === '1';
fetch('/auth/me')
  .then(res => {
    if (!res.ok) throw new Error();
    return res.json();
  })
  .then(data => {
    if (!data?.user) throw new Error();
    const loaders = Promise.all([loadCountryCallingCodes(), loadTimeZones()]);
    return _isNewResume ? loaders : loaders.then(loadExistingData);
  })
  .catch(() => { window.location.href = '/auth.html'; });

// Init
document.documentElement.style.setProperty('--accent', MODE_ACCENTS['wizard']);
updatePct();
