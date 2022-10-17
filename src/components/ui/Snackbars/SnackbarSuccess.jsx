import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { FormattedMessage } from 'react-intl'

const SnackbarSuccess = ({ snackOpen, handleCloseSnack, messageId }) => {
  return (
    <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleCloseSnack}>
      <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
        <FormattedMessage id={messageId} />
      </Alert>
    </Snackbar>
  )
}

export default SnackbarSuccess