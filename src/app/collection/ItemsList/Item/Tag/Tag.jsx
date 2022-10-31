import { Chip } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import routes from '../../../../../shared/constants/routes'

const getSize = (size) => {
  if (!size) return 'medium'
  return size > 25 ? 'medium' : 'small'
}

const Tag = ({ name, color, size }) => {
  const navigate = useNavigate()

  return (
    <Chip
      onClick={() => navigate({ pathname: routes.SEARCH, search: `?value=${name}&byTag=true` })}
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