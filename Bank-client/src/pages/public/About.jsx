import { FaInfoCircle } from "react-icons/fa";

import {Navbar} from "../../components/layout/Navbar";
import {PageHeader} from "../../components/layout/PageHeader";
import {MissionSection} from "../../components/about/MissionSection";
import {ValuesSection} from "../../components/about/ValueSection";
import {StatsSection} from "../../components/about/StatsSection";
import {PageCta} from "../../components/layout/PageCta";
import {Footer} from "../../components/layout/Footer";

import "../../styles/about/about.css";


export function About() {
    return (
        <>
            <title>Columbia Merchant | About</title>
            <Navbar />
            <PageHeader
                icon={<FaInfoCircle />}
                header="Our Story"
                title="Learn More About Columbia Merchant"
                description="Discover our mission, values, and the team behind Columbia Merchant."
            />
            <MissionSection />
            <ValuesSection />
            <StatsSection />
            <PageCta />
            <Footer />
        </>
    )
}