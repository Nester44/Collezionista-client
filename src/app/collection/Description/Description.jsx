import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Description = ({ isEditing, description, changeDescription, userFeatures, onChange, turnEditing, canEdit }) => {
  return (
    <Box>
      {
        isEditing ?
          <TextField
            label='Description'
            multiline
            fullWidth
            margin='normal'
            value={description}
            onChange={onChange}
          />
          :
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              {...userFeatures}
              variant='body1'
            >
              {description}
            </Typography>
          </Box>

      }
      {
        canEdit &&
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end'
          }}
        >
          {
            isEditing ?

              <Button onClick={changeDescription}>
                Save
              </Button>
              :
              <Button onClick={turnEditing}>
                Edit
              </Button>
          }
        </Box>
      }

    </Box>
  )
}

export default Description