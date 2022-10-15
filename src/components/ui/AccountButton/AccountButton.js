import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, userIdSelector } from '../../../app/auth/auth-slice';
import routes from '../../../shared/constants/routes';


const AccountButton = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  const navigate = useNavigate()
  const profileRedirect = () => {
    navigate(routes.USER + userId)
    handleClose()
  }
  const logoutHandler = () => {
    handleClose()
    dispatch(logout())
  }
  const dispatch = useDispatch()

  const userId = useSelector(userIdSelector)


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
        <MenuItem onClick={profileRedirect}>Profile</MenuItem>
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default AccountButton