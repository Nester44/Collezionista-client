import { Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import AdaptiveStack from '../../../components/ui/AdaptiveStack/AdaptiveStack'

const CollectionName = ({ name, isEditing, onChange, userFeatures }) => {

  if (isEditing) {
    return (
      <TextField
        label='Name'
        fullWidth
        onChange={onChange}
        value={name}
      />
    )
  }

  return (
    <AdaptiveStack>
      <Typography sx={{ userSelect: 'none' }} variant="body1" color='text.secondary' >
        <FormattedMessage id="app.collection.name" />
      </Typography>
      <Typography
        {...userFeatures}
        component='span'
        variant='h4'
      >
        {name}
      </Typography>
    </AdaptiveStack>
  )
}

export default CollectionName