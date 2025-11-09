import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store';
import AppRoutes from './routes';
import useAuthStore from '@store/authStore';
import useLoadingStore from '@store/loadingStore';
import Loading from '@components/ui/Loading';
import ErrorBoundary from '@components/ErrorBoundary';
import { setupGlobalErrorHandlers } from '@utils/errorLogger';
import './App.css';

// Create a client for React Query
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000, // 5 minutes
        },
    },
});

// Setup global error handlers
setupGlobalErrorHandlers();

function App() {
    const initAuth = useAuthStore((state) => state.initAuth);
    const { isLoading, loadingText, loadingType } = useLoadingStore();

    // Khởi tạo auth từ localStorage khi app load
    useEffect(() => {
        initAuth();
    }, [initAuth]);

    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <BrowserRouter>
                        {/* Toast Notifications - React Hot Toast */}
                        <Toaster
                            position="top-right"
                            reverseOrder={false}
                            gutter={8}
                            toastOptions={{
                                duration: 3000,
                                style: {
                                    background: '#363636',
                                    color: '#fff',
                                },
                            }}
                        />

                        {/* Toast Notifications - React Toastify */}
                        <ToastContainer
                            position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />

                        {/* Global Loading Overlay */}
                        {isLoading && (
                            <Loading type={loadingType} text={loadingText} fullScreen={true} />
                        )}

                        {/* App Routes */}
                        <AppRoutes />
                    </BrowserRouter>
                </Provider>

                {/* React Query DevTools - Only in development */}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ErrorBoundary>
    );
}

export default App;
