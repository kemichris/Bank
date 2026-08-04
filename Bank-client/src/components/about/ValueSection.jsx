import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FaLightbulb } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";



import {ValuesCard} from "./ValuesCard";

export function ValuesSection() {
    const values = [
        {
            icon: <VscWorkspaceTrusted />,
            valueName: "Trust",
            details: "We prioritize building strong relationships with our customers, earning their trust through transparency and reliability."
        },
        {
            icon: <FaLightbulb />,
            valueName: "Innovation",
            details: "We embrace creativity and continuously seek new ways to improve our products and services."
        },
        {
            icon: <FaHandshake />,
            valueName: "Integrity",
            details: "We uphold the highest standards of honesty and transparency in all our interactions."
        },
        {
            icon: <FaUsers />,
            valueName: "Customer Care",
            details: "We are committed to providing exceptional customer service, ensuring that our customers feel valued and supported."
        }
    ];

    return (
        <div className="value-section">
            <h2>Our Values</h2>
            <p className="value-description">
                These values shape our culture, influence our decisions, and drive us to deliver exceptional
                experiences for our customers.
            </p>
            <div className="value-cards">
                {values.map((value, index) => (
                    <ValuesCard
                        key={index}
                        icon={value.icon}
                        valueName={value.valueName}
                        details={value.details}
                    />
                ))}
            </div>
        </div>

    );
}