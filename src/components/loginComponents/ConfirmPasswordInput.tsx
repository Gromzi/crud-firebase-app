import { TextField, Typography } from '@mui/material'
import InputProps from '../../types/inputProps'

const ConfirmPasswordInput = ({ register, errors }: InputProps) => {
  return (
    <>
      <TextField
        type="password"
        label="Powtórz hasło"
        variant="standard"
        sx={{ m: 1 }}
        color={errors.confirmPassword?.message ? 'error' : 'info'}
        {...register('confirmPassword')}
        defaultValue=""
      />
      {errors.confirmPassword?.message && (
        <Typography variant="caption" color="error" sx={{ ml: 1 }}>
          {errors.confirmPassword?.message.toString()}
        </Typography>
      )}
    </>
  )
}

export default ConfirmPasswordInput
