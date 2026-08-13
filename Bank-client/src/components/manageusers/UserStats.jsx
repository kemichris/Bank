import {UserStatCard} from './UserStatCard';

export const UserStats = () => {
    return (
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3 border border-border rounded-2xl p-4'>
            <UserStatCard
                title='Account Balance'
                value='$6,000.00'
            />

            <UserStatCard
                title='Account Limit'
                value='$50,000.00'
            />

            <UserStatCard
                title='Deposits'
                value='$12,500.00'
            />

            <UserStatCard
                title='Withdrawals'
                value='$6,500.00'
            />

            <UserStatCard
                title='Account Status'
                badge='Active'
            />

            <UserStatCard
                title='KYC Status'
                badge='Verified'
            />
        </div>
    );
};