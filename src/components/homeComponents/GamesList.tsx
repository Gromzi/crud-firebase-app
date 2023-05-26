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
import { Draggable, Droppable } from 'react-beautiful-dnd'

import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

interface GamesListProps {
  games: Game[]
  onRowClick: (game: Game) => void
  droppableId: string
}

const GamesList = ({
  games,
  onRowClick,
  droppableId,
}: GamesListProps) => {
  const handleRowClick = (game: Game) => {
    if (onRowClick) {
      onRowClick(game)
    }
  }

  return (
    <Table>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <TableContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
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
                {games.map((game, index) => (
                  <Draggable
                    key={game.id}
                    draggableId={game.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <TableRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => {
                          if (!snapshot.isDragging)
                            handleRowClick(game)
                        }}
                        sx={{
                          ...provided.draggableProps.style,
                          background: snapshot.isDragging
                            ? 'lightblue'
                            : 'primary.main',
                        }}
                      >
                        <TableCell>{game.title}</TableCell>
                        <TableCell>{game.genre}</TableCell>
                        <TableCell>{game.release}</TableCell>
                        <TableCell>
                          {game.rating ? game.rating : ''}
                        </TableCell>
                        <TableCell>
                          {game.finished ? (
                            <CheckIcon />
                          ) : (
                            <CloseIcon />
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
              </TableBody>
            </Table>
            {provided.placeholder}
          </TableContainer>
        )}
      </Droppable>
    </Table>
  )
}

export default GamesList
