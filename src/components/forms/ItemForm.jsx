import { LoadingButton } from '@mui/lab'
import { Button, DialogActions, DialogContent, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { Form, FormikProvider, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { fetchTags } from '../../app/collection/collectionSlice'
import ItemAutoComplete from '../ui/ItemAutoComplete/ItemAutoComplete'
import AdditionalFields from './AdditionalFields/AdditionalFields'

const ItemForm = ({ onClose, createItem, attributeType }) => {
  const dispatch = useDispatch()
  const ItemSchema = yup.object().shape({
    name: yup
      .string()
      .required(),
    tags: yup
      .array(),

    additionalFields: yup
      .array().of(
        yup.object().shape({
          label: yup
            .string()
            .required(),
          value: yup
            .mixed()
            .required()
        })
      )

  })
  const [tags, setTags] = useState([])

  const onSubmit = ({ name, tags, additionalFields }) => {
    createItem(name, tags, additionalFields)
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      tags: '',
      additionalFields: [],
    },
    validationSchema: ItemSchema,
    onSubmit: onSubmit
  })

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    status,
    isSubmitting,
    setFieldValue,
    values,
    isValid
  } = formik;

  useEffect(() => {
    // getting tags
    const getTags = async () => {
      const {payload} = await dispatch(fetchTags())
      const fetchedTags = payload.map((tag) => tag.name)
      setTags(fetchedTags)
    } 

    const data = JSON.parse(attributeType)
    const fields = []

    if(data) {
      for (const [type, amount] of Object.entries(data)) {
        for(let i = 0; i < amount; i++) fields.push({ type, value: '', label: '' })
      }
      setFieldValue('additionalFields', fields)
    }

    getTags()
  }, [dispatch, attributeType, setFieldValue])

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

            {
              attributeType &&
              <AdditionalFields
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
                fields={values.additionalFields}
                getFieldProps={getFieldProps}
              />
            } 
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color='error'>
            <FormattedMessage id='app.profile.modal.cancel' />
          </Button>
          <LoadingButton loading={isSubmitting} disabled={!isValid} type='submit' >
            <FormattedMessage id='app.profile.modal.create' />
          </LoadingButton>
        </DialogActions>
      </Form>
    </FormikProvider>
  )
}

export default ItemForm