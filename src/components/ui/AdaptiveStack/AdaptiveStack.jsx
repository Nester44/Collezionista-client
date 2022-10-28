import { Box } from '@mui/system'
import React from 'react'

const AdaptiveStack = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 0, md: 2 },
        justifyContent: { xs: 'center', md: 'start' },
        flexDirection: {xs: 'column', md: 'row'},
        mb: 4
     }}
    >
      {children}
    </Box>
  )
}

export default AdaptiveStack