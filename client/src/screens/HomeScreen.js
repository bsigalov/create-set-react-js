import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { Button } from 'react-bootstrap'
import '../css/home.css'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useNavigate } from 'react-router-dom'
import { fetchSets, createNewSet } from '../state/action-creators/SetsActions'
import {
  fetchAvailablePants,
  removeAvailablePantsById,
} from '../state/action-creators/PantsActions'
import {
  fetchAvailableShoes,
  removeAvailableShoesById,
} from '../state/action-creators/ShoesActions'
import {
  fetchAvailableShirts,
  removeAvailableShirtById,
} from '../state/action-creators/ShirtsActions'
import { GrStatusGood } from 'react-icons/gr'
import { AiOutlinePlus } from 'react-icons/ai'
import ErrorMessage from '../components/ErrorMessage'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const setsState = useSelector((state) => state.sets)
  const shirtsState = useSelector((state) => state.shirts)
  const shoesState = useSelector((state) => state.shoes)
  const pantsState = useSelector((state) => state.pants)
  const relevantFunctions = bindActionCreators(
    {
      fetchSets,
      fetchAvailableShirts,
      fetchAvailableShoes,
      fetchAvailablePants,
      createNewSet,
      removeAvailablePantsById,
      removeAvailableShoesById,
      removeAvailableShirtById,
    },
    dispatch,
  )

  const [createSetErrMsg, setCreateSetErrMsg] = useState(null)

  useEffect(() => {
    relevantFunctions.fetchSets()
    relevantFunctions.fetchAvailableShirts()
    relevantFunctions.fetchAvailablePants()
    relevantFunctions.fetchAvailableShoes()
  }, [])
  return (
    <div>
      <Title title="Home" />
      <div className="buttons">
        <Button onClick={() => navigate('/mySets')}>
          My sets({setsState !== null && setsState.sets.length})
        </Button>
      </div>
      <div className="items-left">
        Shirts left in the locker: {shirtsState.availableShirts.length}
        <br></br>
        Pants left in the locker: {pantsState.availablePants.length}
        <br></br>
        Shoes left in the locker: {shoesState.availableShoes.length}
      </div>
      <div className="buttons">
        <Button variant="warning" className="each-button">
          Choose shirt {setsState.chosenShirt && <GrStatusGood />}
        </Button>
        <Button variant="warning" className="each-button">
          Choose pants {setsState.chosenPants && <GrStatusGood />}
        </Button>
        <Button variant="warning" className="each-button">
          Choose shoes {setsState.chosenShoes && <GrStatusGood />}
        </Button>
        <br></br> <br></br> <br></br>
        <Button
          variant="success"
          className="each-button"
          onClick={() => {
            if (
              setsState.chosenPants &&
              setsState.chosenShirt &&
              setsState.chosenShoes
            ) {
              relevantFunctions.removeAvailablePantsById(
                setsState.chosenPants.id,
              )
              relevantFunctions.removeAvailableShoesById(
                setsState.chosenShoes.id,
              )
              relevantFunctions.removeAvailableShirtById(
                setsState.chosenShirt.id,
              )
              relevantFunctions.createNewSet(
                setsState.chosenShirt,
                setsState.chosenPants,
                setsState.chosenShoes,
              )
              alert('You have successfully created set!')
            } else {
              setCreateSetErrMsg(
                'You must choose pants & shirt & shoes to create new set.',
              )
            }
          }}
        >
          Create the set with the selected items <AiOutlinePlus />
        </Button>
        <Button
          variant="info"
          className="each-button"
          onClick={() => {
            navigate('/createSet/shirt')
          }}
        >
          Start create a set
        </Button>
        <ErrorMessage message={createSetErrMsg} />
      </div>
    </div>
  )
}

export default HomeScreen
