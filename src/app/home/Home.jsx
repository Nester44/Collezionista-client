import { Container, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { getLargestCollections, getRecentItems, getTags, largestCollectionsSelector, recentItemsSelector, tagsSelector } from './homeSlice'
import LargestCollections from './LargestCollections/LargestCollections'
import RecentItems from './RecentItems/RecentItems'
import TagCloud from './TagCloud/TagCloud'

const Home = () => {
  const dispatch = useDispatch()
  const tags = useSelector(tagsSelector)
  const largestCollections = useSelector(largestCollectionsSelector)
  const recentItems = useSelector(recentItemsSelector)

  useEffect(() => {
    dispatch(getTags())
    dispatch(getLargestCollections())
    dispatch(getRecentItems())
  }, [dispatch])

  return (
    <Container maxWidth='xl' >
      <Typography variant="h2">
        <FormattedMessage id='app.home.title'/>
      </Typography>
    <Grid
      container
      spacing={3}
    >

    <TagCloud p={2} tags={tags} />

    <LargestCollections collections={largestCollections} p={2} />

    <RecentItems items={recentItems} p={2} />

    </Grid>

    </Container>
  )
}

export default Home