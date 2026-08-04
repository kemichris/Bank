import { z } from 'zod';


// Registration validatioin schema
export const registerSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2, 'First name must be at least 2 characters.')
        .max(50),

    lastName: z
        .string()
        .trim()
        .min(2, 'Last name must be at least 2 characters.')
        .max(50),

    email: z
        .string()
        .trim()
        .email('Invalid email address.'),

    phoneNumber: z
        .string()
        .trim()
        .min(11, 'Phone number must be at least 11 digits.')
        .max(15),

    dateOfBirth: z.string(),

    accountType: z.enum(['savings', 'current', 'business']),

    currency: z.enum(['USD', 'EUR', 'GBP', 'NGN']),

    password: z
        .string()
        .min(8, 'Password must be at least 8 characters.')
        .regex(/[A-Z]/, 'Password must contain an uppercase letter.')
        .regex(/[a-z]/, 'Password must contain a lowercase letter.')
        .regex(/[0-9]/, 'Password must contain a number.')
        .regex(
            /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]/,
            'Password must contain at least one special character.'
        ), confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
}).transform(({ confirmPassword, ...rest }) => rest);


// login validation schema
export const loginSchema = z.object({
    email: z
        .email('Please enter a valid email address.')
        .trim()
        .toLowerCase(),

    password: z
        .string()
        .min(1, 'Password is required.')
});