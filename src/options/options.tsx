import React, {useEffect, useState} from 'react'
import { 
  FormControl,
  FormControlLabel, 
  FormGroup, 
  Switch, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Grid, 
  Button
} from '@mui/material'
import { createRoot } from 'react-dom/client'
import { LocalStorageOptions, getStoredOptions, setStoredOptions } from '../utils/storage'
import './options.css'


type FormState = 'ready' | 'saving'

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)
  const [formState, setFormState] = useState<FormState>('ready')

  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options))
  }, [])

  const handleTextChange = (homeCity:string) => {
    setOptions({
      ...options,
      homeCity
    })
  }

  const updateHomeCity = () => {
    setFormState('saving')
    setStoredOptions(options)
    .then(() => {
      setTimeout(() => {
        setFormState('ready')
      }, 1000)
    })
  }

  const updateAutoOverlay = (hasOverlay: boolean) => {
    console.log("Before updating auto overlay:", options.hasOverlay)
    const newOptions = { ...options, hasOverlay };
    setOptions(newOptions);
    setStoredOptions(newOptions);
    console.log("Updated Options:", newOptions)
  }

  const isSaving = formState === 'saving'

  if(!options){
    return null
  }

  return (
    <Box mx="10%" my="10%">
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant='h4'>
                Ultimate Weather Settings
              </Typography>
            </Grid>
            <Grid item>
                <Typography variant='h5'>
                Set a home city
                </Typography>
                <TextField disabled={isSaving} onChange={(e) => handleTextChange(e.target.value)} value={options.homeCity} placeholder='Enter home city' variant='standard' fullWidth/>
            </Grid>
            <Grid item>
              <Typography variant='h5'>
                Create a default webpage weather overlay
              </Typography>
              <Switch 
                color="primary"
                checked={options.hasOverlay}
                onChange={(e, checked)=> {
                updateAutoOverlay(checked)
                }}
                disabled={isSaving}
              />
            </Grid>
            <Grid item>
              <Button onClick={updateHomeCity} variant='contained' color='primary' disabled={isSaving}>
                {formState === 'ready' ? 'Save': 'Saving'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
