import { setStoredCities, setStoredOptions, getStoredCities, getStoredOptions } from "../utils/storage";
import { fetchWeatherData } from "../utils/api";

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([])
  setStoredOptions({
    homeCity: 'Denver',
    scale: 'metric',
    hasOverlay: false
  })

  chrome.contextMenus.create({
    contexts: ['selection'],
    title: "Add city to weather extension",
    id: "weatherExtension"
  })

  chrome.alarms.create({
  periodInMinutes: 1
  })
})

chrome.alarms.onAlarm.addListener(() => {
  getStoredOptions().then((options)=>{
  console.log(options.homeCity, options.scale)
  if(options.homeCity === "") {
    return
  }
  fetchWeatherData(options.homeCity, options.scale)
  .then((data) => {
    console.log(data)
    const temp = Math.round(data.main.temp)
    const symbol = options.scale === "metric" ? '\u2103': '\u2109'
    chrome.action.setBadgeText({
      text: `${temp} ${symbol}`
    })
    chrome.action.setBadgeBackgroundColor({ color: [0, 255, 0, 128] } )
  })
})
})

chrome.contextMenus.onClicked.addListener((e) => {
  getStoredCities().then((cities) => {
    setStoredCities([
      ...cities,
      e.selectionText
    ])
  })
})
