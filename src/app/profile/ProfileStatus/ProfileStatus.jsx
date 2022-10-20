import { Typography } from '@mui/material'
import React from 'react'

const ProfileStatus = ({ userProfile }) => {
  return (
    <>
      {
        userProfile?.admin &&
        <Typography color='success'>Admin</Typography>
      }
      {
        userProfile?.blocked &&
        <Typography color='green'>Blocked</Typography>
      }
    </>
  )
}

export default ProfileStatus