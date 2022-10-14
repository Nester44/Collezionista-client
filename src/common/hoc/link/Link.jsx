import React from 'react'

import { Link as RouterLink } from 'react-router-dom'
import { Link as MaterialLink } from '@mui/material'

const Link = ({ children, to }) => {
  return (
    <RouterLink to={ to } >
      <MaterialLink>{ children }</MaterialLink>
    </RouterLink>
  )
}

export default Link