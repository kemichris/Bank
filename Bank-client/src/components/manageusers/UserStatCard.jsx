 export const UserStatCard = ({ title, value, badge }) => {
    return (
        <div >
            <p className='mb-1 text-sm text-gray-400'>
                {title}
            </p>

            {value && (
                <h3 className='text-lg font-semibold text-text'>
                    {value}
                </h3>
            )}

            {badge && (
                <span className='rounded-full bg-green-500 px-3 py-1 text-sm'>
                    {badge}
                </span>
            )}
        </div>
    );
};

