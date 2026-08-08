import {
  FaChartLine,
  FaCreditCard,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

import { StatsCard } from './StatsCard';

export function StatsSection({statistics, account}) {

    const statDatas = [
        {
            icon: <FaCreditCard />,
            timeline: "Available",
            amount: account.limit, 
            stat: "Account Limit",
            bg:"bg-primary-2"
        },
        {
            icon: <FaArrowDown />,
            timeline: "This Month",
            amount: statistics.monthlyCredit, 
            stat: "Monthly Deposit",
            bg:"bg-primary-3"
        },
        {
            icon: <FaArrowUp />,
            timeline: "This Month",
            amount: statistics.monthlyDebit, 
            stat: "Monthly Expenses",
            bg:"bg-primary-4"
        },
        {
            icon: <FaChartLine />,
            timeline: "All Time",
            amount: statistics.totalVolume, 
            stat: "Total Volume",
            bg:"bg-primary-5"
        }
    ]


    return (
        <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-3'>
            {statDatas.map((statData, index)=> (
                <StatsCard key={index}
                    icon={statData.icon}
                    timeline={statData.timeline}
                    amount={statData.amount}
                    stat={statData.stat}
                    bg={statData.bg}
                />

            ))}
        </div> 
    )
}