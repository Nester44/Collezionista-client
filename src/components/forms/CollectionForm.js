import { LoadingButton } from '@mui/lab'
import { Alert, Box, Button, DialogActions, DialogContent, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Form, FormikProvider, useFormik } from 'formik'
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { createCollection, profileIdSelector } from '../../app/profile/profileSlice'

const CollectionForm = ({ onClose, onSnackOpen }) => {
  const FILE_SIZE = 5 * 1024 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png"
  ];

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
      .required(),
    image: yup
      .mixed()
    // .test(
    //   "fileSize",
    //   "File too large",
    //   value => value && value.size <= FILE_SIZE
    // )
    // .test(
    //   "fileFormat",
    //   "Unsupported Format",
    //   value => value && SUPPORTED_FORMATS.includes(value.type)
    // )
  })

  const [imageName, setImageName] = useState(null)

  const handleUpload = (e) => {
    const image = e.currentTarget.files[0]
    formik.setFieldValue('image', image);
    setImageName(image.name)
  }

  const user_id = useSelector(profileIdSelector)

  const onSubmit = async ({ name, description, topic, image }, { setStatus }) => {
    try {
      await dispatch(createCollection({ name, description, topic, user_id, image }))
      onSnackOpen()
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
      image: null
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

            <TextField
              select
              {...getFieldProps('topic')}
              error={Boolean((touched.topic && errors.topic) || Boolean(status))}
              helperText={touched.topic && errors.topic}
              id='topic'
              name='topic'
              margin='dense'
              fullWidth
              label='Topic'
            >
              <MenuItem value='wine' >
                <FormattedMessage id='app.profile.collectionForm.topic.wine' />
              </MenuItem>
              <MenuItem value='books' >
                <FormattedMessage id='app.profile.collectionForm.topic.boooks' />
              </MenuItem>
              <MenuItem value='signs' >
                <FormattedMessage id='app.profile.collectionForm.topic.signs' />
              </MenuItem>
              <MenuItem value='coins' >
                <FormattedMessage id='app.profile.collectionForm.topic.coins' />
              </MenuItem>
              <MenuItem value='rocks' >
                <FormattedMessage id='app.profile.collectionForm.topic.rocks' />
              </MenuItem>
            </TextField>

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

            <InputLabel sx={{ marginTop: 2, marginBottom: 2 }}>
              <FormattedMessage id='app.profile.modal.upload' />
            </InputLabel>
            <Button sx={{ marginRight: 2 }} variant="contained" component="label">
              <FormattedMessage id='app.profile.modal.button.upload' />
              <input
                id='image'
                name='image'
                hidden
                // {...getFieldProps('image')}
                onChange={handleUpload}
                accept="image/*" type="file" />
            </Button>

            {imageName && imageName}

            <Box>
              {!!status && <Alert severity='error'>{status}</Alert>}
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose} color='error'>
              <FormattedMessage id='app.profile.modal.cancel' />
            </Button>
            <LoadingButton type='submit' loading={isSubmitting}>
              <FormattedMessage id='app.profile.modal.create' />
            </LoadingButton>
          </DialogActions>

        </Box>
      </Form>
    </FormikProvider>


  )
}

export default CollectionForm