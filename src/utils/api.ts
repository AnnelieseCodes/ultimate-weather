const OPEN_WEATHER_API_KEY = "f8cb24bbd56bae7a1f343852dd4904a1"

export interface openWeatherData {
	name: string
	main: {
		feels_like: number
		humidity: number
		temp: number
		temp_max: number
		temp_min: number
	}
	weather: {
		description: string
		icon: string
		id: number
		main: string
	} []
	wind: {
		deg: number
		speed: number
	}
}

export async function fetchWeatherData(city: string): Promise<openWeatherData> {
	const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPEN_WEATHER_API_KEY}`)
	if (!resp.ok) {
		throw new Error('city not found')
	}
	const data: openWeatherData = await resp.json()
	return data
}