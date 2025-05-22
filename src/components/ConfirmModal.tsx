import React from 'react'

type ConfirmModalProps = {
  isOpen: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}

const ConfirmModal = ({
  isOpen,
  title = 'Confirm',
  message = 'Are you sure?',
  confirmText = 'Yes',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 text-white rounded-lg p-6 max-w-sm w-full shadow-lg">
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        {message && <p className="mb-6">{message}</p>}

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            disabled={loading}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold"
          >
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
