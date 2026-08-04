import * as authService from '../services/auth.service.js';

export const register = async (req, res, next) => {
    try {
        const registration = await authService.register(req.body);

        return res.status(201).json({
            success: true,
            message: "Registration successful.",
            data: registration
        });

    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const loggedIn = await authService.login(req.body);

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            data: loggedIn
        });

    } catch (error) {
        next(error);
    }
};