import bcrypt from "bcrypt";
import crypto from 'crypto';

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};


export const generateTemporaryPassword = () => {
  const random = crypto.randomBytes(4).toString('hex');
  return `User@${random}`;
};