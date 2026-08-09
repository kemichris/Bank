import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard } from 'react-icons/fa';
import toast from 'react-hot-toast';


import { cardRequest } from '../../services/card.service';

export function CardRequestForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        brand: '',
        spendingLimit: 100
    });

    const [loading, setLoading] = useState(false);

    const handleChange = event => {
        const { name, value } = event.target;

        setFormData(previous => ({
            ...previous,
            [name]: name === 'spendingLimit'
                ? Number(value)
                : value
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if (!formData.brand) {
            toast.error('Please select a card type.');
            return;
        }

        setLoading(true);

        try {
            const res = await cardRequest(formData)

            console.log(res);

            toast.success(res.message || 'Card request submitted successfully.');
            setTimeout(()=> {
                navigate('/dashboard/card')
            }, 2000)

        } catch (error) {
            console.error(error)
            toast.error(
                error.response?.data?.message ||
                'Unable to submit card request.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-border bg-surface-2 p-6 shadow-sm">

            {/* Header */}
            <div className="mb-6">

                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                    <FaCreditCard size={22} />
                </div>

                <h2 className="text-xl font-semibold text-text text-left">
                    Apply for a Card
                </h2>

                <p className="mt-1 text-sm text-text-muted">
                    Choose your preferred card type and spending limit.
                </p>

            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Card Type */}
                <div>

                    <label
                        htmlFor="brand"
                        className="mb-2 block text-sm font-medium text-text"
                    >
                        Card Type
                    </label>

                    <select
                        id="brand"
                        name="brand"
                        value={formData.brand}
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
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/20
                        "
                    >
                        <option value="">
                            Select card type
                        </option>

                        <option value="Visa">
                            Visa
                        </option>

                        <option value="Mastercard">
                            Mastercard
                        </option>

                        <option value="Amex">
                            American Express
                        </option>

                    </select>

                </div>


                {/* Spending Limit */}
                <div>

                    <label
                        htmlFor="spendingLimit"
                        className="mb-2 block text-sm font-medium text-text"
                    >
                        Spending Limit
                    </label>

                    <div className="relative">

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-text-muted">
                            $
                        </span>

                        <input
                            id="spendingLimit"
                            name="spendingLimit"
                            type="number"
                            min="100"
                            max="1000"
                            step="50"
                            value={formData.spendingLimit}
                            onChange={handleChange}
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

                    <p className="mt-2 text-xs text-text-muted">
                        Choose a limit between $100 and $1,000.
                    </p>

                </div>


                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="
                        w-full
                        rounded-xl
                        bg-linear-to-r 
                        from-surface-1 
                        to-primary-1
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition-transform
                        hover:scale-[.9]
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >
                    {loading
                        ? 'Submitting...'
                        : 'Request Card'}
                </button>

            </form>

        </div>
    );
}