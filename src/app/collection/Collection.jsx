import { Divider, Grid, Paper, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { currentUserSelector } from '../auth/auth-slice'
import { collectionSelector, createItem, deleteItem, getCollection, updateCollection } from './collectionSlice'
import Description from './Description/Description'
import ItemDialog from './ItemDialog/ItemDialog'
import ItemPanel from './ItemPanel/ItemPanel'
import ItemsList from './ItemsList/ItemsList'
import CollectionName from './Name/CollectionName'
import Topic from './Topic/Topic'

const zaglushka = 'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2luZXN8ZW58MHx8MHx8&w=1000&q=80'

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

  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const fetchCollection = async () => {
      const { payload } = await dispatch(getCollection(collectionId))
      setDescription(payload?.description)
      setName(payload?.name)
      setTopic(payload?.topic)
    }

    fetchCollection()
  }, [dispatch, collectionId, collection?.description])



  let userFeatures = { sx: {} }

  const canEdit = currentUser?.admin || currentUser?.id === collection?.user_id

  if (canEdit) {
    userFeatures.onDoubleClick = () => setIsEditing(true)
    userFeatures.sx.cursor = 'pointer'
  }

  const editCollection = () => {
    setIsEditing(false)
    const newCollection = {description, topic, name, id: collection.id}
    if (checkChanges(collection, newCollection)) return null // nothing has changed
    dispatch(updateCollection(newCollection))
  }

  const makeItem = async(name, tags, attributes) => {
    await dispatch(createItem({ collectionId, name, tags, attributes }))
    setModalOpen(false)
  }

  if (!collection) return <Typography>Collection doesn't exist</Typography>
  return (
    <Container maxWidth='xl' >
      <Box my={2} >
        <Box component={Paper} elevation={2} p={{ xs: 2, md: 4}} >
          <Grid container spacing={4}>
            <Grid 
                item
                xs={12}
                md={4}
            >
              <img
                style={{maxWidth: '100%'}}
                src={collection.image || zaglushka} alt='collectionImage'
                >
              </img>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' }, wordWrap: 'break-word' }}  >

                <CollectionName
                  name={name}
                  isEditing={isEditing}
                  onChange={(e) => { setName(e.currentTarget.value) }}
                  userFeatures={userFeatures}
                />

                <Topic topic={topic}  setTopic={setTopic} isEditing={isEditing} userFeatures={userFeatures} />



                <Description
                  isEditing={isEditing}
                  description={description}
                  changeDescription={editCollection}
                  userFeatures={userFeatures}
                  canEdit={canEdit}
                  onChange={(value) => setDescription(value)}
                  turnEditing={() => setIsEditing(true)}
                />

              </Box>
            </Grid>

            

            <Grid item xs={12}>

            <Divider variant='middle' sx={{ marginBottom: 4 }} />

                {canEdit && <ItemPanel onOpenModal={() => setModalOpen(true)} />}
                <ItemsList items={collection?.Items} attributeType={collection?.additional_attributes_type} canEdit={canEdit} />
            </Grid>

            </Grid>
        </Box>

      </Box>

      <ItemDialog createItem={makeItem} open={modalOpen} attributeType={collection?.additional_attributes_type} onClose={() => setModalOpen(false)} />

    </Container>
  )
}

export default Collection