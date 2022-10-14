import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../../../app/auth/auth-slice';


const AccountButton = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }

  const logoutHandler = () => {
    handleClose()
    dispatch(logout())
  }

  const dispatch = useDispatch()


  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AccountBoxIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default AccountButton