import { Box, Button, Drawer } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isDrawerOpenSelector, toggleDrawer } from '../../app/appSlice'
import { isAuthSelector, logout, nameSelector } from '../../app/auth/auth-slice'
import LocaleToggle from '../../components/ui/LocaleToggle/LocaleToggle'
import ModeToggle from '../../components/ui/ModeToggle.js/ModeToggle'

const ProfileDrawer = () => {
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
        {isAuth && name}

        <LocaleToggle />
        <ModeToggle />
        {isAuth &&
          <Button onClick={logoutHandler}>
            log  out
          </Button>
        }
      </Box>

    </Drawer>
  )
}

export default ProfileDrawer