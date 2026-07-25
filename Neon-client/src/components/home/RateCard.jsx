export function RateCard({ rateIcon, rate, rateReturn, rateName, rateInfo, badgeIcon, badgeName, style }) {
    return (
        <div className="rate-card" >
            <div className="rate-icon" style={style}>
                {rateIcon}
            </div>
            <div className="rate-card-details">
                <h4>{rate}</h4>
                <p>{rateReturn}</p>
                <p>{rateName}</p>
                <small>{rateInfo}</small>
                <p style={style}>{badgeIcon} {badgeName}</p>
            </div>

        </div>
    )
}