import Order from '../models/OrderModel.js';
import User from '../models/UserModel.js'
import { AppError } from '../middleware/ErrorHandler.js';

export const placeOrder = async (req, res, next) => {
    try {
        const order = new Order({ user: req.user.id, products: req.body.products });
        await order.save();
        await User.findByIdAndUpdate(req.user.id, { $push: { orderHistory: order._id } });
        const response = await Order.findById(order._id).select('-user -__v');
        res.status(201).json(response);
    } catch (error) {
        return next(new AppError('Failed to place order', 500));
    }
};

export const trackOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return next(new AppError('Order not found', 404));
        }
        if (order.user.toString() !== req.user.id) {
            return next(new AppError('Unauthorized to access this order', 403));
        }
        res.json(order);
    } catch (error) {
        return next(new AppError('Error retrieving order', 500));
    }
};

export const updatePaymentStatus = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return next(new AppError('Order not found', 404));
        }
        if (order.user.toString() !== req.user.id) {
            return next(new AppError('Unauthorized to update this order', 403));
        }
        order.paymentStatus = req.body.status;
        await order.save();

        res.json(order);
    } catch (error) {
        return next(new AppError('Failed to update payment status', 500));
    }
};