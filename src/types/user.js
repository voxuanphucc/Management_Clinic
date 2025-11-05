// Định nghĩa kiểu dữ liệu User
export const UserRoles = {
    ADMIN: 'admin',
    DOCTOR: 'doctor',
    NURSE: 'nurse',
    RECEPTIONIST: 'receptionist',
    PATIENT: 'patient',
};

export const UserStatus = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
};

// Example User structure
export const UserExample = {
    id: '',
    username: '',
    email: '',
    fullName: '',
    role: UserRoles.PATIENT,
    status: UserStatus.ACTIVE,
    avatar: '',
    phone: '',
    address: '',
    createdAt: '',
    updatedAt: '',
};
