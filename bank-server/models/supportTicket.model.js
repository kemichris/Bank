import mongoose from 'mongoose';

const supportTicketSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: [
                'open',
                'in_progress',
                'resolved',
                'closed'
            ],
            default: 'open',
            index: true
        }
    },
    {
        timestamps: true
    }
);

const SupportTicket = mongoose.model(
    'SupportTicket',
    supportTicketSchema
);

export default SupportTicket;