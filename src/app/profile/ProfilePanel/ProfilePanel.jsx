import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { FormattedMessage } from 'react-intl'

const ProfilePanel = ({ handleClickOpenModal }) => {
  return (
    <Box my={2} sx={{
      display: 'flex',
      justifyContent: 'center',
      paddingLeft: 2
    }}>
      <Button variant="contained" color="primary" size='large' 
        onClick={handleClickOpenModal}
      >
        <FormattedMessage id="app.profile.collection.newCollection" />
      </Button>
    </Box>
  )
}

export default ProfilePanel