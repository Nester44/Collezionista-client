import { Box, createTheme, ThemeProvider } from '@mui/material';
import React, { useEffect } from 'react';
import { IntlProvider } from "react-intl";
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter } from "react-router-dom";
import './App.css';
import { localeSelector, modeSelector } from './app/appSlice';
import { checkAuth } from './app/auth/auth-slice';
import AppRoutes from './common/routes/AppRoutes';
import Header from './components/header/Header';
import ProfileDrawer from './components/ProfileDrawer/ProfileDrawer';
import messages_en from './shared/localizations/en.json';
import messages_ru from './shared/localizations/ru.json';
import { purple, red, orange, yellow, green, blue, indigo } from '@mui/material/colors';


const lightTheme = createTheme({
  palette: {
    mode: 'light',

    purple: {
      main: purple[900],
      contrastText: '#333',
    },
    red: {
      main: red[900],
      contrastText: '#333',
    },
    orange: {
      main: orange[900],
      contrastText: '#333',
    },
    yellow: {
      main: yellow[900],
      contrastText: '#333',
    },
    green: {
      main: green[900],
      contrastText: '#333',
    },
    blue: {
      main: blue[900],
      contrastText: '#333',
    },
    indigo: {
      main: indigo[900],
      contrastText: '#333',
    }
  }
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    purple: {
      main: purple[300],
      contrastText: '#fff',
    },
    red: {
      main: red[300],
      contrastText: '#fff',
    },
    orange: {
      main: orange[300],
      contrastText: '#fff',
    },
    yellow: {
      main: yellow[300],
      contrastText: '#fff',
    },
    green: {
      main: green[300],
      contrastText: '#fff',
    },
    blue: {
      main: blue[300],
      contrastText: '#fff',
    },
    indigo: {
      main: indigo[300],
      contrastText: '#fff',
    }
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
