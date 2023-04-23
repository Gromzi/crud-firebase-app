import { ThemeProvider } from '@emotion/react'
import { Box, CssBaseline, createTheme } from '@mui/material'
import './styles/app.scss'
import RegisterCard from './components/loginComponents/RegisterCard'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#001e3c',
    },
    secondary: {
      main: '#0a1929',
    },
    text: {
      primary: '#e7ebf0',
      secondary: 'b2bac2',
    },

    contrastThreshold: 4.5,
  },
  typography: {
    h1: {
      fontSize: 36,
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        className="appContainer"
        sx={{ backgroundColor: 'primary.main' }}
      >
        <RegisterCard />
      </Box>
    </ThemeProvider>
  )
}

export default App
