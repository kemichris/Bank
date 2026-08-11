import { useRef } from "react";
import { createPortal } from "react-dom";

import { formatMoney } from "../../utils/formatMoney";
import { ShareReceipt } from "./ShareReceipt";

export function TransactionReceipt({ transaction }) {
  const receiptRef = useRef(null);

  if (!transaction) return null;

  const isCredit = transaction.direction === "credit";

  const transactionName = () => {
    if (transaction.type === "deposit") {
      return "Deposit";
    }

    if (transaction.type === "withdrawal") {
      return "Withdrawal";
    }

    if (transaction.counterParty) {
      return `${transaction.counterParty.firstName} ${transaction.counterParty.lastName}`;
    }

    if (transaction.internationalDetails?.beneficiaryAccountName) {
      return transaction.internationalDetails.beneficiaryAccountName;
    }

    return "Transfer";
  };

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

  const transactionAmount = `${
    isCredit ? "+" : "-"
  }$${formatMoney(transaction.amount)}`;

  const receipt = (
    <div
      ref={receiptRef}
      style={{
        width: "600px",
        backgroundColor: "#ffffff",
        color: "#111827",
        padding: "40px",
        fontFamily: "Arial, Helvetica, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "35px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "26px",
            fontWeight: 700,
          }}
        >
          Global Merchant Bank
        </h1>

        <p
          style={{
            margin: "8px 0 0",
            fontSize: "14px",
            color: "#6b7280",
          }}
        >
          Transaction Receipt
        </p>
      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            width: "58px",
            height: "58px",
            margin: "0 auto 12px",
            borderRadius: "50%",
            backgroundColor: "#dcfce7",
            color: "#16a34a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            fontWeight: 700,
          }}
        >
          ✓
        </div>

        <p
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: 700,
          }}
        >
          {transaction.status === "completed"
            ? "Transaction Successful"
            : transaction.status.charAt(0).toUpperCase() +
              transaction.status.slice(1)}
        </p>
      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: "35px",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: "#6b7280",
          }}
        >
          Amount
        </p>

        <p
          style={{
            margin: "5px 0 0",
            fontSize: "34px",
            fontWeight: 700,
            color: isCredit ? "#16a34a" : "#dc2626",
          }}
        >
          {transactionAmount}
        </p>
      </div>

      <div
        style={{
          borderTop: "1px solid #e5e7eb",
          paddingTop: "20px",
        }}
      >
        <ReceiptDetail label="Reference" value={transaction.reference} />

        <ReceiptDetail label="Name" value={transactionName()} />
        {!isCredit &&
          (transaction.counterPartyAccount?.accountNumber ||
            transaction.internationalDetails?.beneficiaryAccountNumber) && (
            <ReceiptDetail
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

        <ReceiptDetail label="Date" value={transactionDate} />

        <ReceiptDetail label="Transaction Type" value={transaction.type} />

        <ReceiptDetail label="Payment Method" value={transaction.method} />

        <ReceiptDetail label="Description" value={transaction.description} />
      </div>

      <div
        style={{
          marginTop: "35px",
          paddingTop: "20px",
          borderTop: "1px solid #e5e7eb",
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            color: "#6b7280",
          }}
        >
          This is an electronically generated transaction receipt.
        </p>

        <p
          style={{
            margin: "5px 0 0",
            fontSize: "12px",
            color: "#9ca3af",
          }}
        >
          Global Merchant Bank
        </p>
      </div>
    </div>
  );

  return (
    <>
      <ShareReceipt receiptRef={receiptRef} transaction={transaction} />

      {createPortal(
        <div
          style={{
            position: "absolute",
            left: "-99999px",
            top: 0,
            width: "600px",
            pointerEvents: "none",
          }}
        >
          {receipt}
        </div>,
        document.body,
      )}
    </>
  );
}

function ReceiptDetail({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
        padding: "10px 0",
      }}
    >
      <span
        style={{
          fontSize: "14px",
          color: "#6b7280",
        }}
      >
        {label}
      </span>

      <span
        style={{
          maxWidth: "60%",
          textAlign: "right",
          wordBreak: "break-word",
          fontSize: "14px",
          fontWeight: 600,
        }}
      >
        {value || "—"}
      </span>
    </div>
  );
}
