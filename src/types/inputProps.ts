import { FieldErrors, UseFormRegister } from 'react-hook-form'
import FormValues from './formValues'

interface InputProps {
    register: UseFormRegister<FormValues>
    errors: FieldErrors<FormValues> 
}

export default InputProps