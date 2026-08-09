import { FaArrowLeft } from "react-icons/fa";


import { CardsHeader } from "../../components/cards/CardsHeader"
import { CardRequestForm } from "../../components/cards/CardRequestForm";

export function CardApplication() {
    return (
        <>
            <title>Columbia Merchant | Card Application</title>
            <CardsHeader
                cardHeader='Apply for Virtual Card'
                headerDetail='Get instant access to a virtual card for online payments'
                to='/dashboard/card'
                icon={<FaArrowLeft />}
                linkText="Back to Card"
            />

            <CardRequestForm />
        </>
    )
}