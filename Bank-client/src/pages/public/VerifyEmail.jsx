import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { OtpInput } from "../../components/emailverification/OtpInput";
import {
    verifyEmail,
    resendVerificationCode,
    getEmailVerificationStatus
} from "../../services/auth.service";

export function VerifyEmail() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const email = searchParams.get('email');

    useEffect(() => {
        if (!email) {
            toast.error('No email address found');

            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 2000);
            return

        }

        const checkVerificationStatus = async () => {
            try {
                const res = await getEmailVerificationStatus(email);

                if (res.data.emailVerified) {
                    toast.success('Your email is already verified.');

                    setTimeout(() => {
                        navigate('/login', { replace: true });
                    }, 2000);

                }
            } catch (error) {
                console.error(
                    error.response?.data || error
                );
            }
        };

        checkVerificationStatus();
    }, [email, navigate]);

    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);



    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const verificationCode = code.join("");

        try {
            const res = await verifyEmail({
                email,
                verificationCode,
            });

            if (res.success) {
                toast.success(res.message);

                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            console.error(error.response?.data || error);
            toast.error(
                error.response?.data?.message ||
                "Something went wrong. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setLoading(true);
        try {
            const res = await resendVerificationCode(email);

            toast.success(res.message);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Something went wrong. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border border-border bg-surface-1 p-8 shadow-xl">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-text">Verify Your Email</h1>

                    <p className="mt-3 text-sm leading-6 text-text-muted">
                        We've sent a{" "}
                        <strong className="text-text">6-digit verification code</strong> to
                    </p>

                    <p className="mt-1 font-medium text-primary">{email}</p>

                    <p className="mt-2 text-sm text-text-muted">
                        Please enter it below to activate your account.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8">
                    <OtpInput value={code} onChange={setCode} />

                    <button
                        type="submit"
                        className="
                            mt-8
                            w-full
                            rounded-lg
                            bg-primary
                            px-4
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:opacity-90
                            cursor-pointer
                        "
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Verify Email"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-text-muted">
                    Didn't receive the code?{" "}
                    <button
                        type="button"
                        onClick={handleResend}
                        className="
                            font-semibold
                          text-primary
                            hover:underline
                            cursor-pointer
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                        disabled={loading}
                    >
                        {loading ? "Sending code..." : "Resend"}
                    </button>
                </p>
            </div>
        </div>
    );
}
