import { useState } from "react";
import { Table } from "../common/Table"
import { TransactionModal } from "./TransactionModal";
import {formatMoney} from "../../utils/formatMoney";
const transactionColumns = [
    {
        key: 'name',
        label: 'Name',
        render: row => {
            if (row.type === 'deposit') {
                return 'Deposit';
            }

            if (row.type === 'withdrawal') {
                return 'Withdrawal';
            }

            if (row.counterParty) {
                return `${row.counterParty.firstName} ${row.counterParty.lastName}`;
            }

            return 'Transfer';
        },
    },

    {
        key: 'date',
        label: 'Date',
        render: row =>
            new Date(row.createdAt).toLocaleString(),
    },

    {
        key: 'amount',
        label: 'Amount',
        render: row => {
            const isCredit =
                row.direction === 'credit';

            return (
                <span
                    className={
                        isCredit
                            ? 'font-semibold text-green-500'
                            : 'font-semibold text-red-500'
                    }
                >
                    {isCredit ? '+' : '-'}
                    ${formatMoney(row.amount)}
                </span>
            );
        },
    },
];

export function TransactionTable({ transactions }) {
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


