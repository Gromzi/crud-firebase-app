import { UseFormRegister, FieldErrors } from 'react-hook-form'
import FormValues from './formValues'

interface RoleInputProps {
  register: UseFormRegister<FormValues>
  errors: FieldErrors<FormValues>
  roleValue: string
}

export default RoleInputProps
