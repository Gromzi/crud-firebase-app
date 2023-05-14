import { Box, CircularProgress, Fab, TextField } from '@mui/material'
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

  const [games, setGames] = useState<Game[] | null>(null)
  const gamesCollection = collection(db, 'games')

  useEffect(() => {
    console.log('useEffect z Home')

    const getGamesList = async () => {
      let userGamesQuery = query(
        gamesCollection,
        where('uid', '==', user?.uid)
      )

      if (searchTerm && searchTerm.trim() !== '') {
        userGamesQuery = query(
          userGamesQuery,
          where('title', 'array-contains', searchTerm)
        )
      }

      try {
        const data = await getDocs(userGamesQuery)
        const filteredData: Game[] = data.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          genre: doc.data().genre,
          release: doc.data().release,
          rating: doc.data().rating,
          finished: doc.data().finished,
          uid: doc.data().uid,
        }))
        setGames(filteredData)
        console.log('games state' + games)
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
          label="Search Games"
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={handleSearchInputChange}
        />

        {games ? (
          <GamesList games={games} onRowClick={handleRowClick} />
        ) : (
          <CircularProgress />
        )}

        <Box className="addGameButtonContainer">
          <Fab
            onClick={handleOpenModal}
            aria-label="add"
            sx={{
              borderRadius: '5px',
              backgroundColor: '#1e1e1e',
              color: 'white',
              width: '95vw',
              mt: 0.5,
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
