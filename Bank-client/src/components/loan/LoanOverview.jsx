import { LoanWhyChoose } from './LoanWhyChoose';
import { LoanTypes } from './LoanTypes';
import { LoanHowItWorks } from './LoanHowItWorks';
import { LoanCTA } from './LoanCTA';

export function LoanOverview() {
    return (
        <div className="w-full space-y-8">

            <LoanWhyChoose />

            <LoanTypes />

            <LoanHowItWorks />

            <LoanCTA />

        </div>
    );
}