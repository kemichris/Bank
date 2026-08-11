import { FaArrowLeft } from "react-icons/fa";
import { TbReceiptTax } from "react-icons/tb";
import { UserPageHeader } from "../../components/ui/UserPageHeader";
import { TaxRefundForm } from "../../components/taxrefund/TaxRefundForm";

export function TaxRefund() {
    return (
        <>
            <title>Columbia Merchant | Tax Refund</title>
            <UserPageHeader
                cardHeader='IRS Tax Refund'
                headerDetail='Apply for your tax refund with ease'
                headerIcon={<TbReceiptTax />}
                to='/dashboard'
                linkIcon={<FaArrowLeft />}
                linkText="Back to Dashboard"
            />
            <TaxRefundForm />

        </>
    )
}