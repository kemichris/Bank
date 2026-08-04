import { FaDollarSign } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { SectionHeader } from "../ui/SectionHeader"
import { Button } from "../common/Button"

import ActionImage from "../../assets/images/action-img.jpg"

export function CallToActionSection() {
    return (
        <div className="call-to-action-section">
            <img src={ActionImage} alt="" />
            <div className="call-to-action-details">
                <SectionHeader icon={<FaDollarSign />} title="Get $200* With a Checking Account Built for You" 
                style={{
                    background: "#1A3F32",
                    border: "1px solid ",
                    color: "rgb(134 239 172)",
                    width: "fit-content"
                }}
                />
                <h2>Start Building Your Financial Strength</h2>
                <p className="call-p">For a limited time, get a $200 when you open any new account,
                    and what helps you reach your financial goals.
                    You can open a new account online or in person at any of our locations.
                </p>
                <ul className="call-ul">
                    <li>No minimum balance required</li>
                    <li>Free online and mobile banking</li>
                    <li>24/7 customer support</li>
                </ul>
                <Button
                    icon={<FaArrowRight />}
                    text="Open Account Now"
                    to="/register"
                    style={{
                        backgroundColor: "#0184C7",
                        color: "#fff"
                    }}
                />
            </div>
        </div>
    )
}
