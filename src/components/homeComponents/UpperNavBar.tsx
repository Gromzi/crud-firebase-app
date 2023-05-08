import {
  AppBar,
  Avatar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

const UpperNavBar = () => {
  const { user } = useContext(UserContext)

  return (
    <AppBar className="upperNav" position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Games
        </Typography>
        {user ? (
          <Tooltip title="Account settings">
            <IconButton sx={{ position: 'absolute', right: 10 }}>
              <Avatar
                sx={{ width: 36, height: 36 }}
                src={user.photoURL ? user.photoURL : undefined}
              >
                {user?.email?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>
        ) : (
          ''
        )}
      </Toolbar>
    </AppBar>
  )
}

export default UpperNavBar
