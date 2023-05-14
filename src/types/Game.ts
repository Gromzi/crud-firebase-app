interface Game {
  id: string
  title: string
  titleLowercase: string[]
  genre: string
  release: string
  rating: number | null
  finished: boolean
  uid: string
}

export default Game
