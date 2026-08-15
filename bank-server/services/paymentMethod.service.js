import PaymentMethod from "../models/paymentMethod.model.js";
import { uploadImage } from "../utils/cloudinary.utils.js";

import ApiError from "../utils/apiError.utils.js";

// create payment method
export const createPaymentMethod = async (paymentData, qrCodeFile) => {
  const {
    name,
    network,
    type,
    paymentAddress,
    accountName,
    bankName,
    swiftCode,
    icon,
    instructions,
    status,
  } = paymentData;

  if (!name || !type) {
    throw new ApiError(400, "Payment method name and type are required.");
  }

  let qrCode = "";

  if (qrCodeFile) {
    const uploadedImage = await uploadImage(
      qrCodeFile.buffer,
      "neon/payment-methods",
    );

    qrCode = uploadedImage.secure_url;
  }

  const paymentMethod = await PaymentMethod.create({
    name,
    network,
    type,
    paymentAddress,
    accountName,
    bankName,
    swiftCode,
    icon,
    qrCode,
    instructions,
    status,
  });

  return paymentMethod;
};

// get payment methods 
export const getPaymentMethods = async () => {
  const paymentMethods = await PaymentMethod.find()
  .sort({createdAt: -1});

  return paymentMethods;
};
