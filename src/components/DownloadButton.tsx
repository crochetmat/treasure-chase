import styled from 'styled-components'
import { IChase } from '../models/chase.models'

const Button = styled.button`
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 40px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  background-color: black;
  color: white;
  border: 2px solid #555555;
`
const Wrapper = styled.div`
  &:hover ${Button} {
    background-color: white;
    color: black;
  }
  display: inline-block;
`
interface Props {
  chase: IChase | null
  downloadFile: () => void
}

const DownloadButton = ({ chase, downloadFile }: Props) => {
  return (
    <Wrapper>
      <Button onClick={downloadFile} disabled={!chase || chase.matrix.length <= 0}>
        Télécharger le fichier final
      </Button>
    </Wrapper>
  )
}

export default DownloadButton
