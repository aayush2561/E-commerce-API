import express from 'express';
import { placeOrder, trackOrder, updatePaymentStatus } from '../controllers/orderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/place', authMiddleware, placeOrder);
router.get('/track/:id', authMiddleware, trackOrder);
router.put('/payment-status/:id', authMiddleware, updatePaymentStatus);

export default router;
