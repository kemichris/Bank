import { IoDocumentText } from "react-icons/io5";

import { Navbar } from "../../components/layout/Navbar";
import { PageHeader } from "../../components/layout/PageHeader";
import { TermsSection } from "../../components/policies/TermsSection";
import { Footer } from "../../components/layout/Footer";

export function Terms() {
    return (
        <>
            <title>Columbia Merchant | Terms of Service</title>
            <Navbar />
            <PageHeader
                icon={<IoDocumentText />}
                header="Legal Information"
                title="Terms of Service"
                description="Please read these terms carefully before using our banking services"
            />
            <TermsSection />
            <Footer />
        </>
    );
}
