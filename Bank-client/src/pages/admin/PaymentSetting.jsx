import { useState, useEffect } from "react";

import { TbSettingsDollar } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa";

import { UserPageHeader } from "../../components/ui/UserPageHeader";
import { PaymentMethodTable } from "../../components/adminsettings/PaymentMethodTable";
import { PageLoader } from "../../components/common/PageLoader";

import { getPaymentMethods } from "../../services/paymentSetting.service";

export function PaymentSetting() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPaymentMethods = async () => {
    try {
      const res = await getPaymentMethods();
      console.log(res.data);
      setPaymentMethods(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadPaymentMethods();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

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

      <PaymentMethodTable
        paymentMethods={paymentMethods}
        reload={loadPaymentMethods}
      />
    </>
  );
}
