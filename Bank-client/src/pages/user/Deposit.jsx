import { FaArrowLeft } from "react-icons/fa";
import { FaPiggyBank } from "react-icons/fa";

import { UserPageHeader } from "../../components/ui/UserPageHeader";
import { DepositHeader } from "../../components/transaction/DepositHeader";
import { DepositForm } from "../../components/transaction/DepositForm";


export function Deposit() {
    return (
        <>
            <title>Columbia Merchant | Deposit</title>
            <UserPageHeader
                cardHeader='Deposit Funds'
                headerDetail='Add money to your account securely'
                headerIcon={<FaPiggyBank />}
                to='/dashboard'
                linkIcon={<FaArrowLeft />}
                linkText="Back to Dashboard"
            />
            <DepositHeader />
            <DepositForm />

            

        </>
    )
}