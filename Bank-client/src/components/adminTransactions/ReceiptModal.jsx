import { IoClose } from 'react-icons/io5';

export function ReceiptModal({
  isOpen,
  image,
  onClose,
}) {
  if (!isOpen || !image) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4'>
      <div className='relative w-full max-w-4xl rounded-2xl bg-surface-2 p-4'>
        <button
          type='button'
          onClick={onClose}
          className='absolute right-4 top-4 text-2xl text-text'
        >
          <IoClose />
        </button>

        <img
          src={image}
          alt='Transaction receipt'
          className='max-h-[80vh] w-full rounded-lg object-contain'
        />
      </div>
    </div>
  );
}