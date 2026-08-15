import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { TbSettingsDollar } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa";

import { UserPageHeader } from "../../components/ui/UserPageHeader";
import { PageLoader } from "../../components/common/PageLoader";
import { AddPaymentForm } from "../../components/adminsettings/AddPaymentForm";

import { getPaymentMethod } from "../../services/paymentSetting.service";

export function EditPaymentMethod() {
  const { id } = useParams();

  const [paymentMethod, setPaymentMethod] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPaymentMethod = async () => {
      try {
        const res = await getPaymentMethod(id);

        setPaymentMethod(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPaymentMethod();
  }, [id]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <title>Columbia Merchant | Add Payment</title>

      <UserPageHeader
        cardHeader="Edit Payment Method"
        headerDetail="Upate your existin payment method"
        headerIcon={<TbSettingsDollar />}
        to="/admin/settings/payment"
        linkIcon={<FaArrowLeft />}
        linkText="back"
      />
      <AddPaymentForm initialData={paymentMethod} />
    </>
  );
}
