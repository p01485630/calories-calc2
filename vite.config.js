// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// ⚙️ 將 'calories-calc' 改成你的 GitHub 專案名稱（repo 名稱）
export default defineConfig({
  plugins: [vue()],
  base: '/calories-calc/', // 👈 這是關鍵！部署到 GitHub Pages 要設定 base 路徑
  build: {
    outDir: 'dist', // 輸出資料夾（預設也是 dist）
    sourcemap: false, // 可視情況開啟除錯 map
  }
})


