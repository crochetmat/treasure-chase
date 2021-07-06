import styled from 'styled-components'

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
  runChaseFromStart: () => void
}

const RunActionButton = ({ runChaseFromStart }: Props) => {
  return (
    <Wrapper>
      <Button onClick={runChaseFromStart}>Exécuter actions</Button>
    </Wrapper>
  )
}

export default RunActionButton
