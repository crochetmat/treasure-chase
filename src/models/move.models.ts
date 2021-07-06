export interface IMove {
  x: number
  y: number
}

export interface IMoveDirection {
  [key: string]: IDirection
  D: IDirection
  G: IDirection
}

export interface IDirection {
  [key: string]: string
  N: string
  E: string
  S: string
  O: string
}

export const DIRECTIONS: IMoveDirection = {
  D: {
    N: 'E',
    E: 'S',
    S: 'O',
    O: 'N',
  },
  G: {
    N: 'O',
    E: 'N',
    S: 'E',
    O: 'S',
  },
}
