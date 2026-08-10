import { useState } from 'react';
import { FaGlobe } from 'react-icons/fa';
import toast from 'react-hot-toast';

export function WireTransferForm() {
    const [formData, setFormData] = useState({
        beneficiaryAccountName: '',
        beneficiaryAccountNumber: '',
        bankName: '',
        bankAddress: '',
        accountType: '',
        country: '',
        iban: '',
        swiftCode: '',
        transactionPin: '',
        note: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = event => {
        const { name, value } = event.target;

        setFormData(previous => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if (!formData.beneficiaryAccountName) {
            toast.error('Please enter the beneficiary account name.');
            return;
        }

        if (!formData.beneficiaryAccountNumber) {
            toast.error('Please enter the beneficiary account number.');
            return;
        }

        if (!formData.bankName) {
            toast.error('Please enter the bank name.');
            return;
        }

        if (!formData.country) {
            toast.error('Please select the country.');
            return;
        }

        if (!formData.iban) {
            toast.error('Please enter the IBAN number.');
            return;
        }

        if (!formData.swiftCode) {
            toast.error('Please enter the SWIFT code.');
            return;
        }

        if (!formData.transactionPin) {
            toast.error('Please enter your transaction PIN.');
            return;
        }

        setLoading(true);

        try {
            console.log(formData);

            // Add your international transfer API call here

            toast.success(
                'International transfer submitted successfully.'
            );

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                'Unable to complete international transfer.'
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
                    <FaGlobe size={20} />
                </div>

                <h2 className="text-xl font-semibold text-text">
                    International Transfer
                </h2>

                <p className="mt-1 text-sm text-text-muted">
                    Send money securely to an international bank account.
                </p>

            </div>


            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* Beneficiary Account Name */}
                <div>

                    <label
                        htmlFor="beneficiaryAccountName"
                        className="mb-2 block text-sm font-medium text-text"
                    >
                        Beneficiary Account Name
                    </label>

                    <input
                        id="beneficiaryAccountName"
                        name="beneficiaryAccountName"
                        type="text"
                        value={formData.beneficiaryAccountName}
                        onChange={handleChange}
                        placeholder="Enter account holder name"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-border
                            bg-surface-1
                            px-4
                            py-3
                            text-base
                            text-text
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/20
                        "
                    />

                </div>


                {/* Beneficiary Account Number */}
                <div>

                    <label
                        htmlFor="beneficiaryAccountNumber"
                        className="mb-2 block text-sm font-medium text-text"
                    >
                        Beneficiary Account Number
                    </label>

                    <input
                        id="beneficiaryAccountNumber"
                        name="beneficiaryAccountNumber"
                        type="text"
                        inputMode="numeric"
                        value={formData.beneficiaryAccountNumber}
                        onChange={handleChange}
                        placeholder="Enter account number"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-border
                            bg-surface-1
                            px-4
                            py-3
                            text-base
                            text-text
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/20
                        "
                    />

                </div>


                {/* Bank Name */}
                <div>

                    <label
                        htmlFor="bankName"
                        className="mb-2 block text-sm font-medium text-text"
                    >
                        Bank Name
                    </label>

                    <input
                        id="bankName"
                        name="bankName"
                        type="text"
                        value={formData.bankName}
                        onChange={handleChange}
                        placeholder="Enter bank name"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-border
                            bg-surface-1
                            px-4
                            py-3
                            text-base
                            text-text
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/20
                        "
                    />

                </div>


                {/* Bank Address */}
                <div>

                    <label
                        htmlFor="bankAddress"
                        className="mb-2 block text-sm font-medium text-text"
                    >
                        Bank Address
                    </label>

                    <textarea
                        id="bankAddress"
                        name="bankAddress"
                        rows="2"
                        value={formData.bankAddress}
                        onChange={handleChange}
                        placeholder="Enter bank address"
                        className="
                            w-full
                            resize-none
                            rounded-xl
                            border
                            border-border
                            bg-surface-1
                            px-4
                            py-3
                            text-base
                            text-text
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/20
                        "
                    />

                </div>


                {/* Account Type */}
                <div>

                    <label
                        htmlFor="accountType"
                        className="mb-2 block text-sm font-medium text-text"
                    >
                        Account Type
                    </label>

                    <select
                        id="accountType"
                        name="accountType"
                        value={formData.accountType}
                        onChange={handleChange}
                        className="
                            w-full
                            rounded-xl
                            border
                            border-border
                            bg-surface-1
                            px-4
                            py-3
                            text-base
                            text-text
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/20
                        "
                    >
                        <option value="">
                            Select account type
                        </option>

                        <option value="online-banking">
                            Online Banking
                        </option>

                        <option value="joint">
                            Joint Account
                        </option>

                        <option value="checking">
                            Checking
                        </option>

                        <option value="savings">
                            Savings Account
                        </option>

                    </select>

                </div>


                {/* Country */}
                <div>

                    <label
                        htmlFor="country"
                        className="mb-2 block text-sm font-medium text-text"
                    >
                        Country
                    </label>

                    <input
                        id="country"
                        name="country"
                        type="text"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Enter country"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-border
                            bg-surface-1
                            px-4
                            py-3
                            text-base
                            text-text
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/20
                        "
                    />

                </div>


                {/* IBAN */}
                <div>

                    <label
                        htmlFor="iban"
                        className="mb-2 block text-sm font-medium text-text"
                    >
                        IBAN Number
                    </label>

                    <input
                        id="iban"
                        name="iban"
                        type="text"
                        value={formData.iban}
                        onChange={handleChange}
                        placeholder="Enter IBAN number"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-border
                            bg-surface-1
                            px-4
                            py-3
                            text-base
                            uppercase
                            text-text
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/20
                        "
                    />

                    <p className="mt-1.5 text-xs text-text-muted">
                        International Bank Account Number
                    </p>

                </div>


                {/* SWIFT */}
                <div>

                    <label
                        htmlFor="swiftCode"
                        className="mb-2 block text-sm font-medium text-text"
                    >
                        SWIFT Code
                    </label>

                    <input
                        id="swiftCode"
                        name="swiftCode"
                        type="text"
                        value={formData.swiftCode}
                        onChange={handleChange}
                        placeholder="Enter SWIFT code"
                        maxLength="11"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-border
                            bg-surface-1
                            px-4
                            py-3
                            text-base
                            uppercase
                            text-text
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/20
                        "
                    />

                    <p className="mt-1.5 text-xs text-text-muted">
                        8-11 character bank identifier code
                    </p>

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
                            text-base
                            tracking-[0.3em]
                            text-text
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/20
                        "
                    />

                    <p className="mt-1.5 text-xs text-text-muted">
                        This is your transaction PIN, not your login password.
                    </p>

                </div>


                {/* Note */}
                <div>

                    <label
                        htmlFor="note"
                        className="mb-2 block text-sm font-medium text-text"
                    >
                        Note <span className="text-text-muted">(Optional)</span>
                    </label>

                    <textarea
                        id="note"
                        name="note"
                        rows="3"
                        value={formData.note}
                        onChange={handleChange}
                        placeholder="Add a note for this transfer"
                        className="
                            w-full
                            resize-none
                            rounded-xl
                            border
                            border-border
                            bg-surface-1
                            px-4
                            py-3
                            text-base
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
                    disabled={loading}
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
                        : 'Send International Transfer'}
                </button>

            </form>

        </div>
    );
}