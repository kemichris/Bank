import * as paymentMethodService from "../services/paymentMethod.service.js";

export const createPaymentMethod = async (req, res, next) => {
  try {
    const paymentMethod = await paymentMethodService.createPaymentMethod(
      req.body,
      req.file,
    );

    return res.status(201).json({
      success: true,
      message: "Payment method created successfully.",
      data: paymentMethod,
    });
  } catch (error) {
    next(error);
  }
};

// Get payment methods
export const getPaymentMethods = async (req, res, next) => {
  try {
    const paymentMethods = await paymentMethodService.getPaymentMethods();

    return res.status(200).json({
      success: true,
      message: "Payment methods retrieved successfully.",
      data: paymentMethods
    });
  } catch (error) {
    next(error)
  }
};
