import User from '../models/user.model.js';

import ApiError from '../utils/apiError.utils.js';
import { verifyAccessToken } from '../utils/jwt.utils.js';


// Authentication middleware
export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new ApiError(401, 'Not Authorized, no token.');
        }

        const token = authHeader.split(' ')[1];

        const decoded = verifyAccessToken(token);

        const user = await User.findById(decoded.id).populate('role');

        if (!user) {
            throw new ApiError(401, 'User not found.');
        }

        req.user = user;

        next();

    } catch (error) {
        next(error);
    }
};

// Authorization
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(
                new ApiError(401, 'Authentication required.')
            );
        }

        if (!roles.includes(req.user.role.name)) {
            return next(
                new ApiError(
                    403,
                    'You do not have permission to perform this action.'
                )
            );
        }

        next();
    };
};