/**
 * Seed script — 25 diverse users and their resume documents.
 * All test accounts use password: Password123
 *
 * Run: node scripts/seed.js
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';
import { Resume } from '../models/resume.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resumeDB';
const TEST_PASSWORD = 'Password123';

/* ─────────────────────────────────────────
   PERSONA DATA
───────────────────────────────────────── */
const personas = [

  /* 1 — Senior Software Engineer, Bengaluru */
  {
    email: 'priya.sharma@example.com',
    resume: {
      isActive: true, isComplete: false,
      personal: {
        fullName: 'Priya Sharma', profileTitle: 'Senior Software Engineer',
        dateOfBirth: new Date('1996-03-14'), gender: 'Female',
        nationality: 'Indian', email: 'priya.sharma@example.com',
        contactNumber: '+91 98765 43210',
        city: 'Bengaluru', stateProvince: 'Karnataka', country: 'India', postalCode: '560001',
        languagesKnown: ['English', 'Hindi', 'Kannada'],
        personalTagline: 'Building scalable systems, one commit at a time',
        maritalStatus: 'Single',
      },
      summary: {
        professionalSummary: 'Full-stack engineer with 5 years of experience building React and Node.js applications. Passionate about clean code and developer experience.',
        careerObjective: 'Seeking a senior engineering role at a product-first company where I can lead cross-functional teams.',
      },
      experience: {
        jobCategorySlug: 'technology', jobRoleSlug: 'software-engineer',
        experienceLevelSlug: 'senior', workModeSlug: 'hybrid',
        currentDesignation: 'Senior Software Engineer', currentCompany: 'Infosys',
        yearsOfExperience: 5, employmentType: 'Full-time',
        expectedSalary: '25 LPA', noticePeriod: '30 days',
        targetIndustry: ['Technology', 'Fintech', 'SaaS'],
        openToContract: false, openToOverseasWork: true,
      },
      workHistory: [
        {
          company: 'Infosys', title: 'Senior Software Engineer',
          startDate: new Date('2022-06-01'), isCurrent: true, employmentType: 'Full-time',
          description: 'Leading a team of 4 engineers building microservices for a US banking client.',
          skillsUsed: ['React', 'Node.js', 'AWS', 'PostgreSQL'],
        },
        {
          company: 'Wipro', title: 'Software Engineer',
          startDate: new Date('2019-07-15'), endDate: new Date('2022-05-31'), employmentType: 'Full-time',
          description: 'Developed RESTful APIs and frontend components for an e-commerce platform.',
          skillsUsed: ['JavaScript', 'Express', 'MongoDB', 'Angular'],
        },
      ],
      education: {
        educationLevelSlug: 'bachelor', highestEducation: 'B.E. Computer Science',
        entries: [{ level: 'bachelor', institution: 'R.V. College of Engineering', degree: 'B.E. Computer Science', year: 2019, gradeOrGpa: '8.6 CGPA' }],
      },
      skills: {
        technicalSkills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker'],
        softSkills: ['Leadership', 'Problem Solving', 'Communication'],
        computerSkills: ['Git', 'Jira', 'Figma'],
      },
      links: { linkedinProfile: 'https://linkedin.com/in/priyasharma', githubProfile: 'https://github.com/priyasharma' },
    },
  },

  /* 2 — Registered Nurse, Dubai */
  {
    email: 'mohammed.alrashid@example.com',
    resume: {
      isActive: true, isComplete: true,
      personal: {
        fullName: 'Mohammed Al-Rashid', profileTitle: 'Registered Nurse',
        dateOfBirth: new Date('1990-07-22'), gender: 'Male',
        nationality: 'Indian', citizenship: 'Indian',
        email: 'mohammed.alrashid@example.com', contactNumber: '+971 50 123 4567',
        city: 'Dubai', country: 'UAE',
        languagesKnown: ['English', 'Arabic', 'Malayalam'],
        maritalStatus: 'Married',
      },
      summary: {
        professionalSummary: 'Compassionate ICU nurse with 7 years of experience in critical care settings across India and the UAE. BLS and ACLS certified.',
        careerHighlights: ['Reduced ICU-acquired infections by 18% through protocol adherence', 'Mentored 6 junior nurses at DHA-accredited hospital'],
      },
      experience: {
        jobCategorySlug: 'healthcare', jobRoleSlug: 'registered-nurse',
        experienceLevelSlug: 'mid', workModeSlug: 'on-site',
        currentDesignation: 'Staff Nurse — ICU', currentCompany: 'Dubai Health Authority',
        yearsOfExperience: 7, employmentType: 'Full-time',
        expectedSalary: 'AED 9,000/month', noticePeriod: '60 days',
        openToOverseasWork: true, openToContract: true,
      },
      workHistory: [
        {
          company: 'Mediclinic City Hospital', title: 'Staff Nurse — ICU',
          startDate: new Date('2020-03-01'), isCurrent: true, employmentType: 'Full-time',
          description: 'Providing critical care nursing in a 24-bed ICU. Managing ventilator patients and post-surgical care.',
          achievements: ['DHA license holder', 'Zero medication errors for 3 consecutive years'],
        },
        {
          company: 'Apollo Hospitals', title: 'Staff Nurse',
          startDate: new Date('2017-06-01'), endDate: new Date('2020-02-28'), employmentType: 'Full-time',
          location: 'Chennai, India',
          description: 'General ward and surgical nursing at a 500-bed tertiary care hospital.',
        },
      ],
      education: {
        educationLevelSlug: 'bachelor',
        entries: [{ level: 'bachelor', institution: 'Kerala University of Health Sciences', degree: 'B.Sc Nursing', year: 2017, gradeOrGpa: 'First Class' }],
      },
      skills: {
        technicalSkills: ['Critical Care Nursing', 'Ventilator Management', 'IV Therapy', 'Wound Care', 'ECG Interpretation'],
        softSkills: ['Empathy', 'Teamwork', 'Stress Management'],
      },
      additional: {
        certifications: ['BLS (Basic Life Support)', 'ACLS (Advanced Cardiovascular Life Support)'],
        licenses: ['DHA License — Registered Nurse'],
        visaStatus: 'Employment Visa', passportNumber: 'P1234567',
        willingnessToRelocate: true,
      },
    },
  },

  /* 3 — Fresh MBA Graduate, Mumbai */
  {
    email: 'anjali.nair@example.com',
    resume: {
      isActive: true, isComplete: false,
      personal: {
        fullName: 'Anjali Nair', profileTitle: 'MBA Graduate — Marketing',
        dateOfBirth: new Date('2001-11-05'), gender: 'Female',
        nationality: 'Indian', email: 'anjali.nair@example.com',
        contactNumber: '+91 91234 56789',
        city: 'Mumbai', stateProvince: 'Maharashtra', country: 'India',
        languagesKnown: ['English', 'Hindi', 'Malayalam'],
        maritalStatus: 'Single',
      },
      summary: {
        careerObjective: 'Aspiring marketing professional looking to apply strategic thinking and digital marketing skills in an FMCG or consumer brand. Eager to learn and grow.',
      },
      experience: {
        jobCategorySlug: 'marketing', jobRoleSlug: 'marketing-executive',
        experienceLevelSlug: 'entry', workModeSlug: 'hybrid',
        yearsOfExperience: 0, employmentType: 'Full-time',
        expectedSalary: '6 LPA',
        targetIndustry: ['FMCG', 'E-commerce', 'Media'],
        openToInternship: true,
      },
      education: {
        educationLevelSlug: 'postgraduate',
        entries: [
          { level: 'postgraduate', institution: 'NMIMS Mumbai', degree: 'MBA — Marketing & Strategy', year: 2025, gradeOrGpa: '3.8 / 4.0 GPA' },
          { level: 'bachelor', institution: 'Christ University, Bengaluru', degree: 'BBA', year: 2023, gradeOrGpa: '8.9 CGPA' },
        ],
      },
      skills: {
        technicalSkills: ['Google Analytics', 'Meta Ads Manager', 'Canva', 'HubSpot', 'Excel'],
        softSkills: ['Creativity', 'Presentation', 'Teamwork'],
      },
    },
  },

  /* 4 — Senior Project Manager, Hyderabad */
  {
    email: 'ravi.kumar@example.com',
    resume: {
      isActive: true, isComplete: true,
      personal: {
        fullName: 'Ravi Kumar', profileTitle: 'Senior Project Manager — IT',
        dateOfBirth: new Date('1984-08-19'), gender: 'Male',
        nationality: 'Indian', email: 'ravi.kumar@example.com',
        contactNumber: '+91 99887 76655',
        city: 'Hyderabad', stateProvince: 'Telangana', country: 'India',
        languagesKnown: ['English', 'Hindi', 'Telugu'],
        maritalStatus: 'Married', fatherName: 'Suresh Kumar',
      },
      summary: {
        professionalSummary: 'PMP-certified IT project manager with 12 years of experience delivering enterprise software projects for Fortune 500 clients. Strong background in Agile and Waterfall methodologies.',
        keyAchievements: ['Delivered $4M ERP implementation 2 weeks ahead of schedule', 'Managed distributed teams across 4 time zones', 'Reduced project overruns by 35% through improved risk frameworks'],
      },
      experience: {
        jobCategorySlug: 'technology', jobRoleSlug: 'project-manager',
        experienceLevelSlug: 'senior', workModeSlug: 'hybrid',
        currentDesignation: 'Senior Project Manager', currentCompany: 'Capgemini',
        yearsOfExperience: 12, employmentType: 'Full-time',
        expectedSalary: '40 LPA', noticePeriod: '90 days',
        teamSizeHandled: 25, budgetHandled: '$4M+',
        targetIndustry: ['Technology', 'Banking', 'Consulting'],
      },
      workHistory: [
        {
          company: 'Capgemini', title: 'Senior Project Manager',
          startDate: new Date('2019-01-01'), isCurrent: true, employmentType: 'Full-time',
          description: 'Managing end-to-end delivery of SAP S/4HANA implementation for a European retail client.',
          achievements: ['On-time, on-budget delivery for 3 consecutive projects'],
          skillsUsed: ['SAP', 'Agile', 'MS Project', 'JIRA', 'Stakeholder Management'],
        },
        {
          company: 'Tata Consultancy Services', title: 'Project Manager',
          startDate: new Date('2014-04-01'), endDate: new Date('2018-12-31'), employmentType: 'Full-time',
          description: 'Led a 15-member cross-functional team for a US insurance client migration project.',
          skillsUsed: ['Waterfall', 'Risk Management', 'PRINCE2'],
        },
        {
          company: 'HCL Technologies', title: 'Senior Business Analyst',
          startDate: new Date('2012-07-01'), endDate: new Date('2014-03-31'), employmentType: 'Full-time',
          description: 'Requirements gathering and stakeholder management for banking software.',
        },
      ],
      education: {
        educationLevelSlug: 'bachelor',
        entries: [{ level: 'bachelor', institution: 'Osmania University', degree: 'B.Tech Information Technology', year: 2012, gradeOrGpa: '72%' }],
      },
      skills: {
        technicalSkills: ['Agile / Scrum', 'Waterfall', 'JIRA', 'MS Project', 'SAP', 'Risk Management', 'Stakeholder Management'],
        softSkills: ['Leadership', 'Negotiation', 'Conflict Resolution', 'Communication'],
        computerSkills: ['MS Office Suite', 'Confluence', 'Smartsheet'],
      },
      additional: {
        certifications: ['PMP (Project Management Professional)', 'PRINCE2 Practitioner', 'CSM (Certified Scrum Master)'],
      },
      links: { linkedinProfile: 'https://linkedin.com/in/ravikumar-pm' },
    },
  },

  /* 5 — Secondary School Teacher, Lagos */
  {
    email: 'sarah.okonkwo@example.com',
    resume: {
      isActive: true, isComplete: false,
      personal: {
        fullName: 'Sarah Okonkwo', profileTitle: 'Secondary School Mathematics Teacher',
        dateOfBirth: new Date('1988-05-30'), gender: 'Female',
        nationality: 'Nigerian', email: 'sarah.okonkwo@example.com',
        contactNumber: '+234 803 456 7890',
        city: 'Lagos', country: 'Nigeria',
        languagesKnown: ['English', 'Yoruba', 'Igbo'],
        maritalStatus: 'Married',
      },
      summary: {
        professionalSummary: 'Dedicated Mathematics and Further Mathematics teacher with 8 years of experience in Nigerian secondary schools. WAEC and JAMB examiner. Committed to making mathematics accessible for all learners.',
      },
      experience: {
        jobCategorySlug: 'education', jobRoleSlug: 'teacher',
        experienceLevelSlug: 'mid', workModeSlug: 'on-site',
        currentDesignation: 'Senior Mathematics Teacher', currentCompany: 'Corona Secondary School',
        yearsOfExperience: 8, employmentType: 'Full-time',
        targetIndustry: ['Education', 'EdTech'],
        openToOverseasWork: true,
      },
      workHistory: [
        {
          company: 'Corona Secondary School', title: 'Senior Mathematics Teacher',
          startDate: new Date('2019-09-01'), isCurrent: true, employmentType: 'Full-time',
          description: 'Teaching Mathematics and Further Mathematics to SS1–SS3. 98% WAEC pass rate in 2024.',
          achievements: ['Best Teacher Award 2023', '100% JAMB success rate for Mathematics students'],
        },
        {
          company: 'Meadow Hall School', title: 'Mathematics Teacher',
          startDate: new Date('2016-09-01'), endDate: new Date('2019-08-31'), employmentType: 'Full-time',
        },
      ],
      education: {
        educationLevelSlug: 'bachelor',
        entries: [{ level: 'bachelor', institution: 'University of Lagos', degree: 'B.Ed Mathematics Education', year: 2015, gradeOrGpa: 'Second Class Upper' }],
      },
      skills: {
        technicalSkills: ['Curriculum Development', 'WAEC Examination Marking', 'Microsoft Office', 'Google Classroom'],
        teachingSkills: ['Classroom Management', 'Lesson Planning', 'Differentiated Instruction'],
        softSkills: ['Patience', 'Communication', 'Mentoring'],
      },
    },
  },

  /* 6 — DevOps Engineer, Pune */
  {
    email: 'vikram.patel@example.com',
    resume: {
      isActive: true, isComplete: false,
      personal: {
        fullName: 'Vikram Patel', profileTitle: 'DevOps / Cloud Engineer',
        dateOfBirth: new Date('1993-12-01'), gender: 'Male',
        nationality: 'Indian', email: 'vikram.patel@example.com',
        contactNumber: '+91 97654 32109',
        city: 'Pune', stateProvince: 'Maharashtra', country: 'India',
        languagesKnown: ['English', 'Hindi', 'Gujarati'],
        maritalStatus: 'Single',
        personalTagline: 'Automating everything that moves',
      },
      experience: {
        jobCategorySlug: 'technology', jobRoleSlug: 'devops-engineer',
        experienceLevelSlug: 'mid', workModeSlug: 'remote',
        currentDesignation: 'DevOps Engineer', currentCompany: 'Persistent Systems',
        yearsOfExperience: 6, employmentType: 'Full-time',
        expectedSalary: '22 LPA', noticePeriod: '30 days',
        openToOverseasWork: true, openToContract: true,
      },
      workHistory: [
        {
          company: 'Persistent Systems', title: 'DevOps Engineer',
          startDate: new Date('2021-03-01'), isCurrent: true, employmentType: 'Full-time',
          description: 'Building and maintaining CI/CD pipelines for a healthcare SaaS product on AWS.',
          skillsUsed: ['AWS', 'Kubernetes', 'Terraform', 'Jenkins', 'Prometheus'],
        },
        {
          company: 'Xoriant Solutions', title: 'Junior DevOps Engineer',
          startDate: new Date('2018-07-01'), endDate: new Date('2021-02-28'), employmentType: 'Full-time',
          skillsUsed: ['Docker', 'CI/CD', 'Linux', 'Bash'],
        },
      ],
      education: {
        educationLevelSlug: 'bachelor',
        entries: [{ level: 'bachelor', institution: 'Pune University', degree: 'B.E. Information Technology', year: 2018 }],
      },
      skills: {
        technicalSkills: ['AWS', 'Azure', 'Kubernetes', 'Docker', 'Terraform', 'Ansible', 'Jenkins', 'GitHub Actions', 'Linux', 'Python', 'Bash'],
        computerSkills: ['Grafana', 'Prometheus', 'ELK Stack'],
      },
      additional: { certifications: ['AWS Certified Solutions Architect — Associate', 'CKA (Certified Kubernetes Administrator)'] },
      links: { githubProfile: 'https://github.com/vikrampatel', linkedinProfile: 'https://linkedin.com/in/vikrampatel' },
    },
  },

  /* 7 — HR Manager, Delhi */
  {
    email: 'sunita.gupta@example.com',
    resume: {
      isActive: true, isComplete: true,
      personal: {
        fullName: 'Sunita Gupta', profileTitle: 'Human Resources Manager',
        dateOfBirth: new Date('1985-02-14'), gender: 'Female',
        nationality: 'Indian', email: 'sunita.gupta@example.com',
        contactNumber: '+91 98112 34567',
        city: 'New Delhi', stateProvince: 'Delhi', country: 'India',
        languagesKnown: ['English', 'Hindi'],
        maritalStatus: 'Married', fatherName: 'Ramesh Gupta',
      },
      summary: {
        professionalSummary: 'Strategic HR professional with 9 years of experience in talent acquisition, employee relations, and organizational development across IT and manufacturing sectors.',
        keyAchievements: ['Reduced attrition from 28% to 14% in 18 months', 'Implemented HRIS that saved 200+ manual hours per month', 'Led diversity hiring initiative increasing women workforce from 22% to 38%'],
      },
      experience: {
        jobCategorySlug: 'human-resources', jobRoleSlug: 'hr-manager',
        experienceLevelSlug: 'senior', workModeSlug: 'on-site',
        currentDesignation: 'HR Manager', currentCompany: 'Havells India Ltd',
        yearsOfExperience: 9, employmentType: 'Full-time',
        expectedSalary: '18 LPA', noticePeriod: '60 days',
        teamSizeHandled: 6,
      },
      workHistory: [
        {
          company: 'Havells India Ltd', title: 'HR Manager',
          startDate: new Date('2020-01-01'), isCurrent: true, employmentType: 'Full-time',
          description: 'Managing end-to-end HR operations for a 600-employee manufacturing plant including recruitment, payroll, compliance, and L&D.',
          skillsUsed: ['SAP HR', 'Talent Acquisition', 'Performance Management', 'Labour Law Compliance'],
        },
        {
          company: 'Mphasis Ltd', title: 'HR Business Partner',
          startDate: new Date('2015-06-01'), endDate: new Date('2019-12-31'), employmentType: 'Full-time',
          description: 'HRBP for a 350-person IT services business unit. Focused on retention, L&D, and engagement.',
        },
      ],
      education: {
        educationLevelSlug: 'postgraduate',
        entries: [
          { level: 'postgraduate', institution: 'XLRI Jamshedpur', degree: 'PGDM — Human Resources', year: 2015, gradeOrGpa: '3.6 / 4.0' },
          { level: 'bachelor', institution: 'Delhi University', degree: 'B.A. Psychology', year: 2013 },
        ],
      },
      skills: {
        technicalSkills: ['SAP HR', 'Workday', 'MS Excel', 'Darwinbox'],
        professionalSkills: ['Talent Acquisition', 'Performance Management', 'L&D', 'Labour Law', 'Payroll'],
        softSkills: ['Empathy', 'Conflict Resolution', 'Communication', 'Negotiation'],
      },
    },
  },

  /* 8 — Financial Analyst, Nairobi */
  {
    email: 'james.mwangi@example.com',
    resume: {
      isActive: true, isComplete: false,
      personal: {
        fullName: 'James Mwangi', profileTitle: 'Financial Analyst',
        dateOfBirth: new Date('1994-09-03'), gender: 'Male',
        nationality: 'Kenyan', email: 'james.mwangi@example.com',
        contactNumber: '+254 712 345678',
        city: 'Nairobi', country: 'Kenya',
        languagesKnown: ['English', 'Swahili'],
        maritalStatus: 'Single',
      },
      summary: {
        professionalSummary: 'CPA-K qualified financial analyst with 4 years of experience in financial modeling, budgeting, and investment analysis in the East African market.',
      },
      experience: {
        jobCategorySlug: 'finance', jobRoleSlug: 'financial-analyst',
        experienceLevelSlug: 'mid', workModeSlug: 'hybrid',
        currentDesignation: 'Financial Analyst', currentCompany: 'Equity Bank Kenya',
        yearsOfExperience: 4, employmentType: 'Full-time',
        expectedSalary: 'KES 180,000/month',
        openToOverseasWork: true,
      },
      workHistory: [
        {
          company: 'Equity Bank Kenya', title: 'Financial Analyst',
          startDate: new Date('2021-07-01'), isCurrent: true, employmentType: 'Full-time',
          description: 'Building financial models for SME loan portfolio, preparing board-level financial reports, and conducting variance analysis.',
          skillsUsed: ['Financial Modeling', 'Excel', 'Power BI', 'SQL'],
        },
        {
          company: 'Deloitte Kenya', title: 'Audit Associate',
          startDate: new Date('2020-01-01'), endDate: new Date('2021-06-30'), employmentType: 'Full-time',
        },
      ],
      education: {
        educationLevelSlug: 'bachelor',
        entries: [{ level: 'bachelor', institution: 'University of Nairobi', degree: 'B.Com Finance', year: 2019, gradeOrGpa: 'Second Class Upper' }],
      },
      skills: {
        technicalSkills: ['Financial Modeling', 'Excel', 'Power BI', 'SQL', 'Bloomberg Terminal', 'QuickBooks'],
        financeSkills: ['Budgeting', 'Variance Analysis', 'Investment Analysis', 'IFRS'],
      },
      additional: { certifications: ['CPA-K (Certified Public Accountant — Kenya)', 'CFA Level 1 — Passed'] },
    },
  },

  /* 9 — Senior Physician, Chennai */
  {
    email: 'lakshmi.iyer@example.com',
    resume: {
      isActive: true, isComplete: true,
      personal: {
        fullName: 'Dr. Lakshmi Iyer', profileTitle: 'Senior Consultant — Internal Medicine',
        dateOfBirth: new Date('1977-04-12'), gender: 'Female',
        nationality: 'Indian', email: 'lakshmi.iyer@example.com',
        contactNumber: '+91 94440 12345',
        city: 'Chennai', stateProvince: 'Tamil Nadu', country: 'India',
        languagesKnown: ['English', 'Tamil', 'Hindi'],
        maritalStatus: 'Married',
      },
      summary: {
        professionalSummary: 'Board-certified internist with 15 years of clinical experience in tertiary care hospitals. Expertise in managing complex multi-system disorders. Published researcher with 8 peer-reviewed papers.',
        elevatorPitch: 'A clinician who believes in evidence-based medicine and patient-centered care, with a track record of improving patient outcomes through systematic protocol design.',
      },
      experience: {
        jobCategorySlug: 'healthcare', jobRoleSlug: 'physician',
        experienceLevelSlug: 'senior', workModeSlug: 'on-site',
        currentDesignation: 'Senior Consultant — Internal Medicine', currentCompany: 'Apollo Hospitals Chennai',
        yearsOfExperience: 15, employmentType: 'Full-time',
        expectedSalary: '60 LPA',
      },
      workHistory: [
        {
          company: 'Apollo Hospitals Chennai', title: 'Senior Consultant — Internal Medicine',
          startDate: new Date('2016-01-01'), isCurrent: true, employmentType: 'Full-time',
          description: 'Attending physician for a 40-bed internal medicine ward. Supervising PG residents and interns.',
          achievements: ['Reduced average length of stay by 1.2 days through discharge protocol redesign'],
        },
        {
          company: 'Government General Hospital', title: 'Assistant Professor & Physician',
          startDate: new Date('2010-06-01'), endDate: new Date('2015-12-31'), employmentType: 'Full-time',
          location: 'Chennai',
        },
      ],
      education: {
        educationLevelSlug: 'doctorate',
        entries: [
          { level: 'doctorate', institution: 'Madras Medical College', degree: 'M.D. Internal Medicine', year: 2010 },
          { level: 'bachelor', institution: 'Madras Medical College', degree: 'M.B.B.S', year: 2006 },
        ],
      },
      skills: {
        technicalSkills: ['Internal Medicine', 'Critical Care', 'Echocardiography', 'Point-of-Care Ultrasound', 'Clinical Research'],
        healthcareSkills: ['Patient Management', 'Clinical Protocols', 'Teaching & Mentoring'],
      },
      additional: {
        certifications: ['MRCP (UK)', 'ACLS'],
        publications: ['8 peer-reviewed papers in journals including JAPI and IJIM'],
        licenses: ['Tamil Nadu Medical Council Registration — TN-XXXX'],
      },
    },
  },

  /* 10 — Sales Executive, Jaipur */
  {
    email: 'rahul.verma@example.com',
    resume: {
      isActive: true, isComplete: false,
      personal: {
        fullName: 'Rahul Verma', profileTitle: 'Sales Executive — FMCG',
        dateOfBirth: new Date('2000-06-18'), gender: 'Male',
        nationality: 'Indian', email: 'rahul.verma@example.com',
        contactNumber: '+91 95550 67890',
        city: 'Jaipur', stateProvince: 'Rajasthan', country: 'India',
        languagesKnown: ['Hindi', 'English'],
        maritalStatus: 'Single',
      },
      summary: {
        careerObjective: 'Target-driven sales executive with 2 years of field sales experience looking to grow into a key accounts or area sales manager role.',
      },
      experience: {
        jobCategorySlug: 'sales', jobRoleSlug: 'sales-executive',
        experienceLevelSlug: 'junior', workModeSlug: 'field',
        currentDesignation: 'Sales Executive', currentCompany: 'Hindustan Unilever Ltd',
        yearsOfExperience: 2, employmentType: 'Full-time',
        expectedSalary: '5.5 LPA',
        openToFieldWork: true,
      },
      workHistory: [
        {
          company: 'Hindustan Unilever Ltd', title: 'Sales Executive',
          startDate: new Date('2023-02-01'), isCurrent: true, employmentType: 'Full-time',
          description: 'Managing 120 retail outlets across Jaipur urban territory. Consistently exceeding monthly volume targets.',
          achievements: ['130% target achievement in Q3 2024', 'Onboarded 22 new outlets in 6 months'],
        },
      ],
      education: {
        educationLevelSlug: 'bachelor',
        entries: [{ level: 'bachelor', institution: 'University of Rajasthan', degree: 'B.Com', year: 2022 }],
      },
      skills: {
        salesSkills: ['Territory Management', 'Retail Sales', 'Route Planning', 'Negotiation'],
        computerSkills: ['MS Excel', 'Salesforce (basic)'],
      },
      additional: { drivingLicense: 'Rajasthan DL — LMV', willingnessToTravel: true },
    },
  },

  /* 11 — UI/UX Designer, Karachi */
  {
    email: 'fatima.khan@example.com',
    resume: {
      isActive: true, isComplete: false,
      personal: {
        fullName: 'Fatima Khan', profileTitle: 'Senior UI/UX Designer',
        dateOfBirth: new Date('1992-08-25'), gender: 'Female',
        nationality: 'Pakistani', email: 'fatima.khan@example.com',
        contactNumber: '+92 300 123 4567',
        city: 'Karachi', country: 'Pakistan',
        languagesKnown: ['English', 'Urdu'],
        maritalStatus: 'Single',
        personalTagline: 'Designing experiences that people actually enjoy',
      },
      summary: {
        professionalSummary: 'Product designer with 5 years of experience creating user-centred digital experiences for fintech and e-commerce products. Strong portfolio of mobile and web applications.',
      },
      experience: {
        jobCategorySlug: 'design', jobRoleSlug: 'ux-designer',
        experienceLevelSlug: 'mid', workModeSlug: 'remote',
        currentDesignation: 'Senior UI/UX Designer', currentCompany: 'Freelance / Remote',
        yearsOfExperience: 5, employmentType: 'Contract',
        expectedSalary: '$4,500/month',
        openToContract: true, openToOverseasWork: true,
      },
      workHistory: [
        {
          company: 'Airlift Technologies', title: 'Product Designer',
          startDate: new Date('2021-01-01'), endDate: new Date('2023-06-30'), employmentType: 'Full-time',
          description: 'Led design of the consumer-facing app for a on-demand logistics startup with 2M+ users.',
          skillsUsed: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
        },
        {
          company: 'Systems Ltd', title: 'UI Designer',
          startDate: new Date('2019-07-01'), endDate: new Date('2020-12-31'), employmentType: 'Full-time',
        },
      ],
      education: {
        educationLevelSlug: 'bachelor',
        entries: [{ level: 'bachelor', institution: 'Indus Valley School of Art', degree: 'B.Des Communication Design', year: 2019 }],
      },
      skills: {
        technicalSkills: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'InVision', 'HTML/CSS (basic)'],
        creativeSkills: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Accessibility'],
      },
      links: { behanceProfile: 'https://behance.net/fatimakhan', linkedinProfile: 'https://linkedin.com/in/fatimakhan' },
    },
  },

  /* 12 — Civil Engineer, Kochi */
  {
    email: 'arun.menon@example.com',
    resume: {
      isActive: true, isComplete: false,
      personal: {
        fullName: 'Arun Menon', profileTitle: 'Civil Engineer — Structural',
        dateOfBirth: new Date('1989-03-07'), gender: 'Male',
        nationality: 'Indian', email: 'arun.menon@example.com',
        contactNumber: '+91 94470 98765',
        city: 'Kochi', stateProvince: 'Kerala', country: 'India',
        languagesKnown: ['Malayalam', 'English', 'Hindi'],
        maritalStatus: 'Married',
      },
      experience: {
        jobCategorySlug: 'engineering', jobRoleSlug: 'civil-engineer',
        experienceLevelSlug: 'mid', workModeSlug: 'on-site',
        currentDesignation: 'Structural Engineer', currentCompany: 'L&T Construction',
        yearsOfExperience: 8, employmentType: 'Full-time',
        expectedSalary: '15 LPA',
        openToOverseasWork: true,
      },
      workHistory: [
        {
          company: 'L&T Construction', title: 'Structural Engineer',
          startDate: new Date('2018-08-01'), isCurrent: true, employmentType: 'Full-time',
          description: 'Structural design and site supervision for a Rs 450 Cr metro rail viaduct project in Kochi.',
          skillsUsed: ['STAAD Pro', 'AutoCAD', 'ETABS', 'MS Project'],
        },
        {
          company: 'Malabar Cements', title: 'Site Engineer',
          startDate: new Date('2016-06-01'), endDate: new Date('2018-07-31'), employmentType: 'Full-time',
        },
      ],
      education: {
        educationLevelSlug: 'bachelor',
        entries: [{ level: 'bachelor', institution: 'NIT Calicut', degree: 'B.Tech Civil Engineering', year: 2016, gradeOrGpa: '7.8 CGPA' }],
      },
      skills: {
        technicalSkills: ['STAAD Pro', 'ETABS', 'AutoCAD', 'Primavera P6', 'MS Project', 'Revit Structure'],
      },
      additional: { certifications: ['LEED Green Associate'] },
    },
  },

  /* 13 — Content Writer & SEO, Pune (remote) */
  {
    email: 'neha.joshi@example.com',
    resume: {
      isActive: true, isComplete: false,
      personal: {
        fullName: 'Neha Joshi', profileTitle: 'Content Writer & SEO Specialist',
        dateOfBirth: new Date('1997-01-29'), gender: 'Female',
        nationality: 'Indian', email: 'neha.joshi@example.com',
        contactNumber: '+91 90211 45678',
        city: 'Pune', stateProvince: 'Maharashtra', country: 'India',
        currentLocation: 'Remote — Pune',
        languagesKnown: ['English', 'Hindi', 'Marathi'],
        personalTagline: 'Words that rank and resonate',
      },
      summary: {
        professionalSummary: 'Content strategist and SEO writer with 3 years of experience creating long-form articles, product copy, and email campaigns for B2B SaaS and lifestyle brands.',
      },
      experience: {
        jobCategorySlug: 'content-marketing', jobRoleSlug: 'content-writer',
        experienceLevelSlug: 'junior', workModeSlug: 'remote',
        currentDesignation: 'Senior Content Writer', currentCompany: 'Pepper Content',
        yearsOfExperience: 3, employmentType: 'Full-time',
        expectedSalary: '8 LPA',
      },
      workHistory: [
        {
          company: 'Pepper Content', title: 'Senior Content Writer',
          startDate: new Date('2022-05-01'), isCurrent: true, employmentType: 'Full-time',
          description: 'Writing SEO-optimised long-form content (2000–3500 words) for clients in fintech, health, and SaaS. 40+ articles/month.',
          achievements: ['Grew client blog from 5K to 80K monthly organic visits in 14 months'],
        },
        {
          company: 'Freelance', title: 'Content Writer',
          startDate: new Date('2021-01-01'), endDate: new Date('2022-04-30'), employmentType: 'Freelance',
        },
      ],
      education: {
        educationLevelSlug: 'bachelor',
        entries: [{ level: 'bachelor', institution: 'Savitribai Phule Pune University', degree: 'B.A. English Literature', year: 2020 }],
      },
      skills: {
        technicalSkills: ['SEO Writing', 'Ahrefs', 'SEMrush', 'WordPress', 'Grammarly', 'Surfer SEO'],
        digitalSkills: ['Content Strategy', 'Email Copywriting', 'Social Media Content'],
      },
      links: { portfolioWebsite: 'https://nehajoshi.contently.com', linkedinProfile: 'https://linkedin.com/in/nehajoshi' },
    },
  },

  /* 14 — CFO, Mumbai */
  {
    email: 'sanjay.mehta@example.com',
    resume: {
      isActive: true, isComplete: true,
      personal: {
        fullName: 'Sanjay Mehta', profileTitle: 'Chief Financial Officer',
        dateOfBirth: new Date('1971-11-08'), gender: 'Male',
        nationality: 'Indian', email: 'sanjay.mehta@example.com',
        contactNumber: '+91 98201 11111',
        city: 'Mumbai', stateProvince: 'Maharashtra', country: 'India',
        languagesKnown: ['English', 'Hindi', 'Gujarati'],
        maritalStatus: 'Married', fatherName: 'Hasmukh Mehta',
      },
      summary: {
        executiveSummary: 'Seasoned CFO with 22 years of experience leading financial strategy for mid-cap to large-cap companies across FMCG, retail, and real estate. Strong track record in IPO preparation, M&A, and financial transformation.',
        keyAchievements: ['Led IPO preparation for a Rs 900 Cr listing on BSE SME', 'Executed Rs 250 Cr debt refinancing saving Rs 18 Cr annually', 'Built finance team from 6 to 28 professionals'],
        professionalHeadline: 'CFO | IPO | M&A | Financial Transformation | Board Advisory',
      },
      experience: {
        jobCategorySlug: 'finance', jobRoleSlug: 'chief-financial-officer',
        experienceLevelSlug: 'executive', workModeSlug: 'on-site',
        currentDesignation: 'Chief Financial Officer', currentCompany: 'Godrej Properties Ltd',
        yearsOfExperience: 22, employmentType: 'Full-time',
        expectedSalary: '1.2 Cr CTC', noticePeriod: '90 days',
        teamSizeHandled: 28, directReports: 6, budgetHandled: 'Rs 4,500 Cr AUM',
        targetSeniority: 'C-Suite',
      },
      workHistory: [
        {
          company: 'Godrej Properties Ltd', title: 'Chief Financial Officer',
          startDate: new Date('2018-04-01'), isCurrent: true, employmentType: 'Full-time',
          description: 'Overseeing all financial operations, investor relations, treasury, and statutory compliance for a Rs 4,500 Cr real estate business.',
        },
        {
          company: 'Future Retail Ltd', title: 'VP Finance',
          startDate: new Date('2012-01-01'), endDate: new Date('2018-03-31'), employmentType: 'Full-time',
        },
        {
          company: 'KPMG India', title: 'Senior Manager — Transaction Advisory',
          startDate: new Date('2006-07-01'), endDate: new Date('2011-12-31'), employmentType: 'Full-time',
        },
      ],
      education: {
        educationLevelSlug: 'postgraduate',
        entries: [
          { level: 'postgraduate', institution: 'ICAI', degree: 'Chartered Accountant (CA)', year: 2001 },
          { level: 'bachelor', institution: 'Mumbai University', degree: 'B.Com', year: 1999 },
        ],
      },
      skills: {
        financeSkills: ['Financial Strategy', 'IPO Advisory', 'M&A', 'Treasury Management', 'Ind AS / IFRS', 'Investor Relations'],
        technicalSkills: ['SAP FICO', 'Oracle Financials', 'Power BI'],
        managementSkills: ['Board Reporting', 'Team Building', 'Stakeholder Management'],
      },
      additional: { certifications: ['Chartered Accountant — ICAI', 'CS (Company Secretary) — ICSI'] },
    },
  },

  /* 15 — Data Scientist, Hyderabad */
  {
    email: 'tanvi.reddy@example.com',
    resume: {
      isActive: true, isComplete: false,
      personal: {
        fullName: 'Tanvi Reddy', profileTitle: 'Data Scientist — Machine Learning',
        dateOfBirth: new Date('1997-05-20'), gender: 'Female',
        nationality: 'Indian', email: 'tanvi.reddy@example.com',
        contactNumber: '+91 91777 88899',
        city: 'Hyderabad', stateProvince: 'Telangana', country: 'India',
        languagesKnown: ['English', 'Telugu', 'Hindi'],
        personalTagline: 'Turning messy data into clear decisions',
      },
      experience: {
        jobCategorySlug: 'technology', jobRoleSlug: 'data-scientist',
        experienceLevelSlug: 'mid', workModeSlug: 'hybrid',
        currentDesignation: 'Data Scientist', currentCompany: 'Microsoft IDC Hyderabad',
        yearsOfExperience: 4, employmentType: 'Full-time',
        expectedSalary: '30 LPA',
        openToOverseasWork: true,
      },
      workHistory: [
        {
          company: 'Microsoft IDC', title: 'Data Scientist II',
          startDate: new Date('2021-08-01'), isCurrent: true, employmentType: 'Full-time',
          description: 'Building ML models for Bing Ads click-through rate prediction and anomaly detection. Deployed models serving 10M+ requests/day.',
          skillsUsed: ['Python', 'PyTorch', 'Azure ML', 'SQL', 'Spark'],
        },
        {
          company: 'Mu Sigma', title: 'Decision Scientist',
          startDate: new Date('2020-07-01'), endDate: new Date('2021-07-31'), employmentType: 'Full-time',
        },
      ],
      education: {
        educationLevelSlug: 'postgraduate',
        entries: [
          { level: 'postgraduate', institution: 'IIT Hyderabad', degree: 'M.Tech Data Science', year: 2020, gradeOrGpa: '9.1 CGPA' },
          { level: 'bachelor', institution: 'BITS Pilani', degree: 'B.E. Computer Science', year: 2018 },
        ],
      },
      skills: {
        technicalSkills: ['Python', 'R', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'SQL', 'Azure ML', 'Spark', 'Databricks', 'MLflow'],
        analyticalSkills: ['Statistical Modeling', 'A/B Testing', 'Feature Engineering', 'NLP'],
      },
      links: { githubProfile: 'https://github.com/tanvireddy', linkedinProfile: 'https://linkedin.com/in/tanvireddy' },
    },
  },

  /* 16 — Electrical Technician, Abu Dhabi */
  {
    email: 'abdul.karim@example.com',
    resume: {
      isActive: true, isComplete: true,
      personal: {
        fullName: 'Abdul Karim', profileTitle: 'Senior Electrical Technician',
        dateOfBirth: new Date('1983-10-15'), gender: 'Male',
        nationality: 'Indian', email: 'abdul.karim@example.com',
        contactNumber: '+971 52 987 6543',
        city: 'Abu Dhabi', country: 'UAE',
        languagesKnown: ['Malayalam', 'English', 'Arabic (basic)', 'Hindi'],
        maritalStatus: 'Married',
        religion: 'Islam', community: 'Muslim',
      },
      summary: {
        professionalSummary: 'Experienced electrical technician with 10 years of expertise in industrial and oil & gas electrical systems in the UAE. Skilled in HV/LV switchgear, PLC maintenance, and SCADA systems.',
      },
      experience: {
        jobCategorySlug: 'trades', jobRoleSlug: 'electrical-technician',
        experienceLevelSlug: 'senior', workModeSlug: 'on-site',
        currentDesignation: 'Senior Electrical Technician', currentCompany: 'ADNOC Distribution',
        yearsOfExperience: 10, employmentType: 'Full-time',
        expectedSalary: 'AED 7,500/month',
        openToFieldWork: true, openToOverseasWork: true,
      },
      workHistory: [
        {
          company: 'ADNOC Distribution', title: 'Senior Electrical Technician',
          startDate: new Date('2017-03-01'), isCurrent: true, employmentType: 'Full-time',
          description: 'Maintenance and troubleshooting of HV/LV electrical systems, transformers, and emergency power systems at fuel storage facilities.',
          achievements: ['Zero lost-time incidents for 6 years', 'Reduced planned maintenance downtime by 22%'],
          skillsUsed: ['HV/LV Systems', 'PLC', 'SCADA', 'Transformer Maintenance'],
        },
        {
          company: 'Alstom UAE', title: 'Electrical Technician',
          startDate: new Date('2014-05-01'), endDate: new Date('2017-02-28'), employmentType: 'Full-time',
        },
      ],
      education: {
        educationLevelSlug: 'diploma',
        entries: [{ level: 'diploma', institution: 'Government Polytechnic Palakkad', degree: 'Diploma in Electrical Engineering', year: 2013 }],
      },
      skills: {
        technicalSkills: ['HV/LV Switchgear', 'PLC Programming', 'SCADA', 'Transformer Maintenance', 'AutoCAD Electrical'],
        tradeSkills: ['Cable Tray Installation', 'Earthing & Bonding', 'Arc Flash Safety'],
        safetySkills: ['LOTO Procedures', 'PTW (Permit to Work)', 'H2S Awareness'],
        equipmentSkills: ['Fluke Multimeter', 'Megger', 'Thermal Camera'],
      },
      additional: {
        certifications: ['Electrical Safety — Abu Dhabi HAAD', 'H2S Awareness', 'First Aid & CPR'],
        visaStatus: 'Employment Visa',
        drivingLicense: 'UAE Light Motor Vehicle',
        willingnessToTravel: true,
      },
    },
  },

  /* 17 — Fashion Designer, Delhi */
  {
    email: 'deepika.pillai@example.com',
    resume: {
      isActive: true, isComplete: false,
      personal: {
        fullName: 'Deepika Pillai', profileTitle: 'Fashion Designer — Womenswear',
        dateOfBirth: new Date('1991-07-17'), gender: 'Female',
        nationality: 'Indian', email: 'deepika.pillai@example.com',
        contactNumber: '+91 98108 77665',
        city: 'New Delhi', stateProvince: 'Delhi', country: 'India',
        languagesKnown: ['English', 'Hindi', 'Malayalam'],
        personalTagline: 'Crafting stories through silhouette and fabric',
      },
      summary: {
        professionalSummary: 'Womenswear fashion designer with 6 years of experience in luxury prêt and bridal wear. Expertise in concept-to-production, garment construction, and fabric sourcing.',
      },
      experience: {
        jobCategorySlug: 'creative', jobRoleSlug: 'fashion-designer',
        experienceLevelSlug: 'mid', workModeSlug: 'on-site',
        currentDesignation: 'Lead Designer', currentCompany: 'Anita Dongre Studio',
        yearsOfExperience: 6, employmentType: 'Full-time',
        expectedSalary: '14 LPA',
      },
      workHistory: [
        {
          company: 'Anita Dongre Studio', title: 'Lead Designer — Womenswear',
          startDate: new Date('2020-11-01'), isCurrent: true, employmentType: 'Full-time',
          description: 'Designing seasonal collections for luxury prêt and bridal lines. Managing a team of 3 junior designers and coordinating with production.',
          skillsUsed: ['Adobe Illustrator', 'CLO 3D', 'Fabric Sourcing', 'Pattern Making'],
        },
        {
          company: 'Raw Mango', title: 'Designer',
          startDate: new Date('2018-06-01'), endDate: new Date('2020-10-31'), employmentType: 'Full-time',
        },
      ],
      education: {
        educationLevelSlug: 'bachelor',
        entries: [{ level: 'bachelor', institution: 'National Institute of Fashion Technology Delhi', degree: 'B.Des Fashion Design', year: 2018 }],
      },
      skills: {
        technicalSkills: ['Adobe Illustrator', 'Photoshop', 'CLO 3D', 'CorelDRAW'],
        creativeSkills: ['Pattern Making', 'Draping', 'Fabric Sourcing', 'Colour Forecasting', 'Trend Research'],
      },
      links: { instagramProfile: 'https://instagram.com/deepikapillaidesigns', portfolioWebsite: 'https://deepikapillai.com' },
    },
  },

  /* 18 — Associate Professor, Kozhikode */
  {
    email: 'rajesh.nambiar@example.com',
    resume: {
      isActive: true, isComplete: true,
      personal: {
        fullName: 'Prof. Rajesh Nambiar', profileTitle: 'Associate Professor — Economics',
        dateOfBirth: new Date('1974-02-28'), gender: 'Male',
        nationality: 'Indian', email: 'rajesh.nambiar@example.com',
        contactNumber: '+91 94960 55443',
        city: 'Kozhikode', stateProvince: 'Kerala', country: 'India',
        languagesKnown: ['Malayalam', 'English', 'Hindi'],
        maritalStatus: 'Married',
      },
      summary: {
        professionalSummary: 'Economist and educator with 18 years of teaching and research experience. Published 22 peer-reviewed papers on development economics and public policy. PhD from JNU, post-doctoral research at LSE.',
      },
      experience: {
        jobCategorySlug: 'education', jobRoleSlug: 'professor',
        experienceLevelSlug: 'senior', workModeSlug: 'on-site',
        currentDesignation: 'Associate Professor', currentCompany: 'IIM Kozhikode',
        yearsOfExperience: 18, employmentType: 'Full-time',
      },
      workHistory: [
        {
          company: 'IIM Kozhikode', title: 'Associate Professor — Economics & Public Policy',
          startDate: new Date('2012-07-01'), isCurrent: true, employmentType: 'Full-time',
          description: 'Teaching Macroeconomics, Development Economics, and Public Policy to MBA and FPM students. Area Chairperson — Economics & Social Sciences.',
          achievements: ['Best Teacher Award 2019, 2022', '22 peer-reviewed publications', 'PI on ICSSR-funded research grant'],
        },
        {
          company: 'London School of Economics', title: 'Post-Doctoral Research Fellow',
          startDate: new Date('2009-09-01'), endDate: new Date('2011-08-31'), employmentType: 'Full-time',
          location: 'London, UK',
        },
      ],
      education: {
        educationLevelSlug: 'doctorate',
        entries: [
          { level: 'doctorate', institution: 'Jawaharlal Nehru University', degree: 'Ph.D. Economics', year: 2009, thesisTitle: 'Fiscal Decentralisation and Public Goods Provision in India' },
          { level: 'postgraduate', institution: 'JNU', degree: 'M.A. Economics', year: 2003 },
          { level: 'bachelor', institution: 'Calicut University', degree: 'B.A. Economics', year: 2001 },
        ],
      },
      skills: {
        technicalSkills: ['STATA', 'R', 'SPSS', 'EViews', 'MATLAB (basic)'],
        analyticalSkills: ['Econometrics', 'Panel Data Analysis', 'Policy Evaluation', 'Regression Discontinuity Design'],
        teachingSkills: ['Course Design', 'Case Method', 'Research Supervision'],
      },
      additional: { publications: ['22 peer-reviewed papers', 'Co-author: "Fiscal Federalism in India" — Oxford University Press 2021'] },
    },
  },

  /* 19 — NGO Social Worker, Kolkata */
  {
    email: 'meena.banerjee@example.com',
    resume: {
      isActive: true, isComplete: false,
      personal: {
        fullName: 'Meena Banerjee', profileTitle: 'Social Worker — Child Welfare & Development',
        dateOfBirth: new Date('1986-09-11'), gender: 'Female',
        nationality: 'Indian', email: 'meena.banerjee@example.com',
        contactNumber: '+91 98300 44556',
        city: 'Kolkata', stateProvince: 'West Bengal', country: 'India',
        languagesKnown: ['Bengali', 'English', 'Hindi'],
        maritalStatus: 'Single',
      },
      summary: {
        careerObjective: 'Dedicated social worker with 7 years of grassroots experience in child welfare, women empowerment, and community health. Seeking to contribute to UNICEF or an international development organisation.',
        professionalSummary: 'MSW graduate specialising in child rights and community development. Managed field teams of 12 for UNICEF-partnered programmes across rural West Bengal.',
      },
      experience: {
        jobCategorySlug: 'social-work', jobRoleSlug: 'social-worker',
        experienceLevelSlug: 'mid', workModeSlug: 'field',
        currentDesignation: 'Programme Officer', currentCompany: 'Save the Children India',
        yearsOfExperience: 7, employmentType: 'Full-time',
        openToOverseasWork: true, openToFieldWork: true,
      },
      workHistory: [
        {
          company: 'Save the Children India', title: 'Programme Officer — Child Protection',
          startDate: new Date('2020-01-01'), isCurrent: true, employmentType: 'Full-time',
          description: 'Managing child protection and education programmes covering 40,000 beneficiaries across 6 districts of West Bengal.',
          achievements: ['Reduced school dropout rate by 31% in target areas', 'Led state-level child rights awareness campaign'],
        },
        {
          company: 'CRY — Child Rights and You', title: 'Field Coordinator',
          startDate: new Date('2017-06-01'), endDate: new Date('2019-12-31'), employmentType: 'Full-time',
        },
      ],
      education: {
        educationLevelSlug: 'postgraduate',
        entries: [{ level: 'postgraduate', institution: 'Tata Institute of Social Sciences Mumbai', degree: 'M.S.W. — Community Organisation', year: 2017, gradeOrGpa: 'First Class' }],
      },
      skills: {
        professionalSkills: ['Community Mobilisation', 'Programme Management', 'M&E Frameworks', 'Stakeholder Engagement', 'Report Writing'],
        softSkills: ['Empathy', 'Leadership', 'Cross-cultural Communication'],
      },
    },
  },

  /* 20 — Marine Engineer, Mumbai */
  {
    email: 'arjun.malhotra@example.com',
    resume: {
      isActive: true, isComplete: false,
      personal: {
        fullName: 'Arjun Malhotra', profileTitle: 'Marine Engineer — Chief Engineer',
        dateOfBirth: new Date('1987-06-04'), gender: 'Male',
        nationality: 'Indian', email: 'arjun.malhotra@example.com',
        contactNumber: '+91 99200 33322',
        city: 'Mumbai', stateProvince: 'Maharashtra', country: 'India',
        languagesKnown: ['English', 'Hindi', 'Punjabi'],
        maritalStatus: 'Married',
      },
      summary: {
        professionalSummary: 'Class 1 Marine Engineer with 9 years of sea service. Experienced with bulk carriers and container vessels. Currently seeking shore-based technical superintendent or marine surveyor roles.',
      },
      experience: {
        jobCategorySlug: 'maritime', jobRoleSlug: 'marine-engineer',
        experienceLevelSlug: 'senior', workModeSlug: 'field',
        currentDesignation: 'Chief Engineer', currentCompany: 'Bernhard Schulte Shipmanagement',
        yearsOfExperience: 9, employmentType: 'Full-time',
        openToFieldWork: true, openToOverseasWork: true,
        employmentType: 'Contract',
        noticePeriod: '30 days',
      },
      workHistory: [
        {
          company: 'Bernhard Schulte Shipmanagement', title: 'Chief Engineer',
          startDate: new Date('2021-01-01'), isCurrent: true, employmentType: 'Contract',
          description: 'Chief Engineer on MV Crest Alpha (180,000 DWT Capesize bulk carrier). Responsible for all main and auxiliary machinery.',
          skillsUsed: ['MAN B&W Main Engine', 'Wartsila Aux Engines', 'ISM Code', 'SOLAS Compliance'],
        },
        {
          company: 'Maersk Line', title: 'Second Engineer',
          startDate: new Date('2016-03-01'), endDate: new Date('2020-12-31'), employmentType: 'Contract',
        },
      ],
      education: {
        educationLevelSlug: 'bachelor',
        entries: [{ level: 'bachelor', institution: 'Tolani Maritime Institute', degree: 'B.E. Marine Engineering', year: 2015 }],
      },
      skills: {
        technicalSkills: ['Main Engine Maintenance', 'Auxiliary Systems', 'HVAC', 'Refrigeration Systems', 'PMS (Planned Maintenance System)'],
        safetySkills: ['ISM Code', 'SOLAS', 'MARPOL Compliance', 'STCW'],
      },
      additional: {
        certifications: ['COC Class 1 Marine Engineer — DG Shipping India', 'STCW Basic Safety Training', 'GMDSS'],
        licenses: ['MMD Certificate of Competency — Class 1 MEO'],
        seamanBook: 'Indian Continuous Discharge Certificate',
      },
    },
  },

  /* 21 — Clinical Pharmacist, Hyderabad */
  {
    email: 'zara.ahmed@example.com',
    resume: {
      isActive: true, isComplete: false,
      personal: {
        fullName: 'Zara Ahmed', profileTitle: 'Clinical Pharmacist',
        dateOfBirth: new Date('1994-12-09'), gender: 'Female',
        nationality: 'Indian', email: 'zara.ahmed@example.com',
        contactNumber: '+91 91500 22334',
        city: 'Hyderabad', stateProvince: 'Telangana', country: 'India',
        languagesKnown: ['English', 'Urdu', 'Telugu', 'Hindi'],
        maritalStatus: 'Single', religion: 'Islam',
      },
      summary: {
        professionalSummary: 'Clinical pharmacist with 5 years of hospital pharmacy experience specialising in oncology drug monitoring, pharmacovigilance, and patient counselling.',
      },
      experience: {
        jobCategorySlug: 'healthcare', jobRoleSlug: 'pharmacist',
        experienceLevelSlug: 'mid', workModeSlug: 'on-site',
        currentDesignation: 'Clinical Pharmacist — Oncology', currentCompany: 'Yashoda Hospitals',
        yearsOfExperience: 5, employmentType: 'Full-time',
        expectedSalary: '8 LPA',
      },
      workHistory: [
        {
          company: 'Yashoda Hospitals', title: 'Clinical Pharmacist — Oncology',
          startDate: new Date('2021-02-01'), isCurrent: true, employmentType: 'Full-time',
          description: 'Clinical pharmacy services for oncology ward including chemotherapy preparation verification, ADR monitoring, and patient medication counselling.',
        },
        {
          company: 'Apollo Pharmacy', title: 'Pharmacist',
          startDate: new Date('2019-07-01'), endDate: new Date('2021-01-31'), employmentType: 'Full-time',
        },
      ],
      education: {
        educationLevelSlug: 'postgraduate',
        entries: [
          { level: 'postgraduate', institution: 'JNTU Hyderabad', degree: 'M.Pharm Clinical Pharmacy', year: 2019 },
          { level: 'bachelor', institution: 'Osmania University', degree: 'B.Pharm', year: 2017 },
        ],
      },
      skills: {
        technicalSkills: ['Clinical Pharmacy', 'Pharmacovigilance', 'Drug Interaction Screening', 'Chemotherapy Preparation', 'ASHP Guidelines'],
        healthcareSkills: ['Patient Counselling', 'Medication Reconciliation', 'ADR Reporting'],
      },
      additional: { licenses: ['Pharmacy Council of India — Registered Pharmacist'] },
    },
  },

  /* 22 — Production Supervisor, Visakhapatnam */
  {
    email: 'krishna.rao@example.com',
    resume: {
      isActive: true, isComplete: false,
      personal: {
        fullName: 'Krishna Rao', profileTitle: 'Production Supervisor — Steel Manufacturing',
        dateOfBirth: new Date('1980-04-02'), gender: 'Male',
        nationality: 'Indian', email: 'krishna.rao@example.com',
        contactNumber: '+91 98490 11223',
        city: 'Visakhapatnam', stateProvince: 'Andhra Pradesh', country: 'India',
        languagesKnown: ['Telugu', 'English', 'Hindi'],
        maritalStatus: 'Married', fatherName: 'Venkata Rao',
      },
      summary: {
        professionalSummary: 'Production supervisor with 11 years of experience in steel and heavy manufacturing, specialising in blast furnace operations, shift management, and OEE improvement.',
      },
      experience: {
        jobCategorySlug: 'manufacturing', jobRoleSlug: 'production-supervisor',
        experienceLevelSlug: 'mid', workModeSlug: 'on-site',
        currentDesignation: 'Senior Production Supervisor', currentCompany: 'Rashtriya Ispat Nigam Ltd (RINL)',
        yearsOfExperience: 11, employmentType: 'Full-time',
        teamSizeHandled: 18, expectedSalary: '12 LPA',
        openToNightShift: true,
      },
      workHistory: [
        {
          company: 'Rashtriya Ispat Nigam Ltd', title: 'Senior Production Supervisor',
          startDate: new Date('2016-09-01'), isCurrent: true, employmentType: 'Full-time',
          description: 'Shift supervision of blast furnace operations producing 3,500 tonnes/day. Managing 18-person crew.',
          achievements: ['OEE improved from 76% to 88% over 2 years', 'Zero LTI record for 4 years'],
        },
        {
          company: 'JSW Steel', title: 'Production Operator',
          startDate: new Date('2013-04-01'), endDate: new Date('2016-08-31'), employmentType: 'Full-time',
        },
      ],
      education: {
        educationLevelSlug: 'diploma',
        entries: [{ level: 'diploma', institution: 'Andhra Polytechnic', degree: 'Diploma in Metallurgical Engineering', year: 2012 }],
      },
      skills: {
        technicalSkills: ['Blast Furnace Operations', 'OEE Analysis', 'TPM', 'ISO 9001 Compliance', 'DCS/SCADA'],
        safetySkills: ['HIRA (Hazard Identification)', 'LOTO', 'Fire Safety'],
        managementSkills: ['Shift Scheduling', 'Root Cause Analysis', '5S'],
      },
    },
  },

  /* 23 — Corporate Lawyer, Bengaluru */
  {
    email: 'divya.kapoor@example.com',
    resume: {
      isActive: true, isComplete: false,
      personal: {
        fullName: 'Divya Kapoor', profileTitle: 'Corporate Lawyer — M&A & PE',
        dateOfBirth: new Date('1990-01-31'), gender: 'Female',
        nationality: 'Indian', email: 'divya.kapoor@example.com',
        contactNumber: '+91 98860 55667',
        city: 'Bengaluru', stateProvince: 'Karnataka', country: 'India',
        languagesKnown: ['English', 'Hindi'],
        maritalStatus: 'Single',
      },
      summary: {
        professionalSummary: 'Corporate lawyer with 7 years of experience in M&A, private equity transactions, and venture capital. Advised on deals aggregating over $800M. Bar Council of India enrolled advocate.',
      },
      experience: {
        jobCategorySlug: 'legal', jobRoleSlug: 'corporate-lawyer',
        experienceLevelSlug: 'senior', workModeSlug: 'hybrid',
        currentDesignation: 'Senior Associate — M&A', currentCompany: 'Cyril Amarchand Mangaldas',
        yearsOfExperience: 7, employmentType: 'Full-time',
        expectedSalary: '35 LPA',
      },
      workHistory: [
        {
          company: 'Cyril Amarchand Mangaldas', title: 'Senior Associate — M&A & PE',
          startDate: new Date('2020-07-01'), isCurrent: true, employmentType: 'Full-time',
          description: 'Advising PE funds and strategic buyers on cross-border acquisitions, due diligence, and transaction structuring.',
          achievements: ['Led legal workstream on $220M Series D for a Bengaluru-based fintech', 'Advised on 12 PE/VC transactions in 4 years'],
        },
        {
          company: 'AZB & Partners', title: 'Associate',
          startDate: new Date('2017-09-01'), endDate: new Date('2020-06-30'), employmentType: 'Full-time',
        },
      ],
      education: {
        educationLevelSlug: 'bachelor',
        entries: [{ level: 'bachelor', institution: 'National Law School of India University', degree: 'B.A. LL.B (Hons)', year: 2017, gradeOrGpa: 'First Class with Distinction' }],
      },
      skills: {
        technicalSkills: ['M&A Transaction Advisory', 'Due Diligence', 'Shareholder Agreements', 'SEBI Regulations', 'FEMA Compliance'],
        softSkills: ['Negotiation', 'Legal Research', 'Drafting & Documentation'],
        computerSkills: ['MS Office', 'Kira (Due Diligence AI)', 'LexisNexis'],
      },
      additional: { licenses: ['Bar Council of Karnataka — Enrolled Advocate'] },
    },
  },

  /* 24 — Hotel GM, Surat */
  {
    email: 'hardik.shah@example.com',
    resume: {
      isActive: true, isComplete: true,
      personal: {
        fullName: 'Hardik Shah', profileTitle: 'Hotel General Manager',
        dateOfBirth: new Date('1979-08-22'), gender: 'Male',
        nationality: 'Indian', email: 'hardik.shah@example.com',
        contactNumber: '+91 99099 55544',
        city: 'Surat', stateProvince: 'Gujarat', country: 'India',
        languagesKnown: ['Gujarati', 'English', 'Hindi'],
        maritalStatus: 'Married',
      },
      summary: {
        professionalSummary: 'Seasoned hotelier with 13 years of progressive experience across 5-star luxury and business hotels. P&L owner with expertise in revenue management, F&B operations, and guest experience.',
        keyAchievements: ['Grew RevPAR from Rs 3,200 to Rs 5,800 over 3 years', 'Achieved TripAdvisor Certificate of Excellence 5 consecutive years', 'Launched banquet vertical adding Rs 4.5 Cr to topline'],
      },
      experience: {
        jobCategorySlug: 'hospitality', jobRoleSlug: 'hotel-general-manager',
        experienceLevelSlug: 'senior', workModeSlug: 'on-site',
        currentDesignation: 'General Manager', currentCompany: 'Courtyard by Marriott Surat',
        yearsOfExperience: 13, employmentType: 'Full-time',
        expectedSalary: '40 LPA', teamSizeHandled: 120, directReports: 8,
      },
      workHistory: [
        {
          company: 'Courtyard by Marriott', title: 'General Manager',
          startDate: new Date('2018-06-01'), isCurrent: true, employmentType: 'Full-time',
          location: 'Surat, Gujarat',
          description: 'Full P&L responsibility for a 220-key upscale hotel with 3 F&B outlets and 8,000 sq ft banquet space.',
          achievements: ['Best Performing Hotel in West India Cluster 2023 (Marriott)'],
        },
        {
          company: 'ITC Hotels', title: 'Front Office & Revenue Manager',
          startDate: new Date('2014-04-01'), endDate: new Date('2018-05-31'), employmentType: 'Full-time',
          location: 'Ahmedabad',
        },
        {
          company: 'Taj Hotels', title: 'F&B Supervisor',
          startDate: new Date('2010-07-01'), endDate: new Date('2014-03-31'), employmentType: 'Full-time',
          location: 'Mumbai',
        },
      ],
      education: {
        educationLevelSlug: 'bachelor',
        entries: [{ level: 'bachelor', institution: 'IHM Mumbai', degree: 'B.Sc Hotel Management', year: 2010 }],
      },
      skills: {
        technicalSkills: ['Opera PMS', 'Marriott CI/TY', 'Revenue Management', 'OTA Management', 'STR Reports'],
        managementSkills: ['P&L Management', 'Team Building', 'Guest Relations', 'Food & Beverage Operations'],
        customerServiceSkills: ['Guest Experience Design', 'Service Recovery', 'Loyalty Programmes'],
      },
    },
  },

  /* 25 — Physiotherapist, Thiruvananthapuram */
  {
    email: 'pooja.menon@example.com',
    resume: {
      isActive: true, isComplete: false,
      personal: {
        fullName: 'Pooja Menon', profileTitle: 'Physiotherapist — Sports & Musculoskeletal',
        dateOfBirth: new Date('1996-10-14'), gender: 'Female',
        nationality: 'Indian', email: 'pooja.menon@example.com',
        contactNumber: '+91 94474 88990',
        city: 'Thiruvananthapuram', stateProvince: 'Kerala', country: 'India',
        languagesKnown: ['Malayalam', 'English', 'Hindi'],
        maritalStatus: 'Single',
      },
      summary: {
        careerObjective: 'Sports physiotherapist with 4 years of clinical and field experience looking to join a premier sports franchise or multi-specialty hospital with a dedicated sports medicine unit.',
        professionalSummary: 'BPT and MPT graduate specialising in musculoskeletal and sports rehabilitation. Worked with Kerala Blasters FC academy and YMCA Thiruvananthapuram.',
      },
      experience: {
        jobCategorySlug: 'healthcare', jobRoleSlug: 'physiotherapist',
        experienceLevelSlug: 'junior', workModeSlug: 'on-site',
        currentDesignation: 'Sports Physiotherapist', currentCompany: 'KIMS Hospital Trivandrum',
        yearsOfExperience: 4, employmentType: 'Full-time',
        expectedSalary: '7 LPA',
        openToOverseasWork: false, openToFieldWork: true,
      },
      workHistory: [
        {
          company: 'KIMS Hospital', title: 'Sports Physiotherapist',
          startDate: new Date('2022-09-01'), isCurrent: true, employmentType: 'Full-time',
          location: 'Thiruvananthapuram',
          description: 'Assessment and rehabilitation of sports injuries, post-surgical orthopaedic rehab, and athlete conditioning.',
          skillsUsed: ['Manual Therapy', 'Dry Needling', 'Kinesio Taping', 'Electrotherapy'],
        },
        {
          company: 'Kerala Blasters FC Academy', title: 'Team Physiotherapist (Part-time)',
          startDate: new Date('2021-09-01'), endDate: new Date('2022-08-31'), employmentType: 'Part-time',
        },
      ],
      education: {
        educationLevelSlug: 'postgraduate',
        entries: [
          { level: 'postgraduate', institution: 'Amrita Institute of Medical Sciences', degree: 'M.P.T Sports & Exercise', year: 2022 },
          { level: 'bachelor', institution: 'Kerala University of Health Sciences', degree: 'B.P.T', year: 2020 },
        ],
      },
      skills: {
        technicalSkills: ['Manual Therapy', 'Dry Needling', 'Kinesio Taping', 'Electrotherapy', 'Exercise Prescription', 'Gait Analysis'],
        healthcareSkills: ['Sports Injury Assessment', 'Rehabilitation Planning', 'Return-to-Play Protocols'],
      },
      additional: { licenses: ['Kerala Physiotherapy Council — Registered Physiotherapist'] },
    },
  },

];

