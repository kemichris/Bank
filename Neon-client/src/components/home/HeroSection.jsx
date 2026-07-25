import { RiUserAddFill } from "react-icons/ri";
import { FiLogIn } from "react-icons/fi";
import { CiBank } from "react-icons/ci";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { IoCall } from "react-icons/io5";

import { Button } from "../common/Button"
import { HeroCard } from "./HeroCard";

export function HeroSection() {
    return (
        <div className="hero-section">
            <h1>Neon Bank</h1>
            <p className="hero-description">We do banking differently. We believe that people come first,
                and that everyone deserves a great experience every step of the way.
            </p>
            <div className="hero-buttons">
                <Button
                    icon={<RiUserAddFill />}
                    text="Open Account Today"
                    to="/register"
                    style={{
                        backgroundColor: "#0184C7",
                        color: "#e5e7eb"
                    }}
                />
                <Button
                    icon={<FiLogIn />}
                    text="Login to Banking"
                    to="/login"
                    style={{
                        backgroundColor: "transparent",
                        color: "#e5e7eb",
                        border: "1px solid #e5e7eb"
                    }}
                />
            </div>
            <div className="hero-cards">
                <HeroCard
                    cardTexts={[
                        { text: "ROUTING #" },
                        { text: "251480576" }
                    ]}
                    icon={<CiBank />}
                    style={{
                        backgroundColor: "#0184C7"
                    }}
                />
                <HeroCard
                    cardTexts={[
                        { text: "BRANCH HOURS" },
                        { text: "Mon-Fri: 9AM-5PM" },
                        { text: "Sat: 9AM-1PM" }
                    ]}
                    icon={<MdOutlineAccessTimeFilled />}
                    style={{
                        backgroundColor:"#12B8A6"
                    }}
                />
                <HeroCard
                cardTexts={[
                        { text: "24/7 SUPPORT" },
                        { text: "1-800-BANKING" },
                        { text: "Always here to help" }
                    ]}
                    icon={<IoCall />}
                    style={{
                        backgroundColor:"#9334EA"
                    }}
                />
            </div>
        </div>
    )
}