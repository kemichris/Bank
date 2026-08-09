
import { useEffect, useState } from 'react';
import { getActiveCards } from '../../services/card.service';
import { CardStats } from '../../components/cards/CardStats';
import { PageLoader } from '../../components/common/PageLoader';

import { CardsHeader } from '../../components/cards/CardsHeader';
import { CardBanner } from '../../components/cards/CardBanner';
import { CardListings } from '../../components/cards/CardListings';

import { FaPlus } from "react-icons/fa"

export function Card() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadActiveCards = async () => {
            try {
                const res = await getActiveCards();
                console.log(res.data)
                setCards(res.data);
            } catch (error) {
                console.error(
                    error.response?.data || error
                );
            } finally {
                setLoading(false);
            }
        };

        loadActiveCards();
    }, []);



    if (loading) {
        return <PageLoader />;
    }



    return (
        <>
        <title>Columbia Merchant | Card</title>
            <CardsHeader
                cardHeader='Virtual Cards'
                headerDetail='Secure virtual cards for online payments and subscriptions'
                to='/dashboard/card/apply'
                icon={<FaPlus />}
                linkText="Apply for Card"
            />
            <CardStats
                activeCards={cards.activeCards}
                pendingCards={cards.pendingCards}
            />
            <CardBanner />
            <CardListings cards={cards.cards} />
        </>
    );
}