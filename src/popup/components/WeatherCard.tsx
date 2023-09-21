import React, {useEffect} from 'react'
import { fetchWeatherData } from '../../utils/api'
import { Card, CardContent, Typography, CardActions } from '@mui/material'
import "./WeatherCard.css"


const WeatherCard: React.FC<{
	city: string
}> = ({city}) => {
	useEffect(() => {
    fetchWeatherData(city)
    .then((data) => console.log(`Feels like ${data.main.feels_like}`))
    .catch((err) => console.log(err))
  }, [city])
  return (
	<Card>
		<CardContent>
			<Typography variant='h5'>
				{city}
			</Typography>
		</CardContent>
	</Card>
  )
}

export default WeatherCard