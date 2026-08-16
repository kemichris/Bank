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

// get all loans 
export const gettAllLoans = async (req, res, next) => {
    try {
        const loans = await loanServices.getAllLoans();

        return res.status(200).json({
            success: true,
            message: 'Loan retrieved successfully.',
            data: loans
        });
    } catch (error) {
        next(error);
    }
};

export const getLoan = async (req, res, next) => {
    try {
        const {loanId} = req.params;
        const loan = await loanServices.getLoan(loanId);

        return res.status(200).json({
            success: true,
            message: 'Loan retrieved successfully.',
            data: loan
        });
    } catch (error) {
        next(error);
    }
};

// update loan status
export const updateLoanStatus = async (
  req,
  res,
  next,
) => {
  try {
    const { loanId } = req.params;

    const loan =
      await loanService.updateLoanStatus(
        loanId,
        req.body,
        req.user._id,
      );

    return res.status(200).json({
      success: true,
      message:
        'Loan updated successfully.',
      data: loan,
    });
  } catch (error) {
    next(error);
  }
};