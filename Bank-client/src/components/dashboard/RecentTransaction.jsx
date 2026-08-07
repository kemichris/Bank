import { Link } from "react-router-dom";

const transactions = [
    { id: 1, name: "Alice Johnson", type: "Transfer", amount: "-$250.00", date: "Today, 09:30" },
    { id: 2, name: "Amazon", type: "Shopping", amount: "-$89.99", date: "Yesterday" },
    { id: 3, name: "Salary Deposit", type: "Income", amount: "+$3,200.00", date: "Mon, 08:00" },
];

export function RecentTransaction() {
    return (
        <div className="rounded-3xl border border-border bg-surface-1 p-5 shadow-sm mt-8">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text">Recent Transactions</h3>
                <Link to="/dashboard/transactions" className="text-sm font-medium text-primary hover:underline">
                    View All
                </Link>
            </div>

            <div className="overflow-x-auto scroll-auto rounded-2xl border border-border">
                <table className="min-w-full divide-y divide-border text-left text-sm">
                    <thead className="bg-surface-2">
                        <tr>
                            <th className="px-4 py-3 font-semibold text-text">Name</th>
                            <th className="px-4 py-3 font-semibold text-text">Type</th>
                            <th className="px-4 py-3 font-semibold text-text">Date</th>
                            <th className="px-4 py-3 font-semibold text-text">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-surface-1">
                        {transactions.map((item) => (
                            <tr key={item.id} className="hover:bg-surface-2">
                                <td className="px-4 py-3 font-medium text-text">{item.name}</td>
                                <td className="px-4 py-3 text-text-muted">{item.type}</td>
                                <td className="px-4 py-3 text-text-muted">{item.date}</td>
                                <td className={`px-4 py-3 font-semibold ${item.amount.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                                    {item.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}