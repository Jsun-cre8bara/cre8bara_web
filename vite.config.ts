import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  // 주의: 로컬 개발 환경에서는 Vercel Functions가 작동하지 않습니다.
  // 로컬 테스트를 위해서는 `vercel dev` 명령어를 사용하세요.
  // 또는 VERCEL_URL 환경변수를 설정하여 배포된 API를 사용할 수 있습니다.
  server: {
    host: '0.0.0.0',
    port: 5173,
    ...(process.env.VERCEL_URL ? {
      proxy: {
        '/api': {
          target: `https://${process.env.VERCEL_URL}`,
          changeOrigin: true,
          secure: true,
        },
      },
    } : {}),
  },
})
