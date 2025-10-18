<template>
  <div class="personal-info">
    <h2>📋 個人資訊</h2>
    
    <form @submit.prevent="handleSubmit" class="info-form">
      <div class="form-row">
        <div class="form-group">
          <label for="gender">性別</label>
          <select 
            id="gender" 
            v-model="formData.gender" 
            class="form-control"
            required
          >
            <option value="">請選擇性別</option>
            <option value="male">男性</option>
            <option value="female">女性</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="age">年齡</label>
          <input 
            id="age" 
            type="number" 
            v-model.number="formData.age" 
            placeholder="歲"
            class="form-control"
            min="1"
            max="120"
            required
          />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="weight">體重</label>
          <div class="input-with-unit">
            <input 
              id="weight" 
              type="number" 
              v-model.number="formData.weight" 
              placeholder="公斤"
              class="form-control"
              min="1"
              max="300"
              step="0.1"
              required
            />
            <span class="unit">kg</span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="height">身高</label>
          <div class="input-with-unit">
            <input 
              id="height" 
              type="number" 
              v-model.number="formData.height" 
              placeholder="公分"
              class="form-control"
              min="50"
              max="250"
              required
            />
            <span class="unit">cm</span>
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label for="activity">活動量</label>
        <select 
          id="activity" 
          v-model="formData.activityLevel" 
          class="form-control"
          required
        >
          <option value="">請選擇活動量</option>
          <option value="1.2">久坐 (很少運動，辦公室工作)</option>
          <option value="1.375">輕度活動 (每週運動 1-3 次)</option>
          <option value="1.55">中度活動 (每週運動 3-5 次)</option>
          <option value="1.725">高度活動 (每週運動 6-7 次)</option>
          <option value="1.9">極高度活動 (每天運動或體力工作)</option>
        </select>
        <small class="form-help">
          選擇最符合您日常活動量的選項
        </small>
      </div>
      
      <button 
        type="submit" 
        class="submit-btn"
        :disabled="!isFormValid"
      >
        <span v-if="isLoading">計算中...</span>
        <span v-else>🔥 計算我的熱量需求</span>
      </button>
    </form>
    
    <!-- BMI 預覽 -->
    <div v-if="bmiPreview" class="bmi-preview">
      <h3>📊 BMI 預覽</h3>
      <div class="bmi-card">
        <div class="bmi-value">{{ bmiPreview.value }}</div>
        <div class="bmi-category">{{ bmiPreview.category }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { calculateBMI } from '../utils/calculations.js'

export default {
  name: 'PersonalInfo',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        gender: '',
        age: null,
        weight: null,
        height: null,
        activityLevel: ''
      }
    }
  },
  computed: {
    isFormValid() {
      return this.formData.gender && this.formData.gender !== '' &&
             this.formData.age !== null && this.formData.age !== undefined && this.formData.age > 0 &&
             this.formData.weight !== null && this.formData.weight !== undefined && this.formData.weight > 0 &&
             this.formData.height !== null && this.formData.height !== undefined && this.formData.height > 0 &&
             this.formData.activityLevel && this.formData.activityLevel !== ''
    },
    bmiPreview() {
      if (this.formData.weight !== null && this.formData.weight !== undefined && 
          this.formData.height !== null && this.formData.height !== undefined &&
          this.formData.weight > 0 && this.formData.height > 0) {
        try {
          return calculateBMI(this.formData.weight, this.formData.height)
        } catch (error) {
          return null
        }
      }
      return null
    }
  },
  methods: {
    handleSubmit(event) {
      // 防止表單的默認提交行為
      if (event) {
        event.preventDefault()
      }
      if (this.isFormValid) {
        // 確保數據正確傳遞
        const submitData = {
          gender: this.formData.gender,
          age: this.formData.age,
          weight: this.formData.weight,
          height: this.formData.height,
          activityLevel: this.formData.activityLevel
        }
        
        this.$emit('submit', submitData)
      }
    },
    resetForm() {
      this.formData = {
        gender: '',
        age: null,
        weight: null,
        height: null,
        activityLevel: ''
      }
    }
  }
}
</script>

<style scoped>
.personal-info {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.personal-info h2 {
  margin-top: 0;
  color: #2d3748;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.form-control {
  padding: 0.875rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #fafafa;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-control:invalid {
  border-color: #e53e3e;
}

.input-with-unit {
  position: relative;
}

.input-with-unit .unit {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #718096;
  font-size: 0.9rem;
  pointer-events: none;
}

.input-with-unit .form-control {
  padding-right: 3rem;
}

.form-help {
  color: #718096;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.bmi-preview {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.bmi-preview h3 {
  margin: 0 0 1rem 0;
  color: #2d3748;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bmi-card {
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid #e2e8f0;
}

.bmi-value {
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.bmi-category {
  color: #4a5568;
  font-weight: 500;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .personal-info {
    padding: 1.5rem;
  }
}
</style>
