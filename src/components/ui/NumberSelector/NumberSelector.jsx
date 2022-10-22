import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';

const NumberSelector = ({ changeHandler }) => {
  const [value, setValue] = useState(0)
  const increment = () => {
    const newValue = value + 1
    setValue(newValue)
    changeHandler(newValue)
  }

  const decrement = () => {
    const newValue = value - 1
    setValue(newValue)
    changeHandler(newValue)
  }
  return (
    <Box display='flex' alignItems='center' gap={2} >
      <IconButton disabled={value === 0} onClick={decrement} >
        <RemoveIcon />
      </IconButton>
      <Typography component='span' variant='body1' >{value}</Typography>
      <IconButton color='primary' onClick={increment} >
        <AddIcon /> 
      </IconButton>

    </Box>
  )
}

export default NumberSelector