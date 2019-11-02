import * as types from '../constants/actionTypes';
import $ from 'jquery';
import API from '../components/api'
import history from '../history';

export const fetchLoginData = (params) => {
    return (dispatch) => {
        var settings = {
            "url": API.Login,
            "method": "POST",
            "headers": {
              "Content-Type": "application/json",
            },
            "data": "{\n\t\"userName\": \""+params.username+"\",\n    \"password\": \""+params.password+"\"\n\n}"
        }
        $.ajax(settings).done(function (response) {
        })
        .then(response => {
            window.localStorage.setItem('token', response.token);
            dispatch(fetchLoginDataSuccess(response.claims));
            history.push('/user')
        })
        .catch(err => {
            dispatch(fetchLoginDataFail());
            ;
            // const data = err.response.data;
            // console.log(err.response);
        });
    };
}

//login fail
export const fetchLoginDataFail = () => {
    return {
        type: types.FETCH_LOGIN_FAIL,
        error:"Username or Password invalid"
    }
}

//login success
export const fetchLoginDataSuccess = (data) => {
    
    return {
        type: types.FETCH_LOGIN_SUCCESS,
        UserName:data.UserName,
        UserEmail:data.Email,
        Role:data.Role
    }
}
export const dataServerFail = (params) => {
    return (dispatch) => {
        dispatch(fetchDataServerFail(params));
    };
}
//error
export const fetchDataServerFail = (params) => {
    console.log('1122',params);
    return{
        type: types.FETCH_SERVER_FAIL,
        error:params
    }
}
export const blankdispatch = () => {
    return (dispatch) => {
        dispatch(fetchBlankData());
    };
}
//error
export const fetchBlankData = () => {
    return{
        type: types.FETCH_BlANK_DATA,
        error:""
    }
}


