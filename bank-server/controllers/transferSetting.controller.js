import * as transferSettingServices from "../services/transferSetting.service.js";

export const updateTransferCharge = async (req, res, next) => {
  try {
    const { internationalTransferCharge } = req.body;

    const settings = await transferSettingServices.updateTransferCharge(internationalTransferCharge);

    res.status(200).json({
      success: true,
      message: "Transfer charge updated successfully.",
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};
