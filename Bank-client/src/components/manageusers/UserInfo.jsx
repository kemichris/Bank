import {InfoRow} from './InfoRow';

export const UserInfo = () => {
    return (
        <div className='mt-8 rounded-xl bg-surface-2'>
            <h2 className='border-b border-gray-700 p-5 text-xl font-semibold text-text'>
                User Information
            </h2>

            <InfoRow
                label='Full Name'
                value='Ekemini Chris'
            />

            <InfoRow
                label='Username'
                value='achris'
            />

            <InfoRow
                label='Email'
                value='example@gmail.com'
            />

            <InfoRow
                label='Phone Number'
                value='+234...'
            />

            <InfoRow
                label='Country'
                value='Nigeria'
            />

            <InfoRow
                label='Date Registered'
                value='13/08/2026'
            />
        </div>
    );
};