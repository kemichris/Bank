import { FaArrowLeft } from "react-icons/fa";
import { FaPiggyBank } from "react-icons/fa";

import { UserPageHeader } from "../../components/ui/UserPageHeader";
import { DepositPaymentForm } from "../../components/transaction/DepositPaymentForm";





export function DepositPayment() {
    return (
        <>
            <title>Columbia Merchant | Deposit</title>
            <UserPageHeader
                cardHeader='Make Deposit'
                headerDetail='Complete your payment securely'
                headerIcon={<FaPiggyBank />}
                to='/dashboard'
                linkIcon={<FaArrowLeft />}
                linkText="Back to Dashboard"
            />
            
            <DepositPaymentForm  />

            

        </>
    )
}