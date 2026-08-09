
export function StatCard({icon, title, number, className}) {
    return (
        <div className="bg-surface-2 p-4 rounded-2xl flex items-start gap-4 border border-border">
            <div className={`px-4 py-4 rounded-lg w-fit ${className}`}>
                {icon}
            </div>
            <div>
                <p className="text-text-muted ">
                    {title}
                </p>
                <p className="text-white font-semibold text-lg">{number}</p>
            </div>
        </div>
    )
}