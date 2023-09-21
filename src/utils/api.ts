const OPEN_WEATHER_API_KEY = "f8cb24bbd56bae7a1f343852dd4904a1"

export async function fetchWeatherData(city: string): Promise<any> {
	const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}`)
	if (!resp.ok) {
		throw new Error('city not found')
	}
	const data = await resp.json()
	return data
}