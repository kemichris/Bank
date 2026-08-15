import toast from "react-hot-toast";

import { approveCard, rejectCard, blockCard, unblockCard, cancelCard, deleteCard } from "../../services/card.service";

export const handleApprove = async (
  card,
  setLoading,
  setShowModal,
  reload,
) => {
  setLoading(true);
  try {
    const res = await approveCard(card._id);

    await reload();

    toast.success(res.message);
    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message || "Failed to approve Card.",
    );
  } finally {
    setLoading(false);
  }
};

export const handleReject = async (
  card,
  setLoading,
  setShowModal,
  reload,
) => {
  setLoading(true);
  try {
    const res = await rejectCard(card._id);

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

export const handleBlock = async (
  card,
  setLoading,
  setShowModal,
  reload,
) => {
  setLoading(true);
  try {
    const res = await blockCard(card._id);

    await reload();

    toast.success(res.message);
    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message || "Failed to approve Card.",
    );
  } finally {
    setLoading(false);
  }
};

export const handleUnblock = async (
  card,
  setLoading,
  setShowModal,
  reload,
) => {
  setLoading(true);
  try {
    const res = await unblockCard(card._id);

    await reload();

    toast.success(res.message);
    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message || "Failed to approve Card.",
    );
  } finally {
    setLoading(false);
  }
};

export const handleCancel = async (
  card,
  setLoading,
  setShowModal,
  reload,
) => {
  setLoading(true);
  try {
    const res = await cancelCard(card._id);

    await reload();

    toast.success(res.message);
    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message || "Failed to approve Card.",
    );
  } finally {
    setLoading(false);
  }
};

export const handleDelete = async (
  card,
  setLoading,
  setShowModal,
  reload,
) => {
  setLoading(true);
  try {
    await deleteCard(card._id);
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
