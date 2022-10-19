import { LoadingButton } from '@mui/lab'
import { Button, DialogActions, DialogContent, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { Form, FormikProvider, useFormik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'

import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch } from 'react-redux'
import { fetchTags } from '../../app/collection/collectionSlice'
import ItemAutoComplete from '../ui/ItemAutoComplete/ItemAutoComplete'

const ItemForm = ({ onClose, createItem }) => {
  const dispatch = useDispatch()
  const ItemSchema = yup.object().shape({
    name: yup
      .string()
      .required(),
    tags: yup
      .array()
  })
  const [tags, setTags] = useState([])

  const onSubmit = ({ name, tags, attributes }) => {
    createItem(name, tags, attributes)
  }


  useEffect(() => {
    const getTags = async () => {
      const {payload} = await dispatch(fetchTags())
      const fetchedTags = payload.map((tag) => tag.name)
      setTags(fetchedTags)
    }

    getTags()
  }, [dispatch])


  const formik = useFormik({
    initialValues: {
      name: '',
      tags: '',
    },
    validationSchema: ItemSchema,
    onSubmit
  })

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    status,
    isSubmitting,
    handleChange,
    setFieldValue
  } = formik;


  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit} >
        <DialogContent >
          <Box>

            <TextField
              {...getFieldProps('name')}
              margin='normal'
              label='Name' 
              fullWidth
              error={Boolean((touched.name && errors.name) || Boolean(status))}
              helperText={touched.name && errors.name}
              id='name'
              name='name'
            />

            <ItemAutoComplete 
              setFieldValue={setFieldValue}
              tags={tags}
              touched={touched}
              getFieldProps={getFieldProps}
              status={status}
              errors={errors}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color='error'>
            <FormattedMessage id='app.profile.modal.cancel' />
          </Button>
          <LoadingButton type='submit' >
            <FormattedMessage id='app.profile.modal.create' />
          </LoadingButton>
        </DialogActions>
      </Form>
    </FormikProvider>
  )
}

export default ItemForm