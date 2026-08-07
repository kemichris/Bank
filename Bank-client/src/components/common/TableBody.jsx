export function TableBody({
    data,
    columns,
    onRowClick
}) {
    if (!data.length) {
        return (
            <tbody>
                <tr>
                    <td
                        colSpan={columns.length}
                        className="py-10 text-center text-sm text-text-muted"
                    >
                        No data found.
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody className="divide-y divide-border bg-surface-1">
            {data.map((row) => (
                <tr
                    key={row.id}
                    onClick={() => onRowClick?.(row)}
                    className={`
                        hover:bg-surface-2
                        transition-colors
                        ${onRowClick ? 'cursor-pointer' : ''}
                    `}
                >
                    {columns.map((column) => (
                        <td
                            key={column.key}
                            className="px-4 py-3 text-sm text-text"
                        >
                            {column.render
                                ? column.render(row)
                                : row[column.key]}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}