import { FaBriefcase } from "react-icons/fa";


import { PageHeader } from "../../components/layout/PageHeader";
import { BusinessAccount } from "../../components/services/BusinessAccount";
import{WhyChooseSection} from "../../components/services/WhyChooseSection";
import { PageCta } from "../../components/layout/PageCta";


export function BusinessBanking() {
    return (
        <>
            <title>Columbia Merchant | Business Banking</title>
            
            <PageHeader
                icon={<FaBriefcase />}
                header="For Businesses"
                title="Business Banking Solutions"
                description="Discover our tailored business banking services designed to help your business thrive."
            />
            <BusinessAccount />
            <WhyChooseSection /> 
            <PageCta />
            
        </>
    )
}