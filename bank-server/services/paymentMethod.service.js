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
  const paymentMethods = await PaymentMethod.find().sort({ createdAt: -1 });

  return paymentMethods;
};


// Get payment method by id
export const getPaymentMethod = async (id) => {
  const paymentMethod = await PaymentMethod.findById(id);

  if (!paymentMethod) {
    throw new ApiError(404, "Payment method not found.");
  }

  return paymentMethod;
};


// update payment method 
export const updatePaymentMethod = async (id, data, qrCodeFile) => {
  const paymentMethod = await PaymentMethod.findById(id);

  if (!paymentMethod) {
    throw new ApiError(404, "Payment method not found.");
  }

  let qrCode = paymentMethod.qrCode;

  if (qrCodeFile) {
    const uploadedImage = await uploadImage(
      qrCodeFile.buffer,
      "neon/payment-methods",
    );

    qrCode = uploadedImage.secure_url;
  }

  paymentMethod.type = data.type ?? paymentMethod.type;

  paymentMethod.name = data.name ?? paymentMethod.name;

  paymentMethod.network = data.network ?? paymentMethod.network;

  paymentMethod.paymentAddress =
    data.paymentAddress ?? paymentMethod.paymentAddress;

  paymentMethod.accountName = data.accountName ?? paymentMethod.accountName;

  paymentMethod.bankName = data.bankName ?? paymentMethod.bankName;

  paymentMethod.swiftCode = data.swiftCode ?? paymentMethod.swiftCode;

  paymentMethod.icon = data.icon ?? paymentMethod.icon;

  paymentMethod.instructions = data.instructions ?? paymentMethod.instructions;

  paymentMethod.status = data.status ?? paymentMethod.status;

  paymentMethod.qrCode = qrCode;

  await paymentMethod.save();

  return paymentMethod;
};

// Delete payment method
export const deletePaymentMethod = async (methodId) => {
  const paymentMethod = await PaymentMethod.findByIdAndDelete(methodId);
  if (!paymentMethod) {
    throw new ApiError(404, "Payment method not found.");
  }

  return true;
};

// Toggle Payment Method Status
export const togglePaymentMethodStatus = async (methodId) => {
  const paymentMethod = await PaymentMethod.findById(methodId);

  if (!paymentMethod) {
    throw new ApiError(404, "Payment method not found.");
  }

  // Toggle status
  paymentMethod.status =
    paymentMethod.status === "enabled" ? "disabled" : "enabled";

  await paymentMethod.save();

  return paymentMethod;
};
