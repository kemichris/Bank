import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { FaCaretDown } from "react-icons/fa";
import { CreditDebitModal } from "./CreditDebitModal";
import { ConfirmationModal } from "../common/ConfirmationModal";

import {
  toggleSuspension,
  toggleStatus,
  verifyUserEmail,
  verifyUserKyc,
  resetUserPassword,
  deleteUser,
} from "../../services/manageusers.service";
import { TransferModal } from "./TransferModal";
import { InternationalTransferModal } from "./InternationalTransferModal";

export function UserAction({ user, reload }) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [showCreditDebitModal, setShowCreditDebitModal] = useState(false);
  const [showTransferModal, setshowTransferModal] = useState(false);
  const [showIntTransferModal, setshowIntTransferModal] = useState(false);

  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  //   Account status Handle
  const handleStatus = async () => {
    const toastId = toast.loading("Performing Action");
    try {
      const res = await toggleStatus(user._id);
      await reload();
      toast.success(res.message, {
        id: toastId,
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message, {
        id: toastId,
      });
    }
  };

  // Suspend handle
  const handleSuspend = async () => {
    const toastId = toast.loading("Performing Action");
    setLoading(true);
    try {
      const res = await toggleSuspension(user._id);
      await reload();

      toast.success(res.message, {
        id: toastId,
      });

      setShowModal(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message, {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  // verify user email
  const handleEmailVerify = async () => {
    const toastId = toast.loading("Performing Action");
    try {
      const res = await verifyUserEmail(user._id);
      await reload();
      toast.success(res.message, {
        id: toastId,
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message, {
        id: toastId,
      });
    }
  };

  // verify user kyc
  const handleKycVerify = async () => {
    const toastId = toast.loading("Performing Action");
    try {
      const res = await verifyUserKyc(user._id);
      await reload();
      toast.success(res.message, {
        id: toastId,
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message, {
        id: toastId,
      });
    }
  };

  // handle password reset
  const handleUserPasswordReset = async () => {
    setLoading(true);
    try {
      const res = await resetUserPassword(user._id);

      toast.success(res.message);

      setShowModal(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  //   handle delete user
  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      await deleteUser(user._id);

      toast.success("user deleted successfully");

      setShowModal(false);
      navigate("/admin/manage-users");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to delete user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4 flex items-center justify-between">
      <p className="text-text font-semibold text-xl">{user.username}</p>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-1 px-3 py-1 text-base text-text"
        >
          Action
          <FaCaretDown />
        </button>

        {isOpen && (
          <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-gray-700 bg-surface-2 py-2 shadow-xl">
            <button
              onClick={() => {
                closeDropdown();
                handleStatus();
              }}
              className="block w-full px-4 py-2 text-left text-sm text-text hover:bg-border"
            >
              Toggle Account Status
            </button>

            <button
              onClick={() => {
                setModalMessage(
                  `Are you sure you want to ${user.status === "suspended" ? "Activate" : "Suspend"} this account?`,
                );
                setModalAction(() => handleSuspend);

                setShowModal(true);
                closeDropdown();
              }}
              className="block w-full px-4 py-2 text-left text-sm text-text hover:bg-border"
            >
              {user.status === "suspended"
                ? "Activate Account"
                : "Suspend Account"}
            </button>

            <button
              onClick={() => {
                handleEmailVerify();
                closeDropdown();
              }}
              className="block w-full px-4 py-2 text-left text-sm text-text hover:bg-border"
            >
              Verify Email
            </button>

            <button
              onClick={() => {
                handleKycVerify();
                closeDropdown();
              }}
              className="block w-full px-4 py-2 text-left text-sm text-text hover:bg-border"
            >
              Verify KYC
            </button>

            <button className="block w-full px-4 py-2 text-left text-sm text-text hover:bg-border">
              Edit
            </button>

            <button
              onClick={() => {
                setShowCreditDebitModal(true);

                closeDropdown();
              }}
              className="block w-full px-4 py-2 text-left text-sm text-text hover:bg-border"
            >
              Credit/Debit
            </button>
            <button
              onClick={() => {
                setshowTransferModal(true);

                closeDropdown();
              }}
              className="block w-full px-4 py-2 text-left text-sm text-text hover:bg-border"
            >
              Local Transfer
            </button>
            <button
              onClick={() => {
                setshowIntTransferModal(true);

                closeDropdown();
              }}
              className="block w-full px-4 py-2 text-left text-sm text-text hover:bg-border"
            >
              International Transfer
            </button>

            <button
              onClick={() => {
                setModalMessage(
                  " Are you sure you want to reset this user password to default",
                );
                setModalAction(() => handleUserPasswordReset);

                setShowModal(true);
                closeDropdown();
              }}
              className="block w-full px-4 py-2 text-left text-sm text-text hover:bg-border"
            >
              Reset Password
            </button>

            <button className="block w-full px-4 py-2 text-left text-sm text-text hover:bg-border">
              Login as {user.username}
            </button>

            <button
              onClick={() => {
                setModalMessage(
                  " Are you sure you want to delete this user? this action cannot be reversed",
                );
                setModalAction(() => handleDeleteUser);

                setShowModal(true);
                closeDropdown();
              }}
              className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-border"
            >
              Delete User
            </button>
          </div>
        )}
      </div>

      <CreditDebitModal
        isOpen={showCreditDebitModal}
        onClose={() => setShowCreditDebitModal(false)}
        userId={user._id}
        reload={reload}
      />
      <TransferModal
        isOpen={showTransferModal}
        onClose={() => setshowTransferModal(false)}
        userId={user._id}
        reload={reload}
      />
      <InternationalTransferModal
        isOpen={showIntTransferModal}
        onClose={() => setshowIntTransferModal(false)}
        userId={user._id}
        reload={reload}
      />

      <ConfirmationModal
        isOpen={showModal}
        message={modalMessage}
        onConfirm={modalAction}
        onCancel={() => setShowModal(false)}
        loading={loading}
      />
    </div>
  );
}
