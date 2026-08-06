import { FaInfoCircle } from "react-icons/fa";

import { PageHeader } from "../../components/layout/PageHeader";
import { MissionSection } from "../../components/about/MissionSection";
import { ValueSection } from "../../components/about/ValueSection";
import { StatsSection } from "../../components/about/StatsSection";
import { PageCta } from "../../components/layout/PageCta";

import "../../styles/about/about.css";
import "../../styles/about/missionSection.css"
import "../../styles/about/statsSection.css"

export function About() {
    
    return (
        <>
            <title>Columbia Merchant | About</title>
            
            <PageHeader
                icon={<FaInfoCircle />}
                header="Our Story"
                title="Learn More About Columbia Merchant"
                description="Discover our mission, values, and the team behind Columbia Merchant."
            />
            <MissionSection />
            <ValueSection />
            <StatsSection />
            <PageCta />
        </>
    )
}