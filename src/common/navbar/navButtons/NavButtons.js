import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import LocaleToggle from '../../../components/ui/LocaleToggle/LocaleToggle';
import ModeToggle from '../../../components/ui/ModeToggle.js/ModeToggle';

const NavButtons = () => {
  return (
    <Box sx={{
      display: { xs: 'none', sm: "flex" },
      gap: 2
    }}
      onClick={() => console.log}
    >
      <LocaleToggle />
      <ModeToggle />
      <IconButton>
        <AccountBoxIcon />
      </IconButton>
    </Box>
  )
}

export default NavButtons