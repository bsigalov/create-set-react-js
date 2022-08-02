import { API } from '../../api/Server'
import {
  FETCH_SETS,
  ADD_ERROR,
  CLEAR_ERROR,
  DELETE_SET_BY_ID,
  CHOOSE_SHIRT,
  CHOOSE_SHOES,
  CHOOSE_PANTS,
  CREATE_SET,
} from '../constants/setsConstants'
import { takeTheCurrentDate } from '../../utils/TakeTheCurrentDate'

export const fetchSets = () => {
  return async (dispatch) => {
    try {
      let setsLocalData = localStorage.getItem('sets')
      setsLocalData = JSON.parse(setsLocalData)
      if (setsLocalData) {
        dispatch({ type: FETCH_SETS, payload: setsLocalData })
      }
    } catch (error) {
      dispatch({ type: ADD_ERROR, payload: 'Sets not available' })
    }
  }
}

export const deleteSetById = (setId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELETE_SET_BY_ID, payload: setId })
      let setsLocalData = localStorage.getItem('sets')
      setsLocalData = JSON.parse(setsLocalData)
      let shirtsLocalData = localStorage.getItem('availableShirts')
      shirtsLocalData = JSON.parse(shirtsLocalData)
      let pantsLocalData = localStorage.getItem('availablePants')
      pantsLocalData = JSON.parse(pantsLocalData)
      let shoesLocalData = localStorage.getItem('availableShoes')
      shoesLocalData = JSON.parse(shoesLocalData)
      let setToDelete = setsLocalData.find((set) => (set.id = setId))
      pantsLocalData.push(setToDelete.pants)
      localStorage.setItem('availablePants', JSON.stringify(pantsLocalData))
      shoesLocalData.push(setToDelete.shoes)
      localStorage.setItem('availableShoes', JSON.stringify(shoesLocalData))
      shirtsLocalData.push(setToDelete.shirt)
      localStorage.setItem('availableShirts', JSON.stringify(shirtsLocalData))
      let updatedSetsLocalData = setsLocalData.filter((set) => set.id !== setId)
      if (updatedSetsLocalData.length == 0) {
        localStorage.setItem('sets', [])
      } else if (updatedSetsLocalData.length > 0) {
        localStorage.setItem('sets', JSON.stringify(updatedSetsLocalData))
      }
    } catch (error) {
      dispatch({
        type: ADD_ERROR,
        payload: 'Cannot delete now, try again later',
      })
    }
  }
}

export const createNewSet = (shirt, pants, shoes) => {
  return async (dispatch) => {
    try {
      let setsLocalData = localStorage.getItem('sets')
      setsLocalData = JSON.parse(setsLocalData)
      const finishTime = takeTheCurrentDate()
      let startTime = localStorage.getItem('startCreateTime')
      let finishTimeLocal = localStorage.getItem('finishTime')
      startTime = Date.parse(startTime)
      finishTimeLocal = Date.parse(finishTimeLocal)
      const timeTakenInMili = finishTimeLocal - startTime
      let minutes = Math.floor(timeTakenInMili / 6000)
      let seconds = ((timeTakenInMili % 6000) / 1000).toFixed(0)

      const newSet = {
        timeToCreate: minutes + ':' + (seconds < 10 ? '0' : '') + seconds,
        createdAt: finishTime,
        id: shirt.id + shoes.id + pants.id,
        shirt: shirt,
        pants: pants,
        shoes: shoes,
      }

      if (setsLocalData) {
        setsLocalData = [...setsLocalData, newSet]
        localStorage.setItem('sets', JSON.stringify(setsLocalData))
      } else {
        let newSetsArray = [newSet]
        localStorage.setItem('sets', JSON.stringify(newSetsArray))
      }
      localStorage.removeItem('chosenShirt')
      localStorage.removeItem('chosenPants')
      localStorage.removeItem('chosenShoes')
      dispatch({
        type: CREATE_SET,
        payload: newSet,
      })
    } catch (error) {
      dispatch({
        type: ADD_ERROR,
        payload: 'Cannot create now, try again later',
      })
    }
  }
}

export const clearErrorMessage = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_ERROR })
  }
}

export const chooseShirt = (shirt) => {
  return (dispatch) => {
    localStorage.setItem('chosenShirt', JSON.stringify(shirt))
    dispatch({ type: CHOOSE_SHIRT, payload: shirt })
  }
}

export const choosePants = (pants) => {
  return (dispatch) => {
    localStorage.setItem('chosenPants', JSON.stringify(pants))
    dispatch({ type: CHOOSE_PANTS, payload: pants })
  }
}

export const chooseShoes = (shoes) => {
  return (dispatch) => {
    localStorage.setItem('chosenShoes', JSON.stringify(shoes))
    dispatch({ type: CHOOSE_SHOES, payload: shoes })
  }
}
