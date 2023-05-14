import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore'
import Game from '../types/Game'
import { db } from '../config/firebase'

const createGame = async (game: Game) => {
  try {
    const gamesCollectionRef = collection(db, 'games')

    await addDoc(gamesCollectionRef, {
      title: game.title,
      titleLowercase: game.titleLowercase,
      genre: game.genre,
      release: game.release,
      rating: game.rating,
      finished: game.finished,
      uid: game.uid,
    })
    console.log('game successfully added!')
  } catch (err) {
    console.log('error adding game' + err)
  }
}

const updateGame = async (game: Game) => {
  try {
    const gameDoc = doc(db, 'games', game.id)

    await updateDoc(gameDoc, {
      title: game.title,
      titleLowercase: game.titleLowercase,
      genre: game.genre,
      release: game.release,
      rating: game.rating,
      finished: game.finished,
      uid: game.uid,
    })
    console.log('game successfully updated!')
  } catch (err) {
    console.log('error updating game' + err)
  }
}

const deleteGame = async (gameId: string) => {
  const gameDoc = doc(db, 'games', gameId)

  try {
    await deleteDoc(gameDoc)
    console.log('game successfully deleted!')
  } catch (error) {
    console.error('error removing document: ', error)
  }
}

const useCrud = () => {
  return { createGame, updateGame, deleteGame }
}

export default useCrud
