import mongoose from 'mongoose';

import Account from '../models/account.model.js';
import Card from '../models/card.model.js';

import {
    generateCardNumber,
    generateCVV,
    generateExpiryDate,
    isCardExpired
} from '../utils/card.utils.js';

import { encrypt, decrypt } from '../utils/encryption.utils.js';
import { hashPassword } from '../utils/password.utils.js';
import ApiError from '../utils/apiError.utils.js';


// ─── CARD REQUEST ──────────────────────────────────────────────
// Creates a pending card request
export const cardRequest = async (userId, cardData) => {
    const { brand, type, spendingLimit } = cardData;

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
    const cardHolderName =
        `${account.owner.firstName} ${account.owner.lastName}`.toUpperCase();

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
};

// ─── APPROVE CARD REQUEST ──────────────────────────────────────
export const approveCardRequest = async cardId => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const card = await Card.findById(cardId).session(session);

        if (!card) {
            throw new ApiError(
                404,
                'Card not found.'
            );
        }

        if (card.status !== 'pending') {
            throw new ApiError(
                400,
                'Only pending card requests can be approved.'
            );
        }

        // Generate card details
        const cardNumber = generateCardNumber();
        const cvv = generateCVV();
        const { expiryMonth, expiryYear } = generateExpiryDate();
        const defaultPin = '0000';

        // Encrypt card details
        const encryptedCardNumber = encrypt(cardNumber);
        const encryptedCVV = encrypt(cvv);
        const hashedPIN = await hashPassword(defaultPin);

        // Update approved card details
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

        throw error;

    } finally {
        await session.endSession();
    }
};


// ─── BLOCK CARD ────────────────────────────────────────────────
export const blockCard = async (cardId, currentUser) => {
    const card = await Card.findById(cardId);

    if (!card) {
        throw new ApiError(
            404,
            'Card not found.'
        );
    }

    if (card.status !== 'active') {
        throw new ApiError(
            400,
            'Only active cards can be blocked.'
        );
    }

    if (isCardExpired(card.expiryMonth, card.expiryYear)) {
        throw new ApiError(
            400,
            'Expired cards cannot be blocked.'
        );
    }

    card.status = 'blocked';
    card.blockedBy = currentUser._id;
    card.blockedAt = new Date();

    await card.save();

    return {
        cardId: card._id,
        status: card.status,
        blockedAt: card.updatedAt
    };
};


// ─── UNBLOCK CARD ──────────────────────────────────────────────
export const unblockCard = async (cardId, currentUser) => {
    const card = await Card.findById(cardId).populate({
        path: 'blockedBy',
        populate: {
            path: 'role'
        }
    });

    if (!card) {
        throw new ApiError(
            404,
            'Card not found.'
        );
    }

    // Only blocked cards can be unblocked
    if (card.status !== 'blocked') {
        throw new ApiError(
            400,
            'Only blocked cards can be unblocked.'
        );
    }

    // Prevent reactivating expired cards
    if (isCardExpired(card.expiryMonth, card.expiryYear)) {
        throw new ApiError(
            400,
            'Expired cards cannot be unblocked.'
        );
    }

    // Determine who blocked the card
    const blockedByUser = card.blockedBy;

    if (!blockedByUser) {
        throw new ApiError(
            404,
            'Unable to determine who blocked this card.'
        );
    }

    const blockerRole = blockedByUser.role.name;

    const isAdmin =
        ['admin', 'manager', 'superadmin'].includes(
            currentUser.role.name
        );

    const isCardOwner =
        card.owner.toString() === currentUser.id;

    // If an administrator blocked it,
    // only another administrator may unblock it.
    if (
        blockerRole !== 'user' &&
        !isAdmin
    ) {
        throw new ApiError(
            403,
            'This card was blocked by the bank and cannot be unblocked by the card holder.'
        );
    }

    // If the owner blocked it,
    // only that owner or an administrator may unblock it.
    if (
        blockerRole === 'user' &&
        !isAdmin &&
        !isCardOwner
    ) {
        throw new ApiError(
            403,
            'You are not authorized to unblock this card.'
        );
    }

    // Restore the card
    card.status = 'active';
    card.blockedBy = null;
    card.blockedAt = null;

    await card.save();

    return {
        cardId: card._id,
        status: card.status,
        unblockedAt: card.updatedAt
    };
};


// ─── CANCEL CARD ──────────────────────────────────────────────
export const cancelCard = async cardId => {
    const card = await Card.findById(cardId);

    if (!card) {
        throw new ApiError(
            404,
            'Card not found.'
        );
    }

    if (card.status === 'pending') {
        throw new ApiError(
            400,
            'Pending card requests cannot be cancelled.'
        );
    }

    if (card.status === 'cancelled') {
        throw new ApiError(
            400,
            'Card has already been cancelled.'
        );
    }

    card.status = 'cancelled';
    card.blockedBy = null;
    card.blockedAt = null;

    await card.save();

    return {
        cardId: card._id,
        status: card.status,
        cancelledAt: card.updatedAt
    };
};

// ─── Get Card Info──────────────────────────────────────────────

export const getActiveCard = async userId => {
    const card = await Card.findOne({
        owner: userId,
        status: 'active'
    });

    if (!card) {
        throw new ApiError(
            404,
            'No active card found.'
        );
    }

    return {
        _id: card._id,
        owner: card.owner,
        account: card.account,

        cardNumber: decrypt(card.cardNumber),
        cvv: decrypt(card.cvv),

        last4: card.last4,
        cardHolderName: card.cardHolderName,
        brand: card.brand,
        type: card.type,

        expiryMonth: card.expiryMonth,
        expiryYear: card.expiryYear,

        status: card.status,
        spendingLimit: card.spendingLimit,

        onlinePayments: card.onlinePayments,
        atmWithdrawal: card.atmWithdrawal,
        internationalPayments: card.internationalPayments,

        isFrozen: card.isFrozen
    };
};