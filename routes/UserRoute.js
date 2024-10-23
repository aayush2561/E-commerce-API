import express from 'express';
import { editProfile, viewOrderHistory } from '../controllers/UserController.js';
import  { protectedRoute } from '../middleware/ProtectedRoute.js';

const router = express.Router();

router.put('/edit', protectedRoute, editProfile);
router.get('/order-history', protectedRoute, viewOrderHistory);

export default router;
