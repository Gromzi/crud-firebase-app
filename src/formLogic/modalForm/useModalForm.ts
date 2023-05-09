import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import schema from './modalValidationSchema'
import modalValues from '../../types/modalFormValues'

export const useModalForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<modalValues>({
    resolver: yupResolver(schema),
  })

  return { register, handleSubmit, errors, setValue }
}
