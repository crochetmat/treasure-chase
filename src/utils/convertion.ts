import { Adventurer, IAdventurer } from '../models/adventurer.models'
import { Cell, ICell } from '../models/cell.models'
import { Chase, IChase } from '../models/chase.models'
import {
  TYPE,
  ITEM_X,
  ITEM_Y,
  ITEM_NB_TREASURE,
  A_X,
  A_Y,
  A_NAME,
  A_DIRECTION,
  A_MOVES,
  IS_PLAIN,
  IS_MOUNTAIN,
  IS_TREASURE,
  IS_ADVENTURER,
} from './const'

/*
/ Convert multi-line text to array
*/
export const convertFileTxtToFileArray = (fileTxt: string): string[] => {
  if (fileTxt) {
    return fileTxt.split('\n')
  }

  return []
}

/*
/ Convert an array to a chase (a matrix and an adventurer list)
/
/ Exemple : 
/ C - 3 - 4
/ M - 1 - 0 
/ 
/ --> {"_matrix":[[{"_type":".","_x":0,"_y":0,"_nbTreasure":0,"_adventurer":null},{"_type":"M","_x":1,"_y":0,"_nbTreasure":0,"_adventurer":null}]],"_adventurers":[]}
/ 
*/
export const convertArrayToChase = (fileArray: string[]): IChase => {
  const matrixInitial: ICell[][] = []
  const adventurerListInitial: IAdventurer[] = []

  if (fileArray.length === 0) {
    throw new Error('Fichier vide !')
  }

  fileArray.forEach((lineTxt: string, i: number) => {
    // remove all space
    const line = lineTxt.replace(/\s/g, '')

    if (i === 0) {
      // first line, we create the matrix with default value
      if (IS_PLAIN.test(line)) {
        const data = getDataLine(line.split('-'))
        if (data) {
          for (let y = 0; y < data.y; y++) {
            matrixInitial[y] = new Array(data.x)
            for (let x = 0; x < data.x; x++) {
              matrixInitial[y][x] = new Cell('.', x, y, 0)
            }
          }
        }
      } else {
        throw new Error('Première ligne du fichier incorrect !')
      }
    } else if (IS_MOUNTAIN.test(line) || IS_TREASURE.test(line)) {
      const data = getDataLine(line.split('-')) as ICell
      matrixInitial[data.y][data.x] = data
    } else if (IS_ADVENTURER.test(line)) {
      const data = getDataLine(line.split('-')) as IAdventurer
      matrixInitial[data.y][data.x].placeAdventurer(data)
      adventurerListInitial.push(data)
    }
  })

  return new Chase(matrixInitial, adventurerListInitial)
}

/*
/ Convert chase to text
*/
export const convertChaseToText = (chase: IChase): string => {
  let output = `C - ${chase.matrix[0].length} - ${chase.matrix.length}\n`
  const moutains: ICell[] = []
  const treasures: ICell[] = []

  chase.matrix.forEach((row: ICell[], y: number) => {
    row.forEach((cell: ICell, x: number) => {
      if (cell.getCurrentType() === 'M') {
        moutains.push(cell)
      } else if (cell.getCurrentType() === 'T') {
        if (cell.getCurrentNbTreasure() > 0) {
          treasures.push(cell)
        }
      }
    })
  })

  moutains.forEach((moutain: ICell) => {
    output += `M - ${moutain.x} - ${moutain.y}\n`
  })

  treasures.forEach((treasure: ICell) => {
    output += `T - ${treasure.x} - ${treasure.y} - ${treasure.nbTreasure}\n`
  })

  chase.adventurers.forEach((adventurer: IAdventurer) => {
    output += `A - ${adventurer.name} - ${adventurer.x} - ${adventurer.y} - ${adventurer.direction} - ${adventurer.nbTreasure}\n`
  })

  return output
}

/*
/ Create Cell or Adventurer from array string
*/
export const getDataLine = (data: string[]): ICell | IAdventurer => {
  switch (data[TYPE]) {
    case 'C':
    case 'M':
      return new Cell(data[TYPE], parseInt(data[ITEM_X]), parseInt(data[ITEM_Y]), 0)
    case 'T':
      return new Cell(data[TYPE], parseInt(data[ITEM_X]), parseInt(data[ITEM_Y]), parseInt(data[ITEM_NB_TREASURE]))
    case 'A':
      return new Adventurer(data[TYPE], parseInt(data[A_X]), parseInt(data[A_Y]), data[A_NAME], data[A_DIRECTION], data[A_MOVES])
    default:
      throw new Error(`Ligne incorrecte ${data}`)
  }
}
