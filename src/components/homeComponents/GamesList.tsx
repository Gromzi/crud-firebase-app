import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import Game from '../../types/Game'

import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

interface GamesListProps {
  games: Game[]
  onRowClick: (gameId: string) => void
}

const GamesList = ({ games, onRowClick }: GamesListProps) => {
  const handleRowClick = (gameId: string) => {
    if (onRowClick) {
      onRowClick(gameId)
    }
  }

  return (
    <TableContainer
      elevation={1}
      component={Paper}
      className="gamesList"
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tytuł</TableCell>
            <TableCell>Gatunek</TableCell>
            <TableCell>Rok wydania</TableCell>
            <TableCell>Ocena</TableCell>
            <TableCell>Ograna?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games.map((game) => (
            <TableRow
              key={game.id}
              onClick={() => handleRowClick(game.id)}
            >
              <TableCell>{game.title}</TableCell>
              <TableCell>{game.genre}</TableCell>
              <TableCell>{game.release}</TableCell>
              <TableCell>{game.rating}</TableCell>
              <TableCell>
                {game.finished ? <CheckIcon /> : <CloseIcon />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default GamesList
