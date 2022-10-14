import './App.css';
import React, { useState, useEffect } from 'react'
import { HashRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import AppRoutes from './common/routes/AppRoutes';
import { checkAuth } from './slices/auth-slice';
import { useDispatch } from 'react-redux';
import messages_en from './shared/localizations/en.json'
import messages_ru from './shared/localizations/ru.json'
import Header from './app/header/Header';
import { Box, Container, createTheme, ThemeProvider } from '@mui/material';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  }
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
  typography: {
    allVariants: {
      color: 'white'
    }
  }
})

const themes = {
  light: lightTheme,
  dark: darkTheme
}


const messages = {
  'en': messages_en,
  'ru': messages_ru
}

function App() {
  const [language, setLanguage] = useState(localStorage.getItem('locale') || 'en')
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'light')

  const theme = themes[mode]

  const dispatch = useDispatch()
  useEffect(() => {
    const checkAuthorization = async () => {
      await dispatch(checkAuth())
    }
    checkAuthorization()
      .catch(console.error)

  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider locale={language} messages={messages[language]}>
        <HashRouter>
          <Box className="App" sx={{ background: theme.palette.background.paper, height: '100vh' }}>
            <Header setLanguage={setLanguage} setTheme={setMode} theme={mode} language={language} />
            <AppRoutes />
          </ Box>
        </HashRouter>
      </IntlProvider>
    </ThemeProvider>
  );
}

export default App;
