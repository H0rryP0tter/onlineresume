import test from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';
import { requireAuth } from '../middleware/auth.js';

test('requireAuth returns 401 when auth cookie is missing', () => {
    const req = { cookies: {} };
    const res = createResponse();
    let nextCalled = false;

    requireAuth(req, res, () => {
        nextCalled = true;
    });

    assert.equal(nextCalled, false);
    assert.equal(res.statusCode, 401);
    assert.deepEqual(res.body, {
        status: 'error',
        message: 'Authentication required'
    });
});

test('requireAuth verifies a valid JWT cookie and sets req.user', () => {
    const previousSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'test-secret';

    const token = jwt.sign({ id: 'user-1', email: 'user@example.com' }, process.env.JWT_SECRET);
    const req = { cookies: { authToken: token } };
    const res = createResponse();
    let nextCalled = false;

    requireAuth(req, res, () => {
        nextCalled = true;
    });

    assert.equal(nextCalled, true);
    assert.equal(req.user.id, 'user-1');
    assert.equal(req.user.email, 'user@example.com');

    restoreEnv('JWT_SECRET', previousSecret);
});

test('requireAuth returns 401 for an invalid JWT cookie', () => {
    const previousSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'test-secret';

    const req = { cookies: { authToken: 'not-a-valid-token' } };
    const res = createResponse();
    let nextCalled = false;

    requireAuth(req, res, () => {
        nextCalled = true;
    });

    assert.equal(nextCalled, false);
    assert.equal(res.statusCode, 401);
    assert.deepEqual(res.body, {
        status: 'error',
        message: 'Invalid or expired token'
    });

    restoreEnv('JWT_SECRET', previousSecret);
});

function createResponse() {
    return {
        statusCode: 200,
        body: undefined,
        status(code) {
            this.statusCode = code;
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
