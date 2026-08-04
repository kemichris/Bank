import mongoose from "mongoose"
import { trim } from "zod";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        enum: ['user', 'admin', 'manager', 'superadmin']
    },
    description: {
        type: String
    },
    permissions: [
        {
            type: String,
            trim: true
        }
    ]
},
    {
        timestamps: true
    }
);

const Role = mongoose.model('Role', roleSchema);

export default Role;