import React, {useEffect, useState} from 'react'
import {Add, PictureInPicture} from '@material-ui/icons'
import { Paper, IconButton, InputBase, Box, Grid } from '@mui/material'
import { LocalStorageOptions } from '../../utils/storage'

const CityInput: React.FC<{
	cityInput: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onAdd: () => void
	onScaleChange: () => void
	handleOverlayButtonClick?: () => void
	options: LocalStorageOptions

}> = ({cityInput, handleOverlayButtonClick, options, onChange, onAdd, onScaleChange}) => {
	console.log(cityInput)

	return (
		<Box mx="8px" my="16px">
			<Grid container justifyContent="space-evenly">
				<Grid item>
					<Paper>
						<Box px="16px" py="6px">
							<InputBase 
								value={cityInput}
								onChange={onChange}
								placeholder='Enter a city'
							/>
							<IconButton onClick={onAdd}>
								<Add/>
							</IconButton>
						</Box>
					</Paper>
				</Grid>
				<Grid item>
					<Box py="4px">
						<Paper>
							<IconButton onClick={onScaleChange}>
								{options.scale === "metric" ? '\u2103': '\u2109'}
							</IconButton>
						</Paper>
					</Box>
				</Grid>
								<Grid item>
					<Box py="4px">
						<Paper>
							<IconButton onClick={handleOverlayButtonClick}>
								<PictureInPicture/>
							</IconButton>
						</Paper>
					</Box>
				</Grid>

			</Grid>
		</Box>
	)
}

export default CityInput