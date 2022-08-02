import {
  FETCH_AVAILABLE_SHOES,
  CLEAR_ERROR,
  ADD_ERROR,
  FETCH_RECOMMENDED_SHOES,
  REMOVE_SHOES_BY_ID,
} from '../constants/shoesConstants'

export const ShoesReducer = (
  state = { availableShoes: [], errMsg: '', recommendedShoes: [] },
  action,
) => {
  switch (action.type) {
    case FETCH_AVAILABLE_SHOES:
      return { ...state, availableShoes: action.payload }
    case FETCH_RECOMMENDED_SHOES:
      return { ...state, recommendedShoes: action.payload }
    case REMOVE_SHOES_BY_ID:
      return {
        ...state,
        availableShoes: state.availableShoes.filter(
          (shoes) => shoes.id != action.payload,
        ),
      }
    case ADD_ERROR:
      return { ...state, errMsg: action.payload }
    case CLEAR_ERROR:
      return { ...state, errMsg: '' }
    default:
      return state
  }
}
