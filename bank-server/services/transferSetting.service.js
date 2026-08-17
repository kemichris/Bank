import TransferSetting from "../models/transferSetting.model.js";
import ApiError from "../utils/apiError.utils.js";

export const updateTransferCharge = async (internationalTransferCharge) => {
  if (
    internationalTransferCharge === undefined ||
    internationalTransferCharge === null
  ) {
    throw new ApiError(400, "Transfer charge is required.");
  }

  const charge = Number(internationalTransferCharge);

  if (Number.isNaN(charge) || charge < 0) {
    throw new ApiError(400, "Invalid transfer charge.");
  }

  const settings = await TransferSetting.findOneAndUpdate({},
    {
      internationalTransferCharge: charge,
    },
    {
      returnDocument: 'after',
      upsert: true,
    },
  );

  return settings;
};
