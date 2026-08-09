import { Link } from "react-router-dom"
import { FaPlus } from "react-icons/fa"
import { NoCard } from "./NoCard"
import { CreditCard } from "./CreditCard"

export function CardListings({ cards }) {


    return (
        <div className="bg-surface-2 rounded-2xl border border-border py-6 mt-8 " >
            <div className="flex justify-between items-center pb-4 px-6 border-b border-border">
                <h3 className="text-text font-semibold text-xl">Your Cards</h3>
                <Link to="/dashboard/card/apply" className="flex items-center gap-2 text-text text-sm hover:scale-[.9] transition-transform">
                    <FaPlus />

                    Apply for Card
                </Link>

            </div>
            <div className={`${cards.length > 0 ? 'px-4 py-6 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5' : ''}`}>
                {cards.length > 0 ? (
                    cards.map(card => (

                        <CreditCard
                            key={card._id}
                            cardNumber={card.cardNumber}
                            cardHolder={card.cardHolderName}
                            expires={`${String(card.expiryMonth).padStart(2, '0')}/${String(card.expiryYear).slice(-2)}`}
                            cvv={card.cvv}
                            type={card.brand}
                        />

                    ))

                ) : (
                    <NoCard />
                )}
            </div>






        </div>
    )
}