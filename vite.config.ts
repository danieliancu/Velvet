import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/api/opensky': {
            target: 'https://opensky-network.org',
            changeOrigin: true,
            secure: true,
            rewrite: (p) => p.replace(/^\/api\/opensky/, '/api'),
            configure: (proxy) => {
              proxy.on('proxyRes', (proxyRes) => {
                // Prevent browser basic-auth popups on upstream 401
                if (proxyRes.headers['www-authenticate']) {
                  delete proxyRes.headers['www-authenticate'];
                }
              });
            },
          },
          '/api/airlabs': {
            target: 'https://airlabs.co',
            changeOrigin: true,
            secure: true,
            rewrite: (p) => p.replace(/^\/api\/airlabs/, '/api/v9'),
          },
          '/api/dvla': {
            target: 'https://driver-vehicle-licensing.api.gov.uk',
            changeOrigin: true,
            secure: true,
            rewrite: (p) => p.replace(/^\/api\/dvla/, ''),
            configure: (proxy) => {
              proxy.on('proxyReq', (proxyReq) => {
                if (env.VITE_DVLA_API_KEY) {
                  proxyReq.setHeader('x-api-key', env.VITE_DVLA_API_KEY);
                  proxyReq.setHeader('Content-Type', 'application/json');
                }
              });
            },
          },
        },
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
