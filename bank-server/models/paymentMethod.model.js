import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },

    network: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: ["crypto", "bank", "others"],
      required: true,
    },

    paymentAddress: {
      type: String,
      default: "",
      trim: true,
    },

    accountName: {
      type: String,
      default: "",
    },

    bankName: {
      type: String,
      default: "",
    },

    swiftCode: {
      type: String,
      default: "",
    },

    icon: {
      type: String,
      default: "",
    },

    qrCode: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["enabled", "disabled"],
      default: "enabled",
    },

    instructions: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);
const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);

export default PaymentMethod;
