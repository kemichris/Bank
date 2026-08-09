import { Link } from "react-router-dom"
import { FaPlus } from "react-icons/fa"
export function CardBanner() {
    return (
        <div className="bg-linear-to-br from-primary-1 via-primary-2 to-surface-2 py-7 px-6 rounded-2xl mt-8">
            <h3 className=" text-2xl font-semibold text-white">Virtual Cards Made Easy</h3>
            <p className="text-text my-2">Create virtual cards for secure online payments, subscription management,
                and more. Enhanced security and spending control.
            </p>

            <div></div>
            <ul className="list-disc pl-4 flex flex-col gap-3 list-inside text-text my-6">
                <li>Protected payments</li>
                <li>World wide acceptance</li>
                <li>Spending limits</li>
                <li>Quick issuance </li>
            </ul>

            <Link to="/dashboard/card/application" className="w-fit mt-3 text-sm flex xl:hidden lg:hidden md:hidden px-3 py-2 rounded-2xl bg-linear-to-r from-surface-1 to-primary-1 items-center text-text gap-2 hover:scale-[.9] transition-transform">
                <FaPlus />
                Apply for Card
            </Link>


        </div>
    )
}