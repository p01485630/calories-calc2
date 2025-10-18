<template>
  <div class="calculator">
    <!-- 個人資訊輸入 -->
    <PersonalInfo 
      :is-loading="isLoading"
      @submit="handleCalculate"
    />
    
    <!-- 計算結果顯示 -->
    <ResultsDisplay 
      v-if="results"
      :results="results"
      @reset="handleReset"
    />
    
    <!-- 載入狀態 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>正在計算您的熱量需求...</p>
      </div>
    </div>
  </div>
</template>

<script>
import PersonalInfo from './PersonalInfo.vue'
import ResultsDisplay from './ResultsDisplay.vue'
import { calculateAll } from '../utils/calculations.js'

export default {
  name: 'CalorieCalculator',
  components: {
    PersonalInfo,
    ResultsDisplay
  },
  data() {
    return {
      isLoading: false,
      results: null,
      isCalculating: false
    }
  },
  methods: {
    async handleCalculate(userInfo) {
      // 防止重複計算
      if (this.isCalculating) {
        return
      }
      
      // 檢查數據是否有效
      if (!userInfo || typeof userInfo !== 'object' || !userInfo.gender) {
        this.showError('數據格式錯誤，請重新填寫表單')
        return
      }
      
      this.isCalculating = true
      this.isLoading = true
      
      try {
        // 模擬計算延遲，提供更好的使用者體驗
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const calculationResult = calculateAll(userInfo)
        
        if (calculationResult.success) {
          this.results = calculationResult
        } else {
          this.showError(calculationResult.error)
        }
      } catch (error) {
        this.showError(`計算過程中發生錯誤：${error.message}`)
      } finally {
        this.isLoading = false
        this.isCalculating = false
      }
    },
    
    handleReset() {
      this.results = null
    },
    
    showError(message) {
      // 使用更優雅的錯誤提示方式
      this.$nextTick(() => {
        // 可以在這裡添加更優雅的錯誤提示組件
        alert(`錯誤：${message}`)
      })
    }
  }
}
</script>

<style scoped>
.calculator {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.loading-spinner {
  text-align: center;
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-spinner p {
  margin: 0;
  color: #4a5568;
  font-weight: 500;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .calculator {
    padding: 0 1rem;
  }
}
</style>
