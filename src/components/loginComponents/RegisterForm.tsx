import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import ConfirmPasswordInput from './ConfirmPasswordInput'
import { useRegistrationForm } from '../../formLogic/useRegistrationForm'
import FormValues from '../../types/formValues'
import { Button, Divider } from '@mui/material'
import { auth } from '../../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const RegisterForm = () => {
  const { register, handleSubmit, errors } = useRegistrationForm()

  const handleSignIn = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (e) {
      console.error(e)
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
