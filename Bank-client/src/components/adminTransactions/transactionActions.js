import toast from "react-hot-toast";

import {
  rejectTransaction,
  deleteTransaction,
  confirmTransaction
} from "../../services/transaction.service";

export const handleConfirm = async (
  transaction,
  setLoading,
  setShowModal,
  reload,
) => {
  setLoading(true);
  try {

    const res = await confirmTransaction(transaction._id);

    await reload()

    toast.success(res.message);
    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(error.response?.data?.message || "Failed to approve transaction.",);
  }finally {
    setLoading(false);
  }
};

export const handleReject = async (
  transaction,
  setLoading,
  setShowModal,
  reload,
) => {
  setLoading(true);
  try {
    const res = await rejectTransaction(transaction._id);

    await reload();

    toast.success(res.message);

    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message || "Failed to reject transaction.",
    );
  } finally {
    setLoading(false);
  }
};

export const handleDelete = async (
  transaction,
  setLoading,
  setShowModal,
  reload,
) => {
  setLoading(true);
  try {
    await deleteTransaction(transaction._id);
    await reload();
    toast.success("Transaction deleted.");
    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error("Failed to delete transaction.");
  } finally {
    setLoading(false);
  }
};
