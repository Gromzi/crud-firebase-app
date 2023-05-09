import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import Game from '../../types/Game'
import { useModalForm } from '../../formLogic/modalForm/useModalForm'
import modalValues from '../../types/modalFormValues'

interface ModalProps {
  open: boolean
  handleClose: () => void
  game: Game | null
  setGame: (game: Game) => void
}

const GamesModal = ({
  open,
  handleClose,
  game,
  setGame,
}: ModalProps) => {
  const { register, handleSubmit, errors } = useModalForm()

  const onSubmit = (data: modalValues) => {
    console.log(`dane gierki: ${data}`)
    // Przypisz obiekt żeby zmienić stan i odświeżyć ekran główny
    setGame({
      id: '',
      ...data,
      uid: '',
    })
    // Dodaj rekord do firestore

    // Zamknij modal
    handleClose()
  }

  console.log(game)

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
          top: '50%',
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
          variant="h4"
          component="h2"
          textAlign="center"
        >
          {game ? game.title : 'Dodaj grę'}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              type="text"
              label="Tytuł"
              variant="standard"
              sx={{ m: 1 }}
              color={errors.title?.message ? 'error' : 'info'}
              {...register('title')}
              defaultValue={game ? game.title : ''}
            />
            {errors.title?.message && (
              <Typography
                variant="caption"
                color="error"
                sx={{ ml: 1 }}
              >
                {errors.title?.message?.toString()}
              </Typography>
            )}

            <TextField
              type="text"
              label="Gatunek"
              variant="standard"
              sx={{ m: 1 }}
              color={errors.genre?.message ? 'error' : 'info'}
              {...register('genre')}
              defaultValue={game ? game.genre : ''}
            />
            {errors.genre?.message && (
              <Typography
                variant="caption"
                color="error"
                sx={{ ml: 1 }}
              >
                {errors.genre?.message?.toString()}
              </Typography>
            )}

            <TextField
              type="text"
              label="Rok wydania"
              variant="standard"
              sx={{ m: 1 }}
              color={errors.release?.message ? 'error' : 'info'}
              {...register('release')}
              defaultValue={game ? game.release : ''}
            />
            {errors.title?.message && (
              <Typography
                variant="caption"
                color="error"
                sx={{ ml: 1 }}
              >
                {errors.release?.message?.toString()}
              </Typography>
            )}

            <TextField
              type="number"
              label="Rating"
              variant="standard"
              sx={{ m: 1 }}
              color={errors.rating?.message ? 'error' : 'info'}
              {...register('rating')}
              defaultValue={game ? game.rating : null}
            />
            {errors.rating?.message && (
              <Typography
                variant="caption"
                color="error"
                sx={{ ml: 1 }}
              >
                {errors.rating?.message?.toString()}
              </Typography>
            )}
          </Box>

          <Button type="submit" variant="contained">
            {game ? 'Zapisz' : 'Dodaj'}
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default GamesModal
