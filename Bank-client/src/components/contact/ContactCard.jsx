export function ContactCard({contactIcon, contactTitle, contactDetails}) {
    return (
        <div className="contact-card">
            <div className="contact-icon">
                {contactIcon}
            </div>
            <h3>{contactTitle}</h3>
            <p>
                {contactDetails.map((detail, index) => (
                    <span key={index}>
                        {detail}
                        {index < contactDetails.length - 1 && <br />}
                    </span>
                ))}
            </p>
        </div>
    )
}