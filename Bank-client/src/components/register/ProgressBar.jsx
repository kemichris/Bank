import { FaUser } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { BsBank2 } from "react-icons/bs";
import { RiShieldCheckFill } from "react-icons/ri";

import "../../styles/register/progressBar.css"

const steps = [
    {
        title: "Personal",
        icon: <FaUser />,
    },
    {
        title: "Contact",
        icon: <IoCall />,
    },
    {
        title: "Account",
        icon: <BsBank2 />,
    },
    {
        title: "Security",
        icon: <RiShieldCheckFill />,
    },
];

export function ProgressBar({ step }) {
    return (
        <div className="progress-bar">
            {steps.map((item, index) => {
                const isActive = step >= index + 1;
                const isCompleted = step > index + 1;

                return (
                    <div key={item.title} className="progress-step">
                        <div className="step-top">
                            <div className={`step-circle ${isActive ? "active" : ""}`}>
                                {item.icon}
                            </div>

                            {index < steps.length - 1 && (
                                <div
                                    className={`progress-line ${isCompleted ? "active" : ""}`}
                                />
                            )}
                        </div>

                        <span className={`step-title ${isActive ? "active" : ""}`}>{item.title}</span>
                    </div>
                );
            })}
        </div>
    );
}
