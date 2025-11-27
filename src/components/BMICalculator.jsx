import React, { useState } from 'react'
import { calculateBMI, getBMICategory } from '../utils/bmiCalculator'
import '../styles/BMICalculator.css'

const BMICalculator = () => {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [category, setCategory] = useState('')
  const [isCalculating, setIsCalculating] = useState(false)

  const handleCalculate = (e) => {
    e.preventDefault()
    
    if (!weight || !height) {
      alert('Пожалуйста, введите вес и рост')
      return
    }

    setIsCalculating(true)
    
    // Анимация расчета
    setTimeout(() => {
      const calculatedBMI = calculateBMI(weight, height)
      const bmiCategory = getBMICategory(calculatedBMI)
      
      setBmi(calculatedBMI)
      setCategory(bmiCategory)
      setIsCalculating(false)
    }, 800)
  }

  const handleReset = () => {
    setWeight('')
    setHeight('')
    setBmi(null)
    setCategory('')
  }

  const getCategoryColor = () => {
    switch(category) {
      case 'Недостаточный вес': return '#FFB74D'
      case 'Нормальный вес': return '#4CAF50'
      case 'Избыточный вес': return '#FF9800'
      case 'Ожирение': return '#F44336'
      default: return '#6C63FF'
    }
  }

  return (
    <div className="bmi-calculator">
      <div className="magic-sparkles"></div>
      
      <div className="calculator-container">
        <h1 className="title">
          ✨ Калькулятор ИМТ ✨
        </h1>
        
        <form onSubmit={handleCalculate} className="bmi-form">
          <div className="input-group">
            <label className="input-label">
              <span className="label-text">Вес (кг)</span>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Введите ваш вес"
                className="input-field"
                step="0.1"
                min="1"
                max="300"
              />
            </label>
          </div>

          <div className="input-group">
            <label className="input-label">
              <span className="label-text">Рост (см)</span>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Введите ваш рост"
                className="input-field"
                step="0.1"
                min="50"
                max="300"
              />
            </label>
          </div>

          <div className="button-group">
            <button 
              type="submit" 
              className="calculate-btn"
              disabled={isCalculating}
            >
              {isCalculating ? (
                <span className="loading">
                  <div className="spinner"></div>
                  Расчет...
                </span>
              ) : (
                '✨ Рассчитать ИМТ'
              )}
            </button>
            
            <button 
              type="button" 
              onClick={handleReset}
              className="reset-btn"
            >
              🔄 Сбросить
            </button>
          </div>
        </form>

        {bmi && category && (
          <div 
            className="result-container"
            style={{ '--category-color': getCategoryColor() }}
          >
            <div className="result-card">
              <h3 className="result-title">Ваш результат:</h3>
              <div className="bmi-value">{bmi}</div>
              <div className="bmi-category">{category}</div>
              
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${Math.min((bmi / 40) * 100, 100)}%`,
                    backgroundColor: getCategoryColor()
                  }}
                ></div>
              </div>
              
              <div className="bmi-scale">
                <span>Недостаточный</span>
                <span>Нормальный</span>
                <span>Избыточный</span>
                <span>Ожирение</span>
              </div>
            </div>
          </div>
        )}

        <div className="info-section">
          <h4>Что такое ИМТ?</h4>
          <p>
            Индекс массы тела (ИМТ) - это показатель соотношения веса и роста, 
            который помогает оценить, находится ли вес в здоровом диапазоне.
          </p>
        </div>
      </div>
    </div>
  )
}

export default BMICalculator