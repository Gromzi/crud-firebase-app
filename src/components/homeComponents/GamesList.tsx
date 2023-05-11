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
  onRowClick: (game: Game) => void
}

const GamesList = ({ games, onRowClick }: GamesListProps) => {
  const handleRowClick = (game: Game) => {
    if (onRowClick) {
      onRowClick(game)
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
              onClick={() => handleRowClick(game)}
            >
              <TableCell>{game.title}</TableCell>
              <TableCell>{game.genre}</TableCell>
              <TableCell>{game.release}</TableCell>
              <TableCell>{game.rating ? game.rating : ''}</TableCell>
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
