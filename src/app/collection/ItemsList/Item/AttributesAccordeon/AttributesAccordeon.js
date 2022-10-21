import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system'
import React from 'react'
import BooleanAttribute from '../../../../../components/ui/Attributes/BooleanAttribute';
import TextAttribute from '../../../../../components/ui/Attributes/TextAttribute';
import DateAttribute from '../../../../../components/ui/Attributes/DateAttribute';

const attributeComponents = {
  'checkbox': BooleanAttribute,
  'string': TextAttribute,
  'date': DateAttribute
}

const AttributesAccordion = ({ fields, type, name }) => {

  const Attribute = attributeComponents[type] || TextAttribute
  let fieldsElements

  if (Array.isArray(fields)) {
    fieldsElements = fields.map(f =>
      <Attribute key={'attribute' + f.label + f.value + name + fields.indexOf(f)} label={f.label} value={f.value} />
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


