import { Divider, Button } from '@mui/material'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import { useLoginForm } from '../../formLogic/useLoginForm'
import LoginFormValues from '../../types/loginFormValues'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { auth, googleProvider } from '../../config/firebase'
import GoogleIcon from '@mui/icons-material/Google'

const LoginForm = () => {
  const { register, handleSubmit, errors } = useLoginForm()

  const logIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
      console.log(e)
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
