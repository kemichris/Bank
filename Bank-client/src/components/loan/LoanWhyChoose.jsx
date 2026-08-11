import {
    FaCheckCircle,
    FaClock,
    FaPercent,
    FaFileAlt,
    FaShieldAlt
} from 'react-icons/fa';

export function LoanWhyChoose() {
    const features = [
        {
            icon: FaClock,
            title: 'Quick Approval',
            description: 'Get a decision within hours and funds within days'
        },
        {
            icon: FaPercent,
            title: 'Competitive Rates',
            description: 'Low interest rates tailored to your credit profile'
        },
        {
            icon: FaFileAlt,
            title: 'Simple Process',
            description: 'Straightforward application with minimal paperwork'
        },
        {
            icon: FaShieldAlt,
            title: 'Secure & Confidential',
            description: 'Your information is protected with bank-level security'
        }
    ];

    return (
        <section>

            <div className="mb-4 flex items-center gap-3">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <FaCheckCircle size={16} />
                </div>

                <h2 className="text-lg font-semibold text-text">
                    Why Choose Our Loan Services
                </h2>

            </div>


            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

                {features.map(feature => {
                    const Icon = feature.icon;

                    return (
                        <div
                            key={feature.title}
                            className="rounded-xl border border-border bg-surface-2 px-4 py-4"
                        >

                            <div className="flex items-start gap-3">

                                <Icon
                                    className="mt-1 shrink-0 text-primary"
                                    size={16}
                                />

                                <div>

                                    <h3 className="text-sm font-semibold text-text">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-1 text-xs text-text-muted">
                                        {feature.description}
                                    </p>

                                </div>

                            </div>

                        </div>
                    );
                })}

            </div>

        </section>
    );
}