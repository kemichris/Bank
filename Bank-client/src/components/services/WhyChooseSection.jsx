import { FaPeopleLine } from "react-icons/fa6";
import { IoMdPhonePortrait } from "react-icons/io";
import { TbDeviceAnalytics } from "react-icons/tb";
import { FaShieldAlt } from "react-icons/fa";

import { SectionGuide } from "../../components/layout/SectionGuide";

export function WhyChooseSection() {
    const whyChooseData = {
        guideHeader: "Why Businesses Choose us",
        guideDescription: "We understand the unique challenges that businesses face, and we are dedicated to providing tailored solutions that help them succeed.",
        guides: [
            {
                icon: <FaPeopleLine />,
                guideName: "Dedicated Support",
                details: "Our team of experts is always available to provide personalized assistance and guidance for your business banking needs."
            },
            {
                icon: <IoMdPhonePortrait />,
                guideName: "Digital Banking",
                details: "Advance online banking solutions."
            },
            {
                icon: <TbDeviceAnalytics />,
                guideName: "Financial Insights",
                details: "Detailed reporting and analytics to help you make informed financial decisions for your business."
            },
            {
                icon:<FaShieldAlt />,
                guideName: "Security and Compliance",
                details: " Enterprise-level security measures and compliance with industry regulations to protect your business and its assets."
            }
        ]
    };

    return (
        <>
            <SectionGuide
                guideHeader={whyChooseData.guideHeader}
                guideDescription={whyChooseData.guideDescription}
                guides={whyChooseData.guides}
            />
        </>
    )
}