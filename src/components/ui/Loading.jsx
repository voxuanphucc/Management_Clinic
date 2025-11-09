import React from 'react';
import { Oval, ThreeDots, TailSpin, Puff, Rings } from 'react-loader-spinner';

/**
 * Loading Component - Hiển thị loading spinner
 * @param {string} type - Loại spinner: 'oval', 'dots', 'tailspin', 'puff', 'rings'
 * @param {string} size - Kích thước: 'sm', 'md', 'lg'
 * @param {string} color - Màu sắc
 * @param {string} text - Text hiển thị kèm loading
 */
const Loading = ({
    type = 'oval',
    size = 'md',
    color = '#3b82f6',
    text = 'Đang xử lý...',
    fullScreen = false,
}) => {
    const sizeMap = {
        sm: 40,
        md: 60,
        lg: 80,
    };

    const spinnerSize = sizeMap[size] || sizeMap.md;

    const spinnerProps = {
        height: spinnerSize,
        width: spinnerSize,
        color: color,
        ariaLabel: 'loading',
    };

    const renderSpinner = () => {
        switch (type) {
            case 'dots':
                return <ThreeDots {...spinnerProps} />;
            case 'tailspin':
                return <TailSpin {...spinnerProps} />;
            case 'puff':
                return <Puff {...spinnerProps} />;
            case 'rings':
                return <Rings {...spinnerProps} />;
            case 'oval':
            default:
                return <Oval {...spinnerProps} />;
        }
    };

    const content = (
        <div className="flex flex-col items-center justify-center gap-4">
            {renderSpinner()}
            {text && <p className="text-gray-600 dark:text-gray-400 font-medium">{text}</p>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl">{content}</div>
            </div>
        );
    }

    return <div className="flex items-center justify-center p-4">{content}</div>;
};

// Skeleton Loading cho danh sách
export const SkeletonCard = ({ count = 1 }) => {
    return (
        <>
            {[...Array(count)].map((_, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md animate-pulse"
                >
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
            ))}
        </>
    );
};

// Button Loading
export const ButtonLoading = ({ text = 'Đang xử lý...', color = '#ffffff' }) => {
    return (
        <div className="flex items-center gap-2">
            <Oval height={20} width={20} color={color} secondaryColor={color} ariaLabel="loading" />
            <span>{text}</span>
        </div>
    );
};

export default Loading;
