import { Card, CardContent, Divider, Typography } from '@mui/material'
import { useState } from 'react'
import FormValues from '../../types/formValues'
import RegisterForm from './RegisterForm'

const RegisterCard = () => {
  const [activeStep, setActiveStep] = useState<number>(0)

  const [userData, setUserData] = useState<FormValues>({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleSetActiveStep = (newState: number) => {
    setActiveStep(newState)
  }
  const handleSetUserData = (newState: FormValues) => {
    setUserData(newState)
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
        Zaloguj się
      </Typography>

      <Divider variant="middle" />

      <CardContent>
        <RegisterForm
          userData={userData}
          handleSetUserData={handleSetUserData}
          handleSetActiveStep={handleSetActiveStep}
        />
      </CardContent>
    </Card>
  )
}

export default RegisterCard
