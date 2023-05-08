import { Box, CircularProgress, Fab } from '@mui/material'
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
  const [currentGameId, setCurrentGameId] = useState<string | null>(
    null
  )
  const handleOpenModal = () => setShowModal(true)
  const handleClose = () => {
    setCurrentGameId(null)
    setShowModal(false)
  }

  const [showDialog, setShowDialog] = useState<boolean>(false)
  const handleOpenDialog = () => setShowDialog(true)
  const handleCloseDialog = (signOut: boolean) => {
    if (signOut) logout()
    setShowDialog(false)
  }

  const handleRowClick = (gameId: string) => {
    setCurrentGameId(gameId)
    handleOpenModal()
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

      <UpperNavBar handleOpenDialog={handleOpenDialog} />

      <Box className="homeContent">
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
