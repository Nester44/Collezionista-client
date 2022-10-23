import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchTags } from '../collection/collectionSlice'
import Tag from '../collection/ItemsList/Item/Tag/Tag'
import AdditionalAttributes from './AdditionalAttributes/AdditionalAttributes'
import ItemName from './ItemName/ItemName'
import { getItem, itemPendingSelector, itemSelector } from './itemSlice'
import TagList from './TagList/TagList'

const ItemPage = () => {
  const dispatch = useDispatch()
  const { itemId } = useParams()

  const item = useSelector(itemSelector)
  const isFetching = useSelector(itemPendingSelector)

  const [isEdit, setIsEdit] = useState(false)

  const [name, setName] = useState()
  const [currentTags, setCurrentTags] = useState([])
  const [tagsOptions, setTagsOptions] = useState([])

  const saveEdit = () => {
    setIsEdit(false)
  }

  useEffect(() => {
    // getting tags
    const getTags = async () => {
      const { payload } = await dispatch(fetchTags())
      const fetchedTags = payload.map((tag) => tag.name)
      setTagsOptions(fetchedTags)
    } 

    const fetchItem = async() => {
      const { payload } = await dispatch(getItem(itemId))
      setCurrentTags(payload.Tags)
      setName(payload.name)
    }

    fetchItem()
    getTags()
  }, [itemId, dispatch])

  if(isFetching) return <CircularProgress />

  if(!item) return <Typography>Item doesn't exist</Typography>

  const attributes = JSON.parse(item.additional_attributes)

  return (
    <Container>
      <Box my={2} p={2} component={Paper}>
        <ItemName isEdit={isEdit} name={name} setName={setName} />

        <TagList setCurrentTags={setCurrentTags} currentTags={currentTags} isEdit={isEdit} tagsOptions={tagsOptions} />

        <Box mb={2}>
          <Typography variant='subtitle1'>
            Additional attributes
          </Typography>
        </Box>

        <AdditionalAttributes isEdit={isEdit} additionalAttributes={attributes} />

        <Box>
          {
            isEdit ?
            <Button onClick={saveEdit} >Save</Button>
            :
            <Button onClick={() => setIsEdit(true)} >Edit</Button>
          }

        </Box>

      </Box>
    </Container>
  )
}

export default ItemPage