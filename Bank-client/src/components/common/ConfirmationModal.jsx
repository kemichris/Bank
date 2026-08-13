export function ConfirmationModal({
  isOpen,
  message,
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          border
          border-border
          bg-surface-1
          p-6
        "
      >

        <p className="mt-3 text-text-muted text-center">{message}</p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="
              rounded-lg
              bg-red-500
              border
              border-border
              text-white
              px-4
              py-2
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="
              rounded-lg
              bg-primary-1
              px-4
              py-2
              text-white
            "
          >
            {loading ? "Processing..." : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