/* ─────────────────────────────────────────
   ADDITIONAL RESUMES (2–4 total per user)
   Keyed by email. Each entry is an array of
   extra resume objects (without userId).
───────────────────────────────────────── */
const extraResumes = {

  'priya.sharma@example.com': [
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Priya Sharma', profileTitle: 'Full-Stack Engineer — Freelance', dateOfBirth: new Date('1996-03-14'), gender: 'Female', nationality: 'Indian', email: 'priya.sharma@example.com', city: 'Bengaluru', country: 'India', languagesKnown: ['English', 'Hindi'] },
      summary: { careerObjective: 'Freelance full-stack developer open to remote product companies and startups.' },
      experience: { jobCategorySlug: 'technology', jobRoleSlug: 'software-engineer', experienceLevelSlug: 'senior', workModeSlug: 'remote', yearsOfExperience: 5, employmentType: 'Contract', expectedSalary: '$60/hr', openToContract: true },
      workHistory: [{ company: 'Self-Employed', title: 'Freelance Full-Stack Developer', startDate: new Date('2022-01-01'), isCurrent: true, employmentType: 'Contract', skillsUsed: ['React', 'Node.js', 'MongoDB', 'AWS'], achievements: ['Delivered 8 client projects in 2 years'] }],
      education: { educationLevelSlug: 'bachelor', entries: [{ level: 'bachelor', institution: 'R.V. College of Engineering', degree: 'B.E. Computer Science', year: 2019 }] },
      skills: { technicalSkills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'] },
    },
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Priya Sharma', profileTitle: 'Engineering Manager', dateOfBirth: new Date('1996-03-14'), gender: 'Female', nationality: 'Indian', email: 'priya.sharma@example.com', city: 'Bengaluru', country: 'India', languagesKnown: ['English', 'Hindi', 'Kannada'] },
      summary: { careerObjective: 'Transitioning from IC to Engineering Manager at a growth-stage startup.' },
      experience: { jobCategorySlug: 'technology', jobRoleSlug: 'engineering-manager', experienceLevelSlug: 'senior', workModeSlug: 'hybrid', yearsOfExperience: 5, employmentType: 'Full-time', expectedSalary: '35 LPA' },
      workHistory: [{ company: 'Infosys', title: 'Senior Software Engineer (Team Lead)', startDate: new Date('2022-06-01'), isCurrent: true, employmentType: 'Full-time', skillsUsed: ['React', 'Node.js', 'Team Leadership', 'Code Review'], achievements: ['Led team of 4 engineers', 'Mentored 2 junior developers to mid-level'] }],
      education: { educationLevelSlug: 'bachelor', entries: [{ level: 'bachelor', institution: 'R.V. College of Engineering', degree: 'B.E. Computer Science', year: 2019 }] },
      skills: { technicalSkills: ['React', 'Node.js', 'System Design'], softSkills: ['Leadership', 'Mentoring', 'Agile'] },
    },
  ],

  'mohammed.alrashid@example.com': [
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Mohammed Al-Rashid', profileTitle: 'Head Nurse — ICU', dateOfBirth: new Date('1990-07-22'), gender: 'Male', nationality: 'Indian', email: 'mohammed.alrashid@example.com', city: 'Dubai', country: 'UAE', languagesKnown: ['English', 'Arabic', 'Malayalam'] },
      summary: { careerObjective: 'Seeking a Head Nurse or Nurse Unit Manager role in a JCI-accredited hospital in the UAE.' },
      experience: { jobCategorySlug: 'healthcare', jobRoleSlug: 'head-nurse', experienceLevelSlug: 'senior', workModeSlug: 'on-site', yearsOfExperience: 7, employmentType: 'Full-time', expectedSalary: 'AED 12,000/month' },
      workHistory: [{ company: 'Mediclinic City Hospital', title: 'Senior Staff Nurse — ICU', startDate: new Date('2020-03-01'), isCurrent: true, employmentType: 'Full-time', skillsUsed: ['Critical Care', 'Team Leadership', 'ICU Protocols'], achievements: ['DHA license holder', 'Supervised team of 10 nurses'] }],
      education: { educationLevelSlug: 'bachelor', entries: [{ level: 'bachelor', institution: 'Kerala University of Health Sciences', degree: 'B.Sc Nursing', year: 2017 }] },
      skills: { technicalSkills: ['Critical Care Nursing', 'Team Leadership', 'ICU Management'], softSkills: ['Leadership', 'Communication'] },
      additional: { certifications: ['BLS', 'ACLS'], licenses: ['DHA License'] },
    },
  ],

  'anjali.nair@example.com': [
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Anjali Nair', profileTitle: 'Digital Marketing Executive', dateOfBirth: new Date('2001-11-05'), gender: 'Female', nationality: 'Indian', email: 'anjali.nair@example.com', city: 'Mumbai', country: 'India', languagesKnown: ['English', 'Hindi', 'Malayalam'] },
      summary: { careerObjective: 'Joining a fast-growing D2C brand as a digital marketing executive to apply data-driven strategies.' },
      experience: { jobCategorySlug: 'marketing', jobRoleSlug: 'digital-marketing-executive', experienceLevelSlug: 'entry', workModeSlug: 'hybrid', yearsOfExperience: 0, employmentType: 'Full-time', expectedSalary: '5.5 LPA', openToInternship: true },
      workHistory: [{ company: 'NMIMS Marketing Club', title: 'Marketing Lead (Student)', startDate: new Date('2023-07-01'), endDate: new Date('2025-04-30'), employmentType: 'Part-time', skillsUsed: ['Meta Ads', 'Instagram', 'Canva', 'Analytics'], achievements: ['Grew club Instagram from 400 to 3,200 followers'] }],
      education: { educationLevelSlug: 'postgraduate', entries: [{ level: 'postgraduate', institution: 'NMIMS Mumbai', degree: 'MBA — Marketing', year: 2025 }] },
      skills: { technicalSkills: ['Meta Ads Manager', 'Google Analytics', 'Canva', 'HubSpot'], digitalSkills: ['Social Media Marketing', 'Email Marketing'] },
    },
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Anjali Nair', profileTitle: 'Brand Management Trainee', dateOfBirth: new Date('2001-11-05'), gender: 'Female', nationality: 'Indian', email: 'anjali.nair@example.com', city: 'Mumbai', country: 'India', languagesKnown: ['English', 'Hindi'] },
      summary: { careerObjective: 'Aspiring brand manager eager to work on FMCG brand strategy and consumer insights.' },
      experience: { jobCategorySlug: 'marketing', jobRoleSlug: 'brand-manager', experienceLevelSlug: 'entry', workModeSlug: 'on-site', yearsOfExperience: 0, employmentType: 'Full-time', expectedSalary: '7 LPA', targetIndustry: ['FMCG', 'Retail'] },
      workHistory: [{ company: 'ITC Ltd (Internship)', title: 'Brand Management Intern', startDate: new Date('2024-05-01'), endDate: new Date('2024-07-31'), employmentType: 'Internship', skillsUsed: ['Market Research', 'Consumer Insights', 'PowerPoint'], achievements: ['Presented brand repositioning deck to senior leadership'] }],
      education: { educationLevelSlug: 'postgraduate', entries: [{ level: 'postgraduate', institution: 'NMIMS Mumbai', degree: 'MBA — Marketing & Strategy', year: 2025 }] },
      skills: { technicalSkills: ['Market Research', 'Consumer Insights', 'MS Excel', 'PowerPoint'], softSkills: ['Creativity', 'Presentation', 'Analytical Thinking'] },
    },
  ],

  'ravi.kumar@example.com': [
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Ravi Kumar', profileTitle: 'Programme Director — Digital Transformation', dateOfBirth: new Date('1984-08-19'), gender: 'Male', nationality: 'Indian', email: 'ravi.kumar@example.com', city: 'Hyderabad', country: 'India', languagesKnown: ['English', 'Hindi', 'Telugu'] },
      summary: { professionalSummary: 'Programme Director with a track record of steering large-scale digital transformation programmes for BFSI and retail clients.' },
      experience: { jobCategorySlug: 'technology', jobRoleSlug: 'programme-director', experienceLevelSlug: 'executive', workModeSlug: 'hybrid', yearsOfExperience: 12, employmentType: 'Full-time', expectedSalary: '55 LPA', noticePeriod: '90 days' },
      workHistory: [{ company: 'Capgemini', title: 'Senior Project Manager → Programme Director', startDate: new Date('2019-01-01'), isCurrent: true, employmentType: 'Full-time', skillsUsed: ['Programme Governance', 'Stakeholder Management', 'Agile at Scale', 'P&L'], achievements: ['Managed portfolio of 6 concurrent projects worth $12M'] }],
      education: { educationLevelSlug: 'bachelor', entries: [{ level: 'bachelor', institution: 'Osmania University', degree: 'B.Tech Information Technology', year: 2012 }] },
      skills: { technicalSkills: ['SAFe Agile', 'MS Project', 'JIRA', 'Risk Management'], managementSkills: ['Portfolio Management', 'Executive Reporting', 'Budget Control'] },
      additional: { certifications: ['PMP', 'PRINCE2 Practitioner', 'SAFe 5 Programme Consultant'] },
    },
  ],

  'sarah.okonkwo@example.com': [
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Sarah Okonkwo', profileTitle: 'Curriculum Developer — EdTech', dateOfBirth: new Date('1988-05-30'), gender: 'Female', nationality: 'Nigerian', email: 'sarah.okonkwo@example.com', city: 'Lagos', country: 'Nigeria', languagesKnown: ['English', 'Yoruba'] },
      summary: { careerObjective: 'Transitioning classroom expertise into curriculum design and content development for an EdTech platform.' },
      experience: { jobCategorySlug: 'education', jobRoleSlug: 'curriculum-developer', experienceLevelSlug: 'mid', workModeSlug: 'remote', yearsOfExperience: 8, employmentType: 'Full-time', expectedSalary: '₦ 4,500,000/year' },
      workHistory: [{ company: 'Corona Secondary School', title: 'Senior Mathematics Teacher & Curriculum Lead', startDate: new Date('2019-09-01'), isCurrent: true, employmentType: 'Full-time', skillsUsed: ['Curriculum Design', 'LMS Administration', 'Google Classroom', 'Assessment Design'], achievements: ['Redesigned entire SS mathematics curriculum reducing failures by 40%'] }],
      education: { educationLevelSlug: 'bachelor', entries: [{ level: 'bachelor', institution: 'University of Lagos', degree: 'B.Ed Mathematics Education', year: 2015 }] },
      skills: { technicalSkills: ['Curriculum Design', 'LMS (Moodle, Canvas)', 'Google Classroom', 'Articulate Storyline'], teachingSkills: ['Instructional Design', 'Assessment Creation', 'Learning Objectives Writing'] },
    },
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Sarah Okonkwo', profileTitle: 'Mathematics Examiner & Trainer', dateOfBirth: new Date('1988-05-30'), gender: 'Female', nationality: 'Nigerian', email: 'sarah.okonkwo@example.com', city: 'Lagos', country: 'Nigeria', languagesKnown: ['English', 'Yoruba', 'Igbo'] },
      summary: { careerObjective: 'Offering examination marking, teacher training, and mathematics consultancy to schools and examination bodies.' },
      experience: { jobCategorySlug: 'education', jobRoleSlug: 'examiner', experienceLevelSlug: 'mid', workModeSlug: 'on-site', yearsOfExperience: 8, employmentType: 'Contract' },
      workHistory: [{ company: 'WAEC Nigeria', title: 'Mathematics Examiner (Part-time)', startDate: new Date('2018-01-01'), isCurrent: true, employmentType: 'Part-time', skillsUsed: ['Examination Marking', 'Marking Scheme Development', 'Quality Assurance'], achievements: ['Marked 2,000+ scripts per session', 'Promoted to Chief Examiner in 2023'] }],
      education: { educationLevelSlug: 'bachelor', entries: [{ level: 'bachelor', institution: 'University of Lagos', degree: 'B.Ed Mathematics Education', year: 2015 }] },
      skills: { technicalSkills: ['WAEC Marking', 'Examination Design', 'MS Office'], teachingSkills: ['Teacher Training', 'Workshop Facilitation'] },
    },
  ],

  'vikram.patel@example.com': [
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Vikram Patel', profileTitle: 'Cloud Architect — AWS', dateOfBirth: new Date('1993-12-01'), gender: 'Male', nationality: 'Indian', email: 'vikram.patel@example.com', city: 'Pune', country: 'India', languagesKnown: ['English', 'Hindi', 'Gujarati'] },
      summary: { careerObjective: 'Moving from DevOps engineering into a Cloud Solutions Architect role at a product company or cloud consultancy.' },
      experience: { jobCategorySlug: 'technology', jobRoleSlug: 'cloud-architect', experienceLevelSlug: 'senior', workModeSlug: 'remote', yearsOfExperience: 6, employmentType: 'Full-time', expectedSalary: '35 LPA', openToOverseasWork: true },
      workHistory: [{ company: 'Persistent Systems', title: 'DevOps Engineer → Cloud Architect (Acting)', startDate: new Date('2021-03-01'), isCurrent: true, employmentType: 'Full-time', skillsUsed: ['AWS', 'Terraform', 'Kubernetes', 'Solution Design', 'Cost Optimisation'], achievements: ['Reduced cloud spend by 28% through reserved instance strategy', 'Designed multi-region HA architecture for healthcare SaaS'] }],
      education: { educationLevelSlug: 'bachelor', entries: [{ level: 'bachelor', institution: 'Pune University', degree: 'B.E. Information Technology', year: 2018 }] },
      skills: { technicalSkills: ['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes', 'Networking', 'Security Architecture'] },
      additional: { certifications: ['AWS Certified Solutions Architect — Professional', 'CKA', 'HashiCorp Terraform Associate'] },
    },
  ],

  'sunita.gupta@example.com': [
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Sunita Gupta', profileTitle: 'Head of Human Resources', dateOfBirth: new Date('1985-02-14'), gender: 'Female', nationality: 'Indian', email: 'sunita.gupta@example.com', city: 'New Delhi', country: 'India', languagesKnown: ['English', 'Hindi'] },
      summary: { professionalSummary: 'Strategic HR leader targeting a Head of HR or CHRO role at a 1,000+ employee organisation.' },
      experience: { jobCategorySlug: 'human-resources', jobRoleSlug: 'head-of-hr', experienceLevelSlug: 'executive', workModeSlug: 'on-site', yearsOfExperience: 9, employmentType: 'Full-time', expectedSalary: '30 LPA', noticePeriod: '60 days' },
      workHistory: [{ company: 'Havells India Ltd', title: 'HR Manager', startDate: new Date('2020-01-01'), isCurrent: true, employmentType: 'Full-time', skillsUsed: ['HR Strategy', 'OD', 'C&B', 'HRIS', 'Labour Law'], achievements: ['Led merger HR integration for 200-person acquired entity'] }],
      education: { educationLevelSlug: 'postgraduate', entries: [{ level: 'postgraduate', institution: 'XLRI Jamshedpur', degree: 'PGDM — Human Resources', year: 2015 }] },
      skills: { technicalSkills: ['SAP HR', 'Workday', 'Darwinbox'], professionalSkills: ['HR Strategy', 'Organisational Design', 'C&B', 'L&D', 'ER/IR'] },
    },
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Sunita Gupta', profileTitle: 'HR Consultant — SME & Startups', dateOfBirth: new Date('1985-02-14'), gender: 'Female', nationality: 'Indian', email: 'sunita.gupta@example.com', city: 'New Delhi', country: 'India', languagesKnown: ['English', 'Hindi'] },
      summary: { careerObjective: 'Offering fractional CHRO and HR consulting services to startups and SMEs building their people function.' },
      experience: { jobCategorySlug: 'human-resources', jobRoleSlug: 'hr-consultant', experienceLevelSlug: 'senior', workModeSlug: 'remote', yearsOfExperience: 9, employmentType: 'Contract', openToContract: true },
      workHistory: [{ company: 'Independent Consulting', title: 'HR Consultant (Part-time)', startDate: new Date('2022-01-01'), isCurrent: true, employmentType: 'Contract', skillsUsed: ['HR Policy Design', 'Recruitment', 'Performance Management', 'Compliance'], achievements: ['Set up HR function for 3 Series-A startups from scratch'] }],
      education: { educationLevelSlug: 'postgraduate', entries: [{ level: 'postgraduate', institution: 'XLRI Jamshedpur', degree: 'PGDM — Human Resources', year: 2015 }] },
      skills: { professionalSkills: ['HR Policy', 'Talent Acquisition', 'Compliance', 'Performance Management'], softSkills: ['Consulting', 'Communication', 'Problem Solving'] },
    },
  ],

  'james.mwangi@example.com': [
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'James Mwangi', profileTitle: 'Investment Analyst', dateOfBirth: new Date('1994-09-03'), gender: 'Male', nationality: 'Kenyan', email: 'james.mwangi@example.com', city: 'Nairobi', country: 'Kenya', languagesKnown: ['English', 'Swahili'] },
      summary: { careerObjective: 'Transitioning from banking FP&A into a private equity or investment management role.' },
      experience: { jobCategorySlug: 'finance', jobRoleSlug: 'investment-analyst', experienceLevelSlug: 'mid', workModeSlug: 'hybrid', yearsOfExperience: 4, employmentType: 'Full-time', expectedSalary: 'KES 220,000/month', openToOverseasWork: true },
      workHistory: [{ company: 'Equity Bank Kenya', title: 'Financial Analyst', startDate: new Date('2021-07-01'), isCurrent: true, employmentType: 'Full-time', skillsUsed: ['DCF Valuation', 'LBO Modelling', 'Due Diligence', 'Excel'], achievements: ['Built LBO model used in $15M SME fund assessment', 'CFA Level 2 candidate'] }],
      education: { educationLevelSlug: 'bachelor', entries: [{ level: 'bachelor', institution: 'University of Nairobi', degree: 'B.Com Finance', year: 2019 }] },
      skills: { technicalSkills: ['DCF', 'LBO Modelling', 'Excel', 'Bloomberg', 'Power BI'], financeSkills: ['Equity Research', 'Portfolio Analysis', 'IFRS'] },
      additional: { certifications: ['CPA-K', 'CFA Level 1 — Passed', 'CFA Level 2 — Registered'] },
    },
  ],

  'lakshmi.iyer@example.com': [
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Dr. Lakshmi Iyer', profileTitle: 'Clinical Researcher — Internal Medicine', dateOfBirth: new Date('1977-04-12'), gender: 'Female', nationality: 'Indian', email: 'lakshmi.iyer@example.com', city: 'Chennai', country: 'India', languagesKnown: ['English', 'Tamil', 'Hindi'] },
      summary: { careerObjective: 'Seeking a Principal Investigator or Medical Director role in clinical research or pharmaceutical medical affairs.' },
      experience: { jobCategorySlug: 'healthcare', jobRoleSlug: 'clinical-researcher', experienceLevelSlug: 'senior', workModeSlug: 'hybrid', yearsOfExperience: 15, employmentType: 'Full-time', expectedSalary: '80 LPA' },
      workHistory: [{ company: 'Apollo Hospitals Chennai', title: 'Senior Consultant & PI — Clinical Trials', startDate: new Date('2016-01-01'), isCurrent: true, employmentType: 'Full-time', skillsUsed: ['GCP', 'Protocol Design', 'CTMS', 'ICH Guidelines', 'IRB Submissions'], achievements: ['PI on 4 phase-III multicentre trials', '8 peer-reviewed publications'] }],
      education: { educationLevelSlug: 'doctorate', entries: [{ level: 'doctorate', institution: 'Madras Medical College', degree: 'M.D. Internal Medicine', year: 2010 }, { level: 'bachelor', institution: 'Madras Medical College', degree: 'M.B.B.S', year: 2006 }] },
      skills: { technicalSkills: ['Clinical Trial Management', 'GCP', 'ICH Guidelines', 'Medical Writing', 'SPSS'], healthcareSkills: ['Protocol Design', 'Patient Safety', 'Pharmacovigilance'] },
      additional: { certifications: ['MRCP (UK)', 'GCP Certification — ICR London'], publications: ['8 peer-reviewed papers'] },
    },
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Dr. Lakshmi Iyer', profileTitle: 'Medical Educator & Mentor', dateOfBirth: new Date('1977-04-12'), gender: 'Female', nationality: 'Indian', email: 'lakshmi.iyer@example.com', city: 'Chennai', country: 'India', languagesKnown: ['English', 'Tamil'] },
      summary: { careerObjective: 'Contributing to postgraduate medical education as a faculty member at a premier medical institution.' },
      experience: { jobCategorySlug: 'education', jobRoleSlug: 'medical-educator', experienceLevelSlug: 'senior', workModeSlug: 'on-site', yearsOfExperience: 10, employmentType: 'Full-time' },
      workHistory: [{ company: 'Apollo Hospitals Chennai', title: 'Consultant & DNB Mentor', startDate: new Date('2016-01-01'), isCurrent: true, employmentType: 'Full-time', skillsUsed: ['Teaching', 'Case-Based Learning', 'Assessment Design', 'Research Supervision'], achievements: ['Supervised 12 DNB residents', 'Best Teacher recognition 2021'] }],
      education: { educationLevelSlug: 'doctorate', entries: [{ level: 'doctorate', institution: 'Madras Medical College', degree: 'M.D. Internal Medicine', year: 2010 }] },
      skills: { technicalSkills: ['Medical Education', 'Curriculum Design', 'Research Supervision'], teachingSkills: ['Case-Based Learning', 'Simulation Training', 'Assessment Design'] },
    },
  ],

  'rahul.verma@example.com': [
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Rahul Verma', profileTitle: 'Area Sales Executive — GT & MT', dateOfBirth: new Date('2000-06-18'), gender: 'Male', nationality: 'Indian', email: 'rahul.verma@example.com', city: 'Jaipur', country: 'India', languagesKnown: ['Hindi', 'English'] },
      summary: { careerObjective: 'Looking for an Area Sales Executive role covering both general and modern trade for an FMCG company.' },
      experience: { jobCategorySlug: 'sales', jobRoleSlug: 'area-sales-executive', experienceLevelSlug: 'junior', workModeSlug: 'field', yearsOfExperience: 2, employmentType: 'Full-time', expectedSalary: '6 LPA', openToFieldWork: true },
      workHistory: [{ company: 'Hindustan Unilever Ltd', title: 'Sales Executive — GT', startDate: new Date('2023-02-01'), isCurrent: true, employmentType: 'Full-time', skillsUsed: ['GT Sales', 'MT Coordination', 'Distributor Management', 'Salesforce'], achievements: ['Expanded coverage from 120 to 180 outlets in 12 months'] }],
      education: { educationLevelSlug: 'bachelor', entries: [{ level: 'bachelor', institution: 'University of Rajasthan', degree: 'B.Com', year: 2022 }] },
      skills: { salesSkills: ['GT Sales', 'MT Sales', 'Distributor Management', 'Promoter Training'], computerSkills: ['Salesforce', 'MS Excel'] },
    },
  ],

  'fatima.khan@example.com': [
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Fatima Khan', profileTitle: 'Product Design Lead', dateOfBirth: new Date('1992-08-25'), gender: 'Female', nationality: 'Pakistani', email: 'fatima.khan@example.com', city: 'Karachi', country: 'Pakistan', languagesKnown: ['English', 'Urdu'] },
      summary: { careerObjective: 'Leading a product design team at a Series-B or later-stage startup building consumer or fintech products.' },
      experience: { jobCategorySlug: 'design', jobRoleSlug: 'design-lead', experienceLevelSlug: 'senior', workModeSlug: 'remote', yearsOfExperience: 5, employmentType: 'Full-time', expectedSalary: '$6,000/month', openToOverseasWork: true },
      workHistory: [{ company: 'Freelance / Remote', title: 'Senior UI/UX Designer → Design Lead', startDate: new Date('2023-07-01'), isCurrent: true, employmentType: 'Contract', skillsUsed: ['Figma', 'Design Systems', 'Team Leadership', 'User Research', 'Roadmapping'], achievements: ['Managed 2 junior designers on a 6-month engagement for a UK fintech'] }],
      education: { educationLevelSlug: 'bachelor', entries: [{ level: 'bachelor', institution: 'Indus Valley School of Art', degree: 'B.Des Communication Design', year: 2019 }] },
      skills: { technicalSkills: ['Figma', 'Design Systems', 'Prototyping', 'User Research'], softSkills: ['Design Leadership', 'Stakeholder Presentation', 'Mentoring'] },
      links: { behanceProfile: 'https://behance.net/fatimakhan' },
    },
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Fatima Khan', profileTitle: 'UX Researcher', dateOfBirth: new Date('1992-08-25'), gender: 'Female', nationality: 'Pakistani', email: 'fatima.khan@example.com', city: 'Karachi', country: 'Pakistan', languagesKnown: ['English', 'Urdu'] },
      summary: { careerObjective: 'Specialising in UX research to help product teams make evidence-based design decisions.' },
      experience: { jobCategorySlug: 'design', jobRoleSlug: 'ux-researcher', experienceLevelSlug: 'mid', workModeSlug: 'remote', yearsOfExperience: 5, employmentType: 'Full-time', openToContract: true },
      workHistory: [{ company: 'Airlift Technologies', title: 'Product Designer (Research Focus)', startDate: new Date('2021-01-01'), endDate: new Date('2023-06-30'), employmentType: 'Full-time', skillsUsed: ['User Interviews', 'Usability Testing', 'Affinity Mapping', 'Figma'], achievements: ['Ran 40+ user interview sessions', 'Launched research repository used by entire product org'] }],
      education: { educationLevelSlug: 'bachelor', entries: [{ level: 'bachelor', institution: 'Indus Valley School of Art', degree: 'B.Des Communication Design', year: 2019 }] },
      skills: { technicalSkills: ['User Interviews', 'Usability Testing', 'Survey Design', 'Dovetail', 'Maze'], creativeSkills: ['Affinity Mapping', 'Journey Mapping', 'Persona Development'] },
    },
  ],

  'arun.menon@example.com': [
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Arun Menon', profileTitle: 'Structural Engineer — Gulf Projects', dateOfBirth: new Date('1989-03-07'), gender: 'Male', nationality: 'Indian', email: 'arun.menon@example.com', city: 'Kochi', country: 'India', languagesKnown: ['Malayalam', 'English', 'Hindi', 'Arabic (basic)'] },
      summary: { careerObjective: 'Targeting structural engineering roles in KSA, Qatar, or UAE on large-scale infrastructure projects.' },
      experience: { jobCategorySlug: 'engineering', jobRoleSlug: 'structural-engineer', experienceLevelSlug: 'mid', workModeSlug: 'on-site', yearsOfExperience: 8, employmentType: 'Full-time', expectedSalary: 'AED 12,000/month', openToOverseasWork: true },
      workHistory: [{ company: 'L&T Construction', title: 'Structural Engineer', startDate: new Date('2018-08-01'), isCurrent: true, employmentType: 'Full-time', skillsUsed: ['STAAD Pro', 'ETABS', 'AutoCAD', 'MS Project', 'BOQ Preparation'], achievements: ['Rs 450 Cr metro viaduct delivered on schedule', 'LEED GA certified'] }],
      education: { educationLevelSlug: 'bachelor', entries: [{ level: 'bachelor', institution: 'NIT Calicut', degree: 'B.Tech Civil Engineering', year: 2016 }] },
      skills: { technicalSkills: ['STAAD Pro', 'ETABS', 'AutoCAD', 'Primavera P6', 'Revit Structure'] },
      additional: { certifications: ['LEED Green Associate'], visaStatus: 'Indian Passport — Ready for Gulf Visa' },
    },
  ],

  'neha.joshi@example.com': [
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Neha Joshi', profileTitle: 'Content Strategist — B2B SaaS', dateOfBirth: new Date('1997-01-29'), gender: 'Female', nationality: 'Indian', email: 'neha.joshi@example.com', city: 'Pune', country: 'India', languagesKnown: ['English', 'Hindi', 'Marathi'] },
      summary: { careerObjective: 'Joining a B2B SaaS company as a content strategist to own the content calendar, SEO roadmap, and thought leadership programme.' },
      experience: { jobCategorySlug: 'content-marketing', jobRoleSlug: 'content-strategist', experienceLevelSlug: 'mid', workModeSlug: 'remote', yearsOfExperience: 3, employmentType: 'Full-time', expectedSalary: '12 LPA' },
      workHistory: [{ company: 'Pepper Content', title: 'Senior Content Writer', startDate: new Date('2022-05-01'), isCurrent: true, employmentType: 'Full-time', skillsUsed: ['Content Strategy', 'SEO', 'Editorial Calendar', 'Ahrefs', 'WordPress'], achievements: ['Defined content strategy for 3 SaaS clients', 'Grew one client from 5K to 80K monthly organic visits'] }],
      education: { educationLevelSlug: 'bachelor', entries: [{ level: 'bachelor', institution: 'Savitribai Phule Pune University', degree: 'B.A. English Literature', year: 2020 }] },
      skills: { technicalSkills: ['Content Strategy', 'SEO', 'Ahrefs', 'SEMrush', 'WordPress', 'HubSpot'], digitalSkills: ['Thought Leadership', 'Email Nurture', 'Webinar Content'] },
      links: { portfolioWebsite: 'https://nehajoshi.contently.com', linkedinProfile: 'https://linkedin.com/in/nehajoshi' },
    },
  ],

  'tanvi.reddy@example.com': [
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Tanvi Reddy', profileTitle: 'ML Engineer — Production Systems', dateOfBirth: new Date('1997-05-20'), gender: 'Female', nationality: 'Indian', email: 'tanvi.reddy@example.com', city: 'Hyderabad', country: 'India', languagesKnown: ['English', 'Telugu', 'Hindi'] },
      summary: { careerObjective: 'Focusing on ML engineering and MLOps to deploy and maintain large-scale models in production.' },
      experience: { jobCategorySlug: 'technology', jobRoleSlug: 'ml-engineer', experienceLevelSlug: 'mid', workModeSlug: 'hybrid', yearsOfExperience: 4, employmentType: 'Full-time', expectedSalary: '35 LPA', openToOverseasWork: true },
      workHistory: [{ company: 'Microsoft IDC', title: 'Data Scientist II → ML Engineer', startDate: new Date('2021-08-01'), isCurrent: true, employmentType: 'Full-time', skillsUsed: ['Python', 'PyTorch', 'MLflow', 'Azure ML', 'Kubernetes', 'CI/CD for ML'], achievements: ['Reduced model deployment cycle from 3 weeks to 2 days', 'Models serving 10M+ requests/day'] }],
      education: { educationLevelSlug: 'postgraduate', entries: [{ level: 'postgraduate', institution: 'IIT Hyderabad', degree: 'M.Tech Data Science', year: 2020 }] },
      skills: { technicalSkills: ['Python', 'PyTorch', 'MLflow', 'Azure ML', 'Kubeflow', 'Docker', 'Kubernetes', 'CI/CD'] },
      links: { githubProfile: 'https://github.com/tanvireddy' },
    },
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Tanvi Reddy', profileTitle: 'AI Research Engineer', dateOfBirth: new Date('1997-05-20'), gender: 'Female', nationality: 'Indian', email: 'tanvi.reddy@example.com', city: 'Hyderabad', country: 'India', languagesKnown: ['English', 'Telugu'] },
      summary: { careerObjective: 'Pursuing applied AI research roles at a lab or research-forward company working on NLP or multimodal models.' },
      experience: { jobCategorySlug: 'technology', jobRoleSlug: 'ai-researcher', experienceLevelSlug: 'mid', workModeSlug: 'remote', yearsOfExperience: 4, employmentType: 'Full-time', openToOverseasWork: true },
      workHistory: [{ company: 'Microsoft IDC', title: 'Data Scientist II (NLP Focus)', startDate: new Date('2021-08-01'), isCurrent: true, employmentType: 'Full-time', skillsUsed: ['Python', 'Transformers', 'BERT', 'Azure OpenAI', 'Spark'], achievements: ['Co-authored 1 internal research paper on query understanding', 'Filed 1 patent on ad ranking signals'] }],
      education: { educationLevelSlug: 'postgraduate', entries: [{ level: 'postgraduate', institution: 'IIT Hyderabad', degree: 'M.Tech Data Science', year: 2020 }, { level: 'bachelor', institution: 'BITS Pilani', degree: 'B.E. Computer Science', year: 2018 }] },
      skills: { technicalSkills: ['Python', 'Transformers', 'BERT', 'GPT', 'LangChain', 'PyTorch', 'Spark'], analyticalSkills: ['NLP', 'Multimodal Learning', 'Evaluation Metrics', 'A/B Testing'] },
    },
  ],

  'meena.banerjee@example.com': [
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Meena Banerjee', profileTitle: 'Programme Manager — International Development', dateOfBirth: new Date('1986-09-11'), gender: 'Female', nationality: 'Indian', email: 'meena.banerjee@example.com', city: 'Kolkata', country: 'India', languagesKnown: ['Bengali', 'English', 'Hindi'] },
      summary: { careerObjective: 'Seeking a Programme Manager role with UNICEF, UNDP, or an international NGO working on child rights or gender equality.' },
      experience: { jobCategorySlug: 'social-work', jobRoleSlug: 'programme-manager', experienceLevelSlug: 'senior', workModeSlug: 'field', yearsOfExperience: 7, employmentType: 'Full-time', openToOverseasWork: true, openToFieldWork: true },
      workHistory: [{ company: 'Save the Children India', title: 'Programme Officer → Acting Programme Manager', startDate: new Date('2020-01-01'), isCurrent: true, employmentType: 'Full-time', skillsUsed: ['Programme Management', 'M&E', 'Budget Management', 'Donor Reporting', 'Stakeholder Engagement'], achievements: ['Managed Rs 1.8 Cr project budget', 'Submitted 12 donor reports with zero compliance issues'] }],
      education: { educationLevelSlug: 'postgraduate', entries: [{ level: 'postgraduate', institution: 'Tata Institute of Social Sciences Mumbai', degree: 'M.S.W.', year: 2017 }] },
      skills: { professionalSkills: ['Programme Management', 'M&E', 'Logical Framework', 'Donor Reporting', 'Budget Oversight'], softSkills: ['Leadership', 'Communication', 'Cross-cultural Work'] },
    },
  ],

  'divya.kapoor@example.com': [
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Divya Kapoor', profileTitle: 'In-House Legal Counsel — Corporate', dateOfBirth: new Date('1990-01-31'), gender: 'Female', nationality: 'Indian', email: 'divya.kapoor@example.com', city: 'Bengaluru', country: 'India', languagesKnown: ['English', 'Hindi'] },
      summary: { careerObjective: 'Transitioning from law firm to an in-house counsel role at a startup or growth-stage company.' },
      experience: { jobCategorySlug: 'legal', jobRoleSlug: 'in-house-counsel', experienceLevelSlug: 'senior', workModeSlug: 'hybrid', yearsOfExperience: 7, employmentType: 'Full-time', expectedSalary: '40 LPA' },
      workHistory: [{ company: 'Cyril Amarchand Mangaldas', title: 'Senior Associate — M&A & PE', startDate: new Date('2020-07-01'), isCurrent: true, employmentType: 'Full-time', skillsUsed: ['Contract Drafting', 'Legal Due Diligence', 'Entity Governance', 'SEBI/FEMA'], achievements: ['Advised on 12 PE/VC transactions', 'Drafted 50+ shareholders agreements'] }],
      education: { educationLevelSlug: 'bachelor', entries: [{ level: 'bachelor', institution: 'National Law School of India University', degree: 'B.A. LL.B (Hons)', year: 2017 }] },
      skills: { technicalSkills: ['Contract Management', 'M&A Advisory', 'SEBI', 'FEMA', 'Company Law'], softSkills: ['Negotiation', 'Drafting', 'Risk Assessment'] },
    },
  ],

  'hardik.shah@example.com': [
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Hardik Shah', profileTitle: 'VP — Hospitality Operations', dateOfBirth: new Date('1979-08-22'), gender: 'Male', nationality: 'Indian', email: 'hardik.shah@example.com', city: 'Surat', country: 'India', languagesKnown: ['Gujarati', 'English', 'Hindi'] },
      summary: { professionalSummary: 'Hotel GM with 13 years of experience seeking a VP Operations or Regional Director role overseeing multiple properties.' },
      experience: { jobCategorySlug: 'hospitality', jobRoleSlug: 'vp-operations', experienceLevelSlug: 'executive', workModeSlug: 'on-site', yearsOfExperience: 13, employmentType: 'Full-time', expectedSalary: '60 LPA', noticePeriod: '90 days' },
      workHistory: [{ company: 'Courtyard by Marriott', title: 'General Manager', startDate: new Date('2018-06-01'), isCurrent: true, employmentType: 'Full-time', skillsUsed: ['Multi-property Oversight', 'P&L', 'Revenue Management', 'Brand Standards', 'Team Development'], achievements: ['Best Performing Hotel in West India Cluster 2023', 'Grew RevPAR by 81% over 3 years'] }],
      education: { educationLevelSlug: 'bachelor', entries: [{ level: 'bachelor', institution: 'IHM Mumbai', degree: 'B.Sc Hotel Management', year: 2010 }] },
      skills: { technicalSkills: ['Opera PMS', 'Revenue Management', 'OTA Strategy', 'STR Benchmarking'], managementSkills: ['Regional P&L', 'Owner Relations', 'Brand Compliance'] },
    },
  ],

  'pooja.menon@example.com': [
    {
      isActive: false, isComplete: false,
      personal: { fullName: 'Pooja Menon', profileTitle: 'Sports Physiotherapist — Elite Athletes', dateOfBirth: new Date('1996-10-14'), gender: 'Female', nationality: 'Indian', email: 'pooja.menon@example.com', city: 'Thiruvananthapuram', country: 'India', languagesKnown: ['Malayalam', 'English', 'Hindi'] },
      summary: { careerObjective: 'Joining a national sports federation or IPL/ISL franchise as the team physiotherapist.' },
      experience: { jobCategorySlug: 'healthcare', jobRoleSlug: 'sports-physiotherapist', experienceLevelSlug: 'junior', workModeSlug: 'field', yearsOfExperience: 4, employmentType: 'Full-time', expectedSalary: '9 LPA', openToFieldWork: true, openToOverseasWork: false },
      workHistory: [{ company: 'KIMS Hospital', title: 'Sports Physiotherapist', startDate: new Date('2022-09-01'), isCurrent: true, employmentType: 'Full-time', skillsUsed: ['Sports Injury Management', 'Return-to-Play', 'Strength & Conditioning', 'Dry Needling'], achievements: ['Treated 3 national-level athletes', 'Return-to-play success rate 94%'] }, { company: 'Kerala Blasters FC Academy', title: 'Team Physiotherapist', startDate: new Date('2021-09-01'), endDate: new Date('2022-08-31'), employmentType: 'Part-time', skillsUsed: ['Pitch-side First Aid', 'Recovery Protocols', 'Taping'] }],
      education: { educationLevelSlug: 'postgraduate', entries: [{ level: 'postgraduate', institution: 'Amrita Institute of Medical Sciences', degree: 'M.P.T Sports & Exercise', year: 2022 }] },
      skills: { technicalSkills: ['Manual Therapy', 'Dry Needling', 'Sports Taping', 'Gait Analysis', 'Electrotherapy'], healthcareSkills: ['Sports Injury Assessment', 'Return-to-Play Protocols', 'Athlete Load Management'] },
    },
  ],

};

