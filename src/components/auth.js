export const getUserToken = () => {
    return(window.localStorage.getItem('token'))
};
export const getUserId = () => {
    return(window.localStorage.getItem('userID'))
};
export const getUserRole = () => {
    return(window.localStorage.getItem('role'))
};