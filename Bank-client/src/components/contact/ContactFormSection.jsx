import { FaPaperPlane } from "react-icons/fa";

import "../../styles/contact/contactFormSection.css"
export function ContactFormSection() {
    return (
        <div className="contact-form-section">
            <h2>Send us a Message</h2>
            
            <form className="form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" name="fullName" placeholder="" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="" />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input type="text" id="subject" name="subject" placeholder="" />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="8"
                        placeholder=""
                    ></textarea>
                </div>

                <button type="submit">
                    <FaPaperPlane />
                    <span>Send Message</span>
                </button>
            </form>
        </div>
    )
}