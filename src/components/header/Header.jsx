import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import NavBar from '../../common/navbar/NavBar';
import { Link } from 'react-router-dom';
import routes from '../../shared/constants/routes';


const Header = () => {
  return (
    <AppBar position='static' >
      <Toolbar>
        <Typography variant="h6" component={Link} to={routes.HOME} color="white" sx={{ flexGrow: 1, textAlign: 'left' }}>
          Collection system
        </Typography>
        <NavBar />
      </Toolbar>
    </AppBar>
  )
}

export default Header