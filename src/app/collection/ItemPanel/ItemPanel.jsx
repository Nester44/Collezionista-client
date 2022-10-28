import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { FormattedMessage } from 'react-intl'

const ItemPanel = ({onOpenModal}) => {
  return (
    <Box sx={{ marginBottom: 4 }}>
      <Button onClick={onOpenModal} >
        <FormattedMessage id='app.collection.newItem' />
      </Button>
    </Box>
  )
}

export default ItemPanel