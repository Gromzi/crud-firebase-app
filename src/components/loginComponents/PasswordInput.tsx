import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import InputProps from '../../types/inputProps'
import { useState } from 'react'

const PasswordInput = ({ register, errors }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <TextField
        type={showPassword ? 'text' : 'password'}
        label="Hasło"
        variant="standard"
        sx={{ m: 1 }}
        color={errors.password?.message ? 'error' : 'info'}
        {...register('password')}
        defaultValue=""
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setShowPassword(!showPassword)
                }}
                tabIndex={-1}
              >
                {showPassword ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {errors.password?.message && (
        <Typography variant="caption" color="error" sx={{ ml: 1 }}>
          {errors.password?.message.toString()}
        </Typography>
      )}
    </>
  )
}

export default PasswordInput
