module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh', 'react-hooks', 'prettier'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true, allowExportNames: ['renderWithProviders'] },
        ],

        // PropTypes - OFF vì đang dùng mock data template, sẽ enable khi có API thực tế
        'react/prop-types': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',

        // React Hooks
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',

        // General - Relaxed cho development với mock/template data
        'no-console': ['warn', { allow: ['warn', 'error', 'group', 'groupEnd', 'log'] }],
        'no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                // Ignore mock data variables và template code
                varsIgnorePattern: '^(React|vi|global|process|__dirname|confirmPassword|useAuthStore|config|errorInfo|additionalData|expect|error)$',
            },
        ],
        'no-debugger': 'warn',
        'prefer-const': 'warn',

        // Prettier
        'prettier/prettier': ['warn', { endOfLine: 'auto' }],
    },
    globals: {
        vi: 'readonly',
        global: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
    },
};
