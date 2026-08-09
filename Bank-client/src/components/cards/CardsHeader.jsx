import { FaCreditCard } from "react-icons/fa"
import { Link } from "react-router-dom"
import { FaPlus } from "react-icons/fa"

export function CardsHeader() {
    return (
        <div className="mb-8 flex justify-between items-center">
            <div  className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-sky-500 w-fit">
                    <FaCreditCard className="text-text" size={25}/>
                </div>
                
                <div>
                    <h2 className='text-text text-left text-xl'>Virtual Cards</h2>
                    <p className="text-text-muted  text-sm">Secure virtual cards for online payments and subscriptions</p>
                </div>
            </div>
            <Link to="/dashboard/card/application" className="hidden xl:flex lg:flex md:flex px-3 py-2 rounded-2xl bg-sky-500 items-center text-text gap-2 hover:scale-[.9] transition-transform">
                <FaPlus />
                Apply for Card
            </Link>

        </div>
    )
}