import { IoMdPhonePortrait } from "react-icons/io";
import { FaLaptop } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";

import {Navbar} from "../../components/layout/Navbar";
import {PageHeader} from "../../components/layout/PageHeader";
import {SectionGuide} from "../../components/layout/SectionGuide";
import {PageCta} from "../../components/layout/PageCta";
import {Footer} from "../../components/layout/Footer";
import { FaUser } from "react-icons/fa";



export function PersonalBanking() {
    const serviceGuideData = {
        guideHeader: "Our Personal Banking Services",
        guideDescription: "At Columbia Merchant, we offer a range of personal banking services that cater to your unique needs. Our commitment to excellence ensures that you receive the best banking experience possible.",
        guides: [
            {
                icon: <IoMdPhonePortrait />,
                guideName: "Mobile Banking",
                details: "Mobile banking coming soon.."
            },
            {
                icon: <FaLaptop />,
                guideName: "Online Banking",
                details: "Access your accounts and perform transactions from the comfort of your home or office."
            },
            {
                icon: <FaBell />,
                guideName: "Alerts and Notifications",
                details: "Stay informed with real-time alerts and notifications about your account activity and important updates."
            },
            {
                icon: <FaMoneyBills />,
                guideName: "Pay Bills",
                details: " conveniently pay your bills online, saving you time and effort."
            }
        ]
    };
    return (
        <>
            <title>Columbia Merchant | Personal Banking</title>
            <Navbar />
            <PageHeader
                icon={<FaUser />}
                header="Personal Banking"
                title="Experience the Future of Personal Banking"
                description="Discover our innovative personal banking solutions designed to simplify your financial life."
            />
            <SectionGuide
                guideHeader={serviceGuideData.guideHeader}
                guideDescription={serviceGuideData.guideDescription}
                guides={serviceGuideData.guides}
            />
            <PageCta />
            <Footer />
        </>
    );
}