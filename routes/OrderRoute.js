import express from 'express';
import { placeOrder, trackOrder, updatePaymentStatus } from '../controllers/OrderController.js';
import { protectedRoute } from '../middleware/ProtectedRoute.js';
const router = express.Router();

router.post('/place', protectedRoute, placeOrder);
router.get('/track/:id', protectedRoute, trackOrder);
router.patch('/payment-status/:id', protectedRoute, updatePaymentStatus);

export default router;
