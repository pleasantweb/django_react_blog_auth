import {createStore,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
// import authReducer from './authReducers'
import reducer from './combineReducer'

// const initialState={}
const middleware = [thunk]

const store = createStore(
    reducer,
    // initialState,
    composeWithDevTools(applyMiddleware(...middleware))

)
export default store;