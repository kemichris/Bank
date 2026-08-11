export function LoanTypeCard({
    icon: Icon,
    title,
    description
}) {
    return (
        <div className="
            rounded-xl
            border
            border-border
            bg-surface-2
            px-4
            py-4
            transition
            hover:border-primary/40
        ">

            <div className="flex items-start gap-3">

                <Icon
                    className="mt-1 shrink-0 text-primary"
                    size={16}
                />

                <div className="min-w-0">

                    <h3 className="text-sm font-semibold text-text">
                        {title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-text-muted">
                        {description}
                    </p>

                </div>

            </div>

        </div>
    );
}