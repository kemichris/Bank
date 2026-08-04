import { useEffect, useRef } from "react";
import { RiUserAddFill } from "react-icons/ri";
import { FiLogIn } from "react-icons/fi";
import { CiBank } from "react-icons/ci";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { IoCall } from "react-icons/io5";

import { Button } from "../common/Button"
import { HeroCard } from "./HeroCard";

export function HeroSection() {
    const heroCardsRef = useRef(null);

    useEffect(() => {
        const container = heroCardsRef.current;
        if (!container || window.innerWidth > 900) return;

        const intervalId = window.setInterval(() => {
            const cards = Array.from(container.children);
            if (!cards.length) return;

            const gap = parseFloat(getComputedStyle(container).gap) || 16;
            const cardWidth = cards[0].getBoundingClientRect().width + gap;
            const maxScrollLeft = container.scrollWidth - container.clientWidth;

            if (container.scrollLeft >= maxScrollLeft - 1) {
                container.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                container.scrollBy({ left: cardWidth, behavior: "smooth" });
            }
        }, 5000);

        return () => window.clearInterval(intervalId);
    }, []);

    return (
        <div className="hero-section">
            <h1>Columbia Merchant Bank</h1>
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
            <div className="hero-cards" ref={heroCardsRef}>
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