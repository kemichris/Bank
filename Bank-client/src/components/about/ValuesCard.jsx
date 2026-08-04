export function ValuesCard({icon, valueName, details}) {
    return (
        <div className="value-card">
            <div className="value-icon">
                {icon}
            </div>
            <h3>{valueName}</h3>
            <p>{details}</p>
        </div>
    )
}