import React, { useEffect } from 'react'
import Title from '../components/Title'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useNavigate } from 'react-router-dom'
import {
  fetchSets,
  clearErrorMessage,
} from '../state/action-creators/SetsActions'
import Set from '../components/Set'
import '../css/mySets.css'
import ErrorMessage from '../components/ErrorMessage'

const MySetsScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const setsState = useSelector((state) => state.sets)
  const relevantFunctions = bindActionCreators(
    { fetchSets, clearErrorMessage },
    dispatch,
  )
  useEffect(() => {
    relevantFunctions.clearErrorMessage()
    relevantFunctions.fetchSets()
  }, [])
  return (
    <div className="screen">
      <Title title="My sets" />
      <Button variant="secondary" onClick={() => navigate('/')}>
        Back
      </Button>
      {setsState.sets.length > 0 ? (
        setsState.sets.map((set, index) => {
          return (
            <>
              <Set key={index} set={set} index={index + 1} />
            </>
          )
        })
      ) : (
        <>
          <br></br>
          <br></br>
          <br></br>
          <ErrorMessage message="You do not create sets yet!" />
        </>
      )}
    </div>
  )
}

export default MySetsScreen
