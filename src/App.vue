<template>
  <div id="app">
    <header class="header">
      <h1>🔥 熱量計算機</h1>
      <p>計算您的每日熱量需求</p>
    </header>
    
    <main class="main">
      <CalorieCalculator />
    </main>
    
    <footer class="footer">
      <p>&copy; 2024 熱量計算機 - 健康生活從計算開始</p>
    </footer>
  </div>
</template>

<script>
import CalorieCalculator from './components/CalorieCalculator.vue'

export default {
  name: 'App',
  components: {
    CalorieCalculator
  }
}
</script>

<style scoped>
.header {
  text-align: center;
  padding: 2rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin-bottom: 2rem;
}

.header h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold;
}

.header p {
  margin: 0.5rem 0 0 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

.main {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer {
  text-align: center;
  padding: 2rem 0;
  margin-top: 3rem;
  background-color: #f8f9fa;
  color: #6c757d;
}
</style>
