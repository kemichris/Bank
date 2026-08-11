import { FaInfoCircle } from 'react-icons/fa';
import { LoanStep } from './LoanStep';

export function LoanHowItWorks() {
    const steps = [
        {
            number: 1,
            title: 'Apply Online',
            description:
                'Complete our simple online application form with your details and loan requirements'
        },
        {
            number: 2,
            title: 'Quick Review',
            description:
                'Our team reviews your application and may contact you for additional information'
        },
        {
            number: 3,
            title: 'Approval & Disbursement',
            description:
                'Once approved, the loan amount will be transferred to your account'
        }
    ];

    return (
        <section>

            <div className="mb-4 flex items-center gap-3">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <FaInfoCircle size={15} />
                </div>

                <h2 className="text-lg font-semibold text-text">
                    How It Works
                </h2>

            </div>


            <div className="relative space-y-5">

                <div className="
                    absolute
                    bottom-8
                    left-3.75
                    top-8
                    w-px
                    bg-border
                " />

                {steps.map(step => (
                    <LoanStep
                        key={step.number}
                        {...step}
                    />
                ))}

            </div>

        </section>
    );
}