import { Button, useTheme, Typography } from '@mui/material';
import { Box } from '@mui/system';
import MDEditor from "@uiw/react-md-editor";
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './Description.module.css';

const Description = ({ isEditing, description, changeDescription, userFeatures, onChange, turnEditing, canEdit }) => {
  const theme = useTheme()
  const mode = theme.palette.mode 
  
  return (
    <Box data-color-mode={mode} >
     
      {
          isEditing ?            
            <MDEditor
              style={{ color:'inherit' }}
              height={400}
              className={styles.editor}
              label='Description'
              margin='normal'
              value={description}
              onChange={onChange}
            />
          :
          <>
            <Typography sx={{ userSelect: 'none' }} component={Box} mb={2} variant="body1" color='text.secondary'>
              <FormattedMessage id='app.collection.description' /> 
            </Typography>
            <MDEditor.Markdown
              style={{ backgroundColor: 'inherit', color:'inherit' }}
              source={description}
              linkTarget="_blank"
            />
          </>
      }
      {
        canEdit &&
        <Box
          mt={2}
          sx={{
            display: 'flex',
            justifyContent: {xs: 'center', sm: 'end'}
          }}
        >
          {
            isEditing ?

              <Button onClick={changeDescription}>
                <FormattedMessage id='app.save' /> 
              </Button>
              :
              <Button onClick={turnEditing}>
                <FormattedMessage id='app.edit' /> 
              </Button>
          }
        </Box>
      }

    </Box>
  )
}

export default Description