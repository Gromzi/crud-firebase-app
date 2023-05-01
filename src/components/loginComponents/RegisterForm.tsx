import EmailInput from './inputs/EmailInput'
import PasswordInput from './inputs/PasswordInput'
import ConfirmPasswordInput from './inputs/ConfirmPasswordInput'
import { useRegistrationForm } from '../../formLogic/registerForm/useRegistrationForm'
import FormValues from '../../types/formValues'
import { Button, Divider } from '@mui/material'
import { auth } from '../../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import setErrorType from '../../types/setErrorType'

const RegisterForm = ({ handleSetError }: setErrorType) => {
  const { register, handleSubmit, errors } = useRegistrationForm()

  const handleSignIn = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (e) {
      console.log(e)
      const errorMessage = (e as { message: string }).message

      switch (errorMessage) {
        case 'Firebase: Error (auth/email-already-in-use).':
          handleSetError('Konto z tym adresem już istnieje')
          break
        case 'Firebase: Error (auth/invalid-email).':
          handleSetError('Nieprawidłowy email')
          break
        default:
          console.log(
            'An error occurred while registering',
            errorMessage
          )
          handleSetError(
            'Wystąpił błąd przy rejestracji: ' + errorMessage
          )
      }
    }
  }

  const onSubmit = (data: FormValues) => {
    console.log('userData:', data)
    handleSignIn(data.email, data.password)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <ConfirmPasswordInput register={register} errors={errors} />

      <Divider variant="middle" sx={{ ml: 3, mt: 3, mr: 3, mb: 2 }} />

      <Button type="submit" variant="contained">
        Zarejestruj się
      </Button>
    </form>
  )
}

export default RegisterForm
