import { Resend } from 'resend';
import ApiError from '../utils/apiError.utils.js';

const resend = new Resend(process.env.RESEND_API_KEY);

// Send OTP for email verification
export const sendOtpEmail = async (email, name, otp) => {
    try {
        const { data, error } = await resend.emails.send({
            from: `"Columbia Merchant" <${process.env.MAIL_FROM}>`,
            to: [email],
            subject: 'Email Verification Code',
            html: `
                <div style="font-family: Arial;">
                    <h2>Hello ${name}</h2>

                    <p>Your verification code is:</p>

                    <h1 style="color:#1e88e5">${otp}</h1>

                    <p>This code expires in 10 minutes.</p>
                </div>
            `
        });

        if (error) {
            console.error('❌ Resend error:', error);
            throw new ApiError(500, 'Failed to send verification email.');
        }

        console.log('✅ Verification email sent:', data);

        return data;

    } catch (error) {
        console.error('❌ Email failed:', error);

        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(
            500,
            'Failed to send verification email.'
        );
    }
};

// Send Wire Transfer pending mail

export const wireTransferPendingMail = async (
    email,
    fullName,
    amount,
    recipient
) => {
    const subject = 'Wire Transfer Pending Approval';

    const html = `
        <div style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
        ">

            <h2 style="color: #111;">
                Wire Transfer Pending
            </h2>

            <p>
                Hi ${fullName},
            </p>

            <p>
                Your wire transfer of
                <strong>$${Number(amount).toFixed(2)}</strong>
                to <strong>${recipient}</strong>
                has been submitted successfully.
            </p>

            <div style="
                background: #f5f5f5;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
            ">
                <p style="margin: 0;">
                    <strong>Status:</strong> Pending Approval
                </p>
            </div>

            <p>
                Your transfer is currently awaiting approval.
                You will be contacted with further updates once
                your transaction has been reviewed.
            </p>

            <p>
                Thank you for trusting
                <strong>Global Merchant Bank</strong>.
            </p>

            <hr style="
                border: none;
                border-top: 1px solid #ddd;
                margin: 25px 0;
            ">

            <p style="
                font-size: 12px;
                color: #777;
            ">
                This is an automated email. Please do not reply to this message.
            </p>

        </div>
    `;

    const { data, error } = await resend.emails.send({
        from: `Global Merchant Bank <${process.env.MAIL_FROM}>`,
        to: email,
        subject,
        html
    });

    if (error) {
        throw new Error(
            `Failed to send wire transfer email: ${error.message}`
        );
    }

    return data;
};

