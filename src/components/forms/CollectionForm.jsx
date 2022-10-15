import React from 'react'
import { Box, Button, DialogActions, DialogContent, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Form, FormikProvider, useFormik } from 'formik'
import * as yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import { createCollection } from '../../app/profile/profileSlice'
import { userIdSelector } from '../../app/auth/auth-slice'

const CollectionForm = ({ onClose }) => {
  const dispatch = useDispatch()
  const CollectionSchema = yup.object().shape({
    name: yup
      .string()
      .required('Name is required'),
    description: yup
      .string()
      .required('Description is required'),
    topic: yup
      .string()
      .required()
  })
  const user_id = useSelector(userIdSelector)

  const onSubmit = async ({name, description, topic}) => {
    console.log('Submitted: ', {name, description, topic, user_id})
    dispatch(createCollection({name, description, topic, user_id}))

    onClose()
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      topic: '',
    },
    validationSchema: CollectionSchema,
    onSubmit
  })

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    status,
  } = formik;



  return (
    <FormikProvider value={formik} >
      <Form onSubmit={handleSubmit} autoComplete='off' >

        <Box>
          <DialogContent>

            <TextField
              {...getFieldProps('name')}
              error={Boolean((touched.name && errors.name) || Boolean(status))}
              helperText={touched.name && errors.name}
              id='name'
              name='name'
              margin='normal'
              fullWidth
              label='Name'
            />

            <FormControl fullWidth >
              <InputLabel id="topicLabel">Topic</InputLabel>
              <Select
                {...getFieldProps('topic')}
                error={Boolean((touched.topic && errors.topic) || Boolean(status))}
                helperText={touched.topic && errors.topic}
                labelId='topicLabel'
                id='topic'
                name='topic'
                margin='dense'
                fullWidth
                label='topic'
              >
                <MenuItem value='wine' >Wine</MenuItem>
                <MenuItem value='books' >Books</MenuItem>
                <MenuItem value='marks' >Marks</MenuItem>
              </Select>
            </FormControl>

            <TextField
              {...getFieldProps('description')}
              multiline
              minRows={3}
              error={Boolean((touched.description && errors.description) || Boolean(status))}
              helperText={touched.description && errors.description}
              id='description'
              name='description'
              margin='dense'
              label='Description'
              fullWidth
            />



          </DialogContent>

          <DialogActions>
            <Button onClick={onClose} color='error'>
              Cancel
            </Button>
            <Button type='submit' >
              Create
            </Button>
          </DialogActions>

        </Box>
      </Form>
    </FormikProvider>


  )
}

export default CollectionForm