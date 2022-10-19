import { MenuItem, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'

import React from 'react'
import { FormattedMessage } from 'react-intl'
import topics from '../../../shared/constants/topics'

const Topic = ({ topic, isEditing, setTopic, userFeatures }) => {
  if (isEditing) return (
      <TextField
        select
        fullWidth
        margin='normal'
        label='Topic'
        onChange={(e) => setTopic(e.target?.value)}
        value={topic}
      >
        {
          topics.map(option =>
            <MenuItem
              key={option.id}
              value={option.id} >
              <FormattedMessage
                key={option.id + 'topicMsg'}
                id={option.id} />
            </MenuItem>)
        }

      </TextField>
  )


  return (
    <Typography color='text.secondary' my={4} {...userFeatures} variant='subtitle1'>
      <FormattedMessage id={topic || 'app.profile.collectionForm.topic.books'} />
    </Typography>
  )
}

export default Topic