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