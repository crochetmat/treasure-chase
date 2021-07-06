import { Chase } from '../src/models/chase.models'
import { Adventurer } from '../src/models/adventurer.models'
import { Cell } from '../src/models/cell.models'
import { executeActions, getNbTurn, isNextMovePossible } from '../src/utils/utils'

describe('Test function utils', () => {
  it('Test executeActions with map and adventurer', () => {
    const chase = executeActions(
      new Chase(
        [
          [new Cell('.', 0, 0, 0), new Cell('M', 1, 0, 0), new Cell('.', 2, 0, 0)],
          [new Cell('.', 0, 1, 0), new Cell('.', 1, 1, 0, new Adventurer('A', 1, 1, 'Lara', 'S', 'AADADAGGA')), new Cell('M', 2, 1, 0)],
          [new Cell('.', 0, 2, 0), new Cell('.', 1, 2, 0), new Cell('.', 2, 2, 0)],
          [new Cell('T', 0, 3, 2), new Cell('T', 1, 3, 3), new Cell('.', 2, 3, 0)],
        ],
        [new Adventurer('A', 1, 1, 'Lara', 'S', 'AADADAGGA')],
      ),
    )
    expect(JSON.stringify(chase)).toBe(
      JSON.stringify({
        _matrix: [
          [
            { _type: '.', _x: 0, _y: 0, _nbTreasure: 0, _adventurer: null },
            { _type: 'M', _x: 1, _y: 0, _nbTreasure: 0, _adventurer: null },
            { _type: '.', _x: 2, _y: 0, _nbTreasure: 0, _adventurer: null },
          ],
          [
            { _type: '.', _x: 0, _y: 1, _nbTreasure: 0, _adventurer: null },
            { _type: '.', _x: 1, _y: 1, _nbTreasure: 0, _adventurer: null },
            { _type: 'M', _x: 2, _y: 1, _nbTreasure: 0, _adventurer: null },
          ],
          [
            { _type: '.', _x: 0, _y: 2, _nbTreasure: 0, _adventurer: null },
            { _type: '.', _x: 1, _y: 2, _nbTreasure: 0, _adventurer: null },
            { _type: '.', _x: 2, _y: 2, _nbTreasure: 0, _adventurer: null },
          ],
          [
            {
              _type: 'T',
              _x: 0,
              _y: 3,
              _nbTreasure: 0,
              _adventurer: { _type: 'A', _x: 0, _y: 3, _name: 'Lara', _direction: 'S', _moves: 'AADADAGGA', _nbTreasure: 3, _isMoving: 'go' },
            },
            { _type: 'T', _x: 1, _y: 3, _nbTreasure: 2, _adventurer: null },
            { _type: '.', _x: 2, _y: 3, _nbTreasure: 0, _adventurer: null },
          ],
        ],
        _adventurers: [{ _type: 'A', _x: 0, _y: 3, _name: 'Lara', _direction: 'S', _moves: 'AADADAGGA', _nbTreasure: 3, _isMoving: 'go' }],
      }),
    )
  })

  it('Test executeActions with no adventurer', () => {
    const chase = executeActions(
      new Chase(
        [
          [new Cell('.', 0, 0, 0), new Cell('M', 1, 0, 0), new Cell('.', 2, 0, 0)],
          [new Cell('.', 0, 1, 0), new Cell('.', 1, 1, 0), new Cell('M', 2, 1, 0)],
          [new Cell('.', 0, 2, 0), new Cell('.', 1, 2, 0), new Cell('.', 2, 2, 0)],
          [new Cell('T', 0, 3, 2), new Cell('T', 1, 3, 3), new Cell('.', 2, 3, 0)],
        ],
        [],
      ),
    )
    expect(JSON.stringify(chase)).toBe(
      JSON.stringify({
        _matrix: [
          [
            { _type: '.', _x: 0, _y: 0, _nbTreasure: 0, _adventurer: null },
            { _type: 'M', _x: 1, _y: 0, _nbTreasure: 0, _adventurer: null },
            { _type: '.', _x: 2, _y: 0, _nbTreasure: 0, _adventurer: null },
          ],
          [
            { _type: '.', _x: 0, _y: 1, _nbTreasure: 0, _adventurer: null },
            { _type: '.', _x: 1, _y: 1, _nbTreasure: 0, _adventurer: null },
            { _type: 'M', _x: 2, _y: 1, _nbTreasure: 0, _adventurer: null },
          ],
          [
            { _type: '.', _x: 0, _y: 2, _nbTreasure: 0, _adventurer: null },
            { _type: '.', _x: 1, _y: 2, _nbTreasure: 0, _adventurer: null },
            { _type: '.', _x: 2, _y: 2, _nbTreasure: 0, _adventurer: null },
          ],
          [
            { _type: 'T', _x: 0, _y: 3, _nbTreasure: 2, _adventurer: null },
            { _type: 'T', _x: 1, _y: 3, _nbTreasure: 3, _adventurer: null },
            { _type: '.', _x: 2, _y: 3, _nbTreasure: 0, _adventurer: null },
          ],
        ],
        _adventurers: [],
      }),
    )
  })

  it('Test executeActions with no map', () => {
    const chase = executeActions(new Chase([], []))
    expect(JSON.stringify(chase)).toBe(
      JSON.stringify({
        _matrix: [],
        _adventurers: [],
      }),
    )
  })

  it('Test getNbTurn 2 adventurers', () => {
    const nbTurn = getNbTurn([new Adventurer('A', 1, 1, 'Lara', 'S', 'AADADAGGA'), new Adventurer('A', 1, 1, 'Lara', 'S', 'AADADAGGADGAA')])
    expect(nbTurn).toBe(13)
  })

  it('Test getNbTurn no adventurer', () => {
    const nbTurn = getNbTurn([])
    expect(nbTurn).toBe(0)
  })

  it('Test getNbTurn 1 adventurer 0 moves', () => {
    const nbTurn = getNbTurn([new Adventurer('A', 1, 1, 'Lara', 'S', '')])
    expect(nbTurn).toBe(0)
  })

  it('Test isNextMovePossible OK', () => {
    const chase = new Chase(
      [
        [new Cell('.', 0, 0, 0), new Cell('M', 1, 0, 0), new Cell('.', 2, 0, 0)],
        [new Cell('.', 0, 1, 0), new Cell('.', 1, 1, 0), new Cell('M', 2, 1, 0)],
        [new Cell('.', 0, 2, 0), new Cell('.', 1, 2, 0), new Cell('.', 2, 2, 0)],
        [new Cell('T', 0, 3, 2), new Cell('T', 1, 3, 3), new Cell('.', 2, 3, 0)],
      ],
      [],
    )
    const isMovePossible = isNextMovePossible(chase.matrix, {
      x: 1,
      y: 2,
    })
    expect(isMovePossible).toBe(true)
  })

  it('Test isNextMovePossible KO', () => {
    const chase = new Chase(
      [
        [new Cell('.', 0, 0, 0), new Cell('M', 1, 0, 0), new Cell('.', 2, 0, 0)],
        [new Cell('.', 0, 1, 0), new Cell('.', 1, 1, 0), new Cell('M', 2, 1, 0)],
        [new Cell('.', 0, 2, 0), new Cell('.', 1, 2, 0), new Cell('.', 2, 2, 0)],
        [new Cell('T', 0, 3, 2), new Cell('T', 1, 3, 3), new Cell('.', 2, 3, 0)],
      ],
      [],
    )
    const isMovePossible = isNextMovePossible(chase.matrix, {
      x: -1,
      y: 0,
    })
    expect(isMovePossible).toBe(false)
  })
})
