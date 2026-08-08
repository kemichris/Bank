import { z } from 'zod';


// Registration validatioin schema
export const registerSchema = z.object({
    firstName: z.string().trim().min(2).max(50),

    lastName: z.string().trim().min(2).max(50),

    middleName: z.string().trim().optional(),

    username: z.string().trim().min(3).max(30),

    email: z.string().trim().email(),

    phoneNumber: z.string().trim().min(9).max(15),

    country: z.string().trim().min(2),

    dateOfBirth: z.string(),

    accountType: z.enum([
        'savings',
        'current',
        'business',
    ]),

    transactionPin: z
        .string()
        .regex(/^\d{4}$/, 'PIN must be exactly 4 digits'),

    password: z
        .string()
        .min(8)
        .regex(/[A-Z]/)
        .regex(/[a-z]/)
        .regex(/[0-9]/)
        .regex(/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]/),

    confirmPassword: z.string(),
})
.refine(
    data => data.password === data.confirmPassword,
    {
        path: ['confirmPassword'],
        message: 'Passwords do not match.',
    }
)
.transform(({ confirmPassword, ...rest }) => rest);


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