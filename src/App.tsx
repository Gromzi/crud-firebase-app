import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import './styles/app.scss'
import { auth } from './config/firebase'
import { useContext } from 'react'
import { UserContext } from './context/UserContext'
import theme from './styles/theme/appTheme'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './router/AppRoutes'

function App() {
  const { user } = useContext(UserContext)

  auth.currentUser
    ? console.log(`Zalogowany użytkownik: ${auth.currentUser.email}`)
    : console.log('Nie zalogowano')

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <AppRoutes user={user} />
      </Router>
    </ThemeProvider>
  )
}

export default App
