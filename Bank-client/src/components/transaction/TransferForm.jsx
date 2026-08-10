import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import toast from 'react-hot-toast';

import { getTransferRecipient } from '../../services/transaction.service';

export function TransferForm() {
    const [formData, setFormData] = useState({
        accountNumber: '',
        amount: '',
        description: '',
        transactionPin: ''
    });

    const [recipient, setRecipient] = useState(null);

    const [verifying, setVerifying] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = event => {
        const { name, value } = event.target;

        setFormData(previous => ({
            ...previous,
            [name]:
                name === 'amount'
                    ? Number(value)
                    : value
        }));

        // If the account number changes,
        // remove the previously verified recipient.
        if (name === 'accountNumber') {
            setRecipient(null);
        }
    };

    const handleVerifyAccount = async () => {
        if (!formData.accountNumber) {
            toast.error('Please enter the account number.');
            return;
        }

        setVerifying(true);

        try {
            const res = await getTransferRecipient(
                formData.accountNumber
            );

            setRecipient(res.data);

            toast.success(
                'Account verified successfully.'
            );

        } catch (error) {
            console.error(error);

            setRecipient(null);

            toast.error(
                error.response?.data?.message ||
                'Unable to verify account.'
            );
        } finally {
            setVerifying(false);
        }
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if (!recipient) {
            toast.error(
                'Please verify the recipient account first.'
            );
            return;
        }

        if (!formData.amount || formData.amount <= 0) {
            toast.error('Please enter a valid amount.');
            return;
        }

        if (!formData.transactionPin) {
            toast.error('Please enter your transaction PIN.');
            return;
        }

        setLoading(true);

        try {
            // Actual transfer service will go here
            console.log({
                ...formData,
                recipient
            });

            toast.success('Transfer successful.');

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                'Unable to complete transfer.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-border bg-surface-2 p-6">

            {/* Header */}
            <div className="mb-6">

                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                    <FaArrowRight size={20} />
                </div>

                <h2 className="text-xl font-semibold text-text">
                    Transfer Money
                </h2>

                <p className="mt-1 text-sm text-text-muted">
                    Send money securely to another account.
                </p>

            </div>


            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* Account Number */}
                <div>

                    <label
                        htmlFor="accountNumber"
                        className="mb-2 block text-sm font-medium text-text"
                    >
                        Account Number
                    </label>

                    <div className="flex gap-2">

                        <input
                            id="accountNumber"
                            name="accountNumber"
                            type="text"
                            inputMode="numeric"
                            value={formData.accountNumber}
                            onChange={handleChange}
                            placeholder="Enter account number"
                            className="
                                min-w-0
                                flex-1
                                rounded-xl
                                border
                                border-border
                                bg-surface-1
                                px-4
                                py-3
                                text-sm
                                text-text
                                outline-none
                                transition
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-500/20
                            "
                        />

                        <button
                            type="button"
                            onClick={handleVerifyAccount}
                            disabled={
                                verifying ||
                                !formData.accountNumber
                            }
                            className="
                                shrink-0
                                rounded-xl
                                bg-blue-600
                                px-4
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:bg-blue-700
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >
                            {verifying
                                ? 'Checking...'
                                : 'Verify'}
                        </button>

                    </div>


                    {/* Recipient */}
                    {recipient && (
                        <div className="mt-3 rounded-xl border border-border bg-surface-1 px-4 py-3">

                            <p className="text-sm font-semibold text-text">
                                {recipient.firstName}{' '}
                                {recipient.lastName}
                            </p>

                            <p className="mt-1 text-xs text-text-muted">
                                Account:{' '}
                                {recipient.accountNumber}
                            </p>

                        </div>
                    )}

                </div>


                {/* Amount */}
                <div>

                    <label
                        htmlFor="amount"
                        className="mb-2 block text-sm font-medium text-text"
                    >
                        Amount
                    </label>

                    <div className="relative">

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-text-muted">
                            $
                        </span>

                        <input
                            id="amount"
                            name="amount"
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="0.00"
                            className="
                                w-full
                                rounded-xl
                                border
                                border-border
                                bg-surface-1
                                py-3
                                pl-8
                                pr-4
                                text-sm
                                text-text
                                outline-none
                                transition
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-500/20
                            "
                        />

                    </div>

                </div>


                {/* Description */}
                <div>

                    <label
                        htmlFor="description"
                        className="mb-2 block text-sm font-medium text-text"
                    >
                        Description
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="What's this transfer for?"
                        className="
                            w-full
                            resize-none
                            rounded-xl
                            border
                            border-border
                            bg-surface-1
                            px-4
                            py-3
                            text-sm
                            text-text
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/20
                        "
                    />

                </div>


                {/* Transaction PIN */}
                <div>

                    <label
                        htmlFor="transactionPin"
                        className="mb-2 block text-sm font-medium text-text"
                    >
                        Transaction PIN
                    </label>

                    <input
                        id="transactionPin"
                        name="transactionPin"
                        type="password"
                        inputMode="numeric"
                        maxLength="4"
                        value={formData.transactionPin}
                        onChange={handleChange}
                        placeholder="Enter transaction PIN"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-border
                            bg-surface-1
                            px-4
                            py-3
                            text-sm
                            tracking-[0.3em]
                            text-text
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/20
                        "
                    />

                </div>


                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading || !recipient}
                    className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-blue-600
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-blue-700
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >
                    {loading
                        ? 'Processing...'
                        : 'Send Money'}
                </button>

            </form>

        </div>
    );
}