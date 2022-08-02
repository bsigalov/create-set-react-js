import { publicAPI } from '../../api/Server'
import {
  FETCH_AVAILABLE_PANTS,
  CLEAR_ERROR,
  ADD_ERROR,
  FETCH_RECOMMENDED_PANTS,
  REMOVE_PANTS_BY_ID,
} from '../constants/pantsConstants'
import { recommendPantsUtils } from '../../utils/RecommendItems'

export const fetchAvailablePants = () => {
  return async (dispatch) => {
    try {
      let pantsLocalData = localStorage.getItem('availablePants')
      pantsLocalData = JSON.parse(pantsLocalData)
      if (pantsLocalData) {
        dispatch({
          type: FETCH_AVAILABLE_PANTS,
          payload: pantsLocalData,
        })
      } else {
        const response = await publicAPI.get('/')
        if (response.data) {
          localStorage.setItem(
            'availablePants',
            JSON.stringify(
              response.data.filter((product) => product.type === 'pants'),
            ),
          )
          dispatch({
            type: FETCH_AVAILABLE_PANTS,
            payload: response.data.filter(
              (product) => product.type === 'pants',
            ),
          })
        }
      }
    } catch (error) {
      dispatch({ type: ADD_ERROR, payload: 'Pants not available' })
    }
  }
}

export const clearErrorMessage = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_ERROR })
  }
}

export const removeAvailablePantsById = (pantsId) => {
  return (dispatch) => {
    try {
      let pantsLocalData = localStorage.getItem('availablePants')
      pantsLocalData = JSON.parse(pantsLocalData)
      pantsLocalData = pantsLocalData.filter((item) => item.id !== pantsId)
      localStorage.setItem('availablePants', JSON.stringify(pantsLocalData))
      dispatch({ type: REMOVE_PANTS_BY_ID, payload: pantsId })
    } catch (error) {
      dispatch({ type: ADD_ERROR, payload: 'Cant remove this pants id' })
    }
  }
}

export const recommendPants = () => {
  return (dispatch) => {
    let chosenShirt = localStorage.getItem('chosenShirt')
    let availablePants = localStorage.getItem('availablePants')
    chosenShirt = JSON.parse(chosenShirt)
    availablePants = JSON.parse(availablePants)
    const response = recommendPantsUtils(chosenShirt, availablePants)
    dispatch({ type: FETCH_RECOMMENDED_PANTS, payload: response })
    try {
    } catch (error) {
      dispatch({ type: ADD_ERROR, payload: 'No items to recommend' })
    }
  }
}
