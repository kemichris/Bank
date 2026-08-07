import { Table } from "../common/Table"

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
    return (
        <div>
            <Table
                columns={transactionColumns}
                data={transactions}
            />
        </div>
    )
}


