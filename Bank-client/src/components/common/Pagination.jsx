export function Pagination({
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    onPrevious,
    onNext,
}) {
    if (totalItems === 0) return null;

    const firstItem = (currentPage - 1) * pageSize + 1;
    const lastItem = Math.min(currentPage * pageSize, totalItems);

    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-text-muted">
                Showing{" "}
                <span className="font-semibold text-text">{firstItem}</span>{" "}
                to{" "}
                <span className="font-semibold text-text">{lastItem}</span>{" "}
                of{" "}
                <span className="font-semibold text-text">{totalItems}</span>{" "}
                results
            </p>

            {totalPages > 1 && (
                <div className="flex items-center gap-2">
                    <button
                        onClick={onPrevious}
                        disabled={currentPage === 1}
                        className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm font-medium text-text transition hover:bg-surface-2/80 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <span className="min-w-16 text-center text-sm font-semibold text-text">
                        {currentPage} / {totalPages}
                    </span>

                    <button
                        onClick={onNext}
                        disabled={currentPage === totalPages}
                        className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm font-medium text-text transition hover:bg-surface-2/80 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}