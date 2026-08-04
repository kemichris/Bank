import {SectionGuideCard} from "./SectionGuideCard";

import "../../styles/layout/sectionGuide.css";

export function SectionGuide({guideHeader, guideDescription, guides}) {
    return (
        <div className="section-guide">
            <h2>{guideHeader}</h2>
            <p className="guide-description">
                {guideDescription}
            </p>
            <div className="section-guide-cards">
                {guides.map((guide, index) => (
                    <SectionGuideCard
                        key={index}
                        icon={guide.icon}
                        guideName={guide.guideName}
                        details={guide.details}
                    />
                ))}
            </div>
        </div>

    );
}