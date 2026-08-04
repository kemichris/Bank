import { RiExchangeFundsFill } from "react-icons/ri";
import { FaPiggyBank } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { GiSevenPointedStar } from "react-icons/gi";
import { FaCoins } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { FaInfoCircle } from "react-icons/fa";

import { SectionHeader } from "../ui/SectionHeader"
import { RateCard } from "./RateCard";


export function RateSection() {
    return (
        <div className="rate-section">
            <SectionHeader icon={<RiExchangeFundsFill />} title="Columbia Merchant Bank Rates" style={{
                backgroundColor: "#bae6fd",
                borderColor: "#70accb",
                color: "#111827"
            }} />
            <h2>Member Care</h2>
            <p className="rate-section-p">Discover competitive rates designed to help your money grow faster</p>

            <div className="rate-cards">
                <RateCard
                    rateIcon={<FaPiggyBank />}
                    rate="3.75%"
                    rateReturn="APY"
                    rateName="HIGH YIELD SAVINGS"
                    rateInfo="High Yield Savings Rate"
                    badgeIcon={<FaStar />}
                    badgeName="FEATURED"
                    style={{
                        backgroundColor: "#0184C7"
                    }}
                />
                <RateCard
                    rateIcon={<GiSevenPointedStar />}
                    rate="3.65%"
                    rateReturn="APY"
                    rateName="18 MONTH CERTIFICATE"
                    rateInfo="Columbia Merchant Certificate Rates"
                    badgeIcon={<FaCoins />}
                    badgeName="SAVINGS"
                    style={{
                        backgroundColor: "#1C3F43"
                    }}
                />
                <RateCard
                    rateIcon={<FaCreditCard />}
                    rate="4.00%"
                    rateReturn="APR"
                    rateName="CREDIT CARDS"
                    rateInfo="Columbia Merchant Credit Card Rates"
                    badgeIcon={<FaCreditCard />}
                    badgeName="CREDIT"
                    style={{
                        backgroundColor: "#3E2462"
                    }}
                />
                <RateCard
                    rateIcon={<GiReceiveMoney />}
                    rate="15.39%"
                    rateReturn="APR"
                    rateName="LOANS"
                    rateInfo="Columbia Merchant Standard Loan Rates"
                    badgeIcon={<GiReceiveMoney />}
                    badgeName="MORTGAGE"
                    style={{
                        backgroundColor: "#592F27"
                    }}
                />
            </div>

            <div className="rate-info">
                {<FaInfoCircle />}
                <p>Annual Percentage Yield. Rates subject to change. Terms and conditions apply.</p>
            </div>
        </div>
    )
}




