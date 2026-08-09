import { success } from 'zod'
import * as cardService from '../services/card.service.js'

// Card request
export const cardRequest = async (req, res, next) => {
    try {
        const requestedCard = await cardService.cardRequest(
            req.user._id,
            req.body
        )

        return res.status(201).json({
            success: true,
            message: 'Card request submitted successfully.',
            data: requestedCard
        })
    } catch (error) {
        next(error)
    }
}

// approve card request
export const approveCardRequest = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cardApproved = await cardService.approveCardRequest(
            id,
            req.user._id
        );

        res.status(200).json({
            success: true,
            message: 'Card request approved successfully.',
            data: cardApproved
        });

    } catch (error) {
        next(error);
    }
};

// block card 
export const blockCard = async (req, res, next) => {
    try {
        const { id } = req.params;
        const blockedCard = await cardService.blockCard(
            id,
            req.user._id
        );

        res.status(200).json({
            success: true,
            message: 'Card blocked successfully.',
            data: blockedCard
        });

    } catch (error) {
        next(error);
    }
}

// unblock card 
export const unblockCard = async (req, res, next) => {
    try {
        const { id } = req.params;
        const unblockedCard = await cardService.unblockCard(
            id,
            req.user
        );

        res.status(200).json({
            success: true,
            message: 'Card unblocked successfully.',
            data: unblockedCard
        });

    } catch (error) {
        next(error);
    }
}

// Cancel Card 
export const cancelCard = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cancelledCard = await cardService.cancelCard(
            id,
            req.user
        );

        res.status(200).json({
            success: true,
            message: 'Card cancelled successfully',
            data: cancelledCard
        })

    } catch (error) {
        next(error)
    }
}

// Get active Card
export const getActiveCard = async (req, res, next) => {
    try {
        const userId = req.user._id
        const cardData = await cardService.getActiveCard(userId)

        return res.status(200).json({
            success: true,
            message: 'card retrieved successfully',
            data: cardData
        })

    } catch (error) {
        next(error)
    }
}