import { Button, Card, CardContent, Typography } from '@mui/material'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Main = () => {
  const { user } = useContext(UserContext)

  const logout = async () => {
    await signOut(auth)
  }

  return (
    <Card
      className="formCard"
      elevation={16}
      sx={{ backgroundColor: 'primary.main', borderRadius: 3 }}
    >
      <CardContent>
        <Typography>{`Zalogowany użytkownik: ${user?.email}`}</Typography>
        <Button onClick={logout}>Wyloguj się</Button>
      </CardContent>
    </Card>
  )
}

export default Main
