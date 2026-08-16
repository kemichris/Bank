import Loan from "../models/loan.model.js";
import Account from "../models/account.model.js";
import ApiError from "../utils/apiError.utils.js";

// apply for loans
export const applyForLoan = async (userId, loanData) => {
  const { requestedAmount, term, creditFacility, purpose, monthlyNetIncome } =
    loanData;

  // -----------------------------------------
  // 1. Validate loan amount
  // -----------------------------------------

  if (
    typeof requestedAmount !== "number" ||
    !Number.isFinite(requestedAmount) ||
    requestedAmount <= 0
  ) {
    throw new ApiError(400, "Please provide a valid loan amount.");
  }

  // -----------------------------------------
  // 2. Validate duration
  // -----------------------------------------

  const allowedDurations = [6, 12, 24, 36, 48, 60];

  if (!allowedDurations.includes(term)) {
    throw new ApiError(400, "Invalid loan duration.");
  }

  // -----------------------------------------
  // 3. Validate credit facility
  // -----------------------------------------

  if (!creditFacility?.trim()) {
    throw new ApiError(400, "Credit facility is required.");
  }

  // -----------------------------------------
  // 4. Validate purpose
  // -----------------------------------------

  if (!purpose?.trim()) {
    throw new ApiError(400, "Loan purpose is required.");
  }

  // -----------------------------------------
  // 5. Validate monthly income
  // -----------------------------------------

  if (
    typeof monthlyNetIncome !== "number" ||
    !Number.isFinite(monthlyNetIncome) ||
    monthlyNetIncome < 0
  ) {
    throw new ApiError(400, "Please provide a valid monthly net income.");
  }

  // -----------------------------------------
  // 6. Find user's account
  // -----------------------------------------

  const account = await Account.findOne({
    owner: userId,
    status: "active",
  });

  if (!account) {
    throw new ApiError(404, "Active account not found.");
  }

  // -----------------------------------------
  // 7. Check existing loan applications
  // -----------------------------------------

  const existingLoan = await Loan.findOne({
    owner: userId,
    status: {
      $in: ["pending", "approved", "active"],
    },
  });

  if (existingLoan) {
    throw new ApiError(
      400,
      "You already have an active loan application or loan.",
    );
  }

  // -----------------------------------------
  // 8. Create loan application
  // -----------------------------------------

  const loan = await Loan.create({
    owner: userId,
    account: account._id,

    requestedAmount,
    term,
    creditFacility,
    purpose: purpose.trim(),
    monthlyNetIncome,

    status: "pending",
  });

  // -----------------------------------------
  // 9. Return application details
  // -----------------------------------------

  return {
    loanId: loan._id,
    requestedAmount: loan.requestedAmount,
    term: loan.term,
    creditFacility: loan.creditFacility,
    purpose: loan.purpose,
    monthlyNetIncome: loan.monthlyNetIncome,
    status: loan.status,
    createdAt: loan.createdAt,
  };
};

// Get loans
export const getAllLoans = async () => {
  const loans = await Loan.find()
    .populate("owner", "firstName lastName")
    .sort({ createdAt: -1 });

  return loans;
};

export const getLoan = async (loanId) => {
  const loan = await Loan.findById({ loanId })
    .populate("owner", "firstName lastName")
    .sort({ createdAt: -1 });

  if (!loan) {
    throw new ApiError(404, "Loan application  not found.");
  }

  return loan;
};

// Update loan status
export const updateLoanStatus = async (loanId, data, adminId) => {
  const { status, approvedAmount, interestRate, rejectionReason } = data;

  if (!status) {
    throw new ApiError(400, "Status is required.");
  }

  if (
    approvedAmount === undefined ||
    approvedAmount === null ||
    approvedAmount === ""
  ) {
    throw new ApiError(400, "Approved amount is required.");
  }

  const loan = await Loan.findById(loanId);

  if (!loan) {
    throw new ApiError(404, "Loan not found.");
  }

  const statusOptions = {
    pending: ["active", "rejected", "cancelled"],

    active: ["completed", "defaulted", "cancelled"],

    rejected: [],

    completed: [],

    defaulted: [],

    cancelled: [],
  };

  const allowedStatuses = statusOptions[loan.status] || [];

  if (!allowedStatuses.includes(status)) {
    throw new ApiError(
      400,
      `Loan cannot be changed from ${loan.status} to ${status}.`,
    );
  }

  // Activate loan
  if (status === "active") {
    if (!approvedAmount) {
      throw new ApiError(400, "Approved amount is required.");
    }

    if (
      interestRate === undefined ||
      interestRate === null ||
      interestRate === ""
    ) {
      throw new ApiError(400, "Interest rate is required.");
    }

    const approved = Number(approvedAmount);

    const rate = Number(interestRate);

    if (Number.isNaN(approved)) {
      throw new ApiError(400, "Invalid approved amount.");
    }

    if (Number.isNaN(rate)) {
      throw new ApiError(400, "Invalid interest rate.");
    }

    const interest = approved * (rate / 100);

    const totalRepayment = Number((approved + interest).toFixed(2));

    const dueDate = new Date();

    if (loan.termUnit === "days") {
      dueDate.setDate(dueDate.getDate() + loan.term);
    }

    if (loan.termUnit === "months") {
      dueDate.setMonth(dueDate.getMonth() + loan.term);
    }

    if (loan.termUnit === "years") {
      dueDate.setFullYear(dueDate.getFullYear() + loan.term);
    }

    loan.approvedAmount = approved;

    loan.interestRate = rate;

    loan.totalRepayment = totalRepayment;

    loan.remainingBalance = totalRepayment;

    loan.disbursedAt = new Date();

    loan.dueDate = dueDate;

    loan.rejectionReason = "";
  }

  // Reject loan
  if (status === "rejected") {
    if (!rejectionReason?.trim()) {
      throw new ApiError(400, "Rejection reason is required.");
    }

    loan.rejectionReason = rejectionReason.trim();

    loan.approvedAmount = null;

    loan.interestRate = 0;

    loan.totalRepayment = null;

    loan.remainingBalance = null;

    loan.disbursedAt = null;

    loan.dueDate = null;
  }

  loan.reviewedBy = adminId;

  loan.reviewedAt = new Date();

  loan.status = status;

  await loan.save();

  return loan;
};

// Delete loan
export const deleteLoan = async (loanId) => {
  const loan = await Loan.findById(loanId);

  if (!loan) {
    throw new ApiError(404, "loan not found.");
  }

  await loan.findByIdAndDelete(loanId);

  return true;
};
