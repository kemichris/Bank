import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';

const ENCRYPTION_KEY = Buffer.from(
    process.env.CARD_ENCRYPTION_KEY,
    'hex'
);

export const encrypt = (text) => {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(
        ALGORITHM,
        ENCRYPTION_KEY,
        iv
    );

    let encrypted = cipher.update(
        text,
        'utf8',
        'hex'
    );

    encrypte += cipher.final('hex');

    return `${iv.toString('hex')}:${encrypted}`;
};

export const decrypt = (encryptedText) => {
    const [ivHex, encrypted] =
        encryptedText.split(':');

    const iv = Buffer.from(ivHex, 'hex');

    const decipher = crypto.createDecipheriv(
        ALGORITHM,
        ENCRYPTION_KEY,
        iv
    );

    let decrypted = decipher.update(
        encrypted,
        'hex',
        'utf8'
    );

    decrypted += decipher.final('utf8');

    return decrypted;
};