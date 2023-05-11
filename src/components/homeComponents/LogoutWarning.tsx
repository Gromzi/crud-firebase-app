import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material'

interface DialogProps {
  open: boolean
  handleClose: (signOut: boolean) => void
}

const LogoutWarning = ({ open, handleClose }: DialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'Czy na pewno chcesz się wylogować?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Twoje dane zostaną zapisane.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="info" onClick={() => handleClose(false)}>
          Anuluj
        </Button>
        <Button
          color="error"
          onClick={() => handleClose(true)}
          autoFocus
        >
          Wyloguj się
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LogoutWarning
