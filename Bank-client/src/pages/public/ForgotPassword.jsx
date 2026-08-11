import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
    FaArrowLeft,
    FaEnvelope,
    FaKey,
    FaLock
} from 'react-icons/fa';

import {
    forgotPassword,
    verifyResetCode,
    resetPassword
} from '../../services/auth.service';


export function ForgotPassword() {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [resetToken, setResetToken] = useState('');

    const [newPassword, setNewPassword] =
        useState('');

    const [confirmPassword, setConfirmPassword] =
        useState('');

    const [loading, setLoading] =
        useState(false);


    const handleSendCode = async event => {
        event.preventDefault();

        if (!email.trim()) {
            toast.error(
                'Please enter your email address.'
            );

            return;
        }

        setLoading(true);

        try {
            await forgotPassword(email);

            /*
                Don't rely on whether the account exists.

                Always move to the code screen.
            */
            toast.success(
                'If an account with that email exists, a reset code has been sent.'
            );

            setStep(2);

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                'Unable to process your request.'
            );

        } finally {
            setLoading(false);
        }
    };


    const handleVerifyCode = async event => {
        event.preventDefault();

        if (!resetCode.trim()) {
            toast.error(
                'Please enter the reset code.'
            );

            return;
        }

        if (resetCode.length !== 6) {
            toast.error(
                'Please enter the 6-digit reset code.'
            );

            return;
        }

        setLoading(true);

        try {
            const response = await verifyResetCode(
                email,
                resetCode
            );

            /*
                The backend creates a temporary
                password-reset token after the
                verification code is successfully
                verified.
            */
            setResetToken(response.resetToken);

            toast.success(
                'Code verified successfully.'
            );

            setStep(3);

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                'Invalid or expired reset code.'
            );

        } finally {
            setLoading(false);
        }
    };


    const handleResetPassword = async event => {
        event.preventDefault();

        if (newPassword.length < 8) {
            toast.error(
                'Password must be at least 8 characters.'
            );

            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error(
                'Passwords do not match.'
            );

            return;
        }

        /*
            Make sure the verification step actually
            produced a reset token.
        */
        if (!resetToken) {
            toast.error(
                'Your reset session is invalid. Please start again.'
            );

            setStep(1);

            return;
        }

        setLoading(true);

        try {
            await resetPassword(
                {
                    password: newPassword,
                    confirmPassword
                },
                resetToken
            );

            toast.success(
                'Password reset successfully.'
            );

            navigate('/login');

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                'Unable to reset password.'
            );

        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex min-h-screen items-center justify-center bg-surface-1 px-4">

            <div className="w-full max-w-md">

                {/* Back */}
                <Link
                    to="/login"
                    className="
                        mb-6
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-text-muted
                        hover:text-text
                    "
                >
                    <FaArrowLeft size={13} />

                    Back to Login
                </Link>


                <div
                    className="
                        rounded-2xl
                        border
                        border-border
                        bg-surface-2
                        p-6
                        shadow-xl
                        sm:p-8
                    "
                >

                    {/* STEP 1 */}
                    {step === 1 && (
                        <>
                            <div className="mb-6">

                                <div
                                    className="
                                        mb-4
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-primary/15
                                        text-primary
                                    "
                                >
                                    <FaEnvelope />
                                </div>

                                <h1 className="text-2xl font-bold text-text">
                                    Forgot Password?
                                </h1>

                                <p className="mt-2 text-sm text-text-muted">
                                    Enter your email address and
                                    we'll send you a password
                                    reset code.
                                </p>

                            </div>


                            <form
                                onSubmit={handleSendCode}
                                className="space-y-5"
                            >

                                <div>

                                    <label
                                        htmlFor="email"
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                            text-text
                                        "
                                    >
                                        Email Address
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={event =>
                                            setEmail(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter your email"
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
                                    />

                                </div>


                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                                        w-full
                                        rounded-xl
                                        bg-primary
                                        px-5
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-white
                                        hover:opacity-90
                                        disabled:opacity-60
                                    "
                                >
                                    {loading
                                        ? 'Sending...'
                                        : 'Send Reset Code'}
                                </button>

                            </form>
                        </>
                    )}


                    {/* STEP 2 */}
                    {step === 2 && (
                        <>
                            <div className="mb-6">

                                <div
                                    className="
                                        mb-4
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-primary/15
                                        text-primary
                                    "
                                >
                                    <FaKey />
                                </div>

                                <h1 className="text-2xl font-bold text-text">
                                    Enter Reset Code
                                </h1>

                                <p className="mt-2 text-sm text-text-muted">
                                    Enter the 6-digit code sent
                                    to your email address.
                                </p>

                            </div>


                            <form
                                onSubmit={handleVerifyCode}
                                className="space-y-5"
                            >

                                <input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={6}
                                    value={resetCode}
                                    onChange={event =>
                                        setResetCode(
                                            event.target.value.replace(
                                                /\D/g,
                                                ''
                                            )
                                        )
                                    }
                                    placeholder="000000"
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-border
                                        bg-surface-1
                                        px-4
                                        py-4
                                        text-center
                                        text-2xl
                                        font-bold
                                        tracking-[0.5em]
                                        text-text
                                        outline-none
                                        focus:border-primary
                                    "
                                />


                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                                        w-full
                                        rounded-xl
                                        bg-primary
                                        px-5
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-white
                                        hover:opacity-90
                                        disabled:opacity-60
                                    "
                                >
                                    {loading
                                        ? 'Verifying...'
                                        : 'Verify Code'}
                                </button>

                            </form>
                        </>
                    )}


                    {/* STEP 3 */}
                    {step === 3 && (
                        <>
                            <div className="mb-6">

                                <div
                                    className="
                                        mb-4
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-primary/15
                                        text-primary
                                    "
                                >
                                    <FaLock />
                                </div>

                                <h1 className="text-2xl font-bold text-text">
                                    Create New Password
                                </h1>

                                <p className="mt-2 text-sm text-text-muted">
                                    Choose a new password for
                                    your account.
                                </p>

                            </div>


                            <form
                                onSubmit={handleResetPassword}
                                className="space-y-5"
                            >

                                <div>

                                    <label
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                            text-text
                                        "
                                    >
                                        New Password
                                    </label>

                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={event =>
                                            setNewPassword(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter new password"
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
                                        "
                                    />

                                </div>


                                <div>

                                    <label
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                            text-text
                                        "
                                    >
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={event =>
                                            setConfirmPassword(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Confirm new password"
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
                                        "
                                    />

                                </div>


                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                                        w-full
                                        rounded-xl
                                        bg-primary
                                        px-5
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-white
                                        hover:opacity-90
                                        disabled:opacity-60
                                    "
                                >
                                    {loading
                                        ? 'Resetting...'
                                        : 'Reset Password'}
                                </button>

                            </form>
                        </>
                    )}

                </div>

            </div>

        </div>
    );
}