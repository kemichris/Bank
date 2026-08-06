import { HeroSection } from "../../components/home/HeroSection";
import { RateSection } from "../../components/home/RateSection";
import { ServiceSection } from "../../components/home/ServiceSection";
import { CallToActionSection } from "../../components/home/CallToActionSection";
import { FeatureSection } from "../../components/home/FeatureSection";
import { ReviewSection } from "../../components/home/ReviewSection";
import { ContactDetailSection } from "../../components/contact/ContactDetailSection";

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