import * as types from '../constants/actionTypes';
export const initialState = {
    error: null
}
export default function (state = initialState, action) {
    switch (action.type) {
    case types.FETCH_LOGIN_SUCCESS:
        return { ...state, UserName: action.UserName, UserEmail: action.UserEmail, Role: action.Role, error: null }
    case types.FETCH_LOGIN_FAIL:
        return { ...state, error: action.error }
    default:
        return state
    }
}