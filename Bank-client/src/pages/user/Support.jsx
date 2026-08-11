import { FaArrowLeft } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

import { UserPageHeader } from "../../components/ui/UserPageHeader";


export function Support() {
    return (
        <>
            <title>Columbia Merchant | Setting </title>
            <UserPageHeader
                cardHeader="Support Center"
                headerDetail="Get help with your account and services"
                headerIcon={<MdSupportAgent />}
                to="/dashboard"
                linkIcon={<FaArrowLeft />}
                linkText="Back to Dashboard"
            />

            
    
        </>
    );
}
