import { BsBank } from "react-icons/bs";
import { FaPiggyBank } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaCertificate } from "react-icons/fa";
import { FaUmbrella } from "react-icons/fa";
import { BsPersonStanding } from "react-icons/bs";


import { AccountTypeSection } from "./AccountTypeSection";

export function PersonalAccount() {
    const personalAccountData = {
        accountTypeName: "Personal Account",
        accountTypeDescription: "Choose from our range of personal account types designed to meet your unique banking needs. Each account type offers distinct features and benefits to help you manage your finances effectively.",
        accountTypes: [
            {
                icon: <BsBank />,
                cardTypeName: "Checking Account",
                description: "Everyday banking made easy with no monthly fees and unlimited transactions.",
                details: [
                    "No monthly maintenance fee",
                    "Free online and mobile banking",
                    "Free debit card",
                    "Overdraft protection available"
                ]
            },
            {
                icon: <FaPiggyBank />,
                cardTypeName: "High-Yield Savings",
                description: "Grow your savings with competitive interest rates and easy access to your funds.",
                details: [
                    "Competitive interest rates",
                    "No monthly maintenance fees",
                    "FDIC insured up to $250K",
                    "Access to online and mobile banking"
                ]
            },
            {
                icon: <FaMoneyBillTrendUp />,
                cardTypeName: "Money Market",
                description: "Access to higher interest rates with limited check-writing privileges.",
                details: [
                    "Higher interest rates",
                    "Limited check-writing privileges",
                    "$2,500 minimum balance",
                    "Debit card access available"
                ]
            },
            {
                icon: <FaCertificate />,
                cardTypeName: "Certificates of Deposit (CDs)",
                description: "Lock in your savings for a fixed term and earn guaranteed interest.",
                details: [
                    "Fixed interest rates",
                    "Flexible terms from 3 months to 5 years",
                    "$1,000 minimum deposit",
                    "Early withdrawal penalties apply"
                ]
            },
            {
                icon: <FaUmbrella />,
                cardTypeName: "Individual Retirement Accounts (IRAs)",
                description: "Plan for your future with tax-advantaged retirement savings options.",
                details: [
                    "Traditional and Roth IRA options",
                    "Tax-deferred growth",
                    "Flexible contribution limits",
                    "Wide range of investment options"
                ] 
            },
            {
                icon: <BsPersonStanding />,
                cardTypeName: "Youth Accounts",
                description: "Designed for students to manage their finances with ease and convenience.",
                details: [
                    "No monthly maintenance fees",
                    "Ages 13-17 eligible",
                    "Parent/guardian oversight",
                    "Overdraft protection available"
                ]
            }
        ]
    }

    return (
        <>
            <AccountTypeSection
                accountTypeName={personalAccountData.accountTypeName}
                accountTypeDescription={personalAccountData.accountTypeDescription}
                accountTypes={personalAccountData.accountTypes}
            />
        </>
    )
}