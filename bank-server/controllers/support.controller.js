import * as supportService from "../services/support.service.js";

export const createSupportTicket = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const ticket = await supportService.createSupportTicket(userId, req.body);

    return res.status(201).json({
      success: true,
      message: "Support ticket submitted successfully.",
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};
