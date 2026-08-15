import { useEffect, useState } from "react";

import { FaArrowLeft, FaPiggyBank } from "react-icons/fa";

import { UserPageHeader } from "../../components/ui/UserPageHeader";
import { DepositHeader } from "../../components/transaction/DepositHeader";
import { DepositForm } from "../../components/transaction/DepositForm";
import { PageLoader } from "../../components/common/PageLoader";

import { getPaymentMethods } from "../../services/paymentSetting.service";

export function Deposit() {
  const [paymentMethods, setPaymentMethods] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPaymentMethods = async () => {
      try {
        const res = await getPaymentMethods();
        console.log(res.data)
        setPaymentMethods(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPaymentMethods();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <title>Columbia Merchant | Deposit</title>

      <UserPageHeader
        cardHeader="Deposit Funds"
        headerDetail="Add money to your account securely"
        headerIcon={<FaPiggyBank />}
        to="/dashboard"
        linkIcon={<FaArrowLeft />}
        linkText="Back to Dashboard"
      />

      <DepositHeader />

      <DepositForm paymentMethods={paymentMethods} />
    </>
  );
}
