import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import Game from '../../types/Game'
import { useModalForm } from '../../formLogic/modalForm/useModalForm'
import modalValues from '../../types/modalFormValues'
import { useContext, useEffect } from 'react'
import useCrud from '../../hooks/useCrud'
import { UserContext } from '../../context/UserContext'

interface ModalProps {
  open: boolean
  handleClose: (refresh: boolean) => void
  game: Game | null
}

const GamesModal = ({ open, handleClose, game }: ModalProps) => {
  const { register, handleSubmit, errors, setValue }: any =
    useModalForm()
  const { createGame, updateGame, deleteGame } = useCrud()
  const { user } = useContext(UserContext)

  useEffect(() => {
    console.log('useEffect z modala')
    setValue('title', game ? game.title : '')
    setValue('genre', game ? game.genre : '')
    setValue('release', game ? game.release : '')
    setValue('rating', game ? game.rating : null)
    setValue('finished', game ? game.finished : false)
  }, [setValue, game])

  const onSubmit = (data: modalValues) => {
    console.log('dane gierki:', data)

    const lowercaseArray: string[] = data.title
      .toLowerCase()
      .split(' ')

    // Dodaj albo updatuj rekord w firestore
    if (game) {
      updateGame({
        id: game.id,
        titleLowercase: lowercaseArray,
        uid: user!.uid,
        ...data,
      })
    } else {
      createGame({
        id: '',
        titleLowercase: lowercaseArray,
        uid: user!.uid,
        ...data,
      })
    }

    // Zamknij modal (w trybie z odświeżeniem Home)
    handleClose(true)
  }

  console.log('current game: ' + game)

  return (
    <Modal
      open={open}
      onClose={() => handleClose(false)}
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
              defaultValue=""
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
              defaultValue=""
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
              defaultValue=""
            />
            {errors.release?.message && (
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
              defaultValue=""
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

            <FormControlLabel
              sx={{ pl: 0.75 }}
              control={
                <Checkbox
                  defaultChecked={game?.finished}
                  color={errors.finished?.message ? 'error' : 'info'}
                  {...register('finished')}
                />
              }
              label="Ograna"
            />
            {errors.finished?.message && (
              <Typography
                variant="caption"
                color="error"
                sx={{ ml: 1 }}
              >
                {errors.finished?.message?.toString()}
              </Typography>
            )}

            <Divider sx={{ m: 1 }} />

            <Button type="submit" variant="contained" sx={{ mb: 1 }}>
              {game ? 'Zapisz' : 'Dodaj'}
            </Button>

            {game ? (
              <Button
                onClick={() => {
                  deleteGame(game.id)
                  handleClose(true)
                }}
                type="button"
                variant="contained"
                color="error"
              >
                Usuń grę
              </Button>
            ) : null}
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default GamesModal
