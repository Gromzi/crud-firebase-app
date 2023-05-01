import { Divider, Button } from '@mui/material'
import EmailInput from './inputs/EmailInput'
import PasswordInput from './inputs/PasswordInput'
import { useLoginForm } from '../../formLogic/loginForm/useLoginForm'
import LoginFormValues from '../../types/loginFormValues'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { auth, googleProvider } from '../../config/firebase'
import GoogleIcon from '@mui/icons-material/Google'
import setErrorType from '../../types/setErrorType'

const LoginForm = ({ handleSetError }: setErrorType) => {
  const { register, handleSubmit, errors } = useLoginForm()

  const logIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
      console.log(e)
      const errorMessage = (e as { message: string }).message

      switch (errorMessage) {
        case 'Firebase: Error (auth/invalid-email).':
          handleSetError('Nieprawidłowy email')
          break
        case 'Firebase: Error (auth/user-disabled).':
          handleSetError('Konto zostało dezaktywowane')
          break
        case 'Firebase: Error (auth/user-not-found).':
          handleSetError('Nieznaleziono użytkownika')
          break
        case 'Firebase: Error (auth/wrong-password).':
          handleSetError('Nieprawidłowe hasło')
          break
        default:
          console.log(
            'An error occurred while signing in: ',
            errorMessage
          )
          handleSetError(
            'Wystąpił problem z logowaniem: ' + errorMessage
          )
      }
    }
  }
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (e) {
      console.log(e)
    }
  }

  const onSubmit = (data: LoginFormValues) => {
    console.log('userData:', data)
    logIn(data.email, data.password)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />

      <Divider variant="middle" sx={{ ml: 3, mt: 3, mr: 3, mb: 2 }} />

      <Button type="submit" variant="contained">
        Zaloguj się
      </Button>

      <Button
        onClick={signInWithGoogle}
        variant="contained"
        startIcon={<GoogleIcon />}
        sx={{ fontSize: '12px', mt: 1 }}
      >
        Zaloguj się z kontem Google
      </Button>
    </form>
  )
}

export default LoginForm
