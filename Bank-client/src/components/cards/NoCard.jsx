import { Link } from "react-router-dom"
import { FaCreditCard } from "react-icons/fa"
import { FaPlus } from "react-icons/fa"

export function NoCard() {
    return (
        <div className="flex flex-col items-center py-8 px-4">
            <div className="p-2 rounded-lg bg-sky-500 w-fit mb-4">
                <FaCreditCard className="text-text" size={30} />
            </div>
            <h4 className="text-text font-semibold text-lg mb-4">No cards yet</h4>
            <p className="text-text-muted text-sm text-center mb-6">Get started by applying for your first virtual card. It only takes a few minutes!</p>
             <Link to="/dashboard/card/apply" className="w-fit mt-3 text-sm flex px-3 py-2 rounded-2xl bg-linear-to-r from-surface-1 to-primary-1 items-center text-text gap-2 hover:scale-[.9] transition-transform">
                <FaPlus />
                Apply for Card
            </Link>
        </div>
    )
}