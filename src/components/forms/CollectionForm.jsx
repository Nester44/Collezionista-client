import { LoadingButton } from '@mui/lab'
import { Alert, Box, Button, Checkbox, DialogActions, DialogContent, InputLabel, MenuItem, TextField, Typography } from '@mui/material'
import { Form, FormikProvider, useFormik } from 'formik'
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { createCollection, profileIdSelector } from '../../app/profile/profileSlice'
import topics from '../../shared/constants/topics'
import NumberSelector from '../ui/NumberSelector/NumberSelector'

const additionalFields = [
  ['integer','app.profile.collectionForm.additionalFieldType.integer' ],
  ['string','app.profile.collectionForm.additionalFieldType.string' ],
  ['checkbox','app.profile.collectionForm.additionalFieldType.checkbox' ],
  ['date','app.profile.collectionForm.additionalFieldType.date' ],
  ['multiLine','app.profile.collectionForm.additionalFieldType.multiLine' ],
]

const CollectionForm = ({ onClose, onSnackOpen }) => {
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
      .mixed(),
    additionalFieldType: yup
      .string()
  })

  const [imageName, setImageName] = useState(null)
  const [addAdditionalAttributes, setAddAdditionalAttributes] = useState(false)

  const handleUpload = (e) => {
    const image = e.currentTarget.files[0]
    formik.setFieldValue('image', image);
    setImageName(image.name)
  }

  const user_id = useSelector(profileIdSelector)


  const onSubmit = async ({ name, description, topic, image, ...additionalAttributes }, { setStatus }) => {
    additionalAttributes = addAdditionalAttributes ? additionalAttributes : null
    try {
      await dispatch(createCollection({ name, description, topic, user_id, image, additionalAttributes }))
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
      image: null,

      integer: 0,
      string: 0,
      checkbox: 0,
      date: 0,
      multiLine: 0,
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
    isSubmitting,
    setFieldValue,
    isValid
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
              {
                topics.map(option =>
                  <MenuItem
                    key={option.id}
                    value={option.id} >
                    <FormattedMessage
                      key={option.id + 'topicMsg'}
                      id={option.id} />
                  </MenuItem>)
              }

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

            <Typography>
              <FormattedMessage id='app.collection.additionalAttributes' />
              <Checkbox
                value={addAdditionalAttributes}
                onChange={(e, value) => setAddAdditionalAttributes(value)} />
            </Typography>

            {
              addAdditionalAttributes &&
              <Box>
                {
                  
                  additionalFields.map(([field, id], i) => 
                    <Box key={id} justifyContent='space-between' alignItems='center' display='flex' >
                      <FormattedMessage id={id} />
                      <NumberSelector changeHandler={(value) => setFieldValue(field, value)} margin='dense'  size='small' type='number' min='0' />
                    </Box>
                  )
                }
              </Box>
            }

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
            <LoadingButton disabled={!isValid} type='submit' loading={isSubmitting}>
              <FormattedMessage id='app.profile.modal.create' />
            </LoadingButton>
          </DialogActions>

        </Box>
      </Form>
    </FormikProvider >


  )
}

export default CollectionForm