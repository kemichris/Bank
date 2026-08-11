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

// Send password reset mail
export const sendPasswordResetMail = async (
    email,
    fullName,
    resetCode
) => {
    const subject = 'Password Reset Code';

    const html = `
        <div style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
        ">

            <p>
                Hi ${fullName},
            </p>

            <p>
                We received a request to reset the password
                for your Global Merchant Bank account.
            </p>

            <p>
                Your password reset code is:
            </p>

            <div style="
                margin: 25px 0;
                padding: 18px;
                text-align: center;
                background: #f5f5f5;
                border-radius: 10px;
            ">
                <strong style="
                    font-size: 28px;
                    letter-spacing: 8px;
                ">
                    ${resetCode}
                </strong>
            </div>

            <p>
                This code will expire in
                <strong>10 minutes</strong>.
            </p>

            <p>
                If you did not request a password reset,
                you can safely ignore this email.
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
                This is an automated email. Please do not reply
                to this message.
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
            `Failed to send password reset email: ${error.message}`
        );
    }

    return data;
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

// local transfer sent mail
export const localTransferSentMail = async (
    email,
    fullName,
    amount,
    recipient,
    reference
) => {
    const subject = 'Transfer Successful';

    const html = `
        <div style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
        ">

            <p>
                Hi ${fullName},
            </p>

            <p>
                Your transfer of
                <strong>$${Number(amount).toFixed(2)}</strong>
                to <strong>${recipient}</strong>
                has been completed successfully.
            </p>

            <div style="
                background: #f5f5f5;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
            ">

                <p style="margin: 5px 0;">
                    <strong>Status:</strong> Completed
                </p>

                <p style="margin: 5px 0;">
                    <strong>Amount:</strong>
                    $${Number(amount).toFixed(2)}
                </p>

                <p style="margin: 5px 0;">
                    <strong>Recipient:</strong>
                    ${recipient}
                </p>

                <p style="margin: 5px 0;">
                    <strong>Reference:</strong>
                    ${reference}
                </p>

            </div>

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
            `Failed to send transfer email: ${error.message}`
        );
    }

    return data;
};

// local transfer receive mail 
export const localTransferReceivedMail = async (
    email,
    fullName,
    amount,
    sender,
    reference,
    description
) => {
    const subject = 'Transfer Received';

    const html = `
        <div style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
        ">

            <p>
                Hi ${fullName},
            </p>

            <p>
                You have received
                <strong>$${Number(amount).toFixed(2)}</strong>
                from <strong>${sender}</strong>.
            </p>

            <div style="
                background: #f5f5f5;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
            ">

                <p style="margin: 5px 0;">
                    <strong>Status:</strong> Completed
                </p>

                <p style="margin: 5px 0;">
                    <strong>Amount:</strong>
                    $${Number(amount).toFixed(2)}
                </p>

                <p style="margin: 5px 0;">
                    <strong>From:</strong>
                    ${sender}
                </p>

                <p style="margin: 5px 0;">
                    <strong>Reference:</strong>
                    ${reference}
                </p>

                ${
                    description
                        ? `
                            <p style="margin: 5px 0;">
                                <strong>Description:</strong>
                                ${description}
                            </p>
                        `
                        : ''
                }

            </div>

            <p>
                The funds have been credited to your account.
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
            `Failed to send transfer email: ${error.message}`
        );
    }

    return data;
};

// Loan application mail 
// export const loanApplicationMail =  async (

// )=> {

// }



// Tax refund mail
export const taxRefundRequestReceivedMail = async (
    email,
    fullName
) => {
    const subject = 'Tax Refund Request Received';

    const html = `
        <div style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
        ">

            <p>
                Hi ${fullName},
            </p>

            <p>
                We have successfully received your tax refund request.
            </p>

            <div style="
                background: #f5f5f5;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
            ">
                <p style="margin: 0;">
                    <strong>Status:</strong> Request Received
                </p>
            </div>

            <p>
                Your request is currently being reviewed. If we require
                any additional information or documentation, we will
                contact you with further instructions.
            </p>

            <p>
                Please allow some time for the review process. No further
                action is required from you at this time.
            </p>

            <p>
                Thank you.
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
            `Failed to send tax refund email: ${error.message}`
        );
    }

    return data;
};


// support ticked received mail 
// Send support ticket received mail
export const supportTicketReceivedMail = async (
    email,
    fullName,
    ticketTitle
) => {
    const subject = 'Support Ticket Received';

    const html = `
        <div style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
        ">

            <p>
                Hi ${fullName},
            </p>

            <p>
                We have received your support request successfully.
                Our support team will review your request and get back
                to you as soon as possible.
            </p>

            <div style="
                background: #f5f5f5;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
            ">
                <p style="margin: 0 0 8px;">
                    <strong>Ticket:</strong>
                    ${ticketTitle}
                </p>

                <p style="margin: 0;">
                    <strong>Status:</strong>
                    Open
                </p>
            </div>

            <p>
                Our support team typically responds within 24 hours.
                If we need any additional information to resolve your
                issue, we will contact you.
            </p>

            <p>
                Thank you for contacting
                <strong>Global Merchant Bank Support</strong>.
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
            `Failed to send support ticket email: ${error.message}`
        );
    }

    return data;
};