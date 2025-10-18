<template>
  <div class="results-display">
    <div class="results-header">
      <h2>📊 計算結果</h2>
      <button @click="$emit('reset')" class="reset-btn">
        🔄 重新計算
      </button>
    </div>
    
    <div class="results-grid">
      <!-- 主要指標 -->
      <div class="result-card primary">
        <div class="card-header">
          <h3>🔥 基礎代謝率 (BMR)</h3>
          <p>維持基本生理功能所需的熱量</p>
        </div>
        <div class="card-value">
          <span class="number">{{ results.bmr }}</span>
          <span class="unit">卡路里/天</span>
        </div>
      </div>
      
      <div class="result-card primary">
        <div class="card-header">
          <h3>⚡ 每日總熱量需求 (TDEE)</h3>
          <p>包含活動量的總熱量需求</p>
        </div>
        <div class="card-value">
          <span class="number">{{ results.tdee }}</span>
          <span class="unit">卡路里/天</span>
        </div>
      </div>
      
      <!-- BMI 資訊 -->
      <div class="result-card secondary">
        <div class="card-header">
          <h3>📏 身體質量指數 (BMI)</h3>
          <p>{{ results.bmi.category }}</p>
        </div>
        <div class="card-value">
          <span class="number">{{ results.bmi.value }}</span>
          <span class="unit">kg/m²</span>
        </div>
      </div>
      
      <div class="result-card secondary">
        <div class="card-header">
          <h3>🏃 活動量</h3>
          <p>{{ results.activityInfo.description }}</p>
        </div>
        <div class="card-value">
          <span class="activity-name">{{ results.activityInfo.name }}</span>
        </div>
      </div>
    </div>
    
    <!-- 目標建議 -->
    <div class="goals-section">
      <h3>🎯 目標建議</h3>
      <div class="goals-grid">
        <div class="goal-card maintain">
          <div class="goal-header">
            <h4>維持體重</h4>
            <span class="goal-icon">⚖️</span>
          </div>
          <div class="goal-calories">{{ results.tdee }} 卡路里/天</div>
          <p>保持目前的體重</p>
        </div>
        
        <div class="goal-card lose">
          <div class="goal-header">
            <h4>減重</h4>
            <span class="goal-icon">📉</span>
          </div>
          <div class="goal-calories">{{ results.weightLoss }} 卡路里/天</div>
          <p>每週減重約 0.5 公斤</p>
        </div>
        
        <div class="goal-card gain">
          <div class="goal-header">
            <h4>增重</h4>
            <span class="goal-icon">📈</span>
          </div>
          <div class="goal-calories">{{ results.weightGain }} 卡路里/天</div>
          <p>每週增重約 0.5 公斤</p>
        </div>
      </div>
    </div>
    
    <!-- 健康建議 -->
    <div class="tips-section">
      <h3>💡 健康建議</h3>
      <div class="tips-grid">
        <div class="tip-card">
          <div class="tip-icon">🥗</div>
          <h4>均衡飲食</h4>
          <p>確保攝取足夠的蛋白質、碳水化合物和健康脂肪</p>
        </div>
        
        <div class="tip-card">
          <div class="tip-icon">💧</div>
          <h4>充足水分</h4>
          <p>每天至少飲用 8 杯水，保持身體水分平衡</p>
        </div>
        
        <div class="tip-card">
          <div class="tip-icon">🏃‍♀️</div>
          <h4>規律運動</h4>
          <p>結合有氧運動和肌力訓練，提升整體健康</p>
        </div>
        
        <div class="tip-card">
          <div class="tip-icon">😴</div>
          <h4>充足睡眠</h4>
          <p>每晚 7-9 小時的優質睡眠，有助於代謝和恢復</p>
        </div>
      </div>
    </div>
    
    <!-- 注意事項 -->
    <div class="disclaimer">
      <h4>⚠️ 重要提醒</h4>
      <ul>
        <li>此計算結果僅供參考，實際需求可能因個人差異而有所不同</li>
        <li>如有健康疑慮，請諮詢專業醫師或營養師</li>
        <li>減重或增重應循序漸進，避免過於極端的飲食調整</li>
        <li>建議搭配規律運動以達到更好的效果</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultsDisplay',
  props: {
    results: {
      type: Object,
      required: true
    }
  },
  emits: ['reset']
}
</script>

<style scoped>
.results-display {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f1f5f9;
}

.results-header h2 {
  margin: 0;
  color: #2d3748;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reset-btn {
  background: #f7fafc;
  color: #4a5568;
  border: 2px solid #e2e8f0;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reset-btn:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.result-card {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  transition: transform 0.3s ease;
}

.result-card:hover {
  transform: translateY(-2px);
}

.result-card.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.result-card.secondary {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
}

.card-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.card-header p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

.card-value {
  margin-top: 1rem;
  text-align: center;
}

.card-value .number {
  font-size: 2.5rem;
  font-weight: bold;
  display: block;
  line-height: 1;
}

.card-value .unit {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 0.5rem;
  display: block;
}

.activity-name {
  font-size: 1.2rem;
  font-weight: 600;
  display: block;
  text-align: center;
}

.goals-section {
  margin-bottom: 2rem;
}

.goals-section h3 {
  color: #2d3748;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.goals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.goal-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
}

.goal-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.goal-card.maintain {
  border-color: #48bb78;
}

.goal-card.lose {
  border-color: #ed8936;
}

.goal-card.gain {
  border-color: #4299e1;
}

.goal-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.goal-header h4 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.goal-calories {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.goal-card p {
  margin: 0;
  color: #718096;
  font-size: 0.9rem;
}

.tips-section {
  margin-bottom: 2rem;
}

.tips-section h3 {
  color: #2d3748;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.tip-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid #e2e8f0;
}

.tip-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.tip-card h4 {
  margin: 0 0 0.5rem 0;
  color: #2d3748;
  font-size: 1rem;
}

.tip-card p {
  margin: 0;
  color: #718096;
  font-size: 0.9rem;
  line-height: 1.4;
}

.disclaimer {
  background: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
}

.disclaimer h4 {
  margin: 0 0 1rem 0;
  color: #c53030;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.disclaimer ul {
  margin: 0;
  padding-left: 1.5rem;
}

.disclaimer li {
  color: #742a2a;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .results-display {
    padding: 1.5rem;
  }
  
  .results-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .results-grid {
    grid-template-columns: 1fr;
  }
  
  .goals-grid,
  .tips-grid {
    grid-template-columns: 1fr;
  }
}
</style>
