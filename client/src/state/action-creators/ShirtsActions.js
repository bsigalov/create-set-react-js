import { API, publicAPI } from '../../api/Server'
import {
  FETCH_AVAILABLE_SHIRTS,
  CLEAR_ERROR,
  ADD_ERROR,
  REMOVE_SHIRT_BY_ID,
} from '../constants/shirtsConstants'

export const fetchAvailableShirts = () => {
  return async (dispatch) => {
    try {
      let shirtsLocalData = localStorage.getItem('availableShirts')
      shirtsLocalData = JSON.parse(shirtsLocalData)
      if (shirtsLocalData) {
        dispatch({
          type: FETCH_AVAILABLE_SHIRTS,
          payload: shirtsLocalData,
        })
      } else {
        const response = await publicAPI.get('/')
        if (response.data) {
          localStorage.setItem(
            'availableShirts',
            JSON.stringify(
              response.data.filter((product) => product.type === 'shirt'),
            ),
          )
          dispatch({
            type: FETCH_AVAILABLE_SHIRTS,
            payload: response.data.filter(
              (product) => product.type === 'shirt',
            ),
          })
        }
      }
    } catch (error) {
      dispatch({ type: ADD_ERROR, payload: 'Shirts not available' })
    }
  }
}

export const clearErrorMessage = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_ERROR })
  }
}

export const removeAvailableShirtById = (shirtId) => {
  return (dispatch) => {
    try {
      let shirtLocalData = localStorage.getItem('availableShirts')
      shirtLocalData = JSON.parse(shirtLocalData)
      shirtLocalData = shirtLocalData.filter((item) => item.id !== shirtId)
      localStorage.setItem('availableShirts', JSON.stringify(shirtLocalData))
      dispatch({ type: REMOVE_SHIRT_BY_ID, payload: shirtId })
    } catch (error) {
      dispatch({ type: ADD_ERROR, payload: 'Cant remove this shirt id' })
    }
  }
}
