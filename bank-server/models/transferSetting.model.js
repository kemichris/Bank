import mongoose from 'mongoose';

const transferSettingSchema = new mongoose.Schema(
  {
    internationalTransferCharge: {
      type: Number,
      default: 2.5,
      min: 0,
    },

    wireTransferCharge: {
      type: Number,
      default: 2.5,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

const TransferSetting = mongoose.model(
  'TransferSetting',
  transferSettingSchema,
);

export default TransferSetting;