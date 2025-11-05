// Định nghĩa kiểu dữ liệu Auth
export const AuthTokenType = {
    ACCESS: 'access',
    REFRESH: 'refresh',
};

// Example Auth structure
export const AuthExample = {
    user: {
        id: '',
        username: '',
        email: '',
        role: '',
    },
    token: '',
    refreshToken: '',
    expiresIn: 3600,
};

// Login Request structure
export const LoginRequest = {
    username: '',
    password: '',
};

// Register Request structure
export const RegisterRequest = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
};
