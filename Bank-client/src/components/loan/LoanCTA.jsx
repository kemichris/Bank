import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

export function LoanCTA() {
    return (
        <section className="
            rounded-2xl
            border
            border-border
            bg-surface-2
            px-6
            py-8
            text-center
        ">

            <h2 className="text-xl font-semibold text-text">
                Ready to get started?
            </h2>

            <p className="mt-2 text-sm text-text-muted">
                Apply now and get a decision on your loan application quickly
            </p>


            <Link
                to="/dashboard/loan/application"
                className="
                    mx-auto
                    mt-5
                    flex
                    w-fit
                    items-center
                    gap-2
                    rounded-xl
                    bg-primary
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:scale-[0.98]
                    hover:opacity-90
                "
            >
                Apply for a Loan

                <FaArrowRight size={13} />
            </Link>

        </section>
    );
}