import {
    FaBriefcase,
    FaHome,
    FaCar,
    FaUsers,
    FaCreditCard,
    FaHeartbeat
} from 'react-icons/fa';

import { LoanTypeCard } from './LoanTypeCard';

export function LoanTypes() {
    const loanTypes = [
        {
            icon: FaHome,
            title: 'Personal Home Loans',
            description: 'Finance your dream home with competitive rates'
        },
        {
            icon: FaCar,
            title: 'Automobile Loans',
            description: 'Get on the road with flexible auto financing'
        },
        {
            icon: FaBriefcase,
            title: 'Business Loans',
            description: 'Grow your business with tailored financing solutions'
        },
        {
            icon: FaUsers,
            title: 'Joint Mortgage',
            description: 'Share responsibility with a co-borrower'
        },
        {
            icon: FaCreditCard,
            title: 'Secured Overdraft',
            description: 'Access funds when needed with asset backing'
        },
        {
            icon: FaHeartbeat,
            title: 'Health Finance',
            description: 'Cover medical expenses with flexible payment options'
        }
    ];

    return (
        <section>

            <div className="mb-4 flex items-center gap-3">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <FaBriefcase size={15} />
                </div>

                <h2 className="text-lg font-semibold text-text">
                    Available Loan Types
                </h2>

            </div>


            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">

                {loanTypes.map(loan => (
                    <LoanTypeCard
                        key={loan.title}
                        {...loan}
                    />
                ))}

            </div>

        </section>
    );
}