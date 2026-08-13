import { useState } from 'react';
import toast from 'react-hot-toast';

import { IoClose } from 'react-icons/io5';

import { adminIntTransfer } from '../../services/manageusers.service';

export function InternationalTransferModal({
  isOpen,
  onClose,
  userId,
  reload,
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    beneficiaryAccountName: '',
    beneficiaryAccountNumber: '',
    bankName: '',
    bankAddress: '',
    accountType: '',
    country: '',
    iban: '',
    swiftCode: '',
    amount: '',
    note: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      beneficiaryAccountName: '',
      beneficiaryAccountNumber: '',
      bankName: '',
      bankAddress: '',
      accountType: '',
      country: '',
      iban: '',
      swiftCode: '',
      amount: '',
      note: '',
    });
  };

  const isFormValid =
    formData.beneficiaryAccountName.trim() &&
    formData.beneficiaryAccountNumber.trim() &&
    formData.bankName.trim() &&
    formData.country.trim() &&
    Number(formData.amount) > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = {
        ...formData,
        amount: Number(formData.amount),
      };

      const res = await adminIntTransfer(
        userId,
        payload
      );

      await reload();

      toast.success(res.message);

      resetForm();

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          'Transfer failed.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='w-full max-w-2xl max-h-[90vh] rounded-2xl bg-surface-2 shadow-xl'>
        <div className='flex items-center justify-between border-b border-border p-6'>
          <h3 className='text-xl font-semibold text-text'>
            International Transfer
          </h3>

          <button
            type='button'
            onClick={onClose}
            className='text-2xl text-text-muted'
          >
            <IoClose />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className='max-h-[70vh] space-y-5 overflow-y-auto p-6'
        >
          <input
            type='text'
            name='beneficiaryAccountName'
            value={
              formData.beneficiaryAccountName
            }
            onChange={handleChange}
            placeholder='Beneficiary name'
            className='w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text'
          />

          <input
            type='text'
            name='beneficiaryAccountNumber'
            value={
              formData.beneficiaryAccountNumber
            }
            onChange={handleChange}
            placeholder='Beneficiary account number'
            className='w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text'
          />

          <input
            type='text'
            name='bankName'
            value={formData.bankName}
            onChange={handleChange}
            placeholder='Bank name'
            className='w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text'
          />

          <input
            type='text'
            name='bankAddress'
            value={formData.bankAddress}
            onChange={handleChange}
            placeholder='Bank address'
            className='w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text'
          />

          <input
            type='text'
            name='accountType'
            value={formData.accountType}
            onChange={handleChange}
            placeholder='Account type'
            className='w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text'
          />

          <input
            type='text'
            name='country'
            value={formData.country}
            onChange={handleChange}
            placeholder='Country'
            className='w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text'
          />

          <input
            type='text'
            name='iban'
            value={formData.iban}
            onChange={handleChange}
            placeholder='IBAN'
            className='w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text'
          />

          <input
            type='text'
            name='swiftCode'
            value={formData.swiftCode}
            onChange={handleChange}
            placeholder='SWIFT/BIC code'
            className='w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text'
          />

          <input
            type='number'
            name='amount'
            value={formData.amount}
            onChange={handleChange}
            placeholder='Amount'
            className='w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text'
          />

          <textarea
            rows='4'
            name='note'
            value={formData.note}
            onChange={handleChange}
            placeholder='Description'
            className='w-full resize-none rounded-lg border border-border bg-transparent px-4 py-3 text-text'
          />

          <button
            type='submit'
            disabled={
              loading || !isFormValid
            }
            className='rounded-lg bg-primary px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50'
          >
            {loading
              ? 'Processing...'
              : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}