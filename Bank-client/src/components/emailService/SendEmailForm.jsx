import { useEffect, useState } from 'react';
import Select from 'react-select';
import toast from 'react-hot-toast';

import { getUsers } from '../../services/manageusers.service';
import { sendEmail } from '../../services/email.service';

export function SendEmailForm() {
  const [recipientType, setRecipientType] = useState('all');
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    selectedUsers: [],
    greeting: 'Dear',
    title: 'Valued Customer',
    message: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);

      try {
        const response = await getUsers();

        setUsers(response.data);
      } catch (error) {
        console.error(error);

        toast.error('Failed to load users.');
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const userOptions = users.map((user) => ({
    value: user._id,
    label: `${user.firstName} ${user.lastName} (${user.email})`,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUsersChange = (selected) => {
    setFormData((previous) => ({
      ...previous,
      selectedUsers: selected || [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
       const res = await sendEmail({
        recipientType,
        selectedUsers: formData.selectedUsers.map(
          (user) => user.value,
        ),
        greeting: formData.greeting,
        title: formData.title,
        message: formData.message,
      });

      toast.success(res.message);

      setFormData({
        selectedUsers: [],
        greeting: 'Dear',
        title: 'Valued Customer',
        message: '',
      });

      setRecipientType('all');
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          'Failed to send email.',
      );
    } finally {
      setLoading(false);
    }
  };

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#1F2937',
      borderColor: '#374151',
      boxShadow: 'none',
      minHeight: '48px',
    }),

    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1F2937',
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? '#374151'
        : '#1F2937',
      color: '#e5e7eb',
    }),

    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#374151',
    }),

    multiValueLabel: (provided) => ({
      ...provided,
      color: '#e5e7eb',
    }),

    input: (provided) => ({
      ...provided,
      color: '#e5e7eb',
    }),

    singleValue: (provided) => ({
      ...provided,
      color: '#e5e7eb',
    }),

    placeholder: (provided) => ({
      ...provided,
      color: '#9CA3AF',
    }),
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-6 rounded-2xl border border-border bg-surface-2 p-6'
    >
      <div>
        <h2 className='mb-4 text-xl font-semibold text-text'>
          Send Email
        </h2>

        <div className='space-y-3'>
          <label className='flex items-center gap-3 text-text'>
            <input
              type='radio'
              value='all'
              checked={recipientType === 'all'}
              onChange={() =>
                setRecipientType('all')
              }
            />

            All users
          </label>

          <label className='flex items-center gap-3 text-text'>
            <input
              type='radio'
              value='selected'
              checked={
                recipientType === 'selected'
              }
              onChange={() =>
                setRecipientType('selected')
              }
            />

            Selected users
          </label>
        </div>
      </div>

      {recipientType === 'selected' && (
        <div className='space-y-2'>
          <label className='text-sm text-text-muted'>
            Select users
          </label>

          <Select
            isMulti
            isSearchable
            isLoading={loadingUsers}
            options={userOptions}
            value={formData.selectedUsers}
            onChange={handleUsersChange}
            placeholder='Search users...'
            styles={selectStyles}
          />
        </div>
      )}

      <div className='space-y-2'>
        <label className='text-sm text-text-muted'>
          Greeting
        </label>

        <input
          type='text'
          name='greeting'
          value={formData.greeting}
          onChange={handleChange}
          className='w-full rounded-lg border border-border bg-surface-1 px-4 py-3 text-text outline-none'
        />
      </div>

      <div className='space-y-2'>
        <label className='text-sm text-text-muted'>
          Title
        </label>

        <input
          type='text'
          name='title'
          value={formData.title}
          onChange={handleChange}
          className='w-full rounded-lg border border-border bg-surface-1 px-4 py-3 text-text outline-none'
        />
      </div>

      <div className='space-y-2'>
        <label className='text-sm text-text-muted'>
          Message
        </label>

        <textarea
          rows='8'
          name='message'
          value={formData.message}
          onChange={handleChange}
          placeholder='Write your message...'
          className='w-full rounded-lg border border-border bg-surface-1 px-4 py-3 text-text outline-none'
        />
      </div>

      <button
        type='submit'
        disabled={
          loading ||
          !formData.message.trim() ||
          (
            recipientType === 'selected' &&
            !formData.selectedUsers.length
          )
        }
        className='w-full rounded-lg bg-primary px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50'
      >
        {loading
          ? 'Sending...'
          : 'Send Email'}
      </button>
    </form>
  );
}