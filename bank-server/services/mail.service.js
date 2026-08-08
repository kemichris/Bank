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