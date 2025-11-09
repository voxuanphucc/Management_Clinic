import { toast } from 'react-toastify';

/**
 * Utility functions for displaying toast notifications using react-toastify
 */

// Default toast options
const defaultOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
};

/**
 * Show success toast
 * @param {string} message - The message to display
 * @param {object} options - Additional toast options
 */
export const showSuccess = (message, options = {}) => {
    toast.success(message, {
        ...defaultOptions,
        ...options,
    });
};

/**
 * Show error toast
 * @param {string} message - The message to display
 * @param {object} options - Additional toast options
 */
export const showError = (message, options = {}) => {
    toast.error(message, {
        ...defaultOptions,
        ...options,
    });
};

/**
 * Show info toast
 * @param {string} message - The message to display
 * @param {object} options - Additional toast options
 */
export const showInfo = (message, options = {}) => {
    toast.info(message, {
        ...defaultOptions,
        ...options,
    });
};

/**
 * Show warning toast
 * @param {string} message - The message to display
 * @param {object} options - Additional toast options
 */
export const showWarning = (message, options = {}) => {
    toast.warning(message, {
        ...defaultOptions,
        ...options,
    });
};

/**
 * Show promise toast - useful for async operations
 * @param {Promise} promise - The promise to track
 * @param {object} messages - Messages for pending, success, and error states
 * @param {object} options - Additional toast options
 */
export const showPromise = (
    promise,
    messages = {
        pending: 'Loading...',
        success: 'Success!',
        error: 'Error occurred!',
    },
    options = {}
) => {
    return toast.promise(
        promise,
        {
            pending: messages.pending,
            success: messages.success,
            error: messages.error,
        },
        {
            ...defaultOptions,
            ...options,
        }
    );
};

/**
 * Custom toast with custom content
 * @param {React.ReactNode} content - Custom content to display
 * @param {object} options - Additional toast options
 */
export const showCustom = (content, options = {}) => {
    toast(content, {
        ...defaultOptions,
        ...options,
    });
};

/**
 * Dismiss a specific toast
 * @param {string|number} toastId - The ID of the toast to dismiss
 */
export const dismissToast = (toastId) => {
    toast.dismiss(toastId);
};

/**
 * Dismiss all toasts
 */
export const dismissAllToasts = () => {
    toast.dismiss();
};

export default {
    success: showSuccess,
    error: showError,
    info: showInfo,
    warning: showWarning,
    promise: showPromise,
    custom: showCustom,
    dismiss: dismissToast,
    dismissAll: dismissAllToasts,
};
