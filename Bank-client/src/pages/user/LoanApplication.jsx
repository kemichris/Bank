import { FaArrowLeft } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";

import { UserPageHeader } from "../../components/ui/UserPageHeader";
import { LoanForm } from "../../components/loan/LoanForm";


export function LoanApplication() {
    return (
        <>
            <title>Columbia Merchant | Loan Service</title>
            <UserPageHeader
                cardHeader='Loan Application'
                headerDetail='Apply for loan in few easy steps'
                headerIcon={<FaHandHoldingUsd />}
                to='/dashboard/loan'
                linkIcon={<FaArrowLeft />}
                linkText="Back to Info"
            />

            <LoanForm />

        </>
    )
}