import { Alert, Box, Button, CircularProgress, Divider, Grid, Paper, Snackbar } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import SnackbarSuccess from '../../components/ui/Snackbars/SnackbarSuccess'
import { currentUserSelector } from '../auth/auth-slice'
import CollectionDialog from './CollectionDialog/CollectionDialog'
import CollectionItem from './CollectionItem/CollectionItem'
import { deleteCollection, getUser, isFetchingSelector, profileSelector } from './profileSlice'

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
  const canManage = (userProfile.id === currentUser?.id) || currentUser?.admin

  const collectionsElements = userProfile?.collections?.map(collection =>
    <CollectionItem 
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

      <Divider />

      {canManage &&
        <Box sx={{
          marginTop: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingLeft: 2
        }}>
          <Button variant="contained" color="primary" size='large'
            onClick={handleClickOpenModal}
          >
            <FormattedMessage id="app.profile.collection.newCollection" />
          </Button>
        </Box>
      }

      <Box my={1}>
        <Paper elevation={3} sx={{
          padding: 2,
        }}>
          {
            collectionsElements.length > 0 ?
              <Grid
              container
              spacing={3}
              >
                {collectionsElements}
              </Grid> :
              <Typography>There is no collections</Typography>
          }


        </Paper>
      </Box>

    <CollectionDialog onSnackOpen={handleClickOpenCreateSnack} open={modalOpen} onClose={handleCloseModal} />
     
    <SnackbarSuccess messageId="app.profile.snackbar.create" snackOpen={createSnackOpen} handleCloseSnack={handleCloseCreateSnack} />
    <SnackbarSuccess messageId="app.profile.snackbar.delete" snackOpen={deleteSnackOpen} handleCloseSnack={handleCloseDeleteSnack} />

    </Container>
  )
}

export default Profile