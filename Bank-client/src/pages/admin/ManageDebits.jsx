import { useEffect, useState } from "react";

import { BsBank2 } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";

import { UserPageHeader } from "../../components/ui/UserPageHeader";
import { AdminTransactionTable } from "../../components/adminTransactions/AdminTransactionTable";
import { PageLoader } from "../../components/common/PageLoader";

import { allDebitTransaction } from "../../services/transaction.service";

export function ManageDebits() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTransactions = async () => {
    try {
      const res = await allDebitTransaction();
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
      <title>Columbia Merchant | Manage Debits</title>

      <UserPageHeader
        cardHeader="Manage Debits"
        headerDetail="Manage all Debit transactions"
        headerIcon={<BsBank2 />}
        to="/admin"
        linkIcon={<FaArrowLeft />}
        linkText="Dashboard"
      />

      <AdminTransactionTable transactions={transactions} reload={loadTransactions} />
    </>
  );
}
