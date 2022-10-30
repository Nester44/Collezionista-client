import { Box, Button, Drawer, Link } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isDrawerOpenSelector, toggleDrawer } from '../../app/appSlice'
import { isAuthSelector, logout, nameSelector, userIdSelector } from '../../app/auth/auth-slice'
import LocaleToggle from '../ui/LocaleToggle/LocaleToggle'
import ModeToggle from '../ui/ModeToggle.js/ModeToggle'
import { Link as RouterLink } from 'react-router-dom'
import routes from '../../shared/constants/routes'

const ProfileDrawer = () => {
  const userId = useSelector(userIdSelector)
  const name = useSelector(nameSelector)
  const isAuth = useSelector(isAuthSelector)
  const dispatch = useDispatch()

  const isDrawerOpen = useSelector(isDrawerOpenSelector)

  const logoutHandler = () => {
    dispatch(logout())
    dispatch(toggleDrawer())
  }

  return (
    <Drawer
      anchor='right'
      open={isDrawerOpen}
      onClose={() => dispatch(toggleDrawer())}
    >
      <Box
        sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        <Link component={RouterLink} to={routes.USER + userId}>{isAuth && name}</Link>
        { isAuth ?
          <Button onClick={logoutHandler}>
            log  out
          </Button>
          :
          <Button component={RouterLink} to={routes.LOGIN} >
            Login
          </Button>
        }
        <LocaleToggle />
        <ModeToggle />

      </Box>

    </Drawer>
  )
}

export default ProfileDrawer