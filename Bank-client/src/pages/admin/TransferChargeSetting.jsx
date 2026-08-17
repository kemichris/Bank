import { FaArrowLeft, FaMoneyBill } from "react-icons/fa";

import { UserPageHeader } from "../../components/ui/UserPageHeader";

import { TransferChargeForm } from "../../components/adminsettings/transferChargeForm";



export function TransferChargeSetting() {


  return (
    <>
      <title>Columbia Merchant | Transfer Charge Settings</title>

      <UserPageHeader
        cardHeader="Transfer Charge Setting"
        headerDetail="Update international transfer charge"
        headerIcon={ <FaMoneyBill /> }
        to="/admin"
        linkIcon={<FaArrowLeft />}
        linkText="Dashboard"
      />

      <TransferChargeForm />
      

    </>
  );
}
