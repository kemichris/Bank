import { TbSettingsDollar } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa";

import { UserPageHeader } from "../../components/ui/UserPageHeader";
import { AddPaymentForm } from "../../components/adminsettings/AddPaymentForm";

export function AddPaymentMethod() {
  return (
    <>
      <title>Columbia Merchant | Add Payment</title>

      <UserPageHeader
        cardHeader="Create Payment Method"
        headerDetail="Creat how you will like to receive payment"
        headerIcon={<TbSettingsDollar />}
        to="/admin/settings/payment"
        linkIcon={<FaArrowLeft />}
        linkText="back"
      />
      <AddPaymentForm />
    </>
  );
}
