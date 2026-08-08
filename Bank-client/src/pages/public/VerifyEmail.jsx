import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { OtpInput } from '../../components/emailverification/OtpInput';
import { verifyEmail } from '../../services/auth.service';

export function VerifyEmail() {
    const navigate = useNavigate();
    const [code, setCode] = useState([
        '',
        '',
        '',
        '',
        '',
        '',
    ]);
    const location = useLocation();

    const email = location.state?.email;

    const handleSubmit = async (event) => {
    event.preventDefault();

    const verificationCode = code.join('');

    try {
        const res = await verifyEmail('/auth/verify-email', {
            email,
            verificationCode
        });

        alert(res.message);
        setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (error) {
        console.error(error.response?.data || error);
    }
};

    const handleResend = () => {
        console.log('Resend verification code');
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">

            <div className="w-full max-w-md rounded-2xl border border-border bg-surface-1 p-8 shadow-xl">

                <div className="text-center">

                    <h1 className="text-2xl font-bold text-text">
                        Verify Your Email
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-text-muted">
                        We've sent a{' '}
                        <strong className="text-text">
                            6-digit verification code
                        </strong>{' '}
                        to
                    </p>

                    <p className="mt-1 font-medium text-primary">
                        {email}
                    </p>

                    <p className="mt-2 text-sm text-text-muted">
                        Please enter it below to activate your account.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8"
                >
                    <OtpInput
                        value={code}
                        onChange={setCode}
                    />

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
                    >
                        Verify Email
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-text-muted">
                    Didn't receive the code?{' '}

                    <button
                        type="button"
                        onClick={handleResend}
                        className="
                            font-semibold
                            text-primary
                            hover:underline
                            cursor-pointer
                        "
                    >
                        Resend Code
                    </button>
                </p>

            </div>
        </div>
    );
}