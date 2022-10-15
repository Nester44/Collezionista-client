import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'
import { FormattedMessage } from 'react-intl'

const img = 'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2luZXN8ZW58MHx8MHx8&w=1000&q=80'

const CollectionItem = ({ name, description, topic, canManage }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card raised >
        <CardActionArea>
          <CardMedia
            title=""
            image={img}
            component="img"
            alt=''
          />
        </CardActionArea>
        <CardContent>
          <Typography variant="h5" gutterBottom component='div'>
            {name}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {topic}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        { canManage && 
          <CardActions sx={{ justifyContent: 'end' }} >
            <Button size='small' color='error' >
              <FormattedMessage id='app.profile.collection.delete' />
            </Button>
          </CardActions>
        }
        
      </Card>
    </Grid>
  )
}

export default CollectionItem