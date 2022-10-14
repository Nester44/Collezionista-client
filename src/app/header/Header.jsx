import React, { useState } from 'react'
import { Select, MenuItem, InputLabel, AppBar, Toolbar, Typography, IconButton, ToggleButtonGroup, ToggleButton } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Header = ({ setLanguage, language, setTheme, theme }) => {
  const [locale, setLocale] = useState(language)
  const [mode, setMode] = useState(theme)
  const handleLocaleChange = (e, newLocale) => {
    if (!newLocale) return
    localStorage.setItem('locale', newLocale)
    setLanguage(newLocale)
    setLocale(newLocale)
  }

  const handleModeChange = (e, newMode) => {
    if (!newMode) return
    localStorage.setItem('mode', newMode)
    setMode(newMode)
    setTheme(newMode)
  }
  return (
    <AppBar position='static' >
      <Toolbar>
        <Typography variant="h6" component="span" color="white" sx={{ flexGrow: 1, textAlign: 'left' }}>
          Collection system
        </Typography>
        <IconButton
          color="inherit"
        >
          <AccountBoxIcon />
        </IconButton>
        <ToggleButtonGroup
          value={locale}
          exclusive
          onChange={handleLocaleChange}
          size='small'
        >
          <ToggleButton value="en" aria-label="left aligned">
            <Typography variant="body1">EN</Typography>
          </ToggleButton>
          <ToggleButton value="ru" aria-label="centered">
          <Typography variant="body1">RU</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleModeChange}
          size='small'
        >
          <ToggleButton value="light" >
            <Typography variant="body1">Light</Typography>
          </ToggleButton>
          <ToggleButton value="dark" >
          <Typography variant="body1">Dark</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
    </AppBar>
  )
}

export default Header