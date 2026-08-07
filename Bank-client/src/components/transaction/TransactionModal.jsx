import { HiOutlineXMark } from 'react-icons/hi2';

export function TransactionModal({
    transaction,
    onClose,
}) {
    if (!transaction) return null;

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/60
                p-4
            "
            onClick={onClose}
        >
            <div
                className="
                    w-full
                    max-w-lg
                    rounded-2xl
                    bg-surface-1
                    border
                    border-border
                    shadow-xl
                "
                onClick={(event) => event.stopPropagation()}
            >

                {/* Header */}
                <div className="flex items-center justify-between border-b border-border px-6 py-5">

                    <div>
                        <h2 className="text-xl font-semibold text-text">
                            Transaction Details
                        </h2>

                        <p className="mt-1 text-sm text-text-muted">
                            Full transaction information
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="
                            rounded-lg
                            p-2
                            text-text-muted
                            transition
                            hover:bg-surface-2
                            hover:text-text
                        "
                    >
                        <HiOutlineXMark size={24} />
                    </button>

                </div>

                {/* Details */}
                <div className="space-y-5 px-6 py-6">

                    <TransactionDetail
                        label="Transaction ID"
                        value={transaction.id}
                    />

                    <TransactionDetail
                        label="Name"
                        value={transaction.name}
                    />

                    <TransactionDetail
                        label="Date"
                        value={transaction.date}
                    />

                    <TransactionDetail
                        label="Amount"
                        value={transaction.amount}
                        valueClassName={
                            transaction.amount.startsWith('+')
                                ? 'text-green-500'
                                : 'text-red-500'
                        }
                    />

                    <TransactionDetail
                        label="Type"
                        value={transaction.type}
                    />

                    <TransactionDetail
                        label="Status"
                        value={transaction.status}
                    />

                    <TransactionDetail
                        label="Description"
                        value={transaction.description}
                    />

                </div>

            </div>
        </div>
    );
}

function TransactionDetail({
    label,
    value,
    valueClassName = 'text-text',
}) {
    return (
        <div className="flex items-start justify-between gap-6">

            <span className="text-sm text-text-muted">
                {label}
            </span>

            <span
                className={`
                    text-right
                    text-sm
                    font-medium
                    ${valueClassName}
                `}
            >
                {value || '—'}
            </span>

        </div>
    );
}