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

  const gamesCollection = collection(db, 'games')

  useEffect(() => {
    console.log('useEffect z Home')

    const getGamesList = async () => {
      let userGamesQuery = query(
        gamesCollection,
        where('uid', '==', user?.uid)
      )

      // if (showFinished) {
      //   userGamesQuery = query(
      //     gamesCollection,
      //     where('finished', '==', true)
      //   )
      // }

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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ pr: 1 }}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

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
          />
        ) : (
          <CircularProgress />
        )}
        <Box sx={{ mb: 5 }}></Box>

        <Box className="addGameButtonContainer">
          <Fab
            onClick={handleOpenModal}
            aria-label="add"
            color="secondary"
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
