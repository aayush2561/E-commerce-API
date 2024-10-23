import User from '../models/UserModel.js';
import { AppError } from '../middleware/ErrorHandler.js';

export const editProfile = async (req, res, next) => {
    const { username } = req.body;

    if (!username) {
        return next(new AppError('Username is required', 400));
    }

    try {
        const user = await User.findByIdAndUpdate(req.user.id, { username }, { new: true }).select("-password");;
        if (!user) {
            return next(new AppError('User not found', 404));
        }
        res.json(user.username);
    } catch (error) {
        next(error);
    }
};

export const viewOrderHistory = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).populate('orderHistory');
        if (!user) {
            return next(new AppError('User not found', 404));
        }
        res.json(user.orderHistory);
    } catch (error) {
        next(error);
    }
};
