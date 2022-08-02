import {
  FETCH_AVAILABLE_PANTS,
  CLEAR_ERROR,
  ADD_ERROR,
  FETCH_RECOMMENDED_PANTS,
  REMOVE_PANTS_BY_ID,
} from '../constants/pantsConstants'

export const PantsReducer = (
  state = { availablePants: [], errMsg: '', recommendedPants: [] },
  action,
) => {
  switch (action.type) {
    case FETCH_AVAILABLE_PANTS:
      return { ...state, availablePants: action.payload }
    case FETCH_RECOMMENDED_PANTS:
      return { ...state, recommendedPants: action.payload }
    case REMOVE_PANTS_BY_ID:
      return {
        ...state,
        availablePants: state.availablePants.filter(
          (pants) => pants.id != action.payload,
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
