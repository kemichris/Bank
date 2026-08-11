import { FaArrowLeft } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";
import { UserPageHeader } from "../../components/ui/UserPageHeader";
import { LoanOverview } from "../../components/loan/LoanOverview";

export function LoanService() {
    return (
        <>
            <title>Columbia Merchant | Loan Service</title>
            <UserPageHeader
                cardHeader='Loan Services'
                headerDetail='Get quick access to loans'
                headerIcon={<FaHandHoldingUsd />}
                to='/dashboard'
                linkIcon={<FaArrowLeft />}
                linkText="Back to Dashboard"
            />

            <LoanOverview />

        </>
    )
}