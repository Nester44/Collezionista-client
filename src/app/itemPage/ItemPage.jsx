import { Box, CircularProgress, Divider, Paper, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { currentUserSelector } from '../auth/auth-slice'
import Comments from './Comments/Comments'
import ItemInfo from './ItemInfo/ItemInfo'
import { dislikeItem, getItem, itemPendingSelector, itemSelector, likeItem } from './itemSlice'

const ItemPage = () => {
  const dispatch = useDispatch()
  const { itemId } = useParams()
  const currentUser = useSelector(currentUserSelector)

  const item = useSelector(itemSelector)
  const isFetching = useSelector(itemPendingSelector)

  const likeHandler = () => {
    dispatch(likeItem({ itemId, userId: currentUser?.id }))
  }

  const dislikeHandler = () => {
    dispatch(dislikeItem({ itemId, userId: currentUser?.id }))
  }

  useEffect(() => {
    const fetchItem = async() => {
      await dispatch(getItem({ itemId, userId: currentUser?.id }))
    }

    fetchItem()
  }, [itemId, dispatch, currentUser])

  if(isFetching) return <CircularProgress />

  if(!item) return <Typography>Item doesn't exist</Typography>

  const attributes = JSON.parse(item.additional_attributes)

  const canEdit = currentUser?.admin || currentUser?.id === item.Collection?.user_id

  return (

      <Container>

        <Box my={2} p={2} component={Paper}>

        <ItemInfo
          likeHandler={likeHandler}
          dislikeHandler={dislikeHandler}
          canEdit={canEdit}
          itemId={itemId}
          attributes={attributes}
          itemName={item.name}
          itemTags={item.Tags}
          currentUser={currentUser}
          liked={item.liked}
          likesCount={item.Users.length}
        />

        <Divider />

        <Comments itemId={itemId} itemComments={item.Comments} />

        </Box>

      </Container>


  )
}

export default ItemPage