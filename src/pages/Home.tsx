import {
  BottomNavigation,
  Box,
  Button,
  CircularProgress,
  Fab,
  IconButton,
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

const Home = () => {
  const { user } = useContext(UserContext)

  const [showModal, setShowModal] = useState<boolean>(false)
  const [currentGameId, setCurrentGameId] = useState<string | null>(
    null
  )
  const handleOpen = () => setShowModal(true)
  const handleClose = () => {
    setCurrentGameId(null)
    setShowModal(false)
  }

  const handleRowClick = (gameId: string) => {
    setCurrentGameId(gameId)
    handleOpen()
  }

  const [games, setGames] = useState<Game[] | null>(null)
  const gamesCollection = collection(db, 'games')
  const gamesCollectionQuery = query(
    gamesCollection,
    where('uid', '==', user?.uid)
  )

  useEffect(() => {
    const getGamesList = async () => {
      try {
        const data = await getDocs(gamesCollectionQuery)
        const filteredData: Game[] = data.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          genre: doc.data().genre,
          release: doc.data().release,
          rating: doc.data().rating,
          finished: doc.data().finished,
          uid: doc.data().uid,
        }))
        console.log(filteredData)
        setGames(filteredData)
      } catch (e) {
        console.log(e)
      }
    }

    getGamesList()
  }, [])

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
        handleClose={handleClose}
        gameId={currentGameId}
      />

      <BottomNavigation className="upperNav">
        <Typography textAlign="center">{`Zalogowany użytkownik: ${user?.email}`}</Typography>
      </BottomNavigation>

      <Box className="homeContent">
        {games ? (
          <GamesList games={games} onRowClick={handleRowClick} />
        ) : (
          <CircularProgress />
        )}
      </Box>

      {/* <IconButton className="addGameButton">
        <AddIcon />
      </IconButton> */}

      <Box className="addGameButtonContainer">
        <Fab
          onClick={handleOpen}
          aria-label="add"
          sx={{
            borderRadius: '10px',
            backgroundColor: '#1e1e1e',
            color: 'white',
            width: '90vw',
          }}
        >
          <AddIcon />
        </Fab>
      </Box>

      <BottomNavigation className="bottomNav">
        <Button onClick={logout} color="error">
          Wyloguj się
        </Button>
      </BottomNavigation>
    </Box>
  )
}

export default Home
