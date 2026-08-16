import * as taxRefundServices from '../services/taxRefund.service.js'


// Refund request 
export const submitTaxRefundRequest = async (req, res, next) => {
    try {
        const userId = req.user._id
        const submittedRequst = await taxRefundServices.submitTaxRefundRequest(
            userId,
            req.body
        )

        return res.status(201).json({
            success:true,
            message: 'Your IRS Tax refund has been submitted successfully',
            data: submittedRequst
        })
    } catch (error) {
        next(error)
    }
}

export const getAllTaxRefunds = async (req, res, next) => {
    try {
        const taxRefunds = await taxRefundServices.getAllTaxRefunds();

        return res.status(200).json({
            success: true,
            message: 'Tax refund retrieved successfully.',
            data: taxRefunds
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTaxRefund = async (req, res, next) => {
  try {
    const { id } = req.params;
    await taxRefundServices.deleteTaxRefund(id);
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};