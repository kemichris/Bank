import mongoose from 'mongoose';
import User from '../models/user.model.js';
import Role from '../models/role.model.js';
import Account from '../models/account.model.js';

import ApiError from '../utils/apiError.utils.js';
import { hashPassword, comparePassword } from '../utils/password.utils.js';
import { generateAccountNumber } from '../utils/account.utils.js';
import { fromSmallestUnit } from '../utils/money.utils.js';
import { generateAccessToken } from '../utils/jwt.utils.js';

// user registration service
export const register = async (userData) => {
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        dateOfBirth,
        password,
        accountType,
        currency
    } = userData;

    const [existingEmail, existingPhone] = await Promise.all([
        User.findOne({ email }),
        User.findOne({ phoneNumber })
    ]);

    if (existingEmail) {
        throw new ApiError(409, 'Email already exists.');
    }
    if (existingPhone) {
        throw new ApiError(409, 'Phone number already exists.');
    }

    // Find default user role
    const userRole = await Role.findOne({ name: 'user' });

    if (!userRole) {
        throw new ApiError(500, 'Default user role not found.');
    }

    const accountName = `${firstName} ${lastName}`.trim();

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Start MongoDB session
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // Create user
        const user = new User({
            firstName,
            lastName,
            email,
            phoneNumber,
            dateOfBirth,
            password: hashedPassword,
            role: userRole._id
        });

        await user.save({ session });

        // Generate account number
        const accountNumber = await generateAccountNumber(session);

        // Create account
        const account = new Account({
            owner: user._id,
            accountName: accountName,
            accountNumber,
            accountType: accountType,
            currency: currency
        });

        await account.save({ session });

        // Save everything
        await session.commitTransaction();


        return {
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },
            account: {
                accountNumber: account.accountNumber,
                accountName: account.accountName,
                accountType: account.accountType,
                balance: fromSmallestUnit(account.balance),
                currency: account.currency
            }
        };

    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }

        throw error;

    } finally {
        await session.endSession();
    }
};

// user login service
export const login = async (userData) => {
    const {
        email,
        password
    } = userData;

    // Find user by email
    const user = await User.findOne({ email }).populate('role');

    if (!user) {
        throw new ApiError(401, 'Invalid email or password.');
    }

    // Compare password
    const isPasswordValid = await comparePassword(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid email or password.');
    }

    // Generate access token
    const accessToken = generateAccessToken({
        id: user._id,
        role: user.role.name
    });

    // Update last login
    user.lastLogin = new Date();

    await user.save();

    return {
        accessToken,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role.name
        }
    };
};