import { AppBar, IconButton, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import NavBar from '../../common/navbar/NavBar';


const Header = (props) => {
  const { setLanguage, language, setTheme, theme, setDrawerOpen }
   = props
  return (
    <AppBar position='static' >
      <Toolbar>
        <Typography variant="h6" component="span" color="white" sx={{ flexGrow: 1, textAlign: 'left' }}>
          Collection system
        </Typography>
        <NavBar  setDrawerOpen={setDrawerOpen} />
      </Toolbar>
    </AppBar>
  )
}

export default Header