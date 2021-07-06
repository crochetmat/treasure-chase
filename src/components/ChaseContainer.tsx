import { useState } from 'react'
import styled from 'styled-components'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { convertArrayToChase, convertChaseToText } from '../utils/convertion'
import { executeActions, runChase } from '../utils/utils'
import ImportButton from './ImportButton'
import ChaseMap from './ChaseMap'
import DownloadButton from './DownloadButton'
import { IChase, Chase } from '../models/chase.models'
import RunActionButton from './RunActionButton'

function Alert(props: JSX.IntrinsicAttributes & AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Container = styled.div`
  margin: auto;
  width: 80%;
  text-align: center;
`

function ChaseContainer() {
  const [chaseInitial, setChaseInitial] = useState<IChase | null>(null)
  const [chaseRunning, setChaseRunning] = useState<IChase | null>(null)
  const [chaseFinal, setChaseFinal] = useState<IChase | null>(null)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')

  const handleClose = () => {
    setOpen(false)
  }

  /*
  / Function executed when a new file is load
  */
  const manageFile = (fileArray: string[]) => {
    try {
      const newChase: IChase = convertArrayToChase(fileArray)
      setChaseInitial(newChase)
      setChaseRunning(newChase)
      setChaseFinal(executeActions(newChase))
    } catch (e) {
      setOpen(true)
      setError(e.message)
    }
  }

  /*
  / Updated state chase after every action
  */
  const updateState = (newChase: IChase) => {
    setChaseRunning(new Chase(newChase.matrix, newChase.adventurers))
  }

  /*
  / Run every action from start
  */
  const runChaseFromStart = () => {
    if (chaseInitial) {
      runChase(chaseInitial, updateState, 800)
    }
  }

  /*
  / Create and download the file 
  */
  const downloadFile = () => {
    if (chaseFinal && chaseFinal.matrix.length > 0) {
      const output = convertChaseToText(chaseFinal)
      const element = document.createElement('a')
      const file = new Blob([output])
      element.href = URL.createObjectURL(file)
      element.download = 'myFile.txt'
      document.body.appendChild(element)
      element.click()
    }
  }

  return (
    <Container>
      <ImportButton manageFile={manageFile} />
      <ChaseMap chase={chaseRunning} />
      <RunActionButton runChaseFromStart={runChaseFromStart} />
      <DownloadButton chase={chaseFinal} downloadFile={downloadFile} />

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default ChaseContainer
