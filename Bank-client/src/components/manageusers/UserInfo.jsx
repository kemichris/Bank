import { InfoRow } from './InfoRow';

export const UserInfo = ({ user }) => {
    return (
        <div className='mt-8 rounded-xl bg-surface-2 mb-12'>
            <h2 className='border-b border-gray-700 p-5 text-xl font-semibold text-text'>
                User Information
            </h2>

            <InfoRow
                label='Full Name'
                value={[user.firstName, user.middleName, user.lastName]
                    .filter(Boolean)
                    .join(' ')}
            />

            <InfoRow
                label='Username'
                value={user.username}
            />

            <InfoRow
                label='Email'
                value={user.email}
            />

            <InfoRow
                label='Phone Number'
                value={user.phoneNumber}
            />

            <InfoRow
                label='Account'
                value={user.account.accountNumber}
            />

            <InfoRow
                label='Country'
                value={user.country}
            />

            <InfoRow
                label='Date Registered'
                value={new Date(user.createdAt).toLocaleDateString() }
            />
        </div>
    );
};