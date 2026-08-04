import { PiPhoneCallFill } from "react-icons/pi";

import { Navbar } from "../../components/layout/Navbar"
import { PageHeader } from "../../components/layout/PageHeader"
import { ContactFormSection } from "../../components/contact/ContactFormSection";
import { ContactDetailSection } from "../../components/contact/ContactDetailSection";
import { Footer } from "../../components/layout/Footer"

export function Contact() {
    return (
        <>
            <title>Columbia Merchant | Contact</title>
            <Navbar />
            <PageHeader
                icon={<PiPhoneCallFill />}
                header="Get In Touch"
                title="Contact Us"
                description="We're here to help with all your banking needs. Reach out to us anytime."
            />
            <ContactFormSection />
            <ContactDetailSection />
            <Footer />
        </>
    )
}