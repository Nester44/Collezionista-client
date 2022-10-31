import { Grid, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Box, Container } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import Item from '../collection/ItemsList/Item/Item'
import NotFound from './NotFound/NotFound'
import { foundItemsSelector, getItemsByQuery, getItemsByTag } from './searchSlice'

const Search = () => {
  const [params] = useSearchParams()
  const value = params.get('value')
  const byTag = JSON.parse(params.get('byTag'))

  const dispatch = useDispatch()
  const items = useSelector(foundItemsSelector)

  useEffect(() => {
    if (byTag) {
      dispatch(getItemsByTag(value))
    } else {
      dispatch(getItemsByQuery(value))
    }
  }, [dispatch, value, byTag])

  return (
    <Container>
      <Box>

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
          gap: 2
        }}>
          <Typography variant="h4">
            Results of search items by { byTag ? 'tag' : 'query' }: 
          </Typography>
          <Typography variant='h3' color='secondary'>{value}</Typography>
        </Box>

        <Box
          component={Paper}
          elevation={4}
          p={2}
          minHeight='70vh'
        >
          <Grid container spacing={2} >
            {

              items.length === 0 ? 
              <NotFound />
              :
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