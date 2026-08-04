
import { FaUser } from "react-icons/fa";

import { ReviewCard } from "./ReviewCard";

export function ReviewSection() {
    const reviews = [
        {
            imgIcon: <FaUser />,
            review: 'I am impressed with the customer service and speed of payout.',
            userName: 'Lilly Jeferson',
            bankingType: 'Verified Customer'
        },
        {
            imgIcon: <FaUser />,
            review: 'Excellent service and competitive rates.',
            userName: 'Smith Conroy',
            bankingType: 'Business Owner'
        },
        {
            imgIcon: <FaUser />,
            review: 'The mobile app is fantastic.',
            userName: 'Emily Johnson',
            bankingType: 'Personal Banking'
        }
    ];

    return (
        <div className="review-section">
            <h2>Hear From Our Customers</h2>
            <div className="review-cards">
                    {reviews.map((review, index) => (
                            <ReviewCard key={index} {...review} />
                    ))}
            </div>
        </div>

    )
}


