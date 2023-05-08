import { Box, Modal, Typography } from '@mui/material'

interface ModalProps {
  open: boolean
  handleClose: () => void
  gameId: string | null
}

const GamesModal = ({ open, handleClose, gameId }: ModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '95vw',
          maxWidth: '400px',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          {`Game id: ${gameId}`}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor
          ligula.
        </Typography>
      </Box>
    </Modal>
  )
}

export default GamesModal
