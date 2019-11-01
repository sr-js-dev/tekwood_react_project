export const getUserToken = () => {
    return(window.localStorage.getItem('token'))
};