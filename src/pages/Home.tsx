import {
  BottomNavigation,
  Box,
  Button,
  Typography,
} from '@mui/material'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore'
import Game from '../types/Game'

const Home = () => {
  const { user } = useContext(UserContext)

  const [games, setGames] = useState<Game[] | null>(null)

  const gamesCollection = collection(db, 'games')

  useEffect(() => {
    const getGamesList = async () => {
      try {
        const data = await getDocs(gamesCollection)
        const filteredData: Game[] = data.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          genre: doc.data().genre,
          release: doc.data().release,
          rating: doc.data().rating,
          finished: doc.data().finished,
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
      <Typography>{`Zalogowany użytkownik: ${user?.email}`}</Typography>

      <Box className="homeContent">
        {games ? <Typography>{games[0].title}</Typography> : null}
      </Box>

      <BottomNavigation sx={{ width: '100vw' }}>
        <Button onClick={logout} color="error">
          Wyloguj się
        </Button>
      </BottomNavigation>
    </Box>
  )
}

export default Home
