export function FeatureCard({featureIcon, featureName, featureDetails}) {
    return (
        <div className="feature-card">
            <div className="feature-icon">
                {featureIcon}
            </div>
            <div className="feature-details">
                <h3>{featureName}</h3>
                <p>{featureDetails}</p>
            </div>
        </div>
    )
}