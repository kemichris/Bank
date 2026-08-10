import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import toast from 'react-hot-toast';


export function DepositForm({paymentMethods =[]}) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        paymentMethod: '',
        amount: ''
    });

    const handleChange = event => {
        const { name, value } = event.target;

        setFormData(previous => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (!formData.paymentMethod) {
            toast.error('Please select a payment method.');
            return;
        }

        if (!formData.amount || Number(formData.amount) <= 0) {
            toast.error('Please enter a valid amount.');
            return;
        }

        const selectedMethod = paymentMethods.find(
            method => method._id === formData.paymentMethod
        );

        if (!selectedMethod) {
            toast.error('Selected payment method was not found.');
            return;
        }

        navigate('/dashboard/deposit/payment', {
            state: {
                paymentMethod: selectedMethod,
                amount: Number(formData.amount)
            }
        });
    };

    return (
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-border bg-surface-2 p-6">

            {/* Header */}
            <div className="mb-6">

                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                    <FaArrowRight size={20} />
                </div>

                <h2 className="text-xl font-semibold text-text">
                    Deposit Money
                </h2>

                <p className="mt-1 text-sm text-text-muted">
                    Select a payment method and enter the amount you want to deposit.
                </p>

            </div>


            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* Payment Method */}
                <div>

                    <label
                        htmlFor="paymentMethod"
                        className="mb-2 block text-sm font-medium text-text"
                    >
                        Payment Method
                    </label>

                    <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={formData.paymentMethod}
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
                            Select payment method
                        </option>

                        {paymentMethods
                            .filter(method => method.status === 'enabled')
                            .map(method => (
                                <option
                                    key={method._id}
                                    value={method._id}
                                >
                                    {method.name}
                                    {method.network
                                        ? ` (${method.network})`
                                        : ''}
                                </option>
                            ))}

                    </select>

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
                            min="1"
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


                {/* Continue */}
                <button
                    type="submit"
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
                    "
                >
                    Continue
                    <FaArrowRight size={14} />
                </button>

            </form>

        </div>
    );
}