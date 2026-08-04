export function AccountTypeCard({icon, cardTypeName, description, details}) {
    return (
        <div className="account-type-card">
            <div className="account-type-icon">{icon}</div>
            <h3>{cardTypeName}</h3>
            <p className="type-card-description">{description}</p>
            <ul className="account-type-details">
                {details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                ))}
            </ul>
        </div>
    );
}
       