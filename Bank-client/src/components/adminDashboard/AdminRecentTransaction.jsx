import { Link } from "react-router-dom";
import { TransactionTable } from "../transaction/TransactionTable";

// const transactions = [
//     { id: 1, name: "Alice Johnson", amount: "-$250.00", date: "Today, 09:30" },
//     { id: 2, name: "Amazon", amount: "-$89.99", date: "Yesterday" },
//     { id: 3, name: "Salary Deposit", amount: "+$3,200.00", date: "Mon, 08:00" },
// ];

export function AdminRecentTransaction({transactions}) {
    return (
        <div className="rounded-3xl border border-border bg-surface-1 p-5 shadow-sm mt-8">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text">Recent Transactions</h3>
                <div className="flex items-center gap-2">
                    <Link to="/admin/deposits" className="text-sm font-medium text-primary hover:underline">
                    All credits
                </Link>
                <Link to="/dashboard/withdrawals" className="text-sm font-medium text-primary hover:underline">
                    All debits
                </Link>

                </div>
            </div>

            <TransactionTable transactions={transactions} />
        </div>
    );
}