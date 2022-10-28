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
    <Item
      key={'item' + i.id}
      id={i.id}
      name={i.name}
      canEdit={canEdit}
      tags={i.Tags}
      fields={i.additional_attributes}
      onDelete={() => destroyItem(i.id)}
      xs={12}
      sm={6}
      md={4}
    />
  )

  return (
    <Grid container spacing={2}>
      {itemsElements}
    </Grid>
  )
}

export default ItemsList