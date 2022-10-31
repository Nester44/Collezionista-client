import React from 'react'
import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../../../app/appSlice';
import { Box } from '@mui/system'



const Burger = () => {
  const dispatch = useDispatch()
  return (
    <Box sx={{
      display: { md: 'none' }
    }}>
      <IconButton onClick={() => dispatch(toggleDrawer())}>
        <MenuIcon />
      </IconButton>
    </Box>

  )
}

export default Burger