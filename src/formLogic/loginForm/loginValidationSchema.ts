import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Podaj poprawny email'
    )
    .required('Email jest polem wymaganym'),
  password: yup
    .string()
    .required('Hasło jest polem wymaganym')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Hasło musi zawierać conajmniej 8 znaków, jedną dużą literę, jedną małą literę, jedną cyfrę i jeden znak specjalny'
    ),
})

export default schema
