import Order from '../models/OrderModel.js';

// Place order
export const placeOrder = async (req, res) => {
    try {
        const order = new Order({ user: req.user.id, products: req.body.products });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Track order
export const trackOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Manage payment status
export const updatePaymentStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { paymentStatus: req.body.status }, { new: true });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
