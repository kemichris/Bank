import crypto from 'crypto';

export const generateTransactionReference = () => {
    const timestamp = Date.now();
    const random = crypto.randomBytes(4).toString('hex').toUpperCase();

    return `TRX-${timestamp}-${random}`;
};