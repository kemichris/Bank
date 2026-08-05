import { FaHandshake } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { SectionHeader } from "../ui/SectionHeader";
import { FeatureCard } from "./FeatureCard";
import featureImg1 from "../../assets/images/feature-img1.avif"
import featureImg2 from "../../assets/images/feature-img2.avif"
import featureImg3 from "../../assets/images/feature-img3.avif"
import featureImg4 from "../../assets/images/feature-img4.avif"

export function FeatureSection() {
    return (
        <div className="feature-section">
            <div className="feature-details">
                <SectionHeader icon={<FaHandshake />} title="Member-Focused Banking"
                    style={{
                        background: "#0184C7",
                        border: "1px solid ",
                        color: "#fff",
                        width: "fit-content"
                    }}
                />
                <h2>Building Strength Together</h2>
                <p className="feature-p">Columbia Merchant Bank is a full-service credit union built on the foundation of
                    providing our members with every step of their financial journey.
                    We're committed to helping our members achieve their financial
                    goals through personalized service and competitive rates.
                </p>
                <div className="feature-cards">
                    <FeatureCard
                        featureIcon={<AiOutlineStock />}
                        featureName="Competitive Rates"
                        featureDetails="Better rates on savings, loans, and credit cards designed to maximize your financial growth."
                    />
                    <FeatureCard
                        featureIcon={<IoIosPeople />}
                        featureName="Member-Focused"
                        featureDetails="We're owned by our members, not shareholders. Your success is our priority."
                    />
                    <FeatureCard
                        featureIcon={<FaHeart />}
                        featureName="Community Committed"
                        featureDetails="Supporting local communities and causes that matter to our members."
                    />
                </div>

            </div>
            <div className="feature-images">
                <div className="column">
                    <div className="feature-image">
                        <img src={featureImg1} alt="" />
                    </div>

                    <div className="feature-image">
                        <img src={featureImg3} alt="" />
                    </div>
                </div>

                <div className="column">
                    <div className="feature-image">
                        <img src={featureImg2} alt="" />
                    </div>

                    <div className="feature-image">
                        <img src={featureImg4} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}






