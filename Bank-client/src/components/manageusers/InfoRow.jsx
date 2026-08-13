export const InfoRow = ({ label, value }) => {
    return (
        <div className='flex justify-between border-b border-gray-700 p-5'>
            <span className='text-gray-400'>
                {label}
            </span>

            <span className='text-text'>
                {value}
            </span>
        </div>
    );
};

