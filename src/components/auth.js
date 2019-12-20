export const getUserToken = () => {
    return(window.localStorage.getItem('tek_auth'))
};
export const getImpersonUserToken = () => {
    return(window.localStorage.getItem('tek_impersonauth'))
};
export const getUserId = () => {
    return(window.localStorage.getItem('tek_userID'))
};
export const getUserName = () => {
    return(window.localStorage.getItem('tek_UserName'))
};
export const getImpersonFlag = () => {
    return(window.localStorage.getItem('imperson_flag'))
};
export const getUserRole = () => {
    return(window.localStorage.getItem('tek_role'))
};
export const getAuth = () => {
    return(window.localStorage.getItem('tek_auth'))
};
export const getAuthUserName = () => {
    return(window.localStorage.getItem('tek_AuthUserName'))
};
export const removeAuth = () => {
    
    window.localStorage.setItem('tek_auth', '')
    window.localStorage.setItem('tek_impersonauth', '')
    window.localStorage.setItem('tek_userID', '')
    window.localStorage.setItem('tek_role', '')
    window.localStorage.setItem('tek_AuthUserName', '')
    window.localStorage.setItem('tek_userID', '');
    return true
};
