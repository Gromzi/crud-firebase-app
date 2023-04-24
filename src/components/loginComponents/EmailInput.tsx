import { TextField, Typography } from '@mui/material'

const EmailInput = ({ register, errors }: any) => {
  return (
    <>
      <TextField
        type="text"
        label="Email"
        variant="standard"
        sx={{ m: 1 }}
        color={errors.email?.message ? 'error' : 'info'}
        {...register('email')}
        defaultValue=""
      />
      {errors.email?.message && (
        <Typography variant="caption" color="error" sx={{ ml: 1 }}>
          {errors.email?.message.toString()}
        </Typography>
      )}
    </>
  )
}

export default EmailInput
