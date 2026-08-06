import { IoDocumentText } from "react-icons/io5";

import { PageHeader } from "../../components/layout/PageHeader";
import { TermsSection } from "../../components/policies/TermsSection";

export function Terms() {
    return (
        <>
            <title>Columbia Merchant | Terms of Service</title>
            <PageHeader
                icon={<IoDocumentText />}
                header="Legal Information"
                title="Terms of Service"
                description="Please read these terms carefully before using our banking services"
            />
            <TermsSection />
        </>
    );
}
