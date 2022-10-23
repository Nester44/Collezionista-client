import { Box } from '@mui/system'
import React from 'react'
import Tag from '../../collection/ItemsList/Item/Tag/Tag'
import ItemAutoComplete from '../../../components/ui/ItemAutoComplete/ItemAutoComplete'
import TagInput from './TagInput/TagInput'

const TagList = ({ setCurrentTags, currentTags, isEdit, tagsOptions }) => {

  const tagElements = currentTags.map((t, i) => <Tag key={t.name} name={t.name} color={t.color} />)

  return (
    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 1 }}>
      {
        isEdit ?
        
        <TagInput tagsOptions={tagsOptions} setCurrentTags={setCurrentTags} currentTags={currentTags} />
        :
        tagElements
      }
    </Box>
  )
}

export default TagList