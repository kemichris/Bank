import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FaLightbulb } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

import { SectionGuide } from "../../components/layout/SectionGuide";

export function ValueSection() {
    const ValueData = {
        guideHeader: "Our Values",
        guideDescription: "These values shape our culture, influence our decisions, and drive us to deliver exceptional experiences for our customers.",
        guides: [
            {
                icon: <VscWorkspaceTrusted />,
                guideName: "Trust",
                details: "We prioritize building strong relationships with our customers, earning their trust through transparency and reliability."
            },
            {
                icon: <FaLightbulb />,
                guideName: "Innovation",
                details: "We embrace creativity and continuously seek new ways to improve our products and services."
            },
            {
                icon: <FaHandshake />,
                guideName: "Integrity",
                details: "We uphold the highest standards of honesty and transparency in all our interactions."
            },
            {
                icon: <FaUsers />,
                guideName: "Customer Care",
                details: "We are committed to providing exceptional customer service, ensuring that our customers feel valued and supported."
            }
        ]
    };
    return (
        <>
            <SectionGuide
                guideHeader={ValueData.guideHeader}
                guideDescription={ValueData.guideDescription}
                guides={ValueData.guides}
            />
        </>
    )
}