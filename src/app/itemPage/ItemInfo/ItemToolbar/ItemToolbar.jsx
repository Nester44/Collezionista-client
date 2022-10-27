import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import EditButton from './EditButton/EditButton'

const ItemToolbar = ({ isEdit, setIsEdit }) => {
  return (
    <Box>
      <EditButton isEdit={isEdit} setIsEdit={setIsEdit} />
    </Box>
  )
}

export default ItemToolbar