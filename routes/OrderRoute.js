import express from 'express';
import { placeOrder, trackOrder, updatePaymentStatus } from '../controllers/OrderController.js';
import { protectedRoute } from '../middleware/ProtectedRoute.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management operations
 */

/**
 * @swagger
 * /order/place:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     security:
 *       - cookie: []  
 *     parameters:
 *       - in: cookie
 *         name: jwt
 *         required: true
 *         description: JWT token must be present in the cookie for authentication.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: "60d5ec49f8c2d03b4c30e4d5"
 *                     quantity:
 *                       type: integer
 *                       example: 3
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 user:
 *                   type: string
 *                 products:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Invalid input
 */
router.post('/place', protectedRoute, placeOrder);

/**
 * @swagger
 * /order/track/{id}:
 *   get:
 *     summary: Track an order by ID
 *     tags: [Orders]
 *     security:
 *       - cookie: []  
 *     parameters:
 *       - in: cookie
 *         name: jwt
 *         required: true
 *         description: JWT token must be present in the cookie for authentication.
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to track
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 user:
 *                   type: string
 *                 products:
 *                   type: array
 *                   items:
 *                     type: string
 *                 paymentStatus:
 *                   type: string
 *       404:
 *         description: Order not found
 *       403:
 *         description: Unauthorized to access this order
 */
router.get('/track/:id', protectedRoute, trackOrder);

/**
 * @swagger
 * /order/payment-status/{id}:
 *   patch:
 *     summary: Update payment status of an order
 *     tags: [Orders]
 *     security:
 *       - cookie: []   
 *     parameters:
 *       - in: cookie
 *         name: jwt
 *         required: true
 *         description: JWT token must be present in the cookie for authentication.
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "Paid"
 *     responses:
 *       200:
 *         description: Payment status updated successfully
 *       404:
 *         description: Order not found
 */
router.patch('/payment-status/:id', protectedRoute, updatePaymentStatus);

export default router;
