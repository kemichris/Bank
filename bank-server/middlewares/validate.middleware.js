import ApiError from '../utils/apiError.utils.js';

export const validate = schema => {
    return (req, res, next) => {
        try {
            req.validatedData = schema.parse(req.body);

            next();
        } catch (error) {
            if (error && typeof error.flatten === 'function') {
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

