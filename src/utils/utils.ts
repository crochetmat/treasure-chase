import { IAdventurer } from '../models/adventurer.models'
import { ICell } from '../models/cell.models'
import { Chase, IChase } from '../models/chase.models'
import { DIRECTIONS, IMove } from '../models/move.models'

/*
/ Excecute all the adventurer actions turn by turn every $timeout secondes
*/
export const runChase = (initChase: IChase, updateState: (chase: IChase) => void, timeout: number) => {
  const nbTurn = getNbTurn(initChase.adventurers)
  const chase = new Chase([...initChase.matrix], [...initChase.adventurers])

  updateState(chase)
  for (let z = 0; z < nbTurn; z++) {
    setTimeout(() => {
      chase.adventurers.forEach((adventurer: IAdventurer, index: number) => {
        setTimeout(() => {
          if (adventurer.moves[z]) {
            doNextMove(chase, adventurer, z, updateState)
          }
        }, index * timeout)
      })
    }, (z + 1) * timeout * 2)
  }
  return chase
}

/*
/ Excecute all the adventurer actions turn by turn directly
*/
export const executeActions = (initChase: IChase) => {
  const nbTurn = getNbTurn(initChase.adventurers)
  const chase = new Chase([...initChase.matrix], [...initChase.adventurers])

  for (let z = 0; z < nbTurn; z++) {
    chase.adventurers.forEach((adventurer: IAdventurer) => {
      if (adventurer.moves[z]) {
        doNextMove(chase, adventurer, z)
      }
    })
  }

  return chase
}

/*
/ excecute the adventurer next move if possible
*/
const doNextMove = (chase: IChase, adventurer: IAdventurer, indexAdventurer: number, updateState: (chase: IChase) => void = () => {}) => {
  chase.adventurers.forEach((ad: IAdventurer) => (ad.isMoving = 'no'))
  adventurer.isMoving = 'go'
  chase.matrix[adventurer.y][adventurer.x].placeAdventurer(adventurer)
  updateState(new Chase(chase.matrix, chase.adventurers))
  switch (adventurer.moves[indexAdventurer]) {
    case 'D':
    case 'G':
      adventurer.direction = DIRECTIONS[adventurer.moves[indexAdventurer]][adventurer.direction]
      adventurer.isMoving = 'turn'
      chase.matrix[adventurer.y][adventurer.x].placeAdventurer(adventurer)
      updateState(new Chase(chase.matrix, chase.adventurers))
      break
    case 'A':
      const nextMove: IMove = adventurer.getNextMove()
      if (isNextMovePossible(chase.matrix, nextMove)) {
        const position = adventurer.getPosition()
        if (chase.matrix[nextMove.y][nextMove.x].getCurrentType() === 'T' && chase.matrix[nextMove.y][nextMove.x].getCurrentNbTreasure() > 0) {
          adventurer.incrementTreasure()
          chase.matrix[nextMove.y][nextMove.x].decrementTreasure()
        }
        chase.matrix[nextMove.y][nextMove.x].placeAdventurer(adventurer)
        chase.matrix[position.y][position.x].removedventurer()
        adventurer.setPosition(nextMove)

        adventurer.isMoving = 'go'
        updateState(new Chase(chase.matrix, chase.adventurers))
      } else {
        adventurer.isMoving = 'block'
        chase.matrix[adventurer.y][adventurer.x].placeAdventurer(adventurer)
        updateState(new Chase(chase.matrix, chase.adventurers))
      }
      break
    default:
      console.error(`Mouvement incorrect`, adventurer.moves[indexAdventurer])
  }
}

/*
/ Get the max number of actions from adventurers
*/
export const getNbTurn = (data: IAdventurer[]) => {
  if (data.length > 0) {
    return Math.max(...data.map((el) => el.moves.length))
  }

  return 0
}

/*
/ Check is the next move of the adventurer is possible
*/
export const isNextMovePossible = (matrix: ICell[][], nextMove: IMove) => {
  if (nextMove.x < 0 || nextMove.x >= matrix[0].length || nextMove.y < 0 || nextMove.y >= matrix.length) {
    return false
  }

  if (matrix[nextMove.y][nextMove.x].getCurrentType() === 'M' || matrix[nextMove.y][nextMove.x].hasAdventurer()) {
    return false
  }

  return true
}
