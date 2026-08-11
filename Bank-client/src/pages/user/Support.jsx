import { FaArrowLeft } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

import { UserPageHeader } from "../../components/ui/UserPageHeader";
import { SupportForm } from "../../components/support/SupportForm";


export function Support() {
    return (
        <>
            <title>Columbia Merchant | Support </title>
            <UserPageHeader
                cardHeader="Support Center"
                headerDetail="Get help with your account and services"
                headerIcon={<MdSupportAgent />}
                to="/dashboard"
                linkIcon={<FaArrowLeft />}
                linkText="Back to Dashboard"
            />

            <SupportForm />
            
    
        </>
    );
}
