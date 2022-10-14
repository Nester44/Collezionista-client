import React, { useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { modeSelector, toggleMode } from '../../../app/appSlice';

const ModeToggle = () => {
  const [mode, setMode] = useState(useSelector(modeSelector))
  const dispatch = useDispatch()

  const handleModeChange = (e, newMode) => {
    if (newMode === null) return
    dispatch(toggleMode(newMode))
    setMode(newMode)
  }
  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      onChange={handleModeChange}
      size='small'
    >
      <ToggleButton value="light" >
        <LightModeIcon />
      </ToggleButton>
      <ToggleButton value="dark">
        <DarkModeIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default ModeToggle