import * as paymentMethodService from "../services/paymentMethod.service.js";

export const createPaymentMethod = async (req, res, next) => {
  try {
    const paymentMethod = await paymentMethodService.createPaymentMethod(
      req.body,
      req.file,
    );

    res.status(201).json({
      success: true,
      message: "Payment method created successfully.",
      data: paymentMethod,
    });
  } catch (error) {
    next(error);
  }
};
