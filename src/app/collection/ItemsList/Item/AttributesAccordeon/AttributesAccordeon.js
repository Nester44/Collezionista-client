import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system'
import React from 'react'
import BooleanAttribute from '../../../../../components/ui/Attributes/BooleanAttribute';
import TextAttribute from '../../../../../components/ui/Attributes/TextAttribute';

const AttributesAccordion = ({ fields, type }) => {

  const Attribute = type === 'checkbox' ? BooleanAttribute : TextAttribute
  let fieldsElements

  if (Array.isArray(fields)) {
    fieldsElements = fields.map(f =>
      <Attribute key={'attribute' + f.label} label={f.label} value={f.value} />
    )
  }


  return (
    <Box>
      <Accordion
        sx={{
          background: ''
        }}
      >
        <AccordionSummary
          sx={{
            background: ''
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography sx={{ userSelect: 'none' }} component='span' color='inherit' variant="body1">Additional fields </Typography>
        </AccordionSummary>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} component={AccordionDetails} >
          {fieldsElements}
        </Box>
      </Accordion>
    </Box>
  )
}

export default AttributesAccordion


