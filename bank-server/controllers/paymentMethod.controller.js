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
      data: paymentMethods,
    });
  } catch (error) {
    next(error);
  }
};

// get payment method by id
export const getPaymentMethod = async (req, res, next) => {
  try {
    const paymentMethod = await paymentMethodService.getPaymentMethod(
      req.params.id,
    );

    res.status(200).json({
      success: true,
      data: paymentMethod,
    });
  } catch (error) {
    next(error);
  }
};

//   Update payment method
export const updatePaymentMethod = async (req, res, next) => {
  try {
    const paymentMethod = await paymentMethodService.updatePaymentMethod(
      req.params.id,
      req.body,
      req.file,
    );

    res.status(200).json({
      success: true,
      message: "Payment method updated successfully.",
      data: paymentMethod,
    });
  } catch (error) {
    next(error);
  }
};

// Delete payment method
export const deletePaymentMethod = async (req, res, next) => {
  try {
    const { methodId } = req.params;
    await paymentMethodService.deletePaymentMethod(methodId);
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};


export const togglePaymentMethodStatus = async (req, res, next) => {
  try {
    const { methodId } = req.params;
    const paymentMethod =
      await paymentMethodService.togglePaymentMethodStatus(methodId);

    return res.status(200).json({
      success: true,
      message: `Payment method ${
        paymentMethod.status === "enabled" ? "enabled" : "disabled"
      } successfully`,
      data: paymentMethod,
    });
  } catch (error) {
    next(error);
  }
};
