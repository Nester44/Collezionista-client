import { Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const CollectionList = ({ collectionsElements }) => {
  return (
    <Box mb={1}>
    <Paper elevation={3} sx={{
      padding: 2,
    }}>
      {
        collectionsElements.length > 0 ?
          <Grid
          container
          spacing={3}
          >
            {collectionsElements}
          </Grid> :
          <Typography>There is no collections</Typography>
      }


    </Paper>
  </Box>
  )
}

export default CollectionList