import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import LoginFormValues from '../types/loginFormValues'
import schema from './loginValidationSchema'

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  })

  return { register, handleSubmit, errors, setValue }
}
