import { Link } from "react-router-dom"
import { IoSparkles } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";

import { Button } from "../common/Button"
import Logo from "../../assets/images/neon-logo.png"

export function Navbar() {
    return (
        <nav className="nav-bar">
            <img src={Logo} alt="logo" className="logo" />
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/services">Services <FaAngleDown /></Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
            <div className="nav-right">
                <button className="theme-btn"><IoIosSettings /></button>
                <Link className="nav-login" to="/login">Login</Link>
                <Button
                    icon={<IoSparkles className="nav-btn-icon" />}
                    text="Open Account"
                    to="/register"
                    style={{
                        background: "linear-gradient(to right, #0CA1E5, #e5e7eb, #0CA1E5)"
                    }}
                />

            </div>

        </nav>
    )
}