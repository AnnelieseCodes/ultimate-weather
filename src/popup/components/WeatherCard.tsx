import React, {useEffect, useState} from 'react'
import { fetchWeatherData,openWeatherData, OpenWeatherTempScale, getWeatherIconSrc } from '../../utils/api'
import { Card, Grid, IconButton, CardContent, Typography, Box } from '@mui/material'
import {ClearRounded} from '@material-ui/icons'
import "./WeatherCard.css"

const WeatherCardContainer: React.FC<{
	children: React.ReactNode
}> = ({children}) => {
	return(
	<Box mx={"4px"} my={"16px"}>
		<Card>
			<CardContent>
				{children}
			</CardContent>
		</Card>
	</Box>
	)
}

type WeatherCardState = "loading" | "error" | "ready"


const WeatherCard: React.FC<{
	homeCity?: string
	scale: OpenWeatherTempScale
	city: string
	onDelete?: () => void
}> = ({city, scale, onDelete, homeCity}) => {
	const [weatherData, setWeatherData] = useState<openWeatherData | null>(null)
	const [cardState, setCardState] = useState<WeatherCardState>("loading")

	useEffect(() => {
    fetchWeatherData(city, scale)
    .then((data) => {
		setWeatherData(data)
		setCardState("ready")
	})
    .catch((err) => {
		console.log(err)
		setCardState("error")
	})
  }, [city, scale])

console.log("Home City:", homeCity);
console.log("City:", city);
console.log("cardState", cardState);
console.log("OnDelete:", onDelete);

  if(cardState == "error" || cardState == "loading"){
	return <WeatherCardContainer>
			<Box  display="flex" justifyContent="flex-end">
				<IconButton onClick={onDelete}>
					<ClearRounded fontSize="small" />
				</IconButton>
			</Box>
			<Typography className='weatherCard-title'>
				{city}
			</Typography>
			<Typography className='weatherCard-body'>
				{
					cardState == "loading" ? "Loading..." : `Unable to pull data for ${city}`
				}
			</Typography>
	</WeatherCardContainer>
  }

  return (
	<WeatherCardContainer>
		{
			(homeCity !== city && city !== null)  ?
			<Box  display="flex" justifyContent="flex-end">
			<IconButton onClick={onDelete}>
				<ClearRounded fontSize="small" />
			</IconButton>
			</Box> :
			<Box display="flex" justifyContent="flex-end">
			<Typography className='weatherCard-body'> Home🏡</Typography>
			</Box>
		}
		<Grid container>
			<Grid item>
				<Typography className='weatherCard-title'>
					{weatherData.name}
				</Typography>
				<Typography className='weatherCard-body'>
					Actual: {Math.round(weatherData.main.temp)} °{scale === 'imperial' ? 'F' : 'C'}
				</Typography>
				<Typography className='weatherCard-body'>
					Feels like: {Math.round(weatherData.main.feels_like)} °{scale === 'imperial' ? 'F' : 'C'}
				</Typography>
			</Grid>
			<Grid item>
				{ weatherData.weather.length > 0 ? 
				<>
					<img src={getWeatherIconSrc(weatherData.weather[0].icon)} alt="" />
					<Typography className='weatherCard-body'>{weatherData.weather[0].description}</Typography>
				</> 
				: null
				}
			</Grid>
		</Grid>
	</WeatherCardContainer>
  )
}

export default WeatherCard