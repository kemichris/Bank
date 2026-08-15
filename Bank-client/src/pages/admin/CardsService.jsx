import { useEffect, useState } from "react";

import { FaCreditCard } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

import { UserPageHeader } from "../../components/ui/UserPageHeader";

import { PageLoader } from "../../components/common/PageLoader";

import { getCards } from "../../services/card.service";
import { CardsTable } from "../../components/cards/CardsTable";



export function CardsService() {
  const [cards, setcards] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCards = async () => {
    try {
      const res = await getCards();
      console.log(res.data);

      setcards(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {


    loadCards();
    
  }, []);
  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <title>Columbia Merchant | Manage Cards</title>

      <UserPageHeader
        cardHeader="Card Services"
        headerDetail="Manage all card services"
        headerIcon={<FaCreditCard />}
        to="/admin"
        linkIcon={<FaArrowLeft />}
        linkText="Dashboard"
      />

      <CardsTable cards={cards} reload={loadCards} />
    </>
  );
}
