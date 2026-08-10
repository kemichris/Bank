import PaymentMethod from '../models/paymentMethod.model.js';
import { uploadImage } from '../utils/cloudinary.utils.js';

export const createPaymentMethod = async (
    paymentMethodData,
    qrCodeFile
) => {

    let qrCode = '';

    // Upload QR code if one was provided
    if (qrCodeFile) {
        const uploadedQR = await uploadImage(
            qrCodeFile.path
        );

        qrCode = uploadedQR.secure_url;
    }

    const paymentMethod = await PaymentMethod.create({
        ...paymentMethodData,
        qrCode
    });

    return {
        id: paymentMethod._id,
        name: paymentMethod.name,
        network: paymentMethod.network,
        type: paymentMethod.type,
        walletAddress: paymentMethod.walletAddress,
        accountNumber: paymentMethod.accountNumber,
        accountName: paymentMethod.accountName,
        bankName: paymentMethod.bankName,
        swiftCode: paymentMethod.swiftCode,
        icon: paymentMethod.icon,
        qrCode: paymentMethod.qrCode,
        status: paymentMethod.status,
        instructions: paymentMethod.instructions
    };
};