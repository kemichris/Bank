
import { useEffect, useState } from 'react';
// import { CreditCard } from '../../components/cards/CreditCard';
import { CardStats } from '../../components/cards/CardStats';
import { PageLoader } from '../../components/common/PageLoader';

import { CardsHeader } from '../../components/cards/CardsHeader';
import { CardBanner } from '../../components/cards/CardBanner';
import { CardListings } from '../../components/cards/CardListings';

export function Card() {
    // const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const loadTransactions = async () => {
    //         try {
    //             const res = await getTransactionHistory();

    //             setTransactions(res.data);
    //         } catch (error) {
    //             console.error(
    //                 error.response?.data || error
    //             );
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     loadTransactions();
    // }, []);

    

    if (loading) {
        return <PageLoader />;
    }

    

    return (
        <>
            <CardsHeader />
            <CardStats />
            <CardBanner />
            <CardListings />
            {/* <CreditCard /> */}
        </>
    );
}