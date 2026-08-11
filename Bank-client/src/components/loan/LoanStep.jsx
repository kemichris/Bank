export function LoanStep({
    number,
    title,
    description
}) {
    return (
        <div className="relative flex items-start gap-4">

            <div className="
                relative
                z-10
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-border
                bg-surface-1
                text-sm
                font-semibold
                text-primary
            ">
                {number}
            </div>


            <div className="pt-0.5">

                <h3 className="text-sm font-semibold text-text">
                    {title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-text-muted">
                    {description}
                </p>

            </div>

        </div>
    );
}