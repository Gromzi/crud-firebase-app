import { ThemeProvider } from '@emotion/react'
import { Box, CssBaseline } from '@mui/material'
import './styles/app.scss'
import { auth } from './config/firebase'
import Home from './pages/Home'
import { useContext } from 'react'
import { UserContext } from './context/UserContext'
import AuthCard from './pages/AuthCard'
import theme from './styles/theme/appTheme'

function App() {
  const { user } = useContext(UserContext)

  auth.currentUser
    ? console.log(`Zalogowany użytkownik: ${auth.currentUser.email}`)
    : console.log('Nie zalogowano')

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        className="appContainer"
        sx={{ backgroundColor: 'primary.main' }}
      >
        {user ? <Home /> : <AuthCard />}
      </Box>
    </ThemeProvider>
  )
}

export default App
