import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

const RegisterCard = () => {
  const [showLoginForm, setShowLoginForm] = useState(true)

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
        {showLoginForm ? <LoginForm /> : <RegisterForm />}
      </CardContent>

      <Divider sx={{ m: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={() => {
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
              ? 'Zarejestruj się'
              : 'Masz konto? Zaloguj się'}
          </Typography>
        </Button>
      </Box>
    </Card>
  )
}

export default RegisterCard
