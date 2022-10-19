import { Chip } from '@mui/material'
import React from 'react'

const colors = [
  'purple', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo'
]

const getRandomColor = () => {
  const index =  Math.ceil(Math.random() * colors.length ) - 1
  return colors[index]
}

const Tag = ({ name }) => {
  const color = getRandomColor()
  return (
    <Chip label={name} variant='outlined' color={color} />
  )
}

export default Tag