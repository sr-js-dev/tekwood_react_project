export const getUserToken = () => {
    return(window.localStorage.getItem('tek_auth'))
};
export const getUserId = () => {
    return(window.localStorage.getItem('tek_userID'))
};
export const getUserRole = () => {
    return(window.localStorage.getItem('tek_role'))
};
export const getAuth = () => {
    return(window.localStorage.getItem('tek_auth'))
};
export const removeAuth = () => {
    window.localStorage.setItem('tek_auth', '')
    window.localStorage.setItem('token', '')
    window.localStorage.setItem('userID', '')
    window.localStorage.setItem('role', '')
    return true
};
