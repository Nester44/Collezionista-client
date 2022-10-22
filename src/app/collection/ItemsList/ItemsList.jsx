import { Grid } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../collectionSlice'
import Item from './Item/Item'


const ItemsList = ({ items, attributeType, canEdit }) => {
  const dispatch = useDispatch()

  const destroyItem = (id) => {
    dispatch(deleteItem(id))
  }

  const itemsElements = items?.map(i => 
    <Item key={'item' + i.id} name={i.name} canEdit={canEdit} tags={i.Tags} fields={i.additional_attributes} onDelete={() => destroyItem(i.id)} />
  )

  return (
    <Grid container spacing={2}>
      {itemsElements}
    </Grid>
  )
}

export default ItemsList