/* ─────────────────────────────────────────
   MAIN
   Pass --reseed to drop all resumes and recreate from scratch.
───────────────────────────────────────── */
async function seed() {
  const reseed = process.argv.includes('--reseed');

  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const existingUsers = await User.countDocuments();
  if (existingUsers > 0) {
    console.log(`⚠️  Found ${existingUsers} existing users.${reseed ? ' --reseed: all resume data will be replaced.' : ' Use --reseed to replace resume data.'}`);
  }

  const passwordHash = await bcrypt.hash(TEST_PASSWORD, 10);
  console.log(`Hashed password for all test accounts (password: ${TEST_PASSWORD})`);

  let usersCreated = 0;
  let usersSkipped = 0;
  let resumesCreated = 0;

  for (const p of personas) {
    let user = await User.findOne({ email: p.email });

    if (!user) {
      user = await User.create({ email: p.email, passwordHash });
      usersCreated++;
      console.log(`  ✓ USER  ${p.email}`);
    } else {
      usersSkipped++;
      console.log(`  - USER  ${p.email} — already exists`);
    }

    if (reseed) {
      const deleted = await Resume.deleteMany({ userId: user._id });
      if (deleted.deletedCount) console.log(`    deleted ${deleted.deletedCount} existing resume(s)`);
    }

    const existingCount = await Resume.countDocuments({ userId: user._id });

    if (existingCount === 0 || reseed) {
      // Primary resume
      await Resume.create({ ...p.resume, userId: user._id });
      resumesCreated++;

      // Extra resumes
      const extras = extraResumes[p.email] || [];
      for (const extra of extras) {
        await Resume.create({ ...extra, userId: user._id });
        resumesCreated++;
      }

      const total = 1 + extras.length;
      console.log(`    created ${total} resume(s)`);
    } else {
      console.log(`    skipped — ${existingCount} resume(s) already exist (use --reseed to replace)`);
    }
  }

  console.log(`\nDone — ${usersCreated} users created, ${usersSkipped} users skipped, ${resumesCreated} resumes created.`);
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
