import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const ItemPanel = ({onOpenModal}) => {
  return (
    <Box sx={{ marginBottom: 4 }}>
      <Button onClick={onOpenModal} >Create item</Button>
    </Box>
  )
}

export default ItemPanel