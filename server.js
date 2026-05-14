import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import countryRoutes from './routes/countryRoutes.js';
import timeZoneRoutes from './routes/timeZoneRoutes.js';
import { pageGuard, redirectIfAuthed } from './middleware/auth.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.set('trust proxy', 1);
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resumeDB';
const PORT = process.env.PORT || 3000;

const requestLogger = (req, res, next) => {
    console.log(new Date().toLocaleTimeString(), '|', req.url, '|', req.method);
    next();
}; 

app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            // Allow inline onclick/onkeydown event handlers in HTML attributes.
            // The inline <script> block was moved to resume-builder.js (same-origin)
            // so script-src 'self' still blocks arbitrary inline scripts.
            scriptSrcAttr: ["'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https://flagcdn.com"],
        }
    }
}));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.get('/resume-builder.html', pageGuard, (req, res) => {
    res.sendFile('resume-builder.html', { root: path.join(__dirname, 'public') });
});

app.use(express.static(path.join(__dirname, 'public'), { index: false }));

const noCache = (req, res, next) => { res.set('Cache-Control', 'no-store'); next(); };

app.use('/admin-panel', noCache, adminRoutes);
app.use('/auth', noCache, authRoutes);
app.use('/countries', countryRoutes);
app.use('/timezones', timeZoneRoutes);
app.use('/resume', noCache, resumeRoutes);

app.get('/', redirectIfAuthed, (req, res) => {
    res.sendFile('home.html', { root: path.join(__dirname, 'public') });
});

app.get('/status', (req, res) => { 
    // Using .json() is best practice for APIs
    res.json({
        status: 'Healthy',
        message: 'ready to build resumes'
    });
});

app.use((err, req, res, next) => { 
    console.error(err.stack);

    // Mongoose validation error (e.g. required field missing, custom validator failed)
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({ status: 'error', message: messages.join(', ') });
    }

    // Invalid MongoDB ObjectId (e.g. GET /resume/not-a-valid-id)
    if (err.name === 'CastError') {
        return res.status(400).json({ status: 'error', message: 'Invalid ID format' });
    }

    // Duplicate key (e.g. unique field constraint violated)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(409).json({ status: 'error', message: `Duplicate value for field: ${field}` });
    }

    res.status(err.status || 500).json({
        status: "error",
        message: err.message
    });
});

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('🚀 Connected to MongoDB successfully');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('❌ Database connection error:', err);
        process.exit(1); // Stop the app if it can't connect to the DB
    });
   

