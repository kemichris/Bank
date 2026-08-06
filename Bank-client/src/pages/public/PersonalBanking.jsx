

import {PageHeader} from "../../components/layout/PageHeader";
import {BankingServiceSection} from "../../components/services/BankingServiceSection";
import {PageCta} from "../../components/layout/PageCta";
import { FaUser } from "react-icons/fa";

import { PersonalAccount } from "../../components/services/PersonalAccount";


export function PersonalBanking() {
   
    return (
        <>
            <title>Columbia Merchant | Personal Banking</title>
            <PageHeader
                icon={<FaUser />}
                header="Personal Banking"
                title="Experience the Future of Personal Banking"
                description="Discover our innovative personal banking solutions designed to simplify your financial life."
            />
            <PersonalAccount />
            <BankingServiceSection />
            <PageCta />
        </>
    );
}