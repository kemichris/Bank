import { RiNumber1 } from "react-icons/ri";
import { RiNumber2 } from "react-icons/ri";
import { RiNumber3 } from "react-icons/ri";
import { RiNumber4 } from "react-icons/ri";


import { SectionGuide } from "../../components/layout/SectionGuide";

export function LoanApplicationProcess() {
    const applicationData = {
        guideHeader: "Easy Application Process",
        guideDescription: "Get approved for a loan in just a few simple steps.",
        guides: [
            {
                icon: <RiNumber1 />,
                guideName: "Apply Online",
                details: "Complete our secure online application form with your personal and financial information."
            },
            {
                icon: <RiNumber2 />,
                guideName: "Quick Review",
                details: "Our team will review your application promptly and may request additional documentation if needed."
            },
            {
                icon: <RiNumber3 />,
                guideName: "Get Approved",
                details: "Once approved, you'll receive your loan offer and can review the terms and conditions before accepting."
            },
            {
                icon: <RiNumber4 />,
                guideName: "Receive Funds",
                details: "Once your loan is approved, you'll receive the funds quickly and efficiently to support your business needs."
            }
        ]
    };

    return (
        <>
            <SectionGuide
                guideHeader={applicationData.guideHeader}
                guideDescription={applicationData.guideDescription}
                guides={applicationData.guides}
            />
        </>
    )
}