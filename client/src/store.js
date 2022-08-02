import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { SetsReducer } from './state/reducers/SetsReducer'
import { ShirtsReducer } from './state/reducers/ShirtsReducer'
import { ShoesReducer } from './state/reducers/ShoesReducer'
import { PantsReducer } from './state/reducers/PantsReducer'

const rootReducer = combineReducers({
  shirts: ShirtsReducer,
  sets: SetsReducer,
  shoes: ShoesReducer,
  pants: PantsReducer,
})

const initialState = {}
const middleware = [thunk]

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

export default store
