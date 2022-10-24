import { Box, Button, Typography } from '@mui/material'
import { Form, FormikProvider, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchTags } from '../../collection/collectionSlice'
import AdditionalAttributes from '../AdditionalAttributes/AdditionalAttributes'
import ItemName from '../ItemName/ItemName'
import TagList from '../TagList/TagList'
import * as yup from 'yup'
import { updateItem } from '../itemSlice'


const ItemInfo = ({ attributes, itemName, itemTags, itemId }) => {
  const dispatch = useDispatch()
  const ItemSchema = yup.object().shape({
    name: yup
      .string()
      .required(),
    tags: yup
      .array(),
  })



  const [isEdit, setIsEdit] = useState(false)

  const [currentTags, setCurrentTags] = useState(itemTags)
  const [tagsOptions, setTagsOptions] = useState([])



  const onSubmit = async (data) => {
    dispatch(updateItem({ id: itemId, ...data }))
    setIsEdit(false)
  }

  const formik = useFormik({
    initialValues: {
      name: itemName,
      tags: itemTags.map(t => t.name),
      additionalFields: [],
    },
    validationSchema: ItemSchema,
    onSubmit,
  })

  const {
    handleSubmit,
    errors,
    touched,
    getFieldProps,
    setFieldValue,
    values
  } = formik

  useEffect(() => {
    // getting tags options
    const getTags = async () => {
      const { payload } = await dispatch(fetchTags())
      const fetchedTags = payload.map((tag) => tag.name)
      setTagsOptions(fetchedTags)
    }

    const fields = []
    attributes.forEach((a) => {
      fields.push({ ...a })
    })
    setFieldValue('additionalFields', fields)

    getTags()
  }, [dispatch, setFieldValue, attributes])

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit} >
        <Box sx={{ width: { xs: '100%', sm: '80%', md: '70%' }, marginX: 'auto' }} >

          <ItemName
            isEdit={isEdit}
            name={values.name}
            errors={errors}
            touched={touched}
            getFieldProps={getFieldProps}
          />

          <TagList
            setCurrentTags={setCurrentTags}
            currentTags={itemTags}
            autocompleteTags={values.tags}
            isEdit={isEdit}
            tagsOptions={tagsOptions}
            setFieldValue={setFieldValue}
          />

          <Typography component={Box} mb={2} variant='subtitle1'>
            Additional attributes
          </Typography>

          <AdditionalAttributes
            isEdit={isEdit}
            additionalAttributes={attributes}
            errors={errors}
            touched={touched}
            getFieldProps={getFieldProps}
            setFieldValue={setFieldValue}
          />

          <Box>
            {
              isEdit &&
              <Button type='submit' >Save</Button>
            }
            {
              isEdit ||
              <Button onClick={() => setIsEdit(true)} >Edit</Button>
            }



          </Box>
        </Box>
      </Form>
    </FormikProvider>
  )
}

export default ItemInfo