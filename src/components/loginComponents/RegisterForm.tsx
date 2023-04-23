import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import ConfirmPasswordInput from './ConfirmPasswordInput'
import { useEffect } from 'react'
import { useRegistrationForm } from '../../formLogic/useRegistrationForm'
import FormValues from '../../types/formValues'
import { Button, Divider } from '@mui/material'
import RegisterFormProps from '../../types/registerFormProps'

const RegisterForm = ({
  userData,
  handleSetUserData,
  handleSetActiveStep,
}: RegisterFormProps) => {
  const { register, handleSubmit, errors, setValue } =
    useRegistrationForm()

  const onSubmit = (data: FormValues) => {
    console.log('userData:', data)
    handleSetUserData(data)
    handleSetActiveStep(1)
  }

  useEffect(() => {
    setValue('email', userData.email)
    setValue('password', userData.password)
    setValue('confirmPassword', userData.confirmPassword)
  }, [setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <ConfirmPasswordInput register={register} errors={errors} />

      <Divider variant="middle" sx={{ ml: 3, mt: 3, mr: 3, mb: 2 }} />

      <Button type="submit" variant="contained">
        Zaloguj się
      </Button>
    </form>
  )
}

export default RegisterForm
