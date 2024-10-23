import User from '../models/UserModel.js';
import { generateToken } from '../utils/GenerateToken.js';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { AppError } from '../middleware/ErrorHandler.js';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!validator.isEmail(email)) {
        return next(new AppError('Invalid email format', 400));
    }

    if (!validator.isLength(password, { min: 6 })) {
        return next(new AppError('Password must be at least 6 characters long', 400));
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new AppError('User already exists', 400));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(error); 
    }
};

export const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return next(new AppError('Invalid username or password', 400));
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password || "");
        if (!isPasswordCorrect) {
            return next(new AppError('Invalid username or password', 400));
        }

        generateToken(user._id, res);
        res.status(200).json({ 
            _id: user._id,
            username: user.username,
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        next(error);
    }
};
