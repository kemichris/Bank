import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

import { ContactCard } from "./ContactCard"


export function ContactSection() {
    const contactDetails = [
        {
            contactIcon: <MdOutlineAccessTimeFilled />,
            contactTitle: "Banking Hours",
            contactDetails: ["Mon-Fri: 9AM-5PM", "Sat: 9AM-1PM", "Sun: Closed"]
        },
        {
            contactIcon: <FaPhoneAlt />,
            contactTitle: "Phone Banking",
            contactDetails: ["Available 24/7", "Call: 1-800-BANKING", "International: +1-555-0123"]
        },

        {
            contactIcon: <MdEmail />,
            contactTitle: "Email Support",
            contactDetails: ["Response within 24hrs", "support@nexavaultnv.live"]
        },
        {
            contactIcon: <FaLocationDot />,
            contactTitle: "Visit Us",
            contactDetails: ["123 Banking Street", "Financial District", "New York, NY 10001"]
        }


    ]

    return (
        <div className="contact-section">
            {
                contactDetails.map((contactDetail, index)=> (
                    <ContactCard key={index} {...contactDetail} />
                ))
            }
        </div>
    )
}












