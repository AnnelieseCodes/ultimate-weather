import React from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import { fetchWeatherData } from '../utils/api'
import WeatherCard from './components/WeatherCard'

const App: React.FC<{}> = () => {
  return (
    <div>
      <WeatherCard city="Denver"/>
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
