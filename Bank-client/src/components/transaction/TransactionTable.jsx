import { useState } from "react";
import { Table } from "../common/Table"
import { TransactionModal } from "./TransactionModal";

const transactionColumns = [
    {
        key: 'name',
        label: 'Name',
    },
    {
        key: 'date',
        label: 'Date',
    },
    {
        key: 'amount',
        label: 'Amount',
        render: (transaction) => (
            <span
                className={
                    transaction.amount.startsWith('+')
                        ? 'text-green-500 font-semibold'
                        : 'text-red-500 font-semibold'
                }
            >
                {transaction.amount}
            </span>
        ),
    },
];

export function TransactionTable({transactions}) {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    return (
        <div>
            <Table
                columns={transactionColumns}
                data={transactions}
                onRowClick={setSelectedTransaction}
            />
            <TransactionModal
                transaction={selectedTransaction}
                onClose={() => setSelectedTransaction(null)}
            />
        </div>
    )
}


