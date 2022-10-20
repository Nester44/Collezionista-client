import { Box, Button, CircularProgress, Divider, Grid, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AdminPanel from '../../components/ui/AdminPanel/AdminPanel'
import SnackbarSuccess from '../../components/ui/Snackbars/SnackbarSuccess'
import { currentUserSelector } from '../auth/auth-slice'
import CollectionDialog from './CollectionDialog/CollectionDialog'
import CollectionItem from './CollectionItem/CollectionItem'
import CollectionList from './CollectionList/CollectionList'
import ProfilePanel from './ProfilePanel/ProfilePanel'
import { deleteCollection, getUser, isFetchingSelector, profileSelector } from './profileSlice'
import ProfileStatus from './ProfileStatus/ProfileStatus'

const Profile = () => {
  const dispatch = useDispatch()
  const { userId } = useParams()

  const [modalOpen, setModalOpen] = useState(false)
  const [createSnackOpen, setCreateSnackOpen] = useState(false)
  const [deleteSnackOpen, setDeleteSnackOpen] = useState(false)

  const handleClickOpenDeleteSnack = () => setDeleteSnackOpen(true)
  const handleCloseDeleteSnack = () => setDeleteSnackOpen(false)

  const handleClickOpenCreateSnack = () => setCreateSnackOpen(true)
  const handleCloseCreateSnack = () => setCreateSnackOpen(false)

  const handleClickOpenModal = () => setModalOpen(true)
  const handleCloseModal = () => setModalOpen(false)

  const currentUser = useSelector(currentUserSelector)
  const isFetching = useSelector(isFetchingSelector)
  const userProfile = useSelector(profileSelector)

  const destroyCollection = async (collection_id) => {
    await dispatch(deleteCollection(collection_id))
    handleClickOpenDeleteSnack()
  }

  useEffect(() => {
    const fetchUser = async (id) => {
      await dispatch(getUser(id))
    }

    fetchUser(userId)
      .catch(console.error)
  }, [dispatch, userId])

  if (isFetching) return <CircularProgress />


  if (!userProfile) return <Typography variant="h2">User doesn't exist</Typography>

  if (userProfile?.deleted) return <Typography variant="h2">User deleted</Typography>

  const canManage = (userProfile.id === currentUser?.id) || currentUser?.admin

  const collectionsElements = userProfile?.collections?.map(collection =>
    <CollectionItem 
      id={collection.id}
      key={'collection' + collection.id}
      name={collection.name}
      description={collection.description}
      topic={collection.topic}
      canManage={canManage}
      image={collection.image}
      onDelete={() => destroyCollection(collection.id)}
    />)



  return (
    <Container >
      <Typography variant="h2">
        {userProfile?.name}
      </Typography>

      <ProfileStatus userProfile={userProfile} />

      { 
        currentUser?.admin &&
       <AdminPanel id={userProfile?.id} />
      }

      <Divider />

      { 
        canManage &&
        <ProfilePanel handleClickOpenModal={handleClickOpenModal} />
      }

    <CollectionList collectionsElements={collectionsElements} />

    <CollectionDialog onSnackOpen={handleClickOpenCreateSnack} open={modalOpen} onClose={handleCloseModal} />
     
    <SnackbarSuccess messageId="app.profile.snackbar.create" snackOpen={createSnackOpen} handleCloseSnack={handleCloseCreateSnack} />
    <SnackbarSuccess messageId="app.profile.snackbar.delete" snackOpen={deleteSnackOpen} handleCloseSnack={handleCloseDeleteSnack} />

    </Container>
  )
}

export default Profile