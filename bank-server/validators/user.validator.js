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