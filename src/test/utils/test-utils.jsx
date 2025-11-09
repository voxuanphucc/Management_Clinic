import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@store/slices/authSlice';
import userReducer from '@store/slices/userSlice';

// Create a test store
export function createTestStore(preloadedState = {}) {
    return configureStore({
        reducer: {
            auth: authReducer,
            user: userReducer,
        },
        preloadedState,
    });
}

// Custom render with providers
export function renderWithProviders(
    ui,
    { preloadedState = {}, store = createTestStore(preloadedState), ...renderOptions } = {}
) {
    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                <BrowserRouter>{children}</BrowserRouter>
            </Provider>
        );
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Mock navigation
export const mockNavigate = vi.fn();

// Mock notification
export const mockNotification = {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
    loading: vi.fn(),
};

// Wait for loading to finish
export const waitForLoadingToFinish = () => {
    return new Promise((resolve) => setTimeout(resolve, 0));
};

// Re-export everything
export * from '@testing-library/react';
