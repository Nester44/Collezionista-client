import { Chip } from '@mui/material'
import React from 'react'

const Tag = ({ name, color }) => {
  return (
    <Chip label={name} variant='outlined' color={color || 'purple'} />
  )
}

export default Tag