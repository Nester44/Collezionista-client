import React, { useState } from 'react'
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { localeSelector, toggleLocale } from '../../../app/appSlice'

const LocaleToggle = () => {
  const [locale, setLocale] = useState(useSelector(localeSelector))
  const dispatch = useDispatch()

  const handleLocaleChange = (e, newLocale) => {
    if (newLocale === null) return
    setLocale(newLocale)
    dispatch(toggleLocale(newLocale))
  }

  return (
    <ToggleButtonGroup
      value={locale}
      exclusive
      onChange={handleLocaleChange}
      size='small'
    >
      <ToggleButton value="en" aria-label="left aligned">
        <Typography variant="body1">
          <FormattedMessage id="locale.en" />
        </Typography>
      </ToggleButton>
      <ToggleButton value="ru" aria-label="centered">
        <Typography variant="body1">
          <FormattedMessage id="locale.ru" />
        </Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default LocaleToggle