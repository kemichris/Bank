import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FooterLinks } from "./FooterLinks";
import Logo from "../../assets/images/cm-logo.png";

import "../../styles/layout/footer.css";

export function Footer() {
    const footerDetails = [
        {
            linkHeader: "Quick Links",
            links: [
                { text: "About Us", to: "/about" },
                { text: "Login", to: "/login" },
                // { text: "Grant & Aid", to: "/grant" },
                { text: "Contact", to: "/contact" }
            ]
        },
        {
            linkHeader: "Services",
            links: [
                { text: "Personal Banking", to: "/personal-banking" },
                { text: "Business Banking", to: "/business-banking" },
                { text: "Loans and Credit", to: "/loans" },
                { text: "Cards", to: "/login" }
            ]
        },
        {
            linkHeader: "Data Policies",
            links: [
                { text: "Privacy Policy", to: "/privacy" },
                { text: "Terms of Service", to: "/terms" },
            ]
        }

    ]

    return (
        <footer className="footer">
            <div className="main-footer-content">
                <div className="company-info">
                    <img className="footer-logo" src={Logo} alt="" />
                    <p>Building financial strength together with personalized banking solutions
                        for every member. Your trusted partner in financial growth.
                    </p>
                    <div className="social-links">
                        <a href="http://" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
                        <a href="http://" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="http://" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                        <a href="http://" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                    </div>
                </div>


                {
                    footerDetails.map((footerDetail, index) => (
                        <FooterLinks
                            key={index}
                            {...footerDetail}
                        />
                    ))
                }

            </div>
            <div className="bottom-footer">
                <p>© {new Date().getFullYear()} Columbia Merchant. All rights reserved.</p>
                <p><FaShieldAlt /> FDIC Insured.  <FaLock /> 256-bit SSL</p>
            </div>
        </footer>
    )
}










