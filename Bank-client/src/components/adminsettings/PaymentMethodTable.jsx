import { useState } from 'react';
import toast from 'react-hot-toast';

import { Link } from 'react-router-dom';
import { FaPlus, FaPen, FaTrash } from 'react-icons/fa';
import { Table } from '../common/Table';
import { ConfirmationModal } from '../common/ConfirmationModal';


import { deletePaymentMethod } from '../../services/paymentSetting.service';

export function PaymentMethodTable({
  paymentMethods,
  reload,
}) {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    setLoading(true);

    try {
      const res = await deletePaymentMethod(id);

      toast.success(res.message);

      await reload();

      setShowModal(false);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          'Failed to delete payment method.'
      );
    } finally {
      setLoading(false);
    }
  };

  const userColumns = [
    {
      key: 'method',
      label: 'Method',
      render: (row) => row.name,
    },
    {
      key: 'type',
      label: 'Type',
      render: (row) => row.type,
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => row.status,
    },
    {
      key: 'action',
      label: 'Action',
      render: (row) => (
        <div className='flex items-center justify-between gap-2'>
          <button
            type='button'
            className='rounded-lg bg-primary-1 p-2 text-white'
          >
            <FaPen />
          </button>

          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();

              setModalMessage(
                'Are you sure you want to delete this payment method? This action cannot be undone.'
              );

              setModalAction(
                () => () => handleDelete(row._id)
              );

              setShowModal(true);
            }}
            className='rounded-lg bg-red-500 p-2 text-white'
          >
            <FaTrash />
          </button>

          <button
            type='button'
            className={`rounded-lg px-3 py-2 text-white ${
              row.status === 'enabled'
                ? 'bg-yellow-500'
                : 'bg-green-600'
            }`}
          >
            {row.status === 'enabled'
              ? 'Disable'
              : 'Enable'}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Link
        to='/admin/settings/payment/add'
        className='mb-3 flex w-fit items-center gap-2 rounded-lg bg-primary-1 p-2 text-sm text-text transition-transform hover:scale-[.9]'
      >
        <FaPlus /> Add New
      </Link>

      <Table
        columns={userColumns}
        data={paymentMethods}
      />

      <ConfirmationModal
        isOpen={showModal}
        message={modalMessage}
        onConfirm={modalAction}
        onCancel={() => setShowModal(false)}
        loading={loading}
      />
    </div>
  );
}