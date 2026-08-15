import { FaArrowLeft, FaPiggyBank } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

import { UserPageHeader } from '../../components/ui/UserPageHeader';
import { DepositPaymentForm } from '../../components/transaction/DepositPaymentForm';

export function DepositPayment() {
    const location = useLocation();
    console.log(location.state);


    const { paymentMethod, amount } = location.state || {};

    return (
        <>
            <title>Columbia Merchant | Deposit</title>

            <UserPageHeader
                cardHeader='Make Deposit'
                headerDetail='Complete your payment securely'
                headerIcon={<FaPiggyBank />}
                to='/dashboard'
                linkIcon={<FaArrowLeft />}
                linkText='Back to Dashboard'
            />

            <DepositPaymentForm
                paymentMethod={paymentMethod}
                amount={amount}
            />
        </>
    );
}