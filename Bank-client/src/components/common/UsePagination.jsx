import { useEffect, useState } from 'react';

export function UsePagination(data = [], pageSize = 5) {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    const totalItems = data.length;

    const totalPages = Math.max(
        1,
        Math.ceil(totalItems / pageSize)
    );

    const startIndex = (currentPage - 1) * pageSize;

    const endIndex = startIndex + pageSize;

    const paginatedData = data.slice(
        startIndex,
        endIndex
    );

    return {
        currentPage,
        totalPages,
        totalItems,
        startIndex,
        endIndex,
        paginatedData,
        nextPage: () =>
            setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
            ),
        previousPage: () =>
            setCurrentPage((prev) =>
                Math.max(prev - 1, 1)
            ),
    };
}