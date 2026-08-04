import { BsBank } from "react-icons/bs";
import { FaPiggyBank } from "react-icons/fa";
import { FaHandshakeSimple } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import { TbDeviceAnalytics } from "react-icons/tb";

import { AccountTypeSection } from "./AccountTypeSection";

export function BusinessAccount() {
    const businessAccountData = {
        accountTypeName: "Business Banking Services",
        accountTypeDescription: "Everything you need to manage your business finances effectively. Our business banking services are designed to help you streamline your operations, access capital, and grow your business.",
        accountTypes: [
            {
                icon: <BsBank />,
                cardTypeName: "Business Checking",
                description: "Manage your day-to-day business transactions with ease and convenience.",
                details: [
                    "No monthly maintenance fee",
                    "Free online and mobile banking",
                    "Unlimited transactions",
                ]
            },
            {
                icon: <FaPiggyBank />,
                cardTypeName: "Business Savings",
                description: "Grow your business savings with competitive interest rates to help your business reach its financial goals.",
                details: [
                    "Competitive interest rates",
                    "No monthly maintenance fees",
                    "FDIC insured",
                ]
            },
            {
                icon: <FaHandshakeSimple />,
                cardTypeName: "Business Loans",
                description: "Access the capital you need to grow your business with flexible loan options and competitive rates.",
                details: [
                    "Flexible loan terms",
                    "Competitive interest rates",
                    "Quick approval process",
                ]
            },
            {
                icon: <FaCreditCard />,
                cardTypeName: "Merchant Services",
                description: "Process payments efficiently and securely with our comprehensive merchant solutions.",
                details: [
                    "Competitive pricing",
                    "Quick setup and deployment",
                    "Integrated payment processing"
                ]
            },
            {
                icon: <TbDeviceAnalytics />,
                cardTypeName: "Cash Management",
                description: "Optimize your cash flow and manage your business finances with our advanced cash management solutions.",
                details: [
                    "Real-time cash position visibility",
                    "Automated reconciliation",
                    "Wire Transfers",
                ] 
            },
            {
                icon: <FaCreditCard />,
                cardTypeName: "Business Credit Cards",
                description: "Manage your business expenses with flexible credit solutions.",
                details: [
                    "Competitive interest rates",
                    "No annual fees",
                    "Comprehensive fraud protection",
                    "Easy expense tracking"
                ]
            }
        ]
    }

    return (
        <>
            <AccountTypeSection
                accountTypeName={businessAccountData.accountTypeName}
                accountTypeDescription={businessAccountData.accountTypeDescription}
                accountTypes={businessAccountData.accountTypes}
            />
        </>
    )
}