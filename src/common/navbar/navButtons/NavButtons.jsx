import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { isAuthSelector } from '../../../app/auth/auth-slice';
import AccountButton from '../../../components/ui/AccountButton/AccountButton';
import LocaleToggle from '../../../components/ui/LocaleToggle/LocaleToggle';
import ModeToggle from '../../../components/ui/ModeToggle.js/ModeToggle';

const NavButtons = () => {
  const isAuth = useSelector(isAuthSelector)
  return (
    <Box sx={{
      display: { xs: 'none', sm: "flex" },
      gap: 2
    }}
      onClick={() => console.log}
    >
      <LocaleToggle />
      <ModeToggle />

      { isAuth && <AccountButton />}
      
    </Box>
  )
}

export default NavButtons