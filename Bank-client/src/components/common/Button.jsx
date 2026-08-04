import { Link } from "react-router-dom";

export function Button({ icon, text, style, to }) {
    return (
        <Link className="btn"
            to={to}
            className="btn"
            style={style}
        >
            {icon}
            {text}
        </Link>
    );
}