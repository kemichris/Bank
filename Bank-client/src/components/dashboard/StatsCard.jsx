
export function StatsCard({icon, timeline, amount, stat, bg}) {
    return(
        <div className="py-5 px-4 bg-surface-2 border border-border flex flex-col gap-4 rounded-2xl">
            <div className="flex justify-between items-center">
                <div className={`p-3 rounded-2xl ${bg} text-text text-base `}>
                    {icon}
                </div>
                <p className="text-text-muted text-sm">{timeline}</p>
            </div>
            <h4 className="text-xl text-white font-bold" >${amount}</h4>
            <small className="text-text-muted">{stat}</small>
        </div>
    )
}