const express = require('express');
const { protect } = require('../middleware/auth');
const {
    register,
    login,
    refresh,
    getMe
} = require('../controllers/authController');
const {
    registerValidation,
    loginValidation
} = require('../middleware/validation');

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, confirmPassword]
 *             properties:
 *               email: {type: string, format: email}
 *               password: {type: string, format: password}
 *               confirmPassword: {type: string, format: password}
 *               role: {type: string, enum: [user, admin]}
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', registerValidation, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: {type: string, format: email}
 *               password: {type: string, format: password}
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', loginValidation, login);

/**
 * @swagger
 * /auth/refresh:
 *   get:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: New access token issued
 */
router.get('/refresh', refresh);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user info
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user data
 */
router.get('/me', protect, getMe);

module.exports = router;
