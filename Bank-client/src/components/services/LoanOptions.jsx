import { FaHome } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { MdMapsHomeWork } from "react-icons/md";



import { AccountTypeSection } from "./AccountTypeSection";

export function LoanOptions() {
    const loanOptionsData = {
        accountTypeName: "Loan Options",
        accountTypeDescription: "Find the right loan solution for your personal or business needs.",
        accountTypes: [
            {
                icon: <FaHome />,
                cardTypeName: "Home Loans",
                description: "competitive mortgage options to help you purchase or refinance your home with ease.",
                details: [
                    "Interest Rate: From 3.25 % APR",
                    "Loan Amount: Up to $1M",
                    "Term: 15 - 30 years"
                ]
            },
            {
                icon: <FaCar />,
                cardTypeName: "Auto Loans",
                description: "Finance your dream car with competitive auto loan options and flexible terms.",
                details: [
                    "Interest Rate: From 2.99% APR",
                    "Loan Amount: Up to $100K",
                    "Term: 3 - 7 years"
                ]
            },
            {
                icon: <FaUser />,
                cardTypeName: "Personal Loans",
                description: "Flexible personal loan options to help you cover unexpected expenses or consolidate debt.",
                details: [
                    "Interest Rate: From 5.99% APR",
                    "Loan Amount: Up to $50k",
                    "Term: 3 - 7 years"
                ]
            },
            {
                icon: <FaBriefcase />,
                cardTypeName: "Business Loans",
                description: "Access the capital you need to grow your business with flexible loan options and competitive rates.",
                details: [
                    "Interest Rate: From 3.99% APR",
                    "Loan Amount: Up to $5M",
                    "Term: 1 - 20 years"
                ]
            },
            {
                icon: <FaUserGraduate />,
                cardTypeName: "Student Loans",
                description: "Finance your education with flexible student loan options and competitive rates.",
                details: [
                    "Interest Rate: From 2.99% APR",
                    "Loan Amount: Up to $200K",
                    "Term: 10 - 25 years"
                ]
            },
            {
                icon: <MdMapsHomeWork />,
                cardTypeName: "Home Equity",
                description: "Tap into your home's equity for major expenses or investments.",
                details: [
                    "Interest Rate: From 4.59% APR",
                    "Loan Amount: Up to $500K",
                    "Term: 5 - 30 years"
                ]
            }
        ]
    }

    return (
        <>
            <AccountTypeSection
                accountTypeName={loanOptionsData.accountTypeName}
                accountTypeDescription={loanOptionsData.accountTypeDescription}
                accountTypes={loanOptionsData.accountTypes}
            />
        </>
    )
}