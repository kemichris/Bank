import { useState } from 'react';
import toast from 'react-hot-toast';
import { changePassword } from '../../services/settings.service';

import {
    HiOutlineKey,
    HiOutlineLockClosed,
    HiOutlineShieldCheck,
    HiOutlineExclamationTriangle,
    HiOutlineCheckCircle,
} from 'react-icons/hi2';

export function PasswordSetting() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
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

        const {
            currentPassword,
            newPassword,
            confirmPassword
        } = formData;

        // Current password
        if (!currentPassword) {
            toast.error('Please enter your current password.');
            return;
        }

        // New password
        if (!newPassword) {
            toast.error('Please enter your new password.');
            return;
        }

        // Password length
        if (newPassword.length < 8) {
            toast.error(
                'Password must be at least 8 characters long.'
            );
            return;
        }

        // Lowercase
        if (!/[a-z]/.test(newPassword)) {
            toast.error(
                'Password must contain at least one lowercase character.'
            );
            return;
        }

        // Uppercase
        if (!/[A-Z]/.test(newPassword)) {
            toast.error(
                'Password must contain at least one uppercase character.'
            );
            return;
        }

        // Number
        if (!/[0-9]/.test(newPassword)) {
            toast.error(
                'Password must contain at least one number.'
            );
            return;
        }

        // Special character
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
            toast.error(
                'Password must contain at least one special character.'
            );
            return;
        }

        // Confirm password
        if (!confirmPassword) {
            toast.error(
                'Please confirm your new password.'
            );
            return;
        }

        // Compare passwords
        if (newPassword !== confirmPassword) {
            toast.error(
                'New password and confirmation password do not match.'
            );
            return;
        }

        // Optional but recommended
        if (currentPassword === newPassword) {
            toast.error(
                'Your new password must be different from your current password.'
            );
            return;
        }

        setLoading(true);

        try {
            const res = await changePassword({
                currentPassword,
                newPassword,
                confirmPassword
            });

            toast.success(
                res.message ||
                'Password changed successfully.'
            );

            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                'Password change failed.'
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
                        Change Password
                    </h3>

                    <p className="text-sm text-text-muted">
                        Update your account password to maintain security
                    </p>
                </div>

            </div>


            {/* Form Card */}
            <form
                onSubmit={handleSubmit}
                className="
                    rounded-2xl
                    border
                    border-border
                    bg-surface-2
                    p-5
                    sm:p-6
                "
            >

                {/* Current Password */}
                <PasswordField
                    label="Current Password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="Enter your current password"
                    icon={HiOutlineLockClosed}
                />


                {/* New Password */}
                <div className="mt-5">

                    <PasswordField
                        label="New Password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter your new password"
                        icon={HiOutlineKey}
                    />

                </div>


                {/* Confirm Password */}
                <div className="mt-5">

                    <PasswordField
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your new password"
                        icon={HiOutlineCheckCircle}
                    />

                </div>


                {/* Password Requirements */}
                <div
                    className="
                        mt-6
                        rounded-2xl
                        border
                        border-primary/40
                        bg-primary/10
                        px-5
                        py-4
                    "
                >

                    <div className="flex items-start gap-3">

                        <HiOutlineShieldCheck
                            className="mt-0.5 shrink-0 text-primary"
                            size={21}
                        />

                        <div>

                            <p className="text-sm font-semibold text-text">
                                Password Requirements
                            </p>

                            <p className="mt-1 text-sm text-primary">
                                Ensure that these requirements are met:
                            </p>

                        </div>

                    </div>


                    <ul className="mt-3 space-y-2 pl-8">

                        <li className="flex items-start gap-2 text-sm text-text">
                            <span className="mt-1 text-primary">
                                •
                            </span>

                            <span>
                                Minimum 8 characters long - the more, the better
                            </span>
                        </li>

                        <li className="flex items-start gap-2 text-sm text-text">
                            <span className="mt-1 text-primary">
                                •
                            </span>

                            <span>
                                At least one lowercase character
                            </span>
                        </li>

                        <li className="flex items-start gap-2 text-sm text-text">
                            <span className="mt-1 text-primary">
                                •
                            </span>

                            <span>
                                At least one uppercase character
                            </span>
                        </li>

                        <li className="flex items-start gap-2 text-sm text-text">
                            <span className="mt-1 text-primary">
                                •
                            </span>

                            <span>
                                At least one number
                            </span>
                        </li>

                    </ul>

                </div>


                {/* Security Reminder */}
                <div
                    className="
                        mt-5
                        flex
                        items-start
                        gap-3
                        rounded-2xl
                        border
                        border-yellow-500/30
                        bg-yellow-500/10
                        px-5
                        py-4
                    "
                >

                    <HiOutlineExclamationTriangle
                        className="mt-0.5 shrink-0 text-yellow-400"
                        size={21}
                    />

                    <div>

                        <p className="text-sm font-semibold text-yellow-300">
                            Security Reminder
                        </p>

                        <p className="mt-1 text-sm text-yellow-200">
                            After changing your password, you'll be required
                            to log in again with your new credentials.
                        </p>

                    </div>

                </div>


                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="
                        mt-6
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
                    "
                >

                    <HiOutlineLockClosed size={17} />

                    {loading
                        ? 'Changing Password...'
                        : 'Change Password'}

                </button>

            </form>

        </div>
    );
}


function PasswordField({
    label,
    name,
    value,
    onChange,
    placeholder,
    icon: Icon,
}) {
    return (
        <div>

            <label
                htmlFor={name}
                className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-text
                "
            >
                {label}
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
                    id={name}
                    name={name}
                    type="password"
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
                        text-text
                        outline-none
                        transition
                        placeholder:text-text-muted
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/20
                    "
                />

            </div>

        </div>
    );
}