import toast from "react-hot-toast";

import { rejectTransaction } from "../../services/transaction.service";

export const handleConfirm = async (transaction) => {
  try {
    console.log("Confirm:", transaction);

    // await confirmTransaction(transaction._id);

    toast.success("Transaction confirmed.");
  } catch (error) {
    console.error(error);

    toast.error("Failed to confirm transaction.");
  }
};

export const handleReject = async (transaction, setLoading, setShowModal, reload) => {
  setLoading(true);
  try {
    console.log("Reject:", transaction);

    const res = await rejectTransaction(transaction._id);

    await reload()

    toast.success(res.message);

    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message || "Failed to reject transaction.",
    );
  } finally {
    setLoading(false)
  }
};

export const handleDelete = async (transaction) => {
  try {
    console.log("Delete:", transaction);

    // await deleteTransaction(transaction._id);

    toast.success("Transaction deleted.");
  } catch (error) {
    console.error(error);

    toast.error("Failed to delete transaction.");
  }
};
