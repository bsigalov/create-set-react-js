import {
  FETCH_AVAILABLE_SHIRTS,
  CLEAR_ERROR,
  ADD_ERROR,
  FETCH_RECOMMENDED_SHIRTS,
  REMOVE_SHIRT_BY_ID,
} from '../constants/shirtsConstants'

export const ShirtsReducer = (
  state = { availableShirts: [], errMsg: '', recommendedShirts: [] },
  action,
) => {
  switch (action.type) {
    case FETCH_AVAILABLE_SHIRTS:
      return { ...state, availableShirts: action.payload }
    case FETCH_RECOMMENDED_SHIRTS:
      return { ...state, recommendedShirts: action.payload }
    case REMOVE_SHIRT_BY_ID:
      return {
        ...state,
        availableShirts: state.availableShirts.filter(
          (shirt) => shirt.id != action.payload,
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
