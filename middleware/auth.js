import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const COOKIE_NAME = 'authToken';

export const redirectIfAuthed = (req, res, next) => {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token || !process.env.JWT_SECRET) return next();
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return res.redirect('/auth.html');
    } catch {
        return next();
    }
};

export const pageGuard = (req, res, next) => {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token || !process.env.JWT_SECRET) return res.redirect('/auth.html');
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        return res.redirect('/auth.html');
    }
};

const getAdminEmails = () => (
    process.env.ADMIN_EMAILS || ''
).split(',').map(e => e.trim().toLowerCase()).filter(Boolean);

export const requireAdmin = (req, res, next) => {
    if (!req.user) return res.status(401).json({ status: 'error', message: 'Authentication required' });
    if (!getAdminEmails().includes(req.user.email?.toLowerCase())) {
        return res.status(403).json({ status: 'error', message: 'Forbidden' });
    }
    next();
};

export const requireAuth = (req, res, next) => {
    const token = req.cookies?.[COOKIE_NAME];

    if (!token) {
        return res.status(401).json({ status: 'error', message: 'Authentication required' });
    }

    if (!process.env.JWT_SECRET) {
        return next(Object.assign(new Error('JWT_SECRET is not configured'), { status: 500 }));
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return res.status(401).json({ status: 'error', message: 'Invalid or expired token' });
    }
};

// Like requireAuth but never returns 401 — sets req.user if valid, otherwise leaves it null.
// Used by session-check endpoints so browsers don't log a red network error for logged-out users.
// Also verifies the user still exists in the DB — clears the cookie if not.
export const softAuth = async (req, res, next) => {
    const token = req.cookies?.[COOKIE_NAME];
    if (token && process.env.JWT_SECRET) {
        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET);
            const exists = await User.exists({ _id: req.user.id });
            if (!exists) {
                req.user = null;
                res.clearCookie(COOKIE_NAME, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/' });
            }
        } catch {}
    }
    next();
};
