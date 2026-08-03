import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IoSparkles } from 'react-icons/io5';
import { IoIosSettings } from 'react-icons/io';
import { FaAngleDown } from 'react-icons/fa';
import { HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2';

import { Button } from '../common/Button';
import { MobileMenu } from './MobileMenu';

import Logo from '../../assets/images/neon-logo.png';

export function Navbar() {
    const [activeMenu, setActiveMenu] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <nav className="nav-bar">

                <img
                    src={Logo}
                    alt="Logo"
                    className="logo"
                />

                {/* Desktop Navigation */}
                <ul className="desktop-nav">

                    <li>
                        <Link to="/">Home</Link>
                    </li>

                    <li>
                        <Link to="/about">About</Link>
                    </li>

                    <li
                        className="dropdown-parent"
                        onMouseEnter={() => setActiveMenu('services')}
                        onMouseLeave={() => setActiveMenu(null)}
                    >
                        <button className="nav-link-btn">
                            Services
                            <FaAngleDown />
                        </button>

                        <div
                            className={`dropdown ${
                                activeMenu === 'services'
                                    ? 'active'
                                    : ''
                            }`}
                        >
                            <Link to="/personal-banking">
                                Personal Banking
                            </Link>

                            <Link to="/business-banking">
                                Business Banking
                            </Link>

                            <Link to="/loans">
                                Loans & Credit
                            </Link>

                            <Link to="/cards">
                                Cards
                            </Link>

                            <Link to="/grants">
                                Grants & Aid
                            </Link>

                        </div>

                    </li>

                    <li>
                        <Link to="/contact">
                            Contact
                        </Link>
                    </li>

                </ul>

                {/* Desktop Right */}
                <div className="nav-right">

                    <button className="theme-btn">
                        <IoIosSettings />
                    </button>

                    <Link
                        className="nav-login"
                        to="/login"
                    >
                        Login
                    </Link>

                    <Button
                        icon={
                            <IoSparkles className="nav-btn-icon" />
                        }
                        text="Open Account"
                        to="/register"
                        style={{
                            background:
                                'linear-gradient(to right, #0184C7, #e5e7eb, #0184C7)',
                            color: '#111827'
                        }}
                    />

                </div>

                {/* Mobile Menu Button */}
                <button
                    className="menu-btn"
                    onClick={() =>
                        setMenuOpen(!menuOpen)
                    }
                >
                    {menuOpen
                        ? <HiOutlineXMark />
                        : <HiOutlineBars3 />}
                </button>

            </nav>

            {/* Mobile Menu */}
            <MobileMenu
                open={menuOpen}
                onClose={closeMenu}
            />
        </>
    );
}