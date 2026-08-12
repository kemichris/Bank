
import { useEffect, useState } from 'react';
import { TransactionTable } from '../../components/transaction/TransactionTable';
import { getTransactionHistory } from '../../services/transaction.service';
import { PageLoader } from '../../components/common/PageLoader';

export function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const res = await getTransactionHistory();

                setTransactions(res.data);
            } catch (error) {
                console.error(
                    error.response?.data || error
                );
            } finally {
                setLoading(false);
            }
        };

        loadTransactions();
    }, []);

    if (loading) {
        return <PageLoader />;
    }

    // if (!dashboardData) {
    //     return (
    //         <div className="flex min-h-full items-center justify-center">
    //             <p className="text-text-muted">
    //                 Unable to load dashboard data.
    //             </p>
    //         </div>
    //     );
    // }

    return (
        <>
            <title>Columbia Merchant | Transactions</title>
            <h2 className='text-text text-left mb-8'>Transactions</h2>

            <TransactionTable
                transactions={transactions}
            />
        </>
    );
}