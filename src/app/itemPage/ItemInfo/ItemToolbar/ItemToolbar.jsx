import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import EditButton from './EditButton/EditButton'
import LikeButton from './LikeButton/LikeButton'

const ItemToolbar = ({ isEdit, setIsEdit, canEdit, likeHandler, dislikeHandler, liked }) => {

  return (
    <Box>
      <LikeButton liked={liked} likeHandler={likeHandler} dislikeHandler={dislikeHandler} />
      {
        canEdit &&
        <>
          <EditButton isEdit={isEdit} setIsEdit={setIsEdit} />
          <Button
            color='error'
          >
            Delete
          </Button>
        </>
      }
    </Box>
  )
}

export default ItemToolbar