import { BiSolidDish } from "react-icons/bi";
import { CiBank } from "react-icons/ci";
import { FaCreditCard } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { SectionHeader } from "../ui/SectionHeader"
import { ServiceCard } from "./ServiceCard";


export function ServiceSection() {
    return (
        <div className="service-section">
            <SectionHeader icon={<BiSolidDish />} title="Our Services"
                style={{
                    background: "rgb(255 255 255 / 0.2)",
                    border: "1px solid rgb(255 255 255 / 0.2)",
                    color: "#fff"
                }}
            />
            <h2>How Can We Help You Today?</h2>
            <p className="service-p">Comprehensive banking solutions tailored to your needs</p>
            <div className="service-cards">
                <ServiceCard
                    icon={<CiBank />}
                    serviceName="Deposit Accounts"
                    details="Secure your money with our high-yield savings and checking accounts designed for growth."
                />
                <ServiceCard
                    icon={<FaCreditCard />}
                    serviceName="Credit Cards"
                    details="Find the perfect credit card for your lifestyle and spending habits with competitive rates."
                />
                <ServiceCard
                    icon={<MdHome />}
                    serviceName="Loans"
                    details="Get competitive rates on personal, auto, and home loans tailored to your financial goals."
                />
                <ServiceCard
                    icon={<FaBriefcase />}
                    serviceName="Business Banking"
                    details="Comprehensive banking solutions designed to help your business thrive and grow."
                />
                <ServiceCard
                    icon={<FaChartPie />}
                    serviceName="Wealth & Retire"
                    details="Plan for your future with our expert investment and retirement planning services."
                />
                <ServiceCard
                    icon={<FaInfoCircle />}
                    serviceName="About Neon Bank"
                    details="Learn more about our commitment to exceptional banking services and community support."
                />
            </div>
        </div>
    )
}



