import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useDispatch } from 'react-redux'
import { blockUser, deleteUserById, makeAdmin, removeAdmin, unblockUser } from '../../../app/profile/profileSlice'

const AdminPanel = ({ id }) => {
  const dispatch = useDispatch()
  const giveAdmin = () => {
    dispatch(makeAdmin(id))
  }
  const block = () => {
    dispatch(blockUser(id))
  }
  const unblock = () => {
    dispatch(unblockUser(id))
  }
  const deleteUser = () => {
    dispatch(deleteUserById(id))
  }
  const takeAdmin = () => {
    dispatch(removeAdmin(id))
  }
  return (
    <Box my={2} >

      <Button
        onClick={block}
      >
        Block
      </Button>

      <Button
        onClick={unblock}
      >
        Unblock
      </Button>

      <Button
        onClick={deleteUser}
      >
        Delete
      </Button>

      <Button
        onClick={giveAdmin}
      >
        Make admin
      </Button>

      <Button
        onClick={takeAdmin}
      >
        Undo admin
      </Button>

    </Box>
  )
}

export default AdminPanel