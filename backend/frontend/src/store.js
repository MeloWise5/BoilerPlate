import { createStore, combineReducers, applyMiddleware} from 'redux'
import { thunk }  from 'redux-thunk'

import { 
    userLoginReducer, userRegisterReducer, userDetailsReducer, 
    userListReducer, userDeleteReducer, userUpdateReducer,
    userUpdateProfileReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdateProfile: userUpdateProfileReducer,
})

// local storage logic
// this is to persist cart items in local storage
// it pulls from the users browser local storage
// if nothing there it sets to empty array
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, applyMiddleware(...middleware))

export default store