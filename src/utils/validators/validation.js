/**
 * Validation Utilities
 * Hàm validate dữ liệu
 */

// Validate email
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate phone number (VN)
export const isValidPhone = (phone) => {
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Validate password strength
export const validatePassword = (password) => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const score = {
        length: password.length >= minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar,
    };

    const strength = Object.values(score).filter(Boolean).length;

    return {
        isValid: password.length >= minLength,
        strength, // 1-5
        message: getPasswordStrengthMessage(strength),
        details: score,
    };
};

const getPasswordStrengthMessage = (strength) => {
    switch (strength) {
        case 1:
        case 2:
            return 'Mật khẩu yếu';
        case 3:
            return 'Mật khẩu trung bình';
        case 4:
            return 'Mật khẩu mạnh';
        case 5:
            return 'Mật khẩu rất mạnh';
        default:
            return 'Mật khẩu quá yếu';
    }
};

// Validate date
export const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
};

// Validate age (must be >= minAge)
export const isValidAge = (birthDate, minAge = 0) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        return age - 1 >= minAge;
    }
    return age >= minAge;
};

// Validate URL
export const isValidURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

// Validate file size (in MB)
export const isValidFileSize = (file, maxSizeMB = 5) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
};

// Validate file type
export const isValidFileType = (file, allowedTypes = []) => {
    if (allowedTypes.length === 0) return true;
    return allowedTypes.includes(file.type);
};

// Validate image dimensions
export const validateImageDimensions = (file, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                resolve({
                    isValid: img.width <= maxWidth && img.height <= maxHeight,
                    width: img.width,
                    height: img.height,
                });
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
};

// Validate CCCD/CMND (VN ID card)
export const isValidIDCard = (idCard) => {
    // CMND: 9 hoặc 12 số
    // CCCD: 12 số
    const idCardRegex = /^[0-9]{9}$|^[0-9]{12}$/;
    return idCardRegex.test(idCard);
};

// Validate required fields
export const validateRequiredFields = (data, requiredFields) => {
    const errors = {};

    requiredFields.forEach((field) => {
        if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
            errors[field] = 'Trường này là bắt buộc';
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};
