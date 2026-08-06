import { HeroSection } from "../../components/home/HeroSection";
import { RateSection } from "../../components/home/RateSection";
import { ServiceSection } from "../../components/home/ServiceSection";
import { CallToActionSection } from "../../components/home/CallToActionSection";
import { FeatureSection } from "../../components/home/FeatureSection";
import { ReviewSection } from "../../components/home/ReviewSection";
import { ContactDetailSection } from "../../components/contact/ContactDetailSection";

import "../../styles/home/callToActionSection.css";
import "../../styles/home/featureSection.css";
import "../../styles/home/heroSection.css";
import "../../styles/home/rateSection.css";
import "../../styles/home/reviewSection.css";
import "../../styles/home/serviceSection.css";


export function Home() {
    return (
        <>
            <title>Columbia Merchant | Home</title>
            <HeroSection />
            <RateSection />
            <ServiceSection />
            <CallToActionSection />
            <FeatureSection />
            <ReviewSection />
            <ContactDetailSection />
        </>
    )
}