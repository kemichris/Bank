import api from "../utils/axios";

export const sendEmail = async (emailData) => {
  const {data} = await api.post(
    '/admin/email/send',
    emailData,
  );

  return data
};
