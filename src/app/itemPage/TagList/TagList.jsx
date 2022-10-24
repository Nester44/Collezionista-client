import { Box } from '@mui/system'
import React from 'react'
import Tag from '../../collection/ItemsList/Item/Tag/Tag'
import ItemAutoComplete from '../../../components/ui/ItemAutoComplete/ItemAutoComplete'
import TagInput from './TagInput/TagInput'

const TagList = ({ currentTags, isEdit, tagsOptions, setFieldValue, autocompleteTags }) => {

  const tagElements = currentTags.map((t) => <Tag key={t.name} name={t.name} color={t.color} />)

  return (
    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
      {
        isEdit ?
        
        <ItemAutoComplete
          setFieldValue={setFieldValue}
          tags={tagsOptions}
          autocompleteTags={autocompleteTags}
        />
        :
        tagElements
      }
    </Box>
  )
}

export default TagList