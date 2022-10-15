import { Box, Button, CircularProgress, Divider, Grid, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { currentUserSelector } from '../auth/auth-slice'
import CollectionDialog from './CollectionDialog/CollectionDialog'
import CollectionItem from './CollectionItem/CollectionItem'
import { getUser, isFetchingSelector, profileSelector } from './profileSlice'

const Profile = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()
  const { userId } = useParams()

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const currentUser = useSelector(currentUserSelector)

  const isFetching = useSelector(isFetchingSelector)
  const userProfile = useSelector(profileSelector)

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
  
  const collectionsElements = userProfile?.collections?.map(item => 
  <CollectionItem key={'collection' + item.id} name={item.name} description={item.description} topic={item.topic} canManage={canManage} />)
  


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
              onClick={handleClickOpen}
            >
              <FormattedMessage id="app.profile.collection.newCollection" />
            </Button>
          </Box>
          }

      <Box my={1}>
        <Paper elevation={3} sx={{
          padding: 2
          }}>

        <Grid
        container
        spacing={3}
      >
        {collectionsElements}
      </Grid>

        </Paper>
      </Box>

    <CollectionDialog  open={modalOpen} onClose={handleClose} />

    </Container>
  )
}

export default Profile