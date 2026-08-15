import { TbSettingsDollar } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa";

import { UserPageHeader } from "../../components/ui/UserPageHeader"

export function PaymentSetting() {
    return (
        <>
        <title>Columbia Merchant | Payment Setting</title>
        
              <UserPageHeader
                cardHeader="Payment Setting"
                headerDetail="Setup your desired payment method for deposit"
                headerIcon={<TbSettingsDollar />}
                to="/admin"
                linkIcon={<FaArrowLeft />}
                linkText="Dashboard"
              />
        </>
    )
}