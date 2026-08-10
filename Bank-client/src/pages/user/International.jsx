import { FaArrowLeft } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";

import { UserPageHeader } from "../../components/ui/UserPageHeader";
import { WireTransferForm } from "../../components/transaction/WireTransferForm";
import { BankSecurityNotice } from "../../components/transaction/SecurityNotice";


export function International() {
    return (
        <>
        

            <title>Columbia Merchant | International Transfer</title>
            <UserPageHeader
                cardHeader='International Transfer'
                headerDetail='Send money worldwide with multiple payment methods'
                headerIcon={<FaGlobe />}
                to='/dashboard'
                linkIcon={<FaArrowLeft />}
                linkText="Back to Dashboard"
            />

            <WireTransferForm />

            <BankSecurityNotice />

        </>
    )
}