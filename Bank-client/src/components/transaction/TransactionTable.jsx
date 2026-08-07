
export function TransactionTable({ transactions = [] }) {
    return (
        <div className="overflow-x-auto scroll-auto rounded-2xl border border-border">
            <table className="min-w-full divide-y divide-border text-left text-sm">
                <thead className="bg-surface-2">
                    <tr>
                        <th className="px-4 py-3 font-semibold text-text">Name</th>
                        <th className="px-4 py-3 font-semibold text-text">Date</th>
                        <th className="px-4 py-3 font-semibold text-text">Amount</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border bg-surface-1">
                    {transactions.map((item) => (
                        <tr key={item.id} className="hover:bg-surface-2">
                            <td className="px-4 py-3 font-medium text-text">{item.name}</td>

                            <td className="px-4 py-3 text-text-muted">{item.date}</td>
                            <td className={`px-4 py-3 font-semibold ${item.amount.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                                {item.amount}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}