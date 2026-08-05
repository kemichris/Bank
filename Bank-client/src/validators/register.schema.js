import { z } from 'zod';

export const personalSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(1, 'First name is required'),

    lastName: z
        .string()
        .trim()
        .min(1, 'Last name is required'),

    middleName: z
        .string()
        .trim()
        .optional(),

    username: z
        .string()
        .trim()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username cannot exceed 20 characters'),
});

export const contactSchema = z.object({
    email: z
        .email('Please enter a valid email address'),

    phoneNumber: z
        .string()
        .trim()
        .min(1, 'Phone number is required'),

    country: z
        .string()
        .trim()
        .min(1, 'Country is required'),
});

export const accountSchema = z.object({

    accountType: z
        .string()
        .min(1, 'Please select an account type'),

    transactionPin: z
        .string()
        .regex(/^\d{4}$/, 'PIN must be exactly 4 digits'),
});

export const securitySchema = z.object({
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters'),

    confirmPassword: z
        .string(),

    acceptTerms: z
        .boolean()
        .refine(value => value, {
            message: 'You must accept the terms and conditions',
        }),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});