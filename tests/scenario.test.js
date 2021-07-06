import { convertFileTxtToFileArray, convertArrayToChase, convertChaseToText } from '../src/utils/convertion'
import { executeActions } from '../src/utils/utils'

describe('Test convertion text vers Matrice', () => {
  it('Test scenario map 1 OK', () => {
    const array = convertFileTxtToFileArray(`C - 3 - 4
M - 1 - 0 
M - 2 - 1 
T - 0 - 3 - 2 
T - 1 - 3 - 3 
A - Lara - 1 - 1 - S - AADADAGGA`)

    const chaseInitial = convertArrayToChase(array)
    const chase = executeActions(chaseInitial)
    const txt = convertChaseToText(chase)
    expect(txt).toEqual('C - 3 - 4\nM - 1 - 0\nM - 2 - 1\nT - 1 - 3 - 2\nA - Lara - 0 - 3 - S - 3\n')
  })

  it('Test scenario map 1 KO', () => {
    const t = () => {
      const array = convertFileTxtToFileArray(`M - 3 - 4
      M - 1 - 0 
      M - 2 - 1 
      T - 0 - 3 - 2 
      T - 1 - 3 - 3 
      A - Lara - 1 - 1 - S - AADADAGGA`)
      const chaseInitial = convertArrayToChase(array)
      const chase = executeActions(chaseInitial)
      const txt = convertChaseToText(chase)
    }
    expect(t).toThrow('Première ligne du fichier incorrect !')
  })
})
