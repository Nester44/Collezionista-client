import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import Item from '../../collection/ItemsList/Item/Item'

const RecentItems = ({ items, ...props}) => {
  return (
    <Grid item xs={12} md={6} >
    <Box component={Paper} {...props} >   
      <Box mb={2} component={Typography} variant='h4' >
      <FormattedMessage id='app.home.recentItems' /> 
      </Box>
      
      <Grid container spacing={2} >
      {
        items.map((i) => 
        <Item key={'item' + i.name + i.id} name={i.name} tags={i.Tags} fields={i.additional_attributes} canEdit={false} id={i.id} xs={12} sm={6} />)
      }
      </Grid>

    </Box>  

  </Grid>
  )
}

export default RecentItems