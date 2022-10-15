import { Box, Button, CircularProgress, Divider, Grid, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CollectionDialog from './CollectionDialog/CollectionDialog'
import CollectionItem from './CollectionItem/CollectionItem'
import { getUser, isFetchingSelector, userSelector } from './profileSlice'

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

  const isFetching = useSelector(isFetchingSelector)
  const user = useSelector(userSelector)

  useEffect(() => {
    const fetchUser = async (id) => {
      await dispatch(getUser(id))
    }

    fetchUser(userId)
      .catch(console.error)
  }, [dispatch, userId])

  if (isFetching) return <CircularProgress />

  const collectionsElements = user?.collections?.map(item => <CollectionItem key={'collection' + item.id} name={item.name} description={item.description} topic={item.topic} />)

  return (
    <Container >
      <Typography variant="h2">
        {user?.name}
      </Typography>

      <Divider />
      
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