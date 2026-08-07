import transporter from '../config/mailer.js';
import ApiError from '../utils/apiError.utils';


// send otp for email verificaton 
export const sendOtpEmail = async (email, name, otp) => {
    try {
        await transporter.sendMail({
            from: `"Columbia Merchant" <${process.env.MAIL_FROM}>`,
            to: email,
            subject: 'Email Verification Code',
            html: `
        <div style="font-family: Arial;">
          <h2>Hello ${name}</h2>

          <p>Your verification code is:</p>

          <h1 style="color:#1e88e5">${code}</h1>

          <p>This code expires in 10 minutes.</p>
        </div>
      `,
        });
        console.log("✅ Verification email sent");
    } catch (error) {
        console.error("❌ Email failed:", error);
        if (error instanceof ApiError) {
            throw error;
        }

        // Convert unknown errors into a generic server error
        throw new ApiError(
            500,
            'An unexpected error occurred while processing the card request.'
        );
    }
};