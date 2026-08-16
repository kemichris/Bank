import { useEffect, useState } from "react";

import { HiReceiptTax } from "react-icons/hi";

import { FaArrowLeft } from "react-icons/fa";

import { UserPageHeader } from "../../components/ui/UserPageHeader";

import { getTaxRefunds} from "../../services/tax.service";

import { PageLoader } from "../../components/common/PageLoader";
import { TaxRefundTable } from "../../components/taxrefund/TaxRefundTable";





export function TaxRefund() {
  const [taxRefunds, setTaxRefunds] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTaxRefund = async () => {
    try {
      const res = await getTaxRefunds();
      console.log(res.data);

      setTaxRefunds(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {


    loadTaxRefund();
    
  }, []);
  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <title>Columbia Merchant | Tax Management</title>

      <UserPageHeader
        cardHeader="Tax Refund Management"
        headerDetail="View tax refund details"
        headerIcon={ <HiReceiptTax /> }
        to="/admin"
        linkIcon={<FaArrowLeft />}
        linkText="Dashboard"
      />

      <TaxRefundTable taxRefunds={taxRefunds} reload={loadTaxRefund} />

    </>
  );
}
