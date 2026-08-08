import { z } from 'zod';


// Registration validatioin schema
export const registerSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2, 'First name must be at least 2 characters.')
        .max(50, 'First name must not exceed 50 characters.'),

    lastName: z
        .string()
        .trim()
        .min(2, 'Last name must be at least 2 characters.')
        .max(50, 'Last name must not exceed 50 characters.'),

    middleName: z
        .string()
        .trim()
        .optional(),

    username: z
        .string()
        .trim()
        .min(3, 'Username must be at least 3 characters.')
        .max(30, 'Username must not exceed 30 characters.'),

    email: z
        .string()
        .trim()
        .email('Please enter a valid email address.'),

    phoneNumber: z
        .string()
        .trim()
        .min(9, 'Phone number must be at least 9 digits.')
        .max(15, 'Phone number must not exceed 15 digits.'),

    country: z
        .string()
        .trim()
        .min(2, 'Please select a valid country.'),

    dateOfBirth: z
        .string()
        .min(1, 'Date of birth is required.'),

    accountType: z.enum(
        ['savings', 'current', 'business'],
        {
            message: 'Please select a valid account type.',
        }
    ),

    transactionPin: z
        .string()
        .regex(
            /^\d{4}$/,
            'PIN must be exactly 4 digits.'
        ),

    password: z
        .string()
        .min(8, 'Password must be at least 8 characters.')
        .regex(
            /[A-Z]/,
            'Password must contain at least one uppercase letter.'
        )
        .regex(
            /[a-z]/,
            'Password must contain at least one lowercase letter.'
        )
        .regex(
            /[0-9]/,
            'Password must contain at least one number.'
        )
        .regex(
            /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]/,
            'Password must contain at least one special character.'
        ),

    confirmPassword: z
        .string()
        .min(1, 'Please confirm your password.'),
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