import { publicAPI } from '../../api/Server'
import {
  FETCH_AVAILABLE_SHOES,
  CLEAR_ERROR,
  ADD_ERROR,
  FETCH_RECOMMENDED_SHOES,
  REMOVE_SHOES_BY_ID,
} from '../constants/shoesConstants'
import { recommendShoesUtils } from '../../utils/RecommendItems'

export const fetchAvailableShoes = () => {
  return async (dispatch) => {
    try {
      let shoesLocalData = localStorage.getItem('availableShoes')
      shoesLocalData = JSON.parse(shoesLocalData)
      if (shoesLocalData) {
        dispatch({
          type: FETCH_AVAILABLE_SHOES,
          payload: shoesLocalData,
        })
      } else {
        const response = await publicAPI.get('/')
        if (response.data) {
          localStorage.setItem(
            'availableShoes',
            JSON.stringify(
              response.data.filter((product) => product.type === 'shoes'),
            ),
          )
          dispatch({
            type: FETCH_AVAILABLE_SHOES,
            payload: response.data.filter(
              (product) => product.type === 'shoes',
            ),
          })
        }
      }
    } catch (error) {
      dispatch({ type: ADD_ERROR, payload: 'Shoes not available' })
    }
  }
}

export const clearErrorMessage = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_ERROR })
  }
}

export const removeAvailableShoesById = (shoesId) => {
  return (dispatch) => {
    try {
      let shoesLocalData = localStorage.getItem('availableShoes')
      shoesLocalData = JSON.parse(shoesLocalData)
      shoesLocalData = shoesLocalData.filter((item) => item.id !== shoesId)
      localStorage.setItem('availableShoes', JSON.stringify(shoesLocalData))
      dispatch({ type: REMOVE_SHOES_BY_ID, payload: shoesId })
    } catch (error) {
      dispatch({ type: ADD_ERROR, payload: 'Cant remove this shoes id' })
    }
  }
}

export const recommendShoes = () => {
  return (dispatch) => {
    let chosenShirt = localStorage.getItem('chosenShirt')
    let availableShoes = localStorage.getItem('availableShoes')
    chosenShirt = JSON.parse(chosenShirt)
    availableShoes = JSON.parse(availableShoes)
    const response = recommendShoesUtils(chosenShirt, availableShoes)
    dispatch({ type: FETCH_RECOMMENDED_SHOES, payload: response })
    try {
    } catch (error) {
      dispatch({ type: ADD_ERROR, payload: 'No items to recommend' })
    }
  }
}
