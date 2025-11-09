import React from 'react';
import PropTypes from 'prop-types';

/**
 * Error Boundary Component
 * Bắt lỗi JavaScript trong component tree và hiển thị fallback UI
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(_error) {
        // Update state để render fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        // Update state với error details
        this.setState({
            error,
            errorInfo,
        });

        // Gửi error đến logging service (nếu có)
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }

        // Có thể gửi đến service như Sentry, LogRocket...
        // logErrorToService(error, errorInfo);
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });

        if (this.props.onReset) {
            this.props.onReset();
        }
    };

    render() {
        if (this.state.hasError) {
            // Custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default fallback UI
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-4">
                            <svg
                                className="w-8 h-8 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>

                        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
                            Oops! Đã có lỗi xảy ra
                        </h1>

                        <p className="text-gray-600 text-center mb-6">
                            Chúng tôi xin lỗi vì sự bất tiện này. Vui lòng thử lại hoặc liên hệ hỗ
                            trợ nếu lỗi vẫn tiếp tục.
                        </p>

                        {/* Show error details in development */}
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="mb-6 p-4 bg-red-50 rounded border border-red-200">
                                <p className="text-sm font-semibold text-red-800 mb-2">
                                    Error Details (Development Only):
                                </p>
                                <p className="text-sm text-red-700 font-mono mb-2">
                                    {this.state.error.toString()}
                                </p>
                                {this.state.errorInfo && (
                                    <details className="text-xs text-red-600">
                                        <summary className="cursor-pointer mb-1">
                                            Stack Trace
                                        </summary>
                                        <pre className="whitespace-pre-wrap overflow-auto max-h-40">
                                            {this.state.errorInfo.componentStack}
                                        </pre>
                                    </details>
                                )}
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={this.handleReset}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Thử lại
                            </button>
                            <button
                                onClick={() => (window.location.href = '/')}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                            >
                                Về trang chủ
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
    fallback: PropTypes.node,
    onError: PropTypes.func,
    onReset: PropTypes.func,
};

export default ErrorBoundary;
