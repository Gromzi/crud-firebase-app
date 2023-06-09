import {
  Box,
  CircularProgress,
  Divider,
  Fab,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { db } from '../config/firebase'
import { getDocs, collection, query, where } from 'firebase/firestore'
import Game from '../types/Game'
import GamesList from '../components/homeComponents/GamesList'
import AddIcon from '@mui/icons-material/Add'
import GamesModal from '../components/homeComponents/GamesModal'
import UpperNavBar from '../components/homeComponents/UpperNavBar'
import LogoutWarning from '../components/homeComponents/LogoutWarning'
import SearchIcon from '@mui/icons-material/Search'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import useCrud from '../hooks/useCrud'

const Home = () => {
  const { user } = useContext(UserContext)

  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)

  const [homeKey, setHomeKey] = useState<number>(0)

  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = (refresh: boolean) => {
    setSelectedGame(null)
    refresh && setHomeKey(homeKey + 1)
    setShowModal(false)
  }

  const [showDialog, setShowDialog] = useState<boolean>(false)
  const handleOpenDialog = () => setShowDialog(true)
  const handleCloseDialog = (signOut: boolean) => {
    if (signOut) logout()
    setShowDialog(false)
  }

  const handleRowClick = (game: Game) => {
    setSelectedGame(game)
    handleOpenModal()
  }

  const [searchTerm, setSearchTerm] = useState<string>('')
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value)
  }

  const [finishedGames, setFinishedGames] = useState<Game[] | null>(
    null
  )
  const [unfinishedGames, setUnfinishedGames] = useState<
    Game[] | null
  >(null)

  const { updateGame } = useCrud()

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result

    // If there is no destination or the destination is the same as the source, do nothing
    if (
      !destination ||
      destination.droppableId === source.droppableId
    ) {
      console.log('Same destination or no destination')
      return
    }

    // Retrieve the game that was dragged
    let draggedGame: Game | null = null

    if (source.droppableId === 'finished-games' && finishedGames) {
      draggedGame = finishedGames[source.index]
    } else if (
      source.droppableId === 'unfinished-games' &&
      unfinishedGames
    ) {
      draggedGame = unfinishedGames[source.index]
    }

    if (!draggedGame) {
      return
    }

    // Update the 'finished' attribute of the dragged game
    const updatedGame: Game = {
      ...draggedGame,
      finished: destination.droppableId === 'finished-games',
    }
    updateGame(updatedGame)

    // Remove the dragged game from the source state
    let updatedSourceGames: Game[] | null = null

    if (source.droppableId === 'finished-games' && finishedGames) {
      updatedSourceGames = [...finishedGames]
      updatedSourceGames.splice(source.index, 1)
    } else if (
      source.droppableId === 'unfinished-games' &&
      unfinishedGames
    ) {
      updatedSourceGames = [...unfinishedGames]
      updatedSourceGames.splice(source.index, 1)
    }

    // Insert the updated game into the target state
    const updatedTargetGames =
      destination.droppableId === 'finished-games'
        ? (finishedGames || []).concat(updatedGame)
        : (unfinishedGames || []).concat(updatedGame)

    // Update the corresponding state with the new games lists
    setFinishedGames(updatedTargetGames)
    setUnfinishedGames(updatedSourceGames)

    // Refresh Home
    setHomeKey(homeKey + 1)

    console.log(
      'dragged Game: ',
      draggedGame?.title,
      'updatedValue: ',
      draggedGame!.finished
    )
  }

  useEffect(() => {
    console.log('useEffect z Home')

    const gamesCollection = collection(db, 'games')

    const getGamesList = async () => {
      let userGamesQuery = query(
        gamesCollection,
        where('uid', '==', user?.uid)
      )

      if (searchTerm && searchTerm.trim() !== '') {
        const searchTermLowercase = searchTerm.toLowerCase()
        userGamesQuery = query(
          userGamesQuery,
          where(
            'titleLowercase',
            'array-contains',
            searchTermLowercase
          )
        )
      }

      try {
        const data = await getDocs(userGamesQuery)
        const filteredData: Game[] = data.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          titleLowercase: doc.data().titleLowercase,
          genre: doc.data().genre,
          release: doc.data().release,
          rating: doc.data().rating,
          finished: doc.data().finished,
          uid: doc.data().uid,
        }))

        const finishedGames: Game[] = filteredData.filter(
          (game) => game.finished
        )
        const unfinishedGames: Game[] = filteredData.filter(
          (game) => !game.finished
        )

        setFinishedGames(finishedGames)
        setUnfinishedGames(unfinishedGames)

        console.log('games state' + filteredData)
      } catch (e) {
        console.log(e)
      }
    }

    getGamesList()
  }, [homeKey, searchTerm])

  const logout = async () => {
    await signOut(auth)
  }

  return (
    <Box
      className="homeContainer"
      sx={{ backgroundColor: 'primary.main' }}
    >
      <GamesModal
        open={showModal}
        handleClose={handleCloseModal}
        game={selectedGame}
      />

      <UpperNavBar handleOpenDialog={handleOpenDialog} />

      <Box className="homeContent">
        <TextField
          sx={{ mt: 8 }}
          label="Wyszukaj grę"
          variant="outlined"
          size="medium"
          fullWidth
          value={searchTerm}
          onChange={handleSearchInputChange}
          color="info"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ pr: 1 }}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <DragDropContext onDragEnd={handleDragEnd}>
          <Box>
            <Typography variant="h4" sx={{ mt: 2, mb: -1 }}>
              Ograne gry
            </Typography>
            <Divider variant="fullWidth" sx={{ mt: 2 }} />
          </Box>
          {finishedGames ? (
            <GamesList
              games={finishedGames}
              onRowClick={handleRowClick}
              droppableId="finished-games"
            />
          ) : (
            <CircularProgress />
          )}

          <Box sx={{ mt: 2 }}>
            <Typography variant="h4" sx={{ mt: 2, mb: -1 }}>
              Nieograne gry
            </Typography>
            <Divider variant="fullWidth" sx={{ mt: 2 }} />
          </Box>
          {unfinishedGames ? (
            <GamesList
              games={unfinishedGames}
              onRowClick={handleRowClick}
              droppableId="unfinished-games"
            />
          ) : (
            <CircularProgress />
          )}
          <Box sx={{ mb: 5 }}></Box>
        </DragDropContext>

        <Box className="addGameButtonContainer">
          <Fab
            onClick={handleOpenModal}
            aria-label="add"
            color="success"
            sx={{
              position: 'fixed',
              bottom: '12px',
              right: '12px',
            }}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Box>

      <LogoutWarning
        open={showDialog}
        handleClose={handleCloseDialog}
      />
    </Box>
  )
}

export default Home
