import { FaArrowLeft, FaEnvelope } from "react-icons/fa";

import { UserPageHeader } from "../../components/ui/UserPageHeader";
import { SendEmailForm } from "../../components/emailService/SendEmailForm";




export function SendEmail() {


  return (
    <>
      <title>Columbia Merchant | Email Service</title>

      <UserPageHeader
        cardHeader="Send Emails"
        headerDetail="Send emails to all users with one click"
        headerIcon={ <FaEnvelope /> }
        to="/admin"
        linkIcon={<FaArrowLeft />}
        linkText="Dashboard"
      />

      <SendEmailForm/>

    </>
  );
}
