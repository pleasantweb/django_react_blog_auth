import {combineReducers} from 'redux'
import authReducer from './authReducers'
import blogReducer from './blogReducer'

export default  combineReducers({
    authReducer,
    blogReducer
})