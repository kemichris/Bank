import { HiOutlineXMark } from "react-icons/hi2";
import { formatMoney } from "../../utils/formatMoney";
import { TransactionReceipt } from "./TransactionReceipt";

export function TransactionModal({ transaction, onClose }) {
  if (!transaction) return null;

  const isCredit = transaction.direction === "credit";

  // Determine transaction name
  const transactionName = () => {
    if (transaction.type === "deposit") {
          return `${transaction.owner.firstName} ${transaction.owner.lastName}`;
        }

    if (transaction.type === "withdrawal") {
      return `${transaction.owner.firstName} ${transaction.owner.lastName}`;
    }

    if (transaction.type === "bank_charge") {
      return `${transaction.owner.firstName} ${transaction.owner.lastName}`;
    }

    if (transaction.type === "reversal") {
      return `${transaction.owner.firstName} ${transaction.owner.lastName}`;
    }

    if (transaction.counterParty) {
      return `${transaction.counterParty.firstName} ${transaction.counterParty.lastName}`;
    }

    if (transaction.internationalDetails?.beneficiaryAccountName) {
      return transaction.internationalDetails.beneficiaryAccountName;
    }

    return "Transfer";
  };

  // Format date and time
  const transactionDate = new Date(transaction.createdAt).toLocaleString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    },
  );

  // Format amount
  const transactionAmount = `${
    isCredit ? "+" : "-"
  }$${formatMoney(transaction.amount)}`;

  return (
    <div
      className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/60
                p-4
            "
      onClick={onClose}
    >
      <div
        className="
                    w-full
                    max-w-lg
                    overflow-hidden
                    rounded-2xl
                    border
                    border-border
                    bg-surface-1
                    shadow-xl
                "
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}

        <div
          className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-border
                    px-6
                    py-5
                "
        >
          <div>
            <h2
              className="
                            text-xl
                            font-semibold
                            text-text
                        "
            >
              Transaction Details
            </h2>

            <p
              className="
                            mt-1
                            text-sm
                            text-text-muted
                        "
            >
              Full transaction information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
                            rounded-lg
                            p-2
                            text-text-muted
                            transition
                            hover:bg-surface-2
                            hover:text-text
                        "
          >
            <HiOutlineXMark size={24} />
          </button>
        </div>

        {/* Details */}

        <div
          className="
                    space-y-5
                    px-6
                    py-6
                "
        >
          <TransactionDetail label="Reference" value={transaction.reference} />

          <TransactionDetail label="Name" value={transactionName()} />

          <TransactionDetail label="Date" value={transactionDate} />

          <TransactionDetail
            label="Amount"
            value={transactionAmount}
            valueClassName={isCredit ? "text-green-500" : "text-red-500"}
          />

          <TransactionDetail label="Type" value={transaction.type} />

          <TransactionDetail label="Direction" value={transaction.direction} />

          <TransactionDetail label="Status" value={transaction.status} />

          <TransactionDetail
            label="Description"
            value={transaction.description}
          />

          <TransactionDetail
            label="Payment Method"
            value={transaction.method}
          />

          {!isCredit &&
            (transaction.counterPartyAccount?.accountNumber ||
              transaction.internationalDetails?.beneficiaryAccountNumber) && (
              <TransactionDetail
                label={
                  transaction.type === "international_transfer"
                    ? "Beneficiary Account"
                    : "Counterparty Account"
                }
                value={
                  transaction.counterPartyAccount?.accountNumber ||
                  transaction.internationalDetails?.beneficiaryAccountNumber
                }
              />
            )}
        </div>

        {/* Receipt Actions */}

        <TransactionReceipt transaction={transaction} />
      </div>
    </div>
  );
}

function TransactionDetail({ label, value, valueClassName = "text-text" }) {
  return (
    <div
      className="
            flex
            items-center
            justify-between
            gap-4
        "
    >
      <span
        className="
                text-sm
                text-text-muted
            "
      >
        {label}
      </span>

      <span
        className={`
                    max-w-[65%]
                    break-all
                    text-right
                    text-sm
                    font-medium
                    ${valueClassName}
                `}
      >
        {value || "—"}
      </span>
    </div>
  );
}
