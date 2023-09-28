import React, {useEffect, useState} from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import { fetchWeatherData } from '../utils/api'
import {setStoredCities, getStoredCities, LocalStorageOptions, getStoredOptions, setStoredOptions} from "../utils/storage"
import {Box } from '@mui/material'
import WeatherCard from './components/WeatherCard'
import CityInput from './components/CityInput'
import { Messages } from '../utils/messages'

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([])
  const [cityInput, setCityInput] = useState<string>("")
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)

  useEffect(() => {
    getStoredCities()
      .then(cities => setCities(cities))
    getStoredOptions()
      .then(options => setOptions(options))
  }, [])

  const handleAddCity = () => {
    if(cityInput == '') {
      return
    }
    const newCities = [...cities, cityInput]
    setStoredCities(newCities)
    .then(() => {
      setCities(newCities)
      setCityInput('')
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityInput(e.target.value);
  }

  const handleDelete = (index: number) => {
      cities.splice(index, 1)
      const newCities = [...cities]
      setStoredCities(newCities)
      .then( () =>{
        setCities(newCities)
      }
      )
  }

  const handleScaleChange = () => {
    const updateOptions: LocalStorageOptions = {
      ...options,
      scale: options.scale === 'metric' ? 'imperial' : 'metric'
    }
    setStoredOptions(updateOptions).then(() => {
      setOptions(updateOptions)
    })
  }

  const overlayToggle = () => {
    chrome.tabs.query({
      active: true
    }, (tabs) => {
      if(tabs.length > 0) {
        console.log("Sending message to tab:", tabs[0].id)
        chrome.tabs.sendMessage(tabs[0].id,Messages.TOGGLE_OVERLAY)
      }
    })
  }

  if(!options) {
    return null
  }

  return (
    <Box>
      <CityInput handleOverlayButtonClick={overlayToggle} onChange={handleInputChange} cityInput={cityInput} onAdd={handleAddCity} options={options} onScaleChange={handleScaleChange}/>
      {
        options.homeCity != "" && 
        <WeatherCard scale={options.scale} city={options.homeCity} homeCity={options.homeCity}/>
      }
      {
        cities.map((city, index) => {
          return <WeatherCard homeCity={options.homeCity} scale={options.scale} city={city} key={index} onDelete={() => handleDelete(index)}/>
        })
      }
      <Box height="16px"/>
    </Box>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
