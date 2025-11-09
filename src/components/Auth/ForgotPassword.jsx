import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import authService from '@services/authService';
import notification from '@components/ui/Notification';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';

const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
});

const ForgotPassword = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data) => {
        try {
            await authService.forgotPassword(data.email);
            setIsSubmitted(true);
            notification.success('Đã gửi link đặt lại mật khẩu vào email của bạn');
        } catch (error) {
            console.error('Forgot password error:', error);
        }
    };

    if (isSubmitted) {
        return (
            <div className="w-full max-w-md mx-auto p-6 text-center">
                <div className="mb-4">
                    <svg
                        className="w-16 h-16 mx-auto text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Kiểm tra email của bạn</h2>
                <p className="text-gray-600 mb-4">
                    Chúng tôi đã gửi link đặt lại mật khẩu vào email của bạn. Vui lòng kiểm tra hộp
                    thư đến.
                </p>
                <a href="/login" className="text-blue-600 hover:underline">
                    Quay lại đăng nhập
                </a>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-2">Quên mật khẩu</h2>
            <p className="text-gray-600 text-center mb-6">
                Nhập email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Email"
                    type="email"
                    placeholder="example@email.com"
                    error={errors.email?.message}
                    {...register('email')}
                />

                <Button type="submit" className="w-full">
                    Gửi link đặt lại mật khẩu
                </Button>
            </form>

            <div className="mt-4 text-center text-sm">
                <a href="/login" className="text-blue-600 hover:underline">
                    Quay lại đăng nhập
                </a>
            </div>
        </div>
    );
};

export default ForgotPassword;
