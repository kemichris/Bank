import { RiUserAddFill } from "react-icons/ri";
import { IoCall } from "react-icons/io5";

import { Button } from "../common/Button"

export function PageCta() {
    return (
        <div className="page-cta">
            <h2>Ready to Get Started?</h2>
            <p>Join Columbia Merchant Bank today and experience a new way of banking that puts you first.</p>
            <div className="cta-buttons">
                <Button
                    icon={<RiUserAddFill />}
                    text="Open Account Today"
                    to="/register"
                    style={{
                        backgroundColor: "#0184C7",
                        color: "#e5e7eb"
                    }}
                />
                <Button
                    icon={<IoCall />}
                    text="Login to Banking"
                    to="/contact"
                    style={{
                        backgroundColor: "#1F2937",
                        color: "#e5e7eb",
                        border: "none"
                    }}
                />
            </div>
        </div>
    );
}