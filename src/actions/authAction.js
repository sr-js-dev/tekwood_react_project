import * as types from '../constants/actionTypes';
import $ from 'jquery';
import SessionManager from '../components/session_manage';
import API from '../components/api'
import Axios from 'axios';
import history from '../history';

export const fetchLoginData = (params) => {
    return (dispatch) => {
        var settings = {
            "url": "http://brandnewkey.sohosted-vps.nl:1020/api/Login/Login",
            "method": "POST",
            "headers": {
              "Content-Type": "application/json",
            },
            "data": "{\n\t\"userName\": \""+params.username+"\",\n    \"password\": \""+params.password+"\"\n\n}"
        }
        $.ajax(settings).done(function (response) {
        })
        .then(response => {
            console.log('22331', response);
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
    console.log('1122');
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


