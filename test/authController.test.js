import test from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';
import { login, register } from '../controller/authController.js';
import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';

test('register hashes passwords, creates a user, and sets an HttpOnly JWT cookie', async () => {
    const previousSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'test-secret';

    const originalCreate = User.create;
    let createdUserInput;

    User.create = async (input) => {
        createdUserInput = input;
        return {
            _id: { toString: () => 'user-1' },
            email: input.email
        };
    };

    const req = {
        body: {
            email: 'new@example.com',
            password: 'password123'
        }
    };
    const res = createResponse();

    await register(req, res, assert.ifError);

    assert.equal(res.statusCode, 201);
    assert.equal(res.body.user.id, 'user-1');
    assert.equal(res.body.user.email, 'new@example.com');
    assert.notEqual(createdUserInput.passwordHash, 'password123');
    assert.equal(await bcrypt.compare('password123', createdUserInput.passwordHash), true);
    assert.equal(res.cookieName, 'authToken');
    assert.equal(res.cookieOptions.httpOnly, true);
    assert.equal(res.cookieOptions.sameSite, 'lax');
    assert.equal(res.cookieOptions.path, '/');

    const decoded = jwt.verify(res.cookieValue, process.env.JWT_SECRET);
    assert.equal(decoded.id, 'user-1');
    assert.equal(decoded.email, 'new@example.com');

    User.create = originalCreate;
    restoreEnv('JWT_SECRET', previousSecret);
});

test('login rejects invalid credentials with 401', async () => {
    const originalFindOne = User.findOne;
    User.findOne = async () => null;

    const req = {
        body: {
            email: 'missing@example.com',
            password: 'password123'
        }
    };
    const res = createResponse();

    await login(req, res, assert.ifError);

    assert.equal(res.statusCode, 401);
    assert.deepEqual(res.body, {
        status: 'error',
        message: 'Invalid email or password'
    });

    User.findOne = originalFindOne;
});

function createResponse() {
    return {
        statusCode: 200,
        body: undefined,
        cookieName: undefined,
        cookieValue: undefined,
        cookieOptions: undefined,
        status(code) {
            this.statusCode = code;
            return this;
        },
        cookie(name, value, options) {
            this.cookieName = name;
            this.cookieValue = value;
            this.cookieOptions = options;
            return this;
        },
        json(payload) {
            this.body = payload;
            return this;
        }
    };
}

function restoreEnv(name, previousValue) {
    if (previousValue === undefined) {
        delete process.env[name];
        return;
    }

    process.env[name] = previousValue;
}
