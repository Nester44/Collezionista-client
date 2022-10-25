import { Box, CircularProgress, Divider, Paper, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Comments from './Comments/Comments'
import ItemInfo from './ItemInfo/ItemInfo'
import { getItem, itemPendingSelector, itemSelector } from './itemSlice'

const ItemPage = () => {
  const dispatch = useDispatch()
  const { itemId } = useParams()

  const item = useSelector(itemSelector)
  const isFetching = useSelector(itemPendingSelector)




  useEffect(() => {
    const fetchItem = async() => {
      await dispatch(getItem(itemId))
    }

    fetchItem()
  }, [itemId, dispatch])

  if(isFetching) return <CircularProgress />

  if(!item) return <Typography>Item doesn't exist</Typography>

  const attributes = JSON.parse(item.additional_attributes)

  return (

      <Container>

        <Box my={2} p={2} component={Paper}>

        <ItemInfo itemId={itemId} attributes={attributes} itemName={item.name} itemTags={item.Tags} />

        <Divider />

        <Comments itemId={itemId} itemComments={item.Comments} />

        </Box>

      </Container>


  )
}

export default ItemPage