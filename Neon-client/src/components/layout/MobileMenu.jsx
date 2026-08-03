import { Link } from 'react-router-dom';
import { useState } from 'react';

import { FaAngleDown } from 'react-icons/fa';
import { IoMdHome } from 'react-icons/io';
import { FaInfoCircle } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { IoMdMail } from 'react-icons/io';
import { TbSettingsCog } from 'react-icons/tb';

export function MobileMenu({open, onClose}) {
    const [servicesOpen, setServicesOpen] = useState(false);

    return (
        <div className={`mobile-menu ${open ? 'active' : ''}`}>
            <ul>
                <li>
                    <Link className="mobile-links"
                        to="/"
                        onClick={onClose}
                    >
                        <IoMdHome />
                        Home
                    </Link>
                </li>

                <li>
                    
                    <Link className="mobile-links"
                        to="/about"
                        onClick={onClose}
                    >
                        <FaInfoCircle />
                        About
                    </Link>
                </li>

                <li className="mobile-service-dropdown">
                    <button
                        className="mobile-service-dropdown-btn"
                        onClick={() =>
                            setServicesOpen(
                                !servicesOpen
                            )
                        }
                    >
                        <span>
                            <TbSettingsCog />
                            Services
                        </span>

                        <FaAngleDown
                            className={
                                servicesOpen
                                    ? 'rotate'
                                    : ''
                            }
                        />
                    </button>

                    <div
                        className={`mobile-submenu ${servicesOpen
                                ? 'active'
                                : ''
                            }`}
                    >
                        <Link 
                            to="/personal-banking"
                            onClick={onClose}
                        >
                            Personal Banking
                        </Link>

                        <Link
                            to="/business-banking"
                            onClick={onClose}
                        >
                            Business Banking
                        </Link>

                        <Link
                            to="/loans"
                            onClick={onClose}
                        >
                            Loans & Credit
                        </Link>

                        <Link
                            to="/cards"
                            onClick={onClose}
                        >
                            Cards
                        </Link>

                        <Link
                            to="/grants"
                            onClick={onClose}
                        >
                            Grants & Aid
                        </Link>
                    </div>
                </li>

                <li>
                    

                    <Link className="mobile-links"
                        to="/contact"
                        onClick={onClose}
                    >
                        <IoMdMail />
                        Contact
                    </Link>
                </li>
            </ul>

            <div className="mobile-bottom">
                <button className="mobile-theme-switch-btn">
                    <IoMdSettings />
                    Switch to Light Mode
                </button>
            </div>
        </div>
    );
}