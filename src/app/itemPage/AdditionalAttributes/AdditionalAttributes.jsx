import { Box } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import UniversalAttribute from '../../../components/ui/UniversalAttribute/UniversalAttribute'

const AdditionalAttributes = ({ additionalAttributes }) => {
  const attributes = additionalAttributes.map((f, i) =>
  <UniversalAttribute type={f.type} label={f.label} value={f.value} key={f.label + i} />)
  return (
    <Box mb={4} display='flex' justifyContent='center'  >
      <Stack >
      {attributes}
      </Stack>
    </Box>
  )
}

export default AdditionalAttributes