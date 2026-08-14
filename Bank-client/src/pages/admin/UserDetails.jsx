import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { UserStats } from "../../components/manageusers/UserStats";
import { UserInfo } from "../../components/manageusers/UserInfo";
import { UserAction } from "../../components/manageusers/UserAction";
import { PageLoader } from "../../components/common/PageLoader";

import { getUser } from "../../services/manageusers.service";

export function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const response = await getUser(userId);

      setUser(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) {
      setLoading(false);

      return;
    }

    loadUser();
  }, [userId]);

  if (loading) {
    return <PageLoader />;
  }

  if (!user) {
    return (
      <div className='p-6'>
        <h2 className='text-text text-xl'>
          User not found.
        </h2>
      </div>
    );
  }
  
  console.log(user);

  return (
    <>
      <title>Columbia Merchant | Manage Users</title>
      <UserAction user={user} reload={loadUser} />
      <UserStats user={user} />
      <UserInfo user={user} />
    </>
  );
}
