import { IAdventurer } from './adventurer.models'
import { IBasicCell } from './basicCell.models'

interface CellConstructor {
  new (type: string, x: number, y: number, nbTreasure: number, adventurer?: IAdventurer | null): ICell
}

export interface ICell extends IBasicCell {
  adventurer: IAdventurer | null
  hasAdventurer(): boolean
  getCurrentType(): string
  getCurrentNbTreasure(): number
  placeAdventurer(adventurer: IAdventurer): void
  removedventurer(): void
  decrementTreasure(): void
}

export const Cell: CellConstructor = class Cell implements ICell {
  private _type: string
  private _x: number
  private _y: number
  private _nbTreasure: number
  private _adventurer: IAdventurer | null

  constructor(type: string, x: number, y: number, nbTreasure: number, adventurer: IAdventurer | null = null) {
    this._type = type
    this._x = x
    this._y = y
    this._nbTreasure = nbTreasure
    this._adventurer = adventurer
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

  public get nbTreasure() {
    return this._nbTreasure
  }

  public get adventurer() {
    return this._adventurer
  }

  public hasAdventurer() {
    return !!this._adventurer
  }

  public getCurrentType() {
    if (this._adventurer) {
      return this._adventurer.type
    }
    return this._type
  }

  public getCurrentNbTreasure() {
    if (this._adventurer) {
      return this._adventurer.nbTreasure
    }
    return this._nbTreasure
  }

  public placeAdventurer(adventurer: IAdventurer) {
    this._adventurer = adventurer
  }

  public removedventurer() {
    this._adventurer = null
  }

  public decrementTreasure() {
    this._nbTreasure = this._nbTreasure - 1
  }
}
