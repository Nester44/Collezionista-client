import { Dialog, DialogTitle } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import ItemForm from '../../../components/forms/ItemForm'

const ItemDialog = ({ open, onClose, attributeType, createItem }) => {
  return (
    <Dialog open={open} onClose={onClose}
      fullWidth
    >
      <DialogTitle>
        <FormattedMessage id='app.collection.newItem' />
      </DialogTitle>

      <ItemForm createItem={createItem} onClose={onClose} />


    </Dialog>
  )
}

export default ItemDialog