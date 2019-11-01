export const types = {
  LOGIN_REQUEST: 'AUTH/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'AUTH/LOGIN_FAILURE',
  FORMSUBMIT: 'FORMSUBMIT',
}

export const initialState = {
  error: null
}
export default function (state = initialState, action) {
  
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null }
    case types.LOGIN_SUCCESS:
      return { ...state, isLoading: false, user: action.data }
    case types.LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.error }
    case types.FORMSUBMIT:
      return { ...state, isLoading: false, error: action.error }
    default:
      return state
  }
}
