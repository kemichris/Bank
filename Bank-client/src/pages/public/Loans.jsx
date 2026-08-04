import { FaHandHoldingDollar } from "react-icons/fa6";

import { Navbar } from "../../components/layout/Navbar";
import { PageHeader } from "../../components/layout/PageHeader";
import { LoanApplicationProcess } from "../../components/services/LoanApplicationProcess";
import { PageCta } from "../../components/layout/PageCta";
import { Footer } from "../../components/layout/Footer";

export function Loans() {
    return (
        <>
            <title>Columbia Merchant | Loans</title>
            <Navbar />
            <PageHeader
                icon={<FaHandHoldingDollar />}
                header="Lending Solutions"
                title="Loans & Financing Options"
                description="Explore our range of loan products designed to support your business growth and financial needs."
            />
           <LoanApplicationProcess />
            <PageCta />
            <Footer />
        </>
    )
}