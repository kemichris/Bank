

import { StatsCard } from './StatsCard';


export function StatsSection({ statDatas }) {

    


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