import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import RegisterForm from '../components/loginComponents/RegisterForm'
import LoginForm from '../components/loginComponents/LoginForm'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'

const AuthCard = () => {
  const [showLoginForm, setShowLoginForm] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loader, setLoader] = useState<boolean>(false)

  const handleSetError = (message: string) => {
    setError(message)
  }
  const handleSetLoader = (state: boolean) => {
    setLoader(state)
  }

  return (
    <Box
      className="authContainer"
      sx={{ backgroundColor: 'primary.main' }}
    >
      <Paper
        elevation={2}
        sx={{
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 3,
          pb: 2,
          backgroundColor: 'primary.main',
        }}
      >
        <VideogameAssetIcon sx={{ fontSize: '64px' }} />
        <Typography fontSize="24px" fontWeight="bold">
          Baza gier
        </Typography>
      </Paper>

      <Card
        className="formCard"
        elevation={16}
        sx={{ backgroundColor: 'primary.main', borderRadius: 3 }}
      >
        <Typography
          variant="h1"
          sx={{ textAlign: 'center', fontWeight: 'bold', p: 2 }}
        >
          {showLoginForm ? 'Zaloguj się' : 'Zarejestruj się'}
        </Typography>

        <Divider variant="middle" />

        <CardContent>
          {showLoginForm ? (
            <LoginForm
              handleSetError={handleSetError}
              handleSetLoader={handleSetLoader}
            />
          ) : (
            <RegisterForm
              handleSetError={handleSetError}
              handleSetLoader={handleSetLoader}
            />
          )}
        </CardContent>

        <Divider sx={{ m: 2 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button
            onClick={() => {
              handleSetError('')
              setShowLoginForm(!showLoginForm)
            }}
            variant="text"
          >
            <Typography
              variant="body2"
              color="InfoBackground"
              fontWeight="bold"
              fontSize="12px"
              sx={{ mb: 1 }}
            >
              {showLoginForm
                ? 'Nie masz konta? Zarejestruj się'
                : 'Masz konto? Zaloguj się'}
            </Typography>
          </Button>

          {error ? (
            <Typography
              variant="caption"
              color="error"
              fontSize={13}
              textAlign="center"
            >
              {error}
            </Typography>
          ) : null}

          {loader ? (
            <Box>
              <CircularProgress />
            </Box>
          ) : null}
        </Box>
      </Card>
    </Box>
  )
}

export default AuthCard
