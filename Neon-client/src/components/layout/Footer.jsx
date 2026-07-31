import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FooterLinks } from "./FooterLinks";
import Logo from "../../assets/images/neon-logo.png";

export function Footer() {
    return (
        <footer>
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

                <FooterLinks
                    linkHeader="Quick Links"
                    links={[
                        { text: "About Us", to: "/about" },
                        { text: "Services", to: "/services" },
                        { text: "Grant & Aid", to: "/grant" },
                        { text: "Contact", to: "/contact" }
                    ]}
                />
                <FooterLinks
                    linkHeader="Services"
                    links={[
                        { text: "Personal Banking", to: "/about" },
                        { text: "Business Banking", to: "/services" },
                        { text: "Loans and Credit", to: "/grant" },
                        { text: "Cards", to: "/contact" }
                    ]}
                />
                <FooterLinks
                    linkHeader="Member Services"
                    links={[
                        { text: "Online Banking", to: "/about" },
                        { text: "Mobile App", to: "/services" },
                        { text: "ATM Locations", to: "/grant" },
                        { text: "Security Center", to: "/contact" }
                    ]}
                />
            </div>
            <div className="bottom-footer">
                <p>© {new Date().getFullYear()} Nexavaultnv. All rights reserved.</p>
                <p><FaShieldAlt /> FDIC Insured.  <FaLock /> 256-bit SSL</p>
            </div>
            <Link to="">Privacy Policy</Link>
            <Link to="">Terms of Service</Link>
            <Link to="">Accessibility</Link>
        </footer>
    )
}










