import { IBasicCell } from './basicCell.models'
import { IMove } from './move.models'
interface AdventurerConstructor {
  new (
    type: string,
    x: number,
    y: number,
    name: string,
    direction: string,
    moves: string,
    nbTreasure?: number,
    isMoving?: 'no' | 'block' | 'turn' | 'go',
  ): IAdventurer
}

export interface IAdventurer extends IBasicCell {
  name: string
  direction: string
  moves: string
  isMoving: 'no' | 'block' | 'turn' | 'go'
  getNextMove(): IMove
  incrementTreasure(): void
  getPosition(): IMove
  setPosition(nextMove: IMove): void
}

export const Adventurer: AdventurerConstructor = class Adventurer implements IAdventurer {
  private _type: string
  private _x: number
  private _y: number
  private _name: string
  private _direction: string
  private _moves: string
  private _nbTreasure: number
  private _isMoving: 'no' | 'block' | 'turn' | 'go'

  constructor(
    type: string,
    x: number,
    y: number,
    name: string,
    direction: string,
    moves: string,
    nbTreasure: number = 0,
    isMoving: 'no' | 'block' | 'turn' | 'go' = 'no',
  ) {
    this._type = type
    this._x = x
    this._y = y
    this._name = name
    this._direction = direction
    this._moves = moves
    this._nbTreasure = nbTreasure
    this._isMoving = isMoving
  }

  public get type() {
    return this._type
  }

  public get x() {
    return this._x
  }

  public get y() {
    return this._y
  }

  public get name() {
    return this._name
  }

  public get direction() {
    return this._direction
  }

  public set direction(direction: string) {
    this._direction = direction
  }

  public get moves() {
    return this._moves
  }

  public get nbTreasure() {
    return this._nbTreasure
  }

  public get isMoving() {
    return this._isMoving
  }

  public set isMoving(isMoving: 'no' | 'block' | 'turn' | 'go') {
    this._isMoving = isMoving
  }

  public getPosition() {
    return {
      x: this._x,
      y: this._y,
    }
  }

  public setPosition(nextMove: IMove) {
    this._x = nextMove.x
    this._y = nextMove.y
  }

  public getNextMove() {
    switch (this._direction) {
      case 'N':
        return {
          x: this._x,
          y: this._y - 1,
        }
      case 'E':
        return {
          x: this._x + 1,
          y: this._y,
        }
      case 'S':
        return {
          x: this._x,
          y: this._y + 1,
        }
      case 'O':
        return {
          x: this._x - 1,
          y: this._y,
        }
      default:
        throw new Error(`Direction incorrecte ${this._direction}`)
    }
  }

  public incrementTreasure() {
    this._nbTreasure = this._nbTreasure + 1
  }
}
