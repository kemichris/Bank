import { useState } from 'react';
import {
    FaWallet,
    FaQrcode,
    FaCopy,
    FaUpload,
    FaCheckCircle
} from 'react-icons/fa';
import toast from 'react-hot-toast';

export function DepositPaymentForm({
    paymentMethod,
    amount
}) {
    const [receipt, setReceipt] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!paymentMethod) {
        return null;
    }

    const handleCopy = async () => {
        const value =
            paymentMethod.walletAddress ||
            paymentMethod.accountNumber;

        if (!value) return;

        try {
            await navigator.clipboard.writeText(value);
            toast.success('Copied to clipboard.');
        } catch (error) {
            console.error(error);
            toast.error('Unable to copy.');
        }
    };

    const handleFileChange = event => {
        const file = event.target.files?.[0];

        if (!file) return;

        setReceipt(file);
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if (!receipt) {
            toast.error('Please upload your payment receipt.');
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();

            formData.append(
                'paymentMethod',
                paymentMethod._id
            );

            formData.append(
                'amount',
                amount
            );

            formData.append(
                'receipt',
                receipt
            );

            console.log({
                paymentMethod: paymentMethod._id,
                amount,
                receipt
            });

            // Your deposit API call will go here

            toast.success(
                'Payment proof submitted successfully.'
            );

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                'Unable to submit payment proof.'
            );
        } finally {
            setLoading(false);
        }
    };

    const paymentAddress =
        paymentMethod.walletAddress ||
        paymentMethod.accountNumber;

    return (
        <div className="mx-auto w-full max-w-6xl">

            {/* Header */}
            <div
                className="
                    relative
                    mb-6
                    overflow-hidden
                    rounded-2xl
                    border
                    border-border
                    bg-linear-to-br
                    from-sky-500
                    via-blue-600
                    to-slate-900
                    px-5
                    py-6
                    text-white
                    sm:px-7
                    sm:py-7
                "
            >

                {/* Decorative circles */}
                <div className="absolute -left-12 -top-12 h-32 w-32 rounded-full bg-white/10" />

                <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-white/10" />

                <div className="relative z-10 flex items-center justify-between gap-4">

                    <div>

                        <div className="flex items-center gap-3">

                            <FaWallet
                                className="shrink-0"
                                size={22}
                            />

                            <h1 className="text-xl font-bold sm:text-2xl">
                                Payment Method: {paymentMethod.name}
                            </h1>

                        </div>

                        <p className="mt-2 text-sm text-blue-100">
                            Secure payment processing for your deposit
                        </p>

                    </div>


                    {/* Amount */}
                    <div
                        className="
                            shrink-0
                            rounded-xl
                            bg-white/15
                            px-4
                            py-3
                            text-right
                            backdrop-blur-sm
                        "
                    >

                        <p className="text-xs text-blue-100">
                            Amount
                        </p>

                        <p className="mt-0.5 text-sm font-bold sm:text-base">
                            ${Number(amount).toLocaleString(
                                undefined,
                                {
                                    minimumFractionDigits: 2
                                }
                            )}
                        </p>

                    </div>

                </div>

            </div>


            {/* Payment Instructions */}
            <div
                className="
                    mb-6
                    rounded-2xl
                    border
                    border-blue-500/40
                    bg-blue-500/10
                    px-5
                    py-5
                "
            >

                <div className="flex gap-4">

                    <div
                        className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-500/20
                            text-blue-400
                        "
                    >
                        <span className="text-sm font-bold">
                            i
                        </span>
                    </div>

                    <div>

                        <h2 className="font-semibold text-text">
                            Payment Instructions
                        </h2>

                        <p className="mt-1 text-sm leading-6 text-text-muted">
                            {paymentMethod.instructions ||
                                `You are to make payment of $${Number(amount).toLocaleString()} using your selected payment method. Screenshot and upload the proof of payment.`}
                        </p>

                    </div>

                </div>

            </div>


            <div className="grid gap-6 lg:grid-cols-2">

                {/* Payment Details */}
                <div
                    className="
                        rounded-2xl
                        border
                        border-border
                        bg-surface-2
                        p-5
                        sm:p-7
                    "
                >

                    {/* QR Code */}
                    {paymentMethod.qrCode && (
                        <div className="text-center">

                            <div
                                className="
                                    mx-auto
                                    mb-5
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-sky-500
                                    text-white
                                    shadow-lg
                                    shadow-sky-500/20
                                "
                            >
                                <FaQrcode size={20} />
                            </div>

                            <h2 className="text-lg font-semibold text-text">
                                Scan QR Code
                            </h2>

                            <div
                                className="
                                    mx-auto
                                    mt-5
                                    flex
                                    w-fit
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-border
                                    bg-surface-1
                                    p-5
                                "
                            >
                                <img
                                    src={paymentMethod.qrCode}
                                    alt={`${paymentMethod.name} QR code`}
                                    className="
                                        h-52
                                        w-52
                                        object-contain
                                        sm:h-60
                                        sm:w-60
                                    "
                                />
                            </div>

                            <p className="mt-4 text-sm text-text-muted">
                                Scan with your payment app
                            </p>

                        </div>
                    )}


                    {/* Wallet / Bank information */}
                    {paymentAddress && (
                        <div className="mt-7">

                            <div className="mb-3 flex items-center gap-2">

                                <FaWallet
                                    className="text-sky-400"
                                    size={16}
                                />

                                <h3 className="font-semibold text-text">
                                    {paymentMethod.type === 'crypto'
                                        ? `${paymentMethod.name} Address`
                                        : 'Account Number'}
                                </h3>

                            </div>


                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    border-border
                                    bg-surface-1
                                    p-4
                                "
                            >

                                <p
                                    className="
                                        min-w-0
                                        flex-1
                                        break-all
                                        text-sm
                                        font-medium
                                        text-text
                                    "
                                >
                                    {paymentAddress}
                                </p>

                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    className="
                                        shrink-0
                                        rounded-lg
                                        bg-surface-2
                                        p-3
                                        text-text-muted
                                        transition
                                        hover:bg-sky-500/10
                                        hover:text-sky-400
                                    "
                                    aria-label="Copy payment address"
                                >
                                    <FaCopy size={15} />
                                </button>

                            </div>

                        </div>
                    )}


                    {/* Network */}
                    {paymentMethod.network && (
                        <div className="mt-4 flex items-center gap-2">

                            <span className="text-sm text-text-muted">
                                Network Type:
                            </span>

                            <span className="text-sm font-semibold text-text">
                                {paymentMethod.network}
                            </span>

                        </div>
                    )}


                    {/* Bank details */}
                    {paymentMethod.type === 'bank' && (
                        <div className="mt-6 space-y-3">

                            {paymentMethod.accountName && (
                                <PaymentDetail
                                    label="Account Name"
                                    value={paymentMethod.accountName}
                                />
                            )}

                            {paymentMethod.bankName && (
                                <PaymentDetail
                                    label="Bank Name"
                                    value={paymentMethod.bankName}
                                />
                            )}

                            {paymentMethod.swiftCode && (
                                <PaymentDetail
                                    label="SWIFT Code"
                                    value={paymentMethod.swiftCode}
                                />
                            )}

                        </div>
                    )}

                </div>


                {/* Upload Receipt */}
                <div
                    className="
                        rounded-2xl
                        border
                        border-border
                        bg-surface-2
                        p-5
                        sm:p-7
                    "
                >

                    <h2 className="text-lg font-semibold text-text">
                        Upload Payment Proof
                    </h2>

                    <p className="mt-1 text-sm text-text-muted">
                        Upload a screenshot or receipt showing that your payment was completed.
                    </p>


                    <label
                        htmlFor="receipt"
                        className={`
                            mt-6
                            flex
                            min-h-52
                            cursor-pointer
                            flex-col
                            items-center
                            justify-center
                            rounded-2xl
                            border-2
                            border-dashed
                            px-5
                            py-8
                            text-center
                            transition
                            ${
                                receipt
                                    ? 'border-green-500/50 bg-green-500/5'
                                    : 'border-border hover:border-sky-400/60 hover:bg-sky-500/5'
                            }
                        `}
                    >

                        {receipt ? (
                            <>
                                <div
                                    className="
                                        flex
                                        h-14
                                        w-14
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-green-500/10
                                        text-green-500
                                    "
                                >
                                    <FaCheckCircle size={25} />
                                </div>

                                <p className="mt-4 max-w-full truncate text-sm font-semibold text-text">
                                    {receipt.name}
                                </p>

                                <p className="mt-1 text-xs text-text-muted">
                                    Click to replace file
                                </p>
                            </>
                        ) : (
                            <>
                                <div
                                    className="
                                        flex
                                        h-14
                                        w-14
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-sky-500/10
                                        text-sky-400
                                    "
                                >
                                    <FaUpload size={22} />
                                </div>

                                <p className="mt-4 text-sm font-semibold text-text">
                                    Upload payment proof
                                </p>

                                <p className="mt-1 text-xs text-text-muted">
                                    PNG, JPG or PDF
                                </p>

                                <p className="mt-3 rounded-lg bg-surface-1 px-4 py-2 text-xs font-medium text-text-muted">
                                    Choose File
                                </p>
                            </>
                        )}

                        <input
                            id="receipt"
                            type="file"
                            accept="image/png,image/jpeg,image/jpg,application/pdf"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                    </label>


                    {/* Submit */}
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading || !receipt}
                        className="
                            mt-5
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-3
                            rounded-xl
                            bg-linear-to-r
                            from-sky-500
                            to-blue-600
                            px-5
                            py-4
                            text-sm
                            font-semibold
                            text-white
                            shadow-lg
                            shadow-blue-500/20
                            transition
                            hover:from-sky-600
                            hover:to-blue-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        <FaUpload />

                        {loading
                            ? 'Submitting...'
                            : 'Submit Payment Proof'}
                    </button>

                </div>

            </div>

        </div>
    );
}


function PaymentDetail({
    label,
    value
}) {
    return (
        <div
            className="
                flex
                items-center
                justify-between
                gap-4
                border-b
                border-border
                pb-3
                last:border-0
            "
        >

            <span className="text-sm text-text-muted">
                {label}
            </span>

            <span className="text-right text-sm font-medium text-text">
                {value}
            </span>

        </div>
    );
}