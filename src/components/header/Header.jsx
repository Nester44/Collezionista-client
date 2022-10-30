import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import NavBar from '../navbar/NavBar';

import logo from '../../assets/logo.png'
import { Box } from '@mui/system';

const Header = () => {
  return (
    <AppBar position='static' >
      <Toolbar>
        <Box component={Link} to={routes.HOME} sx={{ flexGrow: 1, textAlign: 'left', alignItems: 'center', display: 'flex', gap: 1  }} >
        <img
          src={logo}
          style={{
            height: 40
          }}
          alt='asd'
        />
        <Typography component='span' variant="h6" color="white">
          Collezionista
        </Typography>
        </Box>

        <NavBar />
      </Toolbar>
    </AppBar>
  )
}

export default Header