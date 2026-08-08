import { z } from 'zod';

// password change validation schema
export const changePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(1, 'Current password is required.'),
    newPassword: z
        .string()
        .min(8, 'New password must be at least 8 characters.')
        .regex(/[A-Z]/, 'New password must contain an uppercase letter.')
        .regex(/[a-z]/, 'New password must contain a lowercase letter.')
        .regex(/[0-9]/, 'New password must contain a number.')
        .regex(
            /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]/,
            'New password must contain at least one special character.'
        ),
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match.', 
    path: ['confirmPassword']
}).transform(({ confirmPassword, ...rest }) => rest);


export const verifyEmailSchema = z.object({
    email: z.string().email('Invalid email address'),
    verificationCode: z
        .string()
        .length(6, 'Verification code must be 6 digits')
        .regex(/^\d+$/, 'Verification code must contain only numbers')
});