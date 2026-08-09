import { StatCard } from "./StatCard"
import { FaCreditCard, FaHourglass } from "react-icons/fa"


export function CardStats() {
    const statDatas = [
        {
            icon: <FaCreditCard className="text-text" size={25} />,
            title: "Active Cards",
            number: 0,
            className: "bg-orange-500"
        },
        {
            icon: <FaHourglass className="text-text" size={25}/>,
            title: "Pending Application",
            number: 0,
            className: "bg-green-500"
        }
    ]
    return (
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-4 grid-cols-1" >
            {statDatas.map((statData, index) => (
                <StatCard key={index} {...statData}/>
            ))}
        </div>
    )
}