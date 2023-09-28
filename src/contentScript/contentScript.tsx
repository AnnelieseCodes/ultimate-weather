import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import { getStoredOptions, setStoredOptions, LocalStorageOptions } from "../utils/storage";
import WeatherCard from "../popup/components/WeatherCard";
import {Card} from "@mui/material"
import { Messages } from "../utils/messages";
import "./contentScript.css"

const App: React.FC<{}> = () => {
	const [options, setOptions] = useState<LocalStorageOptions | null>(null)
	const [isActive, setIsActive] = useState<boolean>(false)

	useEffect(()=> {
		getStoredOptions()
		.then((res)=> {
			setOptions(res)
			setIsActive(res.hasOverlay)
			console.log(res.hasOverlay)
			console.log("Fetched options from storage:", res)
		})
	}, [])

	useEffect(() => {
  		const messageListener = (msg) => {
    		if (msg === Messages.TOGGLE_OVERLAY) {
      		setIsActive(prevIsActive => !prevIsActive);
    		}
		};
  		chrome.runtime.onMessage.addListener(messageListener);
  		return () => {
    		chrome.runtime.onMessage.removeListener(messageListener);
  		};
	}, [])

	if (!options){
		return null
	}

	const removeOverlay = () => {
		const newIsActive = !isActive
		setIsActive(newIsActive)
		setStoredOptions({ ...options, hasOverlay: newIsActive })
	}

	return (
		<>
			{
			isActive &&
				<Card className="overlayCard">
					<WeatherCard city={options.homeCity} scale={options.scale} onDelete={removeOverlay}/>
				</Card>
			}
		</>
		)
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App/>, root)