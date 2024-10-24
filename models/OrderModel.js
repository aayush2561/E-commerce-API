import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ productId: String, quantity: Number }],
    paymentStatus: { type: String, enum: ['Paid', 'Unpaid', ], default: 'Unpaid' },
    orderDate: { type: Date, default: Date.now },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
