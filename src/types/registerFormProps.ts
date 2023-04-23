import FormValues from './formValues'

interface RegisterFormProps {
  userData: FormValues
  handleSetUserData: (newState: FormValues) => void
  handleSetActiveStep: (newState: number) => void
}

export default RegisterFormProps
