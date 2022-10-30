import { Box, Container } from '@mui/system'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
import { foundItemsSelector, getItemsByTag } from './searchSlice'
import { Grid, Paper, Stack } from '@mui/material'
import Item from '../collection/ItemsList/Item/Item'

const Search = () => {
  const { tag } = useParams()
  const dispatch = useDispatch()
  const items = useSelector(foundItemsSelector)

  useEffect(() => {
    dispatch(getItemsByTag(tag))
  }, [dispatch, tag])

  return (
    <Container>
      <Box>

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant="h4">
            Results of search items by tag: 
          </Typography>
          <Typography variant='h3' color='secondary'>{tag}</Typography>
        </Box>

        <Box
          component={Paper}
          elevation={4}
          p={2}
        >
          <Grid container spacing={2} >
            {
              items.map(i => 
                <Item
                  key={i.name + i.id}
                  name={i.name}
                  tags={i.Tags}
                  fields={i.additional_attributes}
                  canEdit={false}
                  id={i.id}
                  xs={12}
                  sm={6}
                  md={4}
                />
              )
            }
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Search