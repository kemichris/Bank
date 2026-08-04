import { Navbar } from "../../components/layout/Navbar";
import { HeroSection } from "../../components/home/HeroSection";
import { RateSection } from "../../components/home/RateSection";
import { ServiceSection } from "../../components/home/ServiceSection";
import { CallToActionSection } from "../../components/home/CallToActionSection";
import { FeatureSection } from "../../components/home/FeatureSection";
import { ReviewSection } from "../../components/home/ReviewSection";
import { ContactSection } from "../../components/home/ContactSection";
import { Footer } from "../../components/layout/Footer";

export function Home() {
    return (
        <>
            <title>Columbia Merchant | Home</title>
            <Navbar />
            <HeroSection />
            <RateSection />
            <ServiceSection />
            <CallToActionSection />
            <FeatureSection />
            <ReviewSection />
            <ContactSection />
            <Footer />
        </>
    )
}