import styled from 'styled-components'
import { ICell } from '../models/cell.models'
import mountainImg from '../assets/img/moutaine.jpg'
import plaineImg from '../assets/img/plaine.jpg'
import treasureImg from '../assets/img/treasure.jpg'
import adventurerImg from '../assets/img/adventurer.jpg'
import { IChase } from '../models/chase.models'

const Grid = styled.div<{ width: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  width: ${(props) => props.width * 5}%;
  margin: auto;
`
const Box = styled.div<{ height: number; type: string; isAdMoving: string; direction: string }>`
  border-top: ${(props) => {
    if (props.isAdMoving !== 'no') {
      if (props.direction !== 'N') {
        return `3px solid white`
      }
      const color = props.isAdMoving === 'go' || props.isAdMoving === 'turn' ? '#27f527' : 'red'
      return `3px solid ${color}`
    }

    return `1px solid black`
  }};
  border-right: ${(props) => {
    if (props.isAdMoving !== 'no') {
      if (props.direction !== 'E') {
        return `3px solid white`
      }
      const color = props.isAdMoving === 'go' || props.isAdMoving === 'turn' ? '#27f527' : 'red'
      return `3px solid ${color}`
    }

    return `1px solid black`
  }};
  border-left: ${(props) => {
    if (props.isAdMoving !== 'no') {
      if (props.direction !== 'O') {
        return `3px solid white`
      }
      const color = props.isAdMoving === 'go' || props.isAdMoving === 'turn' ? '#27f527' : 'red'
      return `3px solid ${color}`
    }

    return `1px solid black`
  }};
  border-bottom: ${(props) => {
    if (props.isAdMoving !== 'no') {
      if (props.direction !== 'S') {
        return `3px solid white`
      }
      const color = props.isAdMoving === 'go' || props.isAdMoving === 'turn' ? '#27f527' : 'red'
      return `3px solid ${color}`
    }

    return `1px solid black`
  }};

  aspect-ratio: 1;
  text-align: center;
  background-image: url(${(props) =>
    props.type === 'M' ? mountainImg : props.type === 'T' ? treasureImg : props.type === 'A' ? adventurerImg : plaineImg});
  background-size: cover;
  position: relative;
`
const Map = styled.div`
  margin: auto;
`
const Treasure = styled.span`
  background-color: red;
  border-radius: 16px;
  width: 16px;
  display: inline-grid;
  position: absolute;
  bottom: 2px;
  right: 2px;
  color: white;
  font-weight: bold;
  font-size: small;
`

const Name = styled.span`
  background-color: #0aca0a;
  width: max-content;
  display: inline-grid;
  position: absolute;
  top: 0px;
  left: 0px;
  color: white;
  font-weight: bold;
  font-size: small;
  overflow: hidden;
  cursor: pointer;
  padding: 0 2px;
`

interface Props {
  chase: IChase | null
}

const ChaseMap = ({ chase }: Props) => {
  return (
    <Map>
      {chase &&
        chase.matrix.map((line: ICell[], y: number) => {
          return (
            <Grid width={line.length} key={`line-${y}`}>
              {line.map((cell: ICell, x: number) => {
                return (
                  <Box
                    height={chase.matrix.length}
                    type={cell.getCurrentType()}
                    isAdMoving={cell && cell.adventurer ? cell.adventurer.isMoving : 'no'}
                    direction={cell && cell.adventurer ? cell.adventurer.direction : ''}
                    key={`cell-${y}-${x}`}
                  >
                    {cell.getCurrentNbTreasure() > 0 ? <Treasure>{cell.getCurrentNbTreasure()}</Treasure> : ''}
                    {cell && cell.adventurer ? <Name>{cell.adventurer.name}</Name> : ''}
                  </Box>
                )
              })}
            </Grid>
          )
        })}
    </Map>
  )
}

export default ChaseMap
