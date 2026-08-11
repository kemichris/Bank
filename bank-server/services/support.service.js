import SupportTicket from "../models/supportTicket.model.js";
import User from "../models/user.model.js";
import { supportTicketReceivedMail } from "./mail.service.js";

// support ticket
export const createSupportTicket = async (userId, ticketData) => {
  const { title, description } = ticketData;


  if (!title?.trim()) {
    throw new ApiError(400, "Ticket title is required.");
  }


  if (!description?.trim()) {
    throw new ApiError(400, "Ticket description is required.");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const ticket = await SupportTicket.create({
    owner: userId,
    title: title.trim(),
    description: description.trim(),
    status: "open",
  });

  const fullName = `${user.firstName} ${user.lastName}`;

  await supportTicketReceivedMail(user.email, fullName, ticket.title);

  return {
    ticketId: ticket._id,
    title: ticket.title,
    status: ticket.status,
    createdAt: ticket.createdAt,
  };
};
