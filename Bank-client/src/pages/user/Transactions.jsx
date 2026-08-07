
import { TransactionTable } from "../../components/transaction/TransactionTable"

const transactions = [
    { id: 1, name: "Alice Johnson", amount: "-$250.00", date: "Today, 09:30" },
    { id: 2, name: "Amazon", amount: "-$89.99", date: "Yesterday" },
    { id: 3, name: "Salary Deposit", amount: "+$3,200.00", date: "Mon, 08:00" },
    { id: 4, name: "Alice Johnson", amount: "-$250.00", date: "Today, 09:30" },
    { id: 5, name: "Amazon", amount: "-$89.99", date: "Yesterday" },
    { id: 6, name: "Salary Deposit", amount: "+$3,200.00", date: "Mon, 08:00" },
    { id: 7, name: "Alice Johnson", amount: "-$250.00", date: "Today, 09:30" },
    { id: 8, name: "Amazon", amount: "-$89.99", date: "Yesterday" },
    { id: 9, name: "Salary Deposit", amount: "+$3,200.00", date: "Mon, 08:00" },
    { id: 10, name: "Alice Johnson", amount: "-$250.00", date: "Today, 09:30" },
    { id: 11, name: "Amazon", amount: "-$89.99", date: "Yesterday" },
    { id: 12, name: "Salary Deposit", amount: "+$3,200.00", date: "Mon, 08:00" },
    { id: 13, name: "Alice Johnson", amount: "-$250.00", date: "Today, 09:30" },
    { id: 14, name: "Amazon", amount: "-$89.99", date: "Yesterday" },
    { id: 15, name: "Salary Deposit", amount: "+$3,200.00", date: "Mon, 08:00" },
    { id: 16, name: "Alice Johnson", amount: "-$250.00", date: "Today, 09:30" },
    { id: 17, name: "Amazon", amount: "-$89.99", date: "Yesterday" },
    { id: 18, name: "Salary Deposit", amount: "+$3,200.00", date: "Mon, 08:00" },
    { id: 19, name: "Alice Johnson", amount: "-$250.00", date: "Today, 09:30" },
    { id: 20, name: "Amazon", amount: "-$89.99", date: "Yesterday" },
    { id: 21, name: "Salary Deposit", amount: "+$3,200.00", date: "Mon, 08:00" },
    { id: 22, name: "Alice Johnson", amount: "-$250.00", date: "Today, 09:30" },
    { id: 23, name: "Amazon", amount: "-$89.99", date: "Yesterday" },
    { id: 24, name: "Salary Deposit", amount: "+$3,200.00", date: "Mon, 08:00" },
    { id: 25, name: "Alice Johnson", amount: "-$250.00", date: "Today, 09:30" },
    { id: 26, name: "Amazon", amount: "-$89.99", date: "Yesterday" },
    { id: 27, name: "Salary Deposit", amount: "+$3,200.00", date: "Mon, 08:00" },
    { id: 28, name: "Alice Johnson", amount: "-$250.00", date: "Today, 09:30" },
    { id: 29, name: "Amazon", amount: "-$89.99", date: "Yesterday" },
    { id: 30, name: "Salary Deposit", amount: "+$3,200.00", date: "Mon, 08:00" },
    { id: 31, name: "Alice Johnson", amount: "-$250.00", date: "Today, 09:30" },
    { id: 32, name: "Amazon", amount: "-$89.99", date: "Yesterday" },
    { id: 33, name: "Salary Deposit", amount: "+$3,200.00", date: "Mon, 08:00" },
    { id: 34, name: "Alice Johnson", amount: "-$250.00", date: "Today, 09:30" },
    { id: 35, name: "Amazon", amount: "-$89.99", date: "Yesterday" },
    { id: 36, name: "Salary Deposit", amount: "+$3,200.00", date: "Mon, 08:00" },
];

export function Transactions() {
    return (
        <div>
            <h2 className="text-text text-left mb-8">Transactions</h2>

            <TransactionTable transactions={transactions}/>

        </div>
    )
}