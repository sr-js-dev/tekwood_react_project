import * as types from '../constants/actionTypes';
// import { browserHistory } from 'react-router';
export const fetchLoginDataSuccess = (loginData) => {
    
    return {
        type: types.FETCH_LOGIN_SUCCESS,
        loginData
    }
}


export const fetchLoginData = () => {
    return (dispatch) => {
        dispatch(fetchLoginDataSuccess('123123123123'));
        ;
    };
}

