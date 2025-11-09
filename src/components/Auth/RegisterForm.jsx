import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import authService from '@services/authService';
import notification from '@components/ui/Notification';
import useLoadingStore from '@store/loadingStore';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';

// Validation schema
const registerSchema = yup.object().shape({
    fullName: yup.string().required('Vui lòng nhập họ tên'),
    email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    phone: yup
        .string()
        .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
        .required('Vui lòng nhập số điện thoại'),
    password: yup
        .string()
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .required('Vui lòng nhập mật khẩu'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không khớp')
        .required('Vui lòng xác nhận mật khẩu'),
});

const RegisterForm = () => {
    const { showLoading, hideLoading } = useLoadingStore();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        showLoading('Đang đăng ký...', 'oval');

        try {
            const { confirmPassword, ...userData } = data;
            await authService.register(userData);
            notification.success('Đăng ký thành công! Đang chuyển hướng...');
        } catch (error) {
            console.error('Register error:', error);
        } finally {
            hideLoading();
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Đăng ký</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Họ và tên"
                    placeholder="Nguyễn Văn A"
                    error={errors.fullName?.message}
                    {...register('fullName')}
                />

                <Input
                    label="Email"
                    type="email"
                    placeholder="example@email.com"
                    error={errors.email?.message}
                    {...register('email')}
                />

                <Input
                    label="Số điện thoại"
                    placeholder="0123456789"
                    error={errors.phone?.message}
                    {...register('phone')}
                />

                <Input
                    label="Mật khẩu"
                    type="password"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    {...register('password')}
                />

                <Input
                    label="Xác nhận mật khẩu"
                    type="password"
                    placeholder="••••••••"
                    error={errors.confirmPassword?.message}
                    {...register('confirmPassword')}
                />

                <Button type="submit" className="w-full">
                    Đăng ký
                </Button>
            </form>

            <div className="mt-4 text-center text-sm">
                Đã có tài khoản?{' '}
                <a href="/login" className="text-blue-600 hover:underline">
                    Đăng nhập ngay
                </a>
            </div>
        </div>
    );
};

export default RegisterForm;
