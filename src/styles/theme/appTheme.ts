import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#001e3c',
    },
    secondary: {
      main: '#0a1929',
    },
    text: {
      primary: '#e7ebf0',
      secondary: 'b2bac2',
    },

    contrastThreshold: 4.5,
  },
  typography: {
    h1: {
      fontSize: 36,
    },
  },
})

export default theme
