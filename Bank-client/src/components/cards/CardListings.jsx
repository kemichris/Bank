import { Link } from "react-router-dom"
import { FaPlus } from "react-icons/fa"
import { NoCard } from "./NoCard"

export function CardListings() {
    return (
        <div className="bg-surface-2 rounded-2xl border border-border py-6 mt-8 " >
            <div className="flex justify-between items-center pb-4 px-6 border-b border-border">
                <h3 className="text-text font-semibold text-xl">Your Cards</h3>
                <Link to="/dashboard/card/application" className="flex items-center gap-2 text-text text-sm hover:scale-[.9] transition-transform">
                    <FaPlus />
                    Apply for Card
                </Link>

            </div>

            <NoCard />

        </div>
    )
}