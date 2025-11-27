export const calculateBMI = (weight, height) => {
  const weightNum = parseFloat(weight)
  const heightNum = parseFloat(height)
  const heightInMeters = heightNum / 100
  const bmi = weightNum / (heightInMeters * heightInMeters)
  return bmi.toFixed(1)
}

export const getBMICategory = (bmi) => {
  const bmiValue = parseFloat(bmi)
  
  if (bmiValue < 18.5) return 'Недостаточный вес'
  if (bmiValue < 25) return 'Нормальный вес'
  if (bmiValue < 30) return 'Избыточный вес'
  return 'Ожирение'
}