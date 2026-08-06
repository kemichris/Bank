import missionImage from "../../assets/images/about-mission.jpg"; 
import "../../styles/about/missionSection.css"

export function MissionSection() {
    return (
        <div className="mission-section">
            <div className="mission-content">
                <h2>Our Mission</h2>
                <p>
                    At Columbia Merchant, our mission is to revolutionize the banking experience by putting people first. 
                    We strive to provide innovative financial solutions that empower our customers 
                    to achieve their goals and dreams. Our commitment to transparency, accessibility, 
                    and exceptional service drives us to create a banking environment 
                    that is both welcoming and efficient.
                </p>

                <p>We believe that banking should be simple, secure, and accessible to everyone, 
                    which is why we continuously invest in technology and training to deliver 
                    the best possible experience for our customers.
                </p>
            </div>
            <img src={missionImage} alt="Our Mission"/>
        </div>
    );
}
       