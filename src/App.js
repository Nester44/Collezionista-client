import { Box, createTheme, ThemeProvider } from '@mui/material';
import React, { useEffect } from 'react';
import { IntlProvider } from "react-intl";
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter } from "react-router-dom";
import './App.css';
import { localeSelector, modeSelector } from './app/appSlice';
import { checkAuth } from './app/auth/auth-slice';
import ProfileDrawer from './common/ProfileDrawer/ProfileDrawer';
import AppRoutes from './common/routes/AppRoutes';
import Header from './components/header/Header';
import messages_en from './shared/localizations/en.json';
import messages_ru from './shared/localizations/ru.json';

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
  const locale = useSelector(localeSelector)
  const mode = useSelector(modeSelector)

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
      <IntlProvider locale={locale} messages={messages[locale]}>
        <HashRouter>
          <Box className="App" sx={{ background: theme.palette.background.paper, height: '100vh', overflowY: 'scroll' }}>

            <Header />

            <AppRoutes />

            <ProfileDrawer />

          </ Box>
        </HashRouter>
      </IntlProvider>
    </ThemeProvider>
  );
}

export default App;
