
import express from 'express'
import 
{
    activateAccount,
    forgotPassword,
    loginToAccount,
    registerAccount,
    resetPassword
} from '../controller/authController';
import { userAuthenication } from '../middleware/authenticate-user';
import { logout } from '../controller/authController/logout-controller';



const router = express.Router();
/**
 * @swagger
 * /api/v1/registerAccount:
 *   post:
 *     tags:
 *       - UserAuth
 *     summary: Register a new account.
 *     description: Register a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Account registered successfully.
 *       500:
 *         description: Internal server error.
 */
router.post('/registerAccount', registerAccount);

/**
 * @swagger
 * /api/v1/loginToAccount:
 *   post:
 *     tags:
 *       - UserAuth
 *     summary: Login to an account.
 *     description: Log in to an existing user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Unauthorized - Invalid credentials.
 *       500:
 *         description: Internal server error.
 */
router.post('/loginToAccount', loginToAccount);

/**
 * @swagger
 * /api/v1/activateAccount:
 *   post:
 *     tags:
 *       - UserAuth
 *     summary: Activate account.
 *     description: Activate a user account using the activation token received via email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Account activated successfully.
 *       401:
 *         description: Unauthorized - Invalid token or token expired.
 *       409:
 *         description: Conflict - Invalid token or email ID.
 *       500:
 *         description: Internal server error.
 */
router.post('/activateAccount', activateAccount);

/**
 * @swagger
 * /api/v1/forgotPassword:
 *   post:
 *     tags:
 *       - UserAuth
 *     summary: Request password reset.
 *     description: Request to reset password. An email with reset instructions will be sent to the registered email address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset request successful. A reset link has been sent to your email.
 *       401:
 *         description: Unauthorized - Email address not registered.
 *       500:
 *         description: Internal server error.
 */
router.post('/forgotPassword', forgotPassword);

/**
 * @swagger
 * /api/v1/resetPassword:
 *   post:
 *     tags:
 *       - UserAuth
 *     summary: Reset password.
 *     description: Reset password using the password reset token received via email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               email:
 *                 type: string
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful.
 *       401:
 *         description: Unauthorized - Invalid token or token expired, User not found.
 *       409:
 *         description: Conflict - Invalid token or email ID.
 *       500:
 *         description: Internal server error.
 */
router.post('/resetPassword', resetPassword);


/**
 * @swagger
 * /api/v1/logout:
 *   get:
 *     tags:
 *       - UserAuth
 *     summary: Logout.
 *     description: Log out of the current session.
 *     responses:
 *       200:
 *         description: Logout successful.
 *       500:
 *         description: Internal server error.
 *     
 */

router.get('/logout', userAuthenication, logout)

export default router