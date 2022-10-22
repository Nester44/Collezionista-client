import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import AttributesAccordion from './AttributesAccordeon/AttributesAccordeon'
import Tag from './Tag/Tag'

const Item = ({ name, tags, fields, onDelete, canEdit }) => {
  let attributes
  try {
    attributes = JSON.parse(fields)
  } catch (error) {
    console.log(error);
  }

  const tagElements = tags.map(t =>
    <Tag name={t.name} key={'tag' + t.id + name} color={t.color} />
  )

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card variant="outlined">
        <CardContent >
          <Typography mb={2} variant="h4">{name}</Typography>

          <Box color='text.secondary' sx={{ textAlign: 'left' }}>

            <Box mb={1} sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Typography sx={{ userSelect: 'none' }} component='span' color='inherit' variant="body1">Tags: </Typography>
              {tagElements}
            </Box>

            {
              attributes &&
              <Box>
                <AttributesAccordion name={name} fields={attributes} />
              </Box>
            }

          </Box>

        </CardContent>
        <Box component={CardActions} justifyContent='end' >
          <Button>More</Button>
          {canEdit && <Button color='error' onClick={onDelete} >Delete</Button>} 
        </Box>
      </Card>
    </Grid>
  )
}

export default Item