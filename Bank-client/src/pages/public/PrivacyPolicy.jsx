import { IoShieldCheckmark } from "react-icons/io5";

import { Navbar } from "../../components/layout/Navbar";
import { PageHeader } from "../../components/layout/PageHeader";
import { PrivacySection } from "../../components/policies/PrivacySection";
import { Footer } from "../../components/layout/Footer";

export function PrivacyPolicy() {
    return (
        <>
            <title>Columbia Merchant | Privacy Policy</title>
            <Navbar />
            <PageHeader
                icon={<IoShieldCheckmark />}
                header="Privacy & Security"
                title="Privacy Policy"
                description="Your privacy is our priority. Learn how we protect and handle your personal information"
            />
            <PrivacySection />
            <Footer />
        </>
    );
}
