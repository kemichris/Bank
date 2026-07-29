import mongoose from 'mongoose';

import Account from '../models/account.model.js';
import Card from '../models/card.model.js';

import { generateCardNumber, generateCVV, generateExpiryDate } from '../utils/card.utils.js';
import { encrypt } from '../utils/encryption.utils.js';
import { hashPassword } from '../utils/password.utils.js';
import ApiError from '../utils/apiError.utils.js';

// Card request (creates a pending card request)
export const cardRequest = async (userId, cardData) => {
    const { brand, type, spendingLimit } = cardData;

    try {
        // Find the user's account and populate owner details
        const account = await Account.findOne({
            owner: userId
        }).populate('owner');

        // Ensure account exists
        if (!account) {
            throw new ApiError(404, 'Account not found.');
        }

        // Ensure account is active
        if (account.status !== 'active') {
            throw new ApiError(400, 'Account is not active.');
        }

        // Check if the user already has a non-cancelled card
        // of the same brand
        const existingCard = await Card.findOne({
            owner: userId,
            brand,
            status: {
                $ne: 'cancelled'
            }
        });

        if (existingCard) {
            throw new ApiError(
                400,
                `You already have a ${brand} card request or active card.`
            );
        }

        // Build the card holder's name
        const cardHolderName = `${account.owner.firstName} ${account.owner.lastName}`.toUpperCase();

        // Create a pending card request
        const card = await Card.create({
            owner: userId,
            account: account._id,

            // Card request details
            brand,
            type,
            spendingLimit,

            // Card holder information
            cardHolderName,

            // Sensitive card information will be generated
            // only after the request is approved
            cardNumber: null,
            cvv: null,
            pin: null,
            last4: null,
            expiryMonth: null,
            expiryYear: null,

            // Initial status
            status: 'pending'
        });

        // Return only safe request information
        return {
            cardId: card._id,
            brand: card.brand,
            type: card.type,
            spendingLimit: card.spendingLimit,
            status: card.status,
            createdAt: card.createdAt
        };

    } catch (error) {

        // Preserve known application errors
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


// Approve card request
export const approveCardRequest = async (cardId) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const card = await Card.findById(cardId).session(session);
        if (!card) {
            throw new ApiError(
                404,
                'Card request not found.'
            );
        }

        if (card.status !== 'pending') {
            throw new ApiError(
                400,
                'Only pending card requests can be approved.'
            );
        }

        // Geneare card details
        const cardNumber = generateCardNumber();
        const cvv = generateCVV();
        const { expiryMonth, expiryYear } = generateExpiryDate();
        const defaultPin = '0000';

        // encrypt card details
        const encryptedCardNumber = encrypt(cardNumber);
        const encryptedCVV = encrypt(cvv);
        const hashedPIN = await hashPassword(defaultPin);

        // update approved card details
        card.cardNumber = encryptedCardNumber;
        card.cvv = encryptedCVV;
        card.pin = hashedPIN;
        card.last4 = cardNumber.slice(-4);
        card.expiryMonth = expiryMonth;
        card.expiryYear = expiryYear;
        card.status = 'active';

        await card.save({ session });
        await session.commitTransaction();

        return {
            cardId: card._id,
            owner: card.owner,
            brand: card.brand,
            status: card.status,
            approvedAt: card.updatedAt
        };



    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }

        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(
            500,
            'An unexpected error occurred while approving the card request.'
        );

    } finally {
        await session.endSession();
    }
}
