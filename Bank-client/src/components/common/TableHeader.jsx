export function TableHeader({ columns }) {
    return (
        <thead className="bg-surface-2/80">
            <tr>
                {columns.map((column) => (
                    <th
                        key={column.key}
                        className="px-4 py-3 text-left text-sm font-semibold text-text"
                    >
                        {column.label}
                    </th>
                ))}
            </tr>
        </thead>
    );
}