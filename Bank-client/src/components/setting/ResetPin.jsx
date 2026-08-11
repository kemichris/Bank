import { useState } from 'react';
import toast from 'react-hot-toast';

import { changePin } from '../../services/settings.service';

import {
    HiOutlineLockClosed,
    HiOutlineKey,
    HiOutlineArrowPath
} from 'react-icons/hi2';

export function ResetPin() {
    const [formData, setFormData] = useState({
        currentPin: '',
        newPin: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = event => {
        const { name, value } = event.target;

        // Only allow numbers
        if (!/^\d*$/.test(value)) {
            return;
        }

        setFormData(previous => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const {
            currentPin,
            newPin
        } = formData;

        // Current PIN validation
        if (!currentPin) {
            toast.error('Please enter your current PIN.');
            return;
        }

        if (currentPin.length !== 4) {
            toast.error('Your current PIN must be 4 digits.');
            return;
        }

        // New PIN validation
        if (!newPin) {
            toast.error('Please enter a new PIN.');
            return;
        }

        if (newPin.length !== 4) {
            toast.error('Your new PIN must be 4 digits.');
            return;
        }

        if (newPin === currentPin) {
            toast.error(
                'Your new PIN must be different from your current PIN.'
            );
            return;
        }

        setLoading(true);

        try {

            await changePin(formData)

            toast.success('PIN changed successfully.');

            setFormData({
                currentPin: '',
                newPin: ''
            });

        } catch (error) {
            console.error(error);

            toast.error(
                'Unable to change your PIN.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">

            {/* Header */}
            <div className="mb-5 flex items-center gap-3">

                <div
                    className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-primary/15
                        text-primary
                    "
                >
                    <HiOutlineKey size={19} />
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-text">
                        Transaction PIN
                    </h3>

                    <p className="text-sm text-text-muted">
                        Change your transaction PIN
                    </p>
                </div>

            </div>


            {/* Card */}
            <div
                className="
                    rounded-2xl
                    border
                    border-border
                    bg-surface-2
                    p-5
                    sm:p-6
                "
            >

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Current PIN */}
                    <PinField
                        id="currentPin"
                        name="currentPin"
                        label="Current PIN"
                        value={formData.currentPin}
                        onChange={handleChange}
                        icon={HiOutlineLockClosed}
                        placeholder="Enter your current PIN"
                    />


                    {/* New PIN */}
                    <PinField
                        id="newPin"
                        name="newPin"
                        label="New PIN"
                        value={formData.newPin}
                        onChange={handleChange}
                        icon={HiOutlineKey}
                        placeholder="Enter your new PIN"
                    />


                    {/* Notice */}
                    <div
                        className="
                            rounded-xl
                            border
                            border-primary/30
                            bg-primary/10
                            px-4
                            py-3
                        "
                    >
                        <p className="text-xs leading-5 text-text-muted">
                            Your transaction PIN is used to authorize
                            sensitive transactions. Never share your PIN
                            with anyone.
                        </p>
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
                            sm:w-auto
                        "
                    >
                        <HiOutlineArrowPath
                            size={17}
                            className={
                                loading
                                    ? 'animate-spin'
                                    : ''
                            }
                        />

                        {loading
                            ? 'Updating...'
                            : 'Update PIN'}
                    </button>

                </form>

            </div>

        </div>
    );
}


function PinField({
    id,
    name,
    label,
    value,
    onChange,
    icon: Icon,
    placeholder
}) {
    return (
        <div>

            <label
                htmlFor={id}
                className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-text
                "
            >
                {label}

                <span className="ml-1 text-red-400">
                    *
                </span>
            </label>

            <div className="relative">

                <Icon
                    className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-text-muted
                    "
                    size={18}
                />

                <input
                    id={id}
                    name={name}
                    type="password"
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={4}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-border
                        bg-surface-1
                        py-3
                        pl-11
                        pr-4
                        text-sm
                        tracking-[0.35em]
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
    );
}