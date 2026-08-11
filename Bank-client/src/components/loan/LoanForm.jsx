import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
    FaArrowLeft,
    FaMoneyBillWave,
    FaCalendarAlt,
    FaBriefcase,
    FaCommentAlt,
    FaWallet,
    FaPaperPlane,
    FaTimes
} from 'react-icons/fa';

import { loanApplication } from '../../services/loan.service';

export function LoanForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        requestedAmount: '',
        term: '',
        creditFacility: '',
        purpose: '',
        monthlyNetIncome: ''
    });

    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    const durations = [
        {
            value: 6,
            label: '6 Months'
        },
        {
            value: 12,
            label: '12 Months'
        },
        {
            value: 24,
            label: '2 Years'
        },
        {
            value: 36,
            label: '3 Years'
        },
        {
            value: 48,
            label: '4 Years'
        },
        {
            value: 60,
            label: '5 Years'
        }
    ];

    const creditFacilities = [
        'Personal Home Loans',
        'Joint Mortgage',
        'Automobile Loans',
        'Salary Loans',
        'Secured Overdraft',
        'Contract Finance',
        'Secured Term Loans',
        'StartUp/Products Financing',
        'Local Purchase Orders Finance',
        'Operational Vehicles',
        'Revenue Loans and Overdraft',
        'Retail TOD',
        'Commercial Mortgage',
        'Office Equipment',
        'Health Finance Product Guideline',
        'Health Finance'
    ];

    const handleChange = event => {
        const { name, value } = event.target;

        setFormData(previous => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if (!formData.requestedAmount) {
            toast.error('Please enter the loan amount.');
            return;
        }

        if (Number(formData.requestedAmount) <= 0) {
            toast.error('Please enter a valid loan amount.');
            return;
        }

        if (!formData.term) {
            toast.error('Please select the loan duration.');
            return;
        }

        if (!formData.creditFacility) {
            toast.error('Please select a credit facility.');
            return;
        }

        if (!formData.purpose.trim()) {
            toast.error('Please describe the purpose of the loan.');
            return;
        }

        if (!formData.monthlyNetIncome) {
            toast.error('Please enter your monthly net income.');
            return;
        }

        if (Number(formData.monthlyNetIncome) < 0) {
            toast.error('Please enter a valid monthly income.');
            return;
        }

        if (!agreeToTerms) {
            toast.error(
                'Please agree to the terms and conditions.'
            );
            return;
        }

        setLoading(true);

        try {
            const payload = {
                requestedAmount: Number(formData.requestedAmount),
                term: Number(formData.term),
                creditFacility: formData.creditFacility,
                purpose: formData.purpose.trim(),
                monthlyNetIncome: Number(
                    formData.monthlyNetIncome
                )
            };

            const response = await loanApplication(payload);

            toast.success(
                response.message ||
                'Loan application submitted successfully.'
            );

            navigate('/dashboard/loan');

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                'Unable to submit loan application.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">

            {/* Top navigation */}
            <div className="mb-6 flex items-center justify-between">

                <Link
                    to="/dashboard/loan"
                    className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-medium
                        text-text-muted
                        transition
                        hover:text-text
                    "
                >
                    <FaArrowLeft size={13} />

                    Back to Information
                </Link>

                <p className="text-xs text-text-muted">
                    <span className="text-red-400">*</span>{' '}
                    Required fields
                </p>

            </div>


            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                {/* ----------------------------------------- */}
                {/* Loan Details */}
                {/* ----------------------------------------- */}

                <section>

                    <div className="mb-4 flex items-center gap-3">

                        <div className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-primary/15
                            text-primary
                        ">
                            <FaMoneyBillWave size={16} />
                        </div>

                        <h2 className="text-lg font-semibold text-text">
                            Loan Details
                        </h2>

                    </div>


                    <div className="
                        rounded-2xl
                        border
                        border-border
                        bg-surface-2
                        p-5
                        sm:p-6
                    ">

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                            {/* Loan Amount */}
                            <div>

                                <label
                                    htmlFor="loanAmount"
                                    className="mb-2 block text-sm font-semibold text-text"
                                >
                                    Loan Amount ($)
                                    <span className="ml-1 text-red-400">
                                        *
                                    </span>
                                </label>

                                <div className="relative">

                                    <span className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-sm
                                        font-medium
                                        text-text-muted
                                    ">
                                        €
                                    </span>

                                    <input
                                        id="requestedAmount"
                                        name="requestedAmount"
                                        type="number"
                                        min="1"
                                        step="0.01"
                                        value={formData.requestedAmount}
                                        onChange={handleChange}
                                        placeholder="Enter loan amount"
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-border
                                            bg-surface-1
                                            py-3
                                            pl-10
                                            pr-4
                                            text-sm
                                            text-text
                                            outline-none
                                            transition
                                            focus:border-primary
                                            focus:ring-2
                                            focus:ring-primary/20
                                        "
                                    />

                                </div>

                            </div>


                            {/* Duration */}
                            <div>

                                <label
                                    htmlFor="duration"
                                    className="mb-2 block text-sm font-semibold text-text"
                                >
                                    Duration (Months)
                                    <span className="ml-1 text-red-400">
                                        *
                                    </span>
                                </label>

                                <div className="relative">

                                    <FaCalendarAlt
                                        className="
                                            pointer-events-none
                                            absolute
                                            left-4
                                            top-1/2
                                            z-10
                                            -translate-y-1/2
                                            text-text-muted
                                        "
                                        size={14}
                                    />

                                    <select
                                        id="term"
                                        name="term"
                                        value={formData.term}
                                        onChange={handleChange}
                                        className="
                                            w-full
                                            appearance-none
                                            rounded-xl
                                            border
                                            border-border
                                            bg-surface-1
                                            px-10
                                            py-3
                                            text-sm
                                            text-text
                                            outline-none
                                            transition
                                            focus:border-primary
                                            focus:ring-2
                                            focus:ring-primary/20
                                        "
                                    >

                                        <option value="">
                                            Select duration
                                        </option>

                                        {durations.map(duration => (
                                            <option
                                                key={duration.value}
                                                value={duration.value}
                                            >
                                                {duration.label}
                                            </option>
                                        ))}

                                    </select>

                                </div>

                            </div>


                            {/* Credit Facility */}
                            <div className="lg:col-span-2">

                                <label
                                    htmlFor="creditFacility"
                                    className="mb-2 block text-sm font-semibold text-text"
                                >
                                    Credit Facility
                                    <span className="ml-1 text-red-400">
                                        *
                                    </span>
                                </label>

                                <div className="relative">

                                    <FaBriefcase
                                        className="
                                            pointer-events-none
                                            absolute
                                            left-4
                                            top-1/2
                                            z-10
                                            -translate-y-1/2
                                            text-text-muted
                                        "
                                        size={14}
                                    />

                                    <select
                                        id="creditFacility"
                                        name="creditFacility"
                                        value={formData.creditFacility}
                                        onChange={handleChange}
                                        className="
                                            w-full
                                            appearance-none
                                            rounded-xl
                                            border
                                            border-border
                                            bg-surface-1
                                            px-10
                                            py-3
                                            text-sm
                                            text-text
                                            outline-none
                                            transition
                                            focus:border-primary
                                            focus:ring-2
                                            focus:ring-primary/20
                                        "
                                    >

                                        <option value="">
                                            Select Loan/Credit Facility
                                        </option>

                                        {creditFacilities.map(facility => (
                                            <option
                                                key={facility}
                                                value={facility}
                                            >
                                                {facility}
                                            </option>
                                        ))}

                                    </select>

                                </div>

                            </div>


                            {/* Purpose */}
                            <div className="lg:col-span-2">

                                <label
                                    htmlFor="purpose"
                                    className="mb-2 block text-sm font-semibold text-text"
                                >
                                    Purpose of Loan
                                    <span className="ml-1 text-red-400">
                                        *
                                    </span>
                                </label>

                                <div className="relative">

                                    <FaCommentAlt
                                        className="
                                            pointer-events-none
                                            absolute
                                            left-4
                                            top-4
                                            text-text-muted
                                        "
                                        size={14}
                                    />

                                    <textarea
                                        id="purpose"
                                        name="purpose"
                                        rows={4}
                                        value={formData.purpose}
                                        onChange={handleChange}
                                        placeholder="Please describe the purpose of this loan..."
                                        className="
                                            w-full
                                            resize-none
                                            rounded-xl
                                            border
                                            border-border
                                            bg-surface-1
                                            px-10
                                            py-3
                                            text-sm
                                            text-text
                                            outline-none
                                            transition
                                            focus:border-primary
                                            focus:ring-2
                                            focus:ring-primary/20
                                        "
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ----------------------------------------- */}
                {/* Financial Information */}
                {/* ----------------------------------------- */}

                <section>

                    <div className="mb-4 flex items-center gap-3">

                        <div className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-primary/15
                            text-primary
                        ">
                            <FaWallet size={16} />
                        </div>

                        <h2 className="text-lg font-semibold text-text">
                            Financial Information
                        </h2>

                    </div>


                    <div className="
                        rounded-2xl
                        border
                        border-border
                        bg-surface-2
                        p-5
                        sm:p-6
                    ">

                        <label
                            htmlFor="monthlyNetIncome"
                            className="mb-2 block text-sm font-semibold text-text"
                        >
                            Monthly Net Income
                            <span className="ml-1 text-red-400">
                                *
                            </span>
                        </label>

                        <div className="relative">

                            <span className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-sm
                                font-medium
                                text-text-muted
                            ">
                                €
                            </span>

                            <input
                                id="monthlyNetIncome"
                                name="monthlyNetIncome"
                                type="number"
                                min="0"
                                step="0.01"
                                value={formData.monthlyNetIncome}
                                onChange={handleChange}
                                placeholder="Enter your monthly net income"
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-border
                                    bg-surface-1
                                    py-3
                                    pl-10
                                    pr-4
                                    text-sm
                                    text-text
                                    outline-none
                                    transition
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                "
                            />

                        </div>

                    </div>

                </section>


                {/* ----------------------------------------- */}
                {/* Terms */}
                {/* ----------------------------------------- */}

                <section className="
                    rounded-2xl
                    border
                    border-border
                    bg-surface-2
                    p-5
                ">

                    <label className="flex cursor-pointer items-start gap-3">

                        <input
                            type="checkbox"
                            checked={agreeToTerms}
                            onChange={event =>
                                setAgreeToTerms(event.target.checked)
                            }
                            className="
                                mt-1
                                h-4
                                w-4
                                shrink-0
                                accent-primary
                            "
                        />

                        <div>

                            <p className="text-sm font-semibold text-text">
                                I agree to the terms and conditions
                            </p>

                            <p className="mt-1 text-xs leading-5 text-text-muted">
                                By submitting this application, I confirm
                                that all information provided is accurate
                                and complete. I authorize Global Merchant
                                Bank to verify my information and credit
                                history.
                            </p>

                        </div>

                    </label>

                </section>


                {/* ----------------------------------------- */}
                {/* Actions */}
                {/* ----------------------------------------- */}

                <div className="
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-2
                ">

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-primary
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:opacity-90
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >
                        <FaPaperPlane size={13} />

                        {loading
                            ? 'Submitting...'
                            : 'Submit Loan Application'}
                    </button>


                    <Link
                        to="/dashboard/loan"
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-surface-2
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            text-text
                            transition
                            hover:bg-surface-3
                        "
                    >
                        <FaTimes size={13} />

                        Cancel
                    </Link>

                </div>

            </form>

        </div>
    );
}