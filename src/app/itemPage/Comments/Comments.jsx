import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { Form, FormikProvider, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'
import * as yup from 'yup'
import { userIdSelector } from '../../auth/auth-slice'
import Comment from './Comment/Comment'

const AZURE_BASE_URL = 'https://collection-sys.azurewebsites.net/'
const LOCALHOST_BASE_URL = 'http://localhost:1337'
const socket = io(AZURE_BASE_URL)


const CommentForm = ({ room, item_id, author_id }) => {
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
        <Button sx={{ marginTop: 2 }} type='submit' variant='contained' size='large'>
          <FormattedMessage id='app.item.leaveComment' /> 
        </Button>
      </Box>
      </Form>
    </FormikProvider>
  )
}

const Comments = ({ itemId, itemComments }) => {
  const [comments, setComments] = useState(itemComments)
  const room = `item${itemId}`

  const currentUser = useSelector(userIdSelector)

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

  socket.off('sender-feedback').on('sender-feedback', (comment) => {
    setComments((prev) => [...prev, comment])
  })

  return () => {
    socket.emit('unsubscribe', currentRoom)
  }
  }, [itemId])

  return (
    <Box>
        <Typography my={2} variant="h4">
          <FormattedMessage id='app.item.comments' />
        </Typography>
      <Stack
        mb={2}
        spacing={2}
      >
        
        {
          comments?.map((c, i) => <Comment key={c.User.name + i} name={c.User.name} body={c.body} id={c.User.id} />)
        }

      </Stack>

       {
        currentUser &&
        <CommentForm room={room} item_id={itemId} author_id={currentUser} />

       } 
    </Box>
  )
}

export default Comments