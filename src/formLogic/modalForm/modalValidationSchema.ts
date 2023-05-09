import * as yup from 'yup'

const schema = yup.object().shape({
  title: yup.string().required('Tytuł jest wymagany'),
  genre: yup.string().required('Gatunek jest wymagany'),
  release: yup
    .string()
    .required('Rok wydania jest wymagany')
    .max(4, 'Podaj prawidłowy rok wydania'),
  rating: yup
    .number()
    .min(0, 'Oceń od 0 do 100')
    .max(100, 'Oceń od 0 do 100'),
  finished: yup
    .boolean()
    .required('Status przejścia gry jest wymagany'),
})

export default schema
