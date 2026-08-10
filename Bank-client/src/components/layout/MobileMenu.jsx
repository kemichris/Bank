import { Link } from "react-router-dom";
import { useState } from "react";

import { FaAngleDown, FaSignInAlt } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";

import { IoMdMail } from "react-icons/io";
import { TbSettingsCog } from "react-icons/tb";

import { FaUser } from "react-icons/fa";
import { IoBriefcaseSharp } from "react-icons/io5";
import { FaHandshake } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
// import { FaHandHoldingDollar } from "react-icons/fa6";

export function MobileMenu({ open, onClose }) {
    const [servicesOpen, setServicesOpen] = useState(false);

    return (
        <div className={`mobile-menu ${open ? "active" : ""}`}>
            <ul>
                <li>
                    <Link className="mobile-links" to="/" onClick={onClose}>
                        <IoMdHome />
                        Home
                    </Link>
                </li>

                <li>
                    <Link className="mobile-links" to="/about" onClick={onClose}>
                        <FaInfoCircle />
                        About
                    </Link>
                </li>

                <li className="mobile-service-dropdown">
                    <button
                        className="mobile-service-dropdown-btn"
                        onClick={() => setServicesOpen(!servicesOpen)}
                    >
                        <span>
                            <TbSettingsCog />
                            Services
                        </span>

                        <FaAngleDown className={servicesOpen ? "rotate" : ""} />
                    </button>

                    <div className={`mobile-submenu ${servicesOpen ? "active" : ""}`}>
                        <Link to="/personal-banking" onClick={onClose}>
                            <FaUser />
                            Personal Banking
                        </Link>

                        <Link to="/business-banking" onClick={onClose}>
                            <IoBriefcaseSharp />
                            Business Banking
                        </Link>

                        <Link to="/loans" onClick={onClose}>
                            <FaHandshake />
                            Loans & Credit
                        </Link>

                        <Link to="/login" onClick={onClose}>
                            <FaCreditCard />
                            Cards
                        </Link>

                        {/* <Link to="/grants" onClick={onClose}>
                            <FaHandHoldingDollar />
                            Grants & Aid
                        </Link> */}
                    </div>
                </li>

                <li>
                    <Link className="mobile-links" to="/contact" onClick={onClose}>
                        <IoMdMail />
                        Contact
                    </Link>
                </li>
            </ul>

            <div className="mobile-bottom">
                <Link to="/login" className="mobile-theme-switch-btn">
                    <FaSignInAlt />
                    Sign In
                </Link>
            </div>
        </div>
    );
}
