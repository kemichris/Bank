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

    useEffect(() => {
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

        loadUser();
    }, [userId]);

    if (loading) {
        return <PageLoader />;
    }
    console.log(user);

    return (
        <>
            <title>Columbia Merchant | Manage Users</title>
            <UserAction user={user} />
            <UserStats user={user} />
            <UserInfo user={user} />
        </>
    );
}
