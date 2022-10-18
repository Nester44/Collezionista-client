import { Button, Paper, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { currentUserSelector } from '../auth/auth-slice'
import { collectionSelector, editDescription, getCollection, updateCollection } from './collectionSlice'
import Description from './Description/Description'
import CollectionName from './Name/CollectionName'
import { FormattedMessage } from 'react-intl'
import Topic from './Topic/Topic'

const zaglushka = 'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2luZXN8ZW58MHx8MHx8&w=1000&q=80'

const editProps = {
  cursor: 'pointer'
}

const checkChanges = (collection, newCollection) => {
  return (
    collection.description === newCollection.description &&
    collection.topic === newCollection.topic &&
    collection.name === newCollection.name
    )
}

const Collection = () => {
  const { collectionId } = useParams()
  const dispatch = useDispatch()

  const currentUser = useSelector(currentUserSelector)
  const collection = useSelector(collectionSelector)

  const [isEditing, setIsEditing] = useState(false)

  const [name, setName] = useState()
  const [topic, setTopic] = useState()
  const [description, setDescription] = useState()

  useEffect(() => {
    const fetchCollection = async () => {
      const { payload } = await dispatch(getCollection(collectionId))
      setDescription(payload.description)
      setName(payload.name)
      setTopic(payload.topic)
    }

    fetchCollection()
  }, [dispatch, collectionId, collection?.description])



  let userFeatures = { sx: {} }

  const canEdit = currentUser?.admin || currentUser?.id === collection?.user_id

  if (canEdit) {
    userFeatures.onDoubleClick = () => setIsEditing(true)
    userFeatures.sx.cursor = 'pointer'
  }

  const changeDescription = () => {
    setIsEditing(false)
    if (description === collection.description) return // Exit the function if description without changes
    dispatch(editDescription({ id: collection.id, description }))
  }

  const editCollection = () => {
    setIsEditing(false)
    const newCollection = {description, topic, name, id: collection.id}
    if (checkChanges(collection, newCollection)) return null// nothing has changed
    dispatch(updateCollection(newCollection))
  }

  if (!collection) return <Typography>Collection doesn't exist</Typography>
  return (
    <Container>
      <Box my={2}>
        <Paper elevation={2} sx={{ p: 2 }}>

          <CollectionName
            name={name}
            isEditing={isEditing}
            onChange={(e) => { setName(e.currentTarget.value) }}
            editProps={editProps}
            userFeatures={userFeatures}
          />

          <Topic topic={topic}  setTopic={setTopic} isEditing={isEditing} userFeatures={userFeatures} />

          <Box
            my={2}
            mx='auto'
            sx={{maxWidth: { xs: '100%', sm: '50%', md: '40%' }}}
            component='img'
            src={collection.image || zaglushka} alt='collectionImage'
          >
            {/* <img
              style={{ width: '100%', height: '100%' }}
              src={collection.image || zaglushka} alt='collectionImage'
            /> */}
          </Box>

          <Description
            isEditing={isEditing}
            description={description}
            changeDescription={editCollection}
            userFeatures={userFeatures}
            canEdit={canEdit}
            onChange={(e) => setDescription(e.currentTarget.value)}
            turnEditing={() => setIsEditing(true)}
          />

        </Paper>
      </Box>
    </Container>
  )
}

export default Collection