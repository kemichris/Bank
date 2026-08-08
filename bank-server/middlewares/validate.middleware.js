import { ZodError } from 'zod';
import ApiError from '../utils/apiError.utils';

export const validate = schema => {
    return (req, res, next) => {
        try {
            req.validatedData = schema.parse(req.body);

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return next(
                    new ApiError(
                        400,
                        'Validation failed.',
                        error.flatten().fieldErrors
                    )
                );
            }

            next(error);
        }
    };
};