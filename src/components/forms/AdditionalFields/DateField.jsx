import { TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import React, { useEffect } from 'react';
import moment from 'moment'

const DateField = ({ valueName, getFieldProps, setFieldValue, touched, errors }) => {
  useEffect(() => {
    setFieldValue(valueName, moment('03/10/2004'))
  }, [setFieldValue, valueName])

  return (
  <LocalizationProvider dateAdapter={AdapterMoment} >
        <DesktopDatePicker
          label="Date value"
          {...getFieldProps(valueName)}
          onChange={(value) => setFieldValue(valueName, value)}
          error={Boolean(touched[valueName] && errors[valueName])}
          helperText={touched[valueName] && errors[valueName]}
          id={valueName}
          name={valueName}
          renderInput={(params) => <TextField {...params} />}
        />
  </LocalizationProvider> 
  )
}

export default DateField