import toast from 'react-hot-toast';

/**
 * Notification Service - Sử dụng react-hot-toast
 * Hiển thị thông báo success, error, warning, info, loading
 */

const notification = {
    // Success notification
    success: (message, options = {}) => {
        return toast.success(message, {
            duration: 3000,
            position: 'top-right',
            style: {
                background: '#10b981',
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
            },
            ...options,
        });
    },

    // Error notification
    error: (message, options = {}) => {
        return toast.error(message, {
            duration: 4000,
            position: 'top-right',
            style: {
                background: '#ef4444',
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
            },
            ...options,
        });
    },

    // Warning notification
    warning: (message, options = {}) => {
        return toast(message, {
            duration: 3500,
            position: 'top-right',
            icon: '⚠️',
            style: {
                background: '#f59e0b',
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
            },
            ...options,
        });
    },

    // Info notification
    info: (message, options = {}) => {
        return toast(message, {
            duration: 3000,
            position: 'top-right',
            icon: 'ℹ️',
            style: {
                background: '#3b82f6',
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
            },
            ...options,
        });
    },

    // Loading notification (hiển thị cho AI processing)
    loading: (message, options = {}) => {
        return toast.loading(message, {
            position: 'top-right',
            style: {
                background: '#6b7280',
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
            },
            ...options,
        });
    },

    // Promise notification (cho async operations)
    promise: (promise, messages, options = {}) => {
        return toast.promise(
            promise,
            {
                loading: messages.loading || 'Đang xử lý...',
                success: messages.success || 'Thành công!',
                error: messages.error || 'Có lỗi xảy ra!',
            },
            {
                position: 'top-right',
                ...options,
            }
        );
    },

    // Custom notification với JSX
    custom: (content, options = {}) => {
        return toast.custom(content, {
            position: 'top-right',
            duration: 3000,
            ...options,
        });
    },

    // Dismiss specific notification
    dismiss: (toastId) => {
        toast.dismiss(toastId);
    },

    // Dismiss all notifications
    dismissAll: () => {
        toast.dismiss();
    },
};

// AI Prediction Notification - Hiển thị kết quả dự đoán AI
export const showAIPrediction = (prediction) => {
    return notification.custom(
        (t) => (
            <div
                className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <svg
                                    className="h-6 w-6 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">Kết quả dự đoán AI</p>
                            <p className="mt-1 text-sm text-gray-500">{prediction.result}</p>
                            {prediction.confidence && (
                                <p className="mt-1 text-xs text-gray-400">
                                    Độ tin cậy: {prediction.confidence}%
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-gray-200">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        ),
        { duration: 6000 }
    );
};

export default notification;
