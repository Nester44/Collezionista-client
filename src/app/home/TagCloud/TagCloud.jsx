import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch } from 'react-redux'
import { TagCloud as Cloud } from 'react-tagcloud'
import Tag from '../../collection/ItemsList/Item/Tag/Tag'

const customRenderer = (tag, size) => {
  return <Tag key={tag.value} name={tag.value} color={tag.color} size={size} />
}

// const customRenderer = (tag, size, color) => {
//   return (
//     <span key={tag.value} style={{ color }} className={`tag-${size}`}>
//       {tag.value}
//     </span>
//   )
// }

const TagCloud = ({ p, tags}) => {
  
  const formattedTags = tags.map((t) => ({ value: t.name, color: t.color }))

  return (
    <Grid item xs={12} >
      <Box component={Paper} p={p} >

        <Box
          component={Typography}
          mb={2}
        >
          <FormattedMessage id='app.home.tagCloud' /> 

        </Box>

        <Cloud
          styles={{
            display: 'flex',
            gap: '10px'
          }}
          minSize={12}
          maxSize={35}
          tags={formattedTags}
          shuffle={true}
          renderer={customRenderer}
        />

      </Box>
    </Grid>
  )
}

export default TagCloud