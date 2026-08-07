import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { Pagination } from "./Pagination";
import { UsePagination } from "./UsePagination";

export function Table({
    columns,
    data,
    pageSize = 5,
    onRowClick
}) {
    const {
        currentPage,
        totalPages,
        totalItems,
        paginatedData,
        nextPage,
        previousPage,
    } = UsePagination(
        data,
        pageSize
    );

    return (
        <div className="space-y-4">

            <div className="overflow-x-auto rounded-2xl border border-border">

                <table className="min-w-full">

                    <TableHeader
                        columns={columns}
                    />

                    <TableBody
                        columns={columns}
                        data={paginatedData}
                        onRowClick={onRowClick}
                    />

                </table>

            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onNext={nextPage}
                onPrevious={previousPage}
            />

        </div>
    );
}