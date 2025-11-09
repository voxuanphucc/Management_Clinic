/**
 * Error Logger Utility
 * Ghi log errors và gửi đến monitoring service
 */

// Kiểm tra environment
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Log error ra console (development only)
 */
export const logError = (error, errorInfo = null) => {
    if (isDevelopment) {
        console.group('🔴 Error Logged');
        console.error('Error:', error);
        if (errorInfo) {
            console.error('Error Info:', errorInfo);
        }
        console.error('Stack:', error.stack);
        console.groupEnd();
    }
};

/**
 * Log warning ra console
 */
export const logWarning = (message, data = null) => {
    if (isDevelopment) {
        console.group('⚠️ Warning');
        console.warn(message);
        if (data) {
            console.warn('Data:', data);
        }
        console.groupEnd();
    }
};

/**
 * Log info (development only)
 */
export const logInfo = (message, data = null) => {
    if (isDevelopment) {
        console.group('ℹ️ Info');
        console.log(message);
        if (data) {
            console.log('Data:', data);
        }
        console.groupEnd();
    }
};

/**
 * Gửi error đến monitoring service (Sentry, LogRocket, etc.)
 * Production only
 */
export const sendErrorToMonitoring = (_errorInfo = null, _additionalData = {}) => {
    if (!isProduction) {
        return;
    }

    try {
        // TODO: Integrate với monitoring service thực tế
        // Ví dụ với Sentry:
        // Sentry.captureException(error, {
        //     contexts: {
        //         react: {
        //             componentStack: errorInfo?.componentStack,
        //         },
        //     },
        //     extra: additionalData,
        // });

        // Hoặc gửi đến custom logging API:
        // fetch('/api/log-error', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         error: {
        //             message: error.message,
        //             stack: error.stack,
        //             name: error.name,
        //         },
        //         errorInfo,
        //         additionalData,
        //         timestamp: new Date().toISOString(),
        //         userAgent: navigator.userAgent,
        //         url: window.location.href,
        //     }),
        // });

        console.log('Error logged to monitoring service');
    } catch (loggingError) {
        console.error('Failed to send error to monitoring service:', loggingError);
    }
};

/**
 * Create error context với additional information
 */
export const createErrorContext = (componentName, actionName) => {
    return {
        component: componentName,
        action: actionName,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
    };
};

/**
 * Handle API errors
 */
export const logAPIError = (error, endpoint, method = 'GET') => {
    const errorData = {
        endpoint,
        method,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
    };

    logError(error, errorData);

    if (isProduction) {
        sendErrorToMonitoring(error, null, errorData);
    }
};

/**
 * Handle unhandled promise rejections
 */
export const setupGlobalErrorHandlers = () => {
    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        logError(new Error(`Unhandled Promise Rejection: ${event.reason}`));

        if (isProduction) {
            sendErrorToMonitoring(new Error('Unhandled Promise Rejection'), null, {
                reason: event.reason,
            });
        }
    });

    // Global errors
    window.addEventListener('error', (event) => {
        logError(event.error || new Error(event.message));

        if (isProduction) {
            sendErrorToMonitoring(event.error || new Error(event.message), null, {
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
            });
        }
    });
};

export default {
    logError,
    logWarning,
    logInfo,
    sendErrorToMonitoring,
    createErrorContext,
    logAPIError,
    setupGlobalErrorHandlers,
};
