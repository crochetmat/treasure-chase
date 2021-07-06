import { Adventurer } from '../src/models/adventurer.models'
import { Cell } from '../src/models/cell.models'
import { Chase } from '../src/models/chase.models'
import { convertFileTxtToFileArray, convertArrayToChase, convertChaseToText, getDataLine } from '../src/utils/convertion'

describe('Test function convertion', () => {
  it('Test convertFileTxtToFileArray', () => {
    const array = convertFileTxtToFileArray(`C - 3 - 4
M - 1 - 0 
M - 2 - 1 
T - 0 - 3 - 2 
T - 1 - 3 - 3 
A - Lara - 1 - 1 - S - AADADAGGA`)
    expect(array).toStrictEqual(['C - 3 - 4', 'M - 1 - 0 ', 'M - 2 - 1 ', 'T - 0 - 3 - 2 ', 'T - 1 - 3 - 3 ', 'A - Lara - 1 - 1 - S - AADADAGGA'])
  })

  it('Test convertFileTxtToFileArray Empty', () => {
    const t = () => {
      const array = convertFileTxtToFileArray()
      const chaseInitial = convertArrayToChase(array)
    }
    expect(t).toThrow('Fichier vide !')
  })

  it('Test convertArrayToChase', () => {
    const chase = convertArrayToChase([
      'C - 3 - 4',
      'M - 1 - 0 ',
      'M - 2 - 1 ',
      'T - 0 - 3 - 2 ',
      'T - 1 - 3 - 3 ',
      'A - Lara - 1 - 1 - S - AADADAGGA',
    ])
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
            {
              _type: '.',
              _x: 1,
              _y: 1,
              _nbTreasure: 0,
              _adventurer: { _type: 'A', _x: 1, _y: 1, _name: 'Lara', _direction: 'S', _moves: 'AADADAGGA', _nbTreasure: 0, _isMoving: 'no' },
            },
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
        _adventurers: [{ _type: 'A', _x: 1, _y: 1, _name: 'Lara', _direction: 'S', _moves: 'AADADAGGA', _nbTreasure: 0, _isMoving: 'no' }],
      }),
    )
  })

  it('Test convertChaseToText', () => {
    const txt = convertChaseToText(
      new Chase(
        [
          [new Cell('.', 0, 0, 0), new Cell('M', 1, 0, 0), new Cell('.', 2, 0, 0)],
          [new Cell('.', 0, 1, 0), new Cell('.', 1, 1, 0), new Cell('M', 2, 1, 0)],
          [new Cell('.', 0, 2, 0), new Cell('.', 1, 2, 0), new Cell('.', 2, 2, 0)],
          [new Cell('T', 0, 3, 0), new Cell('T', 1, 3, 2), new Cell('.', 2, 3, 0)],
        ],
        [new Adventurer('A', 0, 3, 'Lara', 'S', 'AADADAGGA', 3)],
      ),
    )
    expect(txt).toEqual('C - 3 - 4\nM - 1 - 0\nM - 2 - 1\nT - 1 - 3 - 2\nA - Lara - 0 - 3 - S - 3\n')
  })

  it('Test getDataLine', () => {
    const data = getDataLine(['C', '3', '4'])
    expect(data).toEqual({ _type: 'C', _x: 3, _y: 4, _nbTreasure: 0, _adventurer: null })
  })
})
