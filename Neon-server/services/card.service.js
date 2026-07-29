import mongoose from 'mongoose';

import Account from '../models/account.model.js';
import Card from '../models/card.model.js';

import ApiError from '../utils/apiError.utils.js';

// Card request (creates a pending card request)
export const cardRequest = async (userId, cardData) => {
    const { brand, spendingLimit} = cardData;

  
    const session = await mongoose.startSession();

    try {
        // Start transaction
        session.startTransaction();

        // Find the user's account and populate owner details
        const account = await Account.findOne({
            owner: userId
        })
            .populate('owner')
            .session(session);

        // Ensure account exists
        if (!account) {
            throw new ApiError(404, 'Account not found.');
        }

        // Ensure account is active
        if (account.status !== 'active') {
            throw new ApiError(400, 'Account is not active.');
        }

        // Check if the user already has a non-cancelled card of the same brand
        const existingCard = await Card.findOne({
            owner: userId,
            brand,
            status: {
                $ne: 'cancelled'
            }
        }).session(session);

        if (existingCard) {
            throw new ApiError(
                400,
                `You already have a ${brand} card request or active card.`
            );
        }

        // Build card holder name from the user's profile
        const cardHolderName =
            `${account.owner.firstName} ${account.owner.lastName}`.toUpperCase();

        // Create a pending card request
        const [card] = await Card.create(
            [
                {
                    owner: userId,
                    account: account._id,

                    // Card request details
                    brand,
                    type,
                    spendingLimit,

                    // Card holder information
                    cardHolderName,

                    // No sensitive card data is generated yet
                    cardNumber: null,
                    cvv: null,
                    pin: null,
                    last4: null,
                    expiryMonth: null,
                    expiryYear: null,

                    // Request starts as pending
                    status: 'pending'
                }
            ],
            { session }
        );

        // Commit transaction
        await session.commitTransaction();

        // Return only safe request information
        return {
            cardId: card._id,
            brand: card.brand,
            type: card.type,
            spendingLimit: card.spendingLimit,
            status: card.status,
            createdAt: card.createdAt,
            message: 'Card request submitted successfully.'
        };

    } catch (error) {

        // Roll back transaction if anything failed
        if (session.inTransaction()) {
            await session.abortTransaction();
        }

        // Preserve known application errors
        if (error instanceof ApiError) {
            throw error;
        }

        // Convert unknown errors into a generic server error
        throw new ApiError(
            500,
            'An unexpected error occurred while processing the card request.'
        );

    } finally {

        await session.endSession();
    }
};

