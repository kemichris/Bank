import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
};

export const verifyAccessToken = (token) => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET
    );
};

export const generateResetToken = payload => {
    const resetToken = jwt.sign(
        payload,
        process.env.RESET_PASSWORD_SECRET,
        {
            expiresIn: '10m'
        }
    );

    return resetToken;
};