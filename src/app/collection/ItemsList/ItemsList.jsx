import { Grid } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../collectionSlice'
import Item from './Item/Item'


const fieldsCheckbox = [
  { label: 'Restaurated', value: true },
  { label: 'New', value: false },
  { label: 'Van gogh\'s art', value: true },
]

const fieldsText = [
  { label: 'Restaurated', value: 'true' },
  { label: 'New', value: 'false' },
  { label: 'Van gogh\'s art', value: 'true' },
]

const ItemsList = ({ items, attributeType }) => {
  console.log(attributeType);
  const dispatch = useDispatch()

  const destroyItem = (id) => {
    dispatch(deleteItem(id))
  }

  const itemsElements = items?.map(i => 
    <Item key={'item' + i.id} name={i.name} tags={i.Tags} fields={i.additional_attributes} type={attributeType} />
  )

  // const itemsElements = items?.map(i => 
  //   <Item key={'item' + i.id} name={i.name} tags={i.Tags} type={attributeType} onDelete={() => destroyItem(i.id)} />
  // )

  return (
    <Grid container spacing={2}>
      {itemsElements}
    </Grid>
  )
}

export default ItemsList