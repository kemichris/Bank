import "../../styles/policies/privacySection.css";

export function PrivacySection() {
    const lastUpdated = new Date();
    lastUpdated.setDate(lastUpdated.getDate() - 5);

    const formattedDate = lastUpdated.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return (
        <div className="privacy-section">
            <div className="privacy-section-container">
                <div className="policy-section">
                    <h2>1. Information We Collect</h2>
                    <p>
                        Nexavaultnv collects information to provide better services to our
                        customers. We collect information in the following ways:
                    </p>

                    <ul>
                        <li>
                            <strong>Personal Information:</strong> Name, address, phone number,
                            email address, Social Security number, and other identifying
                            information.
                        </li>

                        <li>
                            <strong>Financial Information:</strong> Account balances, payment
                            history, credit information, and transaction details.
                        </li>

                        <li>
                            <strong>Technical Information:</strong> IP address, browser type,
                            device information, and usage data.
                        </li>

                        <li>
                            <strong>Communication Records:</strong> Records of your
                            communications with us, including phone calls and emails.
                        </li>
                    </ul>
                </div>

                <div className="policy-section">
                    <h2>2. How We Use Your Information</h2>

                    <p>We use the information we collect to:</p>

                    <ul>
                        <li>Provide and maintain our banking services.</li>
                        <li>Process transactions and manage your accounts.</li>
                        <li>Comply with legal and regulatory requirements.</li>
                        <li>Prevent fraud and enhance security.</li>
                        <li>Improve our services and customer experience.</li>
                        <li>Communicate with you about your accounts and services.</li>
                    </ul>
                </div>

                <div className="policy-section">
                    <h2>3. Information Sharing</h2>

                    <p>
                        We do not sell, rent, or trade your personal information. We may share
                        your information only in the following circumstances:
                    </p>

                    <ul>
                        <li>With your consent or at your direction.</li>
                        <li>With service providers who assist us in our operations.</li>
                        <li>To comply with legal obligations or court orders.</li>
                        <li>To protect our rights, property, or safety.</li>
                        <li>In connection with a merger, acquisition, or sale of assets.</li>
                    </ul>
                </div>

                <div className="policy-section">
                    <h2>4. Data Security</h2>

                    <p>
                        We implement robust security measures to protect your information:
                    </p>

                    <ul>
                        <li>
                            <strong>Encryption:</strong> All sensitive data is encrypted in
                            transit and at rest.
                        </li>

                        <li>
                            <strong>Access Controls:</strong> Strict access controls limit who
                            can view your information.
                        </li>

                        <li>
                            <strong>Monitoring:</strong> Continuous monitoring for suspicious
                            activities.
                        </li>

                        <li>
                            <strong>Regular Audits:</strong> Regular security audits and
                            assessments.
                        </li>
                    </ul>
                </div>

                <div className="policy-section">
                    <h2>5. Your Rights and Choices</h2>

                    <p>
                        You have the following rights regarding your personal information:
                    </p>

                    <ul>
                        <li>Access and review your personal information.</li>
                        <li>Request corrections to inaccurate information.</li>
                        <li>Opt out of certain communications.</li>
                        <li>
                            Request deletion of your information (subject to legal
                            requirements).
                        </li>
                        <li>File a complaint with regulatory authorities.</li>
                    </ul>
                </div>

                <div className="policy-section">
                    <h2>6. Cookies and Tracking Technologies</h2>

                    <p>
                        We use cookies and similar technologies to enhance your experience on
                        our website. These technologies help us:
                    </p>

                    <ul>
                        <li>Remember your preferences and settings.</li>
                        <li>Analyze website traffic and usage patterns.</li>
                        <li>Provide personalized content and advertisements.</li>
                        <li>Improve website functionality and performance.</li>
                    </ul>
                </div>

                <div className="policy-section">
                    <h2>7. Third-Party Services</h2>

                    <p>
                        Our website may contain links to third-party websites or services. We
                        are not responsible for the privacy practices of these third parties.
                        We encourage you to review their privacy policies.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>8. Children's Privacy</h2>

                    <p>
                        Our services are not intended for children under 13 years of age. We
                        do not knowingly collect personal information from children under 13.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>9. Changes to This Policy</h2>

                    <p>
                        We may update this Privacy Policy from time to time. We will notify
                        you of any material changes by posting the new policy on our website
                        and updating the "Last Updated" date.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>10. Contact Us</h2>

                    <p>
                        If you have any questions about this Privacy Policy or our privacy
                        practices, please contact us:
                    </p>

                    <p>
                        <strong>Privacy Officer</strong>
                    </p>

                    <p>Email: support@nexavaultnv.live</p>
                    <p>Phone: 1-800-BANKING</p>
                    <p>
                        Address: 123 Banking Street, Financial District, New York, NY 10001
                    </p>
                </div>

                <p className="last-updated">
                    <strong>Last Updated:</strong> {formattedDate}
                </p>
            </div>
        </div>
    );
}
