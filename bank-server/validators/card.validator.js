import { z } from 'zod';

export const cardRequestSchema = z.object({
    brand: z.enum(['Visa', 'Mastercard', 'Amex']),
    spendingLimit: z
        .number()
        .int()
        .min(100, 'Minimum spending limit is 100.')
        .max(1000, 'Maximum spending limit is 1000.')
});