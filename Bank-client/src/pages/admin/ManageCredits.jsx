import { useEffect, useState } from "react";

import { BsBank2 } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";

import { UserPageHeader } from "../../components/ui/UserPageHeader";
import { AdminTransactionTable } from "../../components/adminTransactions/AdminTransactionTable";
import { PageLoader } from "../../components/common/PageLoader";

import { allCreditTransaction } from "../../services/transaction.service";

export function ManageCredits() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTransactions = async () => {
    try {
      const res = await allCreditTransaction();
      console.log(res.data);

      setTransactions(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {


    loadTransactions();
    
  }, []);
  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <title>Columbia Merchant | Manage Credits</title>

      <UserPageHeader
        cardHeader="Manage Credits"
        headerDetail="Manage all credit transactions"
        headerIcon={<BsBank2 />}
        to="/admin"
        linkIcon={<FaArrowLeft />}
        linkText="Dashboard"
      />

      <AdminTransactionTable transactions={transactions} reload={loadTransactions} />
    </>
  );
}
