import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import UniversalAttribute from '../../../../../components/ui/UniversalAttribute/UniversalAttribute';



const AttributesAccordion = ({ fields }) => {

  const fieldsElements = fields.map((f, i) => {
    if (f.type !== 'multiLine') { // Not adding large text to items
      return <UniversalAttribute type={f.type} label={f.label} value={f.value} key={f.label + i} />
    }
  }

  )


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
          <Typography sx={{ userSelect: 'none' }} component='span' color='inherit' variant="body1">
            <FormattedMessage id='app.collection.additionalFields' />
          </Typography>
        </AccordionSummary>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} component={AccordionDetails} >
          {fieldsElements}
        </Box>
      </Accordion>
    </Box>
  )
}

export default AttributesAccordion


