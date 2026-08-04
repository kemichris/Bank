import { Link } from "react-router-dom";

export function FooterLinks({ linkHeader, links }) {
    return (
        <div className="footer-links">
            <h4>{linkHeader}</h4>

            <ul>
                {links.map((link) => (
                    <li key={link.to}>
                        <Link to={link.to}>
                            {link.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}