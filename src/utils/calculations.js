/**
 * 熱量計算工具函數
 * 包含 BMR 和 TDEE 的計算邏輯
 */

/**
 * 計算基礎代謝率 (BMR) - 使用 Mifflin-St Jeor 公式
 * @param {string} gender - 性別 ('male' 或 'female')
 * @param {number} weight - 體重 (公斤)
 * @param {number} height - 身高 (公分)
 * @param {number} age - 年齡 (歲)
 * @returns {number} BMR 值
 */
export function calculateBMR(gender, weight, height, age) {
  // 檢查性別是否為 undefined 或 null
  if (gender === undefined || gender === null) {
    throw new Error('性別參數未定義，請檢查數據傳遞')
  }
  
  if (weight === null || weight === undefined || height === null || height === undefined || age === null || age === undefined) {
    throw new Error('請提供完整的體重、身高和年齡資訊')
  }

  if (weight <= 0 || height <= 0 || age <= 0) {
    throw new Error('體重、身高和年齡必須大於 0')
  }

  if (age > 120) {
    throw new Error('年齡不能超過 120 歲')
  }

  // 確保性別是字串並轉換為小寫，同時處理中文
  let normalizedGender = String(gender).toLowerCase().trim()
  
  // 處理中文性別選項
  if (normalizedGender === '男性' || normalizedGender === '男') {
    normalizedGender = 'male'
  } else if (normalizedGender === '女性' || normalizedGender === '女') {
    normalizedGender = 'female'
  }

  let bmr
  if (normalizedGender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5
  } else if (normalizedGender === 'female') {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161
  } else {
    throw new Error(`性別必須是 male 或 female，但收到: "${gender}" (類型: ${typeof gender})，標準化後: "${normalizedGender}"`)
  }

  return Math.round(bmr)
}

/**
 * 計算每日總熱量需求 (TDEE)
 * @param {number} bmr - 基礎代謝率
 * @param {number} activityLevel - 活動量係數
 * @returns {number} TDEE 值
 */
export function calculateTDEE(bmr, activityLevel) {
  if (!bmr || !activityLevel) {
    throw new Error('請提供 BMR 和活動量係數')
  }

  if (activityLevel < 1.2 || activityLevel > 1.9) {
    throw new Error('活動量係數必須在 1.2 到 1.9 之間')
  }

  return Math.round(bmr * activityLevel)
}

/**
 * 計算減重建議熱量
 * @param {number} tdee - 每日總熱量需求
 * @param {number} deficit - 熱量赤字 (預設 500 卡路里)
 * @returns {number} 減重建議熱量
 */
export function calculateWeightLossCalories(tdee, deficit = 500) {
  if (!tdee) {
    throw new Error('請提供 TDEE 值')
  }

  const weightLossCalories = tdee - deficit
  return Math.max(weightLossCalories, 1200) // 最低不低於 1200 卡路里
}

/**
 * 計算增重建議熱量
 * @param {number} tdee - 每日總熱量需求
 * @param {number} surplus - 熱量盈餘 (預設 500 卡路里)
 * @returns {number} 增重建議熱量
 */
export function calculateWeightGainCalories(tdee, surplus = 500) {
  if (!tdee) {
    throw new Error('請提供 TDEE 值')
  }

  return tdee + surplus
}

/**
 * 獲取活動量描述
 * @param {number} activityLevel - 活動量係數
 * @returns {object} 活動量描述物件
 */
export function getActivityDescription(activityLevel) {
  const activities = {
    1.2: { name: '久坐', description: '很少運動，辦公室工作' },
    1.375: { name: '輕度活動', description: '每週運動 1-3 次' },
    1.55: { name: '中度活動', description: '每週運動 3-5 次' },
    1.725: { name: '高度活動', description: '每週運動 6-7 次' },
    1.9: { name: '極高度活動', description: '每天運動或體力工作' }
  }

  return activities[activityLevel] || { name: '未知', description: '請選擇活動量' }
}

/**
 * 計算 BMI (身體質量指數)
 * @param {number} weight - 體重 (公斤)
 * @param {number} height - 身高 (公分)
 * @returns {object} BMI 值和分類
 */
export function calculateBMI(weight, height) {
  if (weight === null || weight === undefined || height === null || height === undefined) {
    throw new Error('請提供體重和身高')
  }

  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)
  
  let category = ''
  if (bmi < 18.5) {
    category = '體重過輕'
  } else if (bmi < 24) {
    category = '正常體重'
  } else if (bmi < 27) {
    category = '體重過重'
  } else if (bmi < 30) {
    category = '輕度肥胖'
  } else if (bmi < 35) {
    category = '中度肥胖'
  } else {
    category = '重度肥胖'
  }

  return {
    value: Math.round(bmi * 10) / 10,
    category
  }
}

/**
 * 完整的熱量計算
 * @param {object} userInfo - 使用者資訊
 * @returns {object} 計算結果
 */
export function calculateAll(userInfo) {
  // 直接從 userInfo 物件中取得值，避免解構問題
  const gender = userInfo.gender
  const age = userInfo.age
  const weight = userInfo.weight
  const height = userInfo.height
  const activityLevel = userInfo.activityLevel

  // 特別檢查性別
  if (gender === undefined || gender === null || gender === '') {
    throw new Error('性別參數缺失，請確保已選擇性別')
  }

  // 確保數值轉換為數字類型
  const numericAge = Number(age)
  const numericWeight = Number(weight)
  const numericHeight = Number(height)

  try {
    const bmr = calculateBMR(gender, numericWeight, numericHeight, numericAge)
    const tdee = calculateTDEE(bmr, parseFloat(activityLevel))
    const weightLoss = calculateWeightLossCalories(tdee)
    const weightGain = calculateWeightGainCalories(tdee)
    const bmi = calculateBMI(numericWeight, numericHeight)
    const activityInfo = getActivityDescription(parseFloat(activityLevel))

    return {
      bmr,
      tdee,
      weightLoss,
      weightGain,
      bmi,
      activityInfo,
      success: true
    }
  } catch (error) {
    return {
      error: error.message,
      success: false
    }
  }
}
