import { useEffect, useState } from "react";

import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";

import { UserPageHeader } from "../../components/ui/UserPageHeader";
import { LoanManagementTable } from "../../components/loan/LoanManagementTable";

import { getLoans } from "../../services/loan.service";

import { PageLoader } from "../../components/common/PageLoader";





export function LoanManagment() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLoans = async () => {
    try {
      const res = await getLoans();
      console.log(res.data);

      setLoans(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {


    loadLoans();
    
  }, []);
  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <title>Columbia Merchant | Loan Management</title>

      <UserPageHeader
        cardHeader="Loan Management"
        headerDetail="View and review all requested loan application"
        headerIcon={<FaHandHoldingDollar />}
        to="/admin"
        linkIcon={<FaArrowLeft />}
        linkText="Dashboard"
      />

      <LoanManagementTable loans={loans} reload={loadLoans} />

    </>
  );
}
