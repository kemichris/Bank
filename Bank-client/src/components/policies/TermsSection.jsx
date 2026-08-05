import "../../styles/policies/privacySection.css";

export function TermsSection() {
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
                    <h2>1. Acceptance of Terms</h2>

                    <p>
                        By accessing and using Columbia Merchant banking services, you accept and
                        agree to be bound by the terms and provisions of this agreement.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>2. Account Opening and Maintenance</h2>

                    <p>To open an account with Columbia Merchant Bank, you must:</p>

                    <ul>
                        <li>Be at least 18 years of age.</li>
                        <li>Provide accurate and complete information.</li>
                        <li>Maintain the security of your account credentials.</li>
                        <li>Comply with all applicable laws and regulations.</li>
                    </ul>
                </div>

                <div className="policy-section">
                    <h2>3. Account Security</h2>

                    <p>
                        You are responsible for maintaining the confidentiality of your account
                        information and password. You agree to notify us immediately of any
                        unauthorized use of your account.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>4. Services and Fees</h2>

                    <p>
                        Columbia Merchant Bank provides various banking services including but not limited
                        to:
                    </p>

                    <ul>
                        <li>Savings and checking accounts.</li>
                        <li>Online and mobile banking.</li>
                        <li>Loan services.</li>
                        <li>Investment products.</li>
                        <li>Credit cards.</li>
                    </ul>
                </div>

                <div className="policy-section">
                    <h2>5. Privacy and Data Protection</h2>

                    <p>
                        We are committed to protecting your privacy and personal information.
                        Please review our Privacy Policy for detailed information about how we
                        collect, use, and protect your data.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>6. Electronic Communications</h2>

                    <p>
                        By using our services, you consent to receive communications from us
                        electronically, including account statements, notices, and other
                        disclosures.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>7. Limitation of Liability</h2>

                    <p>
                        Columbia Merchant Bank shall not be liable for any indirect, incidental, special,
                        consequential, or punitive damages arising from your use of our
                        services.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>8. Modifications to Terms</h2>

                    <p>
                        We reserve the right to modify these terms at any time. We will notify
                        you of any changes by posting the new terms on our website.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>9. Governing Law</h2>

                    <p>
                        These terms shall be governed by and construed in accordance with the
                        laws of the jurisdiction in which Columbia Merchant Bank operates.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>10. Contact Information</h2>

                    <p>
                        If you have any questions about these Terms of Service, please contact
                        us at:
                    </p>

                    <p>Email: support@Columbia Merchant Bank.live</p>
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
