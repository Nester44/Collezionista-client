import { Chip } from '@mui/material'
import React from 'react'

const getSize = (size) => {
  if (!size) return 'medium'
  return size > 25 ? 'medium' : 'small'
}

const Tag = ({ name, color, size }) => {
  return (
    <Chip
      label={name}
      variant='outlined'
      color={color || 'purple'}
      className={`tag-${size}`}
      size={ getSize(size) }
    />
  )
}

export default Tag