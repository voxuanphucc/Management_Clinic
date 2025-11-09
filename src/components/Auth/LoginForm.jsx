import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAuthStore from '@store/authStore';
import authService from '@services/authService';
import notification from '@components/ui/Notification';
import useLoadingStore from '@store/loadingStore';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';

// Validation schema
const loginSchema = yup.object().shape({
    email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: yup
        .string()
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .required('Vui lòng nhập mật khẩu'),
});

const LoginForm = () => {
    const { showLoading, hideLoading } = useLoadingStore();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        showLoading('Đang đăng nhập...', 'oval');

        try {
            await authService.login(data);
            notification.success('Đăng nhập thành công!');
            // Redirect sẽ được xử lý bởi router
        } catch (error) {
            // Error đã được xử lý bởi axios interceptor
            console.error('Login error:', error);
        } finally {
            hideLoading();
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Email"
                    type="email"
                    placeholder="example@email.com"
                    error={errors.email?.message}
                    {...register('email')}
                />

                <Input
                    label="Mật khẩu"
                    type="password"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    {...register('password')}
                />

                <Button type="submit" className="w-full">
                    Đăng nhập
                </Button>
            </form>

            <div className="mt-4 text-center text-sm">
                <a href="/forgot-password" className="text-blue-600 hover:underline">
                    Quên mật khẩu?
                </a>
                <span className="mx-2">|</span>
                <a href="/register" className="text-blue-600 hover:underline">
                    Đăng ký tài khoản
                </a>
            </div>
        </div>
    );
};

export default LoginForm;
