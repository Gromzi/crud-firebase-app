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
import LogoutIcon from '@mui/icons-material/Logout'

interface Props {
  handleOpenDialog: () => void
}

const UpperNavBar = ({ handleOpenDialog }: Props) => {
  const { user } = useContext(UserContext)

  return (
    <AppBar className="upperNav" position="fixed">
      <Toolbar>
        <IconButton
          onClick={handleOpenDialog}
          sx={{ position: 'absolute', left: 10 }}
        >
          <LogoutIcon color="error" />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Baza gier
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
        ) : null}
      </Toolbar>
    </AppBar>
  )
}

export default UpperNavBar
