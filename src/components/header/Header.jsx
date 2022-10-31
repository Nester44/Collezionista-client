import { AppBar, Toolbar } from '@mui/material';
import React from 'react';
import NavBar from '../navbar/NavBar';

import { Box } from '@mui/system';
import Logo from './Logo/Logo';
import SearchField from './SearchField/SearchField';

const Header = () => {
  return (
    <AppBar position='static' >
      <Box
        component={Toolbar}
        sx={{
          display: 'flex',
          gap: 2
        }}
      >
        <Box sx={{ flex: 1 }} >
          <Logo />
        </Box>

        <Box sx={{ flex: {xs: 3, sm: 1}, display: 'flex', justifyContent: 'center' }}>
          <SearchField />
        </Box>

        <Box sx={{flex: 1, display: 'flex', justifyContent: 'end'}}>
          <NavBar />
        </Box>
      </Box>
    </AppBar>
  )
}

export default Header