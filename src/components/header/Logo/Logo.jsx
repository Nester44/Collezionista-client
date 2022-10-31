import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../../shared/constants/routes'
import logo from '../../../assets/logo.png'


const Logo = () => {
  return (
    <Box
      component={Link}
      to={routes.HOME}
      sx={{
        alignItems: 'center', display: 'flex', gap: 1  
      }}
    >
      <img
        src={logo}
        style={{
          height: 40
        }}
        alt='asd'
      />
      <Typography component='span' variant="h6" color="white"
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        Collezionista
      </Typography>
    </Box>
  )
}

export default Logo