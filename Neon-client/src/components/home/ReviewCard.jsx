import { FaStar } from "react-icons/fa6";

export function ReviewCard({imgIcon, review, userName, bankingType}) {
    return (
        <div className="review-card">
            <div className="rating">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
            </div>
            <blockquote className="review">"{review}"</blockquote>
            <div className="reviewer">
                <div className="img-icon">
                    {imgIcon}
                </div>
                <div className="reviewer-details">
                    <p>{userName}</p>
                    <small>{bankingType}</small>
                </div>
            </div>
        </div>
    )
}