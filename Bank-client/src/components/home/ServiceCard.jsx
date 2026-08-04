export function ServiceCard({icon, serviceName, details}) {
    return (
        <div className="service-card">
            <div className="service-icon">
                {icon}
            </div>
            <h3>{serviceName}</h3>
            <p>{details}</p>
        </div>
    )
}