import { Adventurer, IAdventurer } from './adventurer.models'
import { Cell, ICell } from './cell.models'

interface ChaseConstructor {
  new (matrix: ICell[][], adventurers: IAdventurer[]): IChase
}

export interface IChase {
  matrix: ICell[][]
  adventurers: IAdventurer[]
}

export const Chase: ChaseConstructor = class Chase implements IChase {
  private _matrix: ICell[][]
  private _adventurers: IAdventurer[]

  constructor(matrix: ICell[][], adventurers: IAdventurer[]) {
    const newMatrix: ICell[][] = []
    matrix.forEach((line: ICell[], y: number) => {
      newMatrix[y] = new Array(line.length)
      line.forEach((cell: ICell, x: number) => {
        newMatrix[y][x] = new Cell(cell.type, cell.x, cell.y, cell.nbTreasure, cell.adventurer)
      })
    })

    const newAdventurers: IAdventurer[] = []
    adventurers.forEach((adventurer: IAdventurer) => {
      newAdventurers.push(
        new Adventurer(
          adventurer.type,
          adventurer.x,
          adventurer.y,
          adventurer.name,
          adventurer.direction,
          adventurer.moves,
          adventurer.nbTreasure,
          adventurer.isMoving,
        ),
      )
    })

    this._matrix = newMatrix
    this._adventurers = newAdventurers
  }

  public get matrix() {
    return this._matrix
  }

  public get adventurers() {
    return this._adventurers
  }

  public set matrix(matrix: ICell[][]) {
    this._matrix = matrix
  }

  public set adventurers(adventurers: IAdventurer[]) {
    this._adventurers = adventurers
  }
}
