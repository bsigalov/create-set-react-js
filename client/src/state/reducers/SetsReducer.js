import {
  CREATE_SET,
  FETCH_SETS,
  CLEAR_ERROR,
  ADD_ERROR,
  DELETE_SET_BY_ID,
  CHOOSE_SHIRT,
  CHOOSE_SHOES,
  CHOOSE_PANTS,
} from '../constants/setsConstants'

export const SetsReducer = (
  state = {
    sets: [],
    errMsg: '',
    chosenShirt: null,
    chosenShoes: null,
    chosenPants: null,
  },
  action,
) => {
  switch (action.type) {
    case FETCH_SETS:
      return { ...state, sets: action.payload }
    case CREATE_SET:
      return {
        ...state,
        sets: [...state.sets, action.payload],
        chosenShirt: null,
        chosenPants: null,
        chosenShoes: null,
      }
    case DELETE_SET_BY_ID:
      return {
        ...state,
        sets: state.sets.filter((set) => set.id !== action.payload),
      }
    case CHOOSE_SHIRT:
      return { ...state, chosenShirt: action.payload }
    case CHOOSE_SHOES:
      return { ...state, chosenShoes: action.payload }
    case CHOOSE_PANTS:
      return { ...state, chosenPants: action.payload }
    case ADD_ERROR:
      return { ...state, errMsg: action.payload }
    case CLEAR_ERROR:
      return { ...state, errMsg: '' }
    default:
      return state
  }
}
