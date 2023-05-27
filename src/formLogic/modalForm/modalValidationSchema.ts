import * as yup from 'yup'

const schema = yup.object().shape({
  title: yup.string().required('Tytuł jest wymagany'),
  genre: yup.string().required('Gatunek jest wymagany'),
  release: yup
    .string()
    .required('Rok wydania jest wymagany')
    .matches(
      /^(19[0-9][0-9]|20[0-2][0-9]|20[3-9][0-9]|2100)$/,
      'Podaj prawidłowy rok wydania'
    ),
  rating: yup
    .number()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === '' ? null : value
    })
    .min(0, 'Oceń od 0 do 100')
    .max(100, 'Oceń od 0 do 100'),
  finished: yup
    .boolean()
    .required('Status przejścia gry jest wymagany'),
})

export default schema
