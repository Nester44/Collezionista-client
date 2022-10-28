import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import CollectionItem from '../../profile/CollectionItem/CollectionItem'

const LargestCollections = ({ collections, ...props}) => {
  return (
    <Grid item xs={12} md={6}  >

    <Box component={Paper} {...props}> 
        <Box mb={2} component={Typography} variant='h4' >
          <FormattedMessage id='app.home.largestCollections' /> 
        </Box>
        
        <Grid container spacing={2}>
        {
          collections.map(c =>
            <CollectionItem key={c.name + c.id} name={c.name} description={c.description} topic={c.topic} canManage={false} image={c.image} id={c.id} xs={12} sm={6} />)
        }
        </Grid>

    </Box> 
  </Grid>
  )
}

export default LargestCollections