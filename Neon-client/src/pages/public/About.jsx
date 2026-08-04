import { FaInfoCircle } from "react-icons/fa";

import {Navbar} from "../../components/layout/Navbar";
import {PageHeader} from "../../components/layout/PageHeader";
import {MissionSection} from "../../components/about/MissionSection";

import {Footer} from "../../components/layout/Footer";


export function About() {
    return (
        <>
            <title>Neon | About</title>
            <Navbar />
            <PageHeader
                icon={<FaInfoCircle />}
                header="Our Story"
                title="Learn More About Neon"
                description="Discover our mission, values, and the team behind Neon."
            />
            <MissionSection />
            <Footer />
        </>
    )
}