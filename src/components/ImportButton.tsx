import { convertFileTxtToFileArray } from '../utils/convertion'
import styled from 'styled-components'

const Button = styled.input`
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 40px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  background-color: white;
  color: black;
  border: 2px solid #555555;
`
const Wrapper = styled.div`
  &:hover ${Button} {
    background-color: #555555;
    color: white;
  }
`

interface Props {
  manageFile: (map: string[]) => void
}

const ImportButton = ({ manageFile }: Props) => {
  let fileReader: FileReader

  /*
  / Create a matrix from the loaded file
  */
  const handleFileRead = () => {
    const content = fileReader.result
    manageFile(convertFileTxtToFileArray(content as string))
  }

  /*
  / Load new file
  */
  const handleFileChosen = (file: Blob) => {
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
  }

  return (
    <Wrapper>
      <Button
        type="file"
        id="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files.length > 0) handleFileChosen(e.target.files[0])
        }}
      />
    </Wrapper>
  )
}

export default ImportButton
