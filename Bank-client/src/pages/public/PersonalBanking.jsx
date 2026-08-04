

import {Navbar} from "../../components/layout/Navbar";
import {PageHeader} from "../../components/layout/PageHeader";
import {BankingServiceSection} from "../../components/services/BankingServiceSection";
import {PageCta} from "../../components/layout/PageCta";
import {Footer} from "../../components/layout/Footer";
import { FaUser } from "react-icons/fa";

import { PersonalAccount } from "../../components/services/PersonalAccount";


export function PersonalBanking() {
   
    return (
        <>
            <title>Columbia Merchant | Personal Banking</title>
            <Navbar />
            <PageHeader
                icon={<FaUser />}
                header="Personal Banking"
                title="Experience the Future of Personal Banking"
                description="Discover our innovative personal banking solutions designed to simplify your financial life."
            />
            <PersonalAccount />
            <BankingServiceSection />
            <PageCta />
            <Footer />
        </>
    );
}