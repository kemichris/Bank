import { FaHandHoldingDollar } from "react-icons/fa6";

import { PageHeader } from "../../components/layout/PageHeader";
import { LoanOptions } from "../../components/services/LoanOptions";
import { LoanApplicationProcess } from "../../components/services/LoanApplicationProcess";
import { PageCta } from "../../components/layout/PageCta";

export function Loans() {
    return (
        <>
            <title>Columbia Merchant | Loans</title>
            <PageHeader
                icon={<FaHandHoldingDollar />}
                header="Lending Solutions"
                title="Loans & Financing Options"
                description="Explore our range of loan products designed to support your business growth and financial needs."
            />
            <LoanOptions />
           <LoanApplicationProcess />
            <PageCta />
        </>
    )
}