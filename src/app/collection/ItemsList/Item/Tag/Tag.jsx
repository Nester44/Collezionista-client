import { Chip } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'
import routes from '../../../../../shared/constants/routes'

const getSize = (size) => {
  if (!size) return 'medium'
  return size > 25 ? 'medium' : 'small'
}

const Tag = ({ name, color, size }) => {
  return (
    <Chip
      component={Link}
      to={routes.SEARCH + name}
      sx={{
        cursor: 'pointer'
      }}
      label={name}
      variant='outlined'
      color={color || 'purple'}
      className={`tag-${size}`}
      size={ getSize(size) }
    />
  )
}

export default Tag