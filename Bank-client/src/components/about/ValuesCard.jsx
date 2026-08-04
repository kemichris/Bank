export function ValuesCard({icon, valueName, details}) {
    return (
        <div className="values-card">
            <div className="values-icon">
                {icon}
            </div>
            <h3>{valueName}</h3>
            <p>{details}</p>
        </div>
    )
}