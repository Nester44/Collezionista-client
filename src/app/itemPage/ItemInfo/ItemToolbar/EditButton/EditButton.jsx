import { Button } from '@mui/material'
import React from 'react'

const EditButton = ({ isEdit, setIsEdit }) => {
  return (
    <>
      {
        isEdit &&
        <Button type='submit' >Save</Button>
      }
      {
        isEdit ||
        <Button onClick={() => setIsEdit(true)} >Edit</Button>
      }
    </>
  )
}

export default EditButton