import { useState, useEffect } from "react";

import { MdManageAccounts } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";

import { UserPageHeader } from "../../components/ui/UserPageHeader";
import { PageLoader } from "../../components/common/PageLoader";
import { UsersTable } from "../../components/manageusers/UsersTable";

import { getUsers } from "../../services/manageusers.service";

export function ManageUsers() {
  const [users, setUers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await getUsers();

        setUers(res.data);
      } catch (error) {
        console.error(error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  console.log(users)

  return (
    <>
      <title>Columbia Merchant | Manage Users</title>
      <UserPageHeader
        cardHeader="Manage Users"
        headerDetail="Manage your bank users list"
        headerIcon={<MdManageAccounts />}
        to="/admin"
        linkIcon={<FaArrowLeft />}
        linkText="Dashboard"
      />
      <UsersTable users={users} />
    </>
  );
}
