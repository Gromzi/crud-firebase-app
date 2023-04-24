import FormValues from './formValues'

interface RegisterFormProps {
  userData: FormValues
  handleSetUserData: (newState: FormValues) => void
}

export default RegisterFormProps
