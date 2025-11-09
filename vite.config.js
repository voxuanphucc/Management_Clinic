import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Plugin to serve index.html from public folder
const publicIndexHtmlPlugin = () => ({
    name: 'public-index-html',
    configureServer(server) {
        return () => {
            server.middlewares.use(async (req, res, next) => {
                if (req.url === '/' || req.url === '/index.html') {
                    try {
                        const htmlPath = path.resolve(__dirname, 'public/index.html');
                        let html = fs.readFileSync(htmlPath, 'utf-8');

                        // Transform HTML through Vite for HMR and module injection
                        html = await server.transformIndexHtml(req.url, html);

                        res.setHeader('Content-Type', 'text/html');
                        res.end(html);
                        return;
                    } catch (e) {
                        return next(e);
                    }
                }
                next();
            });
        };
    },
});

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), publicIndexHtmlPlugin()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@services': path.resolve(__dirname, './src/services'),
            '@utils': path.resolve(__dirname, './src/components/utils'),
            '@hooks': path.resolve(__dirname, './src/components/hooks'),
            '@store': path.resolve(__dirname, './src/store'),
            '@config': path.resolve(__dirname, './src/config'),
            '@assets': path.resolve(__dirname, './src/assets'),
        },
    },
    server: {
        port: 3000,
    },
    build: {
        sourcemap: true, // Enable source maps for production debugging
        rollupOptions: {
            input: path.resolve(__dirname, 'public/index.html'),
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-router-dom'],
                    redux: ['@reduxjs/toolkit', 'react-redux', 'zustand'],
                    ui: ['react-hot-toast', 'react-loader-spinner'],
                    forms: ['react-hook-form', 'yup', '@hookform/resolvers'],
                },
            },
        },
    },
});
