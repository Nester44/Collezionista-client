import { Box, Button, CircularProgress, Divider, Paper, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import routes from '../../shared/constants/routes'
import { currentUserSelector } from '../auth/auth-slice'
import Comments from './Comments/Comments'
import ItemInfo from './ItemInfo/ItemInfo'
import { destroyItem, dislikeItem, getItem, itemPendingSelector, itemSelector, likeItem } from './itemSlice'

const ItemPage = () => {
  const dispatch = useDispatch()
  const { itemId } = useParams()
  const navigate = useNavigate()
  const currentUser = useSelector(currentUserSelector)

  const item = useSelector(itemSelector)
  const isFetching = useSelector(itemPendingSelector)

  const likeHandler = () => {
    dispatch(likeItem({ itemId, userId: currentUser?.id }))
  }

  const dislikeHandler = () => {
    dispatch(dislikeItem({ itemId, userId: currentUser?.id }))
  }

  const deleteItem = async() => {
    await dispatch(destroyItem(itemId))
    navigate(routes.COLLECTION + item.collection_id)
  }

  useEffect(() => {
    const fetchItem = async() => {
      await dispatch(getItem({ itemId, userId: currentUser?.id }))
    }

    fetchItem()
  }, [itemId, dispatch, currentUser])

  if(isFetching) return <CircularProgress />

  if(!item) return (
    <Typography>
    <FormattedMessage id='app.item.notExist' />
    </Typography>)

  const attributes = JSON.parse(item.additional_attributes)

  const canEdit = currentUser?.admin || currentUser?.id === item.Collection?.user_id

  return (

      <Container>
        

        <Box my={2}>
          <Button onClick={() => navigate(routes.COLLECTION + item.collection_id)}>
            <FormattedMessage id='app.item.toCollection' />
          </Button>
          
          <Paper
            p={2}
          >
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
          onDelete={deleteItem}
          />

        <Divider />

        <Comments itemId={itemId} itemComments={item.Comments} />
        </Paper>
        </Box>


        



      </Container>


  )
}

export default ItemPage