import { IoShieldCheckmark } from "react-icons/io5";

import { PageHeader } from "../../components/layout/PageHeader";
import { PrivacySection } from "../../components/policies/PrivacySection";

export function PrivacyPolicy() {
    return (
        <>
            <title>Columbia Merchant | Privacy Policy</title>
            <PageHeader
                icon={<IoShieldCheckmark />}
                header="Privacy & Security"
                title="Privacy Policy"
                description="Your privacy is our priority. Learn how we protect and handle your personal information"
            />
            <PrivacySection />
        </>
    );
}
