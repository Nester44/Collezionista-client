import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { Form, FormikProvider, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'
import * as yup from 'yup'
import { userIdSelector } from '../../auth/auth-slice'

const AZURE_BASE_URL = 'https://collection-sys.azurewebsites.net/'
const LOCALHOST_BASE_URL = 'http://localhost:1337'
const socket = io(AZURE_BASE_URL)

const Comment = ({ name, body }) => {
  return (
    <Box
      component={Paper}
      elevation={5}
      p={2}
    >
      <Typography variant='h5'>{ name }</Typography>
      <Typography variant='body1'>{ body }</Typography>
    </Box>
  )
}

const CommentForm = ({ room, item_id }) => {
  const author_id = useSelector(userIdSelector)
  const CommentSchema = yup.object().shape({
    body: yup
      .string()
      .required()
  })

  const onSubmit = ({ body }, { resetForm }) => {
    if(!author_id) return console.error('User isn\'t authenticated')

    const message = { author_id, body, item_id}
    socket.emit('post-comment', message, room)
    resetForm()
  }

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: CommentSchema,
    onSubmit
  })

  const {
    getFieldProps,
    handleSubmit,
    errors,
    touched
   } = formik

  return (
    <FormikProvider value={formik}> 
      <Form  onSubmit={handleSubmit}>

      <Box>
        <TextField
          {...getFieldProps('body')}    
          error={Boolean((touched.body && errors.body))}
          helperText={touched.body && errors.body}
          multiline
          minRows={3}
          fullWidth
          label='Leave a comment'
          variant='filled'
        />
        <Button sx={{ marginTop: 2 }} type='submit' variant='contained' size='large'>Comment</Button>
      </Box>
      </Form>
    </FormikProvider>
  )
}

const Comments = ({ itemId, itemComments }) => {
  const [comments, setComments] = useState(itemComments)
  const room = `item${itemId}`


  useEffect(() => {
  const currentRoom = `item${itemId}`
  socket.emit('join-room', currentRoom)
    socket.on('connect', () => {
    }) 

  socket.off('receive-comment').on('receive-comment', (message) => {
    setComments((prevMessages) => {
      const newMessages = [ ...prevMessages, message]
      return newMessages
    })
  })

  socket.on('sender-feedback', (comment) => {
    setComments((prev) => [...prev, comment])
  })

  return () => {
    socket.emit('unsubscribe', currentRoom)
  }
  }, [itemId])

  return (
    <Box>
        <Typography variant="h4">Comments</Typography>
      <Stack
        mb={2}
        spacing={2}
        sx={{
          overflowY: 'auto',
          maxHeight: '30vh'
        }}
      >
        
        {
          comments.map((c, i) => <Comment key={c.User.name + i} name={c.User.name} body={c.body} />)
        }

      </Stack>

      <CommentForm room={room} item_id={itemId} />
    </Box>
  )
}

export default Comments