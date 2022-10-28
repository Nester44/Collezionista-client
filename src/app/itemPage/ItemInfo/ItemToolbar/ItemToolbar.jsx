import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import EditButton from './EditButton/EditButton'
import LikeButton from './LikeButton/LikeButton'

const ItemToolbar = ({ isEdit, setIsEdit, canEdit, likeHandler, dislikeHandler, liked, onDelete }) => {

  return (
    <Box>
      <LikeButton liked={liked} likeHandler={likeHandler} dislikeHandler={dislikeHandler} />
      {
        canEdit &&
        <>
          <EditButton isEdit={isEdit} setIsEdit={setIsEdit} />
          <Button
            color='error'
            onClick={onDelete}
          >
            <FormattedMessage id='app.profile.collection.delete' />
          </Button>
        </>
      }
    </Box>
  )
}

export default ItemToolbar