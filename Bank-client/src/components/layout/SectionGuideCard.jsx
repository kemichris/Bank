export function SectionGuideCard({icon, guideName, details}) {
    return (
        <div className="section-guide-card">
            <div className="guide-icon">
                {icon}
            </div>
            <h3>{guideName}</h3>
            <p>{details}</p>
        </div>
    )
}