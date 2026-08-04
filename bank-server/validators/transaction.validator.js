import { z } from 'zod';

export const transferSchema = z.object({
    recipientAccountNumber: z
        .string()
        .trim()
        .length(10, 'Account number must be 10 digits.'),

    amount: z
        .number()
        .int()
        .positive('Amount must be greater than zero.'),

    description: z
        .string()
        .trim()
        .max(200)
        .optional()
});

// deposit schema
export const depositSchema = z.object({
    amount: z.coerce.number()
        .int()
        .positive('Amount must be greater than zero.'),

    method: z
        .string()
        .trim()
        .min(1, 'Payment method is required.')  
        
});