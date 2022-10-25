import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { Form, FormikProvider, useFormik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'



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

const CommentForm = ({ sendMessage }) => {

  const CommentSchema = yup.object().shape({
    body: yup
      .string()
      .required()
  })

  const onSubmit = ({ body }, {resetForm}) => {
    sendMessage({ name: 'nikitos', body})
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

const Comments = () => {
  const [comments, setComments] = useState([
    { name: 'Nesterov Nikita', body: 'Nice item, I really like it'},
    { name: 'Oleg Matsd', body: 'Not so bad'},
    { name: 'Bad boy', body: 'It is shit'},
  ])

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
          comments.map((c, i) => <Comment key={c.name + i} name={c.name} body={c.body} />)
        }

      </Stack>

      <CommentForm sendMessage={(message) => setComments([ ...comments, message])} />
    </Box>
  )
}

export default Comments