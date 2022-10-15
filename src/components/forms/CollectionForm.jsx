import { LoadingButton } from '@mui/lab'
import { Alert, Box, Button, DialogActions, DialogContent, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Form, FormikProvider, useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { createCollection, profileIdSelector, profileSelector } from '../../app/profile/profileSlice'

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
  const user_id = useSelector(profileIdSelector)

  const onSubmit = async ({name, description, topic}, {setStatus}) => {
    try {
      await dispatch(createCollection({name, description, topic, user_id}))
      onClose()
    } catch (error) {
      setStatus(error.message)
    }
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
    isSubmitting
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
            <Box>
              {!!status && <Alert severity='error'>{status}</Alert>}
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose} color='error'>
              Cancel
            </Button>
            <LoadingButton type='submit' loading={isSubmitting}>
              Create
            </LoadingButton>
          </DialogActions>

        </Box>
      </Form>
    </FormikProvider>


  )
}

export default CollectionForm