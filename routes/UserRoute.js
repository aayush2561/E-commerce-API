
import express from 'express';
import { editProfile, viewOrderHistory } from '../controllers/UserController.js';
import { protectedRoute } from '../middleware/ProtectedRoute.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management operations
 */

/**
 * @swagger
 * /user/edit:
 *   patch:
 *     summary: Edit user profile
 *     tags: [Users]
 *     security:
 *       - cookie: []
 *     parameters:
 *       - in: cookie
 *         name: jwt  
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token must be present in the cookie for authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: new_username
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found.
 */
router.patch('/edit', protectedRoute, editProfile);

/**
 * @swagger
 * /user/order-history:
 *   get:
 *     summary: Retrieve order history of the user
 *     tags: [Users]
 *     security:
 *       - cookie: []  
 *     parameters:
 *       - in: cookie
 *         name: jwt  
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token must be present in the cookie for authentication.
 *     responses:
 *       200:
 *         description: Order history retrieved successfully. 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: string
 *                         quantity:
 *                           type: integer
 *                         _id:
 *                           type: string
 *                   paymentStatus:
 *                     type: string
 *                   orderDate:
 *                     type: string
 *                     format: date-time
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   __v:
 *                     type: integer
 *       404:
 *         description: User not found. 
 */
router.get('/order-history', protectedRoute, viewOrderHistory);

export default router;
