import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const COOKIE_NAME = 'authToken';
const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

const cookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    domain: process.env.NODE_ENV === 'production' ? '.2roundglass.com' : undefined,
    path: '/',
    maxAge: TOKEN_MAX_AGE_MS
};

const getJwtSecret = () => {
    if (!process.env.JWT_SECRET) {
        throw Object.assign(new Error('JWT_SECRET is not configured'), { status: 500 });
    }
    return process.env.JWT_SECRET;
};

const safeUser = (user) => ({
    id: user._id.toString(),
    email: user.email
});

const setAuthCookie = (res, user) => {
    const token = jwt.sign(safeUser(user), getJwtSecret(), { algorithm: 'HS256', expiresIn: '7d' });
    res.cookie(COOKIE_NAME, token, cookieOptions);
};

export const register = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ status: 'error', message: 'Email and password are required' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return res.status(400).json({ status: 'error', message: 'Invalid email address' });
    if (password.length < 8)
        return res.status(400).json({ status: 'error', message: 'Password must be at least 8 characters' });

    return bcrypt.hash(password, 12)
        .then(passwordHash => User.create({ email, passwordHash }))
        .then(user => {
            setAuthCookie(res, user);
            res.status(201).json({ message: 'Registration successful', user: safeUser(user) });
        })
        .catch(next);
};

export const login = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ status: 'error', message: 'Email and password are required' });

    let foundUser;
    return User.findOne({ email: email.toLowerCase().trim() })
        .then(user => {
            foundUser = user;
            return user ? bcrypt.compare(password, user.passwordHash) : Promise.resolve(false);
        })
        .then(passwordMatches => {
            if (!passwordMatches)
                return res.status(401).json({ status: 'error', message: 'Invalid email or password' });
            setAuthCookie(res, foundUser);
            res.json({ message: 'Login successful', user: safeUser(foundUser) });
        })
        .catch(next);
};

export const logout = (req, res) => {
    res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' ? '.2roundglass.com' : undefined,
        path: '/'
    });
    res.json({ message: 'Logout successful' });
};

export const me = (req, res) => {
    res.json({ user: req.user ?? null });
};
