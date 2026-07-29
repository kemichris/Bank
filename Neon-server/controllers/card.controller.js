import { success } from 'zod'
import * as cardService from '../services/card.service'

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
        const { cardId } = req.params;

        const cardApproved = await approveCardRequestService(
            cardId,
            req.user.id
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