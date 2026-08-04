import { FaBriefcase } from "react-icons/fa";

import { Navbar } from "../../components/layout/Navbar";
import { PageHeader } from "../../components/layout/PageHeader";
import{WhyChooseSection} from "../../components/services/WhyChooseSection";
import { PageCta } from "../../components/layout/PageCta";
import { Footer } from "../../components/layout/Footer";

export function BusinessBanking() {
    return (
        <>
            <title>Columbia Merchant | Business Banking</title>
            <Navbar />
            <PageHeader
                icon={<FaBriefcase />}
                header="For Businesses"
                title="Business Banking Solutions"
                description="Discover our tailored business banking services designed to help your business thrive."
            />
            {/* <BusinessAccount /> */}
            <WhyChooseSection /> 
            <PageCta />
            <Footer />
        </>
    )
}