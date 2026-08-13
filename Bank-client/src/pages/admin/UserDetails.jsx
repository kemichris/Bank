import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { UserStats } from "../../components/manageusers/UserStats";
import { UserInfo } from "../../components/manageusers/UserInfo";
import { UserAction } from "../../components/manageusers/UserAction";

import { getUser } from "../../services/manageusers.service";

export function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getUser(userId);

        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadUser();
  }, [userId]);

  console.log(user);

  return (
    <>
      <title>Columbia Merchant | Manage Users</title>
      <UserAction />
      <UserStats />
      <UserInfo />
    </>
  );
}
