import { Typography } from '@mui/material'
import React from 'react'

const ProfileStatus = ({ userProfile }) => {
  return (
    <>
      {
        userProfile?.admin &&
        <Typography color='green'>Admin</Typography>
      }
      {
        userProfile?.blocked &&
        <Typography color='green'>Blocked</Typography>
      }
    </>
  )
}

export default ProfileStatus