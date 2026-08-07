
import { TransactionTable } from "../../components/transaction/TransactionTable"

const transactions = [
    { id: 1, name: "Alice Johnson", amount: "-$250.00", date: "Today, 09:30" },
    { id: 2, name: "Amazon", amount: "-$89.99", date: "Yesterday" },
    { id: 3, name: "Salary Deposit", amount: "+$3,200.00", date: "Mon, 08:00" },
    { id: 1, name: "Alice Johnson", amount: "-$250.00", date: "Today, 09:30" },
    { id: 2, name: "Amazon", amount: "-$89.99", date: "Yesterday" },
    { id: 3, name: "Salary Deposit", amount: "+$3,200.00", date: "Mon, 08:00" },
    { id: 1, name: "Alice Johnson", amount: "-$250.00", date: "Today, 09:30" },
    { id: 2, name: "Amazon", amount: "-$89.99", date: "Yesterday" },
    { id: 3, name: "Salary Deposit", amount: "+$3,200.00", date: "Mon, 08:00" },
    { id: 1, name: "Alice Johnson", amount: "-$250.00", date: "Today, 09:30" },
    { id: 2, name: "Amazon", amount: "-$89.99", date: "Yesterday" },
    { id: 3, name: "Salary Deposit", amount: "+$3,200.00", date: "Mon, 08:00" },
];

export function Transactions() {
    return (
        <div>
            <h2 className="text-text text-left mb-8">Transactions</h2>

            <TransactionTable transactions={transactions}/>

        </div>
    )
}