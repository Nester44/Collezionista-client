import { Button } from '@mui/material'
import React from 'react'
import { FormattedMessage } from 'react-intl'

const EditButton = ({ isEdit, setIsEdit }) => {
  return (
    <>
      {
        isEdit &&
        <Button type='submit' >
          <FormattedMessage id='app.save' />
        </Button>
      }
      {
        isEdit ||
        <Button onClick={() => setIsEdit(true)} >
          <FormattedMessage id='app.edit' />
        </Button>
      }
    </>
  )
}

export default EditButton