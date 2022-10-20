import { Button, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import MDEditor from "@uiw/react-md-editor";
import React from 'react';
import styles from './Description.module.css';

const Description = ({ isEditing, description, changeDescription, userFeatures, onChange, turnEditing, canEdit }) => {
  const theme = useTheme()
  const mode = theme.palette.mode 
  
  return (
    <Box data-color-mode={mode} >
      {
          isEditing ?
          <MDEditor
            height={400}
            className={styles.editor}
            label='Description'
            margin='normal'
            value={description}
            onChange={onChange}
          />
          :
            <MDEditor.Markdown
            style={{ backgroundColor: 'inherit' }}
            source={description}
            linkTarget="_blank"
          />
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
                Save
              </Button>
              :
              <Button onClick={turnEditing}>
                Edit
              </Button>
          }
        </Box>
      }

    </Box>
  )
}

export default Description