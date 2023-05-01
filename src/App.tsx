import { ThemeProvider } from '@emotion/react'
import { Box, CssBaseline, createTheme } from '@mui/material'
import './styles/app.scss'
import RegisterCard from './components/loginComponents/RegisterCard'
import { auth } from './config/firebase'
import Main from './components/Main'
import { useContext } from 'react'
import { UserContext } from './context/UserContext'

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
  const { user } = useContext(UserContext)
  // const [user, setUser] = useState<User | null>(null)

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser)
  // })

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
        {user ? <Main /> : <RegisterCard />}
      </Box>
    </ThemeProvider>
  )
}

export default App
