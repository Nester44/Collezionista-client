import { Dialog, DialogTitle } from '@mui/material'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import CollectionForm from '../../../components/forms/CollectionForm'

const CollectionDialog = ({ open, onClose, onSnackOpen }) => {
  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle>
        <FormattedMessage id='app.profile.collection.newCollection' />
      </DialogTitle>

      <CollectionForm onClose={onClose} onSnackOpen={onSnackOpen} />

    </Dialog>
  )
}

export default CollectionDialog