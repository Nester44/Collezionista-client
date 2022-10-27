import { Button, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from 'react'

const LikeButton = ({ liked, likeHandler, dislikeHandler }) => {
  return (
    <>
    {
      liked ? 
      <IconButton
        color='secondary'
        onClick={dislikeHandler}
      >
        <FavoriteIcon />
      </IconButton>
      :
      <IconButton
        color='secondary'
        onClick={likeHandler}    
      >
        <FavoriteBorderIcon />
      </IconButton>
    }
    </>
  )
}

export default LikeButton