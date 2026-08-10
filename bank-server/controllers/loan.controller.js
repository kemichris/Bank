import * as loanServices from '../services/loan.service.js'

// Loan request
export const applyForLoan = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const loanApplication = await loanServices.applyForLoan(
            userId,
            req.body
        );

        return res.status(201).json({
            success: true,
            message: 'Loan application submitted successfully.',
            data: loanApplication
        });
    } catch (error) {
        next(error);
    }
};