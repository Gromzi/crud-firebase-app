import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import FormValues from '../types/formValues'
import schema from './validationSchema'

export const useRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  return { register, handleSubmit, errors, setValue }
}
