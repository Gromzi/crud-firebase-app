import { Divider, Button } from '@mui/material'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import { useLoginForm } from '../../formLogic/useLoginForm'
import LoginFormValues from '../../types/loginFormValues'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'

const LoginForm = () => {
  const { register, handleSubmit, errors } = useLoginForm()

  const handleLogIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
      console.log(e)
    }
  }

  const onSubmit = (data: LoginFormValues) => {
    console.log('userData:', data)
    handleLogIn(data.email, data.password)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />

      <Divider variant="middle" sx={{ ml: 3, mt: 3, mr: 3, mb: 2 }} />

      <Button type="submit" variant="contained">
        Zaloguj się
      </Button>
    </form>
  )
}

export default LoginForm
