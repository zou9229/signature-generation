import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // 使用IPv4地址而不是IPv6
    port: 5173,
    strictPort: false, // 如果端口被占用，自动尝试下一个可用端口
  },
})
