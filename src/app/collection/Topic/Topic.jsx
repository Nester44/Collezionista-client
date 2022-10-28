import { MenuItem, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'

import React from 'react'
import { FormattedMessage } from 'react-intl'
import AdaptiveStack from '../../../components/ui/AdaptiveStack/AdaptiveStack'
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
    <AdaptiveStack>
      <Typography sx={{ userSelect: 'none' }} component='span' color='text.secondary' variant="body1" >
        <FormattedMessage id='app.collection.topic' />
      </Typography>

      <Typography component='span'  {...userFeatures} variant='h5'>
        <FormattedMessage id={topic || 'app.profile.collectionForm.topic.books'} />
      </Typography>
    </AdaptiveStack>
  )
}

export default Topic