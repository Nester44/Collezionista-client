import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import AttributesAccordion from './AttributesAccordeon/AttributesAccordeon'
import Tag from './Tag/Tag'
import { useNavigate } from "react-router-dom";
import routes from '../../../../shared/constants/routes'
import { FormattedMessage } from 'react-intl'


const Item = ({ name, tags, fields, onDelete, canEdit, id, xs, sm, md }) => {
  const navigate = useNavigate()
  const onRedirect = () => {
    navigate(routes.ITEM + id)
  }

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
    <Grid item xs={xs} sm={sm} md={md}>
      <Card variant="outlined">
        <CardContent >
          <Typography mb={2} variant="h4">{name}</Typography>

          <Box color='text.secondary' sx={{ textAlign: 'left' }}>

            <Box mb={1} sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Typography sx={{ userSelect: 'none' }} component='span' color='inherit' variant="body1">Tags: </Typography>
              {tagElements}
            </Box>

            {
              attributes && attributes.length > 0 &&
              <Box>
                <AttributesAccordion name={name} fields={attributes} />
              </Box>
            }

          </Box>

        </CardContent>
        <Box component={CardActions} justifyContent='end' >
          <Button onClick={onRedirect} >
          <FormattedMessage id='app.item.more' /> 
          </Button>
          {canEdit &&
          <Button color='error' onClick={onDelete} >
            <FormattedMessage id='app.profile.collection.delete' />
          </Button>
          } 
        </Box>
      </Card>
    </Grid>
  )
}

export default Item