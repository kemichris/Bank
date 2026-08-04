export function HeroCard({cardTexts, icon, style}) {
    return (
        <div className="hero-card" style={style}>
            <div className="hero-card-text">
                {cardTexts.map((cardText, index) => (
                    <p key={index + 1}>{cardText.text}</p>
                ))}
            </div>
            <div className="hero-card-icon">
                {icon}
            </div>
        </div>
    )
}