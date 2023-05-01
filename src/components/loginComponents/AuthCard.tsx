import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

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
  )
}

export default AuthCard
