import { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

export function UserAction({ user }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='mb-4 flex items-center justify-between'>
            <p className='text-text font-semibold text-xl'>{user.username}</p>

            <div className='relative'>
                <button
                    type='button'
                    onClick={() => setIsOpen(prev => !prev)}
                    className='inline-flex items-center gap-2 rounded-lg bg-primary-1 px-3 py-1 text-base text-text'
                >
                    Action
                    <FaCaretDown />
                </button>

                {isOpen && (
                    <div className='absolute right-0 z-50 mt-2 w-56 rounded-lg border border-gray-700 bg-surface-2 py-2 shadow-xl'>
                        <button className='block w-full px-4 py-2 text-left text-sm text-text hover:bg-border'>
                            Toggle Account Status
                        </button>

                        <button className='block w-full px-4 py-2 text-left text-sm text-text hover:bg-border'>
                            Verify Email
                        </button>

                        <button className='block w-full px-4 py-2 text-left text-sm text-text hover:bg-border'>
                            Verify KYC
                        </button>

                        <button className='block w-full px-4 py-2 text-left text-sm text-text hover:bg-border'>
                            Edit
                        </button>

                        <button className='block w-full px-4 py-2 text-left text-sm text-text hover:bg-border'>
                            Toggle ROI Mode
                        </button>

                        <button className='block w-full px-4 py-2 text-left text-sm text-text hover:bg-border'>
                            Credit/Debit
                        </button>

                        <button className='block w-full px-4 py-2 text-left text-sm text-text hover:bg-border'>
                            Reset Password
                        </button>

                        <button className='block w-full px-4 py-2 text-left text-sm text-text hover:bg-border'>
                            Login as {user.username}
                        </button>

                        <button className='block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-border'>
                            Delete User
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}