import notification from '@components/ui/Notification';

/**
 * API Error Handler
 * Xử lý các lỗi cụ thể cho từng API endpoint
 * ERROR_CODES và ERROR_MESSAGES sẽ được cập nhật dựa theo API thực tế
 */

// Map các error codes - SẼ CẬP NHẬT THEO API
export const ERROR_CODES = {
    // Sẽ được bổ sung khi có thông tin API cụ thể từ backend
    // Ví dụ format khi có API:
    // LOGIN_FAILED: 'LOGIN_FAILED',
    // EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
    // INVALID_TOKEN: 'INVALID_TOKEN',
    // ...
};

// Map error messages - SẼ CẬP NHẬT THEO API
export const ERROR_MESSAGES = {
    // Sẽ được bổ sung khi có thông tin API cụ thể từ backend
    // Ví dụ format khi có API:
    // [ERROR_CODES.LOGIN_FAILED]: 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin',
    // [ERROR_CODES.EMAIL_ALREADY_EXISTS]: 'Email này đã được đăng ký',
    // ...
};

/**
 * Xử lý lỗi theo từng API endpoint cụ thể
 * SẼ CẬP NHẬT KHI CÓ THÔNG TIN API
 */
export const endpointErrorHandlers = {
    // Sẽ được bổ sung khi có thông tin API cụ thể
    // Ví dụ format khi có API:
    // '/api/auth/login': (error) => {
    //     const { code, message, errors } = error.response?.data || {};
    //
    //     switch (code) {
    //         case ERROR_CODES.INVALID_CREDENTIALS:
    //             notification.error('Email hoặc mật khẩu không đúng');
    //             break;
    //         case ERROR_CODES.ACCOUNT_LOCKED:
    //             notification.error('Tài khoản đã bị khóa');
    //             break;
    //         default:
    //             notification.error(message || 'Đăng nhập thất bại');
    //     }
    // },
    // '/api/users': (error) => {
    //     const { code, message } = error.response?.data || {};
    //     // Xử lý lỗi theo API cụ thể
    // },
};

/**
 * Get error handler cho một endpoint cụ thể
 */
export const getErrorHandler = (url) => {
    // Tìm handler phù hợp với URL
    for (const [endpoint, handler] of Object.entries(endpointErrorHandlers)) {
        if (url.includes(endpoint)) {
            return handler;
        }
    }
    return null;
};

/**
 * Handle error chung cho tất cả API
 * Xử lý theo thứ tự ưu tiên:
 * 1. Custom handler (nếu có)
 * 2. Endpoint specific handler (theo API)
 * 3. Error code handler (theo backend trả về)
 * 4. HTTP status code handler (fallback)
 */
export const handleAPIError = (error, customHandler) => {
    // 1. Nếu có custom handler, dùng nó
    if (customHandler && typeof customHandler === 'function') {
        customHandler(error);
        return;
    }

    // 2. Kiểm tra có error handler cho endpoint không
    const url = error.config?.url || '';
    const endpointHandler = getErrorHandler(url);

    if (endpointHandler) {
        endpointHandler(error);
        return;
    }

    // 3. Xử lý error chung
    const { response } = error;

    if (!response) {
        // Network error
        if (error.code === 'ECONNABORTED') {
            notification.error('Yêu cầu quá thời gian chờ. Vui lòng thử lại');
        } else if (error.code === 'ERR_NETWORK') {
            notification.error('Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet');
        } else {
            notification.error('Không thể kết nối đến máy chủ');
        }
        return;
    }

    const { status, data } = response;
    const errorCode = data?.code;
    const errorMessage = data?.message;

    // 4. Xử lý theo error code từ backend (nếu có trong ERROR_MESSAGES)
    if (errorCode && ERROR_MESSAGES[errorCode]) {
        notification.error(ERROR_MESSAGES[errorCode]);
        return;
    }

    // 5. Xử lý theo message từ backend
    if (errorMessage) {
        notification.error(errorMessage);
        return;
    }

    // 6. Fallback - Xử lý theo HTTP status code
    switch (status) {
        case 400:
            notification.error('Yêu cầu không hợp lệ');
            break;
        case 401:
            notification.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại');
            break;
        case 403:
            notification.error('Bạn không có quyền truy cập');
            break;
        case 404:
            notification.error('Không tìm thấy dữ liệu');
            break;
        case 409:
            notification.error('Xung đột dữ liệu');
            break;
        case 422:
            notification.error('Dữ liệu không hợp lệ');
            break;
        case 429:
            notification.warning('Quá nhiều yêu cầu. Vui lòng thử lại sau');
            break;
        case 500:
            notification.error('Lỗi máy chủ. Vui lòng thử lại sau');
            break;
        case 503:
            notification.error('Dịch vụ tạm thời không khả dụng');
            break;
        default:
            notification.error('Có lỗi xảy ra. Vui lòng thử lại');
    }
};

export default handleAPIError;
