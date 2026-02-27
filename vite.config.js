import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/build-a-garden/',
    plugins: [react()],
});
