import { FaArrowLeft } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { UserPageHeader } from "../../components/ui/UserPageHeader";
import { Profile } from "../../components/setting/Profile";


export function Setting() {
    return (
        <>
            <title>Columbia Merchant | Setting </title>
            <UserPageHeader
                cardHeader="Local Transfer"
                headerDetail="Send money to any Columbia Merchant Bank securely and instantly"
                headerIcon={<IoMdSettings />}
                to="/dashboard"
                linkIcon={<FaArrowLeft />}
                linkText="Back to Dashboard"
            />

            <Profile />
    
        </>
    );
}
