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

interface GamesListProps {
  games: Game[]
}

const GamesList = ({ games }: GamesListProps) => {
  return (
    <TableContainer component={Paper} className="gamesList">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tytuł</TableCell>
            <TableCell>Gatunek</TableCell>
            <TableCell>Rok wydania</TableCell>
            <TableCell>Ocena</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games.map((game) => (
            <TableRow key={game.id}>
              <TableCell>{game.title}</TableCell>
              <TableCell>{game.genre}</TableCell>
              <TableCell>{game.release}</TableCell>
              <TableCell>{game.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default GamesList
