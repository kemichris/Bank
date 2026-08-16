import { Link } from "react-router-dom";
import { TransactionTable } from "../transaction/TransactionTable";


export function AdminRecentTransaction({transactions}) {
    return (
        <div className="rounded-3xl border border-border bg-surface-1 p-5 shadow-sm mt-8">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text">Recent Transactions</h3>
                <div className="flex items-center gap-2">
                    <Link to="/admin/transactions/credits" className="text-sm font-medium text-primary hover:underline">
                    All credits
                </Link>
                <Link to="/admin/transactions/credits" className="text-sm font-medium text-primary hover:underline">
                    All debits
                </Link>

                </div>
            </div>

            <TransactionTable transactions={transactions} />
        </div>
    );
